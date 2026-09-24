# Audit šablony Brand Book a návrh rozšíření

Verze 1.0 · 24. 9. 2026

**Stav:** návrh je zapracovaný do šablony v1.1 (24. 9. 2026): web i PDF mají strukturu 00–14 včetně oprav z části E, nových tokenů v `css/brand.css` a priorit P1–P3. Kapitola 09 navíc obsahuje UI/Web System podle pracovního postupu v `CLAUDE.md` (sémantické tokeny v Tailwind stylu, typescale Display–P3, radius, elevation, Brand Web Preview, export Tailwind v4 a tokens.json).

Tento dokument porovnává šablonu `brand-book-template` (web `index.html` s kapitolami 00–11 a PDF `pdf/manual.html` se 49 slidy) se 26 světovými brand manuály a identitami. Výsledkem je návrh, jak šablonu rozšířit, aby pokryla digitální B2B/B2C produkty, webové aplikace i lifestylové značky.

Poznámka ke zdrojům: dva odkazy se nepodařilo otevřít (flipbook Patagonia na fliphtml5 a soubor In-N-Out na Google Drive vyžadující přihlášení), jejich obsah proto v auditu není. Stránky aesop.com, redditinc.com/brand, brandfetch.com a kity na Lingo se nenačetly přímo. U nich vycházím z oficiálních PDF, případových studií a sekundárních zdrojů. Reddit je citován podle manuálu z roku 2020, tedy před rebrandem v listopadu 2023. Údaje, které nešlo ověřit na oficiální stránce, jsou označené *(neověřeno)*.

---

## A. Co šablona obsahuje dnes

### Struktura

| # | Kapitola (web) | Podsekce | Stav |
|---|---|---|---|
| 00 | Úvod | účel manuálu, verze a changelog, rychlé odkazy | hotovo |
| 01 | Brand core | poslání a vize, hodnoty, essence a positioning, zlatý kruh, osobnost (volitelné), příběh | hotovo, ale bez cílových skupin a konkurence |
| 02 | Verbální identita | claim, tone of voice (Jsme / Nejsme), gramatika a styl, slovník | částečně: Do/Don't jen u 1. principu, chybí tabulka tónu podle kanálů |
| 03 | Logo | konstrukce, varianty, barevné verze, ochranná zóna, min. velikost, pozadí, chyby | hotovo, chybí pravidlo „kdy kterou variantu“ a tabulka ikon aplikace |
| 04 | Barvy | primární (HEX/RGB/CMYK/Pantone/RAL), sekundární, poměr, kontrast WCAG, chyby | hotovo pro tisk a základní web, chybí škály odstínů, UI a dark mode |
| 05 | Typografie | písma, fallback, hierarchie, sazba včetně české typografie, chyby | hotovo, chybí tokeny, licence a prostředí |
| 06 | Kompozice a layout | 12sloupcový grid, spacing, ukázková rozvržení | částečně |
| 07 | Obrazový styl | fotografie, ilustrace (volitelné), ikony, grafické prvky | částečně: slabá pravidla, žádná práva ani AI |
| 08 | Motion a zvuk | principy, animace loga, zvukové logo | volitelné, velmi stručné |
| 09 | Aplikace | tiskoviny, e-mail a web, sociální sítě, prezentace, merch | částečně: chybí tabulky rozměrů, obaly jsou jeden placeholder |
| 10 | Architektura a co-branding | sub-brandy, partnerský lockup | částečně |
| 11 | Ke stažení a kontakt | 4 balíčky ke stažení, brand manager, FAQ | částečně: odkazy míří na složky |

### Silné stránky

- Jasná a logická kostra, která odpovídá klasickému pořadí strategie → verbální → vizuální → aplikace.
- Česká typografická pravidla (nezalomitelné mezery, délka řádku) jsou nadstandard, který světové manuály nemají.
- Formát Jsme / Nejsme u tone of voice.
- Kontrastní tabulka s odkazem na WCAG AA.
- Jediný zdroj brandových barev a písem (`css/brand.css`) napájí web i PDF.
- PDF export bez závislostí a rozdělení na placeholdery s instrukcemi.

### Nekonzistence a chyby

1. PDF nemá předělový slide pro kapitolu 08.
2. Kapitola 11 se na webu jmenuje „Ke stažení a kontakt“, v PDF „Přehled a kontakt“.
3. Principy tone of voice 2 a 3 na webu nemají dvojici Do/Don't.
4. Tlačítka ke stažení míří na složky, ne na soubory.
5. Barvy Do/Don't (`--c-do`, `--c-dont`) jsou obě šedé #3d3d3d, takže správně a špatně se liší jen ikonou.
6. „Brand na jedné stránce“ je jen v PDF (slide 48), changelog jen na webu.
7. PDF nemá slidy pro chyby barev a typografie, pravidla sazby ani stažení.
8. Sekundární barvy mají jen HEX/RGB/CMYK, primární mají i Pantone a RAL.
9. Odstíny 50 % a 25 % jsou jen v PDF.
10. Třída `.ph-caption` je definovaná, ale nepoužitá.
11. Překlep v README (`pdf\build-pdf.ps1`) je opravený spolu s tímto auditem.

---

## B. Co dělají světové značky dobře

### 1. Manuál rozdělený podle publika

- **Lime** má přes 10 000 assetů ve 3 portálech (zaměstnanci, partneři, tisk) a 53 kitech. Provozní týmy si soubory posílají rovnou do tisku, za rok to bylo 11 911 stažení bez zásahu brand týmu.
- **Gong** nemá jeden manuál, ale asi 20 kitů po úkolech: loga, typografie, LinkedIn bannery, e-mailové podpisy, Zoom pozadí, produktové UI, šablony Google Slides a Docs.
- **Webflow** odděluje stránky Brand assets, Design guidelines a Voice & tone a zvlášť odkazuje Press kit a Partner portal.
- **Závěr:** manuál má mít jádro pro tvůrce, stažení pro partnery a tiskovou sekci pro média. Každé publikum dostane jen to, co potřebuje.

### 2. Pravidla pro třetí strany a ochranné známky

- **Figma** má celou veřejnou stránku napsanou jako právní text:
  - značku lze použít jen pravdivě a bez naznačení partnerství;
  - „Figma“ ani „Fig“ nesmí být v názvu firmy, domény nebo handle;
  - žádný merch;
  - vlastní branding partnera musí být výraznější než Figma;
  - uvádí párové příklady „Tomův plugin pro Figma design“ (správně) vs. „Tomův Figma plugin“ (špatně).
- **Figma** dále uvádí zvlášť kontakty legal@ a press@ a pravidlo, že při rozporu platí anglická verze.
- **Reddit** uvádí licenci jako omezenou a odvolatelnou, všechen goodwill náleží Redditu a pro licencování má kontakt licensing@. Maskota Snoo nelze použít samostatně mimo Reddit.
- **Amplitude** povoluje formulace „works with“ a „compatible with“ a zakazuje naznačovat podporu.
- **Linear** zakazuje kombinovat logo s jinými značkami bez písemného souhlasu.

### 3. Logo

- **Kdy kterou variantu (Linear):**
  - wordmark je výchozí;
  - logomark je pro stísněné layouty a mřížky log;
  - ikona je pro sociální sítě, se zaoblením podle platformy.
- **Ochranná zóna jako poměr části loga, ne pevná jednotka:**
  - Reddit: 140 % velikosti ikony;
  - Webflow: výška „W“;
  - Amplitude: průměr kruhu pro celé logo a polovina pro samotnou značku.
- **Minimální velikost zvlášť pro obrazovku a tisk:** Amplitude 20 px / ¼ palce, Reddit 24 × 24 px pro sociální ikony.
- **Moderní chyby v misuse:** nedostatečný kontrast (Webflow), logo uprostřed věty (Webflow, Amplitude), logo jako vzor, znovuvytvoření pomocí AI (Amplitude), svislé skládání, které značka nemá (Webflow).
- **Matice ke stažení:** každá verze (barevná / černá / bílá, světlá / tmavá) v každém formátu (SVG, PNG) a k tomu jeden ZIP (Webflow, Linear). Brandfetch ukazuje, že agregátory chtějí také JPEG a WebP, čtvercovou ikonu a světlou a tmavou verzi. Když je značka nedodá, doplní si je někdo sám.
- **Logo v pohybu:** GrandArmy u A24 navrhl animované intro před filmy jako součást značky, ne jako doplněk.

### 4. Barvy

- **Amplitude** uvádí u každé barvy HEX, RGB, HSB, CMYK i Pantone v jedné tabulce. Webflow uvádí jen HEX, Reddit HEX a Pantone.
- **Pojmenované barvy a číslovaná neutrální škála:** Reddit má neutrály pojmenované po mořských živočiších (Beluga až Orca), Amplitude má Gray 100–10, Webflow Gray 900–100.
- **Poměr:**
  - Reddit doporučuje Orangered na zhruba 10 % barevné plochy;
  - Amplitude začíná primárními barvami, sekundární používá střídmě a růžovou a červenou minimálně.
- **Brand × produkt (Webflow):** v brandové komunikaci „bright and punchy“, v produktu „serious and restrained“.
- **Limit na asset (Webflow):** černá, bílá a *jedna* barva. Žádné gradienty, barva se nepoužívá na text.
- **Přístupné dvojice s upravenou hodnotou:** Amplitude uvádí pro modrý text na černé zvláštní světlejší odstín (#4083FF).
- **Datová vizualizace (Amplitude):**
  - vede primární modrá, šedé slouží jako kontext;
  - kde to jde, monochromaticky;
  - různé odstíny se porovnávají ve stejné sytosti.
- **Gradienty jako systém (Amplitude):** „Duos“ a „Multi“ s definovaným použitím, ne ad hoc.

### 5. Typografie

- **Stupnice jako tokeny (Webflow):** h0–h6 a odstavce XXL–S v rem i px s řádkováním a prostrkáním, rovnou použitelné v kódu.
- **Řezy přiřazené úlohám (Amplitude):** Bold jen pro display, SemiBold pro titulky, Medium a Regular pro text.
- **Náhradní písmo podle prostředí:** Poppins pro Google Workspace, Helvetica pro HTML e-mail, Noto Sans pro nepodporované jazyky (Amplitude). Poppins a Inter jako Google alternativy (Webflow).
- **Příběh písma:** Oatly pojmenovalo své fonty podle lidí (John Rounded podle kreativního ředitele, Toni Grotesk podle zakladatele). Typografie tak nese příběh značky.

### 6. Verbální identita

- **Voice × tone (Amplitude):** hlas (co říkáme) je konstantní, tón (jak to říkáme) se mění. Matice tónu podle kanálu zahrnuje Launch, Blog, Social, Ads, **Product UI** a **Help Center**.
- **Škály místo přídavných jmen (Oatly podle analýzy Map & Fire):** Vtipný +3, Neformální +3, Drzý +2, Nadšený +2.
- **Hlas z reálného copy (Oatly):** hlas značky vznikl z textů na obalu, teprve pak se zobecnil *(sekundární zdroj)*.
- **Každý princip má Do, Don't a příklady (Webflow, Amplitude).** Amplitude má i zakázaná slova („game-changing“) a zakázané zmírňovací výrazy (could, might, maybe).
- **Glosář (Reddit):** preferovaný termín, definice, „neříkáme“ a velká písmena. Linear předepisuje „Linear“, ne „Linear app“.
- **Inkluzivní jazyk (Amplitude):** seznam výrazů a jejich náhrad.
- **Boilerplate ve více délkách (Webflow):** jedna věta a delší odstavec.
- **Jazyk v regulované nebo citlivé kategorii:** Maude píše o intimitě otevřeně a klidně a diskrétní doručení i fakturaci dělá součástí slibu značky. CANN se vymezuje proti klišé kategorie („crunchy a hypermaskulinní“).

### 7. Obrazový jazyk

- **Tvrdá pravidla fotografie (charity: water):**
  - „naděje, ne vina“ a lidé zobrazení důstojně;
  - žádné filtry a neořezávat končetiny;
  - text ani logo nikdy přes tváře;
  - vybírat snímky s místem pro text.
- **Autentičnost (Webflow, Amplitude):** žádný stock, skuteční lidé a zákazníci, přirozené světlo, diverzní casting.
- **Dva foto briefy (Maude):** lifestyle a produkt, s odlišnými fotografy a pravidly.
- **Úrovně ilustrace (Webflow):**
  - Standard: 1 barva, černá a bílá;
  - Elevated: video a vzdělávání;
  - Aspirational: keynote a hero kampaně.
- **Maskot (Reddit Snoo):** konstrukce (2 hlavy vysoký, oči na středové ose), co se smí měnit, uživatelské a licencované verze podléhají schválení a maskot nikdy nenahrazuje logo. Vanta má maskota lamu s definovanými výrazy.
- **Ikony a produkt v tiskovém kitu (teenage engineering):** produktové fotky v náhledech i originálech v PNG, JPEG a WebP, datovaný archiv tiskových zpráv v EN a JP.

### 8. Motion

- **Webflow** má 3 pojmenované principy (Build, Enhance, Reduce friction) a referenční video. Délky ani křivky nezveřejňuje, doporučuji je v šabloně doplnit jako tokeny.
- **A24** má logo s animovaným intrem jako součást identity (viz Logo výše).

### 9. Lifestylové a fyzické značky

- **Obal jako hlavní médium:** Oatly mělo malý rozpočet, obal se stal hlavním kanálem a hlas vznikl z textů na krabici. Záměrně „domácí“ vzhled.
- **Regálový efekt (Tartine, koncept):** krabice seřazené vedle sebe tvoří slovo „Legendary“ a každá příchuť má svou barvu. Obaly se navrhují jako sada, ne jednotlivě.
- **Stálá řada × limitované edice (Dark Matter Coffee):** 4 stálé směsi mají společný příběh, vlastní paletu a stejného ilustrátora, limitky jsou zvláštní proud *(podrobnosti neověřeny)*. Manuál má určit, co je u limitky pevné (logo, informační panel) a co smí měnit umělec.
- **Materiály a povrchy (Aesop):** jantarové sklo, víčko s texturou čediče, embosovaná značka na skle a debosovaná na víčku.
- **Obchody (Aesop):** přes 400 obchodů, každý navržen pro své místo. Opakují se jen fixní prvky: umyvadlo, světlo, sezení. Principy jsou „architektonická zdrženlivost“ a „maximální efekt minimem materiálů“ *(sekundární zdroje)*. Konzistence vzniká principy, ne kopírováním šablony.
- **Senzorika (Aesop):** rituál u umyvadla, vůně a literární citáty na obalech, v obchodech i v e-mailech.
- **Udržitelnost jako vymahatelná pravidla (Stella McCartney, Responsible Sourcing Guide):**
  - 3 principy (lidé, zvířata, příroda);
  - seznam zakázaných materiálů se zdůvodněním;
  - minimální a aspirační standard (strop není);
  - vysvětlující boxy k certifikacím (GOTS × OCS, FSC 100 % × Mix × Recycled);
  - pravidlo, že každý environmentální claim musí být dohledatelný ke zdroji;
  - pravidla pro papír a obaly (min. 50 % recyklátu, žádné PVC).
- **Regulované produkty (CANN):** manuál potřebuje vrstvu povinných textů, omezení kanálů a věkové brány *(odvozeno, stránka to neuvádí)*.
- **Merch a fanouškovské užití (A24):** fanoušci si značku přivlastnili (merch, kolaborace, tetování). Manuál má říct, co je povoleno.
- **Pojmenování produktů (Maude):** jednoslovné názvy malými písmeny (vibe, shine, burn) a registrované ® u hlavní fráze *(sekundární zdroj)*.

### 10. Správa, výstupy a předání

- **Kontakt a kanál žádostí na každé stránce (Amplitude):** Slack kanál @brand a formulář v Asaně.
- **Kontakty podle účelu:** legal@, press@ a brand@ (Figma, Webflow, Reddit).
- **Viditelná verze:** Reddit „Version 09-2020“, BrainPOP „2025 Brand Evolution Kits“, IBM a Mastercard se sekcí „Co je nového“ (podle Frontify).
- **Technická specifikace souborů (charity: water):**
  - digitál vždy RGB, PNG pro průhlednost, jinak JPG;
  - tisk PDF/EPS se spadávkou a ořezovými značkami;
  - rozlišení: 72 PPI minimum pro obrazovku, 140 PPI minimum pro tisk, 300 PPI ideál.
- **Hodnocení Frontify:** oceňuje online manuály (ne statická PDF), kopírování barevných kódů kliknutím (Firefox), hromadné stahování jedním klikem (DevRev), editovatelné náhledy písma (Instagram), manuál postavený na přístupnosti (Tonies), multisenzorické pokyny (Beyond Gravity) a lokalizaci (Trustpilot).
- **Notion** varuje před šablonami, kde není jasné, co je editovatelné a co pevné.

---

## C. Gap analýza

P1 = musí být v jádru šablony. P2 = mělo by být. P3 = volitelný modul podle typu klienta.

| Téma | Reference | Stav v šabloně | Priorita |
|---|---|---|---|
| Cílové skupiny a persony | Map & Fire / Oatly | chybí (jen slot ve vzorci positioningu) | P1 |
| Konkurence a klišé kategorie, proti kterým se vymezujeme | CANN, Oatly | chybí | P1 |
| Brand promise a důkazy (reasons to believe) | obecná praxe | chybí | P1 |
| Voice × tone a matice podle kanálu vč. UI a podpory | Amplitude, Webflow | jen tip v textu | P1 |
| Do/Don't u každého principu hlasu | Webflow, Amplitude | jen u 1 z 3 | P1 |
| Boilerplate (1 věta / odstavec / 100 slov) a elevator pitch | Webflow, Amplitude | chybí | P1 |
| UX writing: CTA, chybové hlášky, prázdné stavy | Amplitude (tón v Product UI) | chybí | P1 |
| Pravidlo „kdy kterou variantu loga“ | Linear | chybí | P1 |
| Ochranná zóna jako poměr části loga | Reddit, Webflow, Amplitude | obecné „x“ | P1 |
| Tabulka favicon / app icon / avatar | Linear, Reddit, Brandfetch | chybí | P1 |
| Matice stažení verze × formát | Webflow, Linear, Brandfetch | 4 obecné karty | P1 |
| Škály odstínů barev (50–900) a pojmenování | Reddit, Amplitude, Webflow | 50 / 25 % jen v PDF | P1 |
| Sémantické UI barvy a dark mode | Webflow (brand × produkt) | chybí | P1 |
| Přístupné barevné dvojice s upravenými hodnotami | Amplitude | obecná tabulka | P1 |
| Typografická stupnice jako tokeny (rem/px, lh, ls) | Webflow | tabulka bez tokenů | P1 |
| Náhradní písma podle prostředí (Office, Workspace, e-mail) | Amplitude | jen Arial/Calibri | P1 |
| Licence písem (desktop / web / app / počet uživatelů) | obecná praxe | jedna věta | P1 |
| Most brand → design system (tokeny, komponenty, stavy) | Webflow, Frontify (Tonies, Dropbox) | chybí | P1 |
| Přístupnost jako kapitola | Frontify (Tonies), Amplitude | jen kontrast barev | P1 |
| Pravidla pro třetí strany a ochranné známky | Figma, Reddit, Linear | chybí | P1 |
| Kontakty podle účelu a kanál žádostí | Figma, Amplitude | jeden brand manager | P1 |
| Technické výstupní specifikace souborů | charity: water | chybí | P1 |
| Barevné hodnoty OKLCH, CMYK coated/uncoated, Pantone C/U | Amplitude (HSB), vlastní doporučení | částečně | P2 |
| Datová vizualizace | Amplitude, IBM | chybí | P2 |
| Inkluzivní jazyk | Amplitude | chybí | P2 |
| Konvence pojmenování produktů a funkcí, ®/™ | Maude, Reddit, Linear | chybí | P2 |
| Dva foto briefy a tvrdá pravidla | charity: water, Maude, Webflow | 4 obecné principy | P2 |
| Práva k fotografiím, kredity a politika AI obrazů | Amplitude (AI u loga) | chybí | P2 |
| Úrovně ilustrace | Webflow | jeden placeholder | P2 |
| Tokeny pohybu (délky, křivky) a omezený pohyb | Webflow, vlastní doporučení | 3 délky, bez tokenů | P2 |
| Video: titulky, lower thirds, end card | obecná praxe | chybí | P2 |
| Tabulky rozměrů (bannery, sociální sítě, OOH) | Gong kity | jen poměry | P2 |
| Tiskový kit (boilerplate, portréty, produktové foto, zprávy) | teenage engineering, Webflow, Gong | chybí | P2 |
| Co-branding: mezera v % značky, pořadí, šablony lockupů | Amplitude, charity: water | obecný lockup | P2 |
| Verze a „co je nového“ na webu i v PDF | Reddit, BrainPOP, Frontify | jen web | P2 |
| Brand na jedné stránce na webu | vlastní PDF slide 48 | jen PDF | P2 |
| Maskot a postava | Reddit, Vanta | chybí | P3 |
| Obalová architektura, dieline, regálový efekt | Tartine, Oatly, Dark Matter | jeden placeholder | P3 |
| Materiály a povrchové úpravy | Aesop | chybí | P3 |
| Udržitelnost a environmentální claimy | Stella McCartney | chybí | P3 |
| Regulace a povinné texty | CANN | chybí | P3 |
| Obchody a prostor (fixní prvky × lokální volnost) | Aesop | jeden placeholder | P3 |
| Senzorika (vůně, hmat, zvuk v prostoru) | Aesop, Beyond Gravity | chybí | P3 |
| Limitované edice a kolaborace | Dark Matter, A24 | chybí | P3 |
| Merch a fanouškovské užití | A24 | jeden placeholder | P3 |
| Portály a kity podle publika | Lime, Gong | chybí | P3 (nad rámec statické šablony, řešit strukturou stažení) |

---

## D. Návrh nové struktury

Princip je **jádro + moduly**. Kapitoly 00–10 a 12–14 jsou jádro, které se vyplní vždy. Kapitola 11 a podsekce označené jako volitelné se ponechají nebo smažou podle typu klienta. U každé kapitoly je nahoře jedna věta „Pro koho a kdy“.

| # | Kapitola | Co zůstává | Co přibývá |
|---|---|---|---|
| 00 | Úvod | účel, verze, rychlé odkazy | jak manuál číst (co je pevné × co je volné); **co je nového** v aktuální verzi; **brand na jedné stránce** i na webu; kontakty podle účelu (brand, legal, press) |
| 01 | Strategie | mise, vize, hodnoty, essence, positioning, zlatý kruh, osobnost, příběh | **cílové skupiny a persony** (2–4 karty: potřeba, bariéra, co od nás chtějí); **konkurence a klišé kategorie** (mapa pozic, „nejsme jako…“); **brand promise a reasons to believe**; hodnotové prvky (funkční / emoční / aspirační); primární a sekundární archetyp |
| 02 | Verbální identita | claim, principy hlasu, gramatika, slovník | **voice × tone**; škály tónu (−3 až +3); **matice tónu podle kanálu** (web, sociální sítě, produktové UI, podpora, krizová komunikace, HR); Do/Don't u každého principu; **messaging pilíře** (3–4, každý s důkazy); elevator pitch; **boilerplate ve 3 délkách**; konvence pojmenování (produkty, funkce, sub-brandy, ®/™, psaní názvu); **UX writing** (tlačítka, chyby, prázdné stavy, potvrzení, notifikace); inkluzivní jazyk; lokalizace a jazykové verze |
| 03 | Logo | konstrukce, varianty, barevné verze, zóna, min. velikost, pozadí, chyby | pravidlo **„kdy kterou variantu“**; ochranná zóna jako poměr části loga; **responzivní logo** (zjednodušení podle velikosti); **tabulka ikon** (favicon 16/32/48, apple-touch 180, PWA 192/512, maskable, iOS a Android ikona, avatar sítí, OG obrázek 1200 × 630); rozšířené chyby (kontrast, logo ve větě, vzor, AI); animované logo (odkaz na 08); **matice stažení** |
| 04 | Barvy | primární, sekundární, poměr, kontrast, chyby | pojmenované barvy; **škály 50–900** pro každou barvu; hodnoty HEX / RGB / **OKLCH** / CMYK coated + uncoated / Pantone C + U / RAL; **brand × produkt** paleta; **sémantické barvy** (úspěch, varování, chyba, informace); **dark mode**; gradienty jako systém (volitelné); **přístupné dvojice** s konkrétním poměrem; **paleta pro grafy**; limit barev na jeden asset |
| 05 | Typografie | písma, fallback, hierarchie, sazba, chyby | **stupnice jako tokeny** (rem/px, řádkování, prostrkání, řez) pro web i tisk; responzivní stupnice; řezy přiřazené úlohám; **náhradní písma podle prostředí** (MS Office, Google Workspace, HTML e-mail, nelatinková písma); OpenType (tabulkové číslice, ligatury); **licence** (desktop, web, aplikace, počet uživatelů, kdo licenci drží); příběh písma (volitelné) |
| 06 | Layout | grid, spacing, ukázková rozvržení | spacing tokeny (4/8 px); **breakpointy**; baseline grid pro tisk; **ochranné zóny a spadávka** podle formátu; gridy pro konkrétní formáty (A4, 16:9, 1:1, 9:16) |
| 07 | Vizuální jazyk | fotografie, ilustrace, ikony, grafické prvky | **dva foto briefy** (lifestyle / produkt, případně tým a portréty); tvrdá pravidla (text přes tváře, filtry, ořez, místo pro copy, stock ano/ne); **práva, kredity a smlouvy s modely**; **politika AI obrazů**; alt text; **úrovně ilustrace**; ikony pro UI × pro marketing (mřížka, tah, velikosti 16/20/24); **maskot** (volitelné: konstrukce, výrazy, co se smí měnit) |
| 08 | Motion, video a zvuk | principy, animace loga, zvukové logo | **tokeny pohybu** (délky 100/200/400/800 ms, křivky); logo jako znělka (intro, outro); **omezený pohyb** (reduced motion); **video** (titulky, lower thirds, end card, bezpečné zóny, hudba a licence); zvuková identita (volitelné) |
| 09 | **Digitální produkt a UI** (nová) | – | most brand → design system; tabulka tokenů (barvy, typo, spacing, zaoblení, stíny, pohyb) s názvy pro kód; klíčové komponenty v brandu (tlačítka, formuláře, karty, navigace) a jejich stavy (hover, focus, disabled, chyba); ikona aplikace a splash; onboarding a prázdné stavy; transakční e-maily; dark mode; datová vizualizace v produktu; odkazy na Figma knihovnu, Storybook a JSON tokeny |
| 10 | Aplikace a šablony | tisk, e-mail a web, sociální sítě, prezentace | **tabulky rozměrů** (bannery, sociální sítě včetně bezpečných zón, OOH); newsletter; dokumenty (Word / Docs, nabídka, faktura); HR a nábor; eventy a pozvánky; inzerce; video pozadí pro hovory; **galerie reálného použití** (anotované ukázky správně) |
| 11 | **Obaly, prostor a produkt** (nový modul) | merch z bývalé 09 | **obalová architektura** (hierarchie informací na obalu, pevné × proměnné zóny); dieline a technické podklady; **regálový efekt** a barevné rozlišení variant; **materiály a povrchové úpravy**; **udržitelnost a claimy** (zakázané materiály, certifikace, pravidlo dohledatelnosti); **regulace a povinné texty**; obchody a prostor (fixní prvky × lokální volnost, briefing pro architekta); **senzorika** (vůně, hmat, zvuk v prostoru); **limitované edice a kolaborace** (co je pevné, co mění umělec, kredity); merch a fanouškovské užití |
| 12 | Architektura, partneři a média | sub-brandy, co-branding | model architektury a **pravidla pojmenování**; co-branding (mezera v % značky, pořadí, optické vyvážení, šablony lockupů); **pravidla pro třetí strany** (jak o značce mluvit, „X pro [značku]“ vs. „[značka] X“, co je zakázáno, kdy je nutný souhlas); **tiskový kit** (boilerplate, fakta, portréty vedení, produktové fotografie, tiskové zprávy, kontakt) |
| 13 | **Přístupnost** (nová) | – | souhrn pro všechny kanály: kontrast (AA/AAA), minimální velikosti písma, fokus a ovládání klávesnicí, alt text, titulky a přepisy, omezený pohyb, čitelnost v tisku, barva jako jediný nositel informace; odkaz na legislativu (European Accessibility Act, platný od 28. 6. 2025) |
| 14 | Správa a ke stažení | stažení, kontakt, FAQ | **matice stažení** podle publika (interní / partneři / tisk); konvence pojmenování souborů; **®/™ a copyright**; licenční podmínky pro užití značky; **schvalovací proces** (kdo, SLA, formulář); role a odpovědnosti; frekvence revize manuálu; changelog; FAQ |

### Dopady na PDF manuál

- Slidy doplnit ve stejném pořadí kapitol.
- Přidat předěl pro kapitolu 08.
- Přidat slidy: co je nového, persony, konkurence, matice tónu, boilerplate, tabulka ikon, škály barev, sémantika a dark mode, stupnice tokenů, UI, přístupnost, pravidla pro třetí strany, tiskový kit, matice stažení.
- Modul 11 řešit jako samostatnou sadu slidů, kterou lze celou vypustit.
- Odhad: 49 → přibližně 70–75 slidů.

---

## E. Rychlé opravy stávající šablony

1. Doplnit předělový slide kapitoly 08 v `pdf/manual.html`.
2. Sjednotit název kapitoly 11 (a po přečíslování 14) na webu i v PDF.
3. Doplnit Do/Don't k principům tone of voice 2 a 3.
4. Tlačítka ke stažení nasměrovat na konkrétní soubory podle konvence názvů. U prázdné šablony nechat funkční hlášku jako u tlačítka PDF.
5. Barvy Do/Don't napojit na brand.css (`--brand-do`, `--brand-dont`), výchozí hodnoty zvolit tak, aby se správně a špatně daly rozlišit i bez barvy (tónem, ne jen odstínem).
6. „Brand na jedné stránce“ přidat na web (00), changelog do PDF.
7. U sekundárních barev doplnit Pantone a RAL, aby tabulky byly jednotné.
8. Odstíny 50 / 25 % zobrazit i na webu (nahradí je škála 50–900).
9. Použít nebo odstranit `.ph-caption`.

### Nové tokeny v `css/brand.css`

Zachovat princip jednoho souboru pro klienta:

- `--brand-primary-50` … `--brand-primary-900` (výchozí dopočet přes `color-mix()`, klient může přepsat)
- `--brand-success`, `--brand-warning`, `--brand-error`, `--brand-info`
- `--brand-dark-bg`, `--brand-dark-surface`, `--brand-dark-text` (dark mode)
- `--brand-font-mono` (volitelné), `--brand-font-display` (volitelné)
- `--brand-radius`, `--brand-motion-fast/base/slow`, `--brand-ease`
- `--brand-do`, `--brand-dont`

---

## F. Doporučené pořadí implementace

1. **Opravy (E).** Malé, bez změny struktury.
2. **P1 v jádru:** strategie (persony, konkurence, promise), verbální identita (voice × tone, matice, boilerplate, UX writing), logo (kdy kterou, ikony, matice stažení), barvy (škály, sémantika, dark mode, dvojice), typografie (tokeny, prostředí, licence), nová kapitola 09 UI, nová kapitola 13 Přístupnost, kapitola 14 Správa (třetí strany, kontakty, specifikace souborů).
3. **Přečíslování** webu, sidebaru, PDF a README na 00–14.
4. **P2:** dataviz, inkluzivní jazyk, naming, foto briefy a práva, AI politika, tokeny pohybu, video, tabulky rozměrů, tiskový kit, co-branding, co je nového.
5. **P3 jako moduly:** kapitola 11 (obaly, prostor, udržitelnost, regulace, senzorika, limitky, merch) a maskot. Obsah modulu musí být v šabloně jasně označen jako „smaž, pokud nepotřebuješ“.
6. **Nový export PDF** a kontrola podle `brand_checklist.md`, fáze 12.
