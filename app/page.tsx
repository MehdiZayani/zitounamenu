"use client";
import React, { useEffect, useRef, useState } from "react";

interface MenuItem {
  title: string;
  price: string;
  description: string;
  extra?: string;
}

interface MenuSection {
  id: string;
  label: string;
  subtitle: string;
  items?: MenuItem[];
  leftItems?: MenuItem[];
  rightItems?: MenuItem[];
}

const menuData: MenuSection[] = [
  // PAGE 1 - PETIT DEJ
  {
    id: "petit-dej",
    label: "PETIT DEJ",
    subtitle: "Menu",
    leftItems: [
      { title: "RAPIDE", price: "12,800", description: "Mini omelette ou oeuf brouillé, eau 0,5l" },
      { title: "BOWL GRANOLA", price: "18,900", description: "Yaourt, granola, fruits secs, fruits" },
      { title: "LE SUCRÉ", price: "21,600", description: "Mini crêpe, mini gaufre, mini bol de granola, fondant, mini brioche perdu, nutella, speculoos" },
      { title: "LE SALÉ", price: "22,200", description: "Mini omelette, toast fromage et tomate, assiette de charcuterie et fromage" },
      { title: "LE TURK", price: "23,200", description: "Turkish eggs, assiette de charcuterie" },
      { title: "LE TUNISIEN", price: "22,500", description: "Ojja, mini omelette à la tunisienne, toast à la tunisienne, pâtisserie du jour" },
      { title: "LE NORVÉGIEN", price: "27,500", description: "Saumon fumé, oeuf brouillé, avocat, fromage blanc, salade" },
      { title: "L'ITALIEN", price: "25,000", description: "breasaola, oeuf brouillé, champignon, avocat, fromage blanc, salade" },
      { title: "ENGLISH", price: "20,900", description: "Chacuterie, fromage blanc, 2 oeufs au plat, champignons et tomates sautés" }
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
      { title: "NUTELLA", price: "12,000", description: "croissants-sucres" },
      { title: "NUTELLA BANANE OU FRAISE", price: "13,000", description: "croissants-sucres" },
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
      { title: "NUTELLA", price: "14,600", description: "gaufres-sucres" },
      { title: "NUTELLA BANANE", price: "15,800", description: "gaufres-sucres" },
      { title: "NUTELLA AMANDES", price: "16,600", description: "gaufres-sucres" },
      { title: "NUTELLA SPÉCULOOS", price: "16,900", description: "gaufres-sucres" },
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
      { title: "POULET ÉPICÉ", price: "17,900", description: "crepes-salees", extra: "Poulet épicé sauté avec du poivron et de l'oignion, mozzarella" },
      { title: "SAUMON FUMÉ", price: "23,800", description: "crepes-salees" },
      { title: "RICOTTA ÉPINARD", price: "14,600", description: "crepes-salees" },
      { title: "CHAMPIGNONS TRUFFÉS", price: "16,800", description: "crepes-salees" },
      { title: "TUNISIENNE", price: "16,500", description: "crepes-salees", extra: "Sauce à l'ail, harissa, thon, oeuf, piment de cayenne, olive" },
      { title: "GOURMANDE", price: "17,400", description: "crepes-salees", extra: "Jambon, thon, oeuf" },
      { title: "FOURRÉE POULET CHAMPIGNONS", price: "21,800", description: "crepes-salees", extra: "Poulet, champignons, mozzarella, sauce blanche" },
      { title: "NUTELLA", price: "14,600", description: "crepes-sucres" },
      { title: "NUTELLA BANANE", price: "15,800", description: "crepes-sucres" },
      { title: "NUTELLA AMANDES", price: "16,600", description: "crepes-sucres" },
      { title: "NUTELLA SPÉCULOOS", price: "16,900", description: "crepes-sucres" },
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
      { title: "NUTELLA NOISETTE", price: "16,900", description: "brioche-sucree" },
      { title: "NUTELLA BANANE", price: "17,800", description: "brioche-sucree" },
      { title: "NUTELLA FRAMBOISE OU FRAISE", price: "17,900", description: "brioche-sucree" },
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
      { title: "SALADE CÉSAR", price: "21,200", description: "Salade, poulet grillé, parmesan, croutons, noix" },
      { title: "SALADE POULET FUMÉ", price: "21,900", description: "Salade, poulet fumé, bresaola, croutons" },
      { title: "CAMEMBERT PANÉ", price: "20,200", description: "Roquette, tomate, camembert pané, date, noix, balsamique, miel" },
      { title: "BURRATA", price: "22,400", description: "Roquette, tomate, noix, burrata, bresaola, pesto, balsamique" },
      { title: "CREVETTES PANÉES", price: "32,800", description: "Roquette, crevettes panées aux amandes, sauce aigre douce" }
    ],
    rightItems: []
  },
  // PAGE 10B - OMELETTES
  {
    id: "omelettes",
    label: "OMELETTES",
    subtitle: "Menu",
    leftItems: [
      { title: "FROMAGE", price: "13,900", description: "" },
      { title: "THON", price: "17,900", description: "" },
      { title: "JAMBON FUMÉ", price: "17,900", description: "" },
      { title: "BRESAOLA", price: "19,500", description: "" },
      { title: "ÉPINARD FETA", price: "19,800", description: "" },
      { title: "LÉGÈRE AUX LÉGUMES", price: "16,900", description: "" },
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
      { title: "PUTTANESCA", price: "21,800", description: "" },
      { title: "SAUMON FUMÉ", price: "30,800", description: "Sauce rosée" },
      { title: "POULET PESTO", price: "23,900", description: "" },
      { title: "POULET CHAMPIGNONS", price: "23,900", description: "Sauce rosée ou blanche" },
      { title: "AGLIO, OLIO & GAMBAS", price: "33,200", description: "" },
      { title: "GAMBARI", price: "34,900", description: "Crevettes, courgettes" },
      { title: "CREVETTES CHAMPIGNONS", price: "35,600", description: "Sauce rosée" }
    ],
    rightItems: []
  },
  // PAGE 12 - LASAGNES / RISOTTO
  {
    id: "lasagnes",
    label: "LASAGNES",
    subtitle: "Menu",
    leftItems: [
      { title: "BOLOGNAISE", price: "26,400", description: "lasagnes" },
      { title: "LASAGNE", price: "27,800", description: "lasagnes" },
      { title: "CANNELLONI RICOTTA EPINARD", price: "21,600", description: "lasagnes" },
      { title: "CHAMPIGNONS TRUFFÉS", price: "34,800", description: "risotto" },
      { title: "POULET FUMÉ", price: "29,800", description: "risotto" },
      { title: "CREVETTES", price: "38,900", description: "risotto" }
    ],
    rightItems: []
  },
  // PAGE 13 - PLATS
  {
    id: "plats",
    label: "PLATS",
    subtitle: "Menu",
    leftItems: [
      { title: "ESCALOPE DE POULET GRILLÉE", price: "22,900", description: "" },
      { title: "ESCALOPE DE POULET PANÉ AUX AMANDES", price: "24,800", description: "" },
      { title: "ESCALOPE DE POULET SAUCE CHAMPIGNONS", price: "26,600", description: "" },
      { title: "POULET PARMIGIANA", price: "28,800", description: "Escalope de poulet pané, sauce tomate, mozzarella gratiné" },
      { title: "FILET DE BOEUF SAUCE AUX CHOIX", price: "46,200", description: "Champignons, truffe, poivre, fromage, chimichurri" },
      { title: "FILET DE LOUP SAUCE CITRON", price: "32,000", description: "" }
    ],
    rightItems: []
  },
  // PAGE 14 - BOWLS
  {
    id: "bowls",
    label: "BOWLS",
    subtitle: "Menu",
    leftItems: [
      { title: "BEEF BOWL", price: "44,800", description: "Riz sauté avec du soja, filet de boeuf laqué au soja, tomates cerise, parmesan" },
      { title: "CHICKEN LEMON BOWL", price: "20,200", description: "Riz sauté au citron, poulet grillé, légumes" },
      { title: "TERIYAKI POULET", price: "23,200", description: "Riz sauté avec du soja, émincé de poulet sauce teriyaki, légumes" },
      { title: "PROTÉINÉ", price: "21,900", description: "Riz, poulet grillé, 2 oeufs dur, avocat" }
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
      { title: "SANDWICH THON", price: "14,900", description: "Mayonnaise, harissa, thon, salade, oeuf" }
    ],
    rightItems: []
  },
  // PAGE 16-17 - PIZZAS (Classiques + Gourmet)
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



  // PAGE 23 - GLACES
 
  // PAGE 24-26 - BOISSONS (Cafés, Thé, Boissons, Frappucino, Mojito, Fresh Juice, Matcha)
  {
    id: "boissons",
    label: "BOISSONS",
    subtitle: "Menu",
    leftItems: [
      // Cafés classiques (avec prix Nespresso dans extra)
      { title: "EXPRESS", price: "3,900", description: "cafes", extra: "5,900" },
      { title: "AMERICAIN", price: "4,200", description: "cafes", extra: "6,200" },
      { title: "CAPPUCIN", price: "4,300", description: "cafes", extra: "6,400" },
      { title: "CAFÉ CRÈME", price: "4,600", description: "cafes", extra: "6,700" },
      { title: "GRAND TASSE", price: "4,500", description: "cafes" },
      { title: "GRAND CRÈME", price: "4,800", description: "cafes" },
      { title: "CAPPUCINO", price: "5,700", description: "cafes" },
      { title: "AFFOGATO", price: "6,900", description: "cafes" },
      { title: "GRAND AFFOGATO", price: "10,900", description: "cafes" },
      // Cafés Latte
      { title: "PISTACHE", price: "14,600", description: "latte" },
      { title: "NOISETTE", price: "13,400", description: "latte" },
      { title: "NUTELLA / CARAMEL / BEURRE DE CACAHUÈTE / SPECULOSS", price: "12,700", description: "latte" },
      // Cafés Glacés
      { title: "BEURRE DE CACAHUÈTE", price: "10,200", description: "glaces" },
      { title: "CARAMEL", price: "13,400", description: "glaces" },
      { title: "NUTELLA", price: "13,400", description: "glaces" },
      { title: "NOISETTE", price: "13,400", description: "glaces" },
      { title: "PISTACHE", price: "15,800", description: "glaces" },
      // Thé
      { title: "THÉ À LA MENTHE", price: "3,900", description: "the" },
      { title: "THÉ INFUSION", price: "5,900", description: "the" },
      { title: "THÉ AUX AMANDES", price: "8,900", description: "the" },
      { title: "THÉ AUX PIGNONS", price: "13,900", description: "the" },
      // Chocolat Chaud
      { title: "CHOCO", price: "7,500", description: "chocolat" },
      { title: "CHOCO CHANTILLY", price: "8,500", description: "chocolat" },
      // Boissons Froides
      { title: "EAU 0,5", price: "2,500", description: "boissons-froides" },
      { title: "EAU 1L", price: "3,500", description: "boissons-froides" },
      { title: "GARCI", price: "3,900", description: "boissons-froides" },
      { title: "SODA", price: "4,600", description: "boissons-froides" },
      { title: "BOISSONS ÉNERGÉTIQUES", price: "9,500", description: "boissons-froides" },
      // Détox
      { title: "DÉTOX CLASSIQUE", price: "9,800", description: "detox", extra: "Menthe, citron, concombre" },
      { title: "DÉTOX IMMUNITÉ", price: "12,800", description: "detox", extra: "Orange, carotte, citron, gingembre" },
      { title: "DÉTOX ÉNERGÉTIQUE", price: "13,900", description: "detox", extra: "Carotte, betrave, orange, citron, menthe, gingembre" },
      // Frappucino
      { title: "BEURRE DE CACAHOUETTE", price: "13,900", description: "frappucino" },
      { title: "NOISETTE", price: "16,800", description: "frappucino" },
      { title: "NUTELLA", price: "16,800", description: "frappucino" },
      { title: "SPECULOSS", price: "16,800", description: "frappucino" },
      { title: "CARMEL", price: "16,800", description: "frappucino" },
      // Smoothies
      { title: "FRUITS ROUGE", price: "16,800", description: "smoothies" },
      { title: "FRAISE", price: "16,800", description: "smoothies" },
      { title: "PÊCHE BANANE", price: "16,800", description: "smoothies" },
      { title: "PINACOLADA", price: "16,800", description: "smoothies" },
      { title: "EXOTIC", price: "16,800", description: "smoothies" },
      // Mojito
      { title: "VIRGIN MOJITO", price: "11,900", description: "mojito" },
      { title: "BLUE / RED MOJITO", price: "13,400", description: "mojito" },
      { title: "MOJITO ENERGIE", price: "16,900", description: "mojito" },
      // Granité
      { title: "CITRON", price: "9,900", description: "granite" },
      { title: "FRAISE", price: "11,900", description: "granite" },
      { title: "PINACOLADA", price: "13,900", description: "granite" },
      // Ice Tea
      { title: "TEA FRAMBOISE", price: "9,700", description: "icetea" },
      { title: "TEA PÊCHE", price: "9,700", description: "icetea" },
      // Fresh Juice
      { title: "CITRONNADE", price: "7,800", description: "fresh-juice" },
      { title: "JUS D'ORANGE", price: "8,200", description: "fresh-juice" },
      { title: "CITRONNADE AUX AMANDES", price: "10,800", description: "fresh-juice" },
      { title: "FRAISE", price: "9,200", description: "fresh-juice" },
      { title: "BANANE", price: "9,800", description: "fresh-juice" },
      { title: "DATTES BANANE", price: "12,200", description: "fresh-juice" },
      { title: "TRIPPLE D'AMOUR", price: "15,600", description: "fresh-juice", extra: "Banane, dattes, fruits secs, miel" },
      { title: "MAHBOUL ZITOUNA", price: "18,900", description: "fresh-juice", extra: "Jus de fruits, fruits secs, boule de glace" },
      // Matcha
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
      { title: "MENTHE", price: "12,000", description: "classique" },
      { title: "RAISIN", price: "12,000", description: "classique" },
      { title: "RAISIN MENTHE", price: "12,000", description: "adalya" },
      { title: "LOVE", price: "15,000", description: "adalya" },
      { title: "CHIKH MONEY", price: "15,000", description: "adalya" }
    ],
    rightItems: []
  }
];

const PatesMenu = ({ section }: { section: MenuSection }) => {
  const items = section.leftItems || [];

  return (
    <div
      className="min-h-fit w-screen flex items-start justify-center"
      style={{
        backgroundImage: "url('/coffee/boissons-bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "scroll"
      }}
    >
      <div
        className="w-[92vw] sm:w-[88vw] min-h-auto sm:min-h-[88vh] flex flex-col items-stretch justify-start p-4 sm:p-8 relative"
        style={{ maxWidth: 700 }}
      >
        {/* PÂTES Title */}
        <div className="text-center mb-8 mt-6">
          <h1
            className="text-3xl sm:text-4xl md:text-[56px] tracking-widest"
            style={{ fontFamily: "'LaLuxes', serif", color: "#c9b896", letterSpacing: "0.15em", fontWeight: 400, marginBottom: 0 }}
          >
            PÂTES
          </h1>
          <span
            className="block text-xl sm:text-2xl md:text-[36px] -mt-1"
            style={{ fontFamily: "'Tangerine', cursive", color: "#c9782b", letterSpacing: "0.05em" }}
          >
            Menu
          </span>
          <div className="mx-auto mt-3" style={{ width: 50, borderTop: "1px solid rgba(201,184,150,0.5)" }} />
        </div>

        {/* Items in alternating left/right pattern */}
        <div className="flex flex-col gap-5">
          {items.map((item, idx) => {
            const isLeft = idx % 2 === 0;
            return (
              <div
                key={idx}
                className={`w-full sm:w-[80%] ${isLeft ? '' : 'sm:ml-auto'}`}
              >
                <div className="flex justify-between items-center px-2">
                  <h3
                    className="text-base sm:text-lg md:text-[20px] tracking-wider flex-1"
                    style={{ fontFamily: "'LaLuxes', serif", color: "#efe8d6", letterSpacing: "0.08em" }}
                  >
                    {item.title}
                  </h3>
                  <span
                    className="text-lg sm:text-xl md:text-[22px] ml-2"
                    style={{ fontFamily: "'LaLuxes', serif", color: "#efe8d6" }}
                  >
                    {item.price}
                  </span>
                </div>
                <div className="mt-2" style={{ borderTop: "1px solid rgba(201,184,150,0.4)" }} />
                {item.description && (
                  <p className="text-sm mt-2 px-2" style={{ color: "#c9b896", fontFamily: "'LaLuxes', serif" }}>
                    {item.description}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        <div className="pb-2" />
      </div>
    </div>
  );
};

const SaladesMenu = ({ section }: { section: MenuSection }) => {
  const items = section.leftItems || [];

  return (
    <div
      className="min-h-fit w-screen flex items-start justify-center"
      style={{
        backgroundImage: "url('/coffee/boissons-bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "scroll"
      }}
    >
      <div
        className="w-[92vw] sm:w-[88vw] min-h-auto sm:min-h-[88vh] flex flex-col items-stretch justify-start p-4 sm:p-8 relative"
        style={{ maxWidth: 700 }}
      >
        {/* SALADE Title */}
        <div className="text-center mb-8 mt-6">
          <h1
            className="text-3xl sm:text-4xl md:text-[56px] tracking-widest"
            style={{ fontFamily: "'LaLuxes', serif", color: "#c9b896", letterSpacing: "0.15em", fontWeight: 400, marginBottom: 0 }}
          >
            SALADE
          </h1>
          <span
            className="block text-xl sm:text-2xl md:text-[36px] -mt-1"
            style={{ fontFamily: "'Tangerine', cursive", color: "#c9782b", letterSpacing: "0.05em" }}
          >
            Menu
          </span>
          <div className="mx-auto mt-3" style={{ width: 50, borderTop: "1px solid rgba(201,184,150,0.5)" }} />
        </div>

        {/* Items in alternating left/right pattern */}
        <div className="flex flex-col gap-5">
          {items.map((item, idx) => {
            const isLeft = idx % 2 === 0;
            return (
              <div
                key={idx}
                className={`w-full sm:w-[80%] ${isLeft ? '' : 'sm:ml-auto'}`}
              >
                <div className="flex justify-between items-center px-2">
                  <h3
                    className="text-base sm:text-lg md:text-[20px] tracking-wider flex-1"
                    style={{ fontFamily: "'LaLuxes', serif", color: "#efe8d6", letterSpacing: "0.08em" }}
                  >
                    {item.title}
                  </h3>
                  <span
                    className="text-lg sm:text-xl md:text-[22px] ml-2"
                    style={{ fontFamily: "'LaLuxes', serif", color: "#efe8d6" }}
                  >
                    {item.price}
                  </span>
                </div>
                <div className="mt-2" style={{ borderTop: "1px solid rgba(201,184,150,0.4)" }} />
                {item.description && (
                  <p className="text-sm mt-2 px-2" style={{ color: "#c9b896", fontFamily: "'LaLuxes', serif" }}>
                    {item.description}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        {/* Salad Bowl Illustration */}
        <div className="flex justify-center mt-8 mb-4">
          <svg width="120" height="100" viewBox="0 0 120 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Bowl */}
            <ellipse cx="60" cy="70" rx="50" ry="20" stroke="#c9b896" strokeWidth="1.5" fill="none" />
            <path d="M10 70 Q15 95 60 95 Q105 95 110 70" stroke="#c9b896" strokeWidth="1.5" fill="none" />
            {/* Salad contents */}
            <ellipse cx="60" cy="55" rx="40" ry="15" stroke="#c9b896" strokeWidth="1" fill="none" strokeDasharray="3 2" />
            {/* Leaves */}
            <path d="M35 50 Q40 35 50 45" stroke="#c9b896" strokeWidth="1" fill="none" />
            <path d="M45 48 Q55 30 60 45" stroke="#c9b896" strokeWidth="1" fill="none" />
            <path d="M55 50 Q65 32 75 48" stroke="#c9b896" strokeWidth="1" fill="none" />
            <path d="M70 50 Q80 38 85 52" stroke="#c9b896" strokeWidth="1" fill="none" />
            {/* Tomato slices */}
            <circle cx="42" cy="58" r="6" stroke="#c9b896" strokeWidth="1" fill="none" />
            <circle cx="78" cy="56" r="5" stroke="#c9b896" strokeWidth="1" fill="none" />
            {/* Lemon/citrus slice */}
            <path d="M55 62 Q60 55 65 62" stroke="#c9b896" strokeWidth="1" fill="none" />
            <path d="M57 60 L60 58 L63 60" stroke="#c9b896" strokeWidth="0.8" fill="none" />
            {/* Small elements */}
            <circle cx="50" cy="52" r="2" stroke="#c9b896" strokeWidth="0.8" fill="none" />
            <circle cx="70" cy="54" r="2" stroke="#c9b896" strokeWidth="0.8" fill="none" />
            <circle cx="60" cy="68" r="3" stroke="#c9b896" strokeWidth="0.8" fill="none" />
          </svg>
        </div>

        <div className="pb-2" />
      </div>
    </div>
  );
};

const OmeletteMenu = ({ section }: { section: MenuSection }) => {
  const items = section.leftItems || [];

  return (
    <div
      className="min-h-fit w-screen flex items-start justify-center"
      style={{
        backgroundImage: "url('/coffee/boissons-bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "scroll"
      }}
    >
      <div
        className="w-[92vw] sm:w-[88vw] min-h-auto sm:min-h-[88vh] flex flex-col items-stretch justify-start p-4 sm:p-8 relative"
        style={{ maxWidth: 700 }}
      >
        {/* OMELETTE Title */}
        <div className="text-center mb-8 mt-6">
          <h1
            className="text-3xl sm:text-4xl md:text-[56px] tracking-widest"
            style={{ fontFamily: "'LaLuxes', serif", color: "#c9b896", letterSpacing: "0.15em", fontWeight: 400, marginBottom: 0 }}
          >
            OMELETTE
          </h1>
          <span
            className="block text-xl sm:text-2xl md:text-[36px] -mt-1"
            style={{ fontFamily: "'Tangerine', cursive", color: "#c9782b", letterSpacing: "0.05em" }}
          >
            Menu
          </span>
          <div className="mx-auto mt-3" style={{ width: 50, borderTop: "1px solid rgba(201,184,150,0.5)" }} />
        </div>

        {/* Items in alternating left/right pattern */}
        <div className="flex flex-col gap-5">
          {items.map((item, idx) => {
            const isLeft = idx % 2 === 0;
            return (
              <div
                key={idx}
                className={`w-full sm:w-[80%] ${isLeft ? '' : 'sm:ml-auto'}`}
              >
                <div className="flex justify-between items-center px-2">
                  <h3
                    className="text-base sm:text-lg md:text-[20px] tracking-wider flex-1"
                    style={{ fontFamily: "'LaLuxes', serif", color: "#efe8d6", letterSpacing: "0.08em" }}
                  >
                    {item.title}
                  </h3>
                  <span
                    className="text-lg sm:text-xl md:text-[22px] ml-2"
                    style={{ fontFamily: "'LaLuxes', serif", color: "#efe8d6" }}
                  >
                    {item.price}
                  </span>
                </div>
                <div className="mt-2" style={{ borderTop: "1px solid rgba(201,184,150,0.4)" }} />
                {item.description && (
                  <p className="text-sm mt-2 px-2" style={{ color: "#c9b896", fontFamily: "'LaLuxes', serif" }}>
                    {item.description}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        {/* Omelette Illustration */}
        <div className="flex justify-center mt-8 mb-4">
          <svg width="140" height="100" viewBox="0 0 140 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Plate */}
            <ellipse cx="70" cy="70" rx="55" ry="18" stroke="#c9b896" strokeWidth="1.5" fill="none" />
            <ellipse cx="70" cy="68" rx="48" ry="14" stroke="#c9b896" strokeWidth="1" fill="none" />
            {/* Omelette shape */}
            <path d="M30 60 Q40 35 70 40 Q100 35 110 60 Q100 75 70 72 Q40 75 30 60" stroke="#c9b896" strokeWidth="1.5" fill="none" />
            {/* Fold line */}
            <path d="M45 55 Q70 48 95 55" stroke="#c9b896" strokeWidth="1" fill="none" strokeDasharray="4 3" />
            {/* Herbs/garnish */}
            <path d="M55 50 Q58 42 62 48" stroke="#c9b896" strokeWidth="0.8" fill="none" />
            <path d="M75 48 Q78 40 82 46" stroke="#c9b896" strokeWidth="0.8" fill="none" />
            <circle cx="68" cy="52" r="2" stroke="#c9b896" strokeWidth="0.8" fill="none" />
            <circle cx="78" cy="54" r="1.5" stroke="#c9b896" strokeWidth="0.8" fill="none" />
            {/* Fork */}
            <path d="M125 55 L125 95" stroke="#c9b896" strokeWidth="1.2" fill="none" />
            <path d="M120 55 L120 70" stroke="#c9b896" strokeWidth="1" fill="none" />
            <path d="M125 55 L125 70" stroke="#c9b896" strokeWidth="1" fill="none" />
            <path d="M130 55 L130 70" stroke="#c9b896" strokeWidth="1" fill="none" />
            <path d="M120 70 Q125 73 130 70" stroke="#c9b896" strokeWidth="1" fill="none" />
          </svg>
        </div>

        <div className="pb-2" />
      </div>
    </div>
  );
};

const GaufresMenu = ({ section }: { section: MenuSection }) => {
  const items = section.leftItems || [];
  const gaufresSaleesItems = items.filter(item => item.description === "gaufres-salees");
  const gaufresSucresItems = items.filter(item => item.description === "gaufres-sucres");

  const renderItems = (itemsList: MenuItem[]) => (
    <div className="flex flex-col gap-4">
      {itemsList.map((item, idx) => {
        const isLeft = idx % 2 === 0;
        return (
          <div
            key={idx}
            className={`w-full sm:w-[80%] ${isLeft ? '' : 'sm:ml-auto'}`}
          >
            <div className="flex justify-between items-center px-2">
              <h3
                className="text-base sm:text-lg md:text-[20px] tracking-wider flex-1"
                style={{ fontFamily: "'LaLuxes', serif", color: "#efe8d6", letterSpacing: "0.08em" }}
              >
                {item.title}
              </h3>
              <span
                className="text-lg sm:text-xl md:text-[22px] ml-2"
                style={{ fontFamily: "'LaLuxes', serif", color: "#efe8d6" }}
              >
                {item.price}
              </span>
            </div>
            <div className="mt-2" style={{ borderTop: "1px solid rgba(201,184,150,0.4)" }} />
            {item.extra && (
              <p className="text-sm mt-2 px-2" style={{ color: "#c9b896", fontFamily: "'LaLuxes', serif" }}>
                {item.extra}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );

  return (
    <div
      className="min-h-fit w-screen flex items-start justify-center"
      style={{
        backgroundImage: "url('/coffee/boissons-bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "scroll"
      }}
    >
      <div
        className="w-[92vw] sm:w-[88vw] min-h-auto sm:min-h-[88vh] flex flex-col items-stretch justify-start p-4 sm:p-8 relative"
        style={{ maxWidth: 700 }}
      >
        {/* GAUFRES Title */}
        <div className="text-center mb-6 mt-6">
          <h1
            className="text-3xl sm:text-4xl md:text-[56px] tracking-widest"
            style={{ fontFamily: "'LaLuxes', serif", color: "#c9b896", letterSpacing: "0.15em", fontWeight: 400, marginBottom: 0 }}
          >
            GAUFRES
          </h1>
          <span
            className="block text-xl sm:text-2xl md:text-[36px] -mt-1"
            style={{ fontFamily: "'Tangerine', cursive", color: "#c9782b", letterSpacing: "0.05em" }}
          >
            Menu
          </span>
          <div className="mx-auto mt-3" style={{ width: 50, borderTop: "1px solid rgba(201,184,150,0.5)" }} />
        </div>

        {/* Gaufres Salées Section */}
        <div className="text-center mb-4">
          <span
            className="text-lg sm:text-xl md:text-[28px]"
            style={{ fontFamily: "'Tangerine', cursive", color: "#c9782b", letterSpacing: "0.05em" }}
          >
            Salées
          </span>
        </div>
        {renderItems(gaufresSaleesItems)}

        {/* Gaufres Sucrées Section */}
        <div className="text-center mb-4 mt-8">
          <span
            className="text-lg sm:text-xl md:text-[28px]"
            style={{ fontFamily: "'Tangerine', cursive", color: "#c9782b", letterSpacing: "0.05em" }}
          >
            Sucrées
          </span>
        </div>
        {renderItems(gaufresSucresItems)}

        <div className="pb-2" />
      </div>
    </div>
  );
};

const CrepesMenu = ({ section }: { section: MenuSection }) => {
  const items = section.leftItems || [];
  const crepesSaleesItems = items.filter(item => item.description === "crepes-salees");
  const crepesSucresItems = items.filter(item => item.description === "crepes-sucres");

  const renderItems = (itemsList: MenuItem[]) => (
    <div className="flex flex-col gap-4">
      {itemsList.map((item, idx) => {
        const isLeft = idx % 2 === 0;
        return (
          <div
            key={idx}
            className={`w-full sm:w-[80%] ${isLeft ? '' : 'sm:ml-auto'}`}
          >
            <div className="flex justify-between items-center px-2">
              <h3
                className="text-base sm:text-lg md:text-[20px] tracking-wider flex-1"
                style={{ fontFamily: "'LaLuxes', serif", color: "#efe8d6", letterSpacing: "0.08em" }}
              >
                {item.title}
              </h3>
              <span
                className="text-lg sm:text-xl md:text-[22px] ml-2"
                style={{ fontFamily: "'LaLuxes', serif", color: "#efe8d6" }}
              >
                {item.price}
              </span>
            </div>
            <div className="mt-2" style={{ borderTop: "1px solid rgba(201,184,150,0.4)" }} />
            {item.extra && (
              <p className="text-xs mt-1 px-2" style={{ color: "#c9b896", fontFamily: "'LaLuxes', serif" }}>
                {item.extra}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );

  return (
    <div
      className="min-h-fit w-screen flex items-start justify-center"
      style={{
        backgroundImage: "url('/coffee/boissons-bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "scroll"
      }}
    >
      <div
        className="w-[92vw] sm:w-[88vw] min-h-auto sm:min-h-[88vh] flex flex-col items-stretch justify-start p-4 sm:p-8 relative"
        style={{ maxWidth: 700 }}
      >
        {/* CRÊPES Title */}
        <div className="text-center mb-6 mt-6">
          <h1
            className="text-3xl sm:text-4xl md:text-[56px] tracking-widest"
            style={{ fontFamily: "'LaLuxes', serif", color: "#c9b896", letterSpacing: "0.15em", fontWeight: 400, marginBottom: 0 }}
          >
            CRÊPES
          </h1>
          <span
            className="block text-xl sm:text-2xl md:text-[36px] -mt-1"
            style={{ fontFamily: "'Tangerine', cursive", color: "#c9782b", letterSpacing: "0.05em" }}
          >
            Menu
          </span>
          <div className="mx-auto mt-3" style={{ width: 50, borderTop: "1px solid rgba(201,184,150,0.5)" }} />
        </div>

        {/* Crêpes Salées Section */}
        <div className="text-center mb-4">
          <span
            className="text-lg sm:text-xl md:text-[28px]"
            style={{ fontFamily: "'Tangerine', cursive", color: "#c9782b", letterSpacing: "0.05em" }}
          >
            Salées
          </span>
        </div>
        {renderItems(crepesSaleesItems)}

        {/* Crêpes Sucrées Section */}
        <div className="text-center mb-4 mt-8">
          <span
            className="text-lg sm:text-xl md:text-[28px]"
            style={{ fontFamily: "'Tangerine', cursive", color: "#c9782b", letterSpacing: "0.05em" }}
          >
            Sucrées
          </span>
        </div>
        {renderItems(crepesSucresItems)}

        <div className="pb-2" />
      </div>
    </div>
  );
};

const BriocheMenu = ({ section }: { section: MenuSection }) => {
  const items = section.leftItems || [];
  const briocheSucreesItems = items.filter(item => item.description === "brioche-sucree");
  const briocheSaleesItems = items.filter(item => item.description === "brioche-salee");

  const renderItems = (itemsList: MenuItem[]) => (
    <div className="flex flex-col gap-4">
      {itemsList.map((item, idx) => {
        const isLeft = idx % 2 === 0;
        return (
          <div
            key={idx}
            className={`w-full sm:w-[80%] ${isLeft ? '' : 'sm:ml-auto'}`}
          >
            <div className="flex justify-between items-center px-2">
              <h3
                className="text-base sm:text-lg md:text-[20px] tracking-wider flex-1"
                style={{ fontFamily: "'LaLuxes', serif", color: "#efe8d6", letterSpacing: "0.08em" }}
              >
                {item.title}
              </h3>
              <span
                className="text-lg sm:text-xl md:text-[22px] ml-2"
                style={{ fontFamily: "'LaLuxes', serif", color: "#efe8d6" }}
              >
                {item.price}
              </span>
            </div>
            <div className="mt-2" style={{ borderTop: "1px solid rgba(201,184,150,0.4)" }} />
          </div>
        );
      })}
    </div>
  );

  return (
    <div
      className="min-h-fit w-screen flex items-start justify-center"
      style={{
        backgroundImage: "url('/coffee/boissons-bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "scroll"
      }}
    >
      <div
        className="w-[92vw] sm:w-[88vw] min-h-auto sm:min-h-[88vh] flex flex-col items-stretch justify-start p-4 sm:p-8 relative"
        style={{ maxWidth: 700 }}
      >
        {/* BRIOCHE PERDUE Title */}
        <div className="text-center mb-6 mt-6">
          <h1
            className="text-2xl sm:text-3xl md:text-[48px] tracking-widest"
            style={{ fontFamily: "'LaLuxes', serif", color: "#c9b896", letterSpacing: "0.12em", fontWeight: 400, marginBottom: 0 }}
          >
            BRIOCHE PERDUE
          </h1>
          <span
            className="block text-xl sm:text-2xl md:text-[36px] -mt-1"
            style={{ fontFamily: "'Tangerine', cursive", color: "#c9782b", letterSpacing: "0.05em" }}
          >
            Menu
          </span>
          <div className="mx-auto mt-3" style={{ width: 50, borderTop: "1px solid rgba(201,184,150,0.5)" }} />
        </div>

        {/* Sucrées Section */}
        <div className="text-center mb-4">
          <span
            className="text-lg sm:text-xl md:text-[28px]"
            style={{ fontFamily: "'Tangerine', cursive", color: "#c9782b", letterSpacing: "0.05em" }}
          >
            Sucrées
          </span>
        </div>
        {renderItems(briocheSucreesItems)}

        {/* Salées Section */}
        <div className="text-center mb-4 mt-8">
          <span
            className="text-lg sm:text-xl md:text-[28px]"
            style={{ fontFamily: "'Tangerine', cursive", color: "#c9782b", letterSpacing: "0.05em" }}
          >
            Salées
          </span>
        </div>
        {renderItems(briocheSaleesItems)}

        <div className="pb-2" />
      </div>
    </div>
  );
};

const CroissantsMenu = ({ section }: { section: MenuSection }) => {
  const items = section.leftItems || [];
  const croissantsSalesItems = items.filter(item => item.description === "croissants-sales");
  const croissantsSucresItems = items.filter(item => item.description === "croissants-sucres");

  const renderItems = (itemsList: MenuItem[]) => (
    <div className="flex flex-col gap-4">
      {itemsList.map((item, idx) => {
        const isLeft = idx % 2 === 0;
        return (
          <div
            key={idx}
            className={`w-full sm:w-[80%] ${isLeft ? '' : 'sm:ml-auto'}`}
          >
            <div className="flex justify-between items-center px-2">
              <h3
                className="text-base sm:text-lg md:text-[20px] tracking-wider flex-1"
                style={{ fontFamily: "'LaLuxes', serif", color: "#efe8d6", letterSpacing: "0.08em" }}
              >
                {item.title}
              </h3>
              <span
                className="text-lg sm:text-xl md:text-[22px] ml-2"
                style={{ fontFamily: "'LaLuxes', serif", color: "#efe8d6" }}
              >
                {item.price}
              </span>
            </div>
            <div className="mt-2" style={{ borderTop: "1px solid rgba(201,184,150,0.4)" }} />
            {item.extra && (
              <p className="text-xs mt-1 px-2" style={{ color: "#c9b896", fontFamily: "'LaLuxes', serif" }}>
                {item.extra}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );

  return (
    <div
      className="min-h-fit w-screen flex items-start justify-center"
      style={{
        backgroundImage: "url('/coffee/boissons-bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "scroll"
      }}
    >
      <div
        className="w-[92vw] sm:w-[88vw] min-h-auto sm:min-h-[88vh] flex flex-col items-stretch justify-start p-4 sm:p-8 relative"
        style={{ maxWidth: 700 }}
      >
        {/* CROISSANTS Title */}
        <div className="text-center mb-6 mt-6">
          <h1
            className="text-2xl sm:text-3xl md:text-[48px] tracking-widest"
            style={{ fontFamily: "'LaLuxes', serif", color: "#c9b896", letterSpacing: "0.12em", fontWeight: 400, marginBottom: 0 }}
          >
            CROISSANTS
          </h1>
          <span
            className="block text-xl sm:text-2xl md:text-[36px] -mt-1"
            style={{ fontFamily: "'Tangerine', cursive", color: "#c9782b", letterSpacing: "0.05em" }}
          >
            Menu
          </span>
          <div className="mx-auto mt-3" style={{ width: 50, borderTop: "1px solid rgba(201,184,150,0.5)" }} />
        </div>

        {/* Salés Section */}
        <div className="text-center mb-4">
          <span
            className="text-lg sm:text-xl md:text-[28px]"
            style={{ fontFamily: "'Tangerine', cursive", color: "#c9782b", letterSpacing: "0.05em" }}
          >
            Salés
          </span>
        </div>
        {renderItems(croissantsSalesItems)}

        {/* Sucrés Section */}
        <div className="text-center mb-4 mt-8">
          <span
            className="text-lg sm:text-xl md:text-[28px]"
            style={{ fontFamily: "'Tangerine', cursive", color: "#c9782b", letterSpacing: "0.05em" }}
          >
            Sucrés
          </span>
        </div>
        {renderItems(croissantsSucresItems)}

        <div className="pb-2" />
      </div>
    </div>
  );
};

const CroissantsSalesMenu = ({ section }: { section: MenuSection }) => {
  const items = section.leftItems || [];

  const supplements = [
    { left: "Oeuf : 1,5 dt", right: "Saumon fumé : 8 dt" },
    { left: "Emmental : 3 dt", right: "Avocat : 5 dt" },
    { left: "Champignons sautés : 4 dt", right: "Burrata : 6 dt" },
    { left: "Sauce fromage : 2 dt", right: "Croissant : 3 dt" },
    { left: "Feta : 4 dt", right: "Pain au chocolat : 3,5 dt" },
    { left: "Truffe : 6 dt", right: "Frites : 4,5 dt" }
  ];

  return (
    <div
      className="min-h-fit w-screen flex items-start justify-center"
      style={{
        backgroundImage: "url('/coffee/boissons-bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "scroll"
      }}
    >
      <div
        className="w-[92vw] sm:w-[88vw] min-h-auto sm:min-h-[88vh] flex flex-col items-stretch justify-start p-4 sm:p-8 relative"
        style={{ maxWidth: 700 }}
      >
        {/* CROISSANTS Salés Title */}
        <div className="text-center mb-4 mt-6">
          <h1
            className="text-3xl sm:text-4xl md:text-[56px] tracking-widest"
            style={{ fontFamily: "'LaLuxes', serif", color: "#c9b896", letterSpacing: "0.15em", fontWeight: 400, marginBottom: 0 }}
          >
            CROISSANTS
          </h1>
          <span
            className="block text-xl sm:text-2xl md:text-[36px] -mt-1"
            style={{ fontFamily: "'Tangerine', cursive", color: "#c9782b", letterSpacing: "0.05em" }}
          >
            Salés
          </span>
        </div>

        {/* Note */}
        <p className="text-center text-sm mb-6" style={{ color: "#c9b896", fontFamily: "'LaLuxes', serif" }}>
          Tous nos croissants salés sont servis avec un café et un mini jus
        </p>
        <div className="mx-auto mb-6" style={{ width: 50, borderTop: "1px solid rgba(201,184,150,0.5)" }} />

        {/* First item with croissant illustration */}
        <div className="flex gap-4 mb-4">
          <div className="flex-1">
            <div className="flex justify-between items-center px-2">
              <h3
                className="text-base sm:text-lg md:text-[20px] tracking-wider flex-1"
                style={{ fontFamily: "'LaLuxes', serif", color: "#efe8d6", letterSpacing: "0.08em" }}
              >
                {items[0]?.title}
              </h3>
              <span
                className="text-lg sm:text-xl md:text-[22px] ml-2"
                style={{ fontFamily: "'LaLuxes', serif", color: "#efe8d6" }}
              >
                {items[0]?.price}
              </span>
            </div>
            <div className="mt-2" style={{ borderTop: "1px solid rgba(201,184,150,0.4)" }} />
            {items[0]?.description && (
              <p className="text-sm mt-2 px-2" style={{ color: "#c9b896", fontFamily: "'LaLuxes', serif" }}>
                {items[0].description}
              </p>
            )}
          </div>
          {/* Croissant Illustration */}
          <div className="hidden sm:flex items-start justify-center" style={{ width: "25%" }}>
            <svg width="90" height="60" viewBox="0 0 90 60" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 35 Q20 15 45 20 Q70 15 80 35 Q75 45 45 42 Q15 45 10 35" stroke="#c9b896" strokeWidth="1.5" fill="none" />
              <path d="M15 33 Q25 20 45 23 Q65 20 75 33" stroke="#c9b896" strokeWidth="1" fill="none" />
              <path d="M20 31 Q35 22 45 25 Q55 22 70 31" stroke="#c9b896" strokeWidth="0.8" fill="none" />
              <path d="M25 30 Q40 24 45 26 Q50 24 65 30" stroke="#c9b896" strokeWidth="0.6" fill="none" />
            </svg>
          </div>
        </div>

        {/* Remaining items in alternating pattern */}
        <div className="flex flex-col gap-5">
          {items.slice(1).map((item, idx) => {
            const isLeft = idx % 2 === 0;
            return (
              <div
                key={idx}
                className={`w-full sm:w-[80%] ${isLeft ? 'sm:ml-auto' : ''}`}
              >
                <div className="flex justify-between items-center px-2">
                  <h3
                    className="text-base sm:text-lg md:text-[20px] tracking-wider flex-1"
                    style={{ fontFamily: "'LaLuxes', serif", color: "#efe8d6", letterSpacing: "0.08em" }}
                  >
                    {item.title}
                  </h3>
                  <span
                    className="text-lg sm:text-xl md:text-[22px] ml-2"
                    style={{ fontFamily: "'LaLuxes', serif", color: "#efe8d6" }}
                  >
                    {item.price}
                  </span>
                </div>
                <div className="mt-2" style={{ borderTop: "1px solid rgba(201,184,150,0.4)" }} />
                {item.description && (
                  <p className="text-sm mt-2 px-2" style={{ color: "#c9b896", fontFamily: "'LaLuxes', serif" }}>
                    {item.description}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        {/* SUPPLÉMENTS Section */}
        <div className="mt-12">
          <h2
            className="text-xl sm:text-2xl md:text-[32px] tracking-widest mb-4"
            style={{ fontFamily: "'LaLuxes', serif", color: "#c9b896", letterSpacing: "0.1em" }}
          >
            SUPPLÉMENTS
          </h2>
          <div className="mt-2 mb-4" style={{ borderTop: "1px solid rgba(201,184,150,0.4)", width: "200px" }} />
          
          <div className="flex flex-col gap-1">
            {supplements.map((supp, idx) => (
              <div key={idx} className="flex justify-between gap-8">
                <span className="text-sm" style={{ color: "#efe8d6", fontFamily: "'LaLuxes', serif" }}>
                  {supp.left}
                </span>
                <span className="text-sm" style={{ color: "#efe8d6", fontFamily: "'LaLuxes', serif" }}>
                  {supp.right}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="pb-2" />
      </div>
    </div>
  );
};

const Toasts2Menu = ({ section }: { section: MenuSection }) => {
  const items = section.leftItems || [];
  // First 4 items alternate, then 3 items on right with illustration, then 2 items at bottom
  const topItems = items.slice(0, 4);
  const middleItems = items.slice(4, 7);
  const bottomItems = items.slice(7);

  return (
    <div
      className="min-h-fit w-screen flex items-start justify-center"
      style={{
        backgroundImage: "url('/coffee/boissons-bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "scroll"
      }}
    >
      <div
        className="w-[92vw] sm:w-[88vw] min-h-auto sm:min-h-[88vh] flex flex-col items-stretch justify-start p-4 sm:p-8 relative"
        style={{ maxWidth: 700 }}
      >
        {/* Top items in alternating left/right pattern */}
        <div className="flex flex-col gap-5">
          {topItems.map((item, idx) => {
            const isLeft = idx % 2 === 0;
            return (
              <div
                key={idx}
                className={`w-full sm:w-[80%] ${isLeft ? '' : 'sm:ml-auto'}`}
              >
                <div className="flex justify-between items-center px-2">
                  <h3
                    className="text-base sm:text-lg md:text-[20px] tracking-wider flex-1"
                    style={{ fontFamily: "'LaLuxes', serif", color: "#efe8d6", letterSpacing: "0.08em" }}
                  >
                    {item.title}
                  </h3>
                  <span
                    className="text-lg sm:text-xl md:text-[22px] ml-2"
                    style={{ fontFamily: "'LaLuxes', serif", color: "#efe8d6" }}
                  >
                    {item.price}
                  </span>
                </div>
                <div className="mt-2" style={{ borderTop: "1px solid rgba(201,184,150,0.4)" }} />
                {item.description && (
                  <p className="text-sm mt-2 px-2" style={{ color: "#c9b896", fontFamily: "'LaLuxes', serif" }}>
                    {item.description}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        {/* Middle section with egg illustration on left and 3 items on right */}
        <div className="flex gap-4 mt-6">
          {/* Egg Illustration */}
          <div className="hidden sm:flex items-center justify-center" style={{ width: "25%" }}>
            <svg width="80" height="100" viewBox="0 0 80 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Egg shape */}
              <path d="M40 10 Q15 35 15 60 Q15 90 40 90 Q65 90 65 60 Q65 35 40 10" stroke="#c9b896" strokeWidth="1.5" fill="none" />
              {/* Inner texture lines */}
              <path d="M25 50 Q40 45 55 50" stroke="#c9b896" strokeWidth="0.8" fill="none" />
              <path d="M28 60 Q40 55 52 60" stroke="#c9b896" strokeWidth="0.8" fill="none" />
              <path d="M30 70 Q40 65 50 70" stroke="#c9b896" strokeWidth="0.8" fill="none" />
            </svg>
          </div>
          {/* 3 middle items */}
          <div className="flex-1 flex flex-col gap-5">
            {middleItems.map((item, idx) => (
              <div key={idx} className="sm:ml-auto sm:w-[90%]">
                <div className="flex justify-between items-center px-2">
                  <h3
                    className="text-base sm:text-lg md:text-[20px] tracking-wider flex-1"
                    style={{ fontFamily: "'LaLuxes', serif", color: "#efe8d6", letterSpacing: "0.08em" }}
                  >
                    {item.title}
                  </h3>
                  <span
                    className="text-lg sm:text-xl md:text-[22px] ml-2"
                    style={{ fontFamily: "'LaLuxes', serif", color: "#efe8d6" }}
                  >
                    {item.price}
                  </span>
                </div>
                <div className="mt-2" style={{ borderTop: "1px solid rgba(201,184,150,0.4)" }} />
                {item.description && (
                  <p className="text-sm mt-2 px-2" style={{ color: "#c9b896", fontFamily: "'LaLuxes', serif" }}>
                    {item.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom 2 items - left aligned */}
        <div className="flex flex-col gap-5 mt-6">
          {bottomItems.map((item, idx) => (
            <div key={idx} className="w-full sm:w-[80%]">
              <div className="flex justify-between items-center px-2">
                <h3
                  className="text-base sm:text-lg md:text-[20px] tracking-wider flex-1"
                  style={{ fontFamily: "'LaLuxes', serif", color: "#efe8d6", letterSpacing: "0.08em" }}
                >
                  {item.title}
                </h3>
                <span
                  className="text-lg sm:text-xl md:text-[22px] ml-2"
                  style={{ fontFamily: "'LaLuxes', serif", color: "#efe8d6" }}
                >
                  {item.price}
                </span>
              </div>
              <div className="mt-2" style={{ borderTop: "1px solid rgba(201,184,150,0.4)" }} />
              {item.description && (
                <p className="text-sm mt-2 px-2" style={{ color: "#c9b896", fontFamily: "'LaLuxes', serif" }}>
                  {item.description}
                </p>
              )}
            </div>
          ))}
        </div>

        <div className="pb-2" />
      </div>
    </div>
  );
};

// Combined Toasts Menu (all 18 items on one page)
const ToastsCombinedMenu = ({ section }: { section: MenuSection }) => {
  const items = section.leftItems || [];

  return (
    <div
      className="min-h-fit w-screen flex items-start justify-center"
      style={{
        backgroundImage: "url('/coffee/boissons-bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "scroll"
      }}
    >
      <div
        className="w-[92vw] sm:w-[88vw] min-h-auto sm:min-h-[88vh] flex flex-col items-stretch justify-start p-4 sm:p-8 relative"
        style={{ maxWidth: 700 }}
      >
        {/* TOASTS Title */}
        <div className="text-center mb-4 mt-6">
          <h1
            className="text-3xl sm:text-4xl md:text-[56px] tracking-widest"
            style={{ fontFamily: "'LaLuxes', serif", color: "#c9b896", letterSpacing: "0.15em", fontWeight: 400, marginBottom: 0 }}
          >
            TOASTS
          </h1>
          <span
            className="block text-xl sm:text-2xl md:text-[36px] -mt-1"
            style={{ fontFamily: "'Tangerine', cursive", color: "#c9782b", letterSpacing: "0.05em" }}
          >
            Menu
          </span>
        </div>

        {/* Note */}
        <p className="text-center text-sm mb-4" style={{ color: "#c9b896", fontFamily: "'LaLuxes', serif" }}>
          Tous nos toasts sont servis avec un café et un mini jus
        </p>
        <div className="mx-auto mb-6" style={{ width: 50, borderTop: "1px solid rgba(201,184,150,0.5)" }} />

        {/* Items in alternating left/right pattern */}
        <div className="flex flex-col gap-4">
          {items.map((item, idx) => {
            const isLeft = idx % 2 === 0;
            return (
              <div
                key={idx}
                className={`w-full sm:w-[80%] ${isLeft ? '' : 'sm:ml-auto'}`}
              >
                <div className="flex justify-between items-center px-2">
                  <h3
                    className="text-base sm:text-lg md:text-[20px] tracking-wider flex-1"
                    style={{ fontFamily: "'LaLuxes', serif", color: "#efe8d6", letterSpacing: "0.08em" }}
                  >
                    {item.title}
                  </h3>
                  <span
                    className="text-lg sm:text-xl md:text-[22px] ml-2"
                    style={{ fontFamily: "'LaLuxes', serif", color: "#efe8d6" }}
                  >
                    {item.price}
                  </span>
                </div>
                <div className="mt-2" style={{ borderTop: "1px solid rgba(201,184,150,0.4)" }} />
                {item.description && (
                  <p className="text-xs mt-1 px-2" style={{ color: "#c9b896", fontFamily: "'LaLuxes', serif" }}>
                    {item.description}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        {/* Toast illustration at bottom */}
        <div className="flex justify-center mt-8 mb-4">
          <svg width="100" height="80" viewBox="0 0 100 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-50">
            {/* Toast slice */}
            <rect x="15" y="20" width="70" height="50" rx="5" stroke="#c9b896" strokeWidth="1.5" fill="none"/>
            {/* Crust */}
            <rect x="20" y="25" width="60" height="40" rx="3" stroke="#c9b896" strokeWidth="1" fill="none"/>
            {/* Toppings */}
            <circle cx="35" cy="40" r="6" stroke="#c9b896" strokeWidth="0.8" fill="none"/>
            <circle cx="55" cy="38" r="5" stroke="#c9b896" strokeWidth="0.8" fill="none"/>
            <circle cx="65" cy="50" r="4" stroke="#c9b896" strokeWidth="0.8" fill="none"/>
            <ellipse cx="45" cy="52" rx="8" ry="5" stroke="#c9b896" strokeWidth="0.8" fill="none"/>
          </svg>
        </div>

        <div className="pb-2" />
      </div>
    </div>
  );
};

const ToastsMenu = ({ section }: { section: MenuSection }) => {
  const items = section.leftItems || [];

  return (
    <div
      className="min-h-fit w-screen flex items-start justify-center"
      style={{
        backgroundImage: "url('/coffee/boissons-bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "scroll"
      }}
    >
      <div
        className="w-[92vw] sm:w-[88vw] min-h-auto sm:min-h-[88vh] flex flex-col items-stretch justify-start p-4 sm:p-8 relative"
        style={{ maxWidth: 700 }}
      >
        {/* TOASTS Title */}
        <div className="text-center mb-4 mt-6">
          <h1
            className="text-3xl sm:text-4xl md:text-[56px] tracking-widest"
            style={{ fontFamily: "'LaLuxes', serif", color: "#c9b896", letterSpacing: "0.15em", fontWeight: 400, marginBottom: 0 }}
          >
            TOASTS
          </h1>
          <span
            className="block text-xl sm:text-2xl md:text-[36px] -mt-1"
            style={{ fontFamily: "'Tangerine', cursive", color: "#c9782b", letterSpacing: "0.05em" }}
          >
            Menu
          </span>
        </div>

        {/* Note */}
        <p className="text-center text-sm mb-4" style={{ color: "#c9b896", fontFamily: "'LaLuxes', serif" }}>
          Tous nos toasts sont servis avec un café et un mini jus
        </p>
        <div className="mx-auto mb-6" style={{ width: 50, borderTop: "1px solid rgba(201,184,150,0.5)" }} />

        {/* Items in alternating left/right pattern */}
        <div className="flex flex-col gap-5">
          {items.map((item, idx) => {
            const isLeft = idx % 2 === 0;
            return (
              <div
                key={idx}
                className={`w-full sm:w-[80%] ${isLeft ? '' : 'sm:ml-auto'}`}
              >
                <div className="flex justify-between items-center px-2">
                  <h3
                    className="text-base sm:text-lg md:text-[20px] tracking-wider flex-1"
                    style={{ fontFamily: "'LaLuxes', serif", color: "#efe8d6", letterSpacing: "0.08em" }}
                  >
                    {item.title}
                  </h3>
                  <span
                    className="text-lg sm:text-xl md:text-[22px] ml-2"
                    style={{ fontFamily: "'LaLuxes', serif", color: "#efe8d6" }}
                  >
                    {item.price}
                  </span>
                </div>
                <div className="mt-2" style={{ borderTop: "1px solid rgba(201,184,150,0.4)" }} />
                {item.description && (
                  <p className="text-sm mt-2 px-2" style={{ color: "#c9b896", fontFamily: "'LaLuxes', serif" }}>
                    {item.description}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        <div className="pb-2" />
      </div>
    </div>
  );
};

const PetitDejMenu = ({ section }: { section: MenuSection }) => {
  const items = section.leftItems || [];

  return (
    <div
      className="min-h-fit w-screen flex items-start justify-center"
      style={{
        backgroundImage: "url('/coffee/boissons-bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "scroll"
      }}
    >
      <div
        className="w-[92vw] sm:w-[88vw] min-h-auto sm:min-h-[88vh] flex flex-col items-stretch justify-start p-4 sm:p-8 relative"
        style={{ maxWidth: 700 }}
      >
        {/* PETIT DEJ Title */}
        <div className="text-center mb-4 mt-6">
          <h1
            className="text-3xl sm:text-4xl md:text-[56px] tracking-widest"
            style={{ fontFamily: "'LaLuxes', serif", color: "#c9b896", letterSpacing: "0.15em", fontWeight: 400, marginBottom: 0 }}
          >
            PETIT DEJ
          </h1>
          <span
            className="block text-xl sm:text-2xl md:text-[36px] -mt-1"
            style={{ fontFamily: "'Tangerine', cursive", color: "#c9782b", letterSpacing: "0.05em" }}
          >
            Menu
          </span>
        </div>

        {/* Note */}
        <p className="text-center text-sm mb-4" style={{ color: "#c9b896", fontFamily: "'LaLuxes', serif" }}>
          Tous nos petits déjeuners sont servis avec un café et un mini jus
        </p>
        <div className="mx-auto mb-6" style={{ width: 50, borderTop: "1px solid rgba(201,184,150,0.5)" }} />

        {/* First 6 items in alternating pattern */}
        <div className="flex flex-col gap-5">
          {items.slice(0, 6).map((item, idx) => {
            const isLeft = idx % 2 === 0;
            return (
              <div
                key={idx}
                className={`w-full sm:w-[80%] ${isLeft ? '' : 'sm:ml-auto'}`}
              >
                <div className="flex justify-between items-center px-2">
                  <h3
                    className="text-base sm:text-lg md:text-[20px] tracking-wider flex-1"
                    style={{ fontFamily: "'LaLuxes', serif", color: "#efe8d6", letterSpacing: "0.08em" }}
                  >
                    {item.title}
                  </h3>
                  <span
                    className="text-lg sm:text-xl md:text-[22px] ml-2"
                    style={{ fontFamily: "'LaLuxes', serif", color: "#efe8d6" }}
                  >
                    {item.price}
                  </span>
                </div>
                <div className="mt-2" style={{ borderTop: "1px solid rgba(201,184,150,0.4)" }} />
                {item.description && (
                  <p className="text-sm mt-2 px-2" style={{ color: "#c9b896", fontFamily: "'LaLuxes', serif" }}>
                    {item.description}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        {/* LE NORVÉGIEN with plate illustration */}
        {items[6] && (
          <div className="flex gap-4 mt-6">
            <div className="flex-1">
              <div className="flex justify-between items-center px-2">
                <h3
                  className="text-base sm:text-lg md:text-[20px] tracking-wider flex-1"
                  style={{ fontFamily: "'LaLuxes', serif", color: "#efe8d6", letterSpacing: "0.08em" }}
                >
                  {items[6].title}
                </h3>
                <span
                  className="text-lg sm:text-xl md:text-[22px] ml-2"
                  style={{ fontFamily: "'LaLuxes', serif", color: "#efe8d6" }}
                >
                  {items[6].price}
                </span>
              </div>
              <div className="mt-2" style={{ borderTop: "1px solid rgba(201,184,150,0.4)" }} />
              {items[6].description && (
                <p className="text-sm mt-2 px-2" style={{ color: "#c9b896", fontFamily: "'LaLuxes', serif" }}>
                  {items[6].description}
                </p>
              )}
            </div>
            {/* Plate illustration */}
            <div className="hidden sm:flex items-center justify-center" style={{ width: "20%" }}>
              <svg width="70" height="70" viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="35" cy="35" r="30" stroke="#c9b896" strokeWidth="1.5" fill="none" />
                <circle cx="35" cy="35" r="25" stroke="#c9b896" strokeWidth="1" fill="none" />
                <ellipse cx="28" cy="30" rx="8" ry="5" stroke="#c9b896" strokeWidth="0.8" fill="none" />
                <ellipse cx="42" cy="32" rx="6" ry="4" stroke="#c9b896" strokeWidth="0.8" fill="none" />
                <path d="M25 40 Q35 45 45 40" stroke="#c9b896" strokeWidth="0.8" fill="none" />
              </svg>
            </div>
          </div>
        )}

        {/* L'ITALIEN with avocado illustration */}
        {items[7] && (
          <div className="flex gap-4 mt-6">
            {/* Avocado illustration */}
            <div className="hidden sm:flex items-center justify-center" style={{ width: "20%" }}>
              <svg width="60" height="70" viewBox="0 0 60 70" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M30 5 Q10 25 10 45 Q10 65 30 65 Q50 65 50 45 Q50 25 30 5" stroke="#c9b896" strokeWidth="1.5" fill="none" />
                <ellipse cx="30" cy="45" rx="12" ry="14" stroke="#c9b896" strokeWidth="1" fill="none" />
              </svg>
            </div>
            <div className="flex-1 sm:ml-auto">
              <div className="flex justify-between items-center px-2">
                <h3
                  className="text-base sm:text-lg md:text-[20px] tracking-wider flex-1"
                  style={{ fontFamily: "'LaLuxes', serif", color: "#efe8d6", letterSpacing: "0.08em" }}
                >
                  {items[7].title}
                </h3>
                <span
                  className="text-lg sm:text-xl md:text-[22px] ml-2"
                  style={{ fontFamily: "'LaLuxes', serif", color: "#efe8d6" }}
                >
                  {items[7].price}
                </span>
              </div>
              <div className="mt-2" style={{ borderTop: "1px solid rgba(201,184,150,0.4)" }} />
              {items[7].description && (
                <p className="text-sm mt-2 px-2" style={{ color: "#c9b896", fontFamily: "'LaLuxes', serif" }}>
                  {items[7].description}
                </p>
              )}
            </div>
          </div>
        )}

        {/* ENGLISH - last item */}
        {items[8] && (
          <div className="w-full sm:w-[80%] mt-6">
            <div className="flex justify-between items-center px-2">
              <h3
                className="text-base sm:text-lg md:text-[20px] tracking-wider flex-1"
                style={{ fontFamily: "'LaLuxes', serif", color: "#efe8d6", letterSpacing: "0.08em" }}
              >
                {items[8].title}
              </h3>
              <span
                className="text-lg sm:text-xl md:text-[22px] ml-2"
                style={{ fontFamily: "'LaLuxes', serif", color: "#efe8d6" }}
              >
                {items[8].price}
              </span>
            </div>
            <div className="mt-2" style={{ borderTop: "1px solid rgba(201,184,150,0.4)" }} />
            {items[8].description && (
              <p className="text-sm mt-2 px-2" style={{ color: "#c9b896", fontFamily: "'LaLuxes', serif" }}>
                {items[8].description}
              </p>
            )}
          </div>
        )}

        <div className="pb-2" />
      </div>
    </div>
  );
};

const LasagnesRisottoMenu = ({ section }: { section: MenuSection }) => {
  const lasagnesItems = section.leftItems?.filter(item => item.description === "lasagnes") || [];
  const risottoItems = section.leftItems?.filter(item => item.description === "risotto") || [];

  const renderItems = (items: MenuItem[]) => (
    <div className="flex flex-col gap-4">
      {items.map((item, idx) => {
        const isLeft = idx % 2 === 0;
        return (
          <div
            key={idx}
            className={`w-full sm:w-[75%] ${isLeft ? '' : 'sm:ml-auto'}`}
          >
            <div className="flex justify-between items-center px-2">
              <h3
                className="text-lg sm:text-xl md:text-[22px] tracking-wider"
                style={{ fontFamily: "'LaLuxes', serif", color: "#efe8d6", letterSpacing: "0.1em" }}
              >
                {item.title}
              </h3>
              <span
                className="text-lg sm:text-xl md:text-[20px]"
                style={{ fontFamily: "'LaLuxes', serif", color: "#efe8d6" }}
              >
                {item.price}
              </span>
            </div>
            <div className="mt-2" style={{ borderTop: "1px solid rgba(201,184,150,0.4)" }} />
          </div>
        );
      })}
    </div>
  );

  return (
    <div
      className="min-h-fit w-screen flex items-start justify-center"
      style={{
        backgroundImage: "url('/coffee/boissons-bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "scroll"
      }}
    >
      <div
        className="w-[92vw] sm:w-[88vw] min-h-auto sm:min-h-[88vh] flex flex-col items-stretch justify-start p-4 sm:p-8 relative"
        style={{ maxWidth: 700 }}
      >
        {/* Lasagnes items (no title, continues from previous page) */}
        <div className="relative mt-6 mb-8">
          <div className="flex items-start">
            <div className="flex-1">
              {renderItems(lasagnesItems)}
            </div>
            {/* Pasta/fork illustration */}
            <div className="hidden sm:block w-20 ml-4 opacity-50">
              <svg viewBox="0 0 60 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Fork */}
                <line x1="30" y1="5" x2="30" y2="35" stroke="#c9b896" strokeWidth="1.5"/>
                <line x1="24" y1="5" x2="24" y2="20" stroke="#c9b896" strokeWidth="1"/>
                <line x1="30" y1="5" x2="30" y2="20" stroke="#c9b896" strokeWidth="1"/>
                <line x1="36" y1="5" x2="36" y2="20" stroke="#c9b896" strokeWidth="1"/>
                {/* Pasta on fork */}
                <path d="M20 35 Q25 30 30 35 Q35 40 40 35" stroke="#c9b896" strokeWidth="1" fill="none"/>
                <path d="M18 40 Q25 35 30 40 Q35 45 42 40" stroke="#c9b896" strokeWidth="1" fill="none"/>
                <path d="M20 45 Q25 40 30 45 Q35 50 40 45" stroke="#c9b896" strokeWidth="1" fill="none"/>
                {/* Plate */}
                <ellipse cx="30" cy="65" rx="25" ry="10" stroke="#c9b896" strokeWidth="1.5" fill="none"/>
                <path d="M10 60 Q30 50 50 60" stroke="#c9b896" strokeWidth="1" fill="none"/>
              </svg>
            </div>
          </div>
        </div>

        {/* RISOTTO Section */}
        <div className="mb-8">
          <div className="text-center mb-6">
            <h1
              className="text-3xl sm:text-4xl md:text-[52px] tracking-widest"
              style={{ fontFamily: "'LaLuxes', serif", color: "#c9b896", letterSpacing: "0.15em", fontWeight: 400, marginBottom: 0 }}
            >
              RISOTTO
            </h1>
            <span
              className="block text-xl sm:text-2xl md:text-[36px] -mt-1"
              style={{ fontFamily: "'Tangerine', cursive", color: "#c9782b", letterSpacing: "0.05em" }}
            >
              Menu
            </span>
            <div className="mx-auto mt-3" style={{ width: 50, borderTop: "1px solid rgba(201,184,150,0.5)" }} />
          </div>
          {renderItems(risottoItems)}
        </div>

        {/* Risotto illustration at bottom */}
        <div className="flex justify-center mt-6 mb-4">
          <svg viewBox="0 0 120 70" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-32 sm:w-40 opacity-50">
            {/* Plate */}
            <ellipse cx="60" cy="55" rx="55" ry="12" stroke="#c9b896" strokeWidth="1.5" fill="none"/>
            {/* Risotto mound */}
            <path d="M20 50 Q60 20 100 50" stroke="#c9b896" strokeWidth="1.5" fill="none"/>
            {/* Rice texture */}
            <path d="M30 45 Q40 38 50 42 Q60 35 70 40 Q80 36 90 45" stroke="#c9b896" strokeWidth="0.8" fill="none"/>
            <path d="M35 40 Q45 34 55 38 Q65 32 75 38 Q85 34 92 42" stroke="#c9b896" strokeWidth="0.8" fill="none"/>
            <path d="M40 35 Q50 30 60 34 Q70 28 80 35" stroke="#c9b896" strokeWidth="0.8" fill="none"/>
            {/* Herb garnish */}
            <path d="M55 28 Q58 22 60 28 Q62 22 65 28" stroke="#c9b896" strokeWidth="0.8" fill="none"/>
            <line x1="60" y1="28" x2="60" y2="32" stroke="#c9b896" strokeWidth="0.5"/>
          </svg>
        </div>

        <div className="pb-2" />
      </div>
    </div>
  );
};

const PlatsMenu = ({ section }: { section: MenuSection }) => {
  const items = section.leftItems || [];

  return (
    <div
      className="min-h-fit w-screen flex items-start justify-center"
      style={{
        backgroundImage: "url('/coffee/boissons-bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "scroll"
      }}
    >
      <div
        className="w-[92vw] sm:w-[88vw] min-h-auto sm:min-h-[88vh] flex flex-col items-stretch justify-start p-4 sm:p-8 relative"
        style={{ maxWidth: 700 }}
      >
        {/* PLATS Title */}
        <div className="text-center mb-8 mt-6">
          <h1
            className="text-3xl sm:text-4xl md:text-[56px] tracking-widest"
            style={{ fontFamily: "'LaLuxes', serif", color: "#c9b896", letterSpacing: "0.15em", fontWeight: 400, marginBottom: 0 }}
          >
            PLATS
          </h1>
          <span
            className="block text-xl sm:text-2xl md:text-[36px] -mt-1"
            style={{ fontFamily: "'Tangerine', cursive", color: "#c9782b", letterSpacing: "0.05em" }}
          >
            Menu
          </span>
          <div className="mx-auto mt-3" style={{ width: 50, borderTop: "1px solid rgba(201,184,150,0.5)" }} />
        </div>

        {/* Items in alternating left/right pattern */}
        <div className="flex flex-col gap-5">
          {items.map((item, idx) => {
            const isLeft = idx % 2 === 0;
            return (
              <div
                key={idx}
                className={`w-full sm:w-[80%] ${isLeft ? '' : 'sm:ml-auto'}`}
              >
                <div className="flex justify-between items-center px-2">
                  <h3
                    className="text-base sm:text-lg md:text-[20px] tracking-wider flex-1"
                    style={{ fontFamily: "'LaLuxes', serif", color: "#efe8d6", letterSpacing: "0.08em" }}
                  >
                    {item.title}
                  </h3>
                  <span
                    className="text-lg sm:text-xl md:text-[22px] ml-2"
                    style={{ fontFamily: "'LaLuxes', serif", color: "#efe8d6" }}
                  >
                    {item.price}
                  </span>
                </div>
                <div className="mt-2" style={{ borderTop: "1px solid rgba(201,184,150,0.4)" }} />
                {item.description && (
                  <p className="text-sm mt-2 px-2" style={{ color: "#c9b896", fontFamily: "'LaLuxes', serif" }}>
                    {item.description}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        <div className="pb-2" />
      </div>
    </div>
  );
};

const BowlsMenu = ({ section }: { section: MenuSection }) => {
  const items = section.leftItems || [];

  return (
    <div
      className="min-h-fit w-screen flex items-start justify-center"
      style={{
        backgroundImage: "url('/coffee/boissons-bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "scroll"
      }}
    >
      <div
        className="w-[92vw] sm:w-[88vw] min-h-auto sm:min-h-[88vh] flex flex-col items-stretch justify-start p-4 sm:p-8 relative"
        style={{ maxWidth: 700 }}
      >
        {/* BOWLS Title */}
        <div className="text-center mb-8 mt-6">
          <h1
            className="text-3xl sm:text-4xl md:text-[56px] tracking-widest"
            style={{ fontFamily: "'LaLuxes', serif", color: "#c9b896", letterSpacing: "0.15em", fontWeight: 400, marginBottom: 0 }}
          >
            BOWLS
          </h1>
          <span
            className="block text-xl sm:text-2xl md:text-[36px] -mt-1"
            style={{ fontFamily: "'Tangerine', cursive", color: "#c9782b", letterSpacing: "0.05em" }}
          >
            Menu
          </span>
          <div className="mx-auto mt-3" style={{ width: 50, borderTop: "1px solid rgba(201,184,150,0.5)" }} />
        </div>

        {/* Items in alternating left/right pattern */}
        <div className="flex flex-col gap-6">
          {items.map((item, idx) => {
            const isLeft = idx % 2 === 0;
            return (
              <div
                key={idx}
                className={`w-full sm:w-[80%] ${isLeft ? '' : 'sm:ml-auto'}`}
              >
                <div className="flex justify-between items-center px-2">
                  <h3
                    className="text-lg sm:text-xl md:text-[24px] tracking-wider"
                    style={{ fontFamily: "'LaLuxes', serif", color: "#efe8d6", letterSpacing: "0.1em" }}
                  >
                    {item.title}
                  </h3>
                  <span
                    className="text-lg sm:text-xl md:text-[22px]"
                    style={{ fontFamily: "'LaLuxes', serif", color: "#efe8d6" }}
                  >
                    {item.price}
                  </span>
                </div>
                <div className="mt-2" style={{ borderTop: "1px solid rgba(201,184,150,0.4)" }} />
                {item.description && (
                  <p className="text-sm mt-2 px-2" style={{ color: "#c9b896", fontFamily: "'LaLuxes', serif" }}>
                    {item.description}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        {/* Bowl illustration at bottom */}
        <div className="flex justify-center mt-10 mb-4">
          <svg viewBox="0 0 100 70" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-28 sm:w-36 opacity-50">
            {/* Bowl outer */}
            <ellipse cx="50" cy="45" rx="45" ry="18" stroke="#c9b896" strokeWidth="1.5" fill="none"/>
            <path d="M5 45 Q5 20 50 15 Q95 20 95 45" stroke="#c9b896" strokeWidth="1.5" fill="none"/>
            {/* Bowl base */}
            <ellipse cx="50" cy="62" rx="15" ry="5" stroke="#c9b896" strokeWidth="1.5" fill="none"/>
            <line x1="35" y1="58" x2="35" y2="62" stroke="#c9b896" strokeWidth="1.5"/>
            <line x1="65" y1="58" x2="65" y2="62" stroke="#c9b896" strokeWidth="1.5"/>
            {/* Content - noodles/rice pattern */}
            <path d="M25 30 Q35 25 45 30 Q55 35 65 30 Q75 25 85 30" stroke="#c9b896" strokeWidth="1" fill="none"/>
            <path d="M30 35 Q40 30 50 35 Q60 40 70 35 Q80 30 85 35" stroke="#c9b896" strokeWidth="1" fill="none"/>
            <path d="M20 38 Q30 33 40 38 Q50 43 60 38" stroke="#c9b896" strokeWidth="1" fill="none"/>
            {/* Toppings */}
            <circle cx="40" cy="25" r="4" stroke="#c9b896" strokeWidth="0.8" fill="none"/>
            <circle cx="60" cy="28" r="3" stroke="#c9b896" strokeWidth="0.8" fill="none"/>
            <ellipse cx="50" cy="22" rx="5" ry="3" stroke="#c9b896" strokeWidth="0.8" fill="none"/>
          </svg>
        </div>

        <div className="pb-2" />
      </div>
    </div>
  );
};

const SandwichsMenu = ({ section }: { section: MenuSection }) => {
  const items = section.leftItems || [];

  return (
    <div
      className="min-h-fit w-screen flex items-start justify-center"
      style={{
        backgroundImage: "url('/coffee/boissons-bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "scroll"
      }}
    >
      <div
        className="w-[92vw] sm:w-[88vw] min-h-auto sm:min-h-[88vh] flex flex-col items-stretch justify-start p-4 sm:p-8 relative"
        style={{ maxWidth: 700 }}
      >
        {/* SANDWICHS Title */}
        <div className="text-center mb-8 mt-6">
          <h1
            className="text-3xl sm:text-4xl md:text-[52px] tracking-widest"
            style={{ fontFamily: "'LaLuxes', serif", color: "#c9b896", letterSpacing: "0.12em", fontWeight: 400, marginBottom: 0 }}
          >
            SANDWICHS
          </h1>
          <span
            className="block text-xl sm:text-2xl md:text-[36px] -mt-1"
            style={{ fontFamily: "'Tangerine', cursive", color: "#c9782b", letterSpacing: "0.05em" }}
          >
            Menu
          </span>
          <div className="mx-auto mt-3" style={{ width: 50, borderTop: "1px solid rgba(201,184,150,0.5)" }} />
        </div>

        {/* Items in alternating left/right pattern */}
        <div className="flex flex-col gap-6">
          {items.map((item, idx) => {
            const isLeft = idx % 2 === 0;
            return (
              <div
                key={idx}
                className={`w-full sm:w-[80%] ${isLeft ? '' : 'sm:ml-auto'}`}
              >
                <div className="flex justify-between items-center px-2">
                  <h3
                    className="text-lg sm:text-xl md:text-[24px] tracking-wider"
                    style={{ fontFamily: "'LaLuxes', serif", color: "#efe8d6", letterSpacing: "0.1em" }}
                  >
                    {item.title}
                  </h3>
                  <span
                    className="text-lg sm:text-xl md:text-[22px]"
                    style={{ fontFamily: "'LaLuxes', serif", color: "#efe8d6" }}
                  >
                    {item.price}
                  </span>
                </div>
                <div className="mt-2" style={{ borderTop: "1px solid rgba(201,184,150,0.4)" }} />
                {item.description && (
                  <p className="text-sm mt-2 px-2" style={{ color: "#c9b896", fontFamily: "'LaLuxes', serif" }}>
                    {item.description}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        {/* Sandwich illustration at bottom */}
        <div className="flex justify-center mt-10 mb-4">
          <svg viewBox="0 0 140 50" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-36 sm:w-44 opacity-50">
            {/* Top bread */}
            <path d="M10 20 Q70 5 130 20" stroke="#c9b896" strokeWidth="1.5" fill="none"/>
            <path d="M10 20 Q10 15 20 12 Q70 0 120 12 Q130 15 130 20" stroke="#c9b896" strokeWidth="1.5" fill="none"/>
            {/* Filling layers */}
            <path d="M12 22 Q70 18 128 22" stroke="#c9b896" strokeWidth="1" fill="none"/>
            <path d="M14 26 Q70 22 126 26" stroke="#c9b896" strokeWidth="1" fill="none"/>
            <path d="M15 30 Q70 26 125 30" stroke="#c9b896" strokeWidth="1" fill="none"/>
            {/* Bottom bread */}
            <path d="M12 32 Q70 28 128 32" stroke="#c9b896" strokeWidth="1.5" fill="none"/>
            <path d="M12 32 Q12 38 20 40 Q70 48 120 40 Q128 38 128 32" stroke="#c9b896" strokeWidth="1.5" fill="none"/>
            {/* Decorative sesame seeds */}
            <ellipse cx="40" cy="12" rx="2" ry="1" stroke="#c9b896" strokeWidth="0.5" fill="none"/>
            <ellipse cx="70" cy="8" rx="2" ry="1" stroke="#c9b896" strokeWidth="0.5" fill="none"/>
            <ellipse cx="100" cy="11" rx="2" ry="1" stroke="#c9b896" strokeWidth="0.5" fill="none"/>
            <ellipse cx="55" cy="10" rx="2" ry="1" stroke="#c9b896" strokeWidth="0.5" fill="none"/>
            <ellipse cx="85" cy="9" rx="2" ry="1" stroke="#c9b896" strokeWidth="0.5" fill="none"/>
          </svg>
        </div>

        <div className="pb-2" />
      </div>
    </div>
  );
};

const PizzasMenu = ({ section }: { section: MenuSection }) => {
  const items = section.leftItems || [];
  
  // Séparer les pizzas par catégorie
  const classiques = items.filter(item => item.extra === "classiques");
  const gourmet = items.filter(item => item.extra === "gourmet");

  const renderPizzaItem = (item: MenuItem, idx: number, startIdx: number = 0) => {
    const isLeft = (idx + startIdx) % 2 === 0;
    return (
      <div
        key={idx}
        className={`w-full sm:w-[80%] ${isLeft ? '' : 'sm:ml-auto'}`}
      >
        <div className="flex justify-between items-center px-2">
          <h3
            className="text-xl sm:text-2xl md:text-[28px] tracking-wider"
            style={{ fontFamily: "'LaLuxes', serif", color: "#efe8d6", letterSpacing: "0.1em" }}
          >
            {item.title}
          </h3>
          <span
            className="text-xl sm:text-2xl md:text-[26px]"
            style={{ fontFamily: "'LaLuxes', serif", color: "#efe8d6" }}
          >
            {item.price}
          </span>
        </div>
        <div className="mt-2" style={{ borderTop: "1px solid rgba(201,184,150,0.4)" }} />
        {item.description && (
          <p className="text-sm mt-2 px-2" style={{ color: "#c9b896", fontFamily: "'LaLuxes', serif" }}>
            {item.description}
          </p>
        )}
      </div>
    );
  };

  return (
    <div
      className="min-h-fit w-screen flex items-start justify-center"
      style={{
        backgroundImage: "url('/coffee/boissons-bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "scroll"
      }}
    >
      <div
        className="w-[92vw] sm:w-[88vw] min-h-auto flex flex-col items-stretch justify-start p-4 sm:p-8 relative"
        style={{ maxWidth: 700 }}
      >
        {/* PIZZAS Title */}
        <div className="text-center mb-8 mt-6">
          <h1
            className="text-3xl sm:text-4xl md:text-[56px] tracking-widest"
            style={{ fontFamily: "'LaLuxes', serif", color: "#c9b896", letterSpacing: "0.15em", fontWeight: 400, marginBottom: 0 }}
          >
            PIZZAS
          </h1>
          <span
            className="block text-xl sm:text-2xl md:text-[36px] -mt-1"
            style={{ fontFamily: "'Tangerine', cursive", color: "#c9782b", letterSpacing: "0.05em" }}
          >
            Menu
          </span>
          <div className="mx-auto mt-3" style={{ width: 50, borderTop: "1px solid rgba(201,184,150,0.5)" }} />
        </div>

        {/* Classiques Section */}
        <div className="mb-8">
          <h2
            className="text-center text-2xl sm:text-3xl md:text-[38px] mb-6"
            style={{ fontFamily: "'Tangerine', cursive", color: "#c9782b", letterSpacing: "0.05em" }}
          >
            Classiques
          </h2>
          <div className="flex flex-col gap-6">
            {classiques.map((item, idx) => renderPizzaItem(item, idx))}
          </div>
        </div>

        {/* Gourmet Section */}
        <div className="mb-8">
          <h2
            className="text-center text-2xl sm:text-3xl md:text-[38px] mb-6"
            style={{ fontFamily: "'Tangerine', cursive", color: "#c9782b", letterSpacing: "0.05em" }}
          >
            Gourmet
          </h2>
          <div className="flex flex-col gap-6">
            {gourmet.map((item, idx) => renderPizzaItem(item, idx, classiques.length))}
          </div>
        </div>

        {/* Pizza illustration at bottom */}
        <div className="flex justify-center mt-6 mb-4">
          <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-32 sm:w-40 opacity-50">
            {/* Outer circle */}
            <circle cx="60" cy="60" r="55" stroke="#c9b896" strokeWidth="1.5" fill="none"/>
            {/* Inner circle (crust) */}
            <circle cx="60" cy="60" r="48" stroke="#c9b896" strokeWidth="1" fill="none"/>
            {/* Pizza slices */}
            <line x1="60" y1="5" x2="60" y2="115" stroke="#c9b896" strokeWidth="1"/>
            <line x1="5" y1="60" x2="115" y2="60" stroke="#c9b896" strokeWidth="1"/>
            <line x1="21" y1="21" x2="99" y2="99" stroke="#c9b896" strokeWidth="1"/>
            <line x1="99" y1="21" x2="21" y2="99" stroke="#c9b896" strokeWidth="1"/>
            {/* Toppings - pepperoni circles */}
            <circle cx="40" cy="35" r="5" stroke="#c9b896" strokeWidth="0.8" fill="none"/>
            <circle cx="75" cy="40" r="4" stroke="#c9b896" strokeWidth="0.8" fill="none"/>
            <circle cx="50" cy="70" r="5" stroke="#c9b896" strokeWidth="0.8" fill="none"/>
            <circle cx="80" cy="75" r="4" stroke="#c9b896" strokeWidth="0.8" fill="none"/>
            <circle cx="35" cy="55" r="3" stroke="#c9b896" strokeWidth="0.8" fill="none"/>
            <circle cx="85" cy="55" r="3" stroke="#c9b896" strokeWidth="0.8" fill="none"/>
            <circle cx="60" cy="45" r="4" stroke="#c9b896" strokeWidth="0.8" fill="none"/>
            <circle cx="55" cy="85" r="3" stroke="#c9b896" strokeWidth="0.8" fill="none"/>
            {/* Basil leaves */}
            <path d="M25 75 Q30 70 35 75 Q30 80 25 75" stroke="#c9b896" strokeWidth="0.6" fill="none"/>
            <path d="M70 25 Q75 20 80 25 Q75 30 70 25" stroke="#c9b896" strokeWidth="0.6" fill="none"/>
            <path d="M90 85 Q95 80 100 85 Q95 90 90 85" stroke="#c9b896" strokeWidth="0.6" fill="none"/>
          </svg>
        </div>

        <div className="pb-2" />
      </div>
    </div>
  );
};

const BoissonsMenu = ({ section }: { section: MenuSection }) => {
  const items = section.leftItems || [];
  
  // Filter items by category
  const cafesItems = items.filter(item => item.description === "cafes");
  const cafesWithNespresso = cafesItems.filter(item => item.extra);
  const cafesWithoutNespresso = cafesItems.filter(item => !item.extra);
  const latteItems = items.filter(item => item.description === "latte");
  const glacesItems = items.filter(item => item.description === "glaces");
  const theItems = items.filter(item => item.description === "the");
  const chocolatItems = items.filter(item => item.description === "chocolat");
  const boissonsItems = items.filter(item => item.description === "boissons-froides");
  const detoxItems = items.filter(item => item.description === "detox");
  const frappucinoItems = items.filter(item => item.description === "frappucino");
  const smoothiesItems = items.filter(item => item.description === "smoothies");
  const mojitoItems = items.filter(item => item.description === "mojito");
  const graniteItems = items.filter(item => item.description === "granite");
  const iceteaItems = items.filter(item => item.description === "icetea");
  const freshJuiceItems = items.filter(item => item.description === "fresh-juice");
  const matchaItems = items.filter(item => item.description === "matcha");

  const renderItems = (items: MenuItem[], showDescription = false) => (
    <div className="flex flex-col gap-4">
      {items.map((item, idx) => {
        const isLeft = idx % 2 === 0;
        return (
          <div
            key={idx}
            className={`w-full sm:w-[75%] ${isLeft ? '' : 'sm:ml-auto'}`}
          >
            <div className="flex justify-between items-center px-2">
              <h3
                className="text-base sm:text-lg md:text-[20px] tracking-wider"
                style={{ fontFamily: "'LaLuxes', serif", color: "#efe8d6", letterSpacing: "0.08em" }}
              >
                {item.title}
              </h3>
              <span
                className="text-base sm:text-lg md:text-[18px] ml-2 whitespace-nowrap"
                style={{ fontFamily: "'LaLuxes', serif", color: "#efe8d6" }}
              >
                {item.price}
              </span>
            </div>
            <div className="mt-2" style={{ borderTop: "1px solid rgba(201,184,150,0.4)" }} />
            {showDescription && item.extra && (
              <p className="text-sm mt-1 px-2" style={{ color: "#c9b896", fontFamily: "'LaLuxes', serif" }}>
                {item.extra}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );

  const renderSectionTitle = (title: string, subtitle: string) => (
    <div className="text-center mb-5">
      <h2
        className="text-2xl sm:text-3xl md:text-[40px] tracking-widest"
        style={{ fontFamily: "'LaLuxes', serif", color: "#c9b896", letterSpacing: "0.12em", fontWeight: 400 }}
      >
        {title}
      </h2>
      <span
        className="block text-lg sm:text-xl md:text-[28px] -mt-1"
        style={{ fontFamily: "'Tangerine', cursive", color: "#c9782b", letterSpacing: "0.05em" }}
      >
        {subtitle}
      </span>
      <div className="mx-auto mt-2" style={{ width: 40, borderTop: "1px solid rgba(201,184,150,0.5)" }} />
    </div>
  );

  return (
    <div
      className="min-h-fit w-screen flex items-start justify-center"
      style={{
        backgroundImage: "url('/coffee/boissons-bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "scroll"
      }}
    >
      <div
        className="w-[92vw] sm:w-[88vw] min-h-auto sm:min-h-[88vh] flex flex-col items-stretch justify-start p-4 sm:p-8 relative"
        style={{ maxWidth: 700 }}
      >
        {/* Main BOISSONS Title */}
        <div className="text-center mb-8 mt-6">
          <h1
            className="text-3xl sm:text-4xl md:text-[56px] tracking-widest"
            style={{ fontFamily: "'LaLuxes', serif", color: "#c9b896", letterSpacing: "0.15em", fontWeight: 400, marginBottom: 0 }}
          >
            BOISSONS
          </h1>
          <span
            className="block text-xl sm:text-2xl md:text-[36px] -mt-1"
            style={{ fontFamily: "'Tangerine', cursive", color: "#c9782b", letterSpacing: "0.05em" }}
          >
            Menu
          </span>
          <div className="mx-auto mt-3" style={{ width: 50, borderTop: "1px solid rgba(201,184,150,0.5)" }} />
        </div>

        {/* CAFÉS CLASSIQUES Section */}
        <div className="mb-8">
          {renderSectionTitle("CAFÉS", "Classiques")}
          {/* Header with NESPRESSO label for first items */}
          <div className="flex justify-end mb-2 px-2">
            <span
              className="text-sm sm:text-base tracking-wider"
              style={{ fontFamily: "'LaLuxes', serif", color: "#c9b896", letterSpacing: "0.1em" }}
            >
              NESPRESSO
            </span>
          </div>
          {/* Items with Nespresso prices */}
          <div className="flex flex-col gap-3 mb-4">
            {cafesWithNespresso.map((item, idx) => (
              <div key={idx} className="w-full">
                <div className="flex justify-between items-center px-2">
                  <h3
                    className="text-base sm:text-lg md:text-[18px] tracking-wider flex-1"
                    style={{ fontFamily: "'LaLuxes', serif", color: "#efe8d6", letterSpacing: "0.08em" }}
                  >
                    {item.title}
                  </h3>
                  <span
                    className="text-base sm:text-lg md:text-[18px] w-20 text-center"
                    style={{ fontFamily: "'LaLuxes', serif", color: "#efe8d6" }}
                  >
                    {item.price}
                  </span>
                  <span
                    className="text-base sm:text-lg md:text-[18px] w-20 text-right"
                    style={{ fontFamily: "'LaLuxes', serif", color: "#efe8d6" }}
                  >
                    {item.extra}
                  </span>
                </div>
                <div className="mt-2" style={{ borderTop: "1px solid rgba(201,184,150,0.4)" }} />
              </div>
            ))}
          </div>
          {/* Items without Nespresso */}
          {renderItems(cafesWithoutNespresso)}
        </div>

        {/* CAFÉS LATTE Section */}
        <div className="mb-8">
          {renderSectionTitle("CAFÉS", "Latte")}
          {renderItems(latteItems)}
        </div>

        {/* CAFÉS GLACÉS Section */}
        <div className="mb-8">
          {renderSectionTitle("CAFÉS", "Glacés")}
          {renderItems(glacesItems)}
        </div>

        {/* THÉ Section */}
        <div className="mb-8">
          {renderSectionTitle("THÉ", "Menu")}
          {renderItems(theItems)}
        </div>

        {/* CHOCOLAT CHAUD Section */}
        <div className="mb-8">
          {renderSectionTitle("CHOCOLAT", "Chaud")}
          {renderItems(chocolatItems)}
        </div>

        {/* BOISSONS FROIDES Section */}
        <div className="mb-8">
          {renderSectionTitle("BOISSONS", "Froides")}
          {renderItems(boissonsItems)}
        </div>

        {/* DÉTOX Section */}
        <div className="mb-8">
          {renderSectionTitle("DÉTOX", "Menu")}
          {renderItems(detoxItems, true)}
        </div>

        {/* FRAPPUCINO Section */}
        <div className="mb-8">
          {renderSectionTitle("FRAPPUCINO", "Menu")}
          {renderItems(frappucinoItems)}
        </div>

        {/* SMOOTHIES Section */}
        <div className="mb-8">
          {renderSectionTitle("SMOOTHIES", "Menu")}
          {renderItems(smoothiesItems)}
        </div>

        {/* MOJITO Section */}
        <div className="mb-8">
          {renderSectionTitle("MOJITO", "Menu")}
          {renderItems(mojitoItems)}
        </div>

        {/* GRANITE Section */}
        <div className="mb-8">
          {renderSectionTitle("GRANITE", "Menu")}
          {renderItems(graniteItems)}
        </div>

        {/* ICETEA Section */}
        <div className="mb-8">
          {renderSectionTitle("ICETEA", "Menu")}
          {renderItems(iceteaItems)}
        </div>

        {/* FRESH JUICE Section */}
        <div className="mb-8">
          {renderSectionTitle("FRESH JUICE", "Menu")}
          {renderItems(freshJuiceItems, true)}
        </div>

        {/* MATCHA Section */}
        <div className="mb-8">
          {renderSectionTitle("MATCHA", "Menu")}
          {renderItems(matchaItems)}
        </div>

        <div className="pb-4" />
      </div>
    </div>
  );
};

const ChichaMenu = ({ section }: { section: MenuSection }) => {
  const classiqueItems = section.leftItems?.filter(item => item.description === "classique") || [];
  const adalyaItems = section.leftItems?.filter(item => item.description === "adalya") || [];

  return (
    <div
      className="min-h-fit w-screen flex items-start justify-center"
      style={{
        backgroundImage: "url('/coffee/boissons-bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "scroll"
      }}
    >
      <div
        className="w-[92vw] sm:w-[88vw] min-h-auto sm:min-h-[88vh] flex flex-col items-stretch justify-start p-4 sm:p-8 relative"
        style={{ maxWidth: 700 }}
      >
        {/* CHICHA Classique Section */}
        <div className="text-center mb-12 mt-8">
          <h1
            className="text-4xl sm:text-5xl md:text-[72px] tracking-widest"
            style={{ fontFamily: "'LaLuxes', serif", color: "#c9b896", letterSpacing: "0.25em", fontWeight: 400, marginBottom: 0 }}
          >
            CHICHA
          </h1>
          <span
            className="block text-2xl sm:text-3xl md:text-[48px] -mt-2"
            style={{ fontFamily: "'Tangerine', cursive", color: "#c9782b", letterSpacing: "0.05em" }}
          >
            Classique
          </span>
          <div className="mx-auto mt-4" style={{ width: 120, borderTop: "1px solid rgba(201,184,150,0.5)" }} />
        </div>

        {/* Classique Items */}
        <div className="mb-12">
          {classiqueItems.map((item, idx) => (
            <div key={idx} className="mb-6">
              <div className="flex justify-between items-center px-4">
                <h3
                  className="text-xl sm:text-2xl md:text-[32px] tracking-wider"
                  style={{ fontFamily: "'LaLuxes', serif", color: "#efe8d6", letterSpacing: "0.15em" }}
                >
                  {item.title}
                </h3>
                <span
                  className="text-xl sm:text-2xl md:text-[28px]"
                  style={{ fontFamily: "'LaLuxes', serif", color: "#efe8d6" }}
                >
                  {item.price}
                </span>
              </div>
              <div className="mt-2 mx-4" style={{ borderTop: "1px solid rgba(201,184,150,0.4)" }} />
            </div>
          ))}
        </div>

        {/* CHICHA Adalya Section */}
        <div className="text-center mb-12 mt-8">
          <h1
            className="text-4xl sm:text-5xl md:text-[72px] tracking-widest"
            style={{ fontFamily: "'LaLuxes', serif", color: "#c9b896", letterSpacing: "0.25em", fontWeight: 400, marginBottom: 0 }}
          >
            CHICHA
          </h1>
          <span
            className="block text-2xl sm:text-3xl md:text-[48px] -mt-2"
            style={{ fontFamily: "'Tangerine', cursive", color: "#c9782b", letterSpacing: "0.05em" }}
          >
            Adalya
          </span>
          <div className="mx-auto mt-4" style={{ width: 120, borderTop: "1px solid rgba(201,184,150,0.5)" }} />
        </div>

        {/* Adalya Items with Chicha illustration */}
        <div className="relative">
          <div className="pr-0 sm:pr-32">
            {adalyaItems.map((item, idx) => (
              <div key={idx} className="mb-6">
                <div className="flex justify-between items-center px-4">
                  <h3
                    className="text-xl sm:text-2xl md:text-[32px] tracking-wider"
                    style={{ fontFamily: "'LaLuxes', serif", color: "#efe8d6", letterSpacing: "0.15em" }}
                  >
                    {item.title}
                  </h3>
                  <span
                    className="text-xl sm:text-2xl md:text-[28px]"
                    style={{ fontFamily: "'LaLuxes', serif", color: "#efe8d6" }}
                  >
                    {item.price}
                  </span>
                </div>
                <div className="mt-2 mx-4" style={{ borderTop: "1px solid rgba(201,184,150,0.4)" }} />
              </div>
            ))}
          </div>

          {/* Chicha/Hookah SVG illustration */}
          <div className="hidden sm:block absolute right-0 bottom-0" style={{ width: 140, height: 180, opacity: 0.7 }}>
            <svg viewBox="0 0 100 130" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
              {/* Smoke */}
              <path d="M75 10 Q78 5 75 2 Q72 5 75 10" stroke="#c9b896" strokeWidth="1" fill="none" opacity="0.6"/>
              <path d="M78 15 Q82 8 78 3 Q74 8 78 15" stroke="#c9b896" strokeWidth="1" fill="none" opacity="0.5"/>
              <path d="M72 12 Q76 6 72 1 Q68 6 72 12" stroke="#c9b896" strokeWidth="1" fill="none" opacity="0.4"/>
              
              {/* Mouthpiece/hose */}
              <path d="M73 18 L73 25 Q73 28 70 30 L55 40" stroke="#c9b896" strokeWidth="2" fill="none"/>
              
              {/* Top bowl */}
              <ellipse cx="50" cy="42" rx="12" ry="5" stroke="#c9b896" strokeWidth="1.5" fill="none"/>
              <path d="M38 42 L38 48 Q38 52 42 54 L58 54 Q62 52 62 48 L62 42" stroke="#c9b896" strokeWidth="1.5" fill="none"/>
              
              {/* Stem */}
              <line x1="50" y1="54" x2="50" y2="75" stroke="#c9b896" strokeWidth="2"/>
              
              {/* Base/vase */}
              <ellipse cx="50" cy="78" rx="8" ry="3" stroke="#c9b896" strokeWidth="1.5" fill="none"/>
              <path d="M42 78 Q35 85 32 100 Q30 115 38 122 L62 122 Q70 115 68 100 Q65 85 58 78" stroke="#c9b896" strokeWidth="1.5" fill="none"/>
              <ellipse cx="50" cy="122" rx="12" ry="4" stroke="#c9b896" strokeWidth="1.5" fill="none"/>
              
              {/* Water line */}
              <path d="M35 105 Q50 100 65 105" stroke="#c9b896" strokeWidth="1" fill="none" opacity="0.5"/>
              
              {/* Decorative pattern on vase */}
              <ellipse cx="50" cy="100" rx="15" ry="8" stroke="#c9b896" strokeWidth="0.5" fill="none" opacity="0.4"/>
              <ellipse cx="50" cy="110" rx="13" ry="6" stroke="#c9b896" strokeWidth="0.5" fill="none" opacity="0.4"/>
            </svg>
          </div>
        </div>

        <div className="pb-12" />
      </div>
    </div>
  );
};

const TwoColumnMenu = ({ section, showBackground = true }: { section: MenuSection; showBackground?: boolean }) => {
  const left = section.leftItems ?? (section.items ?? []).slice(0, Math.ceil((section.items ?? []).length / 2));
  const right = section.rightItems ?? (section.items ?? []).slice(Math.ceil((section.items ?? []).length / 2));

  const maxLen = Math.max(left.length, right.length);
  const rows = Array.from({ length: maxLen }).map((_, i) => ({ left: left[i], right: right[i] }));

  const frame = (
    <div
      className="w-[92vw] sm:w-[88vw] min-h-auto sm:min-h-[88vh] flex flex-col items-stretch justify-start p-4 sm:p-8"
      style={{ maxWidth: 1200, backgroundImage: "url('/coffee/boissons-bg.png')", backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <div className="flex-1 border border-[#c9b896] p-8 relative">
        {/* Title */}
        <div className="text-center relative">
          <h1
            className="mb-0 text-4xl sm:text-5xl md:text-[96px]"
            style={{ fontFamily: "'LaLuxes', serif", color: "#efe8d6", letterSpacing: "0.18em", fontWeight: 300, marginBottom: 4 }}
          >
            {section.label}
          </h1>

          <span
            className="absolute left-1/2 -translate-x-1/2"
            style={{ color: "#c9782b", pointerEvents: 'none' }}
          >
            <span className="text-lg sm:text-2xl md:text-[52px]" style={{  fontFamily: "'Tangerine', cursive", letterSpacing: '0.02em' }}>{section.subtitle}</span>
          </span>

          <div className="mx-auto my-5" style={{ width: 56, borderTop: "2px solid rgba(201,184,150,0.9)" }} />
          <p className="text-xs sm:text-sm" style={{ color: "#c9b896", marginTop: 8 }}>
            {section.id === "petit-dej" ? "Tous nos petits déjeuners sont servis avec un café et un mini jus" : "Tous nos toasts sont servis avec un café et un mini jus"}
          </p>
        </div>

        <div className="mt-6">
          <div className="flex flex-col gap-3">
            {rows.map((row, idx) => (
              <div key={idx} className="flex flex-col gap-4">
                {row.left && (
                  <div className="w-full sm:w-[60%] p-4" style={{ background: "transparent" }}>
                    <div className="flex justify-between items-baseline">
                      <h3 className="text-xl sm:text-3xl md:text-[48px]" style={{ fontFamily: "'LaLuxes', serif", color: "#efe8d6", letterSpacing: "0.12em", lineHeight: 1 }}>{row.left.title}</h3>
                      <div className="text-lg sm:text-2xl md:text-[36px]" style={{ fontFamily: "'LaLuxes', serif", color: "#efe8d6" }}>{row.left.price}</div>
                    </div>
                    <div className="mt-3" style={{ borderTop: "2px solid rgba(239,232,214,0.95)", width: "100%" }} />
                    {row.left.description && <p className="text-sm sm:text-base" style={{ color: "#efe8d6", marginTop: 12 }}>{row.left.description}</p>}
                  </div>
                )}

                {row.right && (
                  <div className="w-full sm:w-[60%] p-4 sm:ml-auto" style={{ background: "transparent" }}>
                    <div className="flex justify-between items-baseline">
                      <h3 className="text-xl sm:text-3xl md:text-[48px]" style={{ fontFamily: "'LaLuxes', serif", color: "#efe8d6", letterSpacing: "0.12em", lineHeight: 1 }}>{row.right.title}</h3>
                      <div className="text-lg sm:text-2xl md:text-[36px]" style={{ fontFamily: "'LaLuxes', serif", color: "#efe8d6" }}>{row.right.price}</div>
                    </div>
                    <div className="mt-3" style={{ borderTop: "2px solid rgba(239,232,214,0.95)", width: "100%" }} />
                    {row.right.description && <p className="text-sm sm:text-base" style={{ color: "#efe8d6", marginTop: 12, textAlign: "left" }}>{row.right.description}</p>}
                  </div>
                )}
              </div>
            ))}

            <div className="flex justify-end mt-6">
              <svg className="w-12 h-12 sm:w-16 sm:h-16 opacity-70" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="32" cy="32" r="30" stroke="#c9b896" strokeWidth="1" />
                <path d="M20 40c6-5 18-5 24 0" stroke="#c9b896" strokeWidth="1" strokeLinecap="round" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  if (showBackground) {
    return (
      <div
        className="min-h-fit w-screen flex items-start justify-center"
        style={{
          backgroundImage: "url('/coffee/boissons-bg.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "scroll"
        }}
      >
        {frame}
      </div>
    );
  }

  return frame;
};

export default function MenuGallery() {
  // Use clean manually-curated menuData (OCR data in menus_structured.json is too noisy)
  const source: MenuSection[] = menuData;
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        const nextIndex = (index - 1 + source.length) % source.length;
        document.getElementById(source[nextIndex].id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      if (e.key === "ArrowRight") {
        const nextIndex = (index + 1) % source.length;
        document.getElementById(source[nextIndex].id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, source]);

  // navRef is used to scroll the horizontal nav bar left/right when user clicks ◀/▶
  const navRef = useRef<HTMLDivElement | null>(null);
  const SCROLL_AMOUNT = 240;

  const prev = () => {
    const el = navRef.current;
    if (el) el.scrollBy({ left: -SCROLL_AMOUNT, behavior: 'smooth' });
  };
  const next = () => {
    const el = navRef.current;
    if (el) el.scrollBy({ left: SCROLL_AMOUNT, behavior: 'smooth' });
  };

  useEffect(() => {
    // observe which section is currently in view to highlight nav
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            const newIndex = (source as MenuSection[]).findIndex((s) => s.id === id);
            if (newIndex >= 0) setIndex(newIndex);
          }
        });
      },
      { root: null, rootMargin: '0px', threshold: 0.45 }
    );

    (source as MenuSection[]).forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [source]);

  return (
    <>
      <style jsx global>{`
        @font-face { font-family: 'LaLuxes'; src: url('/fonts/LaLuxes.otf') format('opentype'); }
        html { overflow-x: hidden; }
        /* Allow normal scrolling and pointer interactions */
        body { overflow: auto; margin: 0; padding: 0; }
        /* Hide horizontal scrollbar in the nav while keeping scroll functionality */
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
      `}</style>

      <main>
        {/* Hero header */}
        <header id="top" className="w-full flex items-center justify-center" style={{ backgroundImage: "url('/coffee/boissons-bg.png')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
          <div className="w-[92vw] sm:w-[88vw] max-w-[1200px] text-center py-16 sm:py-28">
            <h2 style={{ fontFamily: "'LaLuxes', serif", color: '#efe8d6', fontSize: 'clamp(48px, 8vw, 160px)', letterSpacing: '0.22em', margin: 0 }}>Menu</h2>
            <p style={{ fontFamily: "'LaLuxes', serif", color: '#c9782b', fontSize: 'clamp(16px, 2.2vw, 28px)', marginTop: 8 }}>Savourez chaque instant</p>
            <div style={{ width: 56, margin: '18px auto 0', borderTop: '2px solid rgba(201,184,150,0.9)' }} />
          </div>
        </header>
        {/* Horizontal navigation */}
        <div 
          className="w-full pt-2 sm:pt-4 px-2 sm:px-6 sticky top-0 z-40"
          style={{ 
            backgroundImage: "url('/coffee/boissons-bg.png')",
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
        >
          <div className="max-w-[1200px] mx-auto flex items-center gap-1 sm:gap-4">
            <button 
              onClick={prev} 
              aria-label="Previous" 
              className="p-2 sm:p-3 py-2 bg-white/10 hover:bg-white/20 rounded-full sm:rounded text-[#efe8d6] transition-colors flex-shrink-0"
            >
              <span className="text-sm sm:text-base">◀</span>
            </button>
            <div ref={navRef} className="no-scrollbar overflow-x-auto whitespace-nowrap flex gap-2 sm:gap-3 px-1 sm:px-2 py-2 flex-1">
              {(source as MenuSection[]).map((s, i) => (
                <button
                  key={s.id}
                  onClick={() => document.getElementById(s.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                  className={`min-w-[70px] sm:min-w-[100px] md:min-w-[120px] px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 rounded-lg transition-all duration-200 flex-shrink-0 ${i === index ? 'bg-[#d4a574] text-black shadow-lg' : 'bg-white/10 text-[#efe8d6] hover:bg-white/20'}`}
                >
                  <div 
                    style={{ fontFamily: "'LaLuxes', serif" }}
                    className="text-[10px] sm:text-xs md:text-sm truncate"
                  >
                    {s.label}
                  </div>
                </button>
              ))}
            </div>
            <button 
              onClick={next} 
              aria-label="Next" 
              className="p-2 sm:p-3 py-2 bg-white/10 hover:bg-white/20 rounded-full sm:rounded text-[#efe8d6] transition-colors flex-shrink-0"
            >
              <span className="text-sm sm:text-base">▶</span>
            </button>
          </div>
        </div>

        <div className="flex flex-col items-center gap-10 py-8">
          {(source as MenuSection[]).map((s) => (
            <section id={s.id} key={s.id} className="w-full flex justify-center" style={{ scrollMarginTop: '80px' }}>
              {s.id === "chicha" ? <ChichaMenu section={s} /> : s.id === "boissons" ? <BoissonsMenu section={s} /> : s.id === "pizzas" ? <PizzasMenu section={s} /> : s.id === "sandwichs" ? <SandwichsMenu section={s} /> : s.id === "bowls" ? <BowlsMenu section={s} /> : s.id === "plats" ? <PlatsMenu section={s} /> : s.id === "lasagnes" ? <LasagnesRisottoMenu section={s} /> : s.id === "pates" ? <PatesMenu section={s} /> : s.id === "salades" ? <SaladesMenu section={s} /> : s.id === "omelettes" ? <OmeletteMenu section={s} /> : s.id === "gaufres" ? <GaufresMenu section={s} /> : s.id === "crepes" ? <CrepesMenu section={s} /> : s.id === "brioche-perdue" ? <BriocheMenu section={s} /> : s.id === "croissants" ? <CroissantsMenu section={s} /> : s.id === "toasts" ? <ToastsCombinedMenu section={s} /> : s.id === "petit-dej" ? <PetitDejMenu section={s} /> : <TwoColumnMenu section={s} />}
            </section>
          ))}
        </div>
      </main>
    </>
  );
}
