# Z brand manuálu produktový design systém

Metodika šablony brand manuálu v1.2 (3. 10. 2026). Vzorová aplikace: Aestio Core 2.0 (`Brands/aestio`, kapitola 09 a `docs/design_system_saas.md`).

Brand manuál odpovídá na otázku, jak značka vypadá a mluví. Produktový design systém odpovídá na otázku, jak se v ní pracuje: co se stane po kliknutí, jak vypadá tabulka s tisícem řádků, prázdný seznam nebo chyba sítě. Kapitola 09 šablony je postavená tak, aby z každého brandu vznikl použitelný systém pro web, portál i aplikaci.

## 1. Typy SaaS a co od design systému potřebují

Design systém není jeden. Liší se podle toho, kolik dat produkt ukazuje, kdo ho ovládá a na jakém zařízení.

| Typ produktu | Typický uživatel | Co systém musí umět | Na co si dát pozor |
|---|---|---|---|
| Datový B2B dashboard, portál, administrace | Operátor, účetní, správce, který v nástroji tráví hodiny | Hustota (compact), tabulky s řazením, filtrováním a výběrem, grafy, klávesnice, hromadné akce, stavy načítání | Čitelnost čísel (tabulkové číslice), kontrast grafů, nezahltit barvou, jasné prázdné a chybové stavy |
| Self-service nástroj (onboarding, konfigurátor, klientská zóna) | Občasný uživatel bez zaškolení | Průvodce v krocích, prázdné stavy s další akcí, srozumitelné texty, validace v místě, potvrzení | Microcopy je polovina UX. Každá chyba musí říct, co dál. |
| Mobilní aplikace (iOS, Android, KMP) | Kdokoli, často jednou rukou a venku | Dotykové cíle 44 px a víc, spodní navigace, offline a pomalá síť, skeletony, systémový tmavý režim | Hustota „comfortable“, žádné hover stavy jako jediný nosič informace |
| Marketingový web | Návštěvník, který se rozhoduje | Velká typografie, rytmus sekcí, CTA, formuláře | Marketingová škála písma se do produktu nepřenáší |

Z toho plyne základní pravidlo: **jedna sada tokenů a komponent, tři režimy hustoty a dva barevné režimy.** Ne tři různé systémy.

## 2. Metodika: z brandu produkt v devíti krocích

Postup platí pro každou značku. Každý krok má výstup, který se dá zkontrolovat.

1. **Inventura brandu.** Sepsat, co značka má: barvy, písma, tvary, tonalitu, logo, ikony, fotky. Označit, co je jen marketingové (Briem Hand, velká Display typografie, barvy služeb) a co se přenese do produktu.
2. **Primitiva (úroveň 1).** Surové hodnoty bez významu: paleta, odvozené škály 50–900, neutrální „noc“ pro tmavý režim, stavové škály, prostorová jednotka 4 px, písma. Žádná komponenta je nesmí použít přímo.
3. **Sémantické role (úroveň 2).** Každé primitivum dostane roli: `primary`, `surface`, `foreground-subtle`, `warning-subtle`… Role říká, k čemu barva slouží, ne jak vypadá. Tady vzniká mapování světlého a tmavého režimu.
4. **Stavové vrstvy.** Pro každý interaktivní prvek: default, hover, active, focus, disabled, selected, loading, error. Každý stav má token, ne ruční úpravu.
5. **Hustota.** Default (desktop produkt), compact (datové tabulky) a comfortable (dotyk, web). Mění se jen výšky ovládacích prvků, řádků a vnitřní odsazení, nikdy barvy.
6. **Mapování tmavého režimu.** Každý sémantický token má tmavou hodnotu s odkazem na primitivum a ověřený kontrast. Tmavý režim není inverze.
7. **Komponenty (úroveň 3).** Komponentní tokeny jsou aliasy na sémantiku (výška tlačítka, pozadí pole, řádek tabulky). Komponenta se staví z nich.
8. **Vzory (patterns).** Skládání komponent do opakovaných situací: prázdný stav, načítání, chyba, formulář, filtr, potvrzení destruktivní akce.
9. **Governance.** Verze, changelog, pravidla přidávání, kontrola kontrastu a lint. Bez tohoto kroku systém do roka zdivočí.

### Co se z marketingového brandu stane v produktu

| Prvek brandu | V produktu | Token nebo komponenta |
|---|---|---|
| Hlavní barva | Hlavní akce, výběr, sekvenční škála grafu | `primary`, `selected`, `accent-subtle`, `chart-seq-*` |
| Tmavá barva značky | Text na hlavní barvě, inverted plochy, toast | `primary-foreground`, `inverted` |
| Akcentní barva | Odkazy (jen pokud má 4,5 : 1), zvýraznění | `accent` |
| Neutrály | Plátno aplikace, linky, nedostupné prvky, „noc“ tmavého režimu | `muted`, `border`, `disabled`, `night-*` |
| Doplňkové barvy | Řady grafů, stavové plochy | `chart-*`, `warning-*`, `info-*` |
| Marketingová typografie (Display, H1) | Jen web. Produkt má pevnou škálu | `app-h1` … `app-caption` |
| Doplňkové písmo (script, display) | V produktu se nepoužívá, výjimka onboarding | — |
| Tvar (radius) | Tlačítka a štítky podle značky, pole a malé prvky menší | `radius-button`, `radius-input`, `radius-xs` |
| Tón komunikace | Microcopy chyb, prázdných stavů, potvrzení | kapitola 09 „Texty v produktu“ |
| Logo | App ikona, favicon, splash, hlavička aplikace | assets/logo |
| Stíny nebo flat | Elevation, nebo border + scrim + z-index | `shadow-*`, `overlay`, `z-*` |

## 3. Co musí moderní brand manuál obsahovat, aby šel použít pro SaaS

Kapitola 09 šablony (v1.2) obsahuje tyto sekce.

### 3.1 Architektura design tokenů

Tři úrovně, jeden zdroj pravdy (`css/brand.css`), exporty se generují.

| Úroveň | Prefix | Příklad | Kdo ji mění |
|---|---|---|---|
| 1. Global / Primitive | `--brand-*` | `--brand-primary`, `--brand-neutral-400`, `--brand-night-900`, `--brand-amber-700` | Brand designer, klientské téma |
| 2. Alias / Semantic | `--ui-<role>` | `--ui-surface`, `--ui-warning-subtle`, `--ui-chart-3` | Design systém (módy light / dark) |
| 3. Component | `--ui-<komponenta>-*` | `--ui-button-h-md`, `--ui-input-border`, `--ui-table-row-h` | Design systém (módy hustoty) |

Pravidla:

- Komponenty a obrazovky používají jen úroveň 2 a 3. Hodnota mimo tokeny je chyba, kterou zachytí lint.
- Názvy jsou stejné v kódu, ve Figmě (code syntax `var(--ui-*)`) i v `tokens.json`.
- Módy se zapínají atributy na stejném prvku: `data-theme`, `data-density`, `data-brand`.

### 3.2 Datová vizualizace a hustota

- **Kategorická paleta** (6 barev): tahy a malé značky splní 3 : 1 proti ploše, pastely značky slouží jako výplně se stejnobarevným tahem. Šestá barva je neutrální „ostatní“.
- **Sekvenční škála** (5 kroků) jde od světlého odstínu hlavní barvy k nejtmavšímu, v tmavém režimu obráceně (víc = světlejší).
- **Divergentní škála** nepoužívá pár červená a zelená: řada 5 přes neutrální k barvě úspěchu.
- **Pravidla:**
  - popisek přímo u dat, legenda až jako druhá možnost;
  - barva nikdy jako jediný nosič informace (tvar, vzor, popisek);
  - mřížka v barvě Kámen, osy Břidlice;
  - čísla tabulkovými číslicemi.
- **Hustota:** default, compact a comfortable (tabulka v sekci 4.3).
- **Systém štítků (badge):** neutral, success, warning, destructive, info. Štítek má vždy text, barva jen doplňuje.

### 3.3 Zpětná vazba a stavy

| Situace | Vzor | Pravidlo |
|---|---|---|
| Načítání do 1 s | Nic, případně stav tlačítka „Ukládáme…“ | Neblikat skeletonem u rychlých akcí |
| Načítání 1–10 s | Skeleton ve tvaru výsledného obsahu | Při `prefers-reduced-motion` bez animace |
| Dlouhá operace | Progress s popisem kroku | Uživatel může odejít, dostane notifikaci |
| První použití | Prázdný stav: co tu bude, proč, jedna hlavní akce | Žádné „Žádná data“ bez další akce |
| Žádné výsledky hledání | Prázdný stav s návrhem: upravit filtr, vymazat filtr | Zopakovat hledaný výraz |
| Chyba pole | Text pod polem v `destructive`, ikona, `aria-invalid` | Říct, co opravit, ne co je špatně |
| Chyba formuláře | Souhrn nahoře s odkazy na pole | Fokus na souhrn |
| Chyba načtení | Inline hláška v místě obsahu s akcí „Zkusit znovu“ | Nezahazovat to, co se načetlo |
| Výsledek akce | Toast (inverted), 4–6 s, u destruktivní akce „Vrátit“ | Toast nikdy pro chybu, která vyžaduje akci |
| Stránka nenalezena / chyba serveru | 404 a 500 v jazyce značky | Cesta zpět a kontakt |

**Microcopy** (navazuje na kap. 02 „Texty rozhraní“):
- vykáme a píšeme rodově neutrálně;
- slovesa v tlačítkách („Uložit změny“, ne „OK“);
- chyba = co se stalo + co teď („Soubor je větší než 10 MB. Zmenšete ho nebo nahrajte PDF.“);
- destruktivní akce pojmenovává objekt („Smazat projekt Kvízman“);
- prázdný stav mluví o přínosu, ne o absenci.

### 3.4 Přístupnost a tmavý režim

- **Kontrast:** text 4,5 : 1, velký text a prvky rozhraní 3 : 1 (WCAG 2.2, 1.4.3 a 1.4.11), focus 3 : 1 proti oběma sousedním barvám.
- Každý pár ověřuje `docs/tools/contrast-check.html` ve všech módech (značka a klient, světlý i tmavý).
- **Dotykové cíle:** 44 px na dotyku a na webu. V desktopovém produktu je minimum 32 px (compact), absolutní minimum 24 px (WCAG 2.2, 2.5.8).
- **Tmavý režim:** plochy jsou neutrální „noc“ (`night-950` → `night-800`) tónovaná barvou značky, text světlý neutrální, primární barva z role `primary-on-dark`. Plně sytá barva značky jako plocha patří inverted sekcím a marketingu, ne celému produktu.
- **Klávesnice:** viditelný focus ring (`--ui-focus-width` 2 px, `--ui-focus-offset` 2 px), logické pořadí, Esc zavírá modal a dropdown, šipky v tabech a tabulkách.
- **Pohyb:** `prefers-reduced-motion` vypíná shimmer skeletonu a posuny.

## 4. Jak vyplnit pro novou značku

1. V `css/brand.css` vyplň úroveň 1 (`--brand-*`) včetně rolí pro tmavý režim a stavových barev (hodnoty `DOPLNIT`).
2. Odvozené škály, „noc“, sémantika a komponenty se přepočítají samy. Přepiš jen to, co značka určuje jinak (radius, stíny nebo flat, písma).
3. Spusť `docs/tools/contrast-check.html`: 0 chyb ve všech módech. Selhání řeš úpravou tónu, ne výjimkou.
4. Projdi kapitolu 09 a texty ukázek (Product Preview, stavy, texty v produktu) přepiš jazykem značky.
5. Exportuj Tailwind theme a tokens.json (`docs/tools/export-tokens.html` nebo tlačítka v kapitole 09) a postav Figma knihovnu podle `docs/figma_web_sop.md`.
