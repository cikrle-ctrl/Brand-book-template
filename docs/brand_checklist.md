# Brand checklist před předáním klientovi

Projdi tento seznam krok za krokem, než brand předáš klientovi. Položka je hotová, až když se dá ověřit (soubor existuje, hodnota je vyplněná, test prošel). Formulace „vypadá dobře“ nestačí.

Fáze 8 (Obaly, prostor a produkt) a položky označené *(modul)* vyplň jen tehdy, když se klienta týkají. Ostatní fáze jsou povinné vždy.

**Projekt:** ____________________ **Verze brandu:** ______ **Designér:** ____________ **Datum:** __________

---

## 0. Strategie je schválená

- [ ] Klient písemně schválil strategii (e-mail nebo podepsaný zápis) s datem a jménem rozhodující osoby.
- [ ] Mise má nejvýše 2 věty, vize 1 větu. Obě jsou bez obecných frází, které by mohla použít jakákoli firma v oboru.
- [ ] Hodnot je 3–5. U každé je popsané, jak se projeví v chování, produktu a komunikaci.
- [ ] Positioning je v jedné větě podle vzorce (pro koho, potřeba, kategorie, odlišení, důkaz).
- [ ] Brand promise má alespoň 3 konkrétní důkazy (reasons to believe), které klient doloží fakty.
- [ ] Cílové skupiny jsou popsané jako 2–4 persony: potřeba, bariéra, kde značku potkávají, co od ní čekají.
- [ ] Konkurence je zmapovaná (min. 5 značek). Je jasné, v čem se odlišujeme a kterým klišé kategorie se vyhýbáme.
- [ ] Osobnost značky (archetyp nebo 3–5 vlastností) je pojmenovaná a promítá se do vizuálu i hlasu.
- [ ] Příběh značky má nejvýše 150 slov a klient ověřil fakta (data, jména, místa).
- [ ] Každé vizuální rozhodnutí v manuálu lze zdůvodnit strategií. Pokud ne, rozhodnutí přehodnotit.

## 1. Logo

### Konstrukce a varianty
- [ ] Primární logo je finálně vektorizované: žádné otevřené cesty, zbytečné body ani překrývající se tvary. Text je převedený na křivky.
- [ ] Existují všechny varianty, které značka potřebuje: horizontální, stacked/vertikální, symbol/monogram, wordmark, případně lockup s claimem nebo deskriptorem.
- [ ] U každé varianty je v manuálu napsáno, **kdy ji použít**, a je určená výchozí varianta.
- [ ] Konstrukční mřížka a optické korekce jsou zdokumentované.

### Barevné verze
- [ ] Každá varianta existuje v plné barvě, inverzně (bílá), černé mono a jednobarevně pro ražbu, gravírování a výšivku.
- [ ] Logo je otestované na světlém, tmavém, brandovém a fotografickém pozadí. Nevyhovující kombinace jsou mezi chybami použití.

### Zóna a velikost
- [ ] Ochranná zóna je definovaná jako poměr části loga (např. výška písmene X), ne v pevných jednotkách.
- [ ] Minimální velikost je stanovena zvlášť pro tisk (mm) a obrazovku (px) a otestována: logo je čitelné vytištěné na 100 % i na mobilu.
- [ ] Pokud je logo při malých velikostech nečitelné, existuje zjednodušená (responzivní) verze.

### Ikony a malé formáty
- [ ] Favicon: SVG a ICO (16, 32, 48 px), zkontrolovaný na světlé i tmavé záložce prohlížeče.
- [ ] Apple touch icon 180 × 180 px, PWA ikony 192 a 512 px, maskable verze s bezpečnou zónou.
- [ ] Ikona aplikace pro iOS (1024 × 1024 bez průhlednosti) a Android (adaptivní ikona, popředí a pozadí) *(modul)*.
- [ ] Profilový avatar pro sociální sítě, zkontrolovaný v kruhovém i čtvercovém ořezu.
- [ ] OG / sdílecí obrázek 1200 × 630 px.

### Chyby a pohyb
- [ ] Chyby použití mají min. 8 vizuálních příkladů. Mezi nimi: deformace, změna barev, rotace, efekty, rušivé pozadí, nedostatečný kontrast, logo ve větě, logo jako vzor, přestavění nebo znovunakreslení (i pomocí AI).
- [ ] Animace loga (pokud existuje) je v MP4, WebM a Lottie a má statický první i poslední snímek.

## 2. Barvy

- [ ] Každá barva má jméno a roli (primární, sekundární, neutrální, akcent, sémantická).
- [ ] U každé barvy je v jedné tabulce: HEX, RGB, OKLCH, CMYK coated, CMYK uncoated, Pantone C, Pantone U, případně RAL a NCS pro prostor.
- [ ] Hodnoty CMYK a Pantone jsou ověřené fyzickým vzorníkem (Pantone Formula Guide) nebo nátiskem, ne jen převodem v software.
- [ ] Barevný profil pro tisk je určený (např. PSO Coated v3 / FOGRA51 a PSO Uncoated v3 / FOGRA52) a je uvedený v manuálu i v tiskových podkladech.
- [ ] Každá barva má škálu odstínů (50–900 nebo 10–100). Odstíny jsou vyzkoušené v UI, ne jen matematicky dopočtené.
- [ ] Poměr použití barev je určený (např. 60 / 25 / 10 / 5) a ukázaný na příkladu.
- [ ] Je určený limit barev na jeden výstup (např. neutrální + 1 akcent).
- [ ] Sémantické barvy (úspěch, varování, chyba, informace) jsou definované a nekolidují s brandovou barvou. Pokud je brandová barva červená, chyba má odlišnou hodnotu.
- [ ] Paleta pro dark mode existuje a je otestovaná *(pokud má klient digitální produkt)*.
- [ ] Paleta pro grafy má min. 6 kategorických barev rozlišitelných i pro barvoslepé (ověřeno simulátorem deuteranopie a protanopie) a sekvenční škálu.
- [ ] Všechny textové dvojice barev mají změřený kontrast: min. 4,5 : 1 pro běžný text, 3 : 1 pro velký text a UI prvky. Výsledky jsou v tabulce.
- [ ] Gradienty (pokud existují) mají přesné body, úhly a pravidla použití.
- [ ] Chyby použití barev mají min. 3 příklady.
- [ ] Barvy jsou exportované jako `.ase` (Adobe), Figma variables / styly a `tokens.json`.

## 3. Typografie

- [ ] Primární a sekundární písmo jsou vybraná a otestovaná na českých znacích (ě š č ř ž ý á í é ů ú ň ť ď, velká i malá, uvozovky „“ a ‚‘, pomlčka –).
- [ ] Každému řezu je přiřazená úloha (např. Bold jen display, Medium titulky, Regular text).
- [ ] Typografická stupnice je definovaná pro web (rem a px, řádkování, prostrkání, řez) i pro tisk (pt).
- [ ] Responzivní chování stupnice (mobil / desktop) je ukázané.
- [ ] Náhradní písma jsou určená pro každé prostředí: MS Office, Google Workspace, HTML e-mail, systémový fallback v CSS, nelatinková písma.
- [ ] OpenType funkce jsou zdokumentované (tabulkové číslice v tabulkách a UI, ligatury, kapitálky), pokud je písmo má.

### Licence
- [ ] Licence písem pokrývá všechna použití: desktop (počet uživatelů), web (počet zobrazení), aplikace, e-book nebo PDF, video a vysílání.
- [ ] Je jasné, **kdo licenci vlastní**. Ideálně klient na své jméno, ne studio.
- [ ] Klient obdržel doklad o licenci, nebo odkaz, kde ji koupí.
- [ ] Webové fonty jsou ve formátu WOFF2 s `@font-face` a `font-display: swap` a jsou podmnožinou s latinkou včetně češtiny.

### Sazba
- [ ] Pravidla sazby jsou v manuálu: zarovnání, délka řádku 45–75 znaků, zdůraznění, verzálky, nezalomitelné mezery po jednopísmenných předložkách a spojkách.
- [ ] Chyby použití typografie mají min. 3 příklady.

## 4. Vizuální jazyk

### Fotografie
- [ ] Foto brief je napsaný (případně zvlášť pro lifestyle, produkt a portréty): námět, světlo, barevnost, ořez, kompozice, casting, postprodukce.
- [ ] Tvrdá pravidla jsou jasná: stock ano/ne, filtry, text přes tváře, důstojnost zobrazení, místo pro text.
- [ ] Min. 6 schválených referenčních fotografií a 3 ukázky toho, jak to vypadat nemá.
- [ ] Ke každé předávané fotografii jsou vyřešená práva: licence, rozsah (území, doba, média), kredit autora, souhlasy modelů (model release).
- [ ] Existuje politika pro obrazy generované AI: zda se smí používat, kde, jak se označují a co je zakázáno (tváře skutečných lidí, loga, produkty).
- [ ] Jsou napsaná pravidla alt textu pro web a sociální sítě.

### Ilustrace, ikony a grafické prvky
- [ ] Ilustrace mají definovaný styl, barvy, tloušťku linky a případně úrovně podle důležitosti výstupu *(modul)*.
- [ ] Ikony jsou na jednotné mřížce (např. 24 × 24, tah 1,5 / 2 px, zaoblení) a jsou exportované jako SVG a jako sprite nebo knihovna. Je jasné, co jsou ikony pro UI a co pro marketing.
- [ ] Pokud se používá cizí sada ikon, je doložena její licence (např. Lucide, ISC).
- [ ] Grafické prvky (tvary, vzory, textury) jsou ve vektorech. Je popsáno, jak se tvoří nové kombinace, aby tým nebyl závislý na studiu.
- [ ] Maskot / postava má konstrukční list, sadu výrazů a pozic a pravidla, co se smí měnit *(modul)*.

## 5. Motion, video a zvuk

- [ ] Principy pohybu jsou pojmenované (2–4) a ukázané na videu nebo prototypu.
- [ ] Tokeny pohybu jsou definované: délky (např. 100 / 200 / 400 / 800 ms) a křivky (cubic-bezier).
- [ ] Je určená varianta pro omezený pohyb (`prefers-reduced-motion`).
- [ ] Animace loga je exportovaná (MP4, WebM, Lottie, GIF pro e-mail) ve světlé i tmavé verzi.
- [ ] Video šablony jsou připravené: intro, outro, end card, lower thirds, titulky (písmo, velikost, pozadí), bezpečné zóny pro 16:9, 1:1, 9:16.
- [ ] Hudba a zvukové logo mají licenci pro všechna plánovaná média *(modul)*.

## 6. Digitální produkt a UI

- [ ] Pokud brand neměl web/UI paletu, je UI systém navržený v `css/brand.css` (blok 4, tokeny `--ui-*`) a klient ho schválil.
- [ ] Typography scale je kompletní: Display, H1–H6, P1–P3, u každé úrovně písmo (Primary / Secondary), řez, velikost (mobil → desktop), line-height a prostrkání.
- [ ] Sémantická paleta má všechny tokeny: `primary`, `primary-hover`, `primary-foreground`, `secondary`, `secondary-foreground`, `background`, `foreground`, `muted`, `muted-foreground`, `border`, `inverted`, `inverted-foreground`, `accent`, `destructive`, `success`, `ring`, ve světlém i tmavém režimu.
- [ ] V tabulce sémantické palety (kapitola 09) není žádná dvojice „nevyhovuje“, nebo je výslovně označená jako zakázaná pro text.
- [ ] Radius (`none / sm / md / lg / full`) a jeho role (tlačítko, pole, karta, modal) odpovídají tonalitě značky.
- [ ] Elevation (`shadow-sm / md / lg`) je definovaná, nebo je u flat brandu výslovně uvedeno: „Brand nevyužívá elevation ani shadows, design je striktně flat.“
- [ ] Brand Web Preview je stylovaný výhradně tokeny (žádné hodnoty mimo `--ui-*`) a pod každým blokem je popis v tokenech. Texty ukázky jsou reálné texty značky.
- [ ] Export Tailwind v4 theme a tokens.json z kapitoly 09 je stažený, otestovaný v čistém projektu a předaný vývojářům.
- [ ] Design tokeny jsou exportované (`tokens.json` ve formátu W3C Design Tokens nebo Style Dictionary) a jejich názvy odpovídají Figma variables.
- [ ] Figma knihovna obsahuje barvy, typografii, efekty, mřížky a klíčové komponenty s variantami a stavy (default, hover, focus, active, disabled, chyba, načítání).
- [ ] Komponenty jsou otestované ve světlém i tmavém režimu.
- [ ] Focus stav je viditelný (kontrast min. 3 : 1 vůči okolí).
- [ ] UX writing je hotový: tlačítka, chybové hlášky, prázdné stavy, potvrzení, notifikace, onboarding.
- [ ] Transakční e-maily jsou nakódované a otestované v Gmailu, Outlooku (Windows) a Apple Mail, včetně tmavého režimu.
- [ ] Ikona aplikace, splash screen a ikony do obchodů s aplikacemi jsou exportované ve všech požadovaných rozměrech *(modul)*.
- [ ] Předávka vývojářům je domluvená: Figma odkaz, tokeny, případně Storybook a kontakt na designéra pro dotazy.

## 7. Layout, aplikace a šablony

### Layout
- [ ] Grid je definovaný pro hlavní formáty (A4, 16:9, 1:1, 4:5, 9:16, web desktop a mobil): počet sloupců, okraje, mezery.
- [ ] Základní jednotka spacingu (např. 4 / 8 px, 5 mm) a breakpointy webu jsou určené.
- [ ] Bezpečné zóny a spadávky jsou vyznačené pro každý tiskový i sociální formát.
- [ ] Min. 3 ukázková rozvržení (foto, jen typografie, grafický prvek) ukazují, jak s gridem pracovat.

### Architektura a partneři
- [ ] Model architektury (jedna značka / samostatné značky / hybrid) je zdokumentovaný a všechny sub-brandy mají lockup.
- [ ] Co-branding: je určená mezera (v % značky), oddělovač, pořadí a optické vyvážení. Jsou připravené šablony lockupů.
- [ ] Tiskový kit je hotový: boilerplate, fakta o firmě, portréty vedení, produktové fotografie, kontakt pro média.

### Aplikace
- [ ] Vizitka: tisková data s 3 mm spadávkou, ořezovými značkami a převedeným nebo vloženým písmem. Varianty pro všechny osoby dodané klientem, kontroly jmen a titulů.
- [ ] Hlavičkový papír: tisková verze a editovatelná verze ve Wordu / Google Docs s nastavenými styly.
- [ ] Obálka, razítko a další firemní tiskoviny podle zadání.
- [ ] E-mailový podpis: HTML otestovaný v Outlooku, Gmailu a Apple Mail a na mobilu. Obrázky hostované na trvalé URL. Návod na instalaci.
- [ ] Prezentace: šablona v PowerPoint / Google Slides / Keynote s předlohami (titulní, obsah, kapitola, text, obrázek, graf, citát, závěr), nastavenými barvami motivu a fonty. Funguje i s náhradním písmem.
- [ ] Dokumenty: nabídka, report, faktura a další šablony podle zadání, se styly odstavců.
- [ ] Sociální sítě: profilové a titulní obrázky pro každou platformu, šablony příspěvků 1:1 a 4:5 a stories 9:16. Bezpečné zóny jsou vyznačené a šablony editovatelné (Figma / Canva).
- [ ] Web a bannery: hero pro desktop a mobil, sada bannerů v rozměrech podle mediaplánu.
- [ ] Newsletter: šablona v nástroji klienta (Mailchimp, Ecomail…) nebo HTML.
- [ ] HR, nábor, eventy, inzerce, OOH, merch: jen to, co je v zadání. Každý výstup má technickou specifikaci.
- [ ] Galerie reálného použití v manuálu ukazuje, jak systém funguje na min. 6 různých výstupech.

## 8. Obaly, prostor a produkt *(modul)*

- [ ] Obalová architektura: je určená hierarchie informací a pevné (logo, informační panel) i proměnné zóny.
- [ ] Dielines jsou od výrobce, mají správné rozměry a výseky, spadávky a nelakované nebo nepotisknuté plochy jsou vyznačené.
- [ ] Varianty (příchutě, řady) mají jasný systém rozlišení (barva, číslo, ilustrace) a jsou otestované vedle sebe v regálu (fyzický mockup nebo 3D render).
- [ ] Materiály a povrchové úpravy jsou specifikované (papír, gramáž, lak, ražba, fólie, embossing) a potvrzené nátiskem nebo vzorkem.
- [ ] Povinné texty podle legislativy: složení, alergeny, výživové údaje, EAN, šarže, datum, výrobce, recyklační značení, varování. Obsah zkontroloval klient nebo jeho právník.
- [ ] Environmentální tvrzení jsou doložitelná (certifikát, číslo licence FSC apod.) a neklamavá podle pravidel EU proti greenwashingu.
- [ ] Prostor a značení: výkresy, materiály a RAL/NCS, pravidla fixních prvků a lokální volnosti, briefing pro architekta.
- [ ] Senzorika (vůně, hmat, zvuk v prostoru) je popsaná, pokud je součástí konceptu.
- [ ] Limitované edice a kolaborace: je určeno, co je pevné, co může měnit spolupracující autor, jak se uvádí kredit a kdo schvaluje.

## 9. Verbální identita

- [ ] Claim je finální a ověřený: dostupnost domény, nekolize s existující ochrannou známkou, přeložitelnost do dalších jazyků.
- [ ] Principy hlasu (3–4) mají každý: popis, škálu, „jsme / nejsme“, Do a Don't s reálným příkladem.
- [ ] Matice tónu podle kanálu pokrývá web, sociální sítě, produktové UI, zákaznickou podporu, krizovou komunikaci a HR.
- [ ] Messaging pilíře (3–4) mají každý hlavní sdělení a 2–3 důkazy.
- [ ] Elevator pitch a boilerplate jsou ve 3 délkách: 1 věta, cca 50 slov, cca 100 slov.
- [ ] Slovník: preferované výrazy, zakázané výrazy, psaní názvu značky a produktů (velká písmena, skloňování, ®/™).
- [ ] Pravidla pro inkluzivní jazyk jsou součástí manuálu.
- [ ] Způsob oslovení (tykání / vykání) je určený pro každý kanál.
- [ ] Jazykové verze: pravidla lokalizace a co se nepřekládá.
- [ ] Veškerý text v manuálu i ve výstupech prošel korekturou rodilého mluvčího (čeština i další jazyky).

## 10. Přístupnost

- [ ] Kontrast všech textových dvojic a UI prvků odpovídá WCAG 2.2 AA (tabulka v manuálu).
- [ ] Minimální velikost písma je stanovena pro web (16 px běžný text), tisk a prezentace.
- [ ] Informace není nesena jen barvou (grafy, stavy, chyby mají i ikonu nebo text).
- [ ] Video má titulky, případně přepis. Animace respektují omezený pohyb.
- [ ] PDF manuál i šablony dokumentů mají tagy, pořadí čtení a alternativní texty (kontrola v Acrobat Accessibility Check nebo PAC).
- [ ] Klient ví o povinnostech podle European Accessibility Act (platný od 28. 6. 2025), pokud se ho týkají.

## 11. Právo a licence

- [ ] Rešerše ochranných známek pro název a logo proběhla (ÚPV, EUIPO, WIPO) v relevantních třídách. Výsledek je předaný klientovi.
- [ ] Klient ví, že přihlášku známky podává sám nebo jeho advokát. Studio doporučilo termín.
- [ ] Předávací protokol nebo smlouva výslovně převádí autorská majetková práva nebo uděluje výhradní licenci k logu a identitě (rozsah, území, doba).
- [ ] Seznam všech cizích prvků s licencemi je hotový: písma, fotografie, ilustrace, ikony, hudba, mockupy. U každého je uveden vlastník licence.
- [ ] Mockupy použité v prezentaci nejsou předány jako součást brandu, pokud to jejich licence nedovoluje.
- [ ] Pravidla užití značky třetími stranami (partneři, média) jsou v manuálu včetně kontaktu pro schválení.
- [ ] Pravidla pro ®/™ a copyright řádek jsou určená.

## 12. Kontrola manuálu (web + PDF)

### Obsah
- [ ] Nikde nezůstal placeholder, instrukce šablony, „[Název značky]“, lorem ipsum ani šedý rámeček.
- [ ] Všechny kapitoly v sidebaru odpovídají obsahu. Nepoužité moduly jsou smazané včetně odkazů v navigaci.
- [ ] Verze, datum a autor jsou vyplněné na webu, v PDF, v patičce a v changelogu.
- [ ] Brand na jedné stránce je aktuální.

### Konzistence
- [ ] Web a PDF mají stejné kapitoly, názvy, hodnoty barev i rozměry.
- [ ] Hodnoty barev v manuálu, v `css/brand.css`, ve Figmě, v `.ase` a v `tokens.json` jsou totožné (kontrola porovnáním, ne odhadem).

### Funkčnost
- [ ] Všechny odkazy a tlačítka ke stažení vedou na existující soubor (kontrola kliknutím, žádná 404).
- [ ] Web funguje na mobilu, tabletu a desktopu, v Chrome, Safari a Firefoxu. Tisk webu (Ctrl+P) je čitelný.
- [ ] Web má titulek, favicon, meta popis a OG obrázek. Pokud je neveřejný, je chráněný heslem nebo `noindex`.

### PDF a korektura
- [ ] PDF je znovu vyexportované po posledních změnách (`pdf\build-pdf.ps1`). Text nepřetéká přes okraj slidu a písma jsou vložená. Velikost je rozumná (do cca 20 MB, případně i odlehčená verze).
- [ ] Korektura: pravopis, typografie (nezalomitelné mezery, české uvozovky, pomlčky vs. spojovníky), jednotné psaní názvu značky.
- [ ] Druhý designér manuál prošel nezávisle (čtyři oči).

## 13. Export assetů

### Struktura složek
```
[znacka]_brand_v1.0/
├── 01_logo/          # podsložky podle varianty: primarni, sekundarni, symbol, wordmark, lockupy
│   ├── svg/  png/  pdf/  eps/
│   └── favicon_appicon/
├── 02_barvy/         # .ase, tokens.json, paleta.pdf
├── 03_pisma/         # jen fonty s licencí k předání, jinak odkaz a doklad o licenci
├── 04_foto/          # podsložky podle typu + soubor s licencemi a kredity
├── 05_ilustrace_ikony_prvky/
├── 06_motion/        # mp4, webm, lottie, gif
├── 07_sablony/       # prezentace, dokumenty, social, podpis, tiskoviny
├── 08_obaly_prostor/ # (modul) dielines, tisková data, výkresy
├── 09_manual/        # brand-manual.pdf, odkaz na web
└── 00_CTI_ME.txt     # obsah balíčku, verze, kontakt, licence
```

### Konvence názvů
- [ ] Všechny soubory mají jednotné názvy bez diakritiky a mezer, malými písmeny:
  `[znacka]_[prvek]_[varianta]_[barva]_[barevny-prostor].[pripona]`
  např. `aestio_logo_primarni_barevne_rgb.svg`, `aestio_logo_symbol_bila_cmyk.pdf`.

### Formáty loga
- [ ] Matice je kompletní: každá varianta × každá barevná verze × každý formát.
  - **SVG** (web, UI): optimalizované (SVGO), bez vložených rastrů, s `viewBox`, bez pevné šířky a výšky.
  - **PNG** (kancelář, rychlé použití): průhledné pozadí, min. 3 velikosti (např. 500, 1000, 2000 px na šířku).
  - **PDF** (tisk): vektorové, CMYK a Pantone verze, písmo v křivkách.
  - **EPS nebo AI** (výroba, polep, výšivka): pro dodavatele, kteří je vyžadují.
  - **JPG** jen tam, kde nelze použít průhlednost. **WebP** pro web a agregátory.
- [ ] RGB soubory mají profil sRGB. CMYK soubory mají uvedený profil.
- [ ] Každý soubor je otevřený a zkontrolovaný (náhodný vzorek min. 20 % souborů, všechny SVG v prohlížeči).

### Ostatní assety
- [ ] Rozlišení: obrazovka podle cílové velikosti ve 2× (retina), tisk 300 PPI v cílové velikosti.
- [ ] Zdrojové soubory (Figma, AI, INDD) jsou předané, pokud to smlouva určuje, uklizené (pojmenované vrstvy, žádné skryté pokusy) a s vloženými nebo přibalenými obrazy.
- [ ] Balíček je v ZIP a je rozdělený i podle publika: **interní** (vše), **partneři** (loga, pravidla, lockupy), **tisk a média** (loga, boilerplate, fotky vedení a produktu).
- [ ] Obsah ZIPu po rozbalení odpovídá souboru `00_CTI_ME.txt`.

## 14. Předání

- [ ] Předávací schůzka je naplánovaná (60–90 min): provedení manuálem, ukázka, kde co najít, jak používat šablony, otázky.
- [ ] Klient má jmenovaného brand managera (správce značky) a zástupce.
- [ ] Assety jsou nahrané na trvalé místo s přístupem pro klienta (sdílený disk, DAM, web manuálu). Nejde o odkaz s omezenou platností.
- [ ] Přístupy (Figma, web manuálu, případně hosting) jsou převedené na účty klienta. Hesla se předávají přes správce hesel, ne e-mailem.
- [ ] Školení pro tým klienta (marketing, sales, HR) proběhlo nebo je naplánované, s nahrávkou.
- [ ] Předávací protokol podepsaný klientem obsahuje seznam předaných souborů, převod práv a datum.
- [ ] Klient dostal souhrnný e-mail: odkazy, struktura balíčku, kontakty, další kroky (registrace známky, licence písem).

## 15. Po předání

- [ ] Kontrola po 30 dnech: jak se brand používá, kde jsou problémy, co chybí v šablonách.
- [ ] Kontrola po 90 dnech: audit reálných výstupů (web, sítě, tiskoviny) proti manuálu.
- [ ] Nalezené úpravy jsou zapsané do changelogu a vydané jako nová verze (1.1, 1.2…) s vyznačením „co je nového“.
- [ ] S klientem je domluvena frekvence revize manuálu (doporučeno 1× ročně) a kdo ji provádí.
- [ ] Případová studie: souhlas klienta s publikací, termín a rozsah (co smí být zveřejněno a kdy).
