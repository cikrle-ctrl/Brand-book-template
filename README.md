# Brand Book — šablona (wireframe)

Čistá HTML/CSS šablona brand manuálu. Nemá žádné závislosti ani build krok. Stačí otevřít `index.html` v prohlížeči.

## Struktura

```
brand-book-template/
├── index.html          # celý manuál: 12 kapitol (00–11) jako <section>
├── css/
│   ├── brand.css       # ← JEDINÝ soubor pro klienta: brandové barvy a písma
│   ├── tokens.css      # UI proměnné napojené na brand.css (spacing, velikosti, role barev)
│   ├── base.css        # reset, základní typografie, focus, skip-link
│   ├── layout.css      # header, sidebar, obsah, responzivita, print
│   └── components.css  # placeholdery a stavební bloky
├── js/nav.js           # mobilní menu, zvýraznění aktivní sekce, Stáhnout PDF
├── pdf/
│   ├── manual.html     # PDF manuál jako prezentace 16:9 (styl MILES / Nine Group)
│   ├── slides.css      # styly slidů, napojené na css/brand.css
│   └── build-pdf.ps1   # export do assets/downloads/brand-manual.pdf
└── assets/             # logo/, fonts/, images/, downloads/
```

## Kapitoly

| #  | Kapitola | id |
|----|----------|----|
| 00 | Úvod | `#uvod` |
| 01 | Brand core | `#core` |
| 02 | Verbální identita | `#verbalni` |
| 03 | Logo | `#logo` |
| 04 | Barvy | `#barvy` |
| 05 | Typografie | `#typografie` |
| 06 | Kompozice a layout | `#kompozice` |
| 07 | Obrazový styl | `#obraz` |
| 08 | Motion a zvuk *(volitelné)* | `#motion` |
| 09 | Aplikace | `#aplikace` |
| 10 | Architektura značky a co-branding | `#architektura` |
| 11 | Ke stažení a kontakt | `#ke-stazeni` |

Když kapitolu nebo podsekci smažeš, smaž i odpovídající odkaz v `<nav>` v sidebaru.

## Jak šablonu naplnit reálným brandem

1. **Barvy a písma → `css/brand.css`.** Vyplň `--brand-primary`, `--brand-primary-2`, `--brand-secondary-1/2`, `--brand-neutral-dark/light`, `--brand-on-primary` a fonty `--brand-font-heading` / `--brand-font-body` (soubory fontů do `assets/fonts/` + `@font-face`, šablona je v souboru zakomentovaná). Hodnoty se samy propíšou do celého webu: header a tlačítka, aktivní položka navigace, čísla kapitol, nadpisy, plochy, barevné vzorky v kapitole Barvy, poměr barev i ukázky písma v kapitole Typografie. V souboru je zakomentovaný příklad pro Nine Group.
2. **Logo:** zástupný čtvereček `.logo-mark` v headeru nahraď za `<img src="assets/logo/logo.svg" alt="[Název značky]">`.
3. **Ikony:** viz sekce Ikony níže.
4. **Obrázky:** každý `<figure class="ph …">` nahraď za `<img>` nebo `<figure><img …><figcaption>…</figcaption></figure>`. Soubory ukládej do `assets/images/` nebo `assets/logo/`.
5. **Texty:** každý `.ph-text` nahraď běžným `<p>` s reálným textem. Třídu `ph-heading` u nadpisů odstraň, tím zmizí štítek „Nadpis“.
6. **Hodnoty barev:** doplň HEX / RGB / CMYK / Pantone / RAL do tabulek `.spec-table` u vzorků.
7. **Ke stažení:** soubory dej do `assets/downloads/` a uprav `href` u tlačítek `.btn`.

## Ikony

- V tlačítkách a odkazech **nikdy textové znaky** (šipky, fajfky, křížky) jako ikony.
- Vždy **brandové ikony**; pokud je značka nemá, **Lucide** (lucide.dev, licence ISC).
- Všechny ikony jsou v SVG spritu na začátku `<body>` v `index.html` (`<symbol id="i-…">`) a používají se přes `<svg class="icon"><use href="#i-download"/></svg>`.
- Brandovou ikonu vyměníš tak, že přepíšeš obsah `<symbol>` se stejným id (viewBox 0 0 24 24). Celý web se přepne sám.
- Novou ikonu z Lucide přidáš zkopírováním `<path>` z https://lucide.dev do nového `<symbol>`.

## Komponenty (rychlý přehled)

| Třída | Použití |
|-------|---------|
| `.ph` + `.ph--16x9 / 4x3 / 3x4 / 1x1 / 9x16 / wide` | obrazový placeholder s poměrem stran |
| `.ph--dark`, `.ph--sm` | tmavé pozadí / menší varianta |
| `.ph-text`, `.ph-list`, `.ph-tag` | textová instrukce, seznam, štítek typu obsahu |
| `.ph-heading` | nadpis se štítkem „Nadpis“ |
| `.grid .grid-2 / -3 / -4` | responzivní mřížka |
| `.card` | karta |
| `.swatch` + `.spec-table` | barevný vzorek se specifikací |
| `.proportion` | poměr použití barev (šířky přes `flex:`) |
| `.do-dont`, `.verdict--do / --dont` | Správně / Nesprávně |
| `.type-specimen`, `.data-table` | ukázka písma, tabulky |
| `.pair` | tone of voice „Jsme / Nejsme“ |
| `.circles` | zlatý kruh Proč / Jak / Co |
| `.clearspace`, `.grid-demo` | schéma ochranné zóny, schéma gridu |
| `.swatch--primary / --primary-2 / --secondary-1 / --secondary-2 / --neutral-dark / --neutral-light` | barva vzorku napojená na brand.css |
| `.type-specimen--heading / --body` | ukázka písma napojená na brand.css |
| `.icon` | SVG ikona ze spritu |
| `.btn`, `.btn--primary`, `.note`, `.optional-flag` | tlačítko, hlavní tlačítko, poznámka, označení volitelné sekce |

## PDF manuál a tlačítko „Stáhnout PDF“

`pdf/manual.html` je samostatný PDF brand manuál: prezentace na šířku 16:9 (1920 × 1080) ve stylu MILES / Nine Group, 49 slidů podle stejné struktury 00–11. Obsahuje titulku, obsah, barevné předěly kapitol s obrysovým číslem, obsahové slidy (hlavička nahoře, vizuál uprostřed, název vlevo dole, popis vpravo dole), barvy jako plné plochy i karty s odstíny 50 % / 25 %, specimeny písma, souhrnný slide značky a kontakt.

- **Barvy a písma** bere ze stejného `css/brand.css` jako web, takže web i PDF vypadají vždy stejně.
- **Náhled:** otevři `pdf/manual.html` v prohlížeči.
- **Export do PDF:** spusť
  ```
  powershell -ExecutionPolicy Bypass -File pdfuild-pdf.ps1
  ```
  Skript vytiskne prezentaci přes Microsoft Edge / Google Chrome (headless) do `assets/downloads/brand-manual.pdf`. Tento soubor stahuje tlačítko „Stáhnout PDF“ v headeru webu. Po každé změně obsahu nebo `brand.css` export spusť znovu.
- Pokud PDF chybí, tlačítko zobrazí hlášku místo chybové stránky.

## Tisk webu

Při tisku webu (Ctrl+P) se header i navigace skryjí a každá kapitola začne na nové stránce.
