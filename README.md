# Brand Book — šablona (wireframe) v1.1

Čistá HTML/CSS šablona brand manuálu. Nemá žádné závislosti ani build krok. Stačí otevřít `index.html` v prohlížeči (pro kontrolu stahování souborů přes lokální server, viz `.claude/launch.json` → „brand-book“).

## Struktura

```
brand-book-template/
├── index.html            # celý web manuál: 15 kapitol (00–14) jako <section>
├── css/
│   ├── brand.css         # ← JEDINÝ soubor pro klienta: barvy, písma, škály, UI tokeny (--ui-*)
│   ├── tokens.css        # proměnné rozhraní manuálu napojené na brand.css
│   ├── base.css          # reset, základní typografie, focus, skip-link
│   ├── layout.css        # header, sidebar, obsah, responzivita, print
│   ├── components.css    # placeholdery a stavební bloky manuálu
│   └── ui-preview.css    # Brand Web Preview: komponenty stylované jen tokeny --ui-* (web i PDF)
├── js/
│   ├── nav.js            # mobilní menu, zvýraznění aktivní sekce, kontrola souborů ke stažení
│   └── tokens.js         # živé hodnoty tokenů, kontrast WCAG, tmavý režim, export Tailwind / JSON
├── pdf/
│   ├── manual.html       # PDF manuál jako prezentace 16:9 (91 slidů, 00–14)
│   ├── slides.css        # styly slidů, napojené na css/brand.css
│   └── build-pdf.ps1     # export do assets/downloads/brand-manual.pdf
├── docs/
│   ├── audit_a_navrh.md          # audit šablony vs. světové reference + návrh rozšíření
│   ├── brand_discovery_otazky.md # discovery dotazník pro klienta + seznam podkladů
│   └── brand_checklist.md        # kontrola a export před předáním brandu klientovi
└── assets/               # logo/, fonts/, images/, downloads/
```

## Pracovní postup

1. **Discovery:** nikdy netvoř bez dat. Před prvním workshopem pošli klientovi `docs/brand_discovery_otazky.md` a vyžádej podklady podle části L.
2. **Tvorba:** naplň manuál podle kapitol níže. Pokud značka nemá vlastní web/UI systém, navrhni ho v `css/brand.css` (blok 4, tokeny `--ui-*`) — kapitola 09 se z něj vykreslí sama.
3. **Předání:** než brand předáš, projdi `docs/brand_checklist.md` bod po bodu.

## Kapitoly

| #  | Kapitola | id | Poznámka |
|----|----------|----|----------|
| 00 | Úvod | `#uvod` | co je nového, verze, značka na jedné stránce, kontakty |
| 01 | Strategie | `#core` | + slib a důkazy, cílové skupiny, konkurence |
| 02 | Verbální identita | `#verbalni` | hlas × tón, matice kanálů, messaging, UX writing, naming |
| 03 | Logo | `#logo` | + kdy kterou variantu, ikony a malé formáty |
| 04 | Barvy | `#barvy` | + škály, stavové barvy, tmavý režim, grafy, živý kontrast |
| 05 | Typografie | `#typografie` | + řezy, náhradní písma, OpenType, licence |
| 06 | Kompozice a layout | `#kompozice` | + spacing, breakpointy, zóny |
| 07 | Vizuální jazyk | `#obraz` | + práva, AI, alt text, úrovně ilustrace, maskot |
| 08 | Motion, video a zvuk | `#motion` | + tokeny pohybu, video, omezený pohyb |
| 09 | Digitální produkt a UI | `#ui` | typescale, sémantická paleta, radius, elevation, Brand Web Preview, export |
| 10 | Aplikace a šablony | `#aplikace` | + rozměry bannerů a sítí, dokumenty, galerie |
| 11 | Obaly, prostor a produkt *(modul)* | `#obaly` | jen pro značky s fyzickým produktem nebo prostorem |
| 12 | Architektura, partneři a média | `#architektura` | + pravidla pro třetí strany, tiskový kit |
| 13 | Přístupnost | `#pristupnost` | souhrn pravidel, EAA |
| 14 | Správa a ke stažení | `#ke-stazeni` | balíčky podle publika, formáty, právo, schvalování |

Volitelné části jsou označené štítkem „volitelné“ / „modul“. Když kapitolu nebo podsekci smažeš, smaž i odpovídající odkaz v `<nav>` v sidebaru a slidy v `pdf/manual.html`.

## Jak šablonu naplnit reálným brandem

1. **Barvy a písma → `css/brand.css`, blok 1.** Vyplň `--brand-primary`, `--brand-primary-2`, `--brand-secondary-1/2`, `--brand-neutral-dark/light`, `--brand-on-primary` a fonty `--brand-font-heading` / `--brand-font-body` (soubory fontů do `assets/fonts/` + `@font-face`, šablona je v souboru zakomentovaná). Hodnoty se propíšou do celého webu i PDF. V souboru je zakomentovaný příklad pro Nine Group.
2. **Stavové barvy a škály → bloky 2 a 3.** Škály 50–900 se dopočítají samy; ručně laděné odstíny přepiš.
3. **UI / Web System → blok 4** (viz níže).
4. **Logo:** zástupný čtvereček `.logo-mark` v headeru nahraď za `<img src="assets/logo/logo.svg" alt="[Název značky]">`.
5. **Ikony:** viz sekce Ikony níže.
6. **Obrázky:** každý `<figure class="ph …">` nahraď za `<img>` nebo `<figure><img …><figcaption>…</figcaption></figure>`. Soubory ukládej do `assets/images/` nebo `assets/logo/`.
7. **Texty:** každý `.ph-text` nahraď běžným `<p>` s reálným textem. Třídu `ph-heading` u nadpisů odstraň, tím zmizí štítek „Nadpis“.
8. **Hodnoty barev:** HEX a RGB se doplňují samy z brand.css; OKLCH, CMYK, Pantone a RAL doplň ručně do tabulek `.spec-table`.
9. **Ke stažení:** soubory dej do `assets/downloads/` pod názvy z tlačítek v kapitole 14 (nebo uprav `href`). Dokud soubor chybí, tlačítko ukáže hlášku místo chybové stránky.
10. **Název pro export:** v `<meta name="brand-slug">` (index.html i pdf/manual.html) nastav krátký název bez diakritiky; použije se v názvech exportovaných souborů.

## UI / Web System (kapitola 09)

Tokeny `--ui-*` v `css/brand.css` jsou jediný zdroj pravdy pro web a aplikaci:

- **Sémantická paleta:** `primary`, `primary-hover`, `primary-foreground`, `secondary`, `secondary-foreground`, `background`, `foreground`, `muted`, `muted-foreground`, `border`, `inverted`, `inverted-foreground`, `accent`, `accent-foreground`, `destructive`, `destructive-foreground`, `success`, `success-foreground`, `ring` + blok `[data-theme="dark"]`.
- **Typography scale:** Display, H1–H6, P1–P3 (`-size`, `-lh`, `-weight`, `-tracking`); Display–H3 fluidně přes `clamp()` s desktopovou hodnotou `-max`.
- **Geometrie:** radius `none / sm / md / lg / full` + role `button / input / card / modal`; stíny `shadow-sm / md / lg` + role. Flat brand: stíny nastav na `none` a v kapitole 09 ponech větu „Brand nevyužívá elevation ani shadows, design je striktně flat.“
- **Brand Web Preview** (`css/ui-preview.css`) používá výhradně tyto tokeny. Nové komponenty přidávej stejně: nejdřív token, pak styl.
- **Export:** tlačítka v kapitole 09 stáhnou z aktuálních hodnot **Tailwind v4 `@theme`** (`bg-primary`, `text-h1`, `rounded-card`, `shadow-md`…) a **tokens.json** (W3C Design Tokens). Z konzole: `BrandTokens.tailwind()`, `BrandTokens.json()`.
- **Kontrast** všech dvojic se počítá živě (WCAG 2.2); „nevyhovuje“ = uprav token.

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
| `.scale` + `.scale__step` | odstínová škála 50–900 |
| `.proportion` | poměr použití barev (šířky přes `flex:`) |
| `.do-dont`, `.verdict--do / --dont` | Správně / Nesprávně (barvy z `--brand-do / --brand-dont`) |
| `.type-specimen`, `.data-table` | ukázka písma, tabulky |
| `.pair`, `.tone-scale` | hlas „Jsme / Nejsme“, škála tónu −3…+3 |
| `.circles` | zlatý kruh Proč / Jak / Co |
| `.clearspace`, `.grid-demo` | schéma ochranné zóny, schéma gridu |
| `.shape-demo`, `.type-ladder` | ukázka radiusu a stínů, živá typografická škála |
| `.preview`, `.annot` | rám Brand Web Preview, popis v tokenech |
| `.overview-web` | značka na jedné stránce |
| `.ui …` (`css/ui-preview.css`) | komponenty ukázkového UI: `.ui-btn`, `.ui-input`, `.ui-card`, `.ui-alert`, `.ui-hero`, `.ui-modal`… |
| `.icon`, `.btn`, `.btn--primary`, `.optional-flag` | ikona, tlačítko, hlavní tlačítko, označení volitelné sekce |

Datové atributy (`js/tokens.js`): `data-token` (vzorek + HEX), `data-token-hex`, `data-token-rgb`, `data-token-raw` (hodnota tokenu), `data-contrast="--a --b"` (+ `data-large`), `data-theme-source="dark"`, `data-theme-toggle`, `data-export="tailwind|json"`. Tlačítka ke stažení: `data-file="Název"`.

## PDF manuál a tlačítko „Stáhnout PDF“

`pdf/manual.html` je samostatný PDF brand manuál: prezentace na šířku 16:9 (1920 × 1080), 91 slidů podle struktury 00–14. Obsahuje titulku, obsah, barevné předěly kapitol s obrysovým číslem, obsahové slidy (hlavička nahoře, vizuál uprostřed, název vlevo dole, popis vpravo dole), barvy jako plné plochy, karty a škály, živé tabulky tokenů a kontrastu, ukázky UI a Brand Web Preview, souhrnný slide značky a kontakt.

- **Barvy, písma a tokeny** bere ze stejného `css/brand.css` jako web, takže web i PDF vypadají vždy stejně.
- **Náhled:** otevři `pdf/manual.html` v prohlížeči.
- **Export do PDF:** spusť
  ```
  powershell -ExecutionPolicy Bypass -File pdf\build-pdf.ps1
  ```
  Skript vytiskne prezentaci přes Microsoft Edge / Google Chrome (headless) do `assets/downloads/brand-manual.pdf`. Tento soubor stahuje tlačítko „Stáhnout PDF“ v headeru webu. Po každé změně obsahu nebo `brand.css` export spusť znovu.
- Pokud PDF chybí, tlačítko zobrazí hlášku místo chybové stránky.
- Text nesmí přetékat přes okraj slidu (Chrome ho při tisku zahodí). Dekorativní ořezané prvky dělej jako SVG.

## Tisk webu

Při tisku webu (Ctrl+P) se header i navigace skryjí a každá kapitola začne na nové stránce.

## Changelog šablony

| Verze | Datum | Změna |
|-------|-------|-------|
| 1.1 | 24. 9. 2026 | Struktura 00–14 podle auditu (`docs/audit_a_navrh.md`): nové kapitoly 09 Digitální produkt a UI, 11 Obaly, prostor a produkt (modul), 13 Přístupnost; UI tokeny `--ui-*`, Brand Web Preview, export Tailwind v4 a tokens.json, živé HEX/RGB a kontrast, škály 50–900, stavové barvy; PDF rozšířeno na 91 slidů; docs (audit, checklist, discovery). |
| 1.0 | 23. 9. 2026 | První verze: struktura 00–11, web + PDF (49 slidů). |
