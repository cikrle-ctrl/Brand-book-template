/* ==========================================================================
   TOKENS — živé hodnoty z css/brand.css v manuálu (Aestio Core 2.0)
   - [data-token="--ui-primary"]                 → vzorek + HEX (u průhledných rgba)
   - [data-token-raw="--ui-h1-size"]             → hodnota tokenu tak, jak je spočítaná
   - [data-token-src="--ui-surface"]             → zápis v brand.css (např. var(--brand-white))
   - [data-contrast="--ui-foreground --ui-background"] (+ data-large) → kontrast WCAG
   - data-theme-source="dark|compact|comfortable|klient|klient-dark" → hodnota z daného módu
   - [data-theme-toggle="#id"]                   → přepíná světlý / tmavý režim ukázky
   - [data-set-attr][data-set-value][data-target] → přepínače módů (hustota, téma) ve skupině
   - [data-export="tailwind" | "json"]           → stáhne Tailwind v4 @theme / tokens.json
   Bez závislostí. Hodnoty se čtou vždy znovu, takže odpovídají brand.css.
   ========================================================================== */
(function () {
  // Sondy: jeden prvek pro každý mód.
  var MODE_ATTRS = {
    light: {},
    dark: { 'data-theme': 'dark' },
    compact: { 'data-density': 'compact' },
    comfortable: { 'data-density': 'comfortable' },
    klient: { 'data-brand': 'klient' },
    'klient-dark': { 'data-brand': 'klient', 'data-theme': 'dark' }
  };
  var probes = {};
  Object.keys(MODE_ATTRS).forEach(function (m) {
    var el = document.createElement('div');
    el.setAttribute('aria-hidden', 'true');
    el.style.cssText = 'position:absolute;width:0;height:0;overflow:hidden;visibility:hidden;pointer-events:none';
    Object.keys(MODE_ATTRS[m]).forEach(function (k) { el.setAttribute(k, MODE_ATTRS[m][k]); });
    var inner = document.createElement('span');
    el.appendChild(inner);
    document.body.appendChild(el);
    probes[m] = { wrap: el, inner: inner };
  });

  var canvas = document.createElement('canvas');
  canvas.width = canvas.height = 1;
  var ctx = canvas.getContext('2d', { willReadFrequently: true });

  function probe(mode) { return probes[mode] || probes.light; }

  function raw(name, mode) {
    return getComputedStyle(probe(mode).wrap).getPropertyValue(name).trim();
  }

  // Libovolná CSS barva (i oklch / color-mix) → [r, g, b, a]
  function rgbaOf(name, mode) {
    var p = probe(mode);
    p.inner.style.color = '';
    p.inner.style.color = 'var(' + name + ')';
    var css = getComputedStyle(p.inner).color;
    ctx.clearRect(0, 0, 1, 1);
    ctx.fillStyle = '#000';
    ctx.fillStyle = css;
    ctx.fillRect(0, 0, 1, 1);
    var d = ctx.getImageData(0, 0, 1, 1).data;
    return [d[0], d[1], d[2], d[3]];
  }
  function rgbOf(name, mode) { return rgbaOf(name, mode).slice(0, 3); }

  function hex(rgb) {
    return '#' + rgb.slice(0, 3).map(function (v) { return v.toString(16).padStart(2, '0'); }).join('').toUpperCase();
  }

  // HEX, nebo rgba() u průhledných tokenů (overlay)
  function color(name, mode) {
    var c = rgbaOf(name, mode);
    if (c[3] >= 255) return hex(c);
    return 'rgba(' + c[0] + ', ' + c[1] + ', ' + c[2] + ', ' + (c[3] / 255).toFixed(2) + ')';
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

  // ---------- Zápis tokenů v brand.css (CSSOM) — kvůli referencím v tokens.json ----------
  // { base: {name: text}, dark: {...}, compact: {...}, comfortable: {...}, klient: {...} }
  function sourceMap() {
    var map = { base: {}, dark: {}, compact: {}, comfortable: {}, klient: {} };
    var ok = false;
    Array.prototype.forEach.call(document.styleSheets, function (sheet) {
      if (!/brand\.css/.test(sheet.href || '')) return;
      var rules;
      try { rules = sheet.cssRules; } catch (e) { return; }
      ok = true;
      Array.prototype.forEach.call(rules, function (rule) {
        if (!rule.style) return;
        var sel = rule.selectorText || '';
        var bucket = /data-theme="dark"/.test(sel) ? 'dark'
          : /data-density="compact"/.test(sel) ? 'compact'
          : /data-density="comfortable"/.test(sel) ? 'comfortable'
          : /data-brand="klient"/.test(sel) ? 'klient'
          : /:root/.test(sel) ? 'base' : null;
        if (!bucket) return;
        for (var i = 0; i < rule.style.length; i++) {
          var prop = rule.style[i];
          if (prop.indexOf('--') === 0) map[bucket][prop] = rule.style.getPropertyValue(prop).trim();
        }
      });
    });
    return ok ? map : null;
  }

  function fill() {
    var src = null;
    document.querySelectorAll('[data-token]').forEach(function (el) {
      var mode = el.getAttribute('data-theme-source') || 'light';
      var name = el.getAttribute('data-token');
      var value = color(name, mode);
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

    document.querySelectorAll('[data-token-src]').forEach(function (el) {
      src = src || sourceMap() || { base: {}, dark: {} };
      var mode = el.getAttribute('data-theme-source') === 'dark' ? 'dark' : 'base';
      var name = el.getAttribute('data-token-src');
      var v = src[mode][name] || src.base[name] || '';
      el.textContent = v.replace(/^var\((--[\w-]+)\)$/, '$1') || '—';
    });

    document.querySelectorAll('[data-contrast]').forEach(function (el) {
      var mode = el.getAttribute('data-theme-source') || 'light';
      var pair = el.getAttribute('data-contrast').split(/\s+/);
      var ratio = contrast(rgbOf(pair[0], mode), rgbOf(pair[1], mode));
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
      var use = btn.querySelector('use');
      if (use) use.setAttribute('href', dark ? '#i-sun' : '#i-moon');
    });
  });

  // Přepínače módů: <button data-target="#x" data-set-attr="data-density" data-set-value="compact">
  // Prázdná hodnota atribut odebere. Tlačítka se stejným cílem a atributem tvoří skupinu.
  document.querySelectorAll('[data-set-attr]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var sel = btn.getAttribute('data-target');
      var attr = btn.getAttribute('data-set-attr');
      var val = btn.getAttribute('data-set-value');
      var target = document.querySelector(sel);
      if (!target) return;
      if (val) target.setAttribute(attr, val); else target.removeAttribute(attr);
      document.querySelectorAll('[data-target="' + sel + '"][data-set-attr="' + attr + '"]').forEach(function (b) {
        b.setAttribute('aria-pressed', String(b === btn));
      });
    });
  });

  // ---------- Export ----------
  var COLORS = ['primary', 'primary-hover', 'primary-foreground', 'secondary', 'secondary-hover', 'secondary-foreground',
    'background', 'foreground', 'muted', 'muted-foreground', 'border', 'inverted', 'inverted-foreground',
    'accent', 'accent-foreground', 'destructive', 'destructive-foreground', 'success', 'success-foreground', 'ring',
    'surface', 'surface-subtle', 'border-strong', 'foreground-subtle', 'accent-subtle',
    'selected', 'selected-foreground', 'disabled', 'disabled-foreground', 'overlay',
    'warning', 'warning-foreground', 'info', 'info-foreground'];
  ['success', 'warning', 'info', 'destructive'].forEach(function (s) {
    COLORS.push(s + '-subtle', s + '-subtle-foreground', s + '-border');
  });
  var CHART = ['chart-1', 'chart-2', 'chart-3', 'chart-4', 'chart-5', 'chart-6',
    'chart-1-subtle', 'chart-2-subtle', 'chart-3-subtle', 'chart-4-subtle', 'chart-5-subtle', 'chart-6-subtle',
    'chart-seq-1', 'chart-seq-2', 'chart-seq-3', 'chart-seq-4', 'chart-seq-5',
    'chart-div-neg', 'chart-div-mid', 'chart-div-pos', 'chart-grid', 'chart-axis'];
  var TYPE = ['display', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p1', 'p2', 'p3'];
  var APP_TYPE = ['app-h1', 'app-h2', 'app-h3', 'app-body', 'app-label', 'app-caption'];
  var RADII = ['none', 'xs', 'sm', 'md', 'lg', 'full'];
  var SHADOWS = ['sm', 'md', 'lg'];
  // Barvy služeb (--brand-svc-<služba>(-fg|-hover)): exportují se, jen když je značka definuje
  var SERVICES = ['web', 'app', 'webapp', 'ux', 'ai'].filter(function (x) { return raw('--brand-svc-' + x); });
  var ROLES = ['button', 'input', 'card', 'modal'];      // --ui-radius-<role>
  var SHADOW_ROLES = ['button', 'card', 'modal'];        // --ui-shadow-<role>
  var SPACE = ['0', '1', '2', '3', '4', '5', '6', '8', '10', '12', '16', '20', '24'];
  var Z = ['base', 'dropdown', 'sticky', 'overlay', 'modal', 'toast', 'tooltip'];
  var LAYOUT = ['control-h-sm', 'control-h-md', 'control-h-lg', 'icon-sm', 'icon-md', 'icon-lg',
    'border-width', 'focus-width', 'focus-offset'];
  // Úroveň 3 — komponentní tokeny (--ui-<název>)
  var COMPONENT = ['button-h-sm', 'button-px-sm', 'button-h-md', 'button-px-md', 'button-h-lg', 'button-px-lg',
    'button-gap', 'button-radius',
    'input-h', 'input-px', 'input-bg', 'input-border', 'input-border-focus', 'input-radius',
    'table-row-h', 'table-cell-px', 'table-header-bg', 'table-row-hover', 'table-row-selected', 'table-border',
    'card-bg', 'card-border', 'card-padding', 'card-radius', 'card-gap',
    'badge-h', 'badge-px', 'badge-radius',
    'toast-bg', 'toast-fg', 'tooltip-bg', 'tooltip-fg', 'tooltip-radius',
    'sidebar-w', 'sidebar-bg', 'topbar-h', 'page-gap'];
  var DENSITIES = ['compact', 'comfortable'];

  function slug() {
    var meta = document.querySelector('meta[name="brand-slug"]');
    return (meta && meta.content) || 'znacka';
  }

  function today() {
    var d = new Date();
    return d.getDate() + '. ' + (d.getMonth() + 1) + '. ' + d.getFullYear();
  }

  function isColor(name) { return CSS.supports('color', raw(name)) || /color-mix|^#|rgb|oklch/.test(raw(name)); }

  function tailwind() {
    var out = [];
    out.push('/* ' + slug() + ' — Tailwind v4 theme (Aestio Core 2.0)');
    out.push('   Vygenerováno z brand manuálu (css/brand.css), ' + today() + '.');
    out.push('   Použití: vlož do hlavního CSS souboru projektu. Utility: bg-primary, text-foreground, bg-surface,');
    out.push('   text-app-body, rounded-md, p-4 (spacing po 4 px) … Módy na <html> nebo kontejneru:');
    out.push('   data-theme="dark" (varianta dark:), data-density="compact|comfortable" (varianty compact:, comfortable:). */');
    out.push('@import "tailwindcss";');
    out.push('@custom-variant dark (&:where([data-theme="dark"], [data-theme="dark"] *));');
    out.push('@custom-variant compact (&:where([data-density="compact"], [data-density="compact"] *));');
    out.push('@custom-variant comfortable (&:where([data-density="comfortable"], [data-density="comfortable"] *));');
    out.push('');
    out.push('@theme {');
    out.push('  /* Striktní systém: výchozí škály Tailwindu vypnuté, platí jen tokeny značky */');
    out.push('  --color-*: initial;');
    out.push('  --radius-*: initial;');
    out.push('  --shadow-*: initial;');
    out.push('  --inset-shadow-*: initial;');
    out.push('  --drop-shadow-*: initial;');
    out.push('  --text-*: initial;');
    out.push('');
    out.push('  --color-white: #FFFFFF;');
    out.push('  --color-transparent: transparent;');
    out.push('  --color-current: currentColor;');
    COLORS.forEach(function (c) { out.push('  --color-' + c + ': ' + color('--ui-' + c) + ';'); });
    out.push('');
    out.push('  /* Datová vizualizace: stroke-chart-1 fill-chart-1-subtle … */');
    CHART.forEach(function (c) { out.push('  --color-' + c + ': ' + color('--ui-' + c) + ';'); });
    out.push('');
    if (SERVICES.length) out.push('  /* Barvy služeb: bg-svc-app text-svc-app-fg hover:bg-svc-app-hover */');
    SERVICES.forEach(function (s) {
      out.push('  --color-svc-' + s + ': ' + color('--brand-svc-' + s) + ';');
      out.push('  --color-svc-' + s + '-fg: ' + color('--brand-svc-' + s + '-fg') + ';');
      out.push('  --color-svc-' + s + '-hover: ' + color('--brand-svc-' + s + '-hover') + ';');
    });
    out.push('');
    out.push('  --font-primary: ' + raw('--ui-font-primary') + ';');
    out.push('  --font-secondary: ' + raw('--ui-font-secondary') + ';');
    out.push('  --font-script: ' + raw('--ui-font-script') + ';');
    out.push('  --text-script: ' + raw('--ui-script-size') + ';');
    out.push('  --text-script--line-height: ' + raw('--ui-script-lh') + ';');
    out.push('');
    TYPE.forEach(function (t) {
      out.push('  --text-' + t + ': ' + raw('--ui-' + t + '-size') + ';');
      out.push('  --text-' + t + '--line-height: ' + raw('--ui-' + t + '-lh') + ';');
      out.push('  --text-' + t + '--font-weight: ' + raw('--ui-' + t + '-weight') + ';');
      out.push('  --text-' + t + '--letter-spacing: ' + raw('--ui-' + t + '-tracking') + ';');
    });
    out.push('');
    out.push('  /* Produktová škála: text-app-body (v compact se zmenší přes proměnnou) */');
    APP_TYPE.forEach(function (t) {
      out.push('  --text-' + t + ': var(--ui-' + t + '-size);');
      out.push('  --text-' + t + '--line-height: var(--ui-' + t + '-lh);');
      out.push('  --text-' + t + '--font-weight: ' + raw('--ui-' + t + '-weight') + ';');
    });
    out.push('');
    RADII.forEach(function (r) { out.push('  --radius-' + r + ': ' + raw('--ui-radius-' + r) + ';'); });
    ROLES.forEach(function (r) { out.push('  --radius-' + r + ': ' + raw('--ui-radius-' + r) + ';'); });
    out.push('');
    out.push('  /* Brand nevyužívá elevation ani shadows, design je striktně flat. */');
    SHADOWS.forEach(function (s) { out.push('  --shadow-' + s + ': ' + raw('--ui-shadow-' + s) + ';'); });
    SHADOW_ROLES.forEach(function (s) { out.push('  --shadow-' + s + ': ' + raw('--ui-shadow-' + s) + ';'); });
    out.push('');
    out.push('  /* Spacing po 4 px: p-1 = 4 px, p-2 = 8 px, p-6 = 24 px (= --ui-space-N) */');
    out.push('  --spacing: ' + raw('--brand-space-unit') + ';');
    out.push('  --ease-brand: ' + raw('--ui-ease') + ';');
    out.push('  --ease-menu: ' + raw('--ui-ease-menu') + ';');
    out.push('  --duration-fast: ' + raw('--ui-duration-fast') + ';  /* použití: duration-(--duration-fast) */');
    out.push('  --duration-base: ' + raw('--ui-duration-base') + ';');
    out.push('  --duration-slow: ' + raw('--ui-duration-slow') + ';');
    out.push('}');
    out.push('');
    out.push('@layer base {');
    out.push('  /* Rozměry, vrstvy a komponentní tokeny (úroveň 3): h-(--ui-button-h-md), z-(--ui-z-modal) … */');
    out.push('  :root, [data-density] {');
    APP_TYPE.forEach(function (t) {
      out.push('    --ui-' + t + '-size: ' + raw('--ui-' + t + '-size') + ';');
      out.push('    --ui-' + t + '-lh: ' + raw('--ui-' + t + '-lh') + ';');
    });
    LAYOUT.forEach(function (n) { out.push('    --ui-' + n + ': ' + raw('--ui-' + n) + ';'); });
    Z.forEach(function (n) { out.push('    --ui-z-' + n + ': ' + raw('--ui-z-' + n) + ';'); });
    COMPONENT.forEach(function (n) {
      var r = raw('--ui-' + n);
      out.push('    --ui-' + n + ': ' + (isColor('--ui-' + n) ? componentColorRef(n) : r) + ';');
    });
    out.push('  }');
    DENSITIES.forEach(function (d) {
      out.push('  [data-density="' + d + '"] {');
      APP_TYPE.concat([]).forEach(function (t) {
        ['size', 'lh'].forEach(function (k) {
          var v = raw('--ui-' + t + '-' + k, d);
          if (v !== raw('--ui-' + t + '-' + k)) out.push('    --ui-' + t + '-' + k + ': ' + v + ';');
        });
      });
      LAYOUT.concat(COMPONENT).forEach(function (n) {
        if (isColor('--ui-' + n)) return;
        var v = raw('--ui-' + n, d);
        if (v !== raw('--ui-' + n)) out.push('    --ui-' + n + ': ' + v + ';');
      });
      out.push('  }');
    });
    out.push('  [data-theme="dark"] {');
    COLORS.concat(CHART).forEach(function (c) { out.push('    --color-' + c + ': ' + color('--ui-' + c, 'dark') + ';'); });
    SHADOWS.concat(SHADOW_ROLES).forEach(function (s) { out.push('    --shadow-' + s + ': ' + raw('--ui-shadow-' + s, 'dark') + ';'); });
    out.push('  }');
    out.push('}');
    return out.join('\n') + '\n';
  }

  // Komponentní barva jako odkaz na Tailwind barvu (dědí tmavý režim)
  function componentColorRef(n) {
    var src = sourceMap();
    var s = src && src.base['--ui-' + n];
    var m = s && s.match(/^var\(--ui-([\w-]+)\)$/);
    if (m && (COLORS.indexOf(m[1]) > -1 || CHART.indexOf(m[1]) > -1)) return 'var(--color-' + m[1] + ')';
    return color('--ui-' + n);
  }

  // ---------- W3C DTCG ve třech úrovních ----------
  function json() {
    var src = sourceMap();
    var primNames = {};      // --brand-x → cesta
    var tokens = {
      $description: slug() + ' — design tokeny Aestio Core 2.0 (W3C DTCG), tři úrovně: primitive → semantic → component. ' +
        'Módy jsou v $extensions["cz.aestio.modes"] (dark, compact, comfortable, klient). Vygenerováno ' + today() + '.',
      primitive: { color: {}, dimension: {}, font: {} },
      semantic: { color: {}, chart: {}, typography: {}, 'app-typography': {}, radius: {}, shadow: {}, space: {}, layout: {}, z: {}, motion: {} },
      component: {}
    };

    function primPath(name) {
      var key = name.replace(/^--brand-/, '');
      if (/font/.test(key)) return 'primitive.font.' + key;
      if (/space|heading-weight|heading-case/.test(key)) return 'primitive.dimension.' + key;
      return 'primitive.color.' + key;
    }
    function semPath(name) {
      var k = name.replace(/^--ui-/, '');
      if (COLORS.indexOf(k) > -1) return 'semantic.color.' + k;
      if (CHART.indexOf(k) > -1) return 'semantic.chart.' + k;
      if (/^radius-/.test(k)) return 'semantic.radius.' + k.slice(7);
      if (/^space-/.test(k)) return 'semantic.space.' + k.slice(6);
      if (/^z-/.test(k)) return 'semantic.z.' + k.slice(2);
      if (LAYOUT.indexOf(k) > -1) return 'semantic.layout.' + k;
      if (COMPONENT.indexOf(k) > -1) {
        var part = k.split('-');
        return 'component.' + part[0] + '.' + part.slice(1).join('-');
      }
      return null;
    }
    function ref(text, bucket) {
      // var(--x) → {cesta}; jinak spočítaná hodnota
      var m = text && text.match(/^var\((--[\w-]+)\)$/);
      if (!m) return null;
      var n = m[1];
      var p = n.indexOf('--brand-') === 0 ? primPath(n) : semPath(n);
      return p ? '{' + p + '}' : null;
    }
    function value(name, mode, kind) {
      var bucket = mode === 'light' ? 'base' : mode;
      var text = src ? (src[bucket] && src[bucket][name]) : null;
      var r = text ? ref(text, bucket) : null;
      if (r) return r;
      return kind === 'color' ? color(name, mode) : raw(name, mode);
    }
    function set(obj, path, tok) {
      var parts = path.split('.');
      var o = obj;
      for (var i = 0; i < parts.length - 1; i++) { o[parts[i]] = o[parts[i]] || {}; o = o[parts[i]]; }
      o[parts[parts.length - 1]] = tok;
    }
    function token(name, kind, modes) {
      var t = { $type: kind, $value: value(name, 'light', kind) };
      var text = src && src.base[name];
      if (text && !/^var\(/.test(text) && /color-mix|calc|clamp/.test(text)) t.$extensions = { 'cz.aestio.css': text };
      var ext = {};
      (modes || []).forEach(function (m) {
        // Explicitní přepis v módu → odkaz; odvozená hodnota (color-mix) → jen pokud se liší
        if (src && src[m] && src[m][name] !== undefined) { ext[m] = value(name, m, kind); return; }
        var v = kind === 'color' ? color(name, m) : raw(name, m);
        var base = kind === 'color' ? color(name) : raw(name);
        if (v !== base) ext[m] = v;
      });
      if (Object.keys(ext).length) { t.$extensions = t.$extensions || {}; t.$extensions['cz.aestio.modes'] = ext; }
      return t;
    }

    // Úroveň 1 — primitiva (vše --brand-* z :root a jejich přepis v tématu klient)
    var prims = src ? Object.keys(src.base).filter(function (n) { return n.indexOf('--brand-') === 0; }) : [];
    if (!prims.length) prims = ['--brand-primary', '--brand-primary-2', '--brand-secondary-1', '--brand-neutral-dark', '--brand-neutral-light'];
    prims.forEach(function (n) {
      var p = primPath(n);
      var kind = /\.font\./.test(p) ? 'fontFamily' : /\.dimension\./.test(p) ? 'dimension' : 'color';
      if (/heading-weight/.test(n)) kind = 'fontWeight';
      if (/heading-case/.test(n)) kind = 'string';
      primNames[n] = p;
      set(tokens, p, token(n, kind, ['klient']));
    });

    // Úroveň 2 — sémantika
    COLORS.forEach(function (c) { set(tokens, 'semantic.color.' + c, token('--ui-' + c, 'color', ['dark'])); });
    CHART.forEach(function (c) { set(tokens, 'semantic.chart.' + c, token('--ui-' + c, 'color', ['dark'])); });
    tokens.semantic.font = {
      primary: { $type: 'fontFamily', $value: value('--ui-font-primary', 'light', 'font') },
      secondary: { $type: 'fontFamily', $value: value('--ui-font-secondary', 'light', 'font') },
      script: { $type: 'fontFamily', $value: value('--ui-font-script', 'light', 'font') }
    };
    TYPE.forEach(function (t) {
      tokens.semantic.typography[t] = {
        $type: 'typography',
        $value: {
          fontFamily: /^(p1|p2|p3)$/.test(t) ? '{semantic.font.secondary}' : '{semantic.font.primary}',
          fontSize: raw('--ui-' + t + '-size'),
          fontWeight: Number(raw('--ui-' + t + '-weight')) || raw('--ui-' + t + '-weight'),
          lineHeight: Number(raw('--ui-' + t + '-lh')) || raw('--ui-' + t + '-lh'),
          letterSpacing: raw('--ui-' + t + '-tracking')
        }
      };
    });
    APP_TYPE.forEach(function (t) {
      var tok = {
        $type: 'typography',
        $value: {
          fontFamily: '{semantic.font.primary}',
          fontSize: raw('--ui-' + t + '-size'),
          fontWeight: Number(raw('--ui-' + t + '-weight')),
          lineHeight: raw('--ui-' + t + '-lh'),
          letterSpacing: '0em'
        }
      };
      DENSITIES.forEach(function (d) {
        var fs = raw('--ui-' + t + '-size', d), lh = raw('--ui-' + t + '-lh', d);
        if (fs !== raw('--ui-' + t + '-size') || lh !== raw('--ui-' + t + '-lh')) {
          tok.$extensions = tok.$extensions || { 'cz.aestio.modes': {} };
          tok.$extensions['cz.aestio.modes'][d] = { fontSize: fs, lineHeight: lh };
        }
      });
      tokens.semantic['app-typography'][t] = tok;
    });
    tokens.semantic['app-typography'].$description = 'Číslice v tabulkách a KPI: font-variant-numeric ' + raw('--ui-app-numeric');
    RADII.concat(ROLES).forEach(function (r) { set(tokens, 'semantic.radius.' + r, token('--ui-radius-' + r, 'dimension')); });
    SHADOWS.concat(SHADOW_ROLES).forEach(function (s) {
      tokens.semantic.shadow[s] = { $type: 'shadow', $value: [], $description: 'Brand nevyužívá elevation ani shadows, design je striktně flat (CSS: ' + raw('--ui-shadow-' + s) + ').' };
    });
    SPACE.forEach(function (n) { set(tokens, 'semantic.space.' + n, { $type: 'dimension', $value: raw('--ui-space-' + n) || '0rem', $description: (Number(n) * 4) + ' px' }); });
    LAYOUT.forEach(function (n) { set(tokens, 'semantic.layout.' + n, token('--ui-' + n, 'dimension', DENSITIES)); });
    Z.forEach(function (n) { tokens.semantic.z[n] = { $type: 'number', $value: Number(raw('--ui-z-' + n)) }; });
    tokens.semantic.motion = {
      'duration-fast': { $type: 'duration', $value: raw('--ui-duration-fast') },
      'duration-base': { $type: 'duration', $value: raw('--ui-duration-base') },
      'duration-slow': { $type: 'duration', $value: raw('--ui-duration-slow') },
      ease: { $type: 'cubicBezier', $value: (raw('--ui-ease').match(/[\d.]+/g) || []).map(Number) },
      'ease-menu': { $type: 'cubicBezier', $value: (raw('--ui-ease-menu').match(/[\d.]+/g) || []).map(Number) }
    };

    // Úroveň 3 — komponenty
    COMPONENT.forEach(function (n) {
      var kind = isColor('--ui-' + n) ? 'color' : 'dimension';
      set(tokens, semPath('--ui-' + n), token('--ui-' + n, kind, kind === 'color' ? [] : DENSITIES));
    });

    // Barvy služeb (jen téma Aestio)
    if (SERVICES.length) tokens.semantic['color-service'] = {};
    SERVICES.forEach(function (s) {
      tokens.semantic['color-service'][s] = {
        bg: { $type: 'color', $value: '{primitive.color.svc-' + s + '}' },
        fg: { $type: 'color', $value: '{primitive.color.svc-' + s + '-fg}' },
        hover: { $type: 'color', $value: '{primitive.color.svc-' + s + '-hover}' }
      };
    });
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
  window.BrandTokens = { tailwind: tailwind, json: json, refresh: fill, color: color, contrast: contrast, rgbOf: rgbOf };

  if (document.fonts && document.fonts.ready) document.fonts.ready.then(fill);
  fill();
})();
