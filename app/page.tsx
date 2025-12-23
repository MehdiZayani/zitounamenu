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
  // PAGE 2 - TOASTS
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
      { title: "JAMBON FUMÉ", price: "21,600", description: "sauce fromage, oeuf brouillé, jambon fumé, emmental" }
    ],
    rightItems: []
  },
  // PAGE 3 - TOASTS (page 2)
  {
    id: "toasts-2",
    label: "TOASTS",
    subtitle: "Suite",
    leftItems: [
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
  // PAGE 4 - CROISSANTS SALÉS
  {
    id: "croissants-sales",
    label: "CROISSANTS SALÉS",
    subtitle: "Salés",
    leftItems: [
      { title: "JAMBON FUMÉ", price: "15,800", description: "sauce fromage, jambon fumé, emmental" },
      { title: "POULET FUMÉ", price: "17,200", description: "sauce fromage, poulet fumé, emmental, pesto" },
      { title: "BRESAOLA", price: "17,200", description: "sauce fromage, Bresaola, emmental, pesto, balsamique" },
      { title: "SAUMON", price: "21,800", description: "sauce fromage, avocat, saumon" }
    ],
    rightItems: []
  },
  // PAGE 5 - CROISSANTS SUCRÉS + BRIOCHE PERDUE SALÉE
  {
    id: "croissants-brioche-salee",
    label: "CROISSANTS / BRIOCHE",
    subtitle: "Menu",
    leftItems: [
      { title: "NUTELLA", price: "12,000", description: "croissants-sucres" },
      { title: "NUTELLA BANANE OU FRAISE", price: "13,000", description: "croissants-sucres" },
      { title: "SPÉCULOOS", price: "12,000", description: "croissants-sucres" },
      { title: "SPÉCULOOS BANANE OU FRAISE", price: "13,000", description: "croissants-sucres" },
      { title: "BRESAOLA", price: "14,900", description: "brioche-salee" },
      { title: "BURRATA", price: "17,800", description: "brioche-salee" },
      { title: "POULET FUMÉ", price: "17,600", description: "brioche-salee" },
      { title: "SAUMON FUMÉ", price: "19,900", description: "brioche-salee" }
    ],
    rightItems: []
  },
  // PAGE 6 - GAUFRES SALÉES + CRÊPES/GAUFRES SUCRÉS
  {
    id: "gaufres-crepes",
    label: "GAUFRES / CRÊPES",
    subtitle: "Menu",
    leftItems: [
      { title: "JAMBON", price: "14,200", description: "gaufres-salees", extra: "Jambon fumé, sauce fromage, emmental, oeuf poché, salade" },
      { title: "BRESAOLA", price: "15,700", description: "gaufres-salees", extra: "Bresaola, emmental, sauce fromage, pesto, oeuf poché" },
      { title: "NUTELLA", price: "14,600", description: "crepes-gaufres-sucres" },
      { title: "NUTELLA BANANE", price: "15,800", description: "crepes-gaufres-sucres" },
      { title: "NUTELLA AMANDES", price: "16,600", description: "crepes-gaufres-sucres" },
      { title: "NUTELLA SPÉCULOOS", price: "16,900", description: "crepes-gaufres-sucres" },
      { title: "POMME CARAMEL", price: "13,200", description: "crepes-gaufres-sucres" },
      { title: "PISTACHE", price: "18,900", description: "crepes-gaufres-sucres" },
      { title: "PISTACHE FRAMBOISE", price: "20,600", description: "crepes-gaufres-sucres" }
    ],
    rightItems: []
  },
  // PAGE 6B - CRÊPES SALÉES
  {
    id: "crepes-salees",
    label: "CRÊPES SALÉES",
    subtitle: "Salées",
    leftItems: [
      { title: "THON", price: "15,800", description: "" },
      { title: "JAMBON FUMÉ", price: "15,800", description: "Sauce à l'ail, mozzarella, jambon fumé" },
      { title: "POULET ÉPICÉ", price: "17,900", description: "Poulet épicé sauté avec du poivron et de l'oignion, mozzarella" },
      { title: "SAUMON FUMÉ", price: "23,800", description: "" },
      { title: "RICOTTA ÉPINARD", price: "14,600", description: "" },
      { title: "CHAMPIGNONS TRUFFÉS", price: "16,800", description: "" },
      { title: "TUNISIENNE", price: "16,500", description: "Sauce à l'ail, harissa, thon, oeuf, piment de cayenne, olive" },
      { title: "GOURMANDE", price: "17,400", description: "Jambon, thon, oeuf" },
      { title: "FOURRÉE POULET CHAMPIGNONS", price: "21,800", description: "Poulet, champignons, mozzarella, sauce blanche" }
    ],
    rightItems: []
  },
  // PAGE 6C - BRIOCHE PERDUE
  {
    id: "brioche-perdue",
    label: "BRIOCHE PERDUE",
    subtitle: "Sucrés",
    leftItems: [
      { title: "TRADITIONNEL", price: "12,800", description: "" },
      { title: "POMME CARAMEL", price: "15,900", description: "" },
      { title: "PISTACHE", price: "19,200", description: "" },
      { title: "BANANE CARAMEL NOIX", price: "16,500", description: "" },
      { title: "FRAMBOISE CARAMEL", price: "17,900", description: "" },
      { title: "PISTACHE FRAMBOISE", price: "19,900", description: "" },
      { title: "NUTELLA NOISETTE", price: "16,900", description: "" },
      { title: "NUTELLA BANANE", price: "17,800", description: "" },
      { title: "NUTELLA FRAMBOISE OU FRAISE", price: "17,900", description: "" }
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
  // PAGE 16 - PIZZAS
  {
    id: "pizzas-1",
    label: "PIZZAS",
    subtitle: "Menu",
    leftItems: [
      { title: "MARGHERITA", price: "18,900", description: "Sauce tomate, mozzarella, basilic" },
      { title: "VEGETARIANA", price: "21,800", description: "Sauce tomate, mozzarella, légumes grillés" },
      { title: "TONNO", price: "23,900", description: "Sauce tomate, mozzarella, thon" },
      { title: "NAPOLITANA", price: "21,900", description: "Sauce tomate, mozzarella, anchois, câpres, olives noirs, origan" },
      { title: "REGINA", price: "24,800", description: "Sauce tomate, mozzarella, jambon fumé, champignons" },
      { title: "POULET", price: "23,900", description: "Sauce tomate, mozzarella, poulet" }
    ],
    rightItems: []
  },
  // PAGE 17 - PIZZAS GOURMET
  {
    id: "pizzas-2",
    label: "PIZZAS GOURMET",
    subtitle: "Menu",
    leftItems: [
      { title: "PEPPERONI", price: "21,200", description: "Sauce tomate, mozzarella, pepperoni" },
      { title: "QUATTRO FORMAGGI", price: "28,600", description: "Sauce blanche, mozzarella, gorgonzola, parmesan, emmental" },
      { title: "BURRATA", price: "26,900", description: "Sauce tomate, mozzarella, burrata, roquette, pesto, balsamique" },
      { title: "BRESAOLA", price: "26,900", description: "Sauce tomate, mozzarella, bresaola" },
      { title: "TRUFA E FUNGHI", price: "28,400", description: "Crème de truffe, mozzarella, champignons" }
    ],
    rightItems: []
  },



  // PAGE 23 - GLACES
 
  // PAGE 24 - CAFÉS MENU
  {
    id: "cafes-menu",
    label: "CAFÉS CLASSIQUES",
    subtitle: "Menu",
    leftItems: [
      { title: "EXPRESS", price: "3,900", description: "5,900" },
      { title: "AMERICAIN", price: "4,200", description: "6,200" },
      { title: "CAPPUCIN", price: "4,300", description: "6,400" },
      { title: "CAFÉ CRÈME", price: "4,600", description: "6,700" },
      { title: "GRAND TASSE", price: "4,500", description: "" },
      { title: "GRAND CRÈME", price: "4,800", description: "" },
      { title: "CAPPUCINO", price: "5,700", description: "" },
      { title: "AFFOGATO", price: "6,900", description: "" },
      { title: "GRAND AFFOGATO", price: "10,900", description: "" }
    ],
    rightItems: []
  },
  // PAGE 25 - CAFÉS LATTE / CAFÉS GLACÉS
  {
    id: "cafes-latte-glaces",
    label: "CAFÉS LATTE",
    subtitle: "Latte",
    leftItems: [
      { title: "PISTACHE", price: "14,600", description: "latte" },
      { title: "NOISETTE", price: "13,400", description: "latte" },
      { title: "NUTELLA / CARAMEL / BEURRE DE CACAHUÈTE / SPECULOSS", price: "12,700", description: "latte" },
      { title: "BEURRE DE CACAHUÈTE", price: "10,200", description: "glaces" },
      { title: "CARAMEL", price: "13,400", description: "glaces" },
      { title: "NUTELLA", price: "13,400", description: "glaces" },
      { title: "NOISETTE", price: "13,400", description: "glaces" },
      { title: "PISTACHE", price: "15,800", description: "glaces" }
    ],
    rightItems: []
  },
  // PAGE 25 - THÉ / CHOCOLAT CHAUD
  {
    id: "the-chocolat",
    label: "THÉ",
    subtitle: "Menu",
    leftItems: [
      { title: "THÉ À LA MENTHE", price: "3,900", description: "the" },
      { title: "THÉ INFUSION", price: "5,900", description: "the" },
      { title: "THÉ AUX AMANDES", price: "8,900", description: "the" },
      { title: "THÉ AUX PIGNONS", price: "13,900", description: "the" },
      { title: "CHOCO", price: "7,500", description: "chocolat" },
      { title: "CHOCO CHANTILLY", price: "8,500", description: "chocolat" }
    ],
    rightItems: []
  },
  // PAGE 25 - BOISSONS FROIDES / DÉTOX
  {
    id: "boissons-detox",
    label: "BOISSONS",
    subtitle: "Froides",
    leftItems: [
      { title: "EAU 0,5", price: "2,500", description: "boissons" },
      { title: "EAU 1L", price: "3,500", description: "boissons" },
      { title: "GARCI", price: "3,900", description: "boissons" },
      { title: "SODA", price: "4,600", description: "boissons" },
      { title: "BOISSONS ÉNERGÉTIQUES", price: "9,500", description: "boissons" },
      { title: "DÉTOX CLASSIQUE", price: "9,800", description: "detox|Menthe, citron, concombre" },
      { title: "DÉTOX IMMUNITÉ", price: "12,800", description: "detox|Orange, carotte, citron, gingembre" },
      { title: "DÉTOX ÉNERGÉTIQUE", price: "13,900", description: "detox|Carotte, betrave, orange, citron, menthe, gingembre" }
    ],
    rightItems: []
  },
  // PAGE 25 - FRAPPUCINO / SMOOTHIES
  {
    id: "frappucino-smoothies",
    label: "FRAPPUCINO",
    subtitle: "Menu",
    leftItems: [
      { title: "BEURRE DE CACAHOUETTE", price: "13,900", description: "frappucino" },
      { title: "NOISETTE", price: "16,800", description: "frappucino" },
      { title: "NUTELLA", price: "16,800", description: "frappucino" },
      { title: "SPECULOSS", price: "16,800", description: "frappucino" },
      { title: "CARMEL", price: "16,800", description: "frappucino" },
      { title: "FRUITS ROUGE", price: "16,800", description: "smoothies" },
      { title: "FRAISE", price: "16,800", description: "smoothies" },
      { title: "PÊCHE BANANE", price: "16,800", description: "smoothies" },
      { title: "PINACOLADA", price: "16,800", description: "smoothies" },
      { title: "EXOTIC", price: "16,800", description: "smoothies" }
    ],
    rightItems: []
  },
  // PAGE 25 - MOJITO / GRANITE / ICETEA
  {
    id: "mojito-granite-icetea",
    label: "MOJITO",
    subtitle: "Menu",
    leftItems: [
      { title: "VIRGIN MOJITO", price: "11,900", description: "mojito" },
      { title: "BLUE / RED MOJITO", price: "13,400", description: "mojito" },
      { title: "MOJITO ENERGIE", price: "16,900", description: "mojito" },
      { title: "CITRON", price: "9,900", description: "granite" },
      { title: "FRAISE", price: "11,900", description: "granite" },
      { title: "PINACOLADA", price: "13,900", description: "granite" },
      { title: "TEA FRAMBOISE", price: "9,700", description: "icetea" },
      { title: "TEA PÊCHE", price: "9,700", description: "icetea" }
    ],
    rightItems: []
  },
  // PAGE 25 - FRESH JUICE
  {
    id: "fresh-juice",
    label: "FRESH JUICE",
    subtitle: "Menu",
    leftItems: [
      { title: "CITRONNADE", price: "7,800", description: "" },
      { title: "JUS D'ORANGE", price: "8,200", description: "" },
      { title: "CITRONNADE AUX AMANDES", price: "10,800", description: "" },
      { title: "FRAISE", price: "9,200", description: "" },
      { title: "BANANE", price: "9,800", description: "" },
      { title: "DATTES BANANE", price: "12,200", description: "" },
      { title: "TRIPPLE D'AMOUR", price: "15,600", description: "Banane, dattes, fruits secs, miel" },
      { title: "MAHBOUL ZITOUNA", price: "18,900", description: "Jus de fruits, fruits secs, boule de glace" }
    ],
    rightItems: []
  },
  // PAGE 26 - MATCHA
  {
    id: "matcha",
    label: "MATCHA",
    subtitle: "Menu",
    leftItems: [
      { title: "ANANAS", price: "13,800", description: "" },
      { title: "MANGUE", price: "13,800", description: "" },
      { title: "NOISETTE", price: "15,800", description: "" },
      { title: "VANILLE", price: "15,800", description: "" },
      { title: "FRUITS ROUGES", price: "15,800", description: "" },
      { title: "PISTACHE", price: "15,800", description: "" },
      { title: "CARAMEL", price: "15,800", description: "" }
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
        backgroundImage: "url('/coffee/bg.png')",
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
        backgroundImage: "url('/coffee/bg.png')",
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
        backgroundImage: "url('/coffee/bg.png')",
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

const GaufresCrepsMenu = ({ section }: { section: MenuSection }) => {
  const items = section.leftItems || [];
  const gaufresSaleesItems = items.filter(item => item.description === "gaufres-salees");
  const crepesGaufresSucresItems = items.filter(item => item.description === "crepes-gaufres-sucres");

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
        backgroundImage: "url('/coffee/bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "scroll"
      }}
    >
      <div
        className="w-[92vw] sm:w-[88vw] min-h-auto sm:min-h-[88vh] flex flex-col items-stretch justify-start p-4 sm:p-8 relative"
        style={{ maxWidth: 700 }}
      >
        {/* GAUFRES Salées Title */}
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
            Salées
          </span>
          <div className="mx-auto mt-3" style={{ width: 50, borderTop: "1px solid rgba(201,184,150,0.5)" }} />
        </div>

        {/* Gaufres Salées Items */}
        {renderItems(gaufresSaleesItems)}

        {/* CRÊPES / GAUFRES Sucrés Title */}
        <div className="text-center mb-6 mt-10">
          <h1
            className="text-2xl sm:text-3xl md:text-[44px] tracking-widest"
            style={{ fontFamily: "'LaLuxes', serif", color: "#c9b896", letterSpacing: "0.12em", fontWeight: 400, marginBottom: 0 }}
          >
            CRÊPES / GAUFRES
          </h1>
          <span
            className="block text-xl sm:text-2xl md:text-[36px] -mt-1"
            style={{ fontFamily: "'Tangerine', cursive", color: "#c9782b", letterSpacing: "0.05em" }}
          >
            Sucrés
          </span>
        </div>

        {/* Crêpes/Gaufres Sucrés Items */}
        {renderItems(crepesGaufresSucresItems)}

        <div className="pb-2" />
      </div>
    </div>
  );
};

const CrepesSaleesMenu = ({ section }: { section: MenuSection }) => {
  const items = section.leftItems || [];

  return (
    <div
      className="min-h-fit w-screen flex items-start justify-center"
      style={{
        backgroundImage: "url('/coffee/bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "scroll"
      }}
    >
      <div
        className="w-[92vw] sm:w-[88vw] min-h-auto sm:min-h-[88vh] flex flex-col items-stretch justify-start p-4 sm:p-8 relative"
        style={{ maxWidth: 700 }}
      >
        {/* CRÊPES Salées Title */}
        <div className="text-center mb-8 mt-6">
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
            Salées
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

const BriocheMenu = ({ section }: { section: MenuSection }) => {
  const items = section.leftItems || [];
  // First 3 items are on the right side with illustration on left
  const topItems = items.slice(0, 3);
  // Remaining items alternate left/right
  const bottomItems = items.slice(3);

  return (
    <div
      className="min-h-fit w-screen flex items-start justify-center"
      style={{
        backgroundImage: "url('/coffee/bg.png')",
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
        <div className="text-center mb-8 mt-6">
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
            Sucrés
          </span>
          <div className="mx-auto mt-3" style={{ width: 50, borderTop: "1px solid rgba(201,184,150,0.5)" }} />
        </div>

        {/* Top section with illustration and first 3 items */}
        <div className="flex gap-4 mb-6">
          {/* Brioche Illustration */}
          <div className="hidden sm:flex items-center justify-center" style={{ width: "30%" }}>
            <svg width="100" height="90" viewBox="0 0 100 90" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Brioche shape - French toast style */}
              <path d="M15 60 L20 25 L80 20 L85 55 L80 70 L20 75 Z" stroke="#c9b896" strokeWidth="1.5" fill="none" />
              {/* Top surface */}
              <path d="M20 25 L25 30 L75 25 L80 20" stroke="#c9b896" strokeWidth="1" fill="none" />
              <path d="M25 30 L30 65 L75 60 L75 25" stroke="#c9b896" strokeWidth="1" fill="none" strokeDasharray="3 2" />
              {/* Dots/texture */}
              <circle cx="35" cy="40" r="2" stroke="#c9b896" strokeWidth="0.8" fill="none" />
              <circle cx="50" cy="35" r="2" stroke="#c9b896" strokeWidth="0.8" fill="none" />
              <circle cx="65" cy="38" r="2" stroke="#c9b896" strokeWidth="0.8" fill="none" />
              <circle cx="40" cy="52" r="1.5" stroke="#c9b896" strokeWidth="0.8" fill="none" />
              <circle cx="55" cy="48" r="1.5" stroke="#c9b896" strokeWidth="0.8" fill="none" />
              <circle cx="68" cy="50" r="1.5" stroke="#c9b896" strokeWidth="0.8" fill="none" />
            </svg>
          </div>
          {/* First 3 items on right */}
          <div className="flex-1 flex flex-col gap-4">
            {topItems.map((item, idx) => (
              <div key={idx} className="sm:ml-auto sm:w-[85%]">
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
            ))}
          </div>
        </div>

        {/* Bottom items - all left aligned */}
        <div className="flex flex-col gap-5">
          {bottomItems.map((item, idx) => (
            <div key={idx} className="w-full sm:w-[75%]">
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
          ))}
        </div>

        <div className="pb-2" />
      </div>
    </div>
  );
};

const CroissantsBriocheSaleeMenu = ({ section }: { section: MenuSection }) => {
  const items = section.leftItems || [];
  const croissantsSucresItems = items.filter(item => item.description === "croissants-sucres");
  const briocheSaleeItems = items.filter(item => item.description === "brioche-salee");

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
        backgroundImage: "url('/coffee/bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "scroll"
      }}
    >
      <div
        className="w-[92vw] sm:w-[88vw] min-h-auto sm:min-h-[88vh] flex flex-col items-stretch justify-start p-4 sm:p-8 relative"
        style={{ maxWidth: 700 }}
      >
        {/* CROISSANTS Sucrés Title */}
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
            Sucrés
          </span>
        </div>

        {/* Note */}
        <p className="text-center text-sm mb-6" style={{ color: "#c9b896", fontFamily: "'LaLuxes', serif" }}>
          Tous nos croissants sucrés sont servis avec un café et un mini jus
        </p>
        <div className="mx-auto mb-6" style={{ width: 50, borderTop: "1px solid rgba(201,184,150,0.5)" }} />

        {/* Croissants Sucrés Items */}
        {renderItems(croissantsSucresItems)}

        {/* BRIOCHE PERDUE Salée Title */}
        <div className="text-center mb-6 mt-10">
          <h1
            className="text-2xl sm:text-3xl md:text-[44px] tracking-widest"
            style={{ fontFamily: "'LaLuxes', serif", color: "#c9b896", letterSpacing: "0.12em", fontWeight: 400, marginBottom: 0 }}
          >
            BRIOCHE PERDUE
          </h1>
          <span
            className="block text-xl sm:text-2xl md:text-[36px] -mt-1"
            style={{ fontFamily: "'Tangerine', cursive", color: "#c9782b", letterSpacing: "0.05em" }}
          >
            Salée
          </span>
          <div className="mx-auto mt-3" style={{ width: 50, borderTop: "1px solid rgba(201,184,150,0.5)" }} />
        </div>

        {/* Brioche Salée Items */}
        {renderItems(briocheSaleeItems)}

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
        backgroundImage: "url('/coffee/bg.png')",
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
        backgroundImage: "url('/coffee/bg.png')",
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

const ToastsMenu = ({ section }: { section: MenuSection }) => {
  const items = section.leftItems || [];

  return (
    <div
      className="min-h-fit w-screen flex items-start justify-center"
      style={{
        backgroundImage: "url('/coffee/bg.png')",
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
        backgroundImage: "url('/coffee/bg.png')",
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
        backgroundImage: "url('/coffee/bg.png')",
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
        backgroundImage: "url('/coffee/bg.png')",
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
        backgroundImage: "url('/coffee/bg.png')",
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
        backgroundImage: "url('/coffee/bg.png')",
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

  return (
    <div
      className="min-h-fit w-screen flex items-start justify-center"
      style={{
        backgroundImage: "url('/coffee/bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "scroll"
      }}
    >
      <div
        className="w-[92vw] sm:w-[88vw] min-h-auto sm:min-h-[88vh] flex flex-col items-stretch justify-start p-4 sm:p-8 relative"
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
          })}
        </div>

        <div className="pb-2" />
      </div>
    </div>
  );
};

const PizzasGourmetMenu = ({ section }: { section: MenuSection }) => {
  const items = section.leftItems || [];

  return (
    <div
      className="min-h-fit w-screen flex items-start justify-center"
      style={{
        backgroundImage: "url('/coffee/bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "scroll"
      }}
    >
      <div
        className="w-[92vw] sm:w-[88vw] min-h-auto sm:min-h-[88vh] flex flex-col items-stretch justify-start p-4 sm:p-8 relative"
        style={{ maxWidth: 700 }}
      >
        {/* Items in alternating left/right pattern */}
        <div className="flex flex-col gap-6 mt-6">
          {items.map((item, idx) => {
            const isLeft = idx % 2 === 0;
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
          })}
        </div>

        {/* Pizza illustration at bottom */}
        <div className="flex justify-center mt-10 mb-4">
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

const CafesMenu = ({ section }: { section: MenuSection }) => {
  const items = section.leftItems || [];
  // Items with Nespresso price (first 4)
  const itemsWithNespresso = items.slice(0, 4);
  // Items without Nespresso price
  const itemsWithoutNespresso = items.slice(4);

  return (
    <div
      className="min-h-fit w-screen flex items-start justify-center"
      style={{
        backgroundImage: "url('/coffee/bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "scroll"
      }}
    >
      <div
        className="w-[92vw] sm:w-[88vw] min-h-auto sm:min-h-[88vh] flex flex-col items-stretch justify-start p-4 sm:p-8 relative"
        style={{ maxWidth: 700 }}
      >
        {/* CAFÉS Title */}
        <div className="text-center mb-6 mt-6">
          <h1
            className="text-3xl sm:text-4xl md:text-[56px] tracking-widest"
            style={{ fontFamily: "'LaLuxes', serif", color: "#c9b896", letterSpacing: "0.15em", fontWeight: 400, marginBottom: 0 }}
          >
            CAFÉS
          </h1>
          <span
            className="block text-xl sm:text-2xl md:text-[36px] -mt-1"
            style={{ fontFamily: "'Tangerine', cursive", color: "#c9782b", letterSpacing: "0.05em" }}
          >
            Menu
          </span>
          <div className="mx-auto mt-3" style={{ width: 50, borderTop: "1px solid rgba(201,184,150,0.5)" }} />
        </div>

        {/* Header with NESPRESSO label */}
        <div className="flex justify-end mb-2 px-2">
          <span
            className="text-sm sm:text-base md:text-[18px] tracking-wider"
            style={{ fontFamily: "'LaLuxes', serif", color: "#c9b896", letterSpacing: "0.1em" }}
          >
            NESPRESSO
          </span>
        </div>

        {/* Items with Nespresso prices */}
        <div className="flex flex-col gap-4 mb-6">
          {itemsWithNespresso.map((item, idx) => (
            <div key={idx} className="w-full">
              <div className="flex justify-between items-center px-2">
                <h3
                  className="text-lg sm:text-xl md:text-[22px] tracking-wider flex-1"
                  style={{ fontFamily: "'LaLuxes', serif", color: "#efe8d6", letterSpacing: "0.1em" }}
                >
                  {item.title}
                </h3>
                <span
                  className="text-lg sm:text-xl md:text-[20px] w-24 text-center"
                  style={{ fontFamily: "'LaLuxes', serif", color: "#efe8d6" }}
                >
                  {item.price}
                </span>
                <span
                  className="text-lg sm:text-xl md:text-[20px] w-24 text-right"
                  style={{ fontFamily: "'LaLuxes', serif", color: "#efe8d6" }}
                >
                  {item.description}
                </span>
              </div>
              <div className="mt-2" style={{ borderTop: "1px solid rgba(201,184,150,0.4)" }} />
            </div>
          ))}
        </div>

        {/* Items without Nespresso - alternating left/right */}
        <div className="flex flex-col gap-4 relative">
          {itemsWithoutNespresso.map((item, idx) => {
            const isLeft = idx % 2 === 0;
            return (
              <div
                key={idx}
                className={`w-full sm:w-[75%] ${isLeft ? '' : 'sm:ml-auto'} relative`}
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
                
                {/* Coffee cup icons */}
                {idx === 0 && (
                  <div className="hidden sm:block absolute -right-20 top-0 w-16 opacity-50">
                    <svg viewBox="0 0 50 45" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <ellipse cx="25" cy="35" rx="20" ry="8" stroke="#c9b896" strokeWidth="1.5" fill="none"/>
                      <path d="M5 35 L5 20 Q5 10 25 10 Q45 10 45 20 L45 35" stroke="#c9b896" strokeWidth="1.5" fill="none"/>
                      <ellipse cx="25" cy="10" rx="10" ry="3" stroke="#c9b896" strokeWidth="1" fill="none"/>
                    </svg>
                  </div>
                )}
                {idx === 4 && (
                  <div className="hidden sm:block absolute -left-20 top-0 w-16 opacity-50">
                    <svg viewBox="0 0 60 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10 40 Q10 45 30 45 Q50 45 50 40 L50 15 Q50 10 30 10 Q10 10 10 15 Z" stroke="#c9b896" strokeWidth="1.5" fill="none"/>
                      <ellipse cx="30" cy="12" rx="18" ry="5" stroke="#c9b896" strokeWidth="1.5" fill="none"/>
                      <path d="M50 20 Q58 20 58 28 Q58 36 50 36" stroke="#c9b896" strokeWidth="1.5" fill="none"/>
                    </svg>
                  </div>
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

const CafesLatteGlacesMenu = ({ section }: { section: MenuSection }) => {
  const latteItems = section.leftItems?.filter(item => item.description === "latte") || [];
  const glacesItems = section.leftItems?.filter(item => item.description === "glaces") || [];

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
                className="text-base sm:text-lg md:text-[20px] tracking-wider"
                style={{ fontFamily: "'LaLuxes', serif", color: "#efe8d6", letterSpacing: "0.08em" }}
              >
                {item.title}
              </h3>
              <span
                className="text-lg sm:text-xl md:text-[20px] ml-2 whitespace-nowrap"
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
        backgroundImage: "url('/coffee/bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "scroll"
      }}
    >
      <div
        className="w-[92vw] sm:w-[88vw] min-h-auto sm:min-h-[88vh] flex flex-col items-stretch justify-start p-4 sm:p-8 relative"
        style={{ maxWidth: 700 }}
      >
        {/* CAFÉS LATTE Section */}
        <div className="mb-10 mt-6">
          <div className="text-center mb-6">
            <h1
              className="text-3xl sm:text-4xl md:text-[56px] tracking-widest"
              style={{ fontFamily: "'LaLuxes', serif", color: "#c9b896", letterSpacing: "0.15em", fontWeight: 400, marginBottom: 0 }}
            >
              CAFÉS
            </h1>
            <span
              className="block text-xl sm:text-2xl md:text-[36px] -mt-1"
              style={{ fontFamily: "'Tangerine', cursive", color: "#c9782b", letterSpacing: "0.05em" }}
            >
              Latte
            </span>
            <div className="mx-auto mt-3" style={{ width: 50, borderTop: "1px solid rgba(201,184,150,0.5)" }} />
          </div>
          {renderItems(latteItems)}
        </div>

        {/* CAFÉS GLACÉS Section */}
        <div className="mb-8">
          <div className="text-center mb-6">
            <h1
              className="text-3xl sm:text-4xl md:text-[56px] tracking-widest"
              style={{ fontFamily: "'LaLuxes', serif", color: "#c9b896", letterSpacing: "0.15em", fontWeight: 400, marginBottom: 0 }}
            >
              CAFÉS
            </h1>
            <span
              className="block text-xl sm:text-2xl md:text-[36px] -mt-1"
              style={{ fontFamily: "'Tangerine', cursive", color: "#c9782b", letterSpacing: "0.05em" }}
            >
              Glacés
            </span>
            <div className="mx-auto mt-3" style={{ width: 50, borderTop: "1px solid rgba(201,184,150,0.5)" }} />
          </div>
          {renderItems(glacesItems)}
        </div>

        <div className="pb-2" />
      </div>
    </div>
  );
};

const TheChocolatMenu = ({ section }: { section: MenuSection }) => {
  const theItems = section.leftItems?.filter(item => item.description === "the") || [];
  const chocolatItems = section.leftItems?.filter(item => item.description === "chocolat") || [];

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
        backgroundImage: "url('/coffee/bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "scroll"
      }}
    >
      <div
        className="w-[92vw] sm:w-[88vw] min-h-auto sm:min-h-[88vh] flex flex-col items-stretch justify-start p-4 sm:p-8 relative"
        style={{ maxWidth: 700 }}
      >
        {/* THÉ Section */}
        <div className="relative mb-10 mt-6">
          <div className="flex items-start">
            {/* Teapot illustration */}
            <div className="hidden sm:block w-20 mr-4 opacity-50">
              <svg viewBox="0 0 70 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Teapot body */}
                <ellipse cx="35" cy="40" rx="25" ry="15" stroke="#c9b896" strokeWidth="1.5" fill="none"/>
                <path d="M10 40 Q10 25 35 20 Q60 25 60 40" stroke="#c9b896" strokeWidth="1.5" fill="none"/>
                {/* Lid */}
                <ellipse cx="35" cy="20" rx="12" ry="4" stroke="#c9b896" strokeWidth="1.5" fill="none"/>
                <ellipse cx="35" cy="15" rx="4" ry="2" stroke="#c9b896" strokeWidth="1" fill="none"/>
                {/* Spout */}
                <path d="M60 35 Q70 30 68 20" stroke="#c9b896" strokeWidth="1.5" fill="none"/>
                {/* Handle */}
                <path d="M10 30 Q-5 35 10 45" stroke="#c9b896" strokeWidth="1.5" fill="none"/>
              </svg>
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <h1
                    className="text-4xl sm:text-5xl md:text-[64px] tracking-widest"
                    style={{ fontFamily: "'LaLuxes', serif", color: "#c9b896", letterSpacing: "0.15em", fontWeight: 400, marginBottom: 0 }}
                  >
                    THÉ
                  </h1>
                  <span
                    className="block text-xl sm:text-2xl md:text-[36px]"
                    style={{ fontFamily: "'Tangerine', cursive", color: "#c9782b", letterSpacing: "0.05em" }}
                  >
                    Menu
                  </span>
                </div>
                {/* Tea cup illustration on right */}
                <div className="hidden sm:block w-16 opacity-50">
                  <svg viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Cup */}
                    <path d="M8 15 L10 40 Q10 45 25 45 Q40 45 40 40 L42 15" stroke="#c9b896" strokeWidth="1.5" fill="none"/>
                    <ellipse cx="25" cy="15" rx="17" ry="5" stroke="#c9b896" strokeWidth="1.5" fill="none"/>
                    {/* Handle */}
                    <path d="M42 20 Q52 20 52 30 Q52 38 42 38" stroke="#c9b896" strokeWidth="1.5" fill="none"/>
                    {/* Tea bag */}
                    <line x1="30" y1="10" x2="35" y2="2" stroke="#c9b896" strokeWidth="1"/>
                    <rect x="33" y="0" width="6" height="4" stroke="#c9b896" strokeWidth="0.8" fill="none"/>
                  </svg>
                </div>
              </div>
              <div className="mx-auto mt-3 mb-6" style={{ width: 50, borderTop: "1px solid rgba(201,184,150,0.5)" }} />
              {renderItems(theItems)}
            </div>
          </div>
        </div>

        {/* CHOCOLAT CHAUD Section */}
        <div className="relative mb-8">
          <div className="text-center mb-6">
            <h1
              className="text-3xl sm:text-4xl md:text-[52px] tracking-widest"
              style={{ fontFamily: "'LaLuxes', serif", color: "#c9b896", letterSpacing: "0.15em", fontWeight: 400, marginBottom: 0 }}
            >
              CHOCOLAT
            </h1>
            <span
              className="block text-xl sm:text-2xl md:text-[36px] -mt-1"
              style={{ fontFamily: "'Tangerine', cursive", color: "#c9782b", letterSpacing: "0.05em" }}
            >
              Chaud
            </span>
            <div className="mx-auto mt-3" style={{ width: 50, borderTop: "1px solid rgba(201,184,150,0.5)" }} />
          </div>
          <div className="flex items-start">
            {/* Hot chocolate illustration */}
            <div className="hidden sm:block w-20 mr-4 opacity-50">
              <svg viewBox="0 0 60 90" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Glass */}
                <path d="M15 20 L18 75 Q18 80 30 80 Q42 80 42 75 L45 20" stroke="#c9b896" strokeWidth="1.5" fill="none"/>
                <ellipse cx="30" cy="20" rx="15" ry="5" stroke="#c9b896" strokeWidth="1.5" fill="none"/>
                {/* Whipped cream */}
                <path d="M20 20 Q25 10 30 15 Q35 8 40 20" stroke="#c9b896" strokeWidth="1" fill="none"/>
                {/* Chocolate sticks */}
                <line x1="25" y1="5" x2="22" y2="25" stroke="#c9b896" strokeWidth="2"/>
                <line x1="32" y1="3" x2="30" y2="23" stroke="#c9b896" strokeWidth="2"/>
                <line x1="38" y1="6" x2="36" y2="26" stroke="#c9b896" strokeWidth="2"/>
              </svg>
            </div>
            <div className="flex-1">
              {renderItems(chocolatItems)}
            </div>
          </div>
        </div>

        <div className="pb-2" />
      </div>
    </div>
  );
};

const BoissonsDetoxMenu = ({ section }: { section: MenuSection }) => {
  const boissonsItems = section.leftItems?.filter(item => item.description === "boissons") || [];
  const detoxItems = section.leftItems?.filter(item => item.description.startsWith("detox")) || [];

  const renderBoissonsItems = (items: MenuItem[]) => (
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

  const renderDetoxItems = (items: MenuItem[]) => (
    <div className="flex flex-col gap-5">
      {items.map((item, idx) => {
        const isLeft = idx % 2 === 0;
        const descParts = item.description.split("|");
        const ingredients = descParts.length > 1 ? descParts[1] : "";
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
            {ingredients && (
              <p className="text-sm mt-1 px-2" style={{ color: "#c9b896", fontFamily: "'LaLuxes', serif" }}>
                {ingredients}
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
        backgroundImage: "url('/coffee/bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "scroll"
      }}
    >
      <div
        className="w-[92vw] sm:w-[88vw] min-h-auto sm:min-h-[88vh] flex flex-col items-stretch justify-start p-4 sm:p-8 relative"
        style={{ maxWidth: 700 }}
      >
        {/* BOISSONS FROIDES Section */}
        <div className="mb-10 mt-6">
          <div className="text-center mb-6">
            <h1
              className="text-3xl sm:text-4xl md:text-[52px] tracking-widest"
              style={{ fontFamily: "'LaLuxes', serif", color: "#c9b896", letterSpacing: "0.15em", fontWeight: 400, marginBottom: 0 }}
            >
              BOISSONS
            </h1>
            <span
              className="block text-xl sm:text-2xl md:text-[36px] -mt-1"
              style={{ fontFamily: "'Tangerine', cursive", color: "#c9782b", letterSpacing: "0.05em" }}
            >
              Froides
            </span>
            <div className="mx-auto mt-3" style={{ width: 50, borderTop: "1px solid rgba(201,184,150,0.5)" }} />
          </div>
          {renderBoissonsItems(boissonsItems)}
        </div>

        {/* DÉTOX Section */}
        <div className="relative mb-8">
          <div className="flex items-start">
            {/* Detox jar illustration */}
            <div className="hidden sm:block w-20 mr-4 opacity-50 mt-8">
              <svg viewBox="0 0 60 90" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Mason jar */}
                <rect x="10" y="20" width="40" height="60" rx="3" stroke="#c9b896" strokeWidth="1.5" fill="none"/>
                {/* Lid */}
                <rect x="8" y="12" width="44" height="10" rx="2" stroke="#c9b896" strokeWidth="1.5" fill="none"/>
                <line x1="8" y1="17" x2="52" y2="17" stroke="#c9b896" strokeWidth="0.8"/>
                {/* Handle */}
                <path d="M50 35 Q60 35 60 50 Q60 65 50 65" stroke="#c9b896" strokeWidth="1.5" fill="none"/>
                {/* Straw */}
                <line x1="35" y1="5" x2="35" y2="40" stroke="#c9b896" strokeWidth="2"/>
                {/* Lemon slice */}
                <circle cx="25" cy="35" r="8" stroke="#c9b896" strokeWidth="1" fill="none"/>
                <line x1="25" y1="28" x2="25" y2="42" stroke="#c9b896" strokeWidth="0.5"/>
                <line x1="18" y1="35" x2="32" y2="35" stroke="#c9b896" strokeWidth="0.5"/>
                <line x1="20" y1="30" x2="30" y2="40" stroke="#c9b896" strokeWidth="0.5"/>
                <line x1="30" y1="30" x2="20" y2="40" stroke="#c9b896" strokeWidth="0.5"/>
                {/* Liquid line */}
                <path d="M12 50 Q30 45 48 50" stroke="#c9b896" strokeWidth="0.8" fill="none" opacity="0.5"/>
              </svg>
            </div>
            <div className="flex-1">
              <div className="text-center mb-6">
                <h1
                  className="text-3xl sm:text-4xl md:text-[52px] tracking-widest"
                  style={{ fontFamily: "'LaLuxes', serif", color: "#c9b896", letterSpacing: "0.15em", fontWeight: 400, marginBottom: 0 }}
                >
                  DÉTOX
                </h1>
                <span
                  className="block text-xl sm:text-2xl md:text-[36px] -mt-1"
                  style={{ fontFamily: "'Tangerine', cursive", color: "#c9782b", letterSpacing: "0.05em" }}
                >
                  Menu
                </span>
                <div className="mx-auto mt-3" style={{ width: 50, borderTop: "1px solid rgba(201,184,150,0.5)" }} />
              </div>
              {renderDetoxItems(detoxItems)}
            </div>
          </div>
        </div>

        <div className="pb-2" />
      </div>
    </div>
  );
};

const FrappucinoSmoothiesMenu = ({ section }: { section: MenuSection }) => {
  const frappucinoItems = section.leftItems?.filter(item => item.description === "frappucino") || [];
  const smoothiesItems = section.leftItems?.filter(item => item.description === "smoothies") || [];

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
        backgroundImage: "url('/coffee/bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "scroll"
      }}
    >
      <div
        className="w-[92vw] sm:w-[88vw] min-h-auto sm:min-h-[88vh] flex flex-col items-stretch justify-start p-4 sm:p-8 relative"
        style={{ maxWidth: 700 }}
      >
        {/* FRAPPUCINO Section */}
        <div className="relative mb-8 mt-6">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <div className="text-center mb-6">
                <h1
                  className="text-3xl sm:text-4xl md:text-[52px] tracking-widest"
                  style={{ fontFamily: "'LaLuxes', serif", color: "#c9b896", letterSpacing: "0.15em", fontWeight: 400, marginBottom: 0 }}
                >
                  FRAPPUCINO
                </h1>
                <span
                  className="block text-xl sm:text-2xl md:text-[36px] -mt-1"
                  style={{ fontFamily: "'Tangerine', cursive", color: "#c9782b", letterSpacing: "0.05em" }}
                >
                  Menu
                </span>
                <div className="mx-auto mt-3" style={{ width: 50, borderTop: "1px solid rgba(201,184,150,0.5)" }} />
              </div>
              {renderItems(frappucinoItems)}
            </div>
            {/* Frappucino glass illustration */}
            <div className="hidden sm:block w-24 ml-4 opacity-50">
              <svg viewBox="0 0 60 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Cup */}
                <path d="M15 25 L18 80 L42 80 L45 25 Z" stroke="#c9b896" strokeWidth="1.5" fill="none"/>
                {/* Lid */}
                <ellipse cx="30" cy="25" rx="15" ry="5" stroke="#c9b896" strokeWidth="1.5" fill="none"/>
                <path d="M20 25 L20 20 Q30 15 40 20 L40 25" stroke="#c9b896" strokeWidth="1" fill="none"/>
                {/* Whipped cream */}
                <path d="M22 20 Q25 10 30 12 Q35 8 38 18" stroke="#c9b896" strokeWidth="1" fill="none"/>
                <path d="M26 12 Q30 5 34 10" stroke="#c9b896" strokeWidth="1" fill="none"/>
                {/* Straw */}
                <line x1="35" y1="8" x2="42" y2="-5" stroke="#c9b896" strokeWidth="2"/>
                {/* Decorative lines */}
                <path d="M20 45 Q30 40 40 45" stroke="#c9b896" strokeWidth="0.8" fill="none" opacity="0.5"/>
                <path d="M19 60 Q30 55 41 60" stroke="#c9b896" strokeWidth="0.8" fill="none" opacity="0.5"/>
              </svg>
            </div>
          </div>
        </div>

        {/* SMOOTHIES Section */}
        <div className="relative mb-8">
          <div className="flex items-start">
            {/* Smoothie cup illustration */}
            <div className="hidden sm:block w-20 mr-4 opacity-50">
              <svg viewBox="0 0 60 90" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Cup */}
                <path d="M12 20 L16 70 L44 70 L48 20 Z" stroke="#c9b896" strokeWidth="1.5" fill="none"/>
                {/* Lid dome */}
                <ellipse cx="30" cy="20" rx="18" ry="6" stroke="#c9b896" strokeWidth="1.5" fill="none"/>
                <path d="M15 20 Q30 5 45 20" stroke="#c9b896" strokeWidth="1" fill="none"/>
                {/* Straw */}
                <line x1="30" y1="10" x2="30" y2="-5" stroke="#c9b896" strokeWidth="2"/>
                {/* Content lines */}
                <path d="M18 40 Q30 35 42 40" stroke="#c9b896" strokeWidth="0.8" fill="none" opacity="0.5"/>
              </svg>
            </div>
            <div className="flex-1">
              <div className="text-center mb-6">
                <h1
                  className="text-3xl sm:text-4xl md:text-[52px] tracking-widest"
                  style={{ fontFamily: "'LaLuxes', serif", color: "#c9b896", letterSpacing: "0.15em", fontWeight: 400, marginBottom: 0 }}
                >
                  SMOOTHIES
                </h1>
                <span
                  className="block text-xl sm:text-2xl md:text-[36px] -mt-1"
                  style={{ fontFamily: "'Tangerine', cursive", color: "#c9782b", letterSpacing: "0.05em" }}
                >
                  Menu
                </span>
                <div className="mx-auto mt-3" style={{ width: 50, borderTop: "1px solid rgba(201,184,150,0.5)" }} />
              </div>
              {renderItems(smoothiesItems)}
            </div>
          </div>
        </div>

        <div className="pb-2" />
      </div>
    </div>
  );
};

const MojitoGraniteIceTeaMenu = ({ section }: { section: MenuSection }) => {
  const mojitoItems = section.leftItems?.filter(item => item.description === "mojito") || [];
  const graniteItems = section.leftItems?.filter(item => item.description === "granite") || [];
  const iceteaItems = section.leftItems?.filter(item => item.description === "icetea") || [];

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
        backgroundImage: "url('/coffee/bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "scroll"
      }}
    >
      <div
        className="w-[92vw] sm:w-[88vw] min-h-auto sm:min-h-[88vh] flex flex-col items-stretch justify-start p-4 sm:p-8 relative"
        style={{ maxWidth: 700 }}
      >
        {/* MOJITO Section */}
        <div className="relative mb-8 mt-6">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <div className="text-center mb-6">
                <h1
                  className="text-3xl sm:text-4xl md:text-[56px] tracking-widest"
                  style={{ fontFamily: "'LaLuxes', serif", color: "#c9b896", letterSpacing: "0.18em", fontWeight: 400, marginBottom: 0 }}
                >
                  MOJITO
                </h1>
                <span
                  className="block text-xl sm:text-2xl md:text-[36px] -mt-1"
                  style={{ fontFamily: "'Tangerine', cursive", color: "#c9782b", letterSpacing: "0.05em" }}
                >
                  Menu
                </span>
                <div className="mx-auto mt-3" style={{ width: 50, borderTop: "1px solid rgba(201,184,150,0.5)" }} />
              </div>
              {renderItems(mojitoItems)}
            </div>
            {/* Mojito glass illustration */}
            <div className="hidden sm:block w-24 ml-4 opacity-50">
              <svg viewBox="0 0 60 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 20 L20 85 L40 85 L45 20 Z" stroke="#c9b896" strokeWidth="1.5" fill="none"/>
                <ellipse cx="30" cy="20" rx="15" ry="5" stroke="#c9b896" strokeWidth="1.5" fill="none"/>
                <line x1="25" y1="15" x2="22" y2="5" stroke="#c9b896" strokeWidth="1"/>
                <line x1="35" y1="15" x2="40" y2="3" stroke="#c9b896" strokeWidth="1"/>
                <ellipse cx="22" cy="5" rx="3" ry="2" stroke="#c9b896" strokeWidth="0.8" fill="none"/>
                <path d="M20 40 Q30 35 40 40" stroke="#c9b896" strokeWidth="0.8" fill="none" opacity="0.6"/>
                <path d="M21 55 Q30 50 39 55" stroke="#c9b896" strokeWidth="0.8" fill="none" opacity="0.6"/>
              </svg>
            </div>
          </div>
        </div>

        {/* GRANITE Section */}
        <div className="relative mb-8">
          <div className="flex items-start">
            {/* Granite mug illustration */}
            <div className="hidden sm:block w-20 mr-4 opacity-50">
              <svg viewBox="0 0 60 70" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 15 L10 55 Q10 60 15 60 L40 60 Q45 60 45 55 L45 15" stroke="#c9b896" strokeWidth="1.5" fill="none"/>
                <ellipse cx="27.5" cy="15" rx="17.5" ry="6" stroke="#c9b896" strokeWidth="1.5" fill="none"/>
                <path d="M45 25 Q55 25 55 35 Q55 45 45 45" stroke="#c9b896" strokeWidth="1.5" fill="none"/>
                <path d="M15 30 Q27 25 40 30" stroke="#c9b896" strokeWidth="0.8" fill="none" opacity="0.5"/>
              </svg>
            </div>
            <div className="flex-1">
              <div className="text-center mb-6">
                <h1
                  className="text-3xl sm:text-4xl md:text-[56px] tracking-widest"
                  style={{ fontFamily: "'LaLuxes', serif", color: "#c9b896", letterSpacing: "0.18em", fontWeight: 400, marginBottom: 0 }}
                >
                  GRANITE
                </h1>
                <span
                  className="block text-xl sm:text-2xl md:text-[36px] -mt-1"
                  style={{ fontFamily: "'Tangerine', cursive", color: "#c9782b", letterSpacing: "0.05em" }}
                >
                  Menu
                </span>
                <div className="mx-auto mt-3" style={{ width: 50, borderTop: "1px solid rgba(201,184,150,0.5)" }} />
              </div>
              {renderItems(graniteItems)}
            </div>
          </div>
        </div>

        {/* ICETEA Section */}
        <div className="mb-8">
          <div className="text-center mb-6">
            <h1
              className="text-3xl sm:text-4xl md:text-[56px] tracking-widest"
              style={{ fontFamily: "'LaLuxes', serif", color: "#c9b896", letterSpacing: "0.18em", fontWeight: 400, marginBottom: 0 }}
            >
              ICETEA
            </h1>
            <span
              className="block text-xl sm:text-2xl md:text-[36px] -mt-1"
              style={{ fontFamily: "'Tangerine', cursive", color: "#c9782b", letterSpacing: "0.05em" }}
            >
              Menu
            </span>
            <div className="mx-auto mt-3" style={{ width: 50, borderTop: "1px solid rgba(201,184,150,0.5)" }} />
          </div>
          {renderItems(iceteaItems)}
        </div>

        <div className="pb-2" />
      </div>
    </div>
  );
};

const FreshJuiceMenu = ({ section }: { section: MenuSection }) => {
  const items = section.leftItems || [];

  return (
    <div
      className="min-h-fit w-screen flex items-start justify-center"
      style={{
        backgroundImage: "url('/coffee/bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "scroll"
      }}
    >
      <div
        className="w-[92vw] sm:w-[88vw] min-h-auto sm:min-h-[88vh] flex flex-col items-stretch justify-start p-4 sm:p-8 relative"
        style={{ maxWidth: 700 }}
      >
        {/* FRESH JUICE Title */}
        <div className="text-center mb-10 mt-8">
          <h1
            className="text-3xl sm:text-4xl md:text-[64px] tracking-widest"
            style={{ fontFamily: "'LaLuxes', serif", color: "#c9b896", letterSpacing: "0.18em", fontWeight: 400, marginBottom: 0 }}
          >
            FRESH JUICE
          </h1>
          <span
            className="block text-2xl sm:text-3xl md:text-[42px] -mt-1"
            style={{ fontFamily: "'Tangerine', cursive", color: "#c9782b", letterSpacing: "0.05em" }}
          >
            Menu
          </span>
          <div className="mx-auto mt-4" style={{ width: 60, borderTop: "1px solid rgba(201,184,150,0.6)" }} />
        </div>

        {/* Items in alternating left/right pattern */}
        <div className="flex flex-col gap-5">
          {items.map((item, idx) => {
            const isLeft = idx % 2 === 0;
            return (
              <div
                key={idx}
                className={`w-full sm:w-[75%] ${isLeft ? '' : 'sm:ml-auto'}`}
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

        <div className="pb-12" />
      </div>
    </div>
  );
};

const MatchaMenu = ({ section }: { section: MenuSection }) => {
  const items = section.leftItems || [];

  return (
    <div
      className="min-h-fit w-screen flex items-start justify-center"
      style={{
        backgroundImage: "url('/coffee/bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "scroll"
      }}
    >
      <div
        className="w-[92vw] sm:w-[88vw] min-h-auto sm:min-h-[88vh] flex flex-col items-stretch justify-start p-4 sm:p-8 relative"
        style={{ maxWidth: 700 }}
      >
        {/* Border frame */}
        <div className="flex-1 border border-[#c9b896] p-6 sm:p-10 relative" style={{ borderWidth: 2 }}>
          
          {/* MATCHA Title */}
          <div className="text-center mb-10 mt-4">
            <h1
              className="text-4xl sm:text-5xl md:text-[72px] tracking-widest"
              style={{ fontFamily: "'LaLuxes', serif", color: "#c9b896", letterSpacing: "0.2em", fontWeight: 400, marginBottom: 0 }}
            >
              MATCHA
            </h1>
            <span
              className="block text-2xl sm:text-3xl md:text-[42px] -mt-1"
              style={{ fontFamily: "'Tangerine', cursive", color: "#c9782b", letterSpacing: "0.05em" }}
            >
              Menu
            </span>
          </div>

          {/* Items in alternating left/right pattern */}
          <div className="flex flex-col gap-6">
            {items.map((item, idx) => {
              const isLeft = idx % 2 === 0;
              return (
                <div
                  key={idx}
                  className={`w-full sm:w-[70%] ${isLeft ? '' : 'sm:ml-auto'}`}
                >
                  <div className="flex justify-between items-center px-2">
                    <h3
                      className="text-lg sm:text-xl md:text-[26px] tracking-wider"
                      style={{ fontFamily: "'LaLuxes', serif", color: "#efe8d6", letterSpacing: "0.12em" }}
                    >
                      {item.title}
                    </h3>
                    <span
                      className="text-lg sm:text-xl md:text-[24px]"
                      style={{ fontFamily: "'LaLuxes', serif", color: "#efe8d6" }}
                    >
                      {item.price}
                    </span>
                  </div>
                  <div className="mt-2" style={{ borderTop: "1px solid rgba(201,184,150,0.5)" }} />
                </div>
              );
            })}
          </div>

          {/* Matcha illustration at bottom */}
          <div className="flex justify-center mt-10 mb-4">
            <svg viewBox="0 0 200 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-48 sm:w-64 opacity-60">
              {/* Matcha bowl */}
              <ellipse cx="50" cy="55" rx="35" ry="12" stroke="#c9b896" strokeWidth="1.5" fill="none"/>
              <path d="M15 55 Q15 30 50 25 Q85 30 85 55" stroke="#c9b896" strokeWidth="1.5" fill="none"/>
              <ellipse cx="50" cy="25" rx="20" ry="6" stroke="#c9b896" strokeWidth="1" fill="none" opacity="0.5"/>
              
              {/* Chasen (whisk) */}
              <line x1="110" y1="65" x2="110" y2="20" stroke="#c9b896" strokeWidth="1.5"/>
              <path d="M100 20 Q105 5 110 8 Q115 5 120 20" stroke="#c9b896" strokeWidth="1" fill="none"/>
              <line x1="103" y1="20" x2="103" y2="10" stroke="#c9b896" strokeWidth="0.8"/>
              <line x1="106" y1="20" x2="106" y2="8" stroke="#c9b896" strokeWidth="0.8"/>
              <line x1="110" y1="20" x2="110" y2="6" stroke="#c9b896" strokeWidth="0.8"/>
              <line x1="114" y1="20" x2="114" y2="8" stroke="#c9b896" strokeWidth="0.8"/>
              <line x1="117" y1="20" x2="117" y2="10" stroke="#c9b896" strokeWidth="0.8"/>
              
              {/* Chawan (small cups) */}
              <ellipse cx="150" cy="60" rx="12" ry="5" stroke="#c9b896" strokeWidth="1.2" fill="none"/>
              <path d="M138 60 Q138 45 150 42 Q162 45 162 60" stroke="#c9b896" strokeWidth="1.2" fill="none"/>
              
              <ellipse cx="175" cy="60" rx="10" ry="4" stroke="#c9b896" strokeWidth="1.2" fill="none"/>
              <path d="M165 60 Q165 48 175 45 Q185 48 185 60" stroke="#c9b896" strokeWidth="1.2" fill="none"/>
              
              {/* Chashaku (spoon) */}
              <path d="M20 72 Q50 68 80 72" stroke="#c9b896" strokeWidth="1.2" fill="none"/>
              <ellipse cx="80" cy="72" rx="4" ry="2" stroke="#c9b896" strokeWidth="1" fill="none"/>
            </svg>
          </div>
        </div>
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
        backgroundImage: "url('/coffee/bg.png')",
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
      style={{ maxWidth: 1200, backgroundImage: "url('/coffee/bg.png')", backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <div className="flex-1 border border-[#c9b896] p-8 relative" style={{ borderStyle: "dashed" }}>
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
          backgroundImage: "url('/coffee/bg.png')",
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
        <header id="top" className="w-full flex items-center justify-center" style={{ backgroundImage: "url('/coffee/bg.png')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
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
            backgroundImage: "url('/coffee/bg.png')",
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
              {s.id === "chicha" ? <ChichaMenu section={s} /> : s.id === "matcha" ? <MatchaMenu section={s} /> : s.id === "fresh-juice" ? <FreshJuiceMenu section={s} /> : s.id === "mojito-granite-icetea" ? <MojitoGraniteIceTeaMenu section={s} /> : s.id === "frappucino-smoothies" ? <FrappucinoSmoothiesMenu section={s} /> : s.id === "boissons-detox" ? <BoissonsDetoxMenu section={s} /> : s.id === "the-chocolat" ? <TheChocolatMenu section={s} /> : s.id === "cafes-latte-glaces" ? <CafesLatteGlacesMenu section={s} /> : s.id === "cafes-menu" ? <CafesMenu section={s} /> : s.id === "pizzas-2" ? <PizzasGourmetMenu section={s} /> : s.id === "pizzas-1" ? <PizzasMenu section={s} /> : s.id === "sandwichs" ? <SandwichsMenu section={s} /> : s.id === "bowls" ? <BowlsMenu section={s} /> : s.id === "plats" ? <PlatsMenu section={s} /> : s.id === "lasagnes" ? <LasagnesRisottoMenu section={s} /> : s.id === "pates" ? <PatesMenu section={s} /> : s.id === "salades" ? <SaladesMenu section={s} /> : s.id === "omelettes" ? <OmeletteMenu section={s} /> : s.id === "gaufres-crepes" ? <GaufresCrepsMenu section={s} /> : s.id === "crepes-salees" ? <CrepesSaleesMenu section={s} /> : s.id === "brioche-perdue" ? <BriocheMenu section={s} /> : s.id === "croissants-brioche-salee" ? <CroissantsBriocheSaleeMenu section={s} /> : s.id === "croissants-sales" ? <CroissantsSalesMenu section={s} /> : s.id === "toasts-2" ? <Toasts2Menu section={s} /> : s.id === "toasts" ? <ToastsMenu section={s} /> : s.id === "petit-dej" ? <PetitDejMenu section={s} /> : <TwoColumnMenu section={s} />}
            </section>
          ))}
        </div>
      </main>
    </>
  );
}
