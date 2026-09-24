/* ==========================================================================
   TOKENS — živé hodnoty z css/brand.css v manuálu
   - [data-token="--ui-primary"]                 → vzorek + HEX
   - [data-token-raw="--ui-h1-size"]             → hodnota tokenu tak, jak je zapsaná
   - [data-contrast="--ui-foreground --ui-background"] (+ data-large) → kontrast WCAG
   - data-theme-source="dark" na buňce            → hodnota z [data-theme="dark"]
   - [data-theme-toggle="#id"]                   → přepíná světlý / tmavý režim ukázky
   - [data-export="tailwind" | "json"]           → stáhne Tailwind v4 @theme / tokens.json
   Bez závislostí. Hodnoty se čtou vždy znovu, takže odpovídají brand.css.
   ========================================================================== */
(function () {
  var root = document.documentElement;

  // Sondy: jedna ve světlém kontextu, jedna v tmavém.
  function makeProbe(theme) {
    var el = document.createElement('div');
    el.setAttribute('aria-hidden', 'true');
    el.style.cssText = 'position:absolute;width:0;height:0;overflow:hidden;visibility:hidden;pointer-events:none';
    if (theme) el.setAttribute('data-theme', theme);
    var inner = document.createElement('span');
    el.appendChild(inner);
    document.body.appendChild(el);
    return { wrap: el, inner: inner };
  }
  var probes = { light: makeProbe(null), dark: makeProbe('dark') };

  var canvas = document.createElement('canvas');
  canvas.width = canvas.height = 1;
  var ctx = canvas.getContext('2d', { willReadFrequently: true });

  function raw(name, theme) {
    var p = probes[theme || 'light'];
    return getComputedStyle(p.wrap).getPropertyValue(name).trim();
  }

  // Libovolná CSS barva (i oklch / color-mix) → [r, g, b]
  function rgbOf(name, theme) {
    var p = probes[theme || 'light'];
    p.inner.style.color = '';
    p.inner.style.color = 'var(' + name + ')';
    var css = getComputedStyle(p.inner).color;
    ctx.clearRect(0, 0, 1, 1);
    ctx.fillStyle = '#000';
    ctx.fillStyle = css;
    ctx.fillRect(0, 0, 1, 1);
    var d = ctx.getImageData(0, 0, 1, 1).data;
    return [d[0], d[1], d[2]];
  }

  function hex(rgb) {
    return '#' + rgb.map(function (v) { return v.toString(16).padStart(2, '0'); }).join('').toUpperCase();
  }

  function luminance(rgb) {
    var c = rgb.map(function (v) {
      v /= 255;
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
  }

  function contrast(a, b) {
    var l1 = luminance(a), l2 = luminance(b);
    return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
  }

  function fill() {
    document.querySelectorAll('[data-token]').forEach(function (el) {
      var theme = el.getAttribute('data-theme-source') || 'light';
      var name = el.getAttribute('data-token');
      var value = hex(rgbOf(name, theme));
      el.innerHTML = '';
      var chip = document.createElement('span');
      chip.className = 'token-chip';
      chip.style.setProperty('--c', value);
      chip.setAttribute('aria-hidden', 'true');
      el.appendChild(chip);
      el.appendChild(document.createTextNode(value));
    });

    document.querySelectorAll('[data-token-hex]').forEach(function (el) {
      el.textContent = hex(rgbOf(el.getAttribute('data-token-hex'), el.getAttribute('data-theme-source')));
    });

    document.querySelectorAll('[data-token-rgb]').forEach(function (el) {
      el.textContent = rgbOf(el.getAttribute('data-token-rgb'), el.getAttribute('data-theme-source')).join(' / ');
    });

    document.querySelectorAll('[data-token-raw]').forEach(function (el) {
      el.textContent = raw(el.getAttribute('data-token-raw'), el.getAttribute('data-theme-source')) || '—';
    });

    document.querySelectorAll('[data-contrast]').forEach(function (el) {
      var theme = el.getAttribute('data-theme-source') || 'light';
      var pair = el.getAttribute('data-contrast').split(/\s+/);
      var ratio = contrast(rgbOf(pair[0], theme), rgbOf(pair[1], theme));
      var large = el.hasAttribute('data-large');
      var aa = large ? 3 : 4.5;
      var aaa = large ? 4.5 : 7;
      var grade = ratio >= aaa ? 'AAA' : ratio >= aa ? 'AA' : 'nevyhovuje';
      el.textContent = ratio.toFixed(1).replace('.', ',') + ' : 1 · ' + grade;
      el.classList.toggle('is-pass', ratio >= aa);
      el.classList.toggle('is-fail', ratio < aa);
    });
  }

  // Přepínač světlý / tmavý režim u Brand Web Preview
  document.querySelectorAll('[data-theme-toggle]').forEach(function (btn) {
    var target = document.querySelector(btn.getAttribute('data-theme-toggle'));
    if (!target) return;
    var label = btn.querySelector('[data-label]');
    btn.addEventListener('click', function () {
      var dark = target.getAttribute('data-theme') !== 'dark';
      if (dark) target.setAttribute('data-theme', 'dark');
      else target.removeAttribute('data-theme');
      btn.setAttribute('aria-pressed', String(dark));
      if (label) label.textContent = dark ? 'Světlý režim' : 'Tmavý režim';
      btn.querySelector('use').setAttribute('href', dark ? '#i-sun' : '#i-moon');
    });
  });

  // ---------- Export ----------
  var COLORS = ['primary', 'primary-hover', 'primary-foreground', 'secondary', 'secondary-foreground',
    'background', 'foreground', 'muted', 'muted-foreground', 'border', 'inverted', 'inverted-foreground',
    'accent', 'accent-foreground', 'destructive', 'destructive-foreground', 'success', 'success-foreground', 'ring'];
  var TYPE = ['display', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p1', 'p2', 'p3'];
  var RADII = ['none', 'sm', 'md', 'lg', 'full'];
  var SHADOWS = ['sm', 'md', 'lg'];
  var ROLES = ['button', 'input', 'card', 'modal'];      // --ui-radius-<role>
  var SHADOW_ROLES = ['button', 'card', 'modal'];        // --ui-shadow-<role>

  function slug() {
    var meta = document.querySelector('meta[name="brand-slug"]');
    return (meta && meta.content) || 'znacka';
  }

  function today() {
    var d = new Date();
    return d.getDate() + '. ' + (d.getMonth() + 1) + '. ' + d.getFullYear();
  }

  function tailwind() {
    var out = [];
    out.push('/* ' + slug() + ' — Tailwind v4 theme');
    out.push('   Vygenerováno z brand manuálu (css/brand.css), ' + today() + '.');
    out.push('   Použití: vlož do hlavního CSS souboru projektu. Utility: bg-primary, text-foreground,');
    out.push('   text-h1, rounded-md, shadow-md … Tmavý režim: atribut data-theme="dark" na <html>. */');
    out.push('@import "tailwindcss";');
    out.push('@custom-variant dark (&:where([data-theme="dark"], [data-theme="dark"] *));');
    out.push('');
    out.push('@theme {');
    COLORS.forEach(function (c) { out.push('  --color-' + c + ': ' + hex(rgbOf('--ui-' + c)) + ';'); });
    out.push('');
    out.push('  --font-primary: ' + raw('--ui-font-primary') + ';');
    out.push('  --font-secondary: ' + raw('--ui-font-secondary') + ';');
    out.push('');
    TYPE.forEach(function (t) {
      out.push('  --text-' + t + ': ' + raw('--ui-' + t + '-size') + ';');
      out.push('  --text-' + t + '--line-height: ' + raw('--ui-' + t + '-lh') + ';');
      out.push('  --text-' + t + '--font-weight: ' + raw('--ui-' + t + '-weight') + ';');
      out.push('  --text-' + t + '--letter-spacing: ' + raw('--ui-' + t + '-tracking') + ';');
    });
    out.push('');
    RADII.forEach(function (r) { out.push('  --radius-' + r + ': ' + raw('--ui-radius-' + r) + ';'); });
    ROLES.forEach(function (r) { out.push('  --radius-' + r + ': ' + raw('--ui-radius-' + r) + ';'); });
    out.push('');
    SHADOWS.forEach(function (s) { out.push('  --shadow-' + s + ': ' + raw('--ui-shadow-' + s) + ';'); });
    SHADOW_ROLES.forEach(function (s) { out.push('  --shadow-' + s + ': ' + raw('--ui-shadow-' + s) + ';'); });
    out.push('');
    out.push('  /* Základní jednotka spacingu značky: ' + raw('--ui-space') + '. Tailwind --spacing (0.25rem) necháváme,');
    out.push('     brandové rozestupy piš jako násobky: 8 px = p-2, 16 px = p-4, 24 px = p-6 … */');
    out.push('  --ease-brand: ' + raw('--ui-ease') + ';');
    out.push('}');
    out.push('');
    out.push('@layer base {');
    out.push('  [data-theme="dark"] {');
    COLORS.forEach(function (c) { out.push('    --color-' + c + ': ' + hex(rgbOf('--ui-' + c, 'dark')) + ';'); });
    SHADOWS.concat(SHADOW_ROLES).forEach(function (s) { out.push('    --shadow-' + s + ': ' + raw('--ui-shadow-' + s, 'dark') + ';'); });
    out.push('  }');
    out.push('}');
    return out.join('\n') + '\n';
  }

  function json() {
    var tokens = { $description: slug() + ' — design tokeny (W3C DTCG), vygenerováno ' + today() };
    tokens.color = {};
    tokens['color-dark'] = {};
    COLORS.forEach(function (c) {
      tokens.color[c] = { $type: 'color', $value: hex(rgbOf('--ui-' + c)) };
      tokens['color-dark'][c] = { $type: 'color', $value: hex(rgbOf('--ui-' + c, 'dark')) };
    });
    tokens.font = {
      primary: { $type: 'fontFamily', $value: raw('--ui-font-primary') },
      secondary: { $type: 'fontFamily', $value: raw('--ui-font-secondary') }
    };
    tokens.typography = {};
    TYPE.forEach(function (t) {
      tokens.typography[t] = {
        $type: 'typography',
        $value: {
          fontFamily: /^(p1|p2|p3)$/.test(t) ? '{font.secondary}' : '{font.primary}',
          fontSize: raw('--ui-' + t + '-size'),
          fontWeight: Number(raw('--ui-' + t + '-weight')) || raw('--ui-' + t + '-weight'),
          lineHeight: Number(raw('--ui-' + t + '-lh')) || raw('--ui-' + t + '-lh'),
          letterSpacing: raw('--ui-' + t + '-tracking')
        }
      };
    });
    tokens.radius = {};
    RADII.concat(ROLES).forEach(function (r) { tokens.radius[r] = { $type: 'dimension', $value: raw('--ui-radius-' + r) }; });
    tokens.shadow = {};
    SHADOWS.concat(SHADOW_ROLES).forEach(function (s) { tokens.shadow[s] = { $value: raw('--ui-shadow-' + s), $description: 'CSS box-shadow' }; });
    tokens.space = { base: { $type: 'dimension', $value: raw('--ui-space') } };
    tokens.motion = {
      'duration-fast': { $type: 'duration', $value: raw('--ui-duration-fast') },
      'duration-base': { $type: 'duration', $value: raw('--ui-duration-base') },
      'duration-slow': { $type: 'duration', $value: raw('--ui-duration-slow') },
      ease: { $type: 'cubicBezier', $value: raw('--ui-ease') }
    };
    return JSON.stringify(tokens, null, 2) + '\n';
  }

  function download(name, text, type) {
    var blob = new Blob([text], { type: type });
    var a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = name;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(function () { URL.revokeObjectURL(a.href); }, 1000);
  }

  document.querySelectorAll('[data-export]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      if (btn.getAttribute('data-export') === 'tailwind') {
        download(slug() + '_tailwind-theme.css', tailwind(), 'text/css');
      } else {
        download(slug() + '_tokens.json', json(), 'application/json');
      }
    });
  });

  // Pro kontrolu z konzole: BrandTokens.tailwind(), BrandTokens.json()
  window.BrandTokens = { tailwind: tailwind, json: json, refresh: fill };

  if (document.fonts && document.fonts.ready) document.fonts.ready.then(fill);
  fill();
})();
