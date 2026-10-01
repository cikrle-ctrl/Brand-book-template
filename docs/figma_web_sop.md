# Figma web foundations: standardní postup (SOP)

Univerzální checklist, jak ve Figmě od nuly založit robustní základ webu pro jakoukoli značku. Navazuje na brand book: Fáze 2 (UI / Web System, tokeny `--ui-*` v `css/brand.css`) a Fáze 3 (Brand Web Preview). Figma se staví výhradně z těchto tokenů.

Vstup: schválený brand book, klientské zadání webu (sitemap, wireframe), fotky a texty.
Výstup: Figma soubor se stránkami Foundations, Components, Sections, Templates, napojený na Variables, připravený pro Dev Mode a vývoj.

---

## Zásady (z rešerše 2026)

- **Nejdřív tokeny, pak komponenty.** Primitiva bez módů, nad nimi sémantická vrstva (aliasy). Komponenty nikdy neodkazují na primitiva přímo.
- **Módy místo kopií.** Desktop, tablet a mobil jsou módy proměnných Layout a Typography, ne duplikované komponenty. Světlý a tmavý režim jsou módy collection Color.
- **Scoping.** Barva jde jen do výplní a tahů, mezery jen do gap a paddingu, radius jen do radius. Nevhodná hodnota nejde omylem použít.
- **Jeden název napříč designem a kódem.** Code syntax proměnných = `var(--ui-…)`, v Dev Mode vývojář vidí přesně token z `brand.css`.
- **Auto Layout všude.** Žádné absolutní pozice kromě překryvů (text přes fotku, odznak). Gridy karet přes Auto Layout wrap s minimální šířkou karty.
- **Varianty jen pro typ, velikost a stav.** Text, ikona a volitelné části jsou component properties (text, boolean, instance swap).
- **Přístupnost od začátku.** Kontrast WCAG 2.2 AA (4,5 : 1 pro text), viditelný focus, cílová plocha alespoň 44 px.
- **Skutečný obsah.** Žádné lorem ipsum. Chybějící údaje jako čitelný placeholder `[…]`.

Zdroje: [zeroheight: 26 tipů 2026](https://zeroheight.com/blog/building-scalable-design-systems-with-figma-26-tips-for-2026/) · [Šupík: Figma Variables 2026](https://supik.digital/figma-variables-guide) · [Design Systems Collective: Variables playbook](https://www.designsystemscollective.com/design-system-mastery-with-figma-variables-the-2025-2026-best-practice-playbook-da0500ca0e66) · [atomize: best practices](https://atomize.tools/blog/figma-design-system-best-practices/) · [Figma Learn: Build your design system](https://help.figma.com/hc/en-us/articles/14548865734679-Lesson-3-Build-your-design-system) · [Muzli: praktický průvodce](https://muz.li/blog/how-to-build-a-design-system-in-figma-a-practical-guide-2026/)

---

## Must-have komponenty

| Vrstva | Komponenty |
|---|---|
| Základ | Icon (instance swap), Logo (varianty typu a barvy), Avatar, Divider, Media (16:9, 4:5, 1:1), Layout guide |
| Akce | Button (primary, secondary, outline, inverted, link × sm, md, lg × default, hover, focus, disabled; ikona vlevo / vpravo), Icon button, Text link, Language switch |
| Formuláře | Input, Textarea, Select, Checkbox, Radio, Switch, Form field (label + help / error), Email signup |
| Navigace | Header desktop + mobil, Mobile menu, Nav dropdown, Tabs / Segmented control, Breadcrumbs, Pagination |
| Obsah | Card, Badge / Tag, Accordion item, Review + Rating, Price row, List item, Quote, Stat |
| Zpětná vazba | Modal / Dialog, Toast, Inline message, Tooltip, Cookie banner (EU nutnost), Empty state, Skeleton |

## Must-have webové sekce

Header · Hero · Logo bar / Social proof · Features / Benefits · Split (text + obraz) · Pricing · Testimonials / Reviews · Gallery / Portfolio · Team · FAQ · CTA banner · Contact / Map · Newsletter / Form · Blog / Article list · Footer · Cookie banner · 404.

Z toho se vybere, co potřebuje konkrétní web podle sitemapy a wireframu. Nepoužité sekce se nestaví.

---

## 0. Příprava

- [ ] Brand book je schválený: Fáze 2 (tokeny) a Fáze 3 (Web Preview). Zdroj pravdy je `css/brand.css`, `tokens.json` je jeho export.
- [ ] Klientské zadání webu je přečtené: sitemap, pořadí sekcí, integrace (rezervace, recenze, Instagram, mapy), jazyky. Rozpory se zadáním a manuálem vyřešené s klientem před stavbou.
- [ ] Písma jsou ve Figmě dostupná (Google Fonts nebo nahraná) ve všech potřebných řezech, včetně češtiny.
- [ ] Stránky souboru: `00 Cover`, `01 Foundations`, `02 Components`, `03 Sections`, `04 Templates`, `99 Archive`.
- [ ] Pojmenování: vrstvy, komponenty a proměnné anglicky a shodně s kódem (`Button`, `color/primary`). Obsah v jazyce značky.
- [ ] Fotky převedené do formátu, který Figma umí (PNG, JPG, WebP; AVIF ne).

## 1. Variables

Zakládat v tomto pořadí.

- [ ] **Primitives** (1 mód, skryté z publikace):
  - `color/<název-z-palety>` (celá paleta značky)
  - `radius/none|sm|md|lg|full`
  - `font/family/heading|body` (string)
  - `font/weight/*` (string řezu, např. Light, Regular, Medium, SemiBold)
- [ ] **Color** (mód Light, případně Dark), aliasy 1:1 s `--ui-*`:
  - `primary`, `primary-hover`, `primary-foreground`
  - `secondary`, `secondary-foreground`
  - `background`, `surface`, `foreground`
  - `muted`, `muted-foreground`, `border`
  - `inverted`, `inverted-foreground`
  - `accent`, `accent-subtle`, `accent-foreground`
  - `destructive`, `destructive-foreground`, `success`, `success-foreground`
  - `ring`
- [ ] **Typography** (módy Desktop / Mobile): pro `display, h1–h6, p1–p3` proměnné `size`, `line-height`, `letter-spacing` (px), `family` a `weight` jako aliasy primitiv.
- [ ] **Layout** (módy Desktop 1440 / Tablet 768 / Mobile 375): škála `space/0 … 160` (po 4 a 8, stejná ve všech módech, scope GAP; v Primitives by nešla navázat na padding), `page/margin`, `grid/columns`, `grid/gutter`, `section/padding-y`, `stack/gap-sm|md|lg|xl`, `container/max`, `header/height`, `radius/button|input|card|modal` (aliasy).
- [ ] Scoping u každé proměnné (barvy: fill, stroke, text; mezery: gap, padding; radius: corner radius; typografie: font vlastnosti).
- [ ] Code syntax WEB = `var(--ui-…)` podle `brand.css`.
- [ ] Kontrola: žádná komponenta neodkazuje na Primitives; každá textová dvojice (foreground × background) splňuje AA.

## 2. Styly

- [ ] Textové styly `Display`, `H1–H6`, `P1–P3`, `Button`, `Label` navázané na proměnné Typography.
- [ ] Grid styly `Grid/Desktop 12`, `Grid/Tablet 8`, `Grid/Mobile 4` s hodnotami z Layout.
- [ ] Effect styly `shadow/sm|md|lg` podle Fáze 2. **Pokud je brand flat, stíny se nezakládají** a na stránku Foundations se napíše: „Brand nevyužívá elevation ani shadows, design je striktně flat.“ Focus se pak řeší tahem `ring`.
- [ ] Stránka `01 Foundations` dokumentuje paletu (s kontrastem), typografickou škálu, grid, radius, elevation a pohyb, vše z proměnných.

## 3. Ikony a assety

- [ ] Ikonová knihovna z manuálu jako komponenty `icon/<název>` 24 × 24, tah a zakončení podle manuálu, barva navázaná na `foreground` (přebarvitelné). Nikdy textové znaky místo ikon.
- [ ] Logo, symbol a favicon jako komponenta `Logo` s variantami typu a barvy.
- [ ] Fotky jako image fill v komponentě `Media` s pevnými poměry.

## 4. Komponenty (atomy → molekuly)

- [ ] Každá komponenta na Auto Layoutu (hug nebo fill), `min-width` / `max-width` tam, kde to dává smysl.
- [ ] Všechny barvy, mezery, radius a typografie z proměnných a stylů. **Nula ručních HEX, px a lokálních textových nastavení.**
- [ ] Component properties: text (label), boolean (ikona, help text, volitelné řádky), instance swap (ikona). Varianty jen `type`, `size`, `state`.
- [ ] Stavy: default, hover, focus (tah `ring`), disabled, error (formuláře).
- [ ] Cílová plocha interaktivních prvků alespoň 44 px.
- [ ] Description u komponenty: k čemu slouží, odkaz na kapitolu manuálu, tokeny.
- [ ] Test: roztáhnout na 320–1440 px, přepsat text na dvojnásobnou délku, přepnout mód. Nic se nesmí rozpadnout.

## 5. Sekce (organismy)

- [ ] Každá sekce je komponenta. Varianta `breakpoint=desktop|mobile` jen tam, kde se mění struktura; jinak jedna sekce s fill width a proměnnými Layout.
- [ ] Sekce skládá jen instance komponent. Padding a gap z `Layout`.
- [ ] Gridy karet přes Auto Layout wrap s `min-width` karty, takže se samy přeskládají.
- [ ] Pořadí a obsah sekcí podle wireframu klienta.

## 6. Šablony stránek

- [ ] Každá stránka ze sitemapy v desktopu 1440 a mobilu 375, složená jen z instancí sekcí.
- [ ] Na rámu je nastavený správný mód Layout a Typography.
- [ ] Skutečný obsah z manuálu a podkladů klienta. Chybějící údaje jako `[…]`, sepsané v seznamu pro klienta.

## 7. QA a předání

- [ ] Lint (skriptem nebo pluginem): nenavázané barvy, mezery, radius a text = 0; rozpojené instance = 0; skryté a prázdné vrstvy smazané.
- [ ] Kontrast všech použitých dvojic ≥ 4,5 : 1 (velký text ≥ 3 : 1).
- [ ] Responzivita: sekce otestované na 375, 768 a 1440; přepnutí módů na šabloně.
- [ ] Dev Mode: výběr tlačítka a hero ukazuje sémantické proměnné s code syntax `var(--ui-*)`.
- [ ] Publikace knihovny, verze a changelog. Při každé změně tokenů sync s `css/brand.css` a `tokens.json` (obousměrně, zdroj pravdy je `brand.css`).
- [ ] Odkaz na Figma soubor v brand booku (kapitola Správa a ke stažení) a v paměti projektu.

---

## Poznámky z praxe (Plugin API / MCP)

- Módy proměnných (Typography, Layout) vyžadují plán Professional a vyšší. Starter má jen 1 mód.
- `resize()` nastaví obě osy na pevnou velikost. U Auto Layout rámů po něm vrátit `primaryAxisSizingMode = 'AUTO'`, jinak se obsah ořízne (sloupce s výškou 10 px).
- Instance vložené do gridu a pak zúžené/rozšířené přes `resize()` vrátit na `layoutSizingVertical = 'HUG'`.
- Průhlednost barvy navázané na proměnnou se ve výplni ztrácí. Ztmavení fotky řešit samostatnou vrstvou s `opacity` (např. 45 %) nad obrázkem.
- Zvýraznění slova v nadpisu (`setRangeFontName`) jen na zvýrazněném rozsahu. Při změně celého textu se odpojí textový styl.
- Texty s jiným řezem (odkaz, aktivní jazyk) řešit vlastním textovým stylem navázaným na proměnné, ne ruční změnou písma.
- AVIF Figma nenačte: fotky převést na JPG/PNG a nahrát přes `upload_assets` do zdrojových rámů na stránce Archive, dál používat `imageHash`.
- Sady komponent (showcase rámy) po každém přidání přerovnat podle skutečné výšky, mobilní varianty jsou delší než desktopové.
- Po každé komponentě screenshot. Po dokončení lint přes všechny stránky: nenavázané výplně, tahy, mezery a texty bez stylu musí být 0 (výjimky zdokumentovat, např. popisek v lockupu loga).
