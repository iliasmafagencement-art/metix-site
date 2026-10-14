const SITE = {
  slogan: 'Le mobilier qui donne forme à vos idées.',
  mention: 'LE MOBILIER PRO, SAVOIR-FAIRE MAROCAIN',
  variantes: [
    'Des espaces bien pensés, des journées mieux vécues.',
    'Du mobilier durable pour des espaces qui vous ressemblent.',
    'Équipez vos espaces. Donnez vie à vos projets.'
  ],
  contact: { adresse: '', telephone: '', email: '', whatsapp: '', horaires: '' },
  reseaux: [
    { nom: 'Facebook', url: '' },
    { nom: 'Instagram', url: '' },
    { nom: 'LinkedIn', url: '' }
  ],
  formulaireConnecte: false   // passez à true une fois le formulaire relié à votre messagerie
};

/* Catégories (celles sans produit visible ne s’affichent pas) */
const CATEGORIES = [
  { id:'bureaux',               nom:'Bureaux',                type:'bureau',    v:0 },
  { id:'bureaux-direction',     nom:'Bureaux de direction',   type:'bureau',    v:1 },
  { id:'presentoirs',           nom:'Présentoirs et bureaux d’accueil' },
  { id:'fauteuils-bureau',      nom:'Fauteuils de bureau',    type:'chaise',    v:0 },
  { id:'fauteuils-direction',   nom:'Fauteuils de direction', type:'chaise',    v:0 },
  { id:'ensembles-fauteuils',   nom:'Ensemble de fauteuils',  type:'chaise',    v:0 },
  { id:'tables-reunion',        nom:'Tables de réunion' },
  { id:'armoires-metal',        nom:'Armoires métalliques',   type:'metal',     v:0 },
  { id:'meubles-rangement',     nom:'Meubles de rangement' },
  { id:'rayonnages-metalliques',nom:'Rayonnages métalliques', type:'rayonnage', v:0 },
  { id:'vestiaires-metalliques',nom:'Vestiaires métalliques' },
  { id:'tables-scolaires',      nom:'Tables scolaires' },
  { id:'tableaux-scolaires',    nom:'Tableaux scolaires' },
  /* catégories des anciens exemples (masquées) */
  { id:'chaises',               nom:'Chaises',                type:'chaise',    v:1, legacy:true },
  { id:'rayonnages',            nom:'Rayonnages',             type:'rayonnage', v:1, legacy:true },
  { id:'armoires-bois',         nom:'Armoires en bois',       type:'bois',      v:0, legacy:true },
  { id:'vestiaires',            nom:'Vestiaires en bois',     type:'vestiaire', v:0, legacy:true }
];

/* Produits.
   - prix    : nombre en DH (null ou '' = « Prix sur demande »)
   - image   : chemin d’une photo (ex. 'photos/c1284.jpg') ; null = encart « Photo à venir »
   - galerie : photos supplémentaires affichées en vignettes sur la fiche (facultatif)
   - variantes : dimensions au choix du client, chacune avec sa référence et son prix (facultatif)
                 ex. "variantes": [{"ref": "BD-140", "dims": "140 × 70 cm", "prix": 1890}, {"ref": "BD-160", "dims": "160 × 80 cm", "prix": 2190}]
                 Le prix du produit est alors celui de la dimension choisie (« dès … » dans le catalogue).
   - prixAvant : prix d'origine en DH pour une promotion (affiché barré avec un badge « -XX % ») ;
                 aussi possible dans chaque variante.
   - epuise  : true uniquement si le tableau indique « Épuisé »
   - accueil : true = mis en avant sur l’accueil (jamais si épuisé)
   - visible : false = brouillon, non affiché
   Les 12 premiers sont les anciens exemples, masqués. */
/* Copie du catalogue intégrée au site (affichage immédiat). La référence est data/catalogue.json,
   modifiable depuis l'espace /admin/ : elle est relue à chaque visite et remplace cette copie si elle a changé. */
let PRODUITS_BASE = [

  { demo:true, visible:false, id:'bureau-droit',   cat:'bureaux',        nom:'Bureau droit',            desc:'Plan de travail rectiligne pour les postes de bureau.', art:['bureau',0],   image:null, prix:'' },
  { demo:true, visible:false, id:'bureau-angle',   cat:'bureaux',        nom:'Bureau avec retour',      desc:'Plan de travail avec retour pour un poste plus complet.', art:['bureau',1], image:null, prix:'' },
  { demo:true, visible:false, id:'chaise-bureau',  cat:'chaises',        nom:'Chaise de bureau',        desc:'Siège de travail pour les postes de bureau.',           art:['chaise',0],   image:null, prix:'' },
  { demo:true, visible:false, id:'chaise-visiteur',cat:'chaises',        nom:'Chaise visiteur',         desc:'Chaise d’accueil pour salles d’attente et bureaux.',    art:['chaise',1],   image:null, prix:'' },
  { demo:true, visible:false, id:'rayonnage-ouvert',cat:'rayonnages',    nom:'Rayonnage ouvert',        desc:'Étagères pour classer dossiers, archives et fournitures.', art:['rayonnage',0], image:null, prix:'' },
  { demo:true, visible:false, id:'rayonnage-large',cat:'rayonnages',     nom:'Rayonnage large',         desc:'Rayonnage sur trois montants pour les grands volumes.', art:['rayonnage',1], image:null, prix:'' },
  { demo:true, visible:false, id:'armoire-metal-haute',cat:'armoires-metal',nom:'Armoire métallique haute',desc:'Armoire fermée à deux portes pour ranger dossiers et matériel.', art:['metal',0], image:null, prix:'' },
  { demo:true, visible:false, id:'armoire-metal-basse',cat:'armoires-metal',nom:'Armoire métallique basse',desc:'Armoire basse à deux portes, utilisable comme plan d’appoint.', art:['metal',1], image:null, prix:'' },
  { demo:true, visible:false, id:'armoire-bois-haute',cat:'armoires-bois',nom:'Armoire en bois haute', desc:'Armoire haute à deux portes pour bureaux et salles de réunion.', art:['bois',0], image:null, prix:'' },
  { demo:true, visible:false, id:'armoire-bois-basse',cat:'armoires-bois',nom:'Armoire en bois basse', desc:'Armoire basse à deux portes pour les rangements de proximité.', art:['bois',1], image:null, prix:'' },
  { demo:true, visible:false, id:'vestiaire-3',    cat:'vestiaires',     nom:'Vestiaire en bois, 3 colonnes', desc:'Vestiaire à portes pleines pour les équipes et les vestiaires collectifs.', art:['vestiaire',0], image:null, prix:'' },
  { demo:true, visible:false, id:'vestiaire-2',    cat:'vestiaires',     nom:'Vestiaire en bois, 2 colonnes', desc:'Version à deux colonnes pour les espaces plus compacts.', art:['vestiaire',1], image:null, prix:'' },
  /* ---- Catalogue importé du tableau (43 produits) ---- */
  {"id": "c1284", "ref": "C1284", "cat": "bureaux", "nom": "Bureau de travail", "prix": 2590, "dims": "", "desc": "", "epuise": false, "accueil": true, "image": "/assets/photos/c1284-1.jpg", "galerie": ["/assets/photos/c1284-2.jpg"]},
  {"id": "bd-panama", "ref": "", "cat": "bureaux", "nom": "Bureau droit Panama", "prix": null, "dims": "", "desc": "Bureau droit à plan de travail rectangulaire, pour un poste individuel", "epuise": false, "accueil": false, "image": "/assets/photos/bd-panama-1.jpg"},
  {"id": "bd-malabo", "ref": "", "cat": "bureaux", "nom": "Bureau droit Malabo", "prix": null, "dims": "", "desc": "Bureau droit à plan de travail rectangulaire, pour un poste individuel", "epuise": false, "accueil": false, "image": "/assets/photos/bd-malabo-1.jpg", "galerie": ["/assets/photos/bd-malabo-2.jpg"]},
  {"id": "bd-madrid", "ref": "", "cat": "bureaux", "nom": "Bureau droit Madrid", "prix": null, "dims": "", "desc": "Bureau droit à plan de travail rectangulaire, pour un poste individuel", "epuise": false, "accueil": false, "image": "/assets/photos/bd-madrid-1.jpg", "galerie": ["/assets/photos/bd-madrid-2.jpg"]},
  {"id": "bd-kyo", "ref": "", "cat": "bureaux", "nom": "Bureau droit Kyo", "prix": null, "dims": "", "desc": "Bureau droit à plan de travail rectangulaire, pour un poste individuel", "epuise": false, "accueil": false, "image": "/assets/photos/bd-kyo-1.jpg", "galerie": ["/assets/photos/bd-kyo-2.jpg"]},
  {"id": "bd-tokyo", "ref": "", "cat": "bureaux", "nom": "Bureau droit Tokyo", "prix": null, "dims": "", "desc": "Bureau droit à plan de travail rectangulaire, pour un poste individuel", "epuise": false, "accueil": false, "image": "/assets/photos/bd-tokyo-1.jpg", "galerie": ["/assets/photos/bd-tokyo-2.jpg"]},
  {"id": "ba-individuel", "ref": "", "cat": "bureaux", "nom": "Bureau d'angle en L individuel", "prix": null, "dims": "", "desc": "Bureau avec retour en L pour un poste, plus de surface de travail, retour à gauche ou à droite", "epuise": false, "accueil": false, "image": "/assets/photos/ba-individuel-1.jpg", "galerie": ["/assets/photos/ba-individuel-2.jpg"]},
  {"id": "ba-deux-places", "ref": "", "cat": "bureaux", "nom": "Bureau d'angle en L deux places", "prix": null, "dims": "", "desc": "Bureau d'angle en L pour deux postes de travail, retour à gauche ou à droite", "epuise": false, "accueil": false, "image": "/assets/photos/ba-deux-places-1.jpg", "galerie": ["/assets/photos/ba-deux-places-2.jpg"]},
  {"id": "bb-2", "ref": "BB-2", "cat": "bureaux", "nom": "Bureau bench open space 2 places", "prix": null, "dims": "", "desc": "Deux postes de travail face à face sur piètement commun, pour les open spaces", "epuise": false, "accueil": false, "image": "/assets/photos/bb-2-1.jpg", "galerie": ["/assets/photos/bb-2-2.jpg", "/assets/photos/bb-2-3.jpg", "/assets/photos/bb-2-4.jpg", "/assets/photos/bb-2-5.jpg"]},
  {"id": "bb-4", "ref": "BB-4", "cat": "bureaux", "nom": "Bureau bench open space 4 places", "prix": null, "dims": "", "desc": "Quatre postes de travail face à face sur piètement commun, pour les open spaces", "epuise": false, "accueil": false, "image": "/assets/photos/bb-4-1.jpg", "galerie": ["/assets/photos/bb-4-2.jpg"]},
  {"id": "bb-6", "ref": "BB-6", "cat": "bureaux", "nom": "Bureau bench open space 6 places", "prix": null, "dims": "", "desc": "Six postes de travail face à face sur piètement commun, pour les open spaces", "epuise": false, "accueil": false, "image": "/assets/photos/bb-6-1.jpg"},
  {"id": "accueil-oslo", "ref": "", "cat": "presentoirs", "nom": "Bureau d'accueil Oslo", "prix": null, "dims": "", "desc": "Banque d'accueil avec comptoir surélevé et plan de travail, pour halls et réceptions", "epuise": false, "accueil": false, "variantes": [{"ref": "", "dims": "120 cm", "prix": null}, {"ref": "", "dims": "140 cm", "prix": null}, {"ref": "", "dims": "160 cm", "prix": null}], "image": "/assets/photos/accueil-oslo-1.jpg", "galerie": ["/assets/photos/accueil-oslo-2.jpg"]},
  {"id": "accueil-milano", "ref": "", "cat": "presentoirs", "nom": "Bureau d'accueil Milano", "prix": null, "dims": "", "desc": "Banque d'accueil avec comptoir surélevé et plan de travail, pour halls et réceptions", "epuise": false, "accueil": false, "variantes": [{"ref": "", "dims": "120 cm", "prix": null}, {"ref": "", "dims": "140 cm", "prix": null}, {"ref": "", "dims": "160 cm", "prix": null}], "image": "/assets/photos/accueil-milano-1.jpg"},
  {"id": "accueil-dubai", "ref": "", "cat": "presentoirs", "nom": "Bureau d'accueil Dubaï", "prix": null, "dims": "", "desc": "Banque d'accueil avec comptoir surélevé et plan de travail, pour halls et réceptions", "epuise": false, "accueil": false, "variantes": [{"ref": "", "dims": "120 cm", "prix": null}, {"ref": "", "dims": "140 cm", "prix": null}, {"ref": "", "dims": "160 cm", "prix": null}], "image": "/assets/photos/accueil-dubai-1.jpg", "galerie": ["/assets/photos/accueil-dubai-2.jpg"]},
  {"id": "accueil-lisboa", "ref": "", "cat": "presentoirs", "nom": "Bureau d'accueil Lisboa", "prix": null, "dims": "", "desc": "Banque d'accueil avec comptoir surélevé et plan de travail, pour halls et réceptions", "epuise": false, "accueil": false, "variantes": [{"ref": "", "dims": "120 cm", "prix": null}, {"ref": "", "dims": "140 cm", "prix": null}, {"ref": "", "dims": "160 cm", "prix": null}], "image": "/assets/photos/accueil-lisboa-1.jpg"},
  {"id": "accueil-vienna", "ref": "", "cat": "presentoirs", "nom": "Bureau d'accueil Vienna", "prix": null, "dims": "", "desc": "Banque d'accueil avec comptoir surélevé et plan de travail, pour halls et réceptions", "epuise": false, "accueil": false, "variantes": [{"ref": "", "dims": "120 cm", "prix": null}, {"ref": "", "dims": "140 cm", "prix": null}, {"ref": "", "dims": "160 cm", "prix": null}], "image": "/assets/photos/accueil-vienna-1.jpg"},
  {"id": "c1283", "ref": "C1283", "cat": "fauteuils-bureau", "nom": "Fauteuil de bureau dossier bas", "prix": 1590, "dims": "", "desc": "Simili cuir noir rembourré, piètement chromé à 5 branches avec roulettes", "epuise": true, "accueil": true, "image": null},
  {"id": "c1281", "ref": "C1281", "cat": "ensembles-fauteuils", "nom": "Pack fauteuil de bureau en simili", "prix": 4990, "dims": "", "desc": "", "epuise": false, "accueil": true, "image": null},
  {"id": "c1280", "ref": "C1280", "cat": "tables-reunion", "nom": "Table de réunion Xona 2m40", "prix": 4990, "dims": "Longueur 2,40 m", "desc": "Forme rectangulaire, piètement plein, passe-câbles, panneau dérivé du bois mélaminé", "epuise": true, "accueil": true, "image": null},
  {"id": "c1279", "ref": "C1279", "cat": "bureaux-direction", "nom": "Bureau de direction Elegant", "prix": 4290, "dims": "", "desc": "", "epuise": false, "accueil": true, "image": "/assets/photos/c1279-1.jpg"},
  {"id": "c1267", "ref": "C1267", "cat": "tables-scolaires", "nom": "Table scolaire 2 places, structure métallique", "prix": 1190, "dims": "", "desc": "Modèle destiné aux classes et centres de formation", "epuise": false, "accueil": true, "image": null},
  {"id": "c1266", "ref": "C1266", "cat": "tables-scolaires", "nom": "Table scolaire 1 place", "prix": 790, "dims": "", "desc": "Modèle individuel et compact", "epuise": false, "accueil": false, "image": null},
  {"id": "c1258", "ref": "C1258", "cat": "ensembles-fauteuils", "nom": "Pack fauteuil de direction en simili cuir", "prix": 13900, "dims": "", "desc": "Pack de trois fauteuils : deux fauteuils et un fauteuil haut avec appui-tête, simili cuir, mousse et base métallique", "epuise": true, "accueil": false, "image": null},
  {"id": "b2417", "ref": "B2417", "cat": "bureaux-direction", "nom": "Bureau de direction Picasos", "prix": 4390, "dims": "", "desc": "Bureau en bois avec retour, plateau et deux pieds de 38 mm, profondeur indiquée 800 mm", "epuise": false, "accueil": false, "image": "/assets/photos/b2417-1.jpg"},
  {"id": "b1055", "ref": "B1055", "cat": "bureaux-direction", "nom": "Bureau de direction Panama", "prix": 4890, "dims": "", "desc": "Bureau en bois avec retour sur meuble fixe, plateau et piètement de 38 mm, profondeur indiquée 800 mm", "epuise": false, "accueil": false, "image": null},
  {"id": "b2504", "ref": "B2504", "cat": "bureaux-direction", "nom": "Bureau de direction Cortinal", "prix": 5400, "dims": "", "desc": "Plateau mélaminé de 60 mm, chants ABS antichoc 2 mm", "epuise": false, "accueil": false, "image": "/assets/photos/b2504-1.jpg"},
  {"id": "b3989", "ref": "B3989", "cat": "bureaux-direction", "nom": "Bureau de direction Noblesse", "prix": 9200, "dims": "Environ 220 × 120 cm selon la fiche", "desc": "Dimensions présentées comme approximatives sur la fiche", "epuise": false, "accueil": false, "image": "/assets/photos/b3989-1.jpg"},
  {"id": "b3270", "ref": "B3270", "cat": "bureaux-direction", "nom": "Bureau de direction Boss", "prix": 7390, "dims": "2000 mm de longueur", "desc": "Bureau en bois avec retour et caisson mobile", "epuise": false, "accueil": false, "image": "/assets/photos/b3270-1.jpg", "galerie": ["/assets/photos/b3270-2.jpg"]},
  {"id": "b2028", "ref": "B2028", "cat": "bureaux-direction", "nom": "Bureau de direction Moscou", "prix": 2900, "dims": "", "desc": "Bureau de direction avec piètement bois et retour sur caisson fixe", "epuise": false, "accueil": false, "image": "/assets/photos/b2028-1.jpg"},
  {"id": "b4237", "ref": "B4237", "cat": "bureaux-direction", "nom": "Bureau de direction Winy", "prix": 4990, "dims": "160 × 80 × 75 cm", "desc": "", "epuise": false, "accueil": false, "image": "/assets/photos/b4237-1.jpg"},
  {"id": "b2651", "ref": "B2651", "cat": "bureaux-direction", "nom": "Bureau de direction Thales", "prix": 6990, "dims": "Bureau 200 cm, retour 120 × 40 × 75 cm", "desc": "Bureau en bois MDF avec retour mobile sur roulettes", "epuise": false, "accueil": false, "image": "/assets/photos/b2651-1.jpg", "galerie": ["/assets/photos/b2651-2.jpg"]},
  {"id": "c1254", "ref": "C1254", "cat": "fauteuils-direction", "nom": "Fauteuil de direction en simili cuir Liona", "prix": 1990, "dims": "", "desc": "Dossier haut enveloppant, assise et dossier rembourrés", "epuise": false, "accueil": false, "image": null},
  {"id": "230a", "ref": "230A", "cat": "fauteuils-direction", "nom": "Fauteuil de direction en simili cuir", "prix": 2590, "dims": "", "desc": "", "epuise": false, "accueil": false, "image": null},
  {"id": "es-516", "ref": "ES 516", "cat": "fauteuils-bureau", "nom": "Fauteuil en mesh", "prix": 1490, "dims": "", "desc": "", "epuise": false, "accueil": false, "image": null},
  {"id": "c1127", "ref": "C1127", "cat": "fauteuils-direction", "nom": "Fauteuil de direction 616A", "prix": 2190, "dims": "", "desc": "Simili cuir", "epuise": false, "accueil": false, "image": null},
  {"id": "c1024", "ref": "C1024", "cat": "fauteuils-direction", "nom": "Fauteuil de direction Alpy", "prix": 1290, "dims": "", "desc": "Mesh, accoudoirs fixes, piètement PVC", "epuise": false, "accueil": false, "image": null},
  {"id": "c1225", "ref": "C1225", "cat": "tables-reunion", "nom": "Table de réunion Atria", "prix": 6499, "dims": "", "desc": "Table rectangulaire à deux pieds panneaux, plateau en MDF plaqué bois, finition noyer, épaisseur indiquée 40 mm", "epuise": false, "accueil": false, "image": null},
  {"id": "c1156", "ref": "C1156", "cat": "tables-reunion", "nom": "Table de réunion Ovrale", "prix": 10990, "dims": "", "desc": "Table de réunion professionnelle", "epuise": false, "accueil": false, "image": null},
  {"id": "c1028", "ref": "C1028", "cat": "tables-reunion", "nom": "Table de réunion Amiral", "prix": 2390, "dims": "", "desc": "Table de réunion professionnelle", "epuise": false, "accueil": false, "image": null},
  {"id": "a0511", "ref": "A0511", "cat": "armoires-metal", "nom": "Classeur métallique pour dossiers suspendus", "prix": 2400, "dims": "", "desc": "Tôle d'acier 8/10e, finition époxy, tiroirs extractibles", "epuise": false, "accueil": false, "image": "/assets/photos/a0511-1.jpg", "galerie": ["/assets/photos/a0511-2.jpg", "/assets/photos/a0511-3.jpg", "/assets/photos/a0511-4.jpg", "/assets/photos/a0511-5.jpg"]},
  {"id": "b1985", "ref": "B1985", "cat": "meubles-rangement", "nom": "Caisson métallique 3 tiroirs", "prix": 1090, "dims": "", "desc": "Structure métallique monobloc, verrouillage centralisé, 4 roulettes, peinture époxy", "epuise": false, "accueil": false, "image": null},
  {"id": "a0602", "ref": "A0602", "cat": "armoires-metal", "nom": "Armoire basse métallique à 2 portes rideau", "prix": 2590, "dims": "", "desc": "Structure acier, peinture époxy, rideaux à lamelles PVC", "epuise": false, "accueil": false, "image": "/assets/photos/a0602-1.jpg", "galerie": ["/assets/photos/a0602-2.jpg"]},
  {"id": "armoire-metallique-2-portes", "ref": "", "cat": "armoires-metal", "nom": "Armoire métallique haute 2 portes", "prix": null, "dims": "", "desc": "Armoire à deux portes battantes avec serrure à clé, étagères intérieures pour dossiers et classeurs", "epuise": false, "accueil": false, "image": "/assets/photos/armoire-metallique-2-portes-1.jpg", "galerie": ["/assets/photos/armoire-metallique-2-portes-2.jpg", "/assets/photos/armoire-metallique-2-portes-3.jpg", "/assets/photos/armoire-metallique-2-portes-4.jpg", "/assets/photos/armoire-metallique-2-portes-5.jpg"]},
  {"id": "a0489", "ref": "A0489", "cat": "rayonnages-metalliques", "nom": "Rayonnage métallique à 5 tablettes", "prix": 850, "dims": "", "desc": "4 cornières en tôle 15/10e, 5 tablettes renforcées", "epuise": false, "accueil": false, "image": "/assets/photos/a0489-1.jpg", "galerie": ["/assets/photos/a0489-2.jpg", "/assets/photos/a0489-3.jpg", "/assets/photos/a0489-4.jpg"]},
  {"id": "b1867", "ref": "B1867", "cat": "rayonnages-metalliques", "nom": "Rayonnage métallique", "prix": 1690, "dims": "198 × 95 × 33 cm", "desc": "5 tablettes réglables", "epuise": false, "accueil": false, "image": null},
  {"id": "vestiaire-1-porte", "ref": "", "cat": "vestiaires-metalliques", "nom": "Casier vestiaire métallique 1 porte", "prix": null, "dims": "", "desc": "Casier individuel une porte en tôle d'acier, avec aérations et fermeture", "epuise": false, "accueil": false, "image": "/assets/photos/vestiaire-1-porte-1.jpg", "galerie": ["/assets/photos/vestiaire-1-porte-2.jpg", "/assets/photos/vestiaire-1-porte-3.jpg", "/assets/photos/vestiaire-1-porte-4.jpg"]},
  {"id": "b1977", "ref": "B1977", "cat": "vestiaires-metalliques", "nom": "Casier vestiaire métallique 2 portes", "prix": 990, "dims": "", "desc": "Deux casiers superposés, portes avec fermeture par cadenas", "epuise": false, "accueil": false, "image": "/assets/photos/b1977-1.jpg", "galerie": ["/assets/photos/b1977-2.jpg"]},
  {"id": "b1869", "ref": "B1869", "cat": "vestiaires-metalliques", "nom": "Casier vestiaire métallique 3 portes", "prix": 1090, "dims": "", "desc": "Trois casiers, structure en tôle d'acier 7/10e", "epuise": false, "accueil": false, "image": "/assets/photos/b1869-1.jpg", "galerie": ["/assets/photos/b1869-2.jpg"]},
  {"id": "b1870", "ref": "B1870", "cat": "vestiaires-metalliques", "nom": "Casier vestiaire métallique 4 portes", "prix": 1190, "dims": "190 × 30 × 42,5 cm", "desc": "Construction soudée monobloc, tôle 7/10 mm", "epuise": false, "accueil": false, "image": "/assets/photos/b1870-1.jpg", "galerie": ["/assets/photos/b1870-2.jpg", "/assets/photos/b1870-3.jpg", "/assets/photos/b1870-4.jpg"]},
  {"id": "vestiaire-9-portes", "ref": "", "cat": "vestiaires-metalliques", "nom": "Vestiaire métallique 9 portes", "prix": null, "dims": "", "desc": "Neuf casiers individuels sur trois colonnes, portes avec serrure et aérations. Disponible en blanc ou en gris", "epuise": false, "accueil": false, "image": "/assets/photos/vestiaire-9-portes-1.jpg", "galerie": ["/assets/photos/vestiaire-9-portes-2.jpg", "/assets/photos/vestiaire-9-portes-3.jpg"]},
  {"id": "vestiaire-multicases-2", "ref": "", "cat": "vestiaires-metalliques", "nom": "Vestiaire multicases 2 cases", "prix": null, "dims": "", "desc": "Vestiaire métallique à deux cases fermant à clé, pour ranger les effets personnels", "epuise": false, "accueil": false, "image": "/assets/photos/vestiaire-multicases-2-1.jpg"},
  {"id": "vestiaire-en-z", "ref": "", "cat": "vestiaires-metalliques", "nom": "Vestiaire métallique en Z", "prix": null, "dims": "", "desc": "Deux casiers imbriqués en Z dans une seule colonne, avec penderie, pour deux utilisateurs dans un espace réduit", "epuise": false, "accueil": false, "image": "/assets/photos/vestiaire-en-z-1.jpg", "galerie": ["/assets/photos/vestiaire-en-z-2.jpg", "/assets/photos/vestiaire-en-z-3.jpg"]},
  {"id": "b1886", "ref": "B1886", "cat": "tables-scolaires", "nom": "Table scolaire individuelle sans casier", "prix": 350, "dims": "", "desc": "Structure métallique, plateau mélaminé 19 mm", "epuise": false, "accueil": false, "image": null},
  {"id": "b2207", "ref": "B2207", "cat": "tables-scolaires", "nom": "Table scolaire individuelle avec casier", "prix": 390, "dims": "Plateaux disponibles : 60 × 40, 70 × 50 ou 80 × 60 cm", "desc": "Plusieurs hauteurs proposées", "epuise": false, "accueil": false, "image": null},
  {"id": "b1883", "ref": "B1883", "cat": "tables-scolaires", "nom": "Table scolaire biplace sans casier", "prix": 540, "dims": "120 × 45 × 73 cm", "desc": "", "epuise": false, "accueil": false, "image": null},
  {"id": "b1891", "ref": "B1891", "cat": "tables-scolaires", "nom": "Table scolaire biplace avec casier", "prix": 590, "dims": "120 × 45 × 73 cm", "desc": "", "epuise": false, "accueil": false, "image": null},
  {"id": "b2206", "ref": "B2206", "cat": "tables-scolaires", "nom": "Table écolier deux places", "prix": 850, "dims": "120 × 45 × 73 cm", "desc": "Plateau en bois stratifié, pieds en métal", "epuise": false, "accueil": false, "image": null},
  {"id": "b3678", "ref": "B3678", "cat": "tableaux-scolaires", "nom": "Tableau blanc magnétique double face", "prix": 600, "dims": "", "desc": "Acier émaillé magnétique, surface pour marqueur effaçable, encadrement aluminium", "epuise": false, "accueil": false, "image": null},
  {"id": "a0503", "ref": "A0503", "cat": "tableaux-scolaires", "nom": "Tableau blanc aimant magnétique", "prix": 390, "dims": "", "desc": "Acier émaillé magnétique, surface effaçable à sec, encadrement aluminium", "epuise": false, "accueil": false, "image": null},
  {"id": "a0504", "ref": "A0504", "cat": "tableaux-scolaires", "nom": "Tableau d'affichage en liège", "prix": 199, "dims": "", "desc": "Panneau de particules avec fond liège pour punaises et épingles", "epuise": false, "accueil": false, "image": null},
  {"id": "a0519", "ref": "A0519", "cat": "meubles-rangement", "nom": "Armoire bibliothèque en bois", "prix": 2490, "dims": "180 × 80 × 45 cm", "desc": "Panneaux de particules mélaminés 18 mm", "epuise": false, "accueil": false, "image": null},
  {"id": "a0593", "ref": "A0593", "cat": "meubles-rangement", "nom": "Armoire de bureau en bois avec 4 étagères", "prix": 2490, "dims": "", "desc": "Armoire à portes battantes", "epuise": false, "accueil": false, "image": null},
  {"id": "a0548", "ref": "A0548", "cat": "meubles-rangement", "nom": "Armoire de bureau en bois", "prix": 1490, "dims": "", "desc": "Panneaux mélaminés 18 mm, poignée métal, fermeture à clé", "epuise": false, "accueil": false, "image": null}
];
/* ============================================================
   Dessins indicatifs (remplacés automatiquement par les photos)
   ============================================================ */
const R=(x,y,w,h,c='d-l',rx=0)=>`<rect class="${c}" x="${x}" y="${y}" width="${w}" height="${h}"${rx?` rx="${rx}"`:''} pathLength="1"/>`;
const Ln=(x1,y1,x2,y2,c='d-n')=>`<line class="${c}" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" pathLength="1"/>`;
const Pa=(d,c='d-l')=>`<path class="${c}" d="${d}" pathLength="1"/>`;
const Ci=(cx,cy,r,c='d-l')=>`<circle class="${c}" cx="${cx}" cy="${cy}" r="${r}" pathLength="1"/>`;
const GROUND='<line class="d-g" x1="24" y1="252" x2="376" y2="252"/>';
const drawers=(x,y,w,hs,c='d-l')=>{let s='',yy=y;hs.forEach(h=>{s+=R(x,yy,w,h,c,2)+R(x+w/2-11,yy+Math.min(12,h/2-1.5),22,3,'d-h',1.5);yy+=h+4;});return s;};
const plinth=(x,w)=>R(x,246,w,6,'d-h',1);
const BODY={
  desk(){return R(84,140,150,40,'d-a')+R(60,128,280,12,'d-w',2)+R(72,140,12,112,'d-w')+R(232,140,96,112,'d-l',2)+drawers(240,148,80,[30,30,36]);},
  direction(){return R(62,134,152,62,'d-a')+R(34,118,300,16,'d-w',2)+R(44,134,18,118,'d-w')+R(214,134,110,118,'d-l',2)+drawers(222,142,94,[30,30,38])+R(334,148,46,10,'d-w',2)+R(370,158,10,94,'d-w');},
  chair(){return R(158,52,84,92,'d-a',18)+R(196,144,8,18,'d-h')+Pa('M146 168 L138 168 L138 130 L160 130','d-n')+Pa('M254 168 L262 168 L262 130 L240 130','d-n')+R(144,158,112,20,'d-l',10)+R(195,178,10,42,'d-l',2)+Pa('M200 222 L128 242 M200 222 L272 242 M200 222 L164 246 M200 222 L236 246','d-n')+Ci(128,245,5)+Ci(272,245,5)+Ci(164,247,4)+Ci(236,247,4);},
  exec(){return R(154,20,92,130,'d-a',26)+Ln(166,52,234,52)+Ln(170,104,230,104)+R(196,150,8,10,'d-h')+R(124,140,22,9,'d-l',4)+R(254,140,22,9,'d-l',4)+Pa('M135 149 L135 166 M265 149 L265 166','d-n')+R(140,158,120,22,'d-l',11)+R(195,180,10,40,'d-l',2)+Pa('M200 222 L128 242 M200 222 L272 242 M200 222 L164 246 M200 222 L236 246','d-n')+Ci(128,245,5)+Ci(272,245,5)+Ci(164,247,4)+Ci(236,247,4);},
  pack(){return `<g transform="translate(14 36) scale(.82)">${BODY.exec()}</g><g transform="translate(150 54) scale(.76)">${BODY.exec()}</g><g transform="translate(-58 54) scale(.76)">${BODY.exec()}</g>`;},
  meeting(){return R(98,86,58,62,'d-a',14)+R(244,86,58,62,'d-a',14)+R(171,94,58,54,'d-a',14)+R(24,142,352,14,'d-w',3)+Pa('M66 156 L88 156 L98 252 L56 252 Z','d-w')+Pa('M334 156 L312 156 L302 252 L344 252 Z','d-w')+R(98,156,204,10,'d-l',2);},
  cabinet(){return R(128,34,144,212,'d-l',3)+R(134,40,64,200,'d-l',2)+R(202,40,64,200,'d-l',2)+[0,1,2].map(i=>Ln(146,58+i*8,186,58+i*8)+Ln(214,58+i*8,254,58+i*8)).join('')+R(150,92,32,14,'d-a',2)+R(218,92,32,14,'d-a',2)+R(189,128,4,30,'d-h',2)+R(207,128,4,30,'d-h',2)+Ci(200,118,3,'d-r')+plinth(124,152);},
  tambour(){let s=R(70,132,260,114,'d-l',3)+R(80,140,240,100,'d-l',2);for(let y=148;y<236;y+=8)s+=Ln(84,y,316,y);return s+Ln(200,140,200,240)+R(186,160,4,24,'d-h',2)+R(210,160,4,24,'d-h',2)+Ci(200,150,3,'d-r')+plinth(66,268);},
  caisson(){return R(146,108,108,132,'d-l',3)+drawers(154,116,92,[28,28,52])+Ci(240,112,2.5,'d-r')+Ci(158,246,6)+Ci(242,246,6);},
  classeur(){return R(146,40,108,206,'d-l',3)+drawers(154,48,92,[44,44,44,44])+[0,1,2,3].map(i=>R(186,56+i*48,28,8,'d-a',1)).join('')+plinth(142,116);},
  bookcase(){let s=R(122,34,156,212,'d-w',3)+R(130,42,140,196,'d-l',1);const shelves=[42,91,140,189];shelves.forEach((y,r)=>{if(r)s+=Ln(130,y,270,y);let x=138,i=r*3;while(x<258){const w=10+((i*7)%12),h=30+((i*11)%14);if(x+w>262)break;s+=R(x,y+46-h,w,h,i%3?'d-a':'d-w',1);x+=w+3+((i*5)%9===0?14:0);i++;}});return s+plinth(118,164);},
  wardrobe(){return R(126,36,148,210,'d-w',3)+R(132,42,66,198,'d-w',2)+R(202,42,66,198,'d-w',2)+R(142,54,46,70,'d-l',2)+R(142,132,46,96,'d-l',2)+R(212,54,46,70,'d-l',2)+R(212,132,46,96,'d-l',2)+R(190,128,4,24,'d-h',2)+R(206,128,4,24,'d-h',2)+plinth(122,156);},
  shelving(){const x0=82,W=236;let s='';const ys=[64,110,156,202,244];ys.forEach((y,r)=>{if(r===0)return;let x=x0+14,i=r*2;const gap=y-ys[r-1]-8;while(true){const bw=22+((i*17)%26),bh=Math.min(18+((i*11)%22),gap);if(x+bw>x0+W-14)break;s+=R(x,y-bh,bw,bh,['d-a','d-l','d-w'][i%3],2);x+=bw+6;i++;}});ys.forEach(y=>{s+=R(x0,y,W,5,'d-l',1);});s+=R(x0-6,48,7,204,'d-l',1)+R(x0+W-1,48,7,204,'d-l',1);return s;},
  lockers(n){n=Math.max(1,Math.min(4,n||3));const cw=n>3?56:64,tw=n*cw,x0=200-tw/2;let s=R(x0,36,tw,210,'d-l',3);for(let i=0;i<n;i++){const x=x0+i*cw;s+=R(x+5,42,cw-10,198,'d-l',2)+[0,1,2,3].map(j=>Ln(x+16,56+j*7,x+cw-16,56+j*7)).join('')+R(x+cw/2-10,92,20,10,'d-a',2)+Ci(x+cw-17,150,3.5,'d-r')+[0,1].map(j=>Ln(x+16,218+j*7,x+cw-16,218+j*7)).join('');}return s+plinth(x0-4,tw+8);},
  school(o){const w=o.seats>1?248:156,x0=200-w/2;let s='';s+=R(x0,146,w,12,'d-w',2);if(o.casier)s+=R(x0+14,158,w-28,24,'d-l',2);s+=Pa(`M${x0+16} 158 L${x0+8} 250 M${x0+w-16} 158 L${x0+w-8} 250`,'d-n')+Ln(x0+12,222,x0+w-12,222)+R(x0+2,248,14,4,'d-h',1)+R(x0+w-16,248,14,4,'d-h',1);return s;},
  board(o){let s=R(66,48,268,164,'d-l',5)+R(76,58,248,144,'d-b',2)+Pa('M104 172 L146 126 L184 146 L234 96 L290 114','d-s')+Ci(146,126,4,'d-r')+Ci(234,96,4,'d-r')+Ln(104,88,170,88)+Ln(104,100,150,100)+R(150,212,100,6,'d-h',2);if(o.stand)s+=Pa('M118 218 L102 246 M282 218 L298 246','d-n')+Ln(80,246,124,246)+Ln(276,246,320,246)+Ci(84,249,3.5)+Ci(120,249,3.5)+Ci(280,249,3.5)+Ci(316,249,3.5);return s;},
  cork(){return R(72,52,256,176,'d-w',5)+R(82,62,236,156,'d-k',2)+R(104,84,56,44,'d-b',1)+R(176,100,62,48,'d-a',1)+R(252,80,44,60,'d-b',1)+R(118,150,70,44,'d-a',1)+R(214,162,58,40,'d-b',1)+[[132,88],[207,104],[274,84],[153,154],[243,166]].map(p=>Ci(p[0],p[1],4,'d-r')).join('');},
  accueil(){return R(92,150,216,10,'d-w',2)+R(100,160,200,92,'d-l',2)+R(62,108,276,10,'d-w',2)+R(70,118,260,134,'d-l',3)+R(70,196,260,8,'d-a',1)+Ln(200,130,200,184)+plinth(66,268);},
  mark(){return Pa('M140 236 V130 A60 60 0 0 1 260 130 V236 H234 V132 A34 34 0 0 0 166 132 V236 Z','d-a')+Pa('M166 236 V132 A34 34 0 0 1 234 132 V236 Z','d-l');}
};
function drawingKey(p){
  const n=norm((p.nom||'')+' '+(p.desc||''));
  if(p.art){ const [t,v]=p.art; return t==='bureau'?(v?'direction':'desk'):t==='chaise'?'chair':t==='rayonnage'?'shelving':t==='metal'?(v?'tambour':'cabinet'):t==='bois'?'wardrobe':t==='vestiaire'?(v?'lockers2':'lockers3'):'mark'; }
  switch(p.cat){
    case 'bureaux': return 'desk';
    case 'bureaux-direction': return 'direction';
    case 'fauteuils-bureau': return /dossier bas|mesh/.test(n)?'chair':'exec';
    case 'fauteuils-direction': return 'exec';
    case 'ensembles-fauteuils': return 'pack';
    case 'tables-reunion': return 'meeting';
    case 'armoires-metal': return /rideau/.test(n)?'tambour':'cabinet';
    case 'meubles-rangement': return /caisson/.test(n)?'caisson':/classeur/.test(n)?'classeur':/biblioth|etageres/.test(n)?'bookcase':'wardrobe';
    case 'rayonnages-metalliques': return 'shelving';
    case 'vestiaires-metalliques': { const m=n.match(/(\d)\s*(?:portes?|cases?)/); return 'lockers'+(m?m[1]:'3'); }
    case 'tables-scolaires': { const two=/2 places|biplace|deux places/.test(n), cas=/avec casier/.test(n); return 'school'+(two?'2':'1')+(cas?'c':''); }
    case 'tableaux-scolaires': return /liege/.test(n)?'cork':/double face/.test(n)?'boardStand':'board';
    case 'presentoirs': return 'accueil';
  }
  return 'mark';
}
function drawingInner(key){
  if(key.startsWith('lockers')) return GROUND+BODY.lockers(parseInt(key.slice(7),10));
  if(key.startsWith('school')) return GROUND+BODY.school({seats:key[6]==='2'?2:1,casier:key.endsWith('c')});
  if(key==='boardStand') return GROUND+BODY.board({stand:true});
  if(key==='board') return BODY.board({});
  if(key==='cork') return BODY.cork();
  if(key==='mark') return BODY.mark();
  return GROUND+(BODY[key]||BODY.mark)();
}
const drawingSvg=key=>`<svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid meet" aria-hidden="true" focusable="false">${drawingInner(key)}</svg>`;
function heroSvg(){
  return `<svg viewBox="0 0 640 480" role="img" aria-label="Dessin d’un poste de travail Mobidar : rayonnage, bureau de direction, fauteuil et armoire métallique." preserveAspectRatio="xMidYMid meet">
  <path class="d-chev" d="M150 404 V214 A170 170 0 0 1 490 214 V404 H446 V218 A126 126 0 0 0 194 218 V404 Z"/>
  <path class="d-chev2" d="M194 404 V218 A126 126 0 0 1 446 218 V404"/>
  <line class="d-g" x1="30" y1="404" x2="610" y2="404"/>
  <g transform="translate(-20 150) scale(.85)">${BODY.shelving()}</g>
  <g transform="translate(400 152) scale(.85)">${BODY.cabinet()}</g>
  <g transform="translate(130 136) scale(1.05)">${BODY.direction()}</g>
  <g transform="translate(150 200) scale(.68)">${BODY.exec()}</g>
  </svg>`;
}
function visual(p,tag){
  if(p.photo) return `<img src="${esc(photoSrc(p.photo))}" alt="${esc(p.nom||'')}" loading="lazy">`;
  if(p.image) return `<img src="${esc(p.image)}" alt="${esc(p.nom)}" loading="lazy">`;
  return drawingSvg(drawingKey(p))+(tag?'<span class="tag">Dessin indicatif</span>':'');
}
const hasPhoto=p=>!!(p.photo||p.image);

/* ============================================================
   Logique du site
   ============================================================ */
const $ = (s,r=document)=>r.querySelector(s);
const esc = s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const norm = s=>String(s).normalize('NFD').replace(/[̀-ͯ]/g,'').toLowerCase();
/*BAKED-START*/
const BAKED = { ovr:{}, photos:{}, reglages:null };
const PUBLIC_MODE = true;
/*BAKED-END*/
const PHOTOS = BAKED.photos;
const photoSrc = id=>PHOTOS[id]||('/_blob/'+id);
if(BAKED.reglages){
  const g=BAKED.reglages;
  if(g.contact) ['adresse','telephone','email','whatsapp','horaires'].forEach(k=>{ if(typeof g.contact[k]==='string') SITE.contact[k]=g.contact[k]; });
  if(Array.isArray(g.reseaux)) SITE.reseaux=g.reseaux.filter(r=>r&&typeof r.nom==='string').map(r=>({nom:r.nom,url:typeof r.url==='string'?r.url:''}));
}
let PRODUITS = PRODUITS_BASE, CATS = CATEGORIES.slice(), VIS = [], CATS_VIS = [], SELECTION = [], OVR = BAKED.ovr;
const catOf = id=>CATS.find(c=>c.id===id);
const prodOf = id=>PRODUITS.find(p=>p.id===id);
const hasVar = p=>!!(p&&Array.isArray(p.variantes)&&p.variantes.length);
/* Article du panier : « id » pour un produit simple, « id~n » pour la dimension n d'un produit à variantes. */
const cartKey = (p,i)=>hasVar(p)?p.id+'~'+(i||0):p.id;
function itemOf(key){
  const [pid,vi]=String(key).split('~'), p=prodOf(pid); if(!p) return null;
  if(vi===undefined) return hasVar(p)?null:p;
  const v=hasVar(p)&&p.variantes[+vi]; if(!v) return null;
  return Object.assign({},p,{id:key,variantes:null,ref:v.ref||p.ref,dims:v.dims||'',prix:typeof v.prix==='number'?v.prix:null,prixAvant:typeof v.prixAvant==='number'?v.prixAvant:null,prixMax:null,nom:p.nom+(v.dims?' — '+v.dims:'')});
}
/* Promotion : prix d'origine supérieur au prix actuel. */
const promoPct = p=>p&&typeof p.prix==='number'&&typeof p.prixAvant==='number'&&p.prixAvant>p.prix?Math.round((1-p.prix/p.prixAvant)*100):0;
const epuise = p=>!!(p&&p.epuise);
const fmtDH = n=>String(n).replace(/\B(?=(\d{3})+(?!\d))/g,' ')+' DH';
/* Les données enregistrées (modifications, nouveaux produits) sont traitées comme non fiables : on ne garde que des champs connus, au bon type. */
function cleanOvr(o){
  const r={};
  ['nom','ref','cat','catNom','dims','desc'].forEach(k=>{ if(typeof o[k]==='string') r[k]=o[k]; });
  if(typeof o.photo==='string') r.photo=/^[A-Za-z0-9_-]{8,64}$/.test(o.photo)?o.photo:'';
  if(o.prix===null||(typeof o.prix==='number'&&isFinite(o.prix)&&o.prix>=0)) r.prix=o.prix;
  ['epuise','accueil','visible'].forEach(k=>{ if(typeof o[k]==='boolean') r[k]=o[k]; });
  if(o.custom===true) r.custom=true;
  if(typeof o.ts==='number') r.ts=o.ts;
  return r;
}
function recompute(){
  const merged=PRODUITS_BASE.map(p=>OVR[p.id]?Object.assign({},p,cleanOvr(OVR[p.id])):p);
  const customs=Object.keys(OVR).filter(id=>OVR[id]&&OVR[id].custom===true&&!PRODUITS_BASE.some(p=>p.id===id))
    .map(id=>Object.assign({id,ref:'',cat:'',nom:'(sans nom)',prix:null,dims:'',desc:'',epuise:false,accueil:false,visible:true,image:null},cleanOvr(OVR[id])))
    .sort((a,b)=>(b.ts||0)-(a.ts||0));
  PRODUITS=customs.concat(merged);
  /* Produits à variantes : prix affiché = plus petit prix des dimensions (tri, filtres, « dès … »). */
  PRODUITS.forEach(p=>{ if(!hasVar(p)) return; const pr=p.variantes.map(v=>v.prix).filter(x=>typeof x==='number'); p.prix=pr.length?Math.min(...pr):null; p.prixMax=pr.length?Math.max(...pr):null;
    const low=p.variantes.find(v=>v.prix===p.prix); p.prixAvant=low&&typeof low.prixAvant==='number'?low.prixAvant:null; });
  CATS=CATEGORIES.slice();
  PRODUITS.forEach(p=>{ if(p.cat&&!CATS.some(c=>c.id===p.cat)) CATS.push({id:p.cat,nom:p.catNom||p.cat}); });
  VIS=PRODUITS.filter(p=>p.visible!==false&&!p.demo&&catOf(p.cat));
  CATS_VIS=CATS.filter(c=>VIS.some(p=>p.cat===c.id));
  SELECTION=VIS.filter(p=>p.accueil&&!epuise(p)).map(p=>p.id);
}
recompute();
/* ---------- Adresses des pages ----------
   ROUTING = 'path' pour le site en ligne (/catalogue/, /produit/…/), 'hash' pour le fichier unique. */
const ROUTING='path', BASE='/', SITE_URL='https://www.mobidar.ma';
const slugify=s=>norm(s).replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,'');
let SLUG={}, SLUG2ID={};
function buildSlugs(){ SLUG={}; SLUG2ID={}; VIS.forEach(p=>{ let sl=slugify(p.nom)+(p.ref?'-'+slugify(p.ref):''); if(!sl||SLUG2ID[sl]) sl+=(sl?'-':'')+slugify(p.id); SLUG[p.id]=sl; SLUG2ID[sl]=p.id; }); }
buildSlugs();
const U={
  home:()=>ROUTING==='hash'?'#/':BASE,
  cat:id=>ROUTING==='hash'?'#/catalogue'+(id&&id!=='tous'?'/'+id:''):BASE+'catalogue/'+(id&&id!=='tous'?id+'/':''),
  prod:p=>ROUTING==='hash'?'#/produit/'+p.id:BASE+'produit/'+(SLUG[p.id]||slugify(p.id))+'/',
  cart:()=>ROUTING==='hash'?'#/panier':BASE+'panier/'
};
/* Textes de présentation des catégories (affichés en tête de chaque catégorie et repris par Google). */
const CAT_INTRO={
  'bureaux':'Bureaux de travail droits, d’angle en L ou en bench open space, pour équiper les postes de vos collaborateurs.',
  'bureaux-direction':'Bureaux de direction en bois, MDF ou mélaminé, avec retour, caisson ou meuble fixe, pour les postes de responsables.',
  'fauteuils-bureau':'Fauteuils de travail pour les postes de bureau, en simili cuir ou en mesh, sur piètement à roulettes.',
  'fauteuils-direction':'Fauteuils de direction à dossier haut, en simili cuir ou en mesh, avec assise et dossier rembourrés.',
  'ensembles-fauteuils':'Packs de fauteuils assortis en simili cuir pour équiper un bureau de direction en une seule commande.',
  'presentoirs':'Bureaux d’accueil et présentoirs pour halls, réceptions et espaces de vente.',
  'tables-reunion':'Tables de réunion rectangulaires pour salles de réunion et bureaux de direction, plateau bois ou mélaminé.',
  'armoires-metal':'Armoires métalliques et classeurs pour dossiers suspendus, en acier peint époxy, pour ranger dossiers et matériel de bureau.',
  'meubles-rangement':'Caissons métalliques et armoires de bureau en bois pour organiser vos archives.',
  'rayonnages-metalliques':'Rayonnages métalliques à tablettes pour archives, réserves et locaux techniques.',
  'vestiaires-metalliques':'Casiers vestiaires métalliques de 1 à 9 portes, vestiaires multicases et vestiaires en Z, en tôle d’acier, pour les locaux du personnel.',
  'tables-scolaires':'Tables scolaires une ou deux places, avec ou sans casier, structure métallique et plateau bois, pour écoles et centres de formation.',
  'tableaux-scolaires':'Tableaux blancs magnétiques et tableaux d’affichage en liège pour salles de classe, de réunion et bureaux.'
};
function catStats(c){ const ps=VIS.filter(p=>p.cat===c.id), pr=ps.map(p=>p.prix).filter(x=>typeof x==='number'); return {n:ps.length,min:pr.length?Math.min(...pr):null,max:pr.length?Math.max(...pr):null}; }
function catIntro(c){
  const st=catStats(c), base=CAT_INTRO[c.id]?esc(CAT_INTRO[c.id])+' ':'';
  const pr=st.min===null?'':st.min===st.max?`, au prix de ${fmtDH(st.min)}`:`, de ${fmtDH(st.min)} à ${fmtDH(st.max)}`;
  return `${base}<strong>${plural(st.n,'modèle')}</strong>${pr}.`;
}
const clip=(t,n=158)=>{ t=t.replace(/\s+/g,' ').trim(); if(t.length<=n) return t; const c=t.slice(0,n-1); return c.slice(0,c.lastIndexOf(' '))+'…'; };
const strip=h=>String(h).replace(/<[^>]+>/g,'');
function seoFor(){
  const v=state.view;
  if(v==='product'){ const p=prodOf(state.pid), c=catOf(p.cat), from=hasVar(p)&&p.prixMax>p.prix, price=typeof p.prix==='number'?(from?'dès ':'')+fmtDH(p.prix):'';
    return {title:`${p.nom}${p.ref?' '+p.ref:''}${price?' — '+price:''} | Mobidar`,
      desc:clip(`${p.nom}${p.ref?' (réf. '+p.ref+')':''}${price?(from?' ':' à ')+price:''}${hasVar(p)?', '+plural(p.variantes.length,'dimension')+' au choix':''}, livraison partout au Maroc. ${p.desc?p.desc.replace(/\.?$/,'. '):''}${c.nom} Mobidar : demandez votre devis en ligne.`),
      path:U.prod(p), index:true}; }
  if(v==='catalog'){ const c=state.cat!=='tous'&&catOf(state.cat);
    if(c){ const st=catStats(c); return {title:`${c.nom} au Maroc — ${plural(st.n,'modèle')}${st.min!==null?' dès '+fmtDH(st.min):''} | Mobidar`, desc:clip(`${c.nom} : livraison partout au Maroc. ${strip(catIntro(c))} Devis en ligne chez Mobidar.`), path:U.cat(c.id), index:true}; }
    return {title:`Catalogue mobilier de bureau et scolaire au Maroc — ${plural(VIS.length,'référence')} | Mobidar`, desc:clip(`Catalogue Mobidar : ${plural(VIS.length,'référence')} de bureaux, fauteuils, armoires, rayonnages, vestiaires et mobilier scolaire. Prix en dirhams, livraison partout au Maroc.`), path:U.cat('tous'), index:true}; }
  if(v==='cart') return {title:'Votre panier et demande de devis | Mobidar', desc:'Réunissez vos produits et préparez votre demande de devis Mobidar.', path:U.cart(), index:false};
  if(v==='notfound') return {title:'Page introuvable | Mobidar', desc:'Cette page n’existe pas ou a été déplacée.', path:null, index:false};
  return {title:'Mobidar — Mobilier de bureau et scolaire au Maroc', desc:clip(`Mobidar, mobilier de bureau et scolaire au Maroc. Livraison à Casablanca, Rabat, Marrakech, Tanger, Fès, Agadir et partout au Maroc. Devis en ligne gratuit.`), path:U.home(), index:true};
}
/* Données structurées schema.org (écrites dans chaque page générée). */
function jsonLdFor(){
  const abs=pth=>SITE_URL.replace(/\/$/,'')+pth, org={'@type':'Organization','name':'Mobidar','url':abs('/')};
  const crumbs=items=>({'@context':'https://schema.org','@type':'BreadcrumbList','itemListElement':items.map((it,i)=>({'@type':'ListItem','position':i+1,'name':it[0],'item':abs(it[1])}))});
  const out=[];
  if(state.view==='product'){ const p=prodOf(state.pid), c=catOf(p.cat), d={'@context':'https://schema.org','@type':'Product','name':p.nom,'category':c.nom,'brand':{'@type':'Brand','name':'Mobidar'},'url':abs(U.prod(p))};
    if(p.ref) d.sku=p.ref; if(p.desc) d.description=p.desc;
    const img=p.photo?photoSrc(p.photo):p.image; if(img) d.image=/^https?:/.test(img)?img:abs('/'+img.replace(/^\//,''));
    if(hasVar(p)&&typeof p.prix==='number'&&p.prixMax>p.prix) d.offers={'@type':'AggregateOffer','lowPrice':String(p.prix),'highPrice':String(p.prixMax),'offerCount':String(p.variantes.length),'priceCurrency':'MAD','availability':'https://schema.org/'+(epuise(p)?'OutOfStock':'InStock'),'url':abs(U.prod(p)),'seller':org};
    else if(typeof p.prix==='number') d.offers={'@type':'Offer','price':String(p.prix),'priceCurrency':'MAD','availability':'https://schema.org/'+(epuise(p)?'OutOfStock':'InStock'),'url':abs(U.prod(p)),'seller':org};
    out.push(d, crumbs([['Accueil','/'],['Catalogue',U.cat('tous')],[c.nom,U.cat(c.id)],[p.nom,U.prod(p)]])); }
  else if(state.view==='catalog'){ const c=state.cat!=='tous'&&catOf(state.cat);
    out.push(crumbs(c?[['Accueil','/'],['Catalogue',U.cat('tous')],[c.nom,U.cat(c.id)]]:[['Accueil','/'],['Catalogue',U.cat('tous')]])); }
  else if(state.view==='home'){ const k=SITE.contact, d={'@context':'https://schema.org','@type':k.adresse?'LocalBusiness':'Organization','name':'Mobidar','url':abs('/'),'logo':abs('/assets/logo.jpg'),'image':abs('/assets/og.png'),'slogan':SITE.slogan,'description':'Fabrication, service et aménagement : mobilier de bureau, rangement, vestiaires et mobilier scolaire, avec livraison partout au Maroc.','areaServed':{'@type':'Country','name':'Maroc'}};
    if(k.adresse) d.address={'@type':'PostalAddress','streetAddress':k.adresse,'addressCountry':'MA'};
    if(k.telephone) d.telephone=k.telephone; if(k.email) d.email=k.email;
    const same=SITE.reseaux.map(r=>r.url).filter(u=>/^https?:\/\//.test(u||'')); if(same.length) d.sameAs=same;
    out.push(d, {'@context':'https://schema.org','@type':'WebSite','name':'Mobidar','url':abs('/'),'inLanguage':'fr-MA'}); }
  return out;
}
function applySeo(){
  const s=seoFor(); document.title=s.title;
  const meta=(sel,make)=>{ let m=document.head.querySelector(sel); if(!m){ m=make(); document.head.appendChild(m); } return m; };
  meta('meta[name="description"]',()=>Object.assign(document.createElement('meta'),{name:'description'})).setAttribute('content',s.desc);
  const rob=meta('meta[name="robots"]',()=>Object.assign(document.createElement('meta'),{name:'robots'})); rob.setAttribute('content',s.index?'index, follow':'noindex, follow');
  if(ROUTING==='path'&&s.path){ meta('link[rel="canonical"]',()=>Object.assign(document.createElement('link'),{rel:'canonical'})).setAttribute('href',SITE_URL.replace(/\/$/,'')+s.path); }
}
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
const app = $('#app');
const state = { view:'home', cat:'tous', q:'', pid:null, cart:{}, form:{}, recap:null, errors:{}, sort:'defaut', dispo:false };
let heroDrawn = false;
function loadCart(){ state.cart={}; try{ const raw=JSON.parse(localStorage.getItem('metix-panier')||'{}'); Object.keys(raw).forEach(k=>{ const it=itemOf(k); if(it&&it.visible!==false&&!epuise(it)&&raw[k]>0) state.cart[k]=Math.min(99,raw[k]|0); }); }catch(e){} }
loadCart();
function saveCart(){ try{ localStorage.setItem('metix-panier',JSON.stringify(state.cart)); }catch(e){} }
const cartCount = ()=>Object.values(state.cart).reduce((a,b)=>a+b,0);
const priceOf = p=>typeof p.prix==='number'?(hasVar(p)&&p.prixMax>p.prix?'dès ':'')+fmtDH(p.prix):(p.prix?esc(p.prix):'Prix sur demande');
const priceHtml = p=>priceOf(p)+(promoPct(p)?` <s class="was">${fmtDH(p.prixAvant)}</s>`:'');
const promoFlag = p=>promoPct(p)?`<span class="flag promo">-${promoPct(p)} %</span>`:'';
const todo = label=>PUBLIC_MODE?'':`<span class="todo" title="Champ à renseigner dans la zone SITE du code">À renseigner${label?' : '+esc(label):''}</span>`;
const arrowSvg='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
const icArrow=`<span class="ic">${arrowSvg}</span>`;
const plural=(n,w)=>`${n} ${w}${n>1?'s':''}`;
const sloganHtml=()=>esc(SITE.slogan).replace(/\bforme\b/,'<em>forme</em>');
const catKey=c=>{ const p=VIS.find(x=>x.cat===c.id); return p?drawingKey(p):'mark'; };

let toastTimer;
function toast(msg){ const t=$('#toast'); t.textContent=msg; t.classList.add('show'); clearTimeout(toastTimer); toastTimer=setTimeout(()=>t.classList.remove('show'),2600); }

function card(p){
  const c=catOf(p.cat), out=epuise(p);
  return `<article class="card">
    <a class="plate" href="${U.prod(p)}" data-open="${p.id}" aria-hidden="true" tabindex="-1">${visual(p)}${out?'<span class="flag">Épuisé</span>':promoFlag(p)}</a>
    <div class="body">
      <p class="meta">${esc(c.nom)}${p.ref?' · <span class="num">'+esc(p.ref)+'</span>':''}</p>
      <h3><a href="${U.prod(p)}" data-open="${p.id}">${esc(p.nom)}</a></h3>
      ${p.desc?`<p class="desc">${esc(p.desc)}</p>`:''}
      <p class="price">${priceHtml(p)}</p>
      <div class="actions">
        ${out?'<button type="button" class="btn btn-sm btn-off" disabled>Épuisé</button>':hasVar(p)?`<a class="btn btn-red btn-sm" href="${U.prod(p)}" data-open="${p.id}">Choisir la dimension</a>`:`<button type="button" class="btn btn-red btn-sm" data-add="${p.id}">Ajouter au panier</button>`}
        <a class="btn btn-ghost btn-sm" href="${U.prod(p)}" data-open="${p.id}" aria-label="Voir la fiche : ${esc(p.nom)}">Voir</a>
      </div>
    </div></article>`;
}

const ACTS=[
  {t:'Fabrication',d:'Du mobilier conçu pour les espaces professionnels : bureaux, rangements et vestiaires.',
   i:'<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M6 12h10l8 11 8-11h10L24 38z" fill="var(--blue-soft)" stroke="var(--ink)" stroke-width="1.6" stroke-linejoin="round"/><path d="M16 12l8 11 8-11" fill="none" stroke="var(--red)" stroke-width="1.6" stroke-linejoin="round"/></svg>'},
  {t:'Service',d:'Une équipe à votre écoute pour cerner votre besoin et choisir le mobilier qui convient.',
   i:'<svg viewBox="0 0 48 48" aria-hidden="true"><circle cx="24" cy="24" r="16" fill="var(--blue-soft)" stroke="var(--ink)" stroke-width="1.6"/><path d="M17 24.5l5 5 9-11" fill="none" stroke="var(--red)" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>'},
  {t:'Aménagement',d:'L’organisation et l’équipement de vos bureaux, salles de réunion et espaces de rangement.',
   i:'<svg viewBox="0 0 48 48" aria-hidden="true"><rect x="8" y="8" width="14" height="14" rx="2" fill="var(--blue-soft)" stroke="var(--ink)" stroke-width="1.6"/><rect x="26" y="8" width="14" height="14" rx="2" fill="none" stroke="var(--red)" stroke-width="1.6"/><rect x="8" y="26" width="32" height="14" rx="2" fill="var(--blue-soft)" stroke="var(--ink)" stroke-width="1.6"/></svg>'}
];

/* Rayons de l'accueil : produits avec photo d'abord, épuisés en dernier. */
const RAYONS=[
  {t:'Bureaux',            cats:['bureaux','bureaux-direction']},
  {t:'Bureaux d’accueil',  cats:['presentoirs']},
  {t:'Mobilier métallique',cats:['armoires-metal','vestiaires-metalliques','rayonnages-metalliques']},
  {t:'Sièges et tables',   cats:['fauteuils-bureau','fauteuils-direction','ensembles-fauteuils','tables-reunion']},
  {t:'Mobilier scolaire',  cats:['tables-scolaires','tableaux-scolaires']}
];
const rank=p=>(epuise(p)?2:0)+(hasPhoto(p)?0:1);
function rayonHtml(title,list,link,id){
  if(!list.length) return '';
  return `<section class="section rayon" style="padding-top:0"${id?` id="${id}"`:''}><div class="wrap">
    <div class="section-head"><div><h2>${esc(title)}</h2></div>${link||''}</div>
    <div class="grid">${list.map(card).join('')}</div>
  </div></section>`;
}
function viewHome(){
  const tiles=CATS_VIS.map(c=>{
    const ps=VIS.filter(p=>p.cat===c.id), ph=ps.find(hasPhoto)||ps[0];
    return `<li><a class="tile" href="${U.cat(c.id)}" data-go="catalog" data-cat="${c.id}">
      <span class="plate">${ph?visual(ph):drawingSvg(catKey(c))}</span>
      <span class="tl"><span class="nm">${esc(c.nom)}</span><span class="ct num">${plural(ps.length,'modèle')}</span></span></a></li>`;
  }).join('');
  const promos=VIS.filter(p=>promoPct(p)&&!epuise(p)).sort((a,b)=>promoPct(b)-promoPct(a)).slice(0,8);
  const rayons=RAYONS.map(r=>{
    const list=VIS.filter(p=>r.cats.includes(p.cat)).sort((a,b)=>rank(a)-rank(b)).slice(0,8);
    const c1=r.cats.find(id=>CATS_VIS.some(c=>c.id===id));
    const link=r.cats.length===1&&c1?`<a class="textlink" href="${U.cat(c1)}" data-go="catalog" data-cat="${c1}">Voir tout ${arrowSvg}</a>`:`<a class="textlink" href="${U.cat('tous')}" data-go="catalog" data-cat="tous">Voir le catalogue ${arrowSvg}</a>`;
    return rayonHtml(r.t,list,link);
  }).join('');
  const contact=SITE.contact, coords=[contact.telephone,contact.email,contact.adresse].filter(Boolean).map(v=>`<span>${esc(v)}</span>`).join('');
  return `
  <section class="hero"><div class="wrap hero-grid">
    <div>
      <h1>${sloganHtml()}</h1>
      <p class="lead">Mobidar fabrique, conseille et aménage. Bureaux, fauteuils, tables, rangements, vestiaires et mobilier scolaire, livrés partout au Maroc.</p>
      <div class="cta">
        <a class="btn btn-red" href="${U.cat('tous')}" data-go="catalog" data-cat="tous">Découvrir nos produits ${icArrow}</a>
        <a class="btn btn-ghost" href="${U.cart()}" data-go="cart">Demander un devis</a>
      </div>
      <p class="note"><strong class="num">${plural(VIS.length,'référence')}</strong> en catalogue, réparties en ${plural(CATS_VIS.length,'catégorie')}.</p>
    </div>
    <figure class="hero-plate${heroDrawn||reduceMotion?'':' draw'}"><div class="plate">${heroSvg()}</div>
      <figcaption><span>Bureau de direction, fauteuil, rayonnage et armoire</span><span>Dessin indicatif</span></figcaption></figure>
  </div></section>
  <section class="manifesto" aria-label="Notre esprit"><div class="wrap"><ul>${SITE.variantes.map(t=>`<li>${esc(t)}</li>`).join('')}</ul></div></section>
  <section class="section" id="categories"><div class="wrap">
    <div class="section-head"><div><h2>Nos collections</h2><p>Choisissez une catégorie pour parcourir les modèles, leurs références et leurs prix.</p></div></div>
    <ul class="tiles">${tiles}</ul>
  </div></section>
  ${rayonHtml('Promotions',promos,`<a class="textlink" href="${U.cat('tous')}" data-go="catalog" data-cat="tous">Voir le catalogue ${arrowSvg}</a>`,'promotions')}
  ${rayons}
  <section class="section" id="activites" style="padding-top:0"><div class="wrap acts">
    <div class="acts-aside"><h2>Fabrication, service, aménagement</h2><p>Trois savoir-faire réunis pour mener votre projet de l’idée à l’installation.</p></div>
    <ol>${ACTS.map(a=>`<li>${a.i}<div><h3>${a.t}</h3><p>${a.d}</p></div></li>`).join('')}</ol>
  </div></section>
  <section class="section" style="padding-top:0" aria-labelledby="steps-t"><div class="wrap">
    <div class="section-head"><div><h2 id="steps-t">Votre devis en quatre étapes</h2><p>Aucun paiement en ligne : vous recevez une proposition adaptée à votre projet.</p></div></div>
    <ol class="steps">
      <li><h3>Choisissez</h3><p>Parcourez le catalogue et ajoutez au panier les produits qui vous intéressent.</p></li>
      <li><h3>Décrivez votre projet</h3><p>Quantités, espaces à équiper, contraintes : le formulaire prépare votre demande.</p></li>
      <li><h3>Recevez une proposition</h3><p>Mobidar revient vers vous avec un devis adapté à votre besoin.</p></li>
      <li><h3>Fabrication et aménagement</h3><p>Nous menons votre projet de l’idée jusqu’à l’installation.</p></li>
    </ol>
  </div></section>
  <section class="cta-band" id="contact"><div class="wrap"><div class="in">
    <div><h2>Un projet d’aménagement ? Parlons-en.</h2><p>Décrivez-nous votre besoin : nous reviendrons vers vous avec une proposition.</p>${coords?`<p class="coords">${coords}</p>`:''}</div>
    <a class="btn btn-red" href="${U.cart()}" data-go="cart">Demander un devis ${icArrow}</a>
  </div></div></section>`;
}

function filtered(){
  const q=norm(state.q.trim());
  const list=VIS.filter(p=>(state.cat==='tous'||p.cat===state.cat)&&(!state.dispo||!epuise(p))&&(!q||norm(p.nom+' '+(p.desc||'')+' '+(p.ref||'')+' '+catOf(p.cat).nom).includes(q)));
  const price=p=>typeof p.prix==='number'?p.prix:null;
  if(state.sort==='prix-asc'||state.sort==='prix-desc'){ const dir=state.sort==='prix-asc'?1:-1; list.sort((a,b)=>{ const x=price(a),y=price(b); if(x===null&&y===null) return 0; if(x===null) return 1; if(y===null) return -1; return (x-y)*dir; }); }
  else if(state.sort==='nom') list.sort((a,b)=>a.nom.localeCompare(b.nom,'fr'));
  return list;
}
const SUGGEST=['Bureau','Fauteuil','Table de réunion','Armoire','Vestiaire','Table scolaire','Tableau'];
function emptyResults(q){
  const words=SUGGEST.filter(w=>VIS.some(p=>norm(p.nom).includes(norm(w))));
  const inCat=state.cat!=='tous'&&q&&VIS.some(p=>norm(p.nom+' '+(p.desc||'')+' '+(p.ref||'')).includes(norm(q)));
  return `<div class="empty"><h2>Aucun produit trouvé${q?` pour «\u00a0${esc(q)}\u00a0»`:''}</h2>
    <p>${inCat?'Ce produit existe dans une autre catégorie.':'Vérifiez l’orthographe, essayez un mot plus court ou une référence (ex. C1284).'}</p>
    ${words.length?`<div class="suggest" role="group" aria-label="Recherches suggérées">${words.map(w=>`<button type="button" class="chip" data-suggest="${esc(w)}">${esc(w)}</button>`).join('')}</div>`:''}
    <div class="actions"><button type="button" class="btn btn-red" data-reset>${inCat?'Chercher dans tout le catalogue':'Voir tous les produits'}</button>
    <a class="btn btn-ghost" href="${U.cart()}" data-go="cart">Demander un produit sur mesure</a></div></div>`;
}
function viewCatalog(){
  const list=filtered();
  const chips=[{id:'tous',nom:'Tous',n:VIS.length}].concat(CATS_VIS.map(c=>({id:c.id,nom:c.nom,n:VIS.filter(p=>p.cat===c.id).length})))
    .map(c=>`<a class="chip" href="${U.cat(c.id)}" data-filter="${c.id}"${state.cat===c.id?' aria-current="page"':''}>${esc(c.nom)} <small>${c.n}</small></a>`).join('');
  const q=state.q.trim(), cur=state.cat!=='tous'&&catOf(state.cat);
  return `<div class="wrap page">
    <nav class="crumbs" aria-label="Fil d’Ariane"><a href="${U.home()}" data-go="home">Accueil</a><span aria-hidden="true">/</span>${cur?`<a href="${U.cat('tous')}" data-go="catalog" data-cat="tous">Catalogue</a><span aria-hidden="true">/</span><span>${esc(cur.nom)}</span>`:'<span>Catalogue</span>'}</nav>
    <h1>${cur?esc(cur.nom):'Catalogue'}</h1><p class="sub">${cur?catIntro(cur):`<strong>${plural(VIS.length,'référence')}</strong> de mobilier professionnel : bureaux, fauteuils, tables de réunion, rangements, vestiaires et mobilier scolaire. Les prix sont indiqués en dirhams et confirmés sur devis.`}</p>
    <div class="filters" role="group" aria-label="Filtrer par catégorie">${chips}</div>
    <div class="result-line"><p aria-live="polite"><strong>${list.length}</strong> produit${list.length>1?'s':''}${q?` pour « ${esc(q)} »`:''}</p>
      <div class="tools">${q?'<button type="button" class="linkbtn" data-clearq>Effacer la recherche</button>':''}
        <label><span class="switch"><input type="checkbox" id="dispo" ${state.dispo?'checked':''}><span></span></span>Disponibles uniquement</label>
        <label for="sort" class="sr">Trier les produits</label>
        <select id="sort">${[['defaut','Tri : nouveautés'],['prix-asc','Prix croissant'],['prix-desc','Prix décroissant'],['nom','Nom (A → Z)']].map(o=>`<option value="${o[0]}"${state.sort===o[0]?' selected':''}>${o[1]}</option>`).join('')}</select>
      </div></div>
    ${list.length?`<div class="grid">${list.map(card).join('')}</div>`:
      emptyResults(q)}
  </div>`;
}

function viewProduct(){
  const p=prodOf(state.pid); if(!p||p.visible===false){ state.view='catalog'; return viewCatalog(); }
  const c=catOf(p.cat), out=epuise(p);
  const rel=VIS.filter(x=>x.cat===p.cat&&x.id!==p.id).concat(VIS.filter(x=>x.cat!==p.cat)).slice(0,4);
  /* Produit à variantes : la dimension choisie fournit référence, dimensions et prix. */
  const vi=hasVar(p)?selVar(p):0, key=cartKey(p,vi), cur=hasVar(p)?itemOf(key):p;
  const rows=[['Référence',cur.ref?esc(cur.ref):todo('')],['Dimensions',cur.dims?esc(cur.dims):todo('')],['Catégorie',esc(c.nom)],['Disponibilité',out?'Épuisé':todo('')]].filter(r=>r[1]);
  const vlabel=v=>v.dims||'Modèle';
  const picker=hasVar(p)?`<fieldset class="dims"><legend>Dimension : <strong>${esc(vlabel(p.variantes[vi]))}</strong></legend><div class="dim-opts">${p.variantes.map((v,j)=>`<button type="button" class="dim" data-variant="${j}" aria-pressed="${j===vi}"><span>${esc(vlabel(v))}</span>${typeof v.prix==='number'?`<small>${fmtDH(v.prix)}</small>`:''}</button>`).join('')}</div></fieldset>`:'';
  return `<div class="wrap page">
    <nav class="crumbs" aria-label="Fil d’Ariane"><a href="${U.home()}" data-go="home">Accueil</a><span aria-hidden="true">/</span><a href="${U.cat('tous')}" data-go="catalog" data-cat="tous">Catalogue</a><span aria-hidden="true">/</span><a href="${U.cat(c.id)}" data-go="catalog" data-cat="${c.id}">${esc(c.nom)}</a></nav>
    <div class="pdp">
      <figure><div class="plate">${visual(p)}${out?'<span class="flag">Épuisé</span>':promoFlag(cur)}</div>${thumbsHtml(p)}${hasPhoto(p)?'':'<figcaption>Dessin indicatif — la photo du produit sera ajoutée prochainement.</figcaption>'}</figure>
      <div class="pdp-info">
        <h1>${esc(p.nom)}</h1>
        <p class="meta"><a href="${U.cat(c.id)}" data-go="catalog" data-cat="${c.id}">${esc(c.nom)}</a>${cur.ref?' · Réf. <span class="num">'+esc(cur.ref)+'</span>':''}</p>
        ${p.desc?`<p class="desc">${esc(p.desc)}</p>`:''}
        <p class="price"${hasVar(p)?' aria-live="polite"':''}>${priceHtml(cur)}${out?' <span class="soldout">Épuisé</span>':''}</p>
        ${out?'':picker}
        ${out?'<p class="notice-off" role="status">Ce produit est actuellement épuisé. Contactez-nous pour connaître un modèle équivalent.</p>':`<div class="buy">
          <div class="qty" role="group" aria-label="Quantité">
            <button type="button" data-q="-1" aria-label="Diminuer la quantité">−</button>
            <input id="qty" type="number" min="1" max="99" value="1" inputmode="numeric" aria-label="Quantité">
            <button type="button" data-q="1" aria-label="Augmenter la quantité">+</button>
          </div>
          <button type="button" class="btn btn-red" data-add="${key}" data-qtyinput>Ajouter au panier</button>
          <button type="button" class="btn btn-ghost" data-quote="${key}">Demander un devis</button>
        </div>`}
        <div class="share"><span>Partager ce produit</span>
          <a href="https://wa.me/?text=${encodeURIComponent(p.nom+(p.ref?' (réf. '+p.ref+')':'')+' — Mobidar\n'+shareUrl(p))}" target="_blank" rel="noopener">WhatsApp</a>
          <button type="button" data-share="${p.id}">Copier le lien</button></div>
        ${rows.length?`<table class="spec"><caption>Informations produit</caption><tbody>${rows.map(r=>`<tr><th scope="row">${r[0]}</th><td>${r[1]}</td></tr>`).join('')}</tbody></table>`:''}
      </div>
    </div>
    ${pagerHtml(p)}
    ${rel.length?`<section class="related" aria-labelledby="rel"><h2 id="rel">Vous aimerez aussi</h2><div class="grid">${rel.map(card).join('')}</div></section>`:''}
  </div>`;
}

/* Dimension choisie sur la fiche (la 1re par défaut, mémorisée tant qu'on reste sur ce produit). */
function selVar(p){ return state.vsel&&state.vsel.pid===p.id&&p.variantes[state.vsel.i]?state.vsel.i:0; }
function chooseVar(i){
  const p=prodOf(state.pid); if(!hasVar(p)||!p.variantes[i]) return;
  const q=$('#qty')?.value; state.vsel={pid:p.id,i};
  render({keep:true,noFocus:true});
  if(q&&$('#qty')) $('#qty').value=q;
  $(`[data-variant="${i}"]`)?.focus();
}
function thumbsHtml(p){
  const all=p.image&&Array.isArray(p.galerie)&&p.galerie.length?[p.image].concat(p.galerie):[];
  if(!all.length) return '';
  return `<div class="thumbs" role="group" aria-label="Photos du produit">${all.map((src,i)=>`<button type="button" class="thumb" data-photo="${esc(src)}" aria-pressed="${i===0}" aria-label="Photo ${i+1} sur ${all.length}"><img src="${esc(src)}" alt="" loading="lazy"></button>`).join('')}</div>`;
}
function showPhoto(t){
  const fig=t.closest('figure'), img=fig&&fig.querySelector('.plate img'); if(!img) return;
  img.src=t.dataset.photo;
  fig.querySelectorAll('[data-photo]').forEach(b=>b.setAttribute('aria-pressed',String(b===t)));
}
function shareUrl(p){ return ROUTING==='hash'?location.href.split('#')[0]+U.prod(p):SITE_URL+U.prod(p); }
function pagerHtml(p){
  const same=VIS.filter(x=>x.cat===p.cat); if(same.length<2) return '';
  const i=same.findIndex(x=>x.id===p.id), prev=same[(i-1+same.length)%same.length], next=same[(i+1)%same.length];
  return `<nav class="pager" aria-label="Autres produits de la catégorie">
    <a href="${U.prod(prev)}" data-open="${prev.id}"><small>← Produit précédent</small><strong>${esc(prev.nom)}</strong></a>
    <a class="next" href="${U.prod(next)}" data-open="${next.id}"><small>Produit suivant →</small><strong>${esc(next.nom)}</strong></a></nav>`;
}
let buyObs=null;
function revealChip(){ const f=$('.filters'), c=f&&f.querySelector('[aria-current="page"]'); if(c&&c.offsetLeft+c.offsetWidth>f.clientWidth) f.scrollLeft=c.offsetLeft-24; }
function setupBuybar(){
  const bar=$('#buybar'); if(buyObs){ buyObs.disconnect(); buyObs=null; }
  bar.classList.remove('show'); bar.setAttribute('aria-hidden','true'); document.body.classList.remove('has-buybar'); bar.innerHTML='';
  if(state.view!=='product') return;
  const p=prodOf(state.pid), target=$('.pdp .buy'); if(!p||!target||epuise(p)) return;
  const key=cartKey(p,hasVar(p)?selVar(p):0), it=itemOf(key);
  bar.innerHTML=`<div class="t"><span>${esc(it.nom)}</span><strong>${priceOf(it)}</strong></div><button type="button" class="btn btn-red btn-sm" data-add="${key}" tabindex="-1">Ajouter au panier</button>`;
  document.body.classList.add('has-buybar');
  if(!('IntersectionObserver' in window)) return;
  buyObs=new IntersectionObserver(([e])=>{ const show=!e.isIntersecting&&e.boundingClientRect.top<0; bar.classList.toggle('show',show); bar.setAttribute('aria-hidden',String(!show)); });
  buyObs.observe(target);
}
function viewNotFound(){
  return `<div class="wrap page"><nav class="crumbs" aria-label="Fil d’Ariane"><a href="${U.home()}" data-go="home">Accueil</a><span aria-hidden="true">/</span><span>Page introuvable</span></nav>
    <h1>Page introuvable</h1><p class="sub">Cette page n’existe pas ou a été déplacée. Le produit que vous cherchez est peut-être dans le catalogue.</p>
    <div class="cta" style="display:flex;flex-wrap:wrap;gap:12px;margin-top:32px"><a class="btn btn-red" href="${U.cat('tous')}" data-go="catalog" data-cat="tous">Voir le catalogue ${icArrow}</a><a class="btn btn-ghost" href="${U.home()}" data-go="home">Retour à l’accueil</a></div></div>`;
}
function lineHtml(p,q){
  const sum=typeof p.prix==='number'?fmtDH(p.prix*q):'';
  return `<li class="line"><div class="plate">${visual(p)}</div><div>
    <h3>${esc(p.nom)}</h3><p class="meta">${esc(catOf(p.cat).nom)} · ${priceOf(p)}</p>
    <div class="ctl"><div class="qty sm" role="group" aria-label="Quantité de ${esc(p.nom)}">
      <button type="button" data-dec="${p.id}" aria-label="Diminuer">−</button><span class="val" aria-live="polite">${q}</span><button type="button" data-inc="${p.id}" aria-label="Augmenter">+</button></div>
      <button type="button" class="linkbtn" data-rm="${p.id}">Retirer</button></div></div>
    ${sum?`<p class="sum">${sum}</p>`:''}</li>`;
}
function summaryText(){
  const f=state.form, lines=Object.keys(state.cart).map(id=>{ const it=itemOf(id); return `- ${state.cart[id]} × ${it.nom}${it.ref?' (réf. '+it.ref+')':''}`; });
  return ['DEMANDE DE DEVIS — MOBIDAR','',`Nom : ${f.nom||''}`,`Société : ${f.societe||''}`,`E-mail : ${f.email||''}`,`Téléphone : ${f.tel||''}`,'',
    'Produits demandés :',...(lines.length?lines:['- Aucun produit sélectionné']),'','Message :',f.message||'—'].join('\n');
}
function fieldError(k,v){
  v=(v||'').trim();
  if(k==='nom') return v?'':'Indiquez votre nom.';
  if(k==='email') return !v?'Indiquez votre adresse e-mail.':(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)?'':'Adresse e-mail invalide (ex. nom@societe.ma).');
  return '';
}
/* Met à jour l'erreur d'un champ sans redessiner le formulaire (le focus reste en place). */
function showFieldError(k,msg){
  const inp=$('#f-'+k); if(!inp) return;
  const box=inp.parentElement; let p=$('#e-'+k);
  if(msg){ state.errors[k]=msg; inp.setAttribute('aria-invalid','true'); inp.setAttribute('aria-describedby','e-'+k);
    if(!p){ p=document.createElement('p'); p.className='err'; p.id='e-'+k; box.appendChild(p); } p.textContent=msg; }
  else { delete state.errors[k]; inp.removeAttribute('aria-invalid'); inp.removeAttribute('aria-describedby'); if(p) p.remove(); }
}
const waLink = n=>{ const d=String(n||'').replace(/[^0-9]/g,''); return d.length>=8?'https://wa.me/'+d:''; };
function viewCart(){
  const ids=Object.keys(state.cart), f=state.form, e=state.errors;
  const priced=ids.filter(id=>typeof itemOf(id).prix==='number'), total=priced.reduce((a,id)=>a+itemOf(id).prix*state.cart[id],0);
  const list=ids.length?`<ul class="lines">${ids.map(id=>lineHtml(itemOf(id),state.cart[id])).join('')}</ul>
      ${priced.length?`<div class="cart-total"><span>Total indicatif${priced.length<ids.length?' (produits à prix affiché)':''}</span><strong>${fmtDH(total)}</strong></div>`:''}`:
    `<div class="empty"><h2>Votre panier est vide</h2><p>Ajoutez des produits depuis le catalogue, ou envoyez-nous directement votre projet.</p><a class="btn btn-red" href="${U.cat('tous')}" data-go="catalog" data-cat="tous">Découvrir nos produits ${icArrow}</a></div>`;
  const wa=waLink(SITE.contact.whatsapp), mail=/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(SITE.contact.email||'')?SITE.contact.email:'';
  let side;
  if(state.recap){
    side=`<div class="panel"><h2>Récapitulatif de votre demande</h2>
      <div class="notice">${SITE.formulaireConnecte?'Votre demande a été transmise.':(wa||mail)?'Votre demande est prête. Envoyez-la à Mobidar avec le bouton ci-dessous, ou copiez le récapitulatif.':PUBLIC_MODE?'Copiez ce récapitulatif pour l’envoyer à Mobidar.':'Cette démonstration n’envoie aucun message : le formulaire n’est pas encore relié à une messagerie. Copiez le récapitulatif pour l’envoyer à Mobidar.'}</div>
      <label class="sr" for="recap">Récapitulatif</label><textarea id="recap" class="recap" readonly>${esc(state.recap)}</textarea>
      <div class="row">${wa?`<a class="btn btn-blue" href="${esc(wa+'?text='+encodeURIComponent(state.recap))}" target="_blank" rel="noopener">Envoyer par WhatsApp</a>`:''}${mail?`<a class="btn btn-blue" href="${esc('mailto:'+mail+'?subject='+encodeURIComponent('Demande de devis')+'&body='+encodeURIComponent(state.recap))}">Envoyer par e-mail</a>`:''}<button type="button" class="btn btn-red" data-copy>Copier le récapitulatif</button><button type="button" class="btn btn-ghost" data-edit>Modifier ma demande</button></div></div>`;
  } else {
    const fld=(id,label,type,req,extra='')=>`<div class="field"><label for="f-${id}">${label}${req?' *':''}</label><input id="f-${id}" name="${id}" type="${type}" value="${esc(f[id]||'')}" ${req?'aria-required="true"':''} ${e[id]?`aria-invalid="true" aria-describedby="e-${id}"`:''} ${extra}>${e[id]?`<p class="err" id="e-${id}" role="alert">${e[id]}</p>`:''}</div>`;
    const errIds=state.showSum?Object.keys(e):[];
    const sum=errIds.length?`<div class="err-sum" id="errSum" role="alert" tabindex="-1"><h3>${errIds.length>1?errIds.length+' champs à corriger':'Un champ à corriger'}</h3><ul>${errIds.map(k=>`<li><button type="button" data-focus="f-${k}">${e[k]}</button></li>`).join('')}</ul></div>`:'';
    side=`<form class="panel" id="quoteForm" novalidate><h2>Demander un devis</h2>
      <p class="hint">Aucun paiement n’est demandé sur ce site. Les prix sont communiqués sur devis.</p>${sum}
      <div class="two">${fld('nom','Nom','text',true,'autocomplete="name"')}${fld('societe','Société','text',false,'autocomplete="organization"')}</div>
      <div class="two">${fld('email','E-mail','email',true,'autocomplete="email" inputmode="email"')}${fld('tel','Téléphone','tel',false,'autocomplete="tel" inputmode="tel"')}</div>
      <div class="field"><label for="f-message">Votre projet</label><textarea id="f-message" name="message" placeholder="Quantités, espaces à équiper, délais, contraintes…">${esc(f.message||'')}</textarea></div>
      <button type="submit" class="btn btn-red">Préparer ma demande de devis ${icArrow}</button></form>`;
  }
  return `<div class="wrap page">
    <nav class="crumbs" aria-label="Fil d’Ariane"><a href="${U.home()}" data-go="home">Accueil</a><span aria-hidden="true">/</span><span>Panier</span></nav>
    <h1>Votre panier</h1><p class="sub">Réunissez les produits qui vous intéressent, puis demandez un devis.</p>
    <div class="cart-layout"><div>${list}</div>${side}</div></div>`;
}

const LOGO_SRC = $('.brand img').getAttribute('src');
function renderFooter(){
  const c=SITE.contact, pub=PUBLIC_MODE, wa=waLink(c.whatsapp);
  const lis=[['Adresse',c.adresse,'adresse'],['Téléphone',c.telephone,'téléphone'],['E-mail',c.email,'e-mail'],['Horaires',c.horaires,'horaires']]
    .filter(i=>!pub||i[1]).map(i=>`<li>${i[0]} : ${i[1]?esc(i[1]):todo(i[2])}</li>`);
  if(wa) lis.push(`<li>WhatsApp : <a href="${esc(wa)}" target="_blank" rel="noopener">${esc(c.whatsapp)}</a></li>`);
  else if(!pub) lis.push(`<li>WhatsApp : ${todo('numéro')}</li>`);
  if(!lis.length) lis.push(`<li><a class="linklike" href="${U.cart()}" data-go="cart">Demander un devis</a></li>`);
  const soc=SITE.reseaux.filter(r=>!pub||/^https?:\/\//i.test(r.url||''))
    .map(r=>`<li>${/^https?:\/\//i.test(r.url||'')?`<a href="${esc(r.url)}" target="_blank" rel="noopener">${esc(r.nom)}</a>`:`${esc(r.nom)} : ${todo('lien')}`}</li>`);
  const nav=`<li><a class="linklike" href="${U.cat('tous')}" data-go="catalog" data-cat="tous">Catalogue</a></li><li><a class="linklike" href="${U.cart()}" data-go="cart">Demander un devis</a></li>`;
  $('#footer').innerHTML=`<div class="wrap"><div class="cols">
    <div><a class="brand" href="${U.home()}" data-go="home" aria-label="Mobidar, retour à l’accueil"><img src="${LOGO_SRC}" width="1015" height="300" alt="Mobidar"></a>
      <p class="tag">${esc(SITE.slogan)}</p></div>
    <div><h2>Coordonnées</h2><ul>${lis.join('')}</ul></div>
    <div><h2>${soc.length?'Réseaux sociaux':'Navigation'}</h2><ul>${soc.length?soc.join(''):nav}</ul></div>
  </div>
  <nav class="foot-cats" aria-label="Catégories"><h2>Catégories</h2><ul>${CATS_VIS.map(c=>`<li><a href="${U.cat(c.id)}" data-go="catalog" data-cat="${c.id}">${esc(c.nom)}</a></li>`).join('')}</ul></nav><div class="legal"><span>© Mobidar — ${esc(SITE.mention)}</span>${pub?'':`<span>Mentions légales : ${todo('')}</span>`}</div></div>`;
}

let lastCount=cartCount();
function updateChrome(){
  const n=cartCount(), b=$('#badge'); b.textContent=n; b.classList.toggle('has',n>0);
  if(n>lastCount&&!reduceMotion){ b.classList.remove('bump'); void b.offsetWidth; b.classList.add('bump'); }
  lastCount=n;
  $('#cartBtn').setAttribute('aria-label',`Panier, ${n} article${n>1?'s':''}`);
  const key=state.view==='catalog'||state.view==='product'?'catalog':state.view==='home'?'home':null;
  document.querySelectorAll('[data-nav]').forEach(b=>{ if(b.dataset.nav===key) b.setAttribute('aria-current','page'); else b.removeAttribute('aria-current'); });
}
function render(o={}){
  app.innerHTML = state.view==='home'?viewHome():state.view==='catalog'?viewCatalog():state.view==='product'?viewProduct():state.view==='notfound'?viewNotFound():viewCart();
  app.dataset.view=state.view; applySeo();
  if(state.view==='home'&&!heroDrawn){ app.querySelectorAll('.hero-plate.draw [pathLength]').forEach((el,i)=>el.style.setProperty('--i',i%40)); heroDrawn=true; }
  if(!o.keep&&!reduceMotion){ app.classList.remove('enter'); void app.offsetWidth; app.classList.add('enter'); }
  updateChrome(); setupBuybar(); revealChip();
  if(o.scroll){ const el=document.getElementById(o.scroll); if(el) el.scrollIntoView({behavior:reduceMotion?'auto':'smooth',block:'start'}); }
  else if(!o.keep) window.scrollTo(0,0);
  if(!o.noFocus&&!o.scroll){ const h=app.querySelector('h1'); if(h){ h.tabIndex=-1; h.focus({preventScroll:true}); } }
}
/* Le bouton Retour du navigateur fonctionne et chaque page a sa propre adresse. */
function urlFor(){
  const q=state.q.trim(), qs=q?'?q='+encodeURIComponent(q):'';
  if(state.view==='catalog') return U.cat(state.cat)+qs;
  if(state.view==='product') return U.prod(prodOf(state.pid));
  if(state.view==='cart') return U.cart();
  if(state.view==='notfound') return null;
  return U.home();
}
const currentUrl=()=>ROUTING==='hash'?(location.hash||'#/'):location.pathname+location.search;
function syncUrl(replace){
  const u=urlFor(); if(!u||u===currentUrl()) return;
  try{ history[replace?'replaceState':'pushState'](null,'',u); }catch(e){}
}
function readUrl(){
  let path='', q='';
  if(ROUTING==='hash'){ const m=location.hash.match(/^#\/([^?]*)(?:\?q=(.*))?$/); path=m?m[1]:''; try{ q=m&&m[2]?decodeURIComponent(m[2]):''; }catch(e){} }
  else { path=location.pathname.slice(BASE.length).replace(/index\.html$/,''); try{ q=new URLSearchParams(location.search).get('q')||''; }catch(e){} }
  const parts=path.split('/').filter(Boolean);
  state.q=q; $('#q').value=q;
  if(!parts.length) state.view='home';
  else if(parts[0]==='catalogue'&&parts.length<=2&&(!parts[1]||CATS_VIS.some(c=>c.id===parts[1]))){ state.view='catalog'; state.cat=parts[1]||'tous'; }
  else if(parts[0]==='produit'&&parts.length===2&&(SLUG2ID[parts[1]]||(ROUTING==='hash'&&prodOf(parts[1])))){ state.view='product'; state.pid=SLUG2ID[parts[1]]||parts[1]; }
  else if(parts[0]==='panier'&&parts.length===1) state.view='cart';
  else state.view=ROUTING==='hash'?'home':'notfound';
}
function go(view,o={}){
  state.view=view; if(o.cat!==undefined) state.cat=o.cat; if(o.pid) state.pid=o.pid;
  if(view!=='cart'){ state.recap=null; state.errors={}; state.showSum=false; }
  syncUrl(); closeMenu(); render(o);
}
window.addEventListener('popstate',()=>{ readUrl(); state.recap=null; closeMenu(); render(); });
function closeMenu(){ $('#nav').classList.remove('open'); $('#menuBtn').setAttribute('aria-expanded','false'); }
const checkSvg='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>';
/* Le bouton confirme l'ajout sur place pendant un instant, sans changer de largeur. */
function confirmAdd(b){
  if(!b||b.classList.contains('added')) return;
  const html=b.innerHTML, w=b.offsetWidth; b.style.minWidth=w+'px';
  b.classList.add('added'); b.innerHTML=`<span class="chk">${checkSvg}</span>Ajouté`;
  setTimeout(()=>{ if(b.isConnected){ b.classList.remove('added'); b.innerHTML=html; b.style.minWidth=''; } },1400);
}
function addToCart(id,n=1){ const it=itemOf(id); if(!it) return go('product',{pid:String(id).split('~')[0]}); if(epuise(it)) return; state.cart[id]=Math.min(99,(state.cart[id]||0)+n); saveCart(); updateChrome(); toast(`« ${it.nom} » ajouté au panier`); }
function setQty(id,n){ if(n<=0) delete state.cart[id]; else state.cart[id]=Math.min(99,n); saveCart(); render({keep:true,noFocus:true}); }
async function copyRecap(){
  const ta=$('#recap');
  try{ await navigator.clipboard.writeText(state.recap); toast('Récapitulatif copié'); }
  catch(e){ ta.focus(); ta.select(); toast('Sélectionné : copiez avec Ctrl+C ou Cmd+C'); }
}
let previewId=null;
function showPreview(t){
  const id=t.dataset.preview; if(id===previewId) return; previewId=id;
  const box=$('#catPreview'), lbl=$('#catPreviewLbl'), c=catOf(id); if(!box||!c) return;
  box.innerHTML=drawingSvg(catKey(c)); lbl.textContent=c.nom;
  if(!reduceMotion) box.firstElementChild.animate([{opacity:0,transform:'translateY(8px)'},{opacity:1,transform:'none'}],{duration:320,easing:'cubic-bezier(.23,1,.32,1)'});
}
document.addEventListener('pointerover',ev=>{ const t=ev.target.closest('[data-preview]'); if(t) showPreview(t); });
document.addEventListener('focusin',ev=>{ const t=ev.target.closest('[data-preview]'); if(t) showPreview(t); });

document.addEventListener('click',ev=>{
  const t=ev.target.closest('[data-go],[data-open],[data-add],[data-filter],[data-q],[data-inc],[data-dec],[data-rm],[data-copy],[data-edit],[data-clearq],[data-reset],[data-quote],[data-focus],[data-suggest],[data-share],[data-photo],[data-variant]');
  if(!t) return;
  if(t.dataset.photo!==undefined) return showPhoto(t);
  if(t.dataset.variant!==undefined) return chooseVar(+t.dataset.variant);
  if(t.tagName==='A'){ if(ev.metaKey||ev.ctrlKey||ev.shiftKey||ev.altKey||ev.button!==0) return; ev.preventDefault(); }
  const d=t.dataset;
  if(d.open!==undefined) return go('product',{pid:d.open});
  if(d.add!==undefined){ const n=t.hasAttribute('data-qtyinput')?Math.max(1,Math.min(99,parseInt($('#qty').value,10)||1)):1; addToCart(d.add,n); return confirmAdd(t); }
  if(d.share!==undefined){ const u=shareUrl(prodOf(d.share)); (navigator.clipboard?navigator.clipboard.writeText(u):Promise.reject()).then(()=>toast('Lien du produit copié'),()=>toast(u)); return; }
  if(d.focus!==undefined){ const f=document.getElementById(d.focus); if(f){ f.focus(); f.scrollIntoView({block:'center',behavior:reduceMotion?'auto':'smooth'}); } return; }
  if(d.suggest!==undefined){ state.q=d.suggest; $('#q').value=d.suggest; state.cat='tous'; syncUrl(true); return render({keep:true,noFocus:true}); }
  if(d.quote!==undefined){ if(!state.cart[d.quote]) addToCart(d.quote,Math.max(1,parseInt($('#qty')?.value,10)||1)); return go('cart'); }
  if(d.filter!==undefined){ state.cat=d.filter; syncUrl(); return render({keep:true,noFocus:true}); }
  if(d.q!==undefined){ const i=$('#qty'); i.value=Math.max(1,Math.min(99,(parseInt(i.value,10)||1)+parseInt(d.q,10))); return; }
  if(d.inc!==undefined) return setQty(d.inc,(state.cart[d.inc]||0)+1);
  if(d.dec!==undefined) return setQty(d.dec,(state.cart[d.dec]||0)-1);
  if(d.rm!==undefined) return setQty(d.rm,0);
  if(d.copy!==undefined) return copyRecap();
  if(d.edit!==undefined){ state.recap=null; return render({keep:true}); }
  if(d.clearq!==undefined||d.reset!==undefined){ state.q=''; $('#q').value=''; state.cat='tous'; syncUrl(true); return render({keep:true,noFocus:true}); }
  if(d.go!==undefined){ const o={}; if(d.cat!==undefined) o.cat=d.cat; if(d.scroll) o.scroll=d.scroll; return go(d.go,o); }
});
document.addEventListener('submit',ev=>{
  if(ev.target.id==='searchForm'){ ev.preventDefault(); if(state.view!=='catalog'){ state.cat='tous'; go('catalog',{cat:'tous'}); } return; }
  if(ev.target.id==='quoteForm'){
    ev.preventDefault();
    const fd=new FormData(ev.target); state.form={}; fd.forEach((v,k)=>state.form[k]=String(v).trim());
    state.errors={};
    ['nom','email'].forEach(k=>{ const m=fieldError(k,state.form[k]); if(m) state.errors[k]=m; });
    if(Object.keys(state.errors).length){ state.showSum=true; render({keep:true,noFocus:true}); const box=$('#errSum'); if(box) box.focus(); return; }
    state.showSum=false; state.recap=summaryText(); render({keep:true,noFocus:true}); $('#recap')?.focus({preventScroll:true});
  }
});
document.addEventListener('change',ev=>{
  if(ev.target.id==='sort'){ state.sort=ev.target.value; render({keep:true,noFocus:true}); $('#sort')?.focus(); }
  if(ev.target.id==='dispo'){ state.dispo=ev.target.checked; render({keep:true,noFocus:true}); $('#dispo')?.focus(); }
});
document.addEventListener('input',ev=>{
  const f=ev.target.form; if(!f||f.id!=='quoteForm'||!ev.target.name) return;
  state.form[ev.target.name]=ev.target.value;
  const k=ev.target.name; if(state.errors[k]&&!fieldError(k,ev.target.value)) showFieldError(k,'');
});
document.addEventListener('focusout',ev=>{
  const f=ev.target.form; if(!f||f.id!=='quoteForm') return;
  const k=ev.target.name; if(k!=='nom'&&k!=='email') return;
  if(!ev.target.value.trim()&&!state.errors[k]) return; /* pas d'erreur sur un champ simplement traversé */
  showFieldError(k,fieldError(k,ev.target.value));
});
$('#q').addEventListener('input',e=>{
  state.q=e.target.value; state.cat=state.q?'tous':state.cat;
  if(state.view!=='catalog'){ state.view='catalog'; syncUrl(); closeMenu(); render({noFocus:true}); } else { syncUrl(true); render({keep:true,noFocus:true}); }
});
$('#menuBtn').addEventListener('click',()=>{ const n=$('#nav'), o=n.classList.toggle('open'); $('#menuBtn').setAttribute('aria-expanded',String(o)); });
document.addEventListener('keydown',e=>{
  if(e.key==='Escape'&&$('#nav').classList.contains('open')){ closeMenu(); $('#menuBtn').focus(); }
  if(e.key==='/'&&!e.ctrlKey&&!e.metaKey&&!e.altKey&&!/^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement.tagName)){ e.preventDefault(); $('#q').focus(); }
});
const head=$('.site-head'); let ticking=false;
window.addEventListener('scroll',()=>{ if(ticking) return; ticking=true; requestAnimationFrame(()=>{ head.classList.toggle('scrolled',scrollY>8); ticking=false; }); },{passive:true});
$('#skip').addEventListener('click',e=>{ e.preventDefault(); $('#contenu').focus(); });

readUrl();
if(app.dataset.view&&app.dataset.view===state.view&&!state.q&&state.view!=='cart'){
  /* Page déjà générée : on garde le HTML tel quel (aucun clignotement), on branche seulement l'interactivité. */
  if(state.view==='home'&&!heroDrawn) heroDrawn=true;
  updateChrome(); setupBuybar(); applySeo(); revealChip();
} else { renderFooter(); render({noFocus:true,keep:true}); }

/* ---------- Catalogue en ligne (data/catalogue.json, modifié depuis /admin/) ---------- */
function normProd(p){
  const num=x=>typeof x==='number'&&isFinite(x)?x:(typeof x==='string'&&x.trim()!==''&&isFinite(+x.replace(',','.'))?+x.replace(',','.'):null);
  const str=x=>typeof x==='string'?x.trim():(x==null?'':String(x));
  const q={id:str(p.id),ref:str(p.ref),cat:str(p.cat),nom:str(p.nom),prix:num(p.prix),dims:str(p.dims),desc:str(p.desc),
    epuise:p.epuise===true,accueil:p.accueil===true,image:str(p.image)||null};
  if(p.visible===false) q.visible=false;
  const pa=num(p.prixAvant); if(pa!==null) q.prixAvant=pa;
  const gal=Array.isArray(p.galerie)?p.galerie.map(g=>str(g&&typeof g==='object'?g.photo:g)).filter(Boolean):[];
  if(gal.length) q.galerie=gal;
  const vars=Array.isArray(p.variantes)?p.variantes.filter(v=>v&&(str(v.dims)||num(v.prix)!==null)).map(v=>{ const o={ref:str(v.ref),dims:str(v.dims),prix:num(v.prix)}; const a=num(v.prixAvant); if(a!==null) o.prixAvant=a; return o; }):[];
  if(vars.length){ q.variantes=vars; q.prix=null; delete q.prixAvant; }
  return q;
}
const DEMO=PRODUITS_BASE.filter(p=>p.demo);
fetch(BASE+'data/catalogue.json',{cache:'no-cache'}).then(r=>r.ok?r.json():null).then(d=>{
  if(!d||!Array.isArray(d.produits)) return;
  const seen=new Set(), list=d.produits.map(normProd).filter(p=>p.id&&p.nom&&!seen.has(p.id)&&seen.add(p.id));
  if(!list.length) return;
  const same=JSON.stringify(list)===JSON.stringify(PRODUITS_BASE.filter(p=>!p.demo).map(normProd));
  if(same) return;
  PRODUITS_BASE=DEMO.concat(list); recompute(); buildSlugs(); loadCart();
  readUrl(); render({noFocus:true,keep:true});
}).catch(()=>{});
