export const CATEGORIES = [
  "All",
  "Starters",
  "Wood-Fired Mains",
  "Artisanal Pasta",
  "Signature Desserts",
  "Craft Beverages"
];

export const PHOTO_PRESETS = [
  {
    label: "Arancini / Starter",
    url: "https://images.unsplash.com/photo-1541529086526-db283c563270?auto=format&fit=crop&w=800&q=80"
  },
  {
    label: "Wood-Fired Entree",
    url: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80"
  },
  {
    label: "Artisanal Pasta",
    url: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?auto=format&fit=crop&w=800&q=80"
  },
  {
    label: "Gourmet Dessert",
    url: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=800&q=80"
  },
  {
    label: "Craft Beverage",
    url: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80"
  }
];

export const INITIAL_FOODS = [
  {
    id: 1,
    name: "Truffle & Wild Mushroom Arancini",
    price: 420,
    category: "Starters",
    description: "Crispy Arborio risotto spheres stuffed with black truffle pate, porcini mushrooms, and aged Parmigiano-Reggiano.",
    isVeg: true,
    spiceLevel: 1,
    prepTime: 14,
    available: true,
    image: "https://images.unsplash.com/photo-1541529086526-db283c563270?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 2,
    name: "Charred Burrata & Heirloom Tomato",
    price: 480,
    category: "Starters",
    description: "Creamy artisanal burrata over blistered cherry tomatoes, cold-pressed sweet basil oil, and grilled sourdough.",
    isVeg: true,
    spiceLevel: 1,
    prepTime: 10,
    available: true,
    image: "https://images.unsplash.com/photo-1592417817098-8f3d691a4bf5?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 3,
    name: "Crispy Calamari & Yuzu Aioli",
    price: 540,
    category: "Starters",
    description: " flash-fried squid rings dusted with Togarashi spice, served alongside house-whisked citrus yuzu aioli.",
    isVeg: false,
    spiceLevel: 2,
    prepTime: 12,
    available: true,
    image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 4,
    name: "Smoked Paprika Paneer Steak",
    price: 560,
    category: "Wood-Fired Mains",
    description: "Hearth-roasted cottage cheese steak glazed in smoked Spanish paprika reduction with charred asparagus spears.",
    isVeg: true,
    spiceLevel: 2,
    prepTime: 18,
    available: true,
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 5,
    name: "Herb-Crusted Lamb Cutlets",
    price: 790,
    category: "Wood-Fired Mains",
    description: "Char-grilled tender lamb chops finished with rosemary garlic jus, roasted baby carrots, and Pommes Anna.",
    isVeg: false,
    spiceLevel: 2,
    prepTime: 22,
    available: true,
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 6,
    name: "Wood-Fired Margherita Verace",
    price: 520,
    category: "Wood-Fired Mains",
    description: "72-hour fermented sourdough crust topped with San Marzano tomatoes, Fior di Latte mozzarella, and fresh basil.",
    isVeg: true,
    spiceLevel: 1,
    prepTime: 15,
    available: true,
    image: "https://images.unsplash.com/photo-1604382355076-af4b0eb60143?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 7,
    name: "Saffron & Tiger Prawn Tagliolini",
    price: 680,
    category: "Artisanal Pasta",
    description: "Hand-cut egg pasta tossed with grilled tiger prawns, Kashmiri saffron bisque, confit garlic, and lemon zest.",
    isVeg: false,
    spiceLevel: 2,
    prepTime: 16,
    available: true,
    image: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 8,
    name: "Wild Porcini & Sage Ravioli",
    price: 590,
    category: "Artisanal Pasta",
    description: "Delicate pasta pillows filled with roasted forest mushrooms and ricotta, finished in browned sage butter.",
    isVeg: true,
    spiceLevel: 1,
    prepTime: 15,
    available: true,
    image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 9,
    name: "Basque Burnt Cheesecake",
    price: 390,
    category: "Signature Desserts",
    description: "Caramelized San Sebastian style cheesecake with a creamy Madagascar vanilla center and berry compote.",
    isVeg: true,
    spiceLevel: 0,
    prepTime: 8,
    available: true,
    image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 10,
    name: "70% Dark Valrhona Chocolate Fondant",
    price: 440,
    category: "Signature Desserts",
    description: "Warm molten-center dark chocolate cake served with salted pistachio gelato and cocoa tuile.",
    isVeg: true,
    spiceLevel: 0,
    prepTime: 14,
    available: true,
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 11,
    name: "Smoked Rosemary & Blood Orange Spritz",
    price: 290,
    category: "Craft Beverages",
    description: "Freshly pressed Sicilian blood orange juice infused with torched rosemary syrup and artisanal tonic.",
    isVeg: true,
    spiceLevel: 0,
    prepTime: 5,
    available: true,
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80"
  }
];
