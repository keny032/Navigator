
import { Procedure, Category } from '../models/procedure.model';

export const PROCEDURES_DATA: Procedure[] = [
    // LIČNI DOKUMENTI
    {
      id: 'pasos-biometrijski',
      title: 'Izdavanje biometrijskog pasoša',
      category: Category.PersonalDocuments,
      description: 'Procedura za dobijanje novog biometrijskog pasoša za državljane Bosne i Hercegovine.',
      steps: [
        { stepNumber: 1, title: 'Uplata taksi', description: 'Izvršiti uplatu potrebnih administrativnih taksi u pošti ili banci.', estimatedDurationMinutes: 15 },
        { stepNumber: 2, title: 'Prikupljanje dokumenata', description: 'Prikupiti ličnu kartu, dokaz o uplati i stari pasoš (ako postoji).', estimatedDurationMinutes: 10 },
        { stepNumber: 3, title: 'Predaja zahtjeva', description: 'Predati zahtjev u nadležnoj policijskoj upravi (MUP/CIPS) i obaviti biometrijsko fotografisanje.', estimatedDurationMinutes: 30 },
        { stepNumber: 4, title: 'Preuzimanje pasoša', description: 'Nakon obavijesti, preuzeti gotov pasoš na istoj lokaciji.', estimatedDurationMinutes: 10 }
      ],
      documents: [
        { name: 'Lična karta (CIPS)', isMandatory: true, notes: 'Mora biti važeća.' },
        { name: 'Dokaz o uplati taksi', isMandatory: true, notes: 'Dvije uplatnice.' },
        { name: 'Stari pasoš', isMandatory: false, notes: 'Poništava se prilikom predaje zahtjeva.' }
      ]
    },
    {
      id: 'licna-karta',
      title: 'Izdavanje lične karte',
      category: Category.PersonalDocuments,
      description: 'Procedura za izdavanje ili zamjenu lične karte.',
      steps: [
        { stepNumber: 1, title: 'Uplata takse', description: 'Uplatiti administrativnu taksu.', estimatedDurationMinutes: 15 },
        { stepNumber: 2, title: 'Predaja zahtjeva', description: 'Predati zahtjev u MUP/CIPS-u uz biometrijske podatke.', estimatedDurationMinutes: 25 },
        { stepNumber: 3, title: 'Preuzimanje lične karte', description: 'Preuzeti dokument nakon izrade.', estimatedDurationMinutes: 10 }
      ],
      documents: [
        { name: 'Izvod iz matične knjige rođenih', isMandatory: true, notes: 'Ne stariji od 6 mjeseci.' },
        { name: 'Uvjerenje o državljanstvu', isMandatory: true, notes: 'Ne starije od 6 mjeseci.' },
        { name: 'Dokaz o uplati takse', isMandatory: true, notes: '' }
      ]
    },
    {
      id: 'rodni-list',
      title: 'Rodni list - izvadak',
      category: Category.PersonalDocuments,
      description: 'Postupak za dobijanje izvoda iz matične knjige rođenih.',
      steps: [
        { stepNumber: 1, title: 'Predaja zahtjeva', description: 'Popuniti i predati zahtjev u matičnom uredu općine.', estimatedDurationMinutes: 10 },
        { stepNumber: 2, title: 'Uplata takse', description: 'Uplatiti općinsku taksu na šalteru.', estimatedDurationMinutes: 5 },
        { stepNumber: 3, title: 'Preuzimanje izvoda', description: 'Preuzeti gotov izvod.', estimatedDurationMinutes: 5 }
      ],
      documents: [
        { name: 'Lična karta ili pasoš', isMandatory: true, notes: 'Za identifikaciju.' },
        { name: 'Dokaz o uplati takse', isMandatory: true, notes: '' }
      ]
    },
    { id: 'prebivaliste-cips', title: 'Prebivalište - CIPS prijava', category: Category.PersonalDocuments, description: 'Prijava ili promjena prebivališta.', steps: [], documents: [] },
    { id: 'drzavljanstvo-dokaz', title: 'Državljanstvo - dokazivanje', category: Category.PersonalDocuments, description: 'Postupak za dobijanje uvjerenja o državljanstvu.', steps: [], documents: [] },

    // VOZILA
    {
      id: 'vozacka-dozvola-prvo',
      title: 'Vozačka dozvola - prvo izdavanje',
      category: Category.Vehicles,
      description: 'Kompletan proces za sticanje vozačke dozvole B kategorije po prvi put.',
      steps: [
        { stepNumber: 1, title: 'Ljekarsko uvjerenje', description: 'Obaviti ljekarski pregled za vozače.', estimatedDurationMinutes: 60 },
        { stepNumber: 2, title: 'Teorijska nastava', description: 'Pohađati i položiti testove iz poznavanja propisa.', estimatedDurationMinutes: 2400 },
        { stepNumber: 3, title: 'Praktična obuka', description: 'Završiti obavezni broj časova vožnje sa instruktorom.', estimatedDurationMinutes: 2100 },
        { stepNumber: 4, title: 'Ispit prve pomoći', description: 'Položiti ispit iz prve pomoći.', estimatedDurationMinutes: 180 },
        { stepNumber: 5, title: 'Polaganje ispita', description: 'Položiti finalni praktični ispit vožnje.', estimatedDurationMinutes: 45 },
        { stepNumber: 6, title: 'Predaja zahtjeva za dozvolu', description: 'Predati svu dokumentaciju u MUP.', estimatedDurationMinutes: 20 }
      ],
      documents: [
        { name: 'Ljekarsko uvjerenje', isMandatory: true, notes: 'Ne starije od 6 mjeseci.' },
        { name: 'Potvrda o položenim propisima', isMandatory: true, notes: '' },
        { name: 'Potvrda o položenoj prvoj pomoći', isMandatory: true, notes: '' },
        { name: 'Potvrda o završenoj obuci', isMandatory: true, notes: '' },
        { name: 'Lična karta', isMandatory: true, notes: '' },
        { name: 'Dokaz o uplati taksi', isMandatory: true, notes: '' }
      ]
    },
    { id: 'registracija-vozila', title: 'Registracija vozila', category: Category.Vehicles, description: 'Godišnja registracija putničkog motornog vozila.', steps: [], documents: [] },
    { id: 'tehnicki-pregled', title: 'Tehnički pregled', category: Category.Vehicles, description: 'Obavezni godišnji tehnički pregled vozila.', steps: [], documents: [] },
    { id: 'promjena-vlasnistva', title: 'Promjena vlasništva vozila', category: Category.Vehicles, description: 'Procedura prenosa vlasništva nad vozilom.', steps: [], documents: [] },
    { id: 'uvoz-vozila', title: 'Uvoz vozila', category: Category.Vehicles, description: 'Procedura za uvoz i carinjenje vozila iz inostranstva.', steps: [], documents: [] },

    // POSLOVANJE
    { id: 'otvaranje-obrta', title: 'Otvaranje obrta', category: Category.Business, description: 'Registracija samostalne djelatnosti (obrt).', steps: [], documents: [] },
    { id: 'osnivanje-doo', title: 'Osnivanje d.o.o.', category: Category.Business, description: 'Postupak osnivanja društva sa ograničenom odgovornošću.', steps: [], documents: [] },
    { id: 'porezna-prijava', title: 'Porezna prijava', category: Category.Business, description: 'Godišnja prijava poreza na dohodak ili dobit.', steps: [], documents: [] },
    { id: 'pdv-registracija', title: 'PDV registracija', category: Category.Business, description: 'Upis u sistem poreza na dodanu vrijednost.', steps: [], documents: [] },
    { id: 'registracija-opcini', title: 'Registracija u općini', category: Category.Business, description: 'Prijava djelatnosti nadležnoj općinskoj službi.', steps: [], documents: [] },

    // NEKRETNINE
    { id: 'upis-zemljisna-knjiga', title: 'Upis u zemljišnu knjigu', category: Category.RealEstate, description: 'Uknjižba vlasništva nad nekretninom.', steps: [], documents: [] },
    { id: 'katastar-nekretnina', title: 'Katastar nekretnina', category: Category.RealEstate, description: 'Postupci vezani za katastarske planove i upise.', steps: [], documents: [] },
    { id: 'gradjevinska-dozvola', title: 'Građevinska dozvola', category: Category.RealEstate, description: 'Postupak za dobijanje odobrenja za građenje.', steps: [], documents: [] },

    // ZDRAVSTVO
    { id: 'zdravstvena-knjizica', title: 'Zdravstvena knjižica', category: Category.Health, description: 'Izdavanje ili ovjera zdravstvene knjižice.', steps: [], documents: [] },
    { id: 'socijalna-pomoc', title: 'Socijalna pomoć', category: Category.Health, description: 'Ostvarivanje prava na socijalnu pomoć.', steps: [], documents: [] }
];
