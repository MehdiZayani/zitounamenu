export interface MenuItem {
  title: string;
  price: string;
  description: string;
  extra?: string;
  side?: "left" | "right";
}

export interface MenuSection {
  id: string;
  label: string;
  subtitle: string;
  items?: MenuItem[];
  leftItems?: MenuItem[];
  rightItems?: MenuItem[];
}

export const initialMenuData: MenuSection[] = [
  // PAGE 1 - PETIT DEJ
  {
    id: "petit-dej",
    label: "PETIT DEJ",
    subtitle: "Menu",
    leftItems: [
      { title: "RAPIDE", price: "13,800", description: "Mini omelette ou oeuf brouillé, eau 0,5l" },
      { title: "BOWL GRANOLA", price: "18,900", description: "Yaourt, granola, fruits secs, fruits" },
      { title: "LE SUCRÉ", price: "21,600", description: "Mini crêpe, mini gaufre, mini bol de granola, fondant, mini brioche perdu, nutella, speculoos" },
      { title: "LE SALÉ", price: "22,200", description: "Mini omelette, toast fromage et tomate, assiette de charcuterie et fromage" },
      { title: "LE TURK", price: "23,200", description: "Turkish eggs, assiette de charcuterie" },
      { title: "LE TUNISIEN", price: "22,500", description: "Ojja, mini omelette à la tunisienne, toast à la tunisienne, pâtisserie du jour" },
      { title: "LE NORVÉGIEN", price: "27,500", description: "Saumon fumé, oeuf brouillé, avocat, fromage blanc, salade" },
      { title: "L'ITALIEN", price: "25,000", description: "breasaola, oeuf brouillé, champignon, avocat, fromage blanc, salade" },
      { title: "ENGLISH", price: "20,900", description: "Chacuterie, fromage blanc, 2 oeufs au plat, champignons et tomates sautés" },
      { title: "LE SPORTIF", price: "18,900", description: "2 oeufs durs , fruits, noix, fromage Blanc, Salade" },
      { title: "BÉNÉDICTE AVOCAT", price: "20,800", description: "Oeufs pochés, sauce hollandaise, avocat", extra: "benedicte" },
      { title: "BÉNÉDICTE SAUMON", price: "21,600", description: "Oeufs pochés, sauce hollandaise, saumon fumé, épinards", extra: "benedicte" },
      { title: "BÉNÉDICTE BRESAOLA CHAMPIGNONS", price: "19,800", description: "Oeufs pochés, sauce hollandaise, bresaola, champignons", extra: "benedicte" },
      { title: "BÉNÉDICTE BOEUF", price: "23,800", description: "Oeufs pochés, sauce hollandaise, émincé de boeuf, oignon caramélisé", extra: "benedicte" },
      { title: "OEUF BROUILLÉ NATURE", price: "18,200", description: "", extra: "oeuf-brouille" },
      { title: "OEUF BROUILLÉ CHAMPIGNONS", price: "21,900", description: "", extra: "oeuf-brouille" },
      { title: "OEUF BROUILLÉ BRESAOLA", price: "22,900", description: "", extra: "oeuf-brouille" },
      { title: "OEUF BROUILLÉ POULET FUMÉ", price: "22,900", description: "", extra: "oeuf-brouille" },
      { title: "OEUF BROUILLÉ SAUMON", price: "23,900", description: "", extra: "oeuf-brouille" }
    ],
    rightItems: []
  },
  // PAGE 2 - TOASTS (Combined)
  {
    id: "toasts",
    label: "TOASTS",
    subtitle: "Menu",
    leftItems: [
      { title: "CLASSIQUE", price: "14,900", description: "sauce fromage, tomates, pesto, parmesan, oeuf poché" },
      { title: "OEUF BROUILLÉ", price: "16,200", description: "sauce fromage, oeuf brouillé, emmental" },
      { title: "CONCORDE", price: "16,200", description: "sauce fromage, champignons et tomates sauté, oeuf poché" },
      { title: "TUNISIENNE", price: "19,000", description: "Ail confit, harissa, crème de thon, salade tunisienne, oeuf poché" },
      { title: "BURRATA TOMATE CONFITE", price: "19,600", description: "burrata étalé, tomate cerise confite, gremolata" },
      { title: "POULET FUMÉ", price: "18,900", description: "sauce fromage, pesto, poulet fumé, parmesan, oeuf poché" },
      { title: "CHAMPIGNONS", price: "18,900", description: "sauce fromage, oeuf brouillé, champignon sauté, emmental" },
      { title: "CHAMPIGNONS TRUFFÉ", price: "23,000", description: "Champignons, truffes, oeuf poché" },
      { title: "JAMBON FUMÉ", price: "21,600", description: "sauce fromage, oeuf brouillé, jambon fumé, emmental" },
      { title: "SAUMON OEUFS DE LOMPE", price: "22,900", description: "sauce fromage, saumon, avocat, oeufs de lampe, oeuf poché" },
      { title: "CRUNCHY CHICKEN CÉSAR", price: "22,600", description: "sauce fromage, poulet pané, parmesan, laitue" },
      { title: "SWEET CHILI SHRIMP", price: "29,800", description: "sauce fromage, crevette pané et enrobé de sweet chili sauce, roquette" },
      { title: "SPICY SHRIMP", price: "28,800", description: "sauce fromage, crevette sauté au paprika, roquette" },
      { title: "CRÈME DE THON", price: "18,000", description: "ail confit, crème de thon, persil, oeuf poché" },
      { title: "FETA", price: "14,800", description: "Ail confit, légumes grillé, feta, oeuf poché" },
      { title: "ITALIENNE", price: "18,900", description: "sauce fromage, bresaola, pesto, roquette, oeuf poché" },
      { title: "BURRATA", price: "21,900", description: "sauce fromage, burrata, pesto, roquette, oeuf poché" },
      { title: "BURRATA BRESAOLA", price: "22,800", description: "sauce fromage, burrata, bresaola, pesto, roquette, balsamique" }
    ],
    rightItems: []
  },
  // PAGE 4 - CROISSANTS (Salés + Sucrés)
  {
    id: "croissants",
    label: "CROISSANTS",
    subtitle: "Menu",
    leftItems: [
      { title: "JAMBON FUMÉ", price: "15,800", description: "croissants-sales", extra: "sauce fromage, jambon fumé, emmental" },
      { title: "POULET FUMÉ", price: "17,200", description: "croissants-sales", extra: "sauce fromage, poulet fumé, emmental, pesto" },
      { title: "BRESAOLA", price: "17,200", description: "croissants-sales", extra: "sauce fromage, Bresaola, emmental, pesto, balsamique" },
      { title: "SAUMON", price: "21,800", description: "croissants-sales", extra: "sauce fromage, avocat, saumon" },
      { title: "NUTELLA", price: "13,000", description: "croissants-sucres" },
      { title: "NUTELLA BANANE OU FRAISE", price: "14,000", description: "croissants-sucres" },
      { title: "SPÉCULOOS", price: "12,000", description: "croissants-sucres" },
      { title: "SPÉCULOOS BANANE OU FRAISE", price: "13,000", description: "croissants-sucres" }
    ],
    rightItems: []
  },
  // PAGE 6 - GAUFRES (Salées + Sucrées)
  {
    id: "gaufres",
    label: "GAUFRES",
    subtitle: "Menu",
    leftItems: [
      { title: "JAMBON", price: "14,200", description: "gaufres-salees", extra: "Jambon fumé, sauce fromage, emmental, oeuf poché, salade" },
      { title: "BRESAOLA", price: "15,700", description: "gaufres-salees", extra: "Bresaola, emmental, sauce fromage, pesto, oeuf poché" },
      { title: "NUTELLA", price: "15,600", description: "gaufres-sucres" },
      { title: "NUTELLA BANANE", price: "16,800", description: "gaufres-sucres" },
      { title: "NUTELLA AMANDES", price: "17,600", description: "gaufres-sucres" },
      { title: "NUTELLA SPÉCULOOS", price: "17,900", description: "gaufres-sucres" },
      { title: "POMME CARAMEL", price: "13,200", description: "gaufres-sucres" },
      { title: "PISTACHE", price: "18,900", description: "gaufres-sucres" },
      { title: "PISTACHE FRAMBOISE", price: "20,600", description: "gaufres-sucres" }
    ],
    rightItems: []
  },
  // PAGE 6B - CRÊPES (Salées + Sucrées)
  {
    id: "crepes",
    label: "CRÊPES",
    subtitle: "Menu",
    leftItems: [
      { title: "THON", price: "15,800", description: "crepes-salees" },
      { title: "JAMBON FUMÉ", price: "15,800", description: "crepes-salees", extra: "Sauce à l'ail, mozzarella, jambon fumé" },
      { title: "POULET ÉPICÉ", price: "19,900", description: "crepes-salees", extra: "Poulet épicé sauté avec du poivron et de l'oignion, mozzarella" },
      { title: "SAUMON FUMÉ", price: "23,800", description: "crepes-salees" },
      { title: "RICOTTA ÉPINARD", price: "14,600", description: "crepes-salees" },
      { title: "CHAMPIGNONS TRUFFÉS", price: "16,800", description: "crepes-salees" },
      { title: "TUNISIENNE", price: "16,500", description: "crepes-salees", extra: "Sauce à l'ail, harissa, thon, oeuf, piment de cayenne, olive" },
      { title: "GOURMANDE", price: "17,400", description: "crepes-salees", extra: "Jambon, thon, oeuf" },
      { title: "FOURRÉE POULET CHAMPIGNONS", price: "23,900", description: "crepes-salees", extra: "Poulet, champignons, mozzarella, sauce blanche" },
      { title: "NUTELLA", price: "15,600", description: "crepes-sucres" },
      { title: "NUTELLA BANANE", price: "16,800", description: "crepes-sucres" },
      { title: "NUTELLA AMANDES", price: "17,600", description: "crepes-sucres" },
      { title: "NUTELLA SPÉCULOOS", price: "17,900", description: "crepes-sucres" },
      { title: "POMME CARAMEL", price: "13,200", description: "crepes-sucres" },
      { title: "PISTACHE", price: "18,900", description: "crepes-sucres" },
      { title: "PISTACHE FRAMBOISE", price: "20,600", description: "crepes-sucres" }
    ],
    rightItems: []
  },
  // PAGE 6C - BRIOCHE PERDUE (Sucrées + Salées)
  {
    id: "brioche-perdue",
    label: "BRIOCHE PERDUE",
    subtitle: "Menu",
    leftItems: [
      { title: "TRADITIONNEL", price: "12,800", description: "brioche-sucree" },
      { title: "POMME CARAMEL", price: "15,900", description: "brioche-sucree" },
      { title: "PISTACHE", price: "19,200", description: "brioche-sucree" },
      { title: "BANANE CARAMEL NOIX", price: "16,500", description: "brioche-sucree" },
      { title: "FRAMBOISE CARAMEL", price: "17,900", description: "brioche-sucree" },
      { title: "PISTACHE FRAMBOISE", price: "19,900", description: "brioche-sucree" },
      { title: "NUTELLA NOISETTE", price: "17,900", description: "brioche-sucree" },
      { title: "NUTELLA BANANE", price: "18,800", description: "brioche-sucree" },
      { title: "NUTELLA FRAMBOISE OU FRAISE", price: "18,900", description: "brioche-sucree" },
      { title: "BRESAOLA", price: "14,900", description: "brioche-salee" },
      { title: "BURRATA", price: "17,800", description: "brioche-salee" },
      { title: "POULET FUMÉ", price: "17,600", description: "brioche-salee" },
      { title: "SAUMON FUMÉ", price: "19,900", description: "brioche-salee" }
    ],
    rightItems: []
  },
  // PAGE 10 - SALADES
  {
    id: "salades",
    label: "SALADES",
    subtitle: "Menu",
    leftItems: [
      { title: "SALADE CÉSAR", price: "23,200", description: "Salade, poulet grillé, parmesan, croutons, noix" },
      { title: "SALADE POULET FUMÉ", price: "21,900", description: "Salade, poulet fumé, bresaola, croutons" },
      { title: "CAMEMBERT PANÉ", price: "20,200", description: "Roquette, tomate, camembert pané, date, noix, balsamique, miel" },
      { title: "BURRATA", price: "22,400", description: "Roquette, tomate, noix, burrata, bresaola, pesto, balsamique" },
      { title: "CREVETTES PANÉES", price: "32,800", description: "Roquette, crevettes panées aux amandes, sauce aigre douce" },
      { title: "SALADE DE THON", price: "22,900", description: "" },
      { title: "SALADE MOZZARELLA PANNE", price: "22,800", description: "" },
      { title: "SALADE FRUIT DE MER", price: "29,900", description: "" }
    ],
    rightItems: []
  },
  // PAGE 10B - OMELETTES
  {
    id: "omelettes",
    label: "OMELETTES",
    subtitle: "Menu",
    leftItems: [
      { title: "FROMAGE", price: "14,900", description: "" },
      { title: "THON", price: "17,900", description: "" },
      { title: "JAMBON FUMÉ", price: "17,900", description: "" },
      { title: "BRESAOLA", price: "19,500", description: "" },
      { title: "ÉPINARD FETA", price: "19,800", description: "" },
      { title: "LÉGÈRE AUX LÉGUMES", price: "17,900", description: "" },
      { title: "SAUMON FUMÉ", price: "25,800", description: "" },
      { title: "GOURMANDE", price: "20,900", description: "Jambon, thon, fromage" }
    ],
    rightItems: []
  },
  // PAGE 11 - PÂTES
  {
    id: "pates",
    label: "PÂTES",
    subtitle: "Menu",
    leftItems: [
      { title: "CARBONARA", price: "23,800", description: "Poulet fumé, jaune d'oeuf coulant" },
      { title: "PUTTANESCA", price: "22,900", description: "" },
      { title: "SAUMON FUMÉ", price: "30,800", description: "Sauce rosée" },
      { title: "POULET PESTO", price: "26,700", description: "" },
      { title: "POULET CHAMPIGNONS", price: "24,900", description: "Sauce rosée ou blanche" },
      { title: "AGLIO, OLIO & GAMBAS", price: "33,200", description: "" },
      { title: "GAMBARI", price: "34,900", description: "Crevettes, courgettes" },
      { title: "PENNE CREVETTES CHAMPIGNONS", price: "35,600", description: "Sauce rosée" },
      { title: "SPAGHETTI FRUITS DE MER", price: "37,900", description: "" },
      { title: "TAGLIATELLI A MODO MIO", price: "29,400", description: "Viande Haché champignion" },
      { title: "RIGATONI PESTA BURATTA", price: "27,800", description: "" }
    ],
    rightItems: []
  },
  // PAGE 12 - LASAGNES / RISOTTO
  {
    id: "lasagnes",
    label: "LASAGNES",
    subtitle: "Menu",
    leftItems: [
      { title: "SPAGHETTI BOLOGNAISE", price: "26,400", description: "lasagnes" },
      { title: "LASAGNE", price: "27,800", description: "lasagnes" },
      { title: "CHAMPIGNONS TRUFFÉS", price: "34,800", description: "risotto" },
      { title: "POULET FUMÉ", price: "29,800", description: "risotto" },
      { title: "CREVETTES", price: "38,900", description: "risotto" },
      { title: "RISOTTO FRUITS DE MER", price: "41,900", description: "risotto" }
    ],
    rightItems: []
  },
  // PAGE 13 - PLATS
  {
    id: "plats",
    label: "PLATS",
    subtitle: "Menu",
    leftItems: [
      { title: "ESCALOPE DE POULET GRILLÉE", price: "23,900", description: "" },
      { title: "ESCALOPE DE POULET PANÉ AUX AMANDES", price: "25,900", description: "" },
      { title: "ESCALOPE DE POULET SAUCE CHAMPIGNONS", price: "26,600", description: "" },
      { title: "POULET PARMIGIANA", price: "28,800", description: "Escalope de poulet pané, sauce tomate, mozzarella gratiné" },
      { title: "FILET DE BOEUF SAUCE AUX CHOIX", price: "46,200", description: "Champignons, truffe, poivre, fromage, chimichurri" },
      { title: "GRATIN DE FRUITS DE MER", price: "29,800", description: "" }
    ],
    rightItems: []
  },
  // PAGE 14 - BOWLS
  {
    id: "bowls",
    label: "BOWLS",
    subtitle: "Menu",
    leftItems: [
      { title: "CHICKEN LEMON BOWL", price: "23,200", description: "Riz sauté au citron, poulet grillé, légumes" },
      { title: "TERIYAKI POULET", price: "23,200", description: "Riz sauté avec du soja, émincé de poulet sauce teriyaki, légumes" },
      { title: "PROTÉINÉ", price: "23,200", description: "Riz, poulet grillé, 2 oeufs dur, avocat" }
    ],
    rightItems: []
  },
  // PAGE 15 - SANDWICHS
  {
    id: "sandwichs",
    label: "SANDWICHS",
    subtitle: "Menu",
    leftItems: [
      { title: "FRIED CHICKEN", price: "17,900", description: "Sauce maison, poulet pané, emmental, roquette, basilic" },
      { title: "BAZON", price: "17,900", description: "Sauce maison, escalope de poulet grillé, bresaola, emmental, roquette" },
      { title: "CRISPY OIGNON BEEF", price: "19,900", description: "Sauce à l'ail, émincé de boeuf, emmental, oignons frits, roquette" },
      { title: "TASTY BEEF", price: "19,900", description: "Sauce maison, émincé de boeuf, camembert, roquette" },
      { title: "POULET ÉPICÉ", price: "17,900", description: "Harissa, mayonnaise, poulet épicé, mozarella" },
      { title: "SANDWICH THON", price: "14,900", description: "Mayonnaise, harissa, thon, salade, oeuf" }
    ],
    rightItems: []
  },
  // ROLLS
  {
    id: "rolls",
    label: "Rolls",
    subtitle: "Menu",
    leftItems: [
      { title: "CESAR ROLL", price: "18,900", description: "Sauce césar, poulet pané, parmesan, laitue" },
      { title: "CHICKEN ROLL", price: "18,900", description: "Poulet grillé fondant, tomate séchée" },
      { title: "PHILLY STEAK ROLL", price: "19,900", description: "Émincé de boeuf fondant, poivron oignon grillé" },
      { title: "SHRIMP ROLL", price: "20,900", description: "Sauce maison, crevettes, roquette" }
    ],
    rightItems: []
  },
  // PAGE 16-17 - PIZZAS
  {
    id: "pizzas",
    label: "PIZZAS",
    subtitle: "Menu",
    leftItems: [
      // Classiques
      { title: "MARGHERITA", price: "18,900", description: "Sauce tomate, mozzarella, basilic", extra: "classiques" },
      { title: "VEGETARIANA", price: "21,800", description: "Sauce tomate, mozzarella, légumes grillés", extra: "classiques" },
      { title: "TONNO", price: "23,900", description: "Sauce tomate, mozzarella, thon", extra: "classiques" },
      { title: "NAPOLITANA", price: "21,900", description: "Sauce tomate, mozzarella, anchois, câpres, olives noirs, origan", extra: "classiques" },
      { title: "REGINA", price: "24,800", description: "Sauce tomate, mozzarella, jambon fumé, champignons", extra: "classiques" },
      { title: "POULET", price: "23,900", description: "Sauce tomate, mozzarella, poulet", extra: "classiques" },
      // Gourmet
      { title: "PEPPERONI", price: "21,200", description: "Sauce tomate, mozzarella, pepperoni", extra: "gourmet" },
      { title: "QUATTRO FORMAGGI", price: "28,600", description: "Sauce blanche, mozzarella, gorgonzola, parmesan, emmental", extra: "gourmet" },
      { title: "BURRATA", price: "26,900", description: "Sauce tomate, mozzarella, burrata, roquette, pesto, balsamique", extra: "gourmet" },
      { title: "BRESAOLA", price: "26,900", description: "Sauce tomate, mozzarella, bresaola", extra: "gourmet" },
      { title: "TRUFA E FUNGHI", price: "28,400", description: "Crème de truffe, mozzarella, champignons", extra: "gourmet" }
    ],
    rightItems: []
  },
  // PAGE 24-26 - BOISSONS
  {
    id: "boissons",
    label: "BOISSONS",
    subtitle: "Menu",
    leftItems: [
      { title: "EXPRESS", price: "4,200", description: "cafes", extra: "5,900" },
      { title: "AMERICAIN", price: "4,400", description: "cafes", extra: "6,200" },
      { title: "CAPUCIN", price: "4,600", description: "cafes", extra: "6,400" },
      { title: "CHOCOLAT AU LAIT", price: "4,400", description: "cafes" },
      { title: "CREME", price: "4,900", description: "cafes", extra: "6,700" },
      { title: "GRAND TASSE", price: "4,800", description: "cafes" },
      { title: "GRAND CRÈME", price: "5,500", description: "cafes" },
      { title: "CAPPUCINO", price: "6,200", description: "cafes" },
      { title: "AFFOGATO", price: "6,900", description: "cafes" },
      { title: "GRAND AFFOGATO", price: "10,900", description: "cafes" },
      { title: "PISTACHE", price: "14,600", description: "latte" },
      { title: "NOISETTE", price: "13,400", description: "latte" },
      { title: "NUTELLA / CARAMEL / BEURRE DE CACAHUÈTE / SPECULOSS", price: "12,700", description: "latte" },
      { title: "BEURRE DE CACAHUÈTE", price: "10,200", description: "glaces" },
      { title: "CARAMEL", price: "13,400", description: "glaces" },
      { title: "NUTELLA", price: "13,400", description: "glaces" },
      { title: "NOISETTE", price: "13,400", description: "glaces" },
      { title: "PISTACHE", price: "15,800", description: "glaces" },
      { title: "THÉ À LA MENTHE", price: "4,300", description: "the" },
      { title: "THÉ INFUSION", price: "5,900", description: "the" },
      { title: "THÉ AUX AMANDES", price: "8,900", description: "the" },
      { title: "THÉ AUX PIGNONS", price: "13,900", description: "the" },
      { title: "THÉ ZITOUNA", price: "21,200", description: "the" },
      { title: "CHOCO", price: "7,500", description: "chocolat" },
      { title: "CHOCO CHANTILLY", price: "8,500", description: "chocolat" },
      { title: "EAU 0,5", price: "2,700", description: "boissons-froides" },
      { title: "EAU 1L", price: "4,500", description: "boissons-froides" },
      { title: "GARCI", price: "3,900", description: "boissons-froides" },
      { title: "SODA", price: "4,600", description: "boissons-froides" },
      { title: "BOISSONS ÉNERGÉTIQUES", price: "9,500", description: "boissons-froides" },
      { title: "DÉTOX CLASSIQUE", price: "9,800", description: "detox", extra: "Menthe, citron, concombre" },
      { title: "DÉTOX IMMUNITÉ", price: "12,800", description: "detox", extra: "Orange, carotte, citron, gingembre" },
      { title: "DÉTOX ÉNERGÉTIQUE", price: "13,900", description: "detox", extra: "Carotte, betrave, orange, citron, menthe, gingembre" },
      { title: "BEURRE DE CACAHOUETTE", price: "13,900", description: "frappucino" },
      { title: "NOISETTE", price: "16,800", description: "frappucino" },
      { title: "NUTELLA", price: "16,800", description: "frappucino" },
      { title: "SPECULOSS", price: "16,800", description: "frappucino" },
      { title: "CARMEL", price: "16,800", description: "frappucino" },
      { title: "FRUITS ROUGE", price: "16,800", description: "smoothies" },
      { title: "FRAISE", price: "16,800", description: "smoothies" },
      { title: "PÊCHE BANANE", price: "16,800", description: "smoothies" },
      { title: "PINACOLADA", price: "16,800", description: "smoothies" },
      { title: "EXOTIC", price: "16,800", description: "smoothies" },
      { title: "VIRGIN MOJITO", price: "11,900", description: "mojito" },
      { title: "BLUE / RED MOJITO", price: "13,400", description: "mojito" },
      { title: "MOJITO ENERGIE", price: "16,900", description: "mojito" },
      { title: "CITRON", price: "9,900", description: "granite" },
      { title: "FRAISE", price: "11,900", description: "granite" },
      { title: "PINACOLADA", price: "13,900", description: "granite" },
      { title: "TEA FRAMBOISE", price: "9,700", description: "icetea" },
      { title: "TEA PÊCHE", price: "9,700", description: "icetea" },
      { title: "CITRONNADE", price: "8,200", description: "fresh-juice" },
      { title: "JUS D'ORANGE", price: "8,200", description: "fresh-juice" },
      { title: "CITRONNADE AUX AMANDES", price: "10,800", description: "fresh-juice" },
      { title: "FRAISE", price: "9,200", description: "fresh-juice" },
      { title: "BANANE", price: "9,800", description: "fresh-juice" },
      { title: "DATTES BANANE", price: "12,200", description: "fresh-juice" },
      { title: "JUS FRAISE BANANE", price: "12,200", description: "fresh-juice" },
      { title: "MAHBOUL TRIPLE D'AMOUR", price: "15,600", description: "fresh-juice", extra: "Banane, dattes, fruits secs, miel" },
      { title: "MAHBOUL ZITOUNA", price: "18,900", description: "fresh-juice", extra: "Jus de fruits, fruits secs, boule de glace" },
      { title: "ANANAS", price: "13,800", description: "matcha" },
      { title: "MANGUE", price: "13,800", description: "matcha" },
      { title: "NOISETTE", price: "15,800", description: "matcha" },
      { title: "VANILLE", price: "15,800", description: "matcha" },
      { title: "FRUITS ROUGES", price: "15,800", description: "matcha" },
      { title: "PISTACHE", price: "15,800", description: "matcha" },
      { title: "CARAMEL", price: "15,800", description: "matcha" }
    ],
    rightItems: []
  },
  // PAGE 27 - CHICHA
  {
    id: "chicha",
    label: "CHICHA",
    subtitle: "Classique & Adalya",
    leftItems: [
      { title: "MENTHE", price: "14,000", description: "classique" },
      { title: "RAISIN", price: "14,000", description: "classique" },
      { title: "RAISIN MENTHE", price: "14,000", description: "adalya" },
      { title: "LOVE", price: "16,000", description: "adalya" },
      { title: "CHIKH MONEY", price: "16,000", description: "adalya" }
    ],
    rightItems: []
  }
];
