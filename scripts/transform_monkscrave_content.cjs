const fs = require('fs');
const path = require('path');

const ROOT = 'c:/Users/ZETICUZ/Music/El Farm Cafe and Restaurant';
const restoData = JSON.parse(fs.readFileSync(path.join(ROOT, 'src/data/restoData.json'), 'utf8'));

// Copy official ZETICUZ SVG logo into assets/images/zeticuz-logo.svg
const zeticuzSrc = 'C:/Users/ZETICUZ/.gemini/config/skills/zeticuz-profile/zeticuz-logo.svg';
const zeticuzDest = path.join(ROOT, 'assets/images/zeticuz-logo.svg');
if (fs.existsSync(zeticuzSrc)) {
  fs.copyFileSync(zeticuzSrc, zeticuzDest);
}

// Copy the SSR menu card dish images + video poster + blog detail hero image into assets/images/
const ssrDishCopies = [
  ['public/assets/menu/studio-crispy-pata.jpg', 'assets/images/AvBMxfABr1rynfnaeNp3UnXUFI4.png'],
  ['public/assets/menu/studio-seafood-bilao.jpg', 'assets/images/CBgNiEhjs18VYIIUJ4cpwLikXc.png'],
  ['public/assets/menu/studio-coconut-matcha-cloud.jpg', 'assets/images/lfILwFRnauLujF02Phxk22TB8MY.png'],
  ['public/assets/menu/studio-tiyula-itum.jpg', 'assets/images/Jzc1vfDXBXBHNYHAbZCWpYK6fk.png'],
  ['public/assets/menu/studio-putok-batok-goto.jpg', 'assets/images/eP7teFsVW9rNtPP5aGnEtOrA7Qs.png'],
  ['public/assets/menu/studio-popcorn-latte.jpg', 'assets/images/D7nXQN03yxNmwK2rS610UZJ0ClA.png'],
  ['public/assets/resto-views/resto-1.jpg', 'assets/images/4WFXrcQsvuu3zgoqUQteURNLjV8.png'],
  ['public/assets/resto-views/resto-1.jpg', 'assets/images/Vvys1nYJ5g2CQE6rXwycDfTNkY.png'],
  ['public/assets/resto-views/resto-4.jpg', 'assets/images/VW9jfrMKGnJvAPcIFeHDQUA44.png'],
  ['public/assets/resto-views/resto-5.jpg', 'assets/images/1brzvnX6w5uxGnawGF8WYYY70I.png'],
  ['public/assets/resto-views/resto-6.jpg', 'assets/images/XiDCr6H0L2pzCdbVT0MuAVtBLM.png'],
];
for (const [srcRel, destRel] of ssrDishCopies) {
  const s = path.join(ROOT, srcRel);
  const d = path.join(ROOT, destRel);
  if (fs.existsSync(s)) fs.copyFileSync(s, d);
}

// Build lookup map of Framer asset ID -> actual filename in assets/images/
const imagesDir = path.join(ROOT, 'assets/images');
const framerAssetMap = {};
for (const fname of fs.readdirSync(imagesDir)) {
  const m = fname.match(/^([A-Za-z0-9_-]+)-[0-9a-f]{8}\.[a-zA-Z0-9]+$/);
  if (m) {
    framerAssetMap[m[1]] = `./assets/images/${fname}`;
  }
}

/**
 * Phase 4: Complete 49-Item Menu Inventory with 100% Dedicated Studio HD Visuals
 * Zero static menu-list scans. Every single food and drink has its own studio-lit photo.
 */
const ACCURATE_MENU_ITEMS = [
  // ================= SIGNATURE COFFEE (9 ITEMS) =================
  {
    id: 'dirty-coffee',
    name: 'Dirty Coffee (Iced Only)',
    category: 'coffee',
    categoryLabel: 'Signature Coffee',
    priceDisplay: '₱70',
    description: 'Rich double-shot espresso poured over ice-cold creamy milk in a branded EL Farm clear cup — create your own swirl.',
    cleanImage: './assets/menu/studio-dirty-coffee.jpg',
  },
  {
    id: 'butter-caramel-popcorn-latte',
    name: 'Butter Caramel Popcorn Latte',
    category: 'coffee',
    categoryLabel: 'Signature Coffee',
    priceDisplay: '₱130',
    description: 'Buttery caramel espresso latte topped with velvety whipped cream and golden caramel popcorn crunch.',
    cleanImage: './assets/menu/studio-popcorn-latte.jpg?v=22',
  },
  {
    id: 'lamitan-sunrise',
    name: 'Lamitan Sunrise (Orange Espresso)',
    category: 'coffee',
    categoryLabel: 'Signature Coffee',
    priceDisplay: '₱95',
    description: 'Refreshing citrus-infused iced espresso layered over bright golden-orange juice in our signature EL Farm cup.',
    cleanImage: './assets/menu/studio-lamitan-sunrise.jpg',
  },
  {
    id: 'spanish-latte',
    name: 'Iced Spanish Latte',
    category: 'coffee',
    categoryLabel: 'Signature Coffee',
    priceDisplay: '₱100',
    description: 'Smooth double-shot espresso blended with rich, silky sweetened condensed milk and fresh chilled milk over crystal ice.',
    cleanImage: './assets/menu/studio-spanish-latte.jpg',
  },
  {
    id: 'biscoff-latte',
    name: 'Lotus Biscoff Latte',
    category: 'coffee',
    categoryLabel: 'Signature Coffee',
    priceDisplay: '₱120',
    description: 'Creamy espresso latte swirled with caramelized Lotus Biscoff spread, whipped cream, and a whole Biscoff biscuit.',
    cleanImage: './assets/menu/studio-biscoff-latte.jpg',
  },
  {
    id: 'salted-caramel-latte',
    name: 'Salted Caramel Latte',
    category: 'coffee',
    categoryLabel: 'Signature Coffee',
    priceDisplay: '₱100',
    description: 'Velvety espresso and milk ribboned with house-made sea-salted caramel sauce and cold milk foam.',
    cleanImage: './assets/menu/studio-salted-caramel-latte.jpg',
  },
  {
    id: 'honeycomb-latte',
    name: 'Golden Honeycomb Latte',
    category: 'coffee',
    categoryLabel: 'Signature Coffee',
    priceDisplay: '₱110',
    description: 'Handcrafted iced latte sweetened with wildflower honey and crowned with crisp golden honeycomb toffee crunch.',
    cleanImage: './assets/menu/studio-honeycomb-latte.jpg',
  },
  {
    id: 'brown-sugar-cinnamon-latte',
    name: 'Brown Sugar Cinnamon Latte',
    category: 'coffee',
    categoryLabel: 'Signature Coffee',
    priceDisplay: '₱100',
    description: 'Aromatic espresso shaken with dark muscovado brown sugar syrup, warm Ceylon cinnamon dust, and creamy milk.',
    cleanImage: './assets/menu/studio-brown-sugar-cinnamon-latte.jpg',
  },
  {
    id: 'classic-americano',
    name: 'Classic Iced Americano',
    category: 'coffee',
    categoryLabel: 'Signature Coffee',
    priceDisplay: '₱50',
    description: 'Bold, freshly pulled double-shot signature roast espresso poured over crystal-clear artisan ice with golden crema.',
    cleanImage: './assets/menu/studio-americano.jpg',
  },

  // ================= MATCHA, HOJICHA, SMOOTHIES & YOGHURT (10 ITEMS) =================
  {
    id: 'coconut-matcha-cloud',
    name: 'Coconut Matcha Cloud',
    category: 'matcha-smoothies',
    categoryLabel: 'Matcha & Smoothies',
    priceDisplay: '₱140',
    description: 'Refreshing young coconut water crowned with a velvety ceremonial matcha cream cloud inside a real fresh buko shell.',
    cleanImage: './assets/menu/studio-coconut-matcha-cloud.jpg?v=21',
  },
  {
    id: 'el-special-matcha',
    name: 'EL Special Matcha (Dunya)',
    category: 'matcha-smoothies',
    categoryLabel: 'Matcha & Smoothies',
    priceDisplay: '₱140',
    description: 'Our signature ceremonial-grade Uji matcha layered over velvety vanilla sweet cream with roasted nutty notes.',
    cleanImage: './assets/menu/studio-el-special-matcha.jpg',
  },
  {
    id: 'matcha-latte',
    name: 'Ceremonial Matcha Latte',
    category: 'matcha-smoothies',
    categoryLabel: 'Matcha & Smoothies',
    priceDisplay: '₱110',
    description: 'Whisked ceremonial green tea matcha poured over chilled creamy milk for a vibrant, earthy, and smooth pick-me-up.',
    cleanImage: './assets/menu/studio-matcha-latte.jpg',
  },
  {
    id: 'hojicha-latte',
    name: 'Roasted Hojicha Latte',
    category: 'matcha-smoothies',
    categoryLabel: 'Matcha & Smoothies',
    priceDisplay: '₱110',
    description: 'Slow-roasted Japanese green tea latte with comforting notes of toasted cocoa, caramel, and warm nutty aroma.',
    cleanImage: './assets/menu/studio-hojicha-latte.jpg',
  },
  {
    id: 'hojicha-earl-grey',
    name: 'Hojicha Earl Grey Latte',
    category: 'matcha-smoothies',
    categoryLabel: 'Matcha & Smoothies',
    priceDisplay: '₱120',
    description: 'Artisanal fusion of roasted Japanese hojicha and fragrant bergamot-infused Earl Grey tea layered with silky milk.',
    cleanImage: './assets/menu/studio-hojicha-earl-grey.jpg',
  },
  {
    id: 'smores-smoothie',
    name: "S'mores Campfire Smoothie",
    category: 'matcha-smoothies',
    categoryLabel: 'Matcha & Smoothies',
    priceDisplay: '₱140',
    description: 'Decadent dark-chocolate smoothie blend topped with flame-toasted marshmallows, rich fudge drizzle, and graham crunch.',
    cleanImage: './assets/menu/studio-smores-smoothie.jpg',
  },
  {
    id: 'dubai-chewy-cookie-smoothie',
    name: 'Dubai Chewy Cookie Smoothie',
    category: 'matcha-smoothies',
    categoryLabel: 'Matcha & Smoothies',
    priceDisplay: '₱160',
    description: 'Rich Belgian chocolate smoothie layered with roasted pistachio cream, chewy cookie crumble, and crushed pistachios.',
    cleanImage: './assets/menu/studio-dubai-chewy-cookie-smoothie.jpg',
  },
  {
    id: 'mulberry-yoghurt',
    name: 'Mulberry Yoghurt Refresher',
    category: 'matcha-smoothies',
    categoryLabel: 'Matcha & Smoothies',
    priceDisplay: '₱85',
    description: 'Tangy probiotic farm yoghurt swirled with house-simmered dark mulberry compote in our signature EL Farm cup.',
    cleanImage: './assets/menu/studio-mulberry-yoghurt.jpg',
  },
  {
    id: 'blueberry-yoghurt',
    name: 'Blueberry Yoghurt Refresher',
    category: 'matcha-smoothies',
    categoryLabel: 'Matcha & Smoothies',
    priceDisplay: '₱85',
    description: 'Creamy non-caffeinated yoghurt drink ribboned with sweet wild blueberry preserves and real berry fruit.',
    cleanImage: './assets/menu/studio-blueberry-yoghurt.jpg?v=21',
  },
  {
    id: 'strawberry-yoghurt',
    name: 'Strawberry Yoghurt Refresher',
    category: 'matcha-smoothies',
    categoryLabel: 'Matcha & Smoothies',
    priceDisplay: '₱85',
    description: 'Refreshing chilled probiotic yoghurt layered with ruby-red strawberry puree and sweet fruit chunks.',
    cleanImage: './assets/menu/studio-strawberry-yoghurt.jpg',
  },

  // ================= EVERYDAY SILOGS, GOTO & WRAPS (6 ITEMS) =================
  {
    id: 'tapsilog',
    name: 'Classic Beef Topsilog / Tapsilog',
    category: 'everyday',
    categoryLabel: 'Everyday Silogs & Goto',
    priceDisplay: '₱120',
    description: 'Tender sweet-savory marinated beef tapa pan-seared to perfection and served with golden garlic sinangag rice and sunny-side-up egg.',
    cleanImage: './assets/menu/studio-tapsilog.jpg',
  },
  {
    id: 'sisig-silog',
    name: 'Crispy Sisig Silog',
    category: 'everyday',
    categoryLabel: 'Everyday Silogs & Goto',
    priceDisplay: '₱150',
    description: 'Solo serving of our signature crispy sizzling sisig paired with fragrant garlic fried rice and a sunny-side-up farm egg.',
    cleanImage: './assets/menu/studio-sisig-silog.jpg',
  },
  {
    id: 'hotsilog',
    name: 'Classic Pinoy Hotsilog',
    category: 'everyday',
    categoryLabel: 'Everyday Silogs & Goto',
    priceDisplay: '₱100',
    description: 'Two plump, juicy red hotdogs diamond-scored and pan-fried, served alongside golden garlic fried rice and a fried egg.',
    cleanImage: './assets/menu/studio-hotsilog.jpg',
  },
  {
    id: 'putok-batok-goto',
    name: 'Putok Batok Bone Marrow Goto',
    category: 'everyday',
    categoryLabel: 'Everyday Silogs & Goto',
    priceDisplay: '₱150',
    description: 'Velvety ginger-infused rice porridge crowned with a whole torched beef bone marrow canoe, toasted garlic, and scallions.',
    cleanImage: './assets/menu/studio-putok-batok-goto.jpg',
  },
  {
    id: 'goto-overload',
    name: 'Special Goto Overload',
    category: 'everyday',
    categoryLabel: 'Everyday Silogs & Goto',
    priceDisplay: '₱120',
    description: 'Hearty lugaw rice porridge loaded with tender beef tripe, boiled egg, crispy garlic bits, spring onions, and calamansi.',
    cleanImage: './assets/menu/studio-goto-overload.jpg',
  },
  {
    id: 'samyang-wrap',
    name: 'Spicy Samyang Buldak Wrap',
    category: 'everyday',
    categoryLabel: 'Everyday Silogs & Goto',
    priceDisplay: '₱130',
    description: 'Fiery Korean Samyang buldak noodles, melted mozzarella cheese, and savory meat wrapped inside a warm toasted tortilla.',
    cleanImage: './assets/menu/studio-samyang-wrap.jpg',
  },

  // ================= NON-PORK HEIRLOOM & SIZZLING DISHES (9 ITEMS) =================
  {
    id: 'tiyula-itum',
    name: 'Tiyula Itum (Heirloom Black Beef Soup)',
    category: 'non-pork',
    categoryLabel: 'Non-Pork Specials',
    priceDisplay: '₱220',
    description: "Basilan's iconic black beef soup slow-cooked with roasted coconut flesh, lemongrass, galangal, ginger, and native spices.",
    cleanImage: './assets/menu/studio-tiyula-itum.jpg',
  },
  {
    id: 'chicken-kaliya',
    name: 'Festive Chicken Kaliya',
    category: 'non-pork',
    categoryLabel: 'Non-Pork Specials',
    priceDisplay: '₱350',
    description: 'Traditional Yakan festive chicken stew simmered in rich golden turmeric, toasted coconut, paminta, and heirloom herbs.',
    cleanImage: './assets/menu/studio-chicken-kaliya.jpg',
  },
  {
    id: 'native-chicken-tinola',
    name: 'Native Chicken Tinola',
    category: 'non-pork',
    categoryLabel: 'Non-Pork Specials',
    priceDisplay: '₱350',
    description: 'Free-range native farm chicken slow-simmered in fragrant ginger and lemongrass broth with green papaya and chili leaves.',
    cleanImage: './assets/menu/studio-native-tinola.jpg',
  },
  {
    id: 'karekareng-hito',
    name: 'Crispy Kare-Kareng Hito',
    category: 'non-pork',
    categoryLabel: 'Non-Pork Specials',
    priceDisplay: '₱300',
    description: 'Crispy whole freshwater catfish ladled with thick roasted peanut kare-kare sauce, eggplant, string beans, and pechay.',
    cleanImage: './assets/menu/studio-karekareng-hito.jpg',
  },
  {
    id: 'crispy-fried-hito',
    name: 'Crispy Fried Whole Hito',
    category: 'non-pork',
    categoryLabel: 'Non-Pork Specials',
    priceDisplay: '₱250',
    description: 'Whole fresh hito (catfish) deep-fried until golden and crackling, served with spiced cane vinegar and soy-calamansi dip.',
    cleanImage: './assets/menu/studio-crispy-fried-hito.jpg',
  },
  {
    id: 'kambing-papaitan',
    name: 'Authentic Kambing Papaitan',
    category: 'non-pork',
    categoryLabel: 'Non-Pork Specials',
    priceDisplay: '₱250',
    description: 'Tender goat meat and innards simmered in a bold, savory-citrusy ginger and garlic broth with green finger chilies.',
    cleanImage: './assets/menu/studio-kambing-papaitan.jpg',
  },
  {
    id: 'adobing',
    name: 'Adobing (Slow-Braised Goat Adobo)',
    category: 'non-pork',
    categoryLabel: 'Non-Pork Specials',
    priceDisplay: '₱250',
    description: 'Succulent goat meat slow-braised until fork-tender in soy sauce, cane vinegar, crushed garlic, bay leaves, and peppercorns.',
    cleanImage: './assets/menu/studio-adobing.jpg',
  },
  {
    id: 'chicken-sisig',
    name: 'Sizzling Chicken Sisig',
    category: 'non-pork',
    categoryLabel: 'Non-Pork Specials',
    priceDisplay: '₱200',
    description: 'Finely chopped grilled chicken tossed with red onions, finger chilies, calamansi, and creamy house dressing on a sizzling plate.',
    cleanImage: './assets/menu/studio-chicken-sisig.jpg',
  },
  {
    id: 'bangus-sisig',
    name: 'Sizzling Bangus Sisig',
    category: 'non-pork',
    categoryLabel: 'Non-Pork Specials',
    priceDisplay: '₱200',
    description: 'Flaked crispy golden milkfish (bangus) belly sizzled with diced onions, ginger, chili peppers, and fresh calamansi juice.',
    cleanImage: './assets/menu/studio-bangus-sisig.jpg',
  },

  // ================= PORK FAVORITES (3 ITEMS) =================
  {
    id: 'crispy-pata',
    name: 'Golden Crispy Pata',
    category: 'pork',
    categoryLabel: 'Pork Favorites',
    priceDisplay: '₱850',
    description: 'Deep-fried whole pork knuckle with ultra-crispy golden crackling skin and juicy meat, served with spiced soy-vinegar dip.',
    cleanImage: './assets/menu/studio-crispy-pata.jpg',
  },
  {
    id: 'sizzling-sisig',
    name: 'Sizzling Pork Sisig',
    category: 'pork',
    categoryLabel: 'Pork Favorites',
    priceDisplay: '₱220',
    description: 'Savory chopped crispy pork mask and belly sizzled with onions, chili peppers, calamansi, and a fresh cracked egg on top.',
    cleanImage: './assets/menu/studio-sizzling-sisig.jpg',
  },
  {
    id: 'dinuguan',
    name: 'Special Pork Dinuguan',
    category: 'pork',
    categoryLabel: 'Pork Favorites',
    priceDisplay: '₱150',
    description: 'Rich, savory pork stew slow-simmered in dark spiced gravy with crushed garlic, cane vinegar, and green finger chilies.',
    cleanImage: './assets/menu/studio-dinuguan.jpg',
  },

  // ================= SNACKS, NATIVE DELICACIES & DESSERTS (6 ITEMS) =================
  {
    id: 'chix-n-fries',
    name: "Crispy Chix N' Fries Basket",
    category: 'snacks-desserts',
    categoryLabel: 'Snacks & Delicacies',
    priceDisplay: '₱120',
    description: 'Golden crispy fried chicken bites paired with seasoned crinkle-cut French fries, house cheese dip, and tangy ketchup.',
    cleanImage: './assets/menu/studio-chix-n-fries.jpg',
  },
  {
    id: 'crispy-calamares',
    name: 'Crispy Golden Calamares',
    category: 'snacks-desserts',
    categoryLabel: 'Snacks & Delicacies',
    priceDisplay: '₱150',
    description: 'Tender squid rings battered in seasoned flour and fried to a light, golden crunch, served with garlic mayo and spiced vinegar.',
    cleanImage: './assets/menu/studio-calamares.jpg?v=21',
  },
  {
    id: 'barkadahan-special',
    name: 'Barkadahan Special Platter',
    category: 'snacks-desserts',
    categoryLabel: 'Snacks & Delicacies',
    priceDisplay: '₱220',
    description: 'Loaded sharing platter for 3–4 guests featuring crispy chicken strips, fries, golden lumpia, kropek, and trio of dips.',
    cleanImage: './assets/menu/studio-barkadahan-special.jpg?v=21',
  },
  {
    id: 'saging-con-ginamus',
    name: 'Saging Con Ginamus',
    category: 'snacks-desserts',
    categoryLabel: 'Snacks & Delicacies',
    priceDisplay: '₱90',
    description: 'Golden fried saba plantains served hot with traditional savory-spicy fermented fish dip (ginamus) squeezed with calamansi.',
    cleanImage: './assets/menu/studio-saging-con-ginamus.jpg?v=21',
  },
  {
    id: 'kamanting-con-haleya',
    name: 'Kamanting Con Haleya',
    category: 'snacks-desserts',
    categoryLabel: 'Snacks & Delicacies',
    priceDisplay: '₱120',
    description: 'Traditional Basilan delicacy of tender steamed cassava (kamanting) topped with rich caramelized coconut jam (haleya).',
    cleanImage: './assets/menu/studio-kamanting-con-haleya.jpg',
  },
  {
    id: 'brownie-cupcakes',
    name: 'Fudgy Brownie Cupcakes',
    category: 'snacks-desserts',
    categoryLabel: 'Snacks & Delicacies',
    priceDisplay: '₱45',
    description: 'Rich, fudgy dark-chocolate brownie cupcakes with a crinkly top, studded with chocolate chips and festive sprinkles.',
    cleanImage: './assets/menu/studio-brownie-cupcakes.jpg',
  },

  // ================= SALU-SALO BILAO FEASTS (6 ITEMS) =================
  {
    id: 'seafood-feast-bilao',
    name: 'Seafood Feast Bilao',
    category: 'feasts',
    categoryLabel: 'Salu-Salo Feasts',
    priceDisplay: '₱1,599',
    description: 'Bountiful coastal bilao loaded with Basilan Curacha crab, garlic butter shrimp, crispy calamares, grilled fish, rice, and fruits.',
    cleanImage: './assets/menu/studio-seafood-bilao.jpg?v=22',
  },
  {
    id: 'all-time-favorites-combo',
    name: 'All-Time Favorites Combo Feast',
    category: 'feasts',
    categoryLabel: 'Salu-Salo Feasts',
    priceDisplay: '₱1,299',
    description: 'Full family feast combining a Pancit Miki Special bilao, golden Crispy Fried Chicken platter, lumpia shanghai, and hot soup.',
    cleanImage: './assets/menu/studio-all-time-favorites-combo.jpg',
  },
  {
    id: 'chicken-pancit-miki-combo',
    name: 'Chicken & Pancit Miki Combo',
    category: 'feasts',
    categoryLabel: 'Salu-Salo Feasts',
    priceDisplay: '₱1,199',
    description: 'Golden crispy fried chicken paired with a generous bilao of Pancit Miki Special, crispy lumpia shanghai, and boiled eggs.',
    cleanImage: './assets/menu/studio-chicken-miki-combo.jpg?v=21',
  },
  {
    id: 'pinoy-favorites-bilao',
    name: 'Pinoy Favorites Bilao',
    category: 'feasts',
    categoryLabel: 'Salu-Salo Feasts',
    priceDisplay: '₱999',
    description: 'Grilled barbecue skewers, salted duck eggs, ensalada, steamed white rice, and fresh watermelon & pineapple on banana leaves.',
    cleanImage: './assets/menu/studio-pinoy-bilao.jpg?v=21',
  },
  {
    id: 'chicken-bilao',
    name: 'Golden Chicken Bilao',
    category: 'feasts',
    categoryLabel: 'Salu-Salo Feasts',
    priceDisplay: '₱749',
    description: 'Crispy golden fried chicken pieces surrounded by airy prawn crackers (kropek) and served with house gravy and dips.',
    cleanImage: './assets/menu/studio-chicken-bilao.jpg?v=22',
  },
  {
    id: 'pancit-miki-bilao',
    name: 'Pancit Miki Special Bilao',
    category: 'feasts',
    categoryLabel: 'Salu-Salo Feasts',
    priceDisplay: '₱500',
    description: 'Stir-fried heirloom Basilan miki noodles topped with savory meats, vegetables, crispy lumpia shanghai, and sliced eggs.',
    cleanImage: './assets/menu/studio-pancit-miki-bilao.jpg',
  },
];

// Keep src/data/restoData.json menu synced with all 49 studio items
restoData.menuItems = ACCURATE_MENU_ITEMS;
fs.writeFileSync(path.join(ROOT, 'src/data/restoData.json'), JSON.stringify(restoData, null, 2), 'utf8');

// Text & URL replacements for all 5 pages (Home, About, Menu, Blog, Contact) and JS/MJS bundles
const TEXT_REPLACEMENTS = [
  // Phase 2: Replace Homepage Hero Video Player source with lv_0_20261114173731.mp4 (fast-start 1080p + adaptive master)
  ['https://framerusercontent.com./assets/If6WM6ewOJhlLv6hDT9NyusyTlc.mp4', './assets/video/hero-main-1080p.mp4'],
  ['https://framerusercontent.com/assets/If6WM6ewOJhlLv6hDT9NyusyTlc.mp4', './assets/video/hero-main-1080p.mp4'],
  ['./assets/video/intro.mp4', './assets/video/hero-main-1080p.mp4'],

  // Phase 5: Strip pre-filled default look in Book a Table form & replace with clean empty placeholders + 2026 options
  ['placeholder:"Julia"', 'placeholder:"Enter first name"'],
  ['placeholder:"William"', 'placeholder:"Enter last name"'],
  ['placeholder:"Julia25@gmail.com"', 'placeholder:"yourname@email.com"'],
  ['placeholder:"+012 02144 "', 'placeholder:""'],
  ['placeholder="Julia"', 'placeholder="Enter first name"'],
  ['placeholder="William"', 'placeholder="Enter last name"'],
  ['placeholder="Julia25@gmail.com"', 'placeholder="yourname@email.com"'],
  ['placeholder="+012 02144 "', 'placeholder=""'],
  [
    'selectOptions:[{disabled:!0,title:"11:00 PM",type:"option",value:""},{title:"11:00 PM",type:"option",value:"11:00 PM"},{title:"12:00 PM",type:"option",value:"12:00 PM"},{title:"03:00 PM",type:"option",value:"03:00 PM"},{title:"05:00 PM",type:"option",value:"05:00 PM"}]',
    'selectOptions:[{disabled:!0,title:"Select preferred time",type:"option",value:""},{title:"9:00 AM",type:"option",value:"9:00 AM"},{title:"11:00 AM",type:"option",value:"11:00 AM"},{title:"12:30 PM",type:"option",value:"12:30 PM"},{title:"3:00 PM",type:"option",value:"3:00 PM"},{title:"5:30 PM",type:"option",value:"5:30 PM"},{title:"7:00 PM",type:"option",value:"7:00 PM"},{title:"8:00 PM",type:"option",value:"8:00 PM"}]'
  ],
  [
    'selectOptions:[{disabled:!0,title:"04-05-2024",type:"option",value:""},{title:"04-05-2024",type:"option",value:"04-05-2024"},{title:"05-05-2024",type:"option",value:"05-05-2024"},{title:"06-05-2024",type:"option",value:"06-05-2024"}]',
    'selectOptions:[{disabled:!0,title:"Select reservation date",type:"option",value:""},{title:"Today",type:"option",value:"Today"},{title:"Tomorrow",type:"option",value:"Tomorrow"},{title:"This Weekend",type:"option",value:"This Weekend"},{title:"Custom Date (See Notes)",type:"option",value:"Custom Date"}]'
  ],
  [
    'selectOptions:[{disabled:!0,title:"4",type:"option",value:""},{title:"4",type:"option",value:"4"},{title:"5",type:"option",value:"5"},{title:"6",type:"option",value:"6"},{title:"10",type:"option",value:"10"}]',
    'selectOptions:[{disabled:!0,title:"Select number of guests",type:"option",value:""},{title:"1 - 2 Guests",type:"option",value:"2 Guests"},{title:"3 - 4 Guests",type:"option",value:"4 Guests"},{title:"5 - 6 Guests",type:"option",value:"6 Guests"},{title:"7 - 10 Guests",type:"option",value:"10 Guests"},{title:"10+ Guests (Salu-Salo / Event)",type:"option",value:"10+ Guests"}]'
  ],

  ['[Your Restaurant Name]', 'El Farm Cafe & Resto'],
  ['At Crave', 'At El Farm Cafe & Resto'],
  ['Monks Crave', 'El Farm Cafe & Resto'],
  ['Where Cravings Meet Their Perfect Match', 'Where Farm Charm Meets Culinary Bliss'],
  [
    'children:"Cravings"})," Meet Their ",e("span",{style:{"--framer-text-color":"var(--token-96b34807-8926-496d-91c3-acabb6da071c, rgb(239, 201, 164))"},children:"Perfect "}),"Match"',
    'children:"Farm Charm"})," Meets ",e("span",{style:{"--framer-text-color":"var(--token-96b34807-8926-496d-91c3-acabb6da071c, rgb(239, 201, 164))"},children:"Culinary "}),"Bliss"'
  ],
  [
    'Discover bold flavors and unforgettable dishes in a place where every craving is satisfied with the perfect bite, crafted just for you.',
    'Escape the ordinary in Sitio Nipa, Lamitan City — savor specialty coffee, ceremonial matcha, heirloom Basilan cuisine, Salu-Salo bilaos, and night pickleball under the palms.'
  ],
  // About Page Replacements
  ['A Journey of Taste & Tradition', 'A Sanctuary of Farm Charm & Flavor'],
  ['A Journey of Taste &amp; Tradition', 'A Sanctuary of Farm Charm &amp; Flavor'],
  [
    'Food is a journey of flavors that connect people and create joy. Our team delivers a fresh and unforgettable dining experience.',
    'Tucked in the tranquil greenery of Sitio Nipa, Brgy. Maloong Canal, Lamitan City, El Farm Cafe and Restaurant connects families, coffee lovers, and pickleball players over unforgettable meals.'
  ],
  [
    'It all started during a family gathering when I realized how much joy food brings to people. Surrounded by loved ones, I saw the power of a shared meal. That’s when the idea struck',
    'Born in Sitio Nipa, Brgy. Maloong Canal, Lamitan City, our vision began with a simple dream: to transform our peaceful family farm into a welcoming sanctuary where loved ones gather over great food.'
  ],
  [
    "It all started during a family gathering when I realized how much joy food brings to people. Surrounded by loved ones, I saw the power of a shared meal. That's when the idea struck",
    'Born in Sitio Nipa, Brgy. Maloong Canal, Lamitan City, our vision began with a simple dream: to transform our peaceful family farm into a welcoming sanctuary where loved ones gather over great food.'
  ],
  [
    'Our journey began with a simple yet bold idea, but it needed a culinary expert to bring it to life. Enter Chef, a passionate innovator who shared our vision of crafting dishes that told a story',
    'We paired Basilan heirloom dishes like Tiyula Itum, Chicken Kaliya, and Native Chicken Tinola with handcrafted Dirty Coffee, Coconut Matcha Cloud in fresh buko, and overflowing Salu-Salo Bilaos.'
  ],
  ['EditorBar:typeof y<"u"?', 'EditorBar:false?'],
  ['lr(document.getElementById("__framer-badge-container"))', 'false&&lr(document.getElementById("__framer-badge-container"))'],
  [
    'What began as a small, cozy eatery quickly became a beloved dining destination. Word spread, and our commitment to great food and exceptional service drew people from all over.',
    "Word quickly spread across Lamitan City and Basilan — 'Malayo man kami, sulit naman ang dayo!' Families, faculty groups, and travelers began making the trip to dine under our lantern-lit trees."
  ],
  [
    'Innovation has always been at our core. From embracing online reservations to launching our fast delivery service, we’ve constantly adapted to serve our guests better.',
    'Adding our floodlit outdoor pickleball court, starlight garden canopies, advance pre-ordering, and Lamitan delivery (+₱100), El Farm has grown into Basilan’s premier lifestyle & dining destination.'
  ],
  [
    "Innovation has always been at our core. From embracing online reservations to launching our fast delivery service, we've constantly adapted to serve our guests better.",
    'Adding our floodlit outdoor pickleball court, starlight garden canopies, advance pre-ordering, and Lamitan delivery (+₱100), El Farm has grown into Basilan’s premier lifestyle & dining destination.'
  ],
  ['Our Chef’s', 'Our Sanctuary'],
  ["Our Chef's", 'Our Sanctuary'],
  ['They are Ready to Treat You', 'Crafted with Warmth in Sitio Nipa'],
  ['Assistant Chef', 'Night Pickleball & Al-Fresco Court'],
  ['Denial Frankie', 'Floodlit Pickleball Court'],
  ['Mical Pelis', 'Timber Café Pavilion'],
  ['Alex Jhon', 'Starlight Garden Canopies'],
  // Why Choose Section
  ['We Provide Elegant Service for People', 'Crafted for Coffee Lovers, Families & Pickleball Rallies'],
  ['Delicious Food', 'Heirloom Cuisine'],
  [
    "Our dishes are full of fresh, bold flavors that you'll love.",
    'From authentic Tiyula Itum and Golden Crispy Pata to overflowing Salu-Salo Bilaos.'
  ],
  [
    'Enjoy your meal in a cozy and welcoming for every occasion.',
    'Dine under starlight sail canopies, warm lantern trees, and our timber café pavilion.'
  ],
  ['Friendly Service', 'Night Pickleball'],
  [
    'Dedicated to ensuring seamless service with available.',
    'Rally day or night on our floodlit outdoor pickleball court surrounded by coconut palms.'
  ],
  ['Fresh Ingredients', 'Specialty Café Bar'],
  [
    'We use best freshest ingredients to make every dish perfect.',
    'Freshly pulled Dirty Coffee, Butter Caramel Popcorn Latte, and Coconut Matcha in real buko.'
  ],
  // Menu Section
  [
    'Discover our tailored dining services designed to match your day’s rhythm. From energizing breakfasts to satisfying lunches and elegant dinners.',
    'Explore our complete curated menu of signature espresso drinks, ceremonial matcha, heirloom Basilan dishes, sizzling favorites, and Salu-Salo feasts.'
  ],
  [
    "Discover our tailored dining services designed to match your day's rhythm. From energizing breakfasts to satisfying lunches and elegant dinners.",
    'Explore our complete curated menu of signature espresso drinks, ceremonial matcha, heirloom Basilan dishes, sizzling favorites, and Salu-Salo feasts.'
  ],
  ['Beef Skewers', 'Golden Crispy Pata'],
  ['$30', '₱850'],
  [
    'Delicious beef skewers drizzled with a sweet chili glaze. Perfect for grilling and sharing!',
    'Deep-fried whole pork knuckle with ultra-crispy golden skin and tender meat, served with signature soy-vinegar dip.'
  ],
  ['Sushi California Rolls', 'Seafood Feast Bilao'],
  ['$12.99', '₱1,599'],
  [
    'Delicious beef skewers drizzled with a sweet chili glaze perfect for the grill!',
    'Bountiful coastal bilao for 6–8 guests with Basilan Curacha crab, crispy garlic shrimp, calamares, garlic rice, and fresh fruits.'
  ],
  ['Sea Fish Steak', 'Coconut Matcha Cloud'],
  ['$44', '₱140'],
  [
    'Delicious fish steak drizzled with sweet chili sauc.',
    'Refreshing young coconut water topped with a velvety ceremonial matcha cream cloud, served inside a real fresh buko shell.'
  ],
  ['Savory Veggie Wraps', 'Tiyula Itum (Beef)'],
  ['$28', '₱220'],
  [
    'Fresh vegetables, flavorful sauces, and soft wraps combine for a deliciously satisfying, healthy bite.',
    "Basilan's iconic black beef soup slow-cooked with toasted coconut, burnt spices, lemongrass, and heirloom aromatics."
  ],
  ['Grilled Chicken Salad', 'Putok Batok Bone Marrow Goto'],
  ['$10.99', '₱150'],
  [
    'Tender grilled chicken over fresh greens, tossed with crisp veggies and a light, zesty dressing.',
    'Rich ginger-infused rice porridge crowned with a torched beef bone marrow canoe, crispy garlic, and scallions.'
  ],
  ['Classic Pancakes', 'Butter Caramel Popcorn Latte'],
  [
    'Fluffy, golden pancakes served warm with butter and syrup a timeless treat for every craving.',
    'Velvety espresso and milk swirled with buttery caramel sauce, whipped cream, and golden caramel popcorn crunch.'
  ],
  // Story & Testimonials
  ['Refined Taste, Exceptional Feel', 'Malayo Man Kami, Sulit Ang Dayo'],
  ['Where Elegance Meets Flavor', 'Where Farm Sanctuary Meets Flavor'],
  [
    'Experience the harmony of refined taste and timeless elegance in every moment. From artfully crafted dishes to a warm, inviting ambiance, we blend flavor and feeling to create a dining experience that lingers after the last bite.',
    'Tucked away in the lush greenery of Sitio Nipa, Brgy. Maloong Canal, Lamitan City, El Farm Cafe and Restaurant blends rustic farm warmth, specialty coffee & matcha, heirloom Basilan & Pinoy comfort dishes, and floodlit outdoor pickleball into one unforgettable destination.'
  ],
  ['Mon – Thu (10:00 AM – 01:00 AM)', 'Open Daily · 9:00 AM – 9:00 PM'],
  ['Fri – Sun (11:00 AM – 10:00 PM)', 'Sitio Nipa, Maloong Canal, Lamitan'],
  ['+12 960 849493', '0917 182 9876'],
  ['hello@designmonks.co', 'ligaya_gabriel@live.com.ph'],
  ['Armstrong,North Nanook V4Y, V0E,Canada', 'Sitio Nipa, Brgy. Maloong Canal, Lamitan City, Basilan'],
  ['Design Monks', 'El Farm Cafe & Restaurant'],
  ['2025 ©. All rights reserved.', '2026 © El Farm Cafe and Restaurant. All rights reserved.'],
  ['2025 \\xA9', '2026 \\xA9 '],
  ['2025\u00a0©', '2026 © '],
  ['https://www.designmonks.co/', './index.html'],
  [
    "I absolutely loved the avocado toast with a poached egg! The quality of the ingredients and the attention to detail in the preparation made it a standout dish. I'm looking forward to my next visit for another round!",
    'Thank you mam 🥰 Masarap po ang foods and maganda din po ang ambiance ❤️ — Quick laag with the whole family at EL Farm Cafe & Resto!'
  ],
  ['Jessier Robak.', 'Aer Nhicka'],
  ['Jessier Robak', 'Aer Nhicka'],
  ['Alonso D. Dowson', 'Doc Mika & CHO LGU'],
  ['Kristin Watson', 'LCEA Pickleball Club'],
  ['Food Enthusiast', 'Verified El Farm Guests'],
  [
    'The food was absolutely delicious, and the service was excellent! The ambiance was perfect, and everything was fresh. Highly recommend this restaurant for a great dining experience!',
    'Malayo man kami, sulit naman ang dayo! From the Coconut Matcha Cloud served in a real buko shell to the Seafood Feast Bilao and Sizzling Sisig, every dish at El Farm is worth the trip to Sitio Nipa!'
  ],
  [
    "Amazing food, friendly staff, and a cozy atmosphere! Everything was fresh, flavorful, and beautifully presented. Definitely one of the best dining experiences I've had—highly recommend!",
    'Playing night pickleball under the coconut palms and then sharing a Salu-Salo Bilao and iced Dirty Coffee with the whole squad makes El Farm our favorite hangout spot in Lamitan City!'
  ],
  // Contact & Blog Page Replacements
  [
    'Reserve your spot at Kitchen, where exceptional sushi and an unforgettable experience await.',
    'Message or reserve your table or pickleball court at El Farm — advance orders are freshly prepared ahead of your arrival!'
  ],
  [
    'Prefer a personal touch? Contact our team directly for fast, friendly, and professional support anytime you need.',
    'Reach out to El Farm Cafe and Restaurant directly for table reservations, Salu-Salo bilao pre-orders, pickleball court bookings, or Lamitan delivery (+₱100).'
  ],
  ['Ask us a question by email and we will respond within a few days.', 'Email us at ligaya_gabriel@live.com.ph for event & catering inquiries.'],
  ['Drop in Us', 'Visit Our Sanctuary'],
  ['You can meet us at our office and discuss the details of your question.', 'Sitio Nipa, Brgy. Maloong Canal, Lamitan City, Basilan · Open Daily 9AM–9PM.'],
  ['Call us if your question requires an immediate response.', 'Call or text 0917 182 9876 for instant reservations & advance food orders.'],
  ['Culinary Insights', 'Explore El Farm Sanctuary'],
  [
    'Discover stories, tips, and culinary insights that inspire your dining adventures daily.',
    'Tour our indoor café pavilion, starlight garden canopies, and championship night pickleball court in Sitio Nipa.'
  ],
  ['August 14, 2024', 'PICKLEBALL & RECREATION'],
  [
    'Revolutionizing Taste How Our Kitchen Perfect Flavor Harmony.',
    'Championship Floodlit Night Pickleball Court Under the Palms.'
  ],
  ['August 15, 2024', 'AL-FRESCO GARDEN NIGHTS'],
  [
    'How Our Kitchen Blend with Taste & Perfectionism.',
    'Starlight Lawn, Sail Canopies & Live-Edge Garden Banquets.'
  ],
  [
    'How Our Kitchen Blend with Taste &amp; Perfectionism.',
    'Starlight Lawn, Sail Canopies &amp; Live-Edge Garden Banquets.'
  ],
  ['August 20, 2024', 'SPECIALTY CAFÉ BAR'],
  [
    'Beyond Sushi Rolls: A World of Culinary Innovation and Taste.',
    'Inside Our Timber Pavilion: Dirty Coffee, Matcha & Heirloom Kitchen.'
  ],
  ['August 19, 2024', 'TWILIGHT ENTRANCE'],
  [
    'How We Create a Memorable Dining Experience for Every Guest.',
    'Welcome to Sitio Nipa: Our Illuminated Archway & Lantern Trees.'
  ],
  ['August 5, 2024', 'ARTISAN WOODCRAFT'],
  [
    'The History and Evolution of Fine Dining Around the World.',
    'Handcrafted Acacia Tables & Warm Rustic Farm Interiors.'
  ],
  ['August 30, 2024', 'CELEBRATIONS & EVENTS'],
  [
    '5 Must-Try Dishes for First-Time Visitors at Our Restaurant.',
    'Host Your Family Gatherings, Faculty Dinners & Salu-Salo Feasts.'
  ],
  ['August 12, 2024', 'SUSTAINABLE FARMING'],
  [
    'Sustainability in the Kitchen: Eco-Friendly Practices.',
    'Farm-to-Table Freshness: Locally Sourced Basilan Harvest & Herbs.'
  ],
  ['August 22, 2024', 'CULINARY CRAFTSMANSHIP'],
  [
    'The Art of Food Presentation: Plating Like a Pro.',
    'The Art of the Salu-Salo Bilao: Feast Presentation & Flavor.'
  ],
  ['August 25, 2024', 'BASILAN HERITAGE'],
  [
    'Celebrating Food Cultures: Global Influences on Our Menu.',
    'Celebrating Yakan & Basilan Culinary Heritage in Every Dish.'
  ],
  ['See All Blog', 'Explore Sanctuary'],
  ['Weekly Newsletter', 'Visit El Farm in Sitio Nipa'],
  [
    'Subscribe to receive the latest news, announcements, and special offers.',
    'Open Daily 9:00 AM – 9:00 PM · Dine-In, Advance Pre-Order & Lamitan Delivery (+₱100).'
  ],
  // Remove the floating "Free 3 Month on Pro plan GIFT VOUCHER" component from React bundle
  [
    ',e(w,{height:76,width:"142px",y:824,children:e(oe,{className:"framer-1r0dvt3-container",layoutScroll:!0,nodeId:"zzAlGrG0A",scopeId:"eS7uI32MT",children:e(Ne,{height:"100%",id:"zzAlGrG0A",layoutId:"zzAlGrG0A",style:{height:"100%",width:"100%"},width:"100%"})})})',
    ''
  ],
];

// Build native 20-card Framer Ticker slots for chunk-PGQRPBE7 (Desktop & Mobile) so all 20 newest-first customer photos loop edge-to-edge natively
function upgradeFramerTickerChunk(code) {
  const fbUrl = 'https://www.facebook.com/p/El-Farm-Cafe-and-Restaurant-61592749568852/';
  const desktopSlots = Array.from({ length: 20 }, (_, idx) => {
    const n = idx + 1;
    const pad = String(n).padStart(2, '0');
    const imgUrl = `./assets/images/customer-hd-${n}.webp`;
    return `o(A,{height:533,width:"400px",children:o(D,{className:"framer-1u6d0st-container","data-framer-name":"Social Large Card ${pad}",inComponentSlot:!0,layoutDependency:y,layoutId:"custLarge${pad}-container",name:"Social Large Card ${pad}",nodeId:"custLarge${pad}",rendersWithMotion:!0,scopeId:"Rxi6dnftz",children:o(R,{height:"100%",i42BfbWBP:j({pixelHeight:1600,pixelWidth:1200,src:"${imgUrl}",srcSet:"${imgUrl} 1200w"},"El Farm Guests ${pad}"),id:"custLarge${pad}",layoutId:"custLarge${pad}",name:"Social Large Card ${pad}",OmgFZsd3A:"${fbUrl}",style:{height:"100%",width:"100%"},variant:"DjGSxOeTQ",width:"100%"})})})`;
  }).join(',');

  const phoneSlots = Array.from({ length: 20 }, (_, idx) => {
    const n = idx + 1;
    const pad = String(n).padStart(2, '0');
    const imgUrl = `./assets/images/customer-hd-${n}.webp`;
    return `o(A,{height:267,width:"180px",children:o(D,{className:"framer-bf4x71-container","data-framer-name":"Social Small Card ${pad}",inComponentSlot:!0,layoutDependency:y,layoutId:"custSmall${pad}-container",name:"Social Small Card ${pad}",nodeId:"custSmall${pad}",rendersWithMotion:!0,scopeId:"Rxi6dnftz",children:o(R,{height:"100%",i42BfbWBP:j({pixelHeight:1600,pixelWidth:1200,src:"${imgUrl}",srcSet:"${imgUrl} 1200w"},"El Farm Guests ${pad}"),id:"custSmall${pad}",layoutId:"custSmall${pad}",name:"Social Small Card ${pad}",OmgFZsd3A:"${fbUrl}",style:{height:"100%",width:"100%"},variant:"wgluxtDXX",width:"100%"})})})`;
  }).join(',');

  let out = code.replace(
    /slots:\[o\(A,\{height:533,width:"400px"[\s\S]*?\],speed:70/,
    `slots:[${desktopSlots}],speed:70`
  );
  out = out.replace(
    /slots:\[o\(A,\{height:267,width:"180px"[\s\S]*?\],speed:100/,
    `slots:[${phoneSlots}],speed:100`
  );
  out = out.split('hoverFactor:1').join('hoverFactor:0');
  out = out.split('var gn={DjGSxOeTQ:{hover:!0}}').join('var gn={}');
  out = out.split('loading:G((s?.y||0)+(0+((s?.height||520)-0-((s?.height||520)-0)*1)/2))').join('loading:"eager"');
  out = out.split('loading:G((s?.y||0)+(0+((s?.height||225)-0-((s?.height||225)-0)*1)/2))').join('loading:"eager"');
  return out;
}

function applyTextReplacements(str) {
  let out = str;
  out = out.replace(
    /https:\/\/framerusercontent\.com\/images\/([A-Za-z0-9_-]+)\.([a-zA-Z0-9]+)(\?[^\x22\x27\s\)]*)?/g,
    (full, id, ext) => {
      if (framerAssetMap[id]) return framerAssetMap[id];
      return `./assets/images/${id}.${ext}`;
    }
  );
  for (const [from, to] of TEXT_REPLACEMENTS) {
    out = out.split(from).join(to);
  }
  return out;
}

// 1. Restore clean binary .framercms & binary CMS chunk files, and transform all text .js / .mjs files in assets/js
const jsDir = path.join(ROOT, 'assets/js');
const rawJsBackupDir = path.join(ROOT, 'scripts/dump/raw_js');
if (!fs.existsSync(rawJsBackupDir)) fs.mkdirSync(rawJsBackupDir, { recursive: true });
const uncageOutRoot = 'C:/Users/ZETICUZ/.gemini/antigravity/scratch/ZE-Uncage/output';
// Place blog & menu uncage dirs last so their complete CMS binary files win
const uncageDirs = [
  'output_monkscrave',
  'output_monkscrave_about',
  'output_monkscrave_contact',
  'output_monkscrave_menu',
  'output_monkscrave_blog',
].map(d => path.join(uncageOutRoot, d, 'assets/js'));

for (const srcDir of uncageDirs) {
  if (fs.existsSync(srcDir)) {
    for (const f of fs.readdirSync(srcDir)) {
      const srcPath = path.join(srcDir, f);
      const buf = fs.readFileSync(srcPath);
      const isBinaryCms = buf.includes(0) || f.endsWith('.framercms') || f.includes('-chunk-default-') || f.includes('-indexes-default-');
      if (isBinaryCms) {
        const destPath = path.join(jsDir, f);
        // Always keep the larger (most complete) binary CMS file
        if (!fs.existsSync(destPath) || buf.length >= fs.statSync(destPath).size) {
          fs.writeFileSync(destPath, buf);
        }
        const backupPath = path.join(rawJsBackupDir, f);
        if (!fs.existsSync(backupPath) || buf.length >= fs.statSync(backupPath).size) {
          fs.writeFileSync(backupPath, buf);
        }
      } else if ((f.endsWith('.js') || f.endsWith('.mjs')) && !fs.existsSync(path.join(rawJsBackupDir, f))) {
        fs.copyFileSync(srcPath, path.join(rawJsBackupDir, f));
      }
    }
  }
}

function safeWriteIfChanged(filePath, data, enc) {
  try {
    if (fs.existsSync(filePath)) {
      const prev = enc ? fs.readFileSync(filePath, enc) : fs.readFileSync(filePath);
      if (enc ? prev === data : prev.equals(data)) return;
    }
  } catch (e) {}
  for (let attempt = 0; attempt < 4; attempt++) {
    try {
      if (enc) fs.writeFileSync(filePath, data, enc);
      else fs.writeFileSync(filePath, data);
      return;
    } catch (e) {
      if (attempt === 3) throw e;
      const waitUntil = Date.now() + 80;
      while (Date.now() < waitUntil) {}
    }
  }
}

for (const f of fs.readdirSync(rawJsBackupDir)) {
  if (f === 'swiper-bundle.min.js' || f === 'gsap.min.js') continue;
  const rawPath = path.join(rawJsBackupDir, f);
  const rawBuf = fs.readFileSync(rawPath);
  const isBinaryCms = rawBuf.includes(0) || f.endsWith('.framercms') || f.includes('-chunk-default-') || f.includes('-indexes-default-');
  if (isBinaryCms) {
    safeWriteIfChanged(path.join(jsDir, f), rawBuf);
    continue;
  }
  if (f.endsWith('.js') || f.endsWith('.mjs')) {
    let rawContent = rawBuf.toString('utf8');
    let updated = applyTextReplacements(rawContent);
    if (f.startsWith('chunk-PGQRPBE7')) {
      updated = upgradeFramerTickerChunk(updated);
    }
    if (f.startsWith('script_main')) {
      updated = updated.replace('function i(n,s,l=!0){', 'function i(n,s,l=!0){if(l)return;');
    }
    updated = updated.replace(/\/\/# sourceMappingURL=.*$/gm, '');
    safeWriteIfChanged(path.join(jsDir, f), updated, 'utf8');
  }
}
console.log('Updated all JS/MJS bundles and preserved uncorrupted binary FRAMERCMS files in assets/js!');

// Load initial Facebook customer posts data to embed as fallback in elfarm-enhance.js
const fbPostsInitial = JSON.parse(fs.readFileSync(path.join(ROOT, 'assets/data/facebook-posts.json'), 'utf8'));

// 2. Generate assets/js/elfarm-enhance.js covering Phases 1–7
const rawEnhanceJsContent = `(function () {
  const RESTO = ${JSON.stringify(restoData.restaurant)};
  const MENU_ITEMS = ${JSON.stringify(ACCURATE_MENU_ITEMS)};
  let FB_FEED = ${JSON.stringify(fbPostsInitial)};

  const ITEM_BY_ID = {};
  MENU_ITEMS.forEach((item, index) => {
    item.number = String(index + 1).padStart(2, '0');
    ITEM_BY_ID[item.id] = item;
  });

  function pickItems(ids) {
    return ids.map(id => ITEM_BY_ID[id]).filter(Boolean);
  }

  // Menu Page (/menu) Category Filter Tabs covering all 49 items
  const MENU_PAGE_TABS = [
    {
      id: 'all-menu',
      label: 'All Menu (' + MENU_ITEMS.length + ')',
      items: MENU_ITEMS
    },
    {
      id: 'coffee',
      label: 'Signature Coffee',
      items: MENU_ITEMS.filter(i => i.category === 'coffee')
    },
    {
      id: 'matcha-smoothies',
      label: 'Matcha, Smoothies & Yoghurt',
      items: MENU_ITEMS.filter(i => i.category === 'matcha-smoothies')
    },
    {
      id: 'everyday',
      label: 'Silogs, Goto & Wraps',
      items: MENU_ITEMS.filter(i => i.category === 'everyday')
    },
    {
      id: 'non-pork',
      label: 'Non-Pork Specials',
      items: MENU_ITEMS.filter(i => i.category === 'non-pork')
    },
    {
      id: 'pork',
      label: 'Pork Favorites',
      items: MENU_ITEMS.filter(i => i.category === 'pork')
    },
    {
      id: 'snacks-desserts',
      label: 'Snacks & Delicacies',
      items: MENU_ITEMS.filter(i => i.category === 'snacks-desserts')
    },
    {
      id: 'feasts',
      label: 'Salu-Salo Bilaos',
      items: MENU_ITEMS.filter(i => i.category === 'feasts')
    }
  ];

  let activeMenuTab = 'all-menu';
  let menuSearchQuery = '';
  let currentLightboxList = MENU_ITEMS;
  let currentLightboxIndex = 0;

  // Phase 1: Replay Framer Hero 3-Plate, Leaf & Copy Entrance Animations cleanly without startup flicker
  function replayHeroEntranceAnimations() {
    if (window.__elfarmHeroAnimated) return;
    window.__elfarmHeroAnimated = true;

    try {
      if (typeof window.__elfarmRunFramerAppear === 'function') {
        window.__elfarmRunFramerAppear();
      }
    } catch (e) {}

    const specs = [
      { sel: '[data-framer-appear-id="sk9zdg"], .framer-sk9zdg', prefix: '', ix: -65, iy: 0, rot: 0, scale: 0.96, delay: 100, duration: 900 },
      { sel: '[data-framer-appear-id="71xvpi"], .framer-71xvpi', prefix: 'translateX(-50%) ', ix: 95, iy: -95, rot: 22, scale: 0.86, delay: 140, duration: 1050 },
      { sel: '[data-framer-appear-id="1j6fcxm"], .framer-1j6fcxm', prefix: 'translate(-50%, -50%) ', ix: 110, iy: 0, rot: 20, scale: 0.86, delay: 200, duration: 1000 },
      { sel: '[data-framer-appear-id="1qgz169"], .framer-1qgz169', prefix: '', ix: 0, iy: 190, rot: -20, scale: 0.86, delay: 260, duration: 1050 },
      { sel: '[data-framer-appear-id="qz7c8h"], .framer-qz7c8h', prefix: 'translateX(-50%) ', ix: 20, iy: -150, rot: -28, scale: 0.8, delay: 340, duration: 900, finalRot: 30 },
      { sel: '[data-framer-appear-id="1c16luy"], .framer-1c16luy', prefix: 'translate(-50%, -50%) ', ix: 20, iy: -150, rot: -28, scale: 0.8, delay: 360, duration: 900, finalRot: -75 },
      { sel: '[data-framer-appear-id="fcjafq"], .framer-fcjafq', prefix: 'translateX(-50%) ', ix: 20, iy: -150, rot: -28, scale: 0.8, delay: 380, duration: 900, finalRot: 30 },
      { sel: '[data-framer-appear-id="10n4q2h"], .framer-10n4q2h', prefix: 'translate(-50%, -50%) ', ix: 20, iy: -150, rot: 28, scale: 0.8, delay: 400, duration: 900, finalRot: -30 }
    ];

    const vw = window.innerWidth || 1280;
    const isTablet = vw >= 810 && vw <= 1199;
    const isMobile = vw < 810;

    specs.forEach(s => {
      const el = document.querySelector(s.sel);
      if (!el || typeof el.animate !== 'function') return;

      try {
        el.getAnimations().forEach(anim => anim.cancel());
      } catch (e) {}

      let ix = s.ix;
      let iy = s.iy;
      if (isMobile && s.sel.includes('sk9zdg')) {
        ix = 0; iy = -55;
      } else if (isMobile && s.sel.includes('1qgz169')) {
        iy = 80;
      }
      if (isTablet && s.sel.includes('fcjafq')) {
        iy = -120;
      }

      const endRot = typeof s.finalRot === 'number' ? s.finalRot : 0;
      const startTransform = s.prefix + 'translate3d(' + ix + 'px, ' + iy + 'px, 0px) scale(' + s.scale + ') rotate(' + s.rot + 'deg)';
      const endTransform = s.prefix + 'translate3d(0px, 0px, 0px) scale(1) rotate(' + endRot + 'deg)';

      el.style.opacity = '1';
      el.style.transform = endTransform;

      el.animate(
        [
          { opacity: 0.001, transform: startTransform },
          { opacity: 1, transform: endTransform }
        ],
        {
          duration: s.duration,
          delay: s.delay,
          easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
          fill: 'backwards'
        }
      );
    });
  }

  // Brand Splash Intro Cover (EL Gold Logo Fade-In -> CodePen vELoNXr Gooey Spinner -> True Main-Site Preload -> Fade-to-Black Outro -> Smooth Reveal)
  // Uses per-tab sessionStorage('elfarm_intro_played') so it plays once per tab/new open and skips cleanly on refreshes.
  let introBootStarted = false;
  function initIntroVideo() {
    if (introBootStarted) return;
    introBootStarted = true;

    let alreadyPlayed = false;
    try {
      alreadyPlayed = sessionStorage.getItem('elfarm_intro_played') === '1';
    } catch (e) {}

    if (alreadyPlayed) {
      const stale = document.getElementById('elfarm-intro-overlay');
      if (stale && stale.parentNode) stale.remove();
      document.documentElement.classList.remove('elfarm-intro-lock', 'elfarm-intro-pending');
      document.documentElement.classList.add('elfarm-intro-reveal');
      return;
    }

    document.documentElement.classList.add('elfarm-intro-lock');

    let overlay = document.getElementById('elfarm-intro-overlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.id = 'elfarm-intro-overlay';
      overlay.setAttribute('aria-label', 'Loading El Farm Cafe and Restaurant');
      overlay.innerHTML = \`
        <div class="elfarm-splash-stack">
          <div class="elfarm-splash-logo-wrap" id="elfarm-splash-logo-wrap">
            <img id="elfarm-splash-logo" src="./assets/images/el-splash-logo.jpg" alt="El Farm Cafe and Restaurant Logo" fetchpriority="high" decoding="sync" loading="eager">
          </div>
          <div class="elfarm-splash-loader-wrap" id="elfarm-splash-loader-wrap" aria-hidden="true">
            <svg viewBox="0 0 200 200">
              <defs>
                <filter id="elfarm-splash-goo">
                  <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
                  <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -10" result="goo" />
                  <feBlend in="SourceGraphic" in2="goo" />
                </filter>
              </defs>
              <g id="elfarm-splash-gooey" filter="url(#elfarm-splash-goo)">
                <circle class="elfarm-splash-dot" cx="100" cy="100" r="6" />
              </g>
            </svg>
          </div>
        </div>
      \`;
      document.body.appendChild(overlay);
    }

    // Overlay has painted: remove the pre-DOM ::before curtain so logo fade-in is visible cleanly
    requestAnimationFrame(() => {
      document.documentElement.classList.remove('elfarm-intro-pending');
    });

    const startTime = (typeof performance !== 'undefined' && performance.now) ? performance.now() : Date.now();
    const logoEl = document.getElementById('elfarm-splash-logo');
    const logoWrap = document.getElementById('elfarm-splash-logo-wrap');
    const loaderWrap = document.getElementById('elfarm-splash-loader-wrap');
    const svgGroup = overlay.querySelector('#elfarm-splash-gooey');

    let spinnerActive = true;
    const spinnerTimers = [];
    const trackTimer = (fn, ms) => {
      const id = setTimeout(() => {
        if (spinnerActive) fn();
      }, ms);
      spinnerTimers.push(id);
      return id;
    };

    function clearSpinnerTimers() {
      spinnerActive = false;
      while (spinnerTimers.length) {
        clearTimeout(spinnerTimers.pop());
      }
    }

    // Exact CodePen (kazmi066/pen/vELoNXr) Gooey Circular Spinner Animation
    const spacing = 25;
    function createDot(cx, cy) {
      const dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      dot.setAttribute('cx', cx);
      dot.setAttribute('cy', cy);
      dot.setAttribute('r', 1);
      dot.classList.add('elfarm-splash-dot');
      svgGroup.appendChild(dot);
      return dot;
    }

    function animateSpinner() {
      if (!spinnerActive || !svgGroup) return;
      svgGroup.querySelectorAll('.elfarm-splash-dot').forEach((dot) => dot.remove());
      svgGroup.style.transition = 'none';
      svgGroup.style.transform = 'rotate(0deg)';
      createDot(100, 100);

      const first4 = [
        { cx: 100, cy: 100 - spacing },
        { cx: 100, cy: 100 + spacing },
        { cx: 100 - spacing, cy: 100 },
        { cx: 100 + spacing, cy: 100 }
      ];
      const allDots = [];

      first4.forEach((pos) => {
        const dot = createDot(100, 100);
        allDots.push(dot);
        const midX = (100 + pos.cx) / 2;
        const midY = (100 + pos.cy) / 2;
        trackTimer(() => {
          dot.setAttribute('r', 8);
          dot.setAttribute('cx', midX);
          dot.setAttribute('cy', midY);
        }, 50);
        trackTimer(() => {
          dot.setAttribute('r', 6);
          dot.setAttribute('cx', pos.cx);
          dot.setAttribute('cy', pos.cy);
        }, 500);
      });

      trackTimer(() => {
        const diagSpacing = spacing / Math.sqrt(2);
        const diagonal = [
          { cx: 100 - diagSpacing, cy: 100 - diagSpacing },
          { cx: 100 + diagSpacing, cy: 100 - diagSpacing },
          { cx: 100 - diagSpacing, cy: 100 + diagSpacing },
          { cx: 100 + diagSpacing, cy: 100 + diagSpacing }
        ];
        diagonal.forEach((pos) => {
          const dot = createDot(100, 100);
          allDots.push(dot);
          const midX = (100 + pos.cx) / 2;
          const midY = (100 + pos.cy) / 2;
          trackTimer(() => {
            dot.setAttribute('r', 8);
            dot.setAttribute('cx', midX);
            dot.setAttribute('cy', midY);
          }, 50);
          trackTimer(() => {
            dot.setAttribute('r', 6);
            dot.setAttribute('cx', pos.cx);
            dot.setAttribute('cy', pos.cy);
          }, 500);
        });
      }, 1000);

      trackTimer(() => {
        svgGroup.style.transition = 'transform 0.5s linear';
        svgGroup.style.transform = 'rotate(360deg)';
      }, 2500);

      trackTimer(() => {
        svgGroup.style.transition = 'transform 0.5s linear';
        svgGroup.style.transform = 'rotate(0deg)';
        allDots.forEach((dot) => {
          dot.setAttribute('cx', 100);
          dot.setAttribute('cy', 100);
          dot.setAttribute('r', 6);
        });
      }, 3000);

      trackTimer(() => {
        animateSpinner();
      }, 4000);
    }

    // Step 1: Wait briefly for splash logo image decode then fade Logo in FIRST, followed by Loader
    const startEntranceChoreography = () => {
      requestAnimationFrame(() => {
        if (logoWrap) logoWrap.classList.add('is-visible');
        setTimeout(() => {
          if (loaderWrap) loaderWrap.classList.add('is-visible');
          animateSpinner();
        }, 360);
      });
    };

    if (logoEl && !logoEl.complete) {
      let fired = false;
      const onLogoReady = () => {
        if (fired) return;
        fired = true;
        startEntranceChoreography();
      };
      logoEl.addEventListener('load', () => {
        if (logoEl.decode) logoEl.decode().catch(() => {}).finally(onLogoReady);
        else onLogoReady();
      }, { once: true });
      logoEl.addEventListener('error', onLogoReady, { once: true });
      setTimeout(onLogoReady, 1200);
    } else if (logoEl && logoEl.decode) {
      logoEl.decode().catch(() => {}).finally(startEntranceChoreography);
    } else {
      startEntranceChoreography();
    }

    // Step 2: True background asset preloading & main-site readiness checks while cover holds pure black
    const waitWindowLoad = new Promise((resolve) => {
      if (document.readyState === 'complete') resolve();
      else window.addEventListener('load', resolve, { once: true });
    });

    const waitFonts = (document.fonts && document.fonts.ready)
      ? Promise.race([document.fonts.ready.catch(() => {}), new Promise(r => setTimeout(r, 3500))])
      : Promise.resolve();

    const waitForDomStability = () => new Promise((resolve) => {
      const deadline = Date.now() + 5500;
      const isHome = !!(document.querySelector('[data-framer-name^="Hero Section"], .framer-1myb8ii'));
      const checkReady = () => {
        const timedOut = Date.now() > deadline;
        let domReady = true;
        if (isHome) {
          const tableReady = !!document.querySelector('#elfarm-palazzo-table-root .elfarm-palazzo-plate-circle img');
          const sliderHost = document.querySelector('#elfarm-xxmpvqe-showcase, .elfarm-xxmpvqe-swiper');
          const sliderReady = !sliderHost || !!sliderHost.classList.contains('swiper-initialized') || !!document.querySelector('.swiper-initialized');
          domReady = tableReady && sliderReady;
        }
        if (domReady || timedOut) {
          const visibleImgs = Array.from(document.querySelectorAll('#elfarm-palazzo-table-root img, #main img')).slice(0, 32);
          Promise.all(visibleImgs.map((img) => {
            const pLoad = img.complete
              ? Promise.resolve()
              : Promise.race([
                  new Promise((r) => {
                    img.addEventListener('load', r, { once: true });
                    img.addEventListener('error', r, { once: true });
                  }),
                  new Promise((r) => setTimeout(r, 3000))
                ]);
            return pLoad.then(() => (img.decode ? img.decode().catch(() => {}) : undefined));
          })).then(() => {
            requestAnimationFrame(() => requestAnimationFrame(() => setTimeout(resolve, 260)));
          });
        } else {
          setTimeout(checkReady, 120);
        }
      };
      checkReady();
    });

    const preloadCoreAssets = () => {
      const isHome = !!(document.querySelector('[data-framer-name^="Hero Section"], .framer-1myb8ii'));
      const preloadUrls = isHome
        ? [
            './assets/images/9EbxgnnItr5IyHLUac9iSjrocis-64b569cd.svg',
            './assets/images/palazzo-walnut-table.png',
            './assets/menu/plates/plated-tapsilog.jpg?v=27',
            './assets/menu/plates/plated-sisig-silog.jpg?v=27',
            './assets/menu/plates/plated-hotsilog.jpg?v=27',
            './assets/menu/plates/plated-crispy-pata.jpg?v=27',
            './assets/menu/plates/plated-seafood-feast-bilao.jpg?v=27',
            './assets/menu/plates/plated-chicken-bilao.jpg?v=27',
            './assets/menu/plates/plated-pinoy-favorites-bilao.jpg?v=27',
            './assets/menu/plates/plated-all-time-favorites-combo.jpg?v=27'
          ]
        : [
            './assets/images/9EbxgnnItr5IyHLUac9iSjrocis-64b569cd.svg'
          ];
      const imgTasks = preloadUrls.map((src) => new Promise((res) => {
        const im = new Image();
        im.onload = () => (im.decode ? im.decode().catch(() => {}).finally(res) : res());
        im.onerror = () => res();
        im.src = src;
        if (im.complete) (im.decode ? im.decode().catch(() => {}).finally(res) : res());
      }));
      const vid = document.querySelector('.elfarm-hero-nature-video');
      const vidTask = vid
        ? Promise.race([
            new Promise((res) => {
              if (vid.readyState >= 3) return res();
              vid.addEventListener('canplaythrough', res, { once: true });
              vid.addEventListener('canplay', res, { once: true });
              vid.addEventListener('loadeddata', res, { once: true });
              vid.addEventListener('error', res, { once: true });
            }),
            new Promise((r) => setTimeout(r, 3400))
          ])
        : Promise.resolve();

      return Promise.race([
        Promise.all([...imgTasks, vidTask, waitForDomStability()]),
        new Promise((r) => setTimeout(r, 6200))
      ]);
    };

    const MIN_DISPLAY_MS = 3800;
    const MAX_WAIT_MS = 9500;
    let outroStarted = false;

    function runFadeToBlackOutro() {
      if (outroStarted) return;
      outroStarted = true;
      try { sessionStorage.setItem('elfarm_intro_played', '1'); } catch (e) {}

      // Step 3a: Logo + Loader smoothly fade to pure #000000 black first (540ms)
      overlay.classList.add('is-outro-content');

      setTimeout(() => {
        clearSpinnerTimers();
        // Step 3b: Unlock page scroll & fade pure black curtain smoothly into the fully ready main site
        document.documentElement.classList.remove('elfarm-intro-lock', 'elfarm-intro-pending');
        document.documentElement.classList.add('elfarm-intro-reveal');
        overlay.classList.add('is-outro-curtain');

        setTimeout(() => {
          if (overlay && overlay.parentNode) overlay.remove();
        }, 700);
      }, 560);
    }

    const safetyTimeout = setTimeout(runFadeToBlackOutro, MAX_WAIT_MS);

    Promise.all([waitWindowLoad, waitFonts, preloadCoreAssets()]).then(() => {
      const now = (typeof performance !== 'undefined' && performance.now) ? performance.now() : Date.now();
      const remaining = Math.max(0, MIN_DISPLAY_MS - (now - startTime));
      setTimeout(() => {
        clearTimeout(safetyTimeout);
        runFadeToBlackOutro();
      }, remaining);
    });
  }

  /**
   * Phase 2: Smart Adaptive Connection-Aware Homepage Hero Video Player
   * Uses lv_0_20261114173731.mp4 (transcoded to multi-bitrate fast-start variants).
   * Always prioritizes and locks onto Full HD / 4K quality when connection supports it;
   * steps down only when connection slows down, and seamlessly upgrades back to Full HD/4K.
   * Keeps the existing video player UI completely clean with zero extra buttons or clutter.
   */
  const ADAPTIVE_VIDEO_TIERS = {
    uhd: './assets/video/hero-main-1080p.mp4',
    hd1080: './assets/video/hero-main-1080p.mp4',
    hd720: './assets/video/hero-main-720p.mp4',
    sd480: './assets/video/hero-main-480p.mp4',
  };

  function selectOptimalVideoTier(stallCount) {
    const conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    if (conn) {
      if (conn.saveData || conn.effectiveType === '2g' || conn.effectiveType === 'slow-2g') {
        return 'sd480';
      }
      if (conn.effectiveType === '3g' || (typeof conn.downlink === 'number' && conn.downlink > 0 && conn.downlink < 2.2)) {
        return 'hd720';
      }
      if (typeof conn.downlink === 'number' && conn.downlink >= 10 && stallCount === 0) {
        return 'hd1080';
      }
    }
    if (stallCount >= 3) return 'sd480';
    if (stallCount === 2) return 'hd720';
    // Mandatory Full HD / 4K Priority Default
    return 'hd1080';
  }

  function initAdaptiveHeroVideo() {
    const videos = Array.from(document.querySelectorAll('video')).filter(
      v => v.id !== 'elfarm-intro-video' && !v.classList.contains('elfarm-hero-nature-video')
    );
    videos.forEach(video => {
      const curSrc = video.getAttribute('src') || '';
      if (
        curSrc.includes('If6WM6ewOJhlLv6hDT9NyusyTlc') ||
        curSrc.includes('intro.mp4') ||
        !curSrc.includes('hero-main')
      ) {
        const initialTier = selectOptimalVideoTier(0);
        video.setAttribute('src', ADAPTIVE_VIDEO_TIERS[initialTier]);
        video.dataset.elfarmVideoTier = initialTier;
        video.dataset.elfarmMasterSrc = ADAPTIVE_VIDEO_TIERS.uhd;
        video.setAttribute('playsinline', '');
        video.setAttribute('preload', 'metadata');
        video.muted = true;
      }

      if (video.dataset.elfarmAdaptiveBound === '1') return;
      video.dataset.elfarmAdaptiveBound = '1';

      let stallCount = 0;
      let lastStallTime = 0;

      function switchVideoTier(newTier) {
        if (video.dataset.elfarmVideoTier === newTier) return;
        const targetSrc = ADAPTIVE_VIDEO_TIERS[newTier];
        if (!targetSrc) return;
        const savedTime = video.currentTime || 0;
        const wasPaused = video.paused;
        video.dataset.elfarmVideoTier = newTier;
        video.setAttribute('src', targetSrc);
        video.load();
        video.addEventListener('loadedmetadata', function onMeta() {
          video.removeEventListener('loadedmetadata', onMeta);
          try {
            if (savedTime > 0 && savedTime < (video.duration || 9999)) {
              video.currentTime = savedTime;
            }
          } catch (e) {}
          if (!wasPaused) {
            const p = video.play();
            if (p && typeof p.catch === 'function') p.catch(() => {});
          }
        });
      }

      video.addEventListener('waiting', () => {
        const now = Date.now();
        if (now - lastStallTime > 2500) {
          stallCount++;
          lastStallTime = now;
          const nextTier = selectOptimalVideoTier(stallCount);
          switchVideoTier(nextTier);
        }
      });

      // Seamlessly upgrade back to Full HD quality when playback runs smoothly
      video.addEventListener('timeupdate', () => {
        if (stallCount > 0 && Date.now() - lastStallTime > 12000) {
          stallCount = 0;
          const upgradedTier = selectOptimalVideoTier(0);
          switchVideoTier(upgradedTier);
        }
      });

      const conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
      if (conn && typeof conn.addEventListener === 'function') {
        conn.addEventListener('change', () => {
          const optimalTier = selectOptimalVideoTier(stallCount);
          switchVideoTier(optimalTier);
        });
      }
    });
  }

  function injectStyles() {
    if (document.getElementById('elfarm-framer-styles')) return;
    const style = document.createElement('style');
    style.id = 'elfarm-framer-styles';
    style.textContent = \`
      /* Phase 1: Zero Startup Layout Shift, Splash Intro Cover & Plain Pure-Black Transitions */
      html, body {
        background-color: #0b1315;
        overflow-x: hidden;
      }
      html.elfarm-intro-lock,
      html.elfarm-intro-lock body {
        overflow: hidden !important;
        overflow-x: hidden !important;
        overflow-y: hidden !important;
        width: 100% !important;
        height: 100dvh !important;
        max-height: 100dvh !important;
        background: #000000 !important;
        overscroll-behavior: none !important;
        scrollbar-width: none !important;
        -ms-overflow-style: none !important;
      }
      html.elfarm-intro-lock::-webkit-scrollbar,
      html.elfarm-intro-lock body::-webkit-scrollbar {
        display: none !important;
        width: 0 !important;
        height: 0 !important;
      }
      #elfarm-intro-overlay {
        position: fixed !important;
        inset: 0 !important;
        width: 100% !important;
        height: 100dvh !important;
        margin: 0 !important;
        padding: env(safe-area-inset-top, 16px) env(safe-area-inset-right, 20px) env(safe-area-inset-bottom, 16px) env(safe-area-inset-left, 20px) !important;
        box-sizing: border-box !important;
        background: #000000 !important;
        background-color: #000000 !important;
        z-index: 2147483646 !important;
        overflow: hidden !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        touch-action: none !important;
        opacity: 1;
        visibility: visible;
        transition: opacity 0.65s cubic-bezier(0.22, 1, 0.36, 1), visibility 0.65s ease;
      }
      #elfarm-intro-overlay.is-outro-curtain {
        opacity: 0 !important;
        visibility: hidden !important;
        pointer-events: none !important;
      }
      .elfarm-splash-stack {
        position: relative;
        display: block;
        width: 100%;
        height: 100%;
        max-width: none;
        transition: opacity 0.45s cubic-bezier(0.22, 1, 0.36, 1), transform 0.45s cubic-bezier(0.22, 1, 0.36, 1);
      }
      #elfarm-intro-overlay.is-outro-content .elfarm-splash-stack {
        opacity: 0 !important;
        transform: scale(0.965);
      }
      .elfarm-splash-logo-wrap {
        position: absolute;
        left: 50%;
        top: 46%;
        width: min(clamp(280px, 28vw, 410px), 48dvh);
        height: min(clamp(280px, 28vw, 410px), 48dvh);
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        transform: translate(-50%, -50%) scale(0.95);
        transition: opacity 0.56s cubic-bezier(0.22, 1, 0.36, 1), transform 0.56s cubic-bezier(0.22, 1, 0.36, 1);
        pointer-events: none;
      }
      .elfarm-splash-logo-wrap.is-visible {
        opacity: 1;
        transform: translate(-50%, -50%) scale(1);
      }
      #elfarm-splash-logo {
        width: 100%;
        height: 100%;
        object-fit: contain;
        display: block;
        mix-blend-mode: lighten;
        user-select: none;
        -webkit-user-drag: none;
      }
      .elfarm-splash-loader-wrap {
        position: absolute;
        left: 50%;
        bottom: clamp(42px, 8dvh, 88px);
        width: clamp(68px, 7.5vw, 90px);
        height: clamp(68px, 7.5vw, 90px);
        display: grid;
        place-items: center;
        opacity: 0;
        transform: translateX(-50%) translateY(6px);
        transition: opacity 0.45s cubic-bezier(0.22, 1, 0.36, 1), transform 0.45s cubic-bezier(0.22, 1, 0.36, 1);
        pointer-events: none;
      }
      .elfarm-splash-loader-wrap.is-visible {
        opacity: 1;
        transform: translateX(-50%) translateY(0);
      }
      @media (max-width: 767px) {
        .elfarm-splash-logo-wrap {
          width: min(clamp(215px, 58vw, 290px), 44dvh);
          height: min(clamp(215px, 58vw, 290px), 44dvh);
        }
        .elfarm-splash-loader-wrap {
          bottom: clamp(42px, 8dvh, 80px);
          width: clamp(64px, 16vw, 82px);
          height: clamp(64px, 16vw, 82px);
        }
      }
      .elfarm-splash-loader-wrap svg {
        width: 100%;
        height: 100%;
        display: block;
      }
      .elfarm-splash-dot {
        fill: #ffffff;
        transition: cx 0.5s cubic-bezier(0.3, 1.4, 0.4, 1),
          cy 0.5s cubic-bezier(0.3, 1.4, 0.4, 1),
          r 0.5s cubic-bezier(0.3, 1.4, 0.4, 1);
      }
      #elfarm-splash-gooey {
        transform-origin: 100px 100px;
        transition: transform 0.5s linear;
      }

      /* Permanently Hide Framer Promo Badges & Gift Voucher Floating Pill */
      #__framer-badge-container,
      [data-framer-name="Badge"],
      [data-framer-name="Free 3 Month"],
      [data-framer-name="Experience Badge"],
      .framer-1qu9lve,
      .framer-1r0dvt3-container,
      .framer-ajmrrd,
      a[href*="framer.com"],
      a[href*="designmonks.co"] {
        display: none !important;
        opacity: 0 !important;
        visibility: hidden !important;
        pointer-events: none !important;
        width: 0 !important;
        height: 0 !important;
        overflow: hidden !important;
      }

      /* Ensure Brand Logos display cleanly with zero clipping */
      .framer-44446i img,
      .framer-1tnq8nc img,
      [data-framer-name="Brand Logo"] img,
      [data-framer-name="Logo"] img {
        object-fit: contain !important;
      }

      /* Top Header & Navbar Pointer Hover Animations */
      header nav a {
        position: relative !important;
        padding: 7px 14px !important;
        border-radius: 999px !important;
        transition: transform 0.32s cubic-bezier(0.22, 1, 0.36, 1), background-color 0.32s ease, box-shadow 0.32s ease !important;
      }
      header nav a p {
        transition: color 0.28s ease, text-shadow 0.28s ease, letter-spacing 0.28s ease !important;
      }
      header nav a::after {
        content: '' !important;
        position: absolute !important;
        left: 50% !important;
        bottom: 2px !important;
        width: 64% !important;
        height: 1.5px !important;
        background: linear-gradient(90deg, rgba(239,201,164,0), rgb(239,201,164), rgba(239,201,164,0)) !important;
        transform: translateX(-50%) scaleX(0) !important;
        transform-origin: center !important;
        transition: transform 0.34s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.28s ease !important;
        opacity: 0 !important;
        pointer-events: none !important;
      }
      header nav a[data-framer-page-link-current="true"]::after {
        transform: translateX(-50%) scaleX(0.72) !important;
        opacity: 0.78 !important;
      }
      header nav a:hover {
        transform: translateY(-2px) !important;
        background-color: rgba(239, 201, 164, 0.08) !important;
        box-shadow: 0 6px 20px rgba(239, 201, 164, 0.14) !important;
      }
      header nav a:hover p {
        color: rgb(239, 201, 164) !important;
        text-shadow: 0 0 18px rgba(239, 201, 164, 0.42) !important;
        letter-spacing: 0.035em !important;
      }
      header nav a:hover::after {
        transform: translateX(-50%) scaleX(1) !important;
        opacity: 1 !important;
      }

      /* ============================================================================
         PHASE 3A: HOMEPAGE MENU SHOWCASE — 5 CIRCLES ONLY, CLEAN SPACING,
         MIDDLE CIRCLE BIGGER, SIDE CIRCLES SMALLER, PAUSE ON HOVER & SLIDE IMMEDIATELY ON MOUSE LEAVE
         ============================================================================ */
      [data-framer-name="Menu Section"],
      [data-framer-name="Menu Section"] .framer-cpnzzs {
        overflow: visible !important;
      }
      #elfarm-home-menu-showcase-host {
        width: 100vw !important;
        max-width: 100vw !important;
        margin-left: calc(50% - 50vw) !important;
        margin-right: calc(50% - 50vw) !important;
        position: relative !important;
        left: 0 !important;
        overflow: hidden !important;
      }
      .elfarm-xxmpvqe-showcase {
        position: relative;
        width: 100% !important;
        max-width: 1840px !important;
        margin: 12px auto 0 auto !important;
        padding: 24px 28px 60px 28px !important;
        box-sizing: border-box !important;
        overflow: hidden !important;
        cursor: pointer;
        user-select: none;
      }
      .elfarm-xxmpvqe-flash {
        position: absolute;
        inset: 0;
        pointer-events: none;
        background: radial-gradient(circle at center, rgba(239, 201, 164, 0.22) 0%, rgba(11, 19, 21, 0) 70%);
        opacity: 0;
        transition: opacity 0.5s cubic-bezier(0.22, 1, 0.36, 1);
        z-index: 5;
      }
      .elfarm-xxmpvqe-showcase.is-flashing .elfarm-xxmpvqe-flash {
        opacity: 1;
      }
      .elfarm-xxmpvqe-swiper {
        width: 100% !important;
        padding: 56px 0 64px 0 !important;
        overflow: hidden !important;
      }
      .elfarm-xxmpvqe-slide {
        display: flex !important;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        position: relative;
        transition: transform 0.55s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.45s ease, filter 0.45s ease;
        opacity: 0.62;
        z-index: 1;
      }
      .elfarm-xxmpvqe-slide.swiper-slide-prev,
      .elfarm-xxmpvqe-slide.swiper-slide-next {
        opacity: 0.82;
        z-index: 3;
      }
      .elfarm-xxmpvqe-slide.swiper-slide-active {
        opacity: 1;
        z-index: 6;
      }
      /* When user points mouse on any circle, dim non-pointed circles and spotlight the pointed circle */
      .elfarm-xxmpvqe-showcase.has-hovered-slide .elfarm-xxmpvqe-slide:not(.is-hovered-slide) {
        opacity: 0.40 !important;
        filter: brightness(0.76);
      }
      .elfarm-xxmpvqe-showcase.has-hovered-slide .elfarm-xxmpvqe-slide.is-hovered-slide {
        opacity: 1 !important;
        filter: brightness(1.06);
        z-index: 12 !important;
      }
      /* Radiant Background Glow Light behind the Dish Circle */
      .elfarm-xxmpvqe-glow-orb {
        position: absolute;
        top: -24px;
        left: 50%;
        width: 350px;
        height: 350px;
        transform: translateX(-50%) scale(0.65);
        border-radius: 50%;
        background: radial-gradient(
          circle,
          rgba(239, 201, 164, 0.72) 0%,
          rgba(212, 155, 99, 0.40) 38%,
          rgba(82, 183, 136, 0.16) 64%,
          rgba(11, 19, 21, 0) 78%
        );
        filter: blur(24px);
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.4s cubic-bezier(0.22, 1, 0.36, 1), transform 0.5s cubic-bezier(0.22, 1, 0.36, 1);
        z-index: 0;
      }
      .elfarm-xxmpvqe-slide.swiper-slide-active .elfarm-xxmpvqe-glow-orb {
        opacity: 0.62;
        transform: translateX(-50%) scale(1.02);
      }
      .elfarm-xxmpvqe-showcase.has-hovered-slide .elfarm-xxmpvqe-slide:not(.is-hovered-slide) .elfarm-xxmpvqe-glow-orb {
        opacity: 0 !important;
      }
      .elfarm-xxmpvqe-slide.is-hovered-slide .elfarm-xxmpvqe-glow-orb {
        opacity: 1 !important;
        transform: translateX(-50%) scale(1.18) !important;
        animation: elfarmGlowPulse 1.8s ease-in-out infinite alternate;
      }
      @keyframes elfarmGlowPulse {
        0% {
          transform: translateX(-50%) scale(1.12);
          filter: blur(22px) brightness(1);
        }
        100% {
          transform: translateX(-50%) scale(1.24);
          filter: blur(28px) brightness(1.18);
        }
      }
      /* Size hierarchy across the 5 circles:
         - Outer 2 circles (1st & 5th): scale(0.62) -> ~186px visual diameter
         - Inner 2 neighbor circles (2nd & 4th): scale(0.74) -> ~222px visual diameter
         - Middle active circle (3rd): scale(1.14) -> ~342px visual diameter (Much Bigger!) */
      .elfarm-xxmpvqe-img-ring {
        position: relative;
        z-index: 2;
        width: 300px;
        height: 300px;
        border-radius: 50%;
        padding: 8px;
        background: linear-gradient(135deg, rgba(239, 201, 164, 0.68), rgba(239, 201, 164, 0.14));
        box-shadow: 0 20px 46px rgba(0, 0, 0, 0.6);
        transform: scale(0.62);
        transition: transform 0.55s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.52s ease, background 0.45s ease;
        overflow: hidden;
        flex-shrink: 0;
      }
      .elfarm-xxmpvqe-slide.swiper-slide-prev .elfarm-xxmpvqe-img-ring,
      .elfarm-xxmpvqe-slide.swiper-slide-next .elfarm-xxmpvqe-img-ring {
        transform: scale(0.74);
        box-shadow: 0 24px 52px rgba(0, 0, 0, 0.65);
      }
      .elfarm-xxmpvqe-slide.swiper-slide-active .elfarm-xxmpvqe-img-ring {
        transform: scale(1.14);
        background: linear-gradient(135deg, #ffe3c4 0%, #efc9a4 55%, #c9925b 100%);
        box-shadow: 0 32px 72px rgba(239, 201, 164, 0.30), 0 16px 38px rgba(0, 0, 0, 0.75);
      }
      .elfarm-xxmpvqe-slide.is-hovered-slide .elfarm-xxmpvqe-img-ring {
        transform: translateY(-10px) scale(0.92) !important;
        background: linear-gradient(135deg, #ffe3c4 0%, #efc9a4 50%, #d49b63 100%) !important;
        box-shadow:
          0 0 60px 14px rgba(239, 201, 164, 0.48),
          0 0 105px 28px rgba(212, 155, 99, 0.24),
          0 30px 64px rgba(0, 0, 0, 0.82) !important;
      }
      .elfarm-xxmpvqe-slide.swiper-slide-active.is-hovered-slide .elfarm-xxmpvqe-img-ring {
        transform: translateY(-10px) scale(1.20) !important;
      }
      .elfarm-xxmpvqe-img-ring img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        object-fit: cover;
        object-position: center;
        display: block;
        transition: transform 0.55s cubic-bezier(0.22, 1, 0.36, 1), filter 0.45s ease;
      }
      .elfarm-xxmpvqe-slide.is-hovered-slide .elfarm-xxmpvqe-img-ring img {
        transform: scale(1.08);
        filter: contrast(1.06) saturate(1.1);
      }
      .elfarm-xxmpvqe-caption {
        position: relative;
        z-index: 3;
        margin-top: 28px;
        text-align: center;
        width: 340px;
        max-width: 90vw;
        opacity: 0;
        transform: translateY(10px);
        transition: opacity 0.42s cubic-bezier(0.22, 1, 0.36, 1), transform 0.42s cubic-bezier(0.22, 1, 0.36, 1);
        pointer-events: none;
      }
      .elfarm-xxmpvqe-showcase:not(.has-hovered-slide) .elfarm-xxmpvqe-slide.swiper-slide-active .elfarm-xxmpvqe-caption,
      .elfarm-xxmpvqe-slide.is-hovered-slide .elfarm-xxmpvqe-caption {
        opacity: 1 !important;
        transform: translateY(0) !important;
        pointer-events: auto !important;
      }
      .elfarm-xxmpvqe-cat {
        font-family: "Jost", sans-serif;
        font-size: 12px;
        font-weight: 600;
        letter-spacing: 0.16em;
        text-transform: uppercase;
        color: rgba(239, 201, 164, 0.88);
        margin-bottom: 6px;
      }
      .elfarm-xxmpvqe-title {
        position: relative;
        display: inline-block;
        font-family: "Cormorant Garamond", serif;
        font-size: 29px;
        font-weight: 600;
        line-height: 1.2;
        color: #ffffff;
        margin: 0 0 8px 0;
        padding-bottom: 6px;
      }
      .elfarm-xxmpvqe-title::after {
        content: "";
        position: absolute;
        left: 0;
        bottom: 0;
        width: 0%;
        height: 2px;
        background: rgb(239, 201, 164);
        transition: width 0.5s cubic-bezier(0.22, 1, 0.36, 1);
      }
      .elfarm-xxmpvqe-slide.swiper-slide-active .elfarm-xxmpvqe-title::after,
      .elfarm-xxmpvqe-slide.is-hovered-slide .elfarm-xxmpvqe-title::after {
        width: 100%;
      }
      .elfarm-xxmpvqe-price {
        font-family: "Cormorant Garamond", serif;
        font-size: 25px;
        font-weight: 700;
        color: rgb(239, 201, 164);
        margin-bottom: 6px;
      }
      .elfarm-xxmpvqe-desc {
        font-family: "Jost", sans-serif;
        font-size: 14px;
        line-height: 1.5;
        color: rgb(208, 209, 211);
        margin: 0;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
      .elfarm-xxmpvqe-SwiperPagination {
        bottom: 4px !important;
      }
      .elfarm-xxmpvqe-SwiperPagination .swiper-pagination-bullet {
        background: rgba(239, 201, 164, 0.35) !important;
        opacity: 1 !important;
        width: 8px !important;
        height: 8px !important;
        transition: all 0.3s ease !important;
      }
      .elfarm-xxmpvqe-SwiperPagination .swiper-pagination-bullet-active {
        background: rgb(239, 201, 164) !important;
        width: 28px !important;
        border-radius: 999px !important;
      }
      @media (max-width: 1024px) {
        .elfarm-xxmpvqe-img-ring {
          width: 230px;
          height: 230px;
        }
      }
      @media (max-width: 768px) {
        .elfarm-xxmpvqe-showcase {
          padding: 16px 8px 48px 8px !important;
        }
        .elfarm-xxmpvqe-img-ring {
          width: 210px;
          height: 210px;
          transform: scale(0.76);
        }
        .elfarm-xxmpvqe-slide.swiper-slide-active .elfarm-xxmpvqe-img-ring {
          transform: scale(1.06);
        }
        .elfarm-xxmpvqe-title {
          font-size: 23px;
        }
      }

      /* ============================================================================
         HOMEPAGE HERO — PALAZZO REVOLVING WALNUT TABLE, PLATED FOODS & FOCAL PLATE SMOKE
         (Cloned from Palazzo Framer Template Gt/Ut + Dynamic Menu Queue Loop + Timed Smoke)
         ============================================================================ */
      [data-framer-name^="Hero Section"],
      .framer-1myb8ii {
        overflow: hidden !important;
        position: relative !important;
        box-sizing: border-box !important;
      }
      [data-framer-name^="Hero Section"] [data-framer-name="Container"],
      .framer-yak54d {
        position: relative !important;
        z-index: 25 !important;
        pointer-events: none !important;
      }
      [data-framer-name="Hero Text Block"],
      [data-framer-name="Hero Description Block"],
      .framer-sk9zdg,
      [data-framer-name="Rating Stack"],
      .framer-16wg6qc {
        position: relative !important;
        z-index: 30 !important;
        pointer-events: auto !important;
      }
      [data-framer-name="Hero Image Block"],
      .framer-c688wi {
        overflow: visible !important;
        z-index: 22 !important;
        pointer-events: none !important;
      }

      /* ============================================================================
         AOMI NATURE HERO VIDEO BACKGROUND & TRANSPARENT TOP HEADER
         ============================================================================ */
      html {
        width: 100% !important;
        max-width: 100% !important;
        overflow-x: clip !important;
        overflow-y: auto !important;
        height: auto !important;
      }
      body {
        width: 100% !important;
        max-width: 100% !important;
        overflow-x: clip !important;
        overflow-y: visible !important;
        height: auto !important;
      }
      div#main,
      #main {
        filter: none !important;
        backdrop-filter: none !important;
        transform: none !important;
        will-change: auto !important;
      }
      .framer-2nqvvj-container {
        position: fixed !important;
        top: 0 !important;
        left: 0 !important;
        right: 0 !important;
        width: 100% !important;
        max-width: 100% !important;
        z-index: 120 !important;
        opacity: 1 !important;
        visibility: visible !important;
        transform: none !important;
        background: transparent !important;
        background-color: transparent !important;
        border-bottom: 1px solid transparent !important;
        pointer-events: none !important;
        isolation: isolate !important;
      }
      /* GPU-composited pseudo backdrop slides + fades smoothly when scrolling down & hides smoothly at top */
      .framer-2nqvvj-container::before {
        content: "" !important;
        position: absolute !important;
        inset: 0 !important;
        z-index: -1 !important;
        background: linear-gradient(180deg, rgba(7, 13, 15, 0.96) 0%, rgba(11, 19, 21, 0.92) 100%) !important;
        backdrop-filter: blur(16px) saturate(140%) !important;
        -webkit-backdrop-filter: blur(16px) saturate(140%) !important;
        border-bottom: 1px solid rgba(239, 201, 164, 0.24) !important;
        box-shadow: 0 16px 36px -8px rgba(0, 0, 0, 0.6) !important;
        opacity: 0 !important;
        transform: translateY(-100%) !important;
        transition:
          opacity 0.42s cubic-bezier(0.22, 1, 0.36, 1),
          transform 0.46s cubic-bezier(0.22, 1, 0.36, 1),
          box-shadow 0.42s ease !important;
        pointer-events: none !important;
      }
      .framer-2nqvvj-container.is-scrolled::before {
        opacity: 0.98 !important;
        transform: translateY(0) !important;
        background: linear-gradient(180deg, rgba(7, 13, 15, 0.99) 0%, rgba(11, 19, 21, 0.97) 100%) !important;
      }
      body:not(:has([data-framer-name^="Hero Section"])) .framer-2nqvvj-container::before {
        opacity: 0.98 !important;
        transform: translateY(0) !important;
        background: linear-gradient(180deg, rgba(7, 13, 15, 0.99) 0%, rgba(11, 19, 21, 0.97) 100%) !important;
      }
      body:not(:has([data-framer-name^="Hero Section"])) .framer-2nqvvj-container.is-scrolled::before {
        opacity: 1 !important;
        transform: translateY(0) !important;
      }
      @media (min-width: 1025px) {
        header.framer-atzvB,
        header.framer-atzvB.framer-v-1rfa6pd,
        header.framer-atzvB.framer-v-buob2u {
          padding: 20px 0 !important;
          transition: padding 0.38s cubic-bezier(0.22, 1, 0.36, 1) !important;
        }
        .framer-2nqvvj-container.is-scrolled header.framer-atzvB,
        header.framer-atzvB.is-scrolled {
          padding: 12px 0 !important;
        }
        header.framer-atzvB .framer-1vd02cg,
        header.framer-atzvB.framer-v-1rfa6pd .framer-1vd02cg,
        header.framer-atzvB.framer-v-buob2u .framer-1vd02cg {
          max-width: 1360px !important;
          width: 100% !important;
          padding: 0 28px !important;
          margin: 0 auto !important;
        }
        header.framer-atzvB .framer-pwnhug,
        header.framer-atzvB.framer-v-1rfa6pd .framer-pwnhug,
        header.framer-atzvB.framer-v-buob2u .framer-pwnhug {
          display: flex !important;
          flex-direction: row !important;
          flex-wrap: nowrap !important;
          align-items: center !important;
          justify-content: space-between !important;
          width: 100% !important;
          position: relative !important;
        }
        header .framer-1k980me-container,
        header.framer-atzvB.framer-v-1rfa6pd .framer-1k980me-container,
        header.framer-atzvB.framer-v-buob2u .framer-1k980me-container {
          position: relative !important;
          top: auto !important;
          left: auto !important;
          right: auto !important;
          bottom: auto !important;
          width: auto !important;
          height: auto !important;
          transform: none !important;
          opacity: 1 !important;
          visibility: visible !important;
          pointer-events: auto !important;
          user-select: auto !important;
          -webkit-user-select: auto !important;
          z-index: 10 !important;
        }
        header .framer-1k980me-container *,
        header nav.framer-wJ9c5,
        header nav.framer-wJ9c5 *,
        header .framer-fo7Wq,
        header .framer-fo7Wq *,
        header .framer-99kfy5,
        header [data-framer-name="Menu"],
        header [data-framer-name="Menu"] * {
          transform: none !important;
          will-change: auto !important;
        }
      }
      [data-framer-name="Instagram Section"] .framer-1hajl2m-container:not(.elfarm-2d-fallback-active),
      [data-framer-name="Instagram Section"]:has(#elfarm-scurve-gallery-wrap) > :not(#elfarm-scurve-gallery-wrap):not(.elfarm-2d-fallback-active) {
        display: none !important;
        opacity: 0 !important;
        visibility: hidden !important;
        pointer-events: none !important;
      }
      .framer-73kyao:has(.elfarm-ds-wrapper),
      [data-framer-name="Blog Tab Block"] {
        display: block !important;
        width: 100% !important;
        max-width: 100% !important;
      }
      [data-framer-name="Blog Section"] .framer-73kyao > :not(.elfarm-ds-wrapper),
      [data-framer-name="Blog Tab Block"] > :not(.elfarm-ds-wrapper),
      [data-framer-name="Blog Tab Section"] .framer-1lpg1ag {
        display: none !important;
        opacity: 0 !important;
        visibility: hidden !important;
        pointer-events: none !important;
      }
      header,
      .framer-atzvB {
        position: relative !important;
        width: 100% !important;
        max-width: 100% !important;
        z-index: 120 !important;
        background: transparent !important;
        background-color: transparent !important;
        backdrop-filter: none !important;
        -webkit-backdrop-filter: none !important;
        box-shadow: none !important;
        border-bottom: none !important;
        pointer-events: none !important;
      }
      header a,
      header button,
      .framer-atzvB a,
      .framer-atzvB button,
      .framer-2nqvvj-container a,
      .framer-2nqvvj-container button,
      header [data-framer-name="Logo"],
      header [data-framer-name="Brand Logo"],
      header [data-framer-name="Menu"],
      header [data-framer-name="Primary Header"],
      .framer-pc5vzg-container,
      header [data-framer-name="Primary Header"] {
        pointer-events: auto !important;
      }
      header [data-framer-name="Primary Header"] * {
        pointer-events: none !important;
      }
      #elfarm-mobile-burger-btn,
      #elfarm-mobile-burger-btn *,
      header [data-framer-name="Hamburger"],
      header [data-framer-name="Hamburger"] *,
      header [data-framer-name="Burger"],
      header [data-framer-name="Burger"] *,
      .framer-r826j9,
      .framer-r826j9 * {
        pointer-events: auto !important;
      }
      header [data-framer-name="Primary Header"],
      #elfarm-mobile-burger-btn,
      header [data-framer-name="Hamburger"],
      header [data-framer-name="Burger"],
      .framer-r826j9 {
        cursor: pointer !important;
      }
      /* Prevent "Download App" or any nav link from ever wrapping letter-by-letter vertically */
      header nav,
      header [data-framer-name="Menu"] {
        display: flex !important;
        flex-direction: row !important;
        flex-wrap: nowrap !important;
        align-items: center !important;
        width: auto !important;
        max-width: none !important;
        overflow: visible !important;
        gap: clamp(12px, 1.8vw, 28px) !important;
      }
      header nav > div,
      header [data-framer-name="Menu"] > div {
        flex: 0 0 auto !important;
        width: auto !important;
        min-width: max-content !important;
        margin: 0 !important;
      }
      header nav a,
      header nav a div,
      header nav a p,
      header [data-framer-name="Menu"] a,
      header [data-framer-name="Menu"] a div,
      header [data-framer-name="Menu"] a p {
        white-space: nowrap !important;
        width: auto !important;
        min-width: max-content !important;
        word-break: normal !important;
        flex-shrink: 0 !important;
      }
      /* Inner Subpage Top Clearance below fixed Header Navbar */
      @media (min-width: 1025px) {
        #elfarm-mobile-burger-btn,
        .framer-r826j9 {
          display: none !important;
          pointer-events: none !important;
        }
        header .framer-1g6xkw5,
        header [data-framer-name="Header Button"] {
          display: inline-flex !important;
          flex-direction: row !important;
          align-items: center !important;
          gap: 10px !important;
          width: auto !important;
          height: auto !important;
          overflow: visible !important;
        }
        header .framer-pc5vzg-container {
          display: inline-flex !important;
          align-items: center !important;
          height: 42px !important;
          min-height: 42px !important;
          max-height: 42px !important;
        }
        header [data-framer-name="Primary Header"] {
          display: inline-flex !important;
          align-items: center !important;
          justify-content: center !important;
          height: 42px !important;
          min-height: 42px !important;
          max-height: 42px !important;
          padding: 0 18px !important;
          border-radius: 2px !important;
          box-sizing: border-box !important;
          pointer-events: auto !important;
          transition: transform 0.22s cubic-bezier(0.22, 1, 0.36, 1), background-color 0.22s ease, border-color 0.22s ease !important;
        }
        #elfarm-pos-header-btn {
          pointer-events: auto !important;
          display: inline-flex !important;
          align-items: center !important;
          justify-content: center !important;
          gap: 7px !important;
          height: 42px !important;
          min-height: 42px !important;
          max-height: 42px !important;
          padding: 0 15px !important;
          border-radius: 2px !important;
          border: 1px solid rgba(239, 201, 164, 0.55) !important;
          background: rgba(11, 19, 21, 0.78) !important;
          backdrop-filter: blur(10px) !important;
          -webkit-backdrop-filter: blur(10px) !important;
          color: #efc9a4 !important;
          font-family: "Jost", "Plus Jakarta Sans", sans-serif !important;
          font-size: 12px !important;
          font-weight: 600 !important;
          letter-spacing: 0.08em !important;
          text-transform: uppercase !important;
          white-space: nowrap !important;
          box-sizing: border-box !important;
          cursor: pointer !important;
          transition: transform 0.22s cubic-bezier(0.22, 1, 0.36, 1), background-color 0.22s ease, border-color 0.22s ease, color 0.22s ease !important;
        }
        #elfarm-pos-header-btn:hover {
          background: rgba(239, 201, 164, 0.16) !important;
          border-color: #efc9a4 !important;
          color: #ffffff !important;
        }
        [data-framer-name="Menu Section"],
        [data-framer-name="About Banner Section"],
        [data-framer-name="Contact  Section"] {
          padding-top: max(154px, 16vh) !important;
        }
        [data-framer-name="Blog Tab Section"] {
          padding-top: 114px !important;
          padding-bottom: 44px !important;
        }
        [data-framer-name="Blog Tab Section"] .framer-g1uqgj {
          gap: 16px !important;
          max-width: 1360px !important;
        }
        [data-framer-name="Blog Tab Section"] .framer-pevpin,
        [data-framer-name="Blog Tab Section"] [data-framer-name="Title Block"] {
          max-width: 780px !important;
          margin-bottom: 0 !important;
          gap: 6px !important;
        }
        [data-framer-name="Blog Tab Section"] .framer-xqdrjo,
        [data-framer-name="Blog Tab Section"] .framer-z5rkjv {
          position: relative !important;
          height: auto !important;
          transform: none !important;
          opacity: 1 !important;
          animation: none !important;
          transition: none !important;
        }
        [data-framer-name="Blog Tab Section"] .framer-pevpin h1,
        [data-framer-name="Blog Tab Section"] .framer-pevpin h2,
        [data-framer-name="Blog Tab Section"] .framer-xqdrjo p {
          --framer-font-size: clamp(28px, 3vw, 38px) !important;
          --framer-line-height: 1.18em !important;
          font-size: clamp(28px, 3vw, 38px) !important;
          line-height: 1.18 !important;
          margin: 0 !important;
        }
        [data-framer-name="Blog Tab Section"] .framer-z5rkjv p {
          --framer-font-size: 14.5px !important;
          --framer-line-height: 1.45em !important;
          font-size: 14.5px !important;
          line-height: 1.45 !important;
          margin: 0 !important;
        }
      }
      @media (max-width: 1024px) {
        header,
        .framer-atzvB,
        .framer-2nqvvj-container {
          width: 100% !important;
          max-width: 100% !important;
          min-height: 76px !important;
          height: auto !important;
          padding: 0 !important;
          display: flex !important;
          align-items: center !important;
          opacity: 1 !important;
          visibility: visible !important;
          z-index: 120 !important;
        }
        header .framer-1vd02cg {
          width: 100% !important;
          max-width: 100% !important;
          padding: 14px 20px !important;
          margin: 0 !important;
        }
        header .framer-44446i,
        header [data-framer-name="Brand Logo"] {
          width: 68px !important;
          height: 48px !important;
        }
        header .framer-pwnhug {
          width: 100% !important;
          max-width: 100% !important;
          display: flex !important;
          flex-direction: row !important;
          justify-content: space-between !important;
          align-items: center !important;
          padding: 0 !important;
        }
        .framer-1k980me-container,
        .framer-1k980me-container *,
        header .framer-pc5vzg-container,
        header .framer-pc5vzg-container *,
        header [data-framer-name="Primary Header"],
        header .framer-1g6xkw5,
        header [data-framer-name="Header Button"],
        header .framer-r826j9,
        header .framer-r826j9 * {
          display: none !important;
          pointer-events: none !important;
        }
        [data-framer-name="Menu Section"],
        [data-framer-name="About Banner Section"],
        [data-framer-name="Blog Tab Section"],
        [data-framer-name="Contact  Section"] {
          padding-top: 106px !important;
        }
      }
      @media (min-width: 768px) and (max-width: 1024px) {
        header .framer-1vd02cg {
          padding: 16px 28px !important;
        }
      }
      header[data-framer-name],
      header [data-framer-name="Container"],
      header > div {
        background: transparent !important;
        background-color: transparent !important;
      }
      body:has([data-framer-name^="Hero Section"]) .framer-2nqvvj-container {
        position: fixed !important;
        top: 0 !important;
        left: 0 !important;
        right: 0 !important;
        width: 100% !important;
        z-index: 120 !important;
      }
      @media (min-width: 1600px) {
        [data-framer-name="Container"],
        .framer-yak54d {
          max-width: 1480px !important;
          margin-left: auto !important;
          margin-right: auto !important;
        }
      }
      @media (min-width: 810px) and (max-width: 1024px) {
        [data-framer-name^="Hero Section"],
        .framer-1myb8ii {
          width: 100% !important;
          max-width: 100% !important;
          margin-left: 0 !important;
          margin-right: 0 !important;
          height: 100dvh !important;
          min-height: 620px !important;
          max-height: 920px !important;
          padding: 86px 28px 36px !important;
          display: flex !important;
          flex-direction: column !important;
          justify-content: center !important;
          align-items: stretch !important;
          overflow: hidden !important;
        }
        [data-framer-name^="Hero Section"] [data-framer-name="Container"],
        .framer-1myb8ii .framer-yak54d {
          position: relative !important;
          z-index: 30 !important;
          width: 100% !important;
          max-width: 960px !important;
          height: auto !important;
          margin: 0 auto !important;
          padding: 0 !important;
          display: flex !important;
          flex-direction: row !important;
          align-items: center !important;
          justify-content: flex-start !important;
        }
        [data-framer-name^="Hero Section"] .framer-sk9zdg {
          max-width: 410px !important;
          gap: 16px !important;
        }
        [data-framer-name^="Hero Section"] h1 {
          font-size: clamp(38px, 5.2vw, 54px) !important;
          line-height: 1.04 !important;
        }
        [data-framer-name^="Hero Section"] [data-framer-name="Hero Heading Block"] p {
          font-size: 14px !important;
          line-height: 1.46 !important;
          max-width: 390px !important;
        }
        [data-framer-name="Hero Image Block"],
        .framer-c688wi,
        .framer-lEb4X .framer-c688wi {
          position: absolute !important;
          inset: 0 !important;
          width: 100% !important;
          height: 100% !important;
          transform: none !important;
          z-index: 22 !important;
          pointer-events: none !important;
        }
      }
      @media (min-width: 1025px) {
        [data-framer-name^="Hero Section"],
        .framer-1myb8ii {
          width: 100% !important;
          max-width: 100% !important;
          margin-left: 0 !important;
          margin-right: 0 !important;
          height: 100vh !important;
          height: 100dvh !important;
          min-height: 580px !important;
          max-height: 1040px !important;
          padding: clamp(66px, 9.5vh, 96px) clamp(20px, 3vw, 44px) clamp(56px, 8vh, 84px) !important;
          display: flex !important;
          flex-direction: column !important;
          justify-content: center !important;
          align-items: stretch !important;
          overflow: hidden !important;
        }
        [data-framer-name^="Hero Section"] [data-framer-name="Container"],
        .framer-1myb8ii .framer-yak54d {
          position: relative !important;
          z-index: 30 !important;
          width: 100% !important;
          max-width: 1360px !important;
          height: auto !important;
          margin: 0 auto !important;
          padding: 0 !important;
          display: flex !important;
          flex-direction: row !important;
          align-items: center !important;
          justify-content: flex-start !important;
        }
        [data-framer-name^="Hero Section"] .ssr-variant:has([data-framer-name="Hero Text Block"]),
        [data-framer-name^="Hero Section"] .ssr-variant:has([data-framer-name="Hero Description Block"]),
        [data-framer-name^="Hero Section"] [data-framer-name="Hero Description Block"],
        [data-framer-name^="Hero Section"] .framer-sk9zdg {
          position: relative !important;
          z-index: 35 !important;
          width: auto !important;
          max-width: clamp(440px, 43vw, 600px) !important;
          height: auto !important;
          margin: 0 !important;
          padding: 0 !important;
          display: flex !important;
          flex-direction: column !important;
          align-items: flex-start !important;
          gap: clamp(14px, 2.3vh, 26px) !important;
        }
        [data-framer-name^="Hero Section"] .framer-sheuxo,
        [data-framer-name^="Hero Section"] [data-framer-name="Hero Text Block"] {
          width: 100% !important;
          height: auto !important;
          display: flex !important;
          flex-direction: column !important;
          align-items: flex-start !important;
          gap: clamp(14px, 2.2vh, 24px) !important;
        }
        [data-framer-name^="Hero Section"] .framer-1kl1rad,
        [data-framer-name^="Hero Section"] [data-framer-name="Hero Heading Block"] {
          width: 100% !important;
          height: auto !important;
          gap: clamp(8px, 1.4vh, 16px) !important;
        }
        [data-framer-name^="Hero Section"] h1 {
          font-size: clamp(42px, min(4.9vw, 8.6vh), 80px) !important;
          line-height: 1.02 !important;
          letter-spacing: -0.02em !important;
          margin: 0 !important;
        }
        [data-framer-name^="Hero Section"] [data-framer-name="Hero Heading Block"] p {
          font-size: clamp(13.5px, min(1.15vw, 2.15vh), 17px) !important;
          line-height: 1.48 !important;
          max-width: 455px !important;
          margin: 0 !important;
        }
        [data-framer-name^="Hero Section"] .framer-5yqp0l-container {
          height: auto !important;
          margin: 0 !important;
        }
        [data-framer-name^="Hero Section"] .framer-5yqp0l-container a {
          padding-top: clamp(11px, 1.5vh, 16px) !important;
          padding-bottom: clamp(11px, 1.5vh, 16px) !important;
          padding-left: clamp(20px, 1.8vw, 28px) !important;
          padding-right: clamp(20px, 1.8vw, 28px) !important;
        }
        [data-framer-name^="Hero Section"] .framer-16wg6qc,
        [data-framer-name^="Hero Section"] [data-framer-name="Rating Stack"] {
          height: auto !important;
          margin-top: clamp(2px, 0.5vh, 8px) !important;
        }
        [data-framer-name="Hero Image Block"],
        .framer-c688wi,
        .framer-lEb4X .framer-c688wi {
          position: absolute !important;
          inset: 0 !important;
          width: 100% !important;
          min-width: 100% !important;
          max-width: none !important;
          height: 100% !important;
          min-height: 100% !important;
          max-height: none !important;
          aspect-ratio: auto !important;
          top: 0 !important;
          left: 0 !important;
          right: 0 !important;
          bottom: 0 !important;
          transform: none !important;
          z-index: 22 !important;
          overflow: visible !important;
          pointer-events: none !important;
        }
      }
      .elfarm-hero-nature-bg-layer {
        position: absolute !important;
        left: 0 !important;
        right: 0 !important;
        top: 0 !important;
        bottom: 0 !important;
        width: 100% !important;
        max-width: 100% !important;
        overflow: hidden !important;
        z-index: 1 !important;
        pointer-events: none !important;
        background: #0b1315 !important;
      }
      .elfarm-hero-nature-video {
        position: absolute !important;
        inset: 0 !important;
        width: 100% !important;
        height: 100% !important;
        object-fit: cover !important;
        object-position: center 40% !important;
        opacity: 0.94 !important;
        filter: saturate(1.18) contrast(1.04) brightness(0.96) !important;
        transform: scale(1.02) !important;
        pointer-events: none !important;
      }
      .elfarm-hero-nature-scrim {
        position: absolute !important;
        inset: 0 !important;
        background:
          radial-gradient(circle at 72% 44%, rgba(11, 19, 21, 0.02) 0%, rgba(11, 19, 21, 0.22) 48%, rgba(11, 19, 21, 0.54) 100%),
          linear-gradient(90deg, rgba(11, 19, 21, 0.56) 0%, rgba(11, 19, 21, 0.22) 46%, rgba(11, 19, 21, 0.04) 100%),
          linear-gradient(180deg, rgba(11, 19, 21, 0.34) 0%, rgba(11, 19, 21, 0.02) 22%, rgba(11, 19, 21, 0.14) 76%, rgba(11, 19, 21, 0.94) 100%) !important;
        pointer-events: none !important;
      }
      .elfarm-mobile-hero-content {
        display: none !important;
      }
      @media (max-width: 809px) {
        .elfarm-mobile-hero-content {
          display: flex !important;
          flex-direction: column !important;
          align-items: center !important;
          text-align: center !important;
          gap: clamp(8px, 1.3vh, 13px) !important;
          width: 100% !important;
          max-width: 360px !important;
          margin: 0 auto !important;
          padding: 4px 16px 4px !important;
          position: relative !important;
          z-index: 35 !important;
          pointer-events: auto !important;
        }
        .elfarm-mobile-hero-title {
          font-family: "Cormorant Garamond", serif !important;
          font-size: clamp(32px, 8.6vw, 40px) !important;
          font-weight: 500 !important;
          line-height: 1.04 !important;
          color: #ffffff !important;
          margin: 0 !important;
        }
        .elfarm-mobile-hero-sub {
          font-family: "Jost", sans-serif !important;
          font-size: 13px !important;
          line-height: 1.4 !important;
          color: rgba(238, 231, 219, 0.9) !important;
          margin: 0 !important;
        }
        .elfarm-mobile-hero-cta {
          display: inline-flex !important;
          align-items: center !important;
          justify-content: center !important;
          padding: 9px 20px !important;
          border: 2px solid rgb(239, 201, 164) !important;
          background: rgba(15, 29, 34, 0.85) !important;
          color: rgb(239, 201, 164) !important;
          font-family: "Jost", sans-serif !important;
          font-size: 12px !important;
          font-weight: 500 !important;
          letter-spacing: 0.08em !important;
          text-transform: uppercase !important;
          text-decoration: none !important;
          cursor: pointer !important;
        }
        .elfarm-mobile-table-host {
          position: absolute !important;
          inset: 0 !important;
          top: 0 !important;
          left: 0 !important;
          right: 0 !important;
          bottom: 0 !important;
          width: 100% !important;
          height: 100% !important;
          overflow: hidden !important;
          z-index: 22 !important;
          pointer-events: none !important;
        }
        [data-framer-name^="Hero Section"],
        .framer-1myb8ii {
          width: 100% !important;
          max-width: 100% !important;
          margin-left: 0 !important;
          margin-right: 0 !important;
          padding: 78px 0 0 !important;
          height: 100vh !important;
          height: 100dvh !important;
          min-height: 680px !important;
          max-height: 960px !important;
          display: flex !important;
          flex-direction: column !important;
          justify-content: flex-start !important;
          align-items: stretch !important;
          overflow: hidden !important;
        }
        [data-framer-name^="Hero Section"] .framer-yak54d {
          display: flex !important;
          flex-direction: column !important;
          justify-content: flex-start !important;
          align-items: center !important;
          gap: 6px !important;
          width: 100% !important;
          max-width: 100% !important;
          height: auto !important;
          padding-top: clamp(6px, 1.5vh, 18px) !important;
          z-index: 30 !important;
        }
        [data-framer-name^="Hero Section"] .ssr-variant.hidden-1k7gghl {
          display: flex !important;
          width: 100% !important;
          justify-content: center !important;
        }
        [data-framer-name^="Hero Section"] .framer-sk9zdg {
          width: 100% !important;
          max-width: 360px !important;
          padding: 4px 16px !important;
          align-items: center !important;
          text-align: center !important;
          gap: clamp(8px, 1.3vh, 14px) !important;
        }
        [data-framer-name^="Hero Section"] .framer-sk9zdg h1 {
          font-size: clamp(32px, 8.6vw, 40px) !important;
          line-height: 1.04 !important;
        }
        [data-framer-name^="Hero Section"] .framer-sk9zdg [data-framer-name="Hero Heading Block"] p {
          font-size: clamp(12.5px, 3.3vw, 14px) !important;
          line-height: 1.4 !important;
        }
        [data-framer-name^="Hero Section"] .framer-16wg6qc {
          margin-top: 2px !important;
        }
        [data-framer-name^="Hero Section"] .framer-sk9zdg h1,
        [data-framer-name^="Hero Section"] .framer-sk9zdg p {
          text-align: center !important;
        }
        [data-framer-name^="Hero Section"] .ssr-variant:has([data-framer-name="Phone Hero Image Block"]),
        [data-framer-name="Hero Image Block"].hidden-1k7gghl,
        .framer-c688wi.hidden-1k7gghl,
        [data-framer-name="Phone Hero Image Block"] {
          display: block !important;
          position: absolute !important;
          inset: 0 !important;
          left: 0 !important;
          right: 0 !important;
          top: 0 !important;
          bottom: 0 !important;
          transform: none !important;
          width: 100% !important;
          max-width: 100% !important;
          height: 100% !important;
          margin: 0 !important;
          overflow: hidden !important;
          z-index: 22 !important;
          pointer-events: none !important;
        }
      }
      @media (min-width: 768px) and (max-width: 809px) {
        header [data-framer-name="Navbar Block"],
        header .framer-pwnhug {
          width: 100% !important;
          max-width: 100% !important;
          padding-left: 28px !important;
          padding-right: 28px !important;
        }
        [data-framer-name^="Hero Section"] .framer-sk9zdg {
          max-width: 540px !important;
        }
      }
      /* Hide ALL old static plate bowls AND table-pinned Framer leaf layers across Desktop & Mobile */
      [data-framer-name="Hero Image Block"] [data-framer-name^="Image"],
      [data-framer-name="Hero Image Block"] > .ssr-variant:has([data-framer-name^="Image"]),
      .framer-c688wi [data-framer-name^="Image"],
      .framer-c688wi > .ssr-variant:has([data-framer-name^="Image"]),
      [data-framer-name="Phone Hero Image Block"] [data-framer-name^="Image"],
      [data-framer-name="Phone Hero Image Block"] [data-framer-name^="Leaf"],
      .framer-1j6fcxm,
      .framer-71xvpi,
      .framer-1qgz169,
      .framer-mv23c9,
      .framer-2bic5k,
      .framer-im3r88,
      .framer-eg25d9,
      .framer-1bj4dx3,
      .framer-vmjnap,
      [data-framer-name="Hero Image Block"] > .ssr-variant:has([data-framer-name^="Leaf"]),
      .framer-c688wi > .ssr-variant:has([data-framer-name^="Leaf"]),
      [data-framer-name="Hero Image Block"] [data-framer-name^="Leaf"],
      .framer-c688wi [data-framer-name^="Leaf"],
      .framer-qz7c8h,
      .framer-1c16luy,
      .framer-fcjafq,
      .framer-10n4q2h {
        display: none !important;
        opacity: 0 !important;
        visibility: hidden !important;
        pointer-events: none !important;
      }
      @keyframes elfarmPalazzoTableEntranceDesktop {
        0% {
          opacity: 0;
          transform: translate3d(14%, 0, 0) rotate(-28deg) scale(0.96);
        }
        25% {
          opacity: 1;
        }
        100% {
          opacity: 1;
          transform: translate3d(0, 0, 0) rotate(0deg) scale(1);
        }
      }
      @keyframes elfarmPalazzoTableEntranceMobile {
        0% {
          opacity: 0;
          transform: translate3d(0, 10%, 0) rotate(-28deg) scale(0.96);
        }
        25% {
          opacity: 1;
        }
        100% {
          opacity: 1;
          transform: translate3d(0, 0, 0) rotate(0deg) scale(1);
        }
      }
      @keyframes elfarmPalazzoPlateStaggerIn {
        0% {
          opacity: 0;
          transform: scale(1.08);
        }
        35% {
          opacity: 1;
        }
        100% {
          opacity: 1;
          transform: scale(1);
        }
      }
      .elfarm-palazzo-table-root {
        position: absolute !important;
        left: 0;
        top: 0;
        width: 924px;
        height: 924px;
        pointer-events: auto !important;
        user-select: none !important;
        z-index: 22 !important;
        transform-origin: center center !important;
        animation: elfarmPalazzoTableEntranceDesktop 1.35s cubic-bezier(0.22, 1, 0.36, 1) 0s both !important;
      }
      .elfarm-palazzo-wheel {
        position: absolute !important;
        inset: 0 !important;
        width: 100% !important;
        height: 100% !important;
        border-radius: 50% !important;
        cursor: grab !important;
        touch-action: pan-y !important;
        z-index: 3 !important;
        pointer-events: auto !important;
      }
      .elfarm-palazzo-wheel:active {
        cursor: grabbing !important;
      }
      .elfarm-palazzo-table-bg {
        position: absolute !important;
        inset: 0 !important;
        width: 100% !important;
        height: 100% !important;
        border-radius: 50% !important;
        object-fit: cover !important;
        box-shadow: 0 60px 120px rgba(0, 0, 0, 0.72), 0 18px 44px rgba(0, 0, 0, 0.55) !important;
        user-select: none !important;
        pointer-events: none !important;
        display: block !important;
        will-change: transform;
      }
      /* Palazzo Overhead Studio Highlight & Rim Vignette */
      .elfarm-palazzo-table-sheen {
        position: absolute !important;
        inset: 0 !important;
        border-radius: 50% !important;
        background:
          radial-gradient(circle at 38% 34%, rgba(255, 226, 180, 0.16) 0%, rgba(255, 226, 180, 0) 45%),
          radial-gradient(circle at 50% 50%, rgba(0, 0, 0, 0) 62%, rgba(0, 0, 0, 0.35) 100%) !important;
        pointer-events: none !important;
        z-index: 2 !important;
      }
      .elfarm-palazzo-plates-layer {
        position: absolute !important;
        inset: 0 !important;
        width: 100% !important;
        height: 100% !important;
        pointer-events: none !important;
        z-index: 3 !important;
      }
      .elfarm-palazzo-plate-slot {
        position: absolute !important;
        pointer-events: auto !important;
        cursor: pointer !important;
        touch-action: pan-y !important;
        will-change: transform, left, top;
      }
      .elfarm-palazzo-plate-entrance {
        width: 100% !important;
        height: 100% !important;
        animation: elfarmPalazzoPlateStaggerIn 1.1s cubic-bezier(0.22, 1, 0.36, 1) both !important;
        animation-delay: calc(0.5s + var(--plate-idx, 0) * 0.11s) !important;
      }
      .elfarm-palazzo-plate-circle {
        width: 100% !important;
        height: 100% !important;
        border-radius: 50% !important;
        overflow: hidden !important;
        box-shadow: 0 28px 48px rgba(0, 0, 0, 0.55), 0 6px 14px rgba(0, 0, 0, 0.38) !important;
        background: transparent !important;
        position: relative !important;
        transition: box-shadow 0.3s ease !important;
      }
      .elfarm-palazzo-plate-slot:hover .elfarm-palazzo-plate-circle {
        box-shadow: 0 32px 58px rgba(0, 0, 0, 0.7), 0 0 22px rgba(239, 201, 164, 0.25) !important;
      }
      .elfarm-palazzo-plate-slot.is-focal-plate .elfarm-palazzo-plate-circle {
        box-shadow:
          0 36px 68px rgba(0, 0, 0, 0.78),
          0 10px 24px rgba(0, 0, 0, 0.54),
          0 0 30px rgba(239, 201, 164, 0.20) !important;
      }
      .elfarm-palazzo-plate-circle img {
        width: 100% !important;
        height: 100% !important;
        object-fit: cover !important;
        border-radius: 50% !important;
        transform: scale(1) !important;
        display: block !important;
        user-select: none !important;
        pointer-events: none !important;
      }
      /* Upright Focal Smoke Canvas positioned directly over the focal plate */
      .elfarm-palazzo-focal-smoke-wrap {
        position: absolute !important;
        transform: translate(-50%, -68%) !important;
        pointer-events: none !important;
        z-index: 25 !important;
        opacity: 0 !important;
        transition: opacity 0.22s ease-out !important;
        filter: drop-shadow(0 8px 18px rgba(0, 0, 0, 0.52)) !important;
      }
      .elfarm-palazzo-focal-smoke-wrap.is-smoking {
        opacity: 1 !important;
      }
      .elfarm-palazzo-focal-smoke-canvas {
        width: 100% !important;
        height: 100% !important;
        display: block !important;
      }
      /* Live Course & Dish HUD Badge anchored cleanly inside the 100vh Hero bottom-left (zero overlap with 4.8/5 or table) */
      .elfarm-palazzo-hud {
        position: absolute !important;
        left: clamp(20px, 3vw, 44px) !important;
        bottom: clamp(12px, 2vh, 22px) !important;
        display: flex !important;
        flex-direction: row !important;
        flex-wrap: nowrap !important;
        align-items: center !important;
        gap: 10px !important;
        z-index: 36 !important;
        pointer-events: auto !important;
        max-width: min(720px, 58vw) !important;
      }
      .elfarm-palazzo-dish-badge {
        display: inline-flex !important;
        align-items: center !important;
        gap: 9px !important;
        padding: 6px 14px !important;
        border-radius: 999px !important;
        background: rgba(11, 19, 21, 0.88) !important;
        border: 1px solid rgba(239, 201, 164, 0.52) !important;
        backdrop-filter: blur(10px) !important;
        -webkit-backdrop-filter: blur(10px) !important;
        box-shadow: 0 12px 28px rgba(0, 0, 0, 0.65) !important;
        color: #eee7db !important;
        white-space: nowrap !important;
        max-width: 100% !important;
      }
      .elfarm-palazzo-dish-step {
        font-family: "Jost", sans-serif !important;
        font-size: 10px !important;
        font-weight: 600 !important;
        letter-spacing: 0.13em !important;
        text-transform: uppercase !important;
        color: rgb(239, 201, 164) !important;
        padding-right: 8px !important;
        border-right: 1px solid rgba(239, 201, 164, 0.3) !important;
        flex-shrink: 0 !important;
      }
      .elfarm-palazzo-dish-title {
        font-family: "Cormorant Garamond", serif !important;
        font-size: 17.5px !important;
        font-weight: 600 !important;
        color: #ffffff !important;
        overflow: hidden !important;
        text-overflow: ellipsis !important;
      }
      .elfarm-palazzo-dish-price {
        font-family: "Jost", sans-serif !important;
        font-size: 12px !important;
        font-weight: 600 !important;
        color: rgb(239, 201, 164) !important;
        padding-left: 3px !important;
        flex-shrink: 0 !important;
      }
      .elfarm-palazzo-drag-hint {
        display: inline-flex !important;
        align-items: center !important;
        gap: 7px !important;
        padding: 7px 14px 7px 11px !important;
        border-radius: 999px !important;
        border: 1px solid rgba(238, 231, 219, 0.42) !important;
        background: rgba(17, 18, 20, 0.72) !important;
        backdrop-filter: blur(8px) !important;
        -webkit-backdrop-filter: blur(8px) !important;
        font-family: "Jost", sans-serif !important;
        font-size: 12px !important;
        color: rgb(238, 231, 219) !important;
        white-space: nowrap !important;
        cursor: pointer !important;
        transition: border-color 0.2s ease, transform 0.2s ease !important;
      }
      .elfarm-palazzo-drag-hint:hover {
        border-color: rgba(239, 201, 164, 0.85) !important;
        transform: translateY(-1px) !important;
      }
      .elfarm-palazzo-drag-hint svg {
        width: 15px !important;
        height: 15px !important;
        color: rgb(239, 201, 164) !important;
      }
      @media (max-width: 809px) {
        .elfarm-palazzo-table-root {
          animation: elfarmPalazzoTableEntranceMobile 2.4s cubic-bezier(0.22, 1, 0.36, 1) 0.15s both !important;
        }
        .elfarm-palazzo-hud {
          left: 50% !important;
          bottom: clamp(10px, 2vh, 20px) !important;
          transform: translateX(-50%) !important;
          flex-direction: column-reverse !important;
          align-items: center !important;
          gap: 6px !important;
          width: max-content !important;
          max-width: 94vw !important;
        }
        .elfarm-palazzo-dish-badge {
          padding: 5px 12px !important;
          gap: 7px !important;
        }
        .elfarm-palazzo-dish-step {
          font-size: 9.5px !important;
          padding-right: 7px !important;
        }
        .elfarm-palazzo-dish-title {
          font-size: 15.5px !important;
        }
        .elfarm-palazzo-dish-price {
          font-size: 11.5px !important;
        }
        .elfarm-palazzo-drag-hint {
          padding: 6px 14px 6px 11px !important;
          font-size: 11.5px !important;
        }
      }

      /* ============================================================================
         PHASE 3B: /menu PAGE HOVER CARDS (CodePen phlpbgnr/pen/PwbGLmL)
         3D Pointer Tilt, Sweeping Top Accent Bar, Radial Glow, Title Underline,
         & Floating Image Lightbox Modal with Prev/Next Navigation
         ============================================================================ */
      .framer-1bh56fl {
        display: flex !important;
        flex-direction: row !important;
        flex-wrap: wrap !important;
        justify-content: center !important;
        align-items: center !important;
        gap: 14px !important;
        width: 100% !important;
        margin-bottom: 24px !important;
      }
      #elfarm-menu-search-wrap {
        display: none;
        width: 100%;
        max-width: 640px;
        margin: 0 auto 12px auto;
        position: relative;
        align-items: center;
      }
      #elfarm-menu-search {
        width: 100%;
        height: 44px;
        padding: 0 42px 0 40px;
        border-radius: 999px;
        border: 1px solid rgba(239, 201, 164, 0.24);
        background: rgba(15, 29, 34, 0.92);
        color: #f5f5f5;
        font-family: "Jost", sans-serif;
        font-size: 14px;
        outline: none;
        transition: border-color 0.2s ease, box-shadow 0.2s ease;
      }
      #elfarm-menu-search:focus {
        border-color: rgb(239, 201, 164);
        box-shadow: 0 0 0 3px rgba(239, 201, 164, 0.14);
      }
      #elfarm-menu-search::placeholder {
        color: rgba(245, 245, 245, 0.5);
      }
      .elfarm-menu-search-icon {
        position: absolute;
        left: 15px;
        top: 50%;
        transform: translateY(-50%);
        color: rgba(239, 201, 164, 0.78);
        pointer-events: none;
        font-size: 14px;
      }
      #elfarm-menu-search-clear {
        position: absolute;
        right: 10px;
        top: 50%;
        transform: translateY(-50%);
        width: 26px;
        height: 26px;
        border-radius: 50%;
        border: none;
        background: rgba(239, 201, 164, 0.14);
        color: rgb(239, 201, 164);
        font-size: 15px;
        line-height: 1;
        cursor: pointer;
        display: none;
        align-items: center;
        justify-content: center;
      }
      #elfarm-menu-search-clear.is-visible {
        display: inline-flex;
      }
      .elfarm-pwb-mobile-foot {
        display: none;
      }
      .elfarm-menu-empty {
        grid-column: 1 / -1;
        text-align: center;
        padding: 40px 20px;
        border-radius: 16px;
        border: 1px dashed rgba(239, 201, 164, 0.28);
        background: rgba(15, 29, 34, 0.65);
        color: rgba(245, 245, 245, 0.78);
        font-family: "Jost", sans-serif;
        font-size: 15px;
      }
      .elfarm-native-tab {
        cursor: pointer !important;
        text-decoration: none !important;
      }
      .elfarm-native-tab .framer-BLYYx {
        transition: all 0.25s ease !important;
      }
      .elfarm-native-tab:hover .framer-v-230u22 {
        border-color: rgb(239, 201, 164) !important;
      }
      .elfarm-native-tab:hover .framer-v-230u22 p {
        color: rgb(239, 201, 164) !important;
      }

      .framer-scnc0m:not(.elfarm-pwb-grid) {
        opacity: 0 !important;
        pointer-events: none !important;
      }
      .elfarm-pwb-grid {
        display: grid !important;
        grid-template-columns: repeat(auto-fill, minmax(330px, 1fr)) !important;
        gap: 32px !important;
        width: 100% !important;
        max-width: 1264px !important;
        margin: 0 auto !important;
      }
      @media (max-width: 1024px) {
        #elfarm-menu-search-wrap {
          display: flex !important;
        }
        .framer-1bh56fl {
          flex-wrap: nowrap !important;
          justify-content: flex-start !important;
          overflow-x: auto !important;
          overflow-y: hidden !important;
          gap: 8px !important;
          padding: 2px 2px 10px !important;
          margin-bottom: 14px !important;
          -webkit-overflow-scrolling: touch !important;
          scrollbar-width: none !important;
        }
        .framer-1bh56fl::-webkit-scrollbar {
          display: none !important;
        }
        .elfarm-native-tab {
          flex: 0 0 auto !important;
        }
        .elfarm-native-tab .framer-BLYYx {
          height: auto !important;
          min-height: 0 !important;
          padding: 7px 14px !important;
          border-radius: 999px !important;
        }
        .elfarm-native-tab .framer-1e08qxj p {
          font-size: 13px !important;
          line-height: 1.2 !important;
          white-space: nowrap !important;
        }
        .elfarm-pwb-grid {
          grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
          gap: 14px !important;
        }
        .elfarm-pwb-card {
          border-radius: 14px !important;
          box-shadow: 0 10px 24px rgba(0, 0, 0, 0.34) !important;
        }
        .elfarm-pwb-img-container {
          height: auto !important;
          aspect-ratio: 4 / 3 !important;
        }
        .elfarm-pwb-cat-badge {
          top: 8px !important;
          left: 8px !important;
          padding: 3px 8px !important;
          font-size: 9.5px !important;
          letter-spacing: 0.05em !important;
          max-width: calc(100% - 16px) !important;
          white-space: nowrap !important;
          overflow: hidden !important;
          text-overflow: ellipsis !important;
        }
        .elfarm-pwb-zoom-pill,
        .elfarm-pwb-number,
        .elfarm-pwb-header-row .elfarm-pwb-price,
        .elfarm-pwb-title::after {
          display: none !important;
        }
        .elfarm-pwb-content {
          padding: 10px 11px 12px !important;
        }
        .elfarm-pwb-header-row {
          margin-bottom: 4px !important;
        }
        .elfarm-pwb-title {
          font-size: 16px !important;
          line-height: 1.2 !important;
          padding-bottom: 0 !important;
          display: -webkit-box !important;
          -webkit-line-clamp: 2 !important;
          -webkit-box-orient: vertical !important;
          overflow: hidden !important;
        }
        .elfarm-pwb-desc {
          font-size: 12px !important;
          line-height: 1.35 !important;
          display: -webkit-box !important;
          -webkit-line-clamp: 1 !important;
          -webkit-box-orient: vertical !important;
          overflow: hidden !important;
          margin-bottom: 8px !important;
        }
        .elfarm-pwb-mobile-foot {
          display: flex !important;
          align-items: center !important;
          justify-content: space-between !important;
          gap: 6px !important;
          margin-top: auto !important;
          padding-top: 6px !important;
          border-top: 1px solid rgba(239, 201, 164, 0.1) !important;
        }
        .elfarm-pwb-mprice {
          font-family: "Cormorant Garamond", serif !important;
          font-size: 17px !important;
          font-weight: 700 !important;
          color: rgb(239, 201, 164) !important;
          line-height: 1 !important;
        }
        .elfarm-pwb-mplus {
          display: inline-flex !important;
          align-items: center !important;
          justify-content: center !important;
          height: 26px !important;
          padding: 0 10px !important;
          border-radius: 999px !important;
          background: rgb(239, 201, 164) !important;
          color: rgb(11, 19, 21) !important;
          font-family: "Jost", sans-serif !important;
          font-size: 11px !important;
          font-weight: 700 !important;
          letter-spacing: 0.03em !important;
          white-space: nowrap !important;
        }
      }
      @media (max-width: 767px) {
        .framer-scnc0m:not(.elfarm-pwb-grid) {
          opacity: 0 !important;
          pointer-events: none !important;
        }
        .elfarm-pwb-grid {
          grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
          gap: 11px !important;
        }
        .elfarm-pwb-desc {
          display: none !important;
        }
        .elfarm-pwb-title {
          font-size: 15px !important;
          min-height: 36px !important;
        }
      }

      .elfarm-pwb-card {
        position: relative;
        background: rgba(15, 29, 34, 0.95);
        border-radius: 18px;
        overflow: hidden;
        border: 1px solid rgba(239, 201, 164, 0.16);
        box-shadow: 0 15px 35px rgba(0, 0, 0, 0.38);
        transition: transform 0.55s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.55s ease, border-color 0.4s ease;
        cursor: pointer;
        display: flex;
        flex-direction: column;
      }
      .elfarm-pwb-card::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 4px;
        background: linear-gradient(90deg, #efc9a4, #d49b63, #52b788);
        transform: scaleX(0);
        transform-origin: left;
        transition: transform 0.5s ease;
        z-index: 5;
      }
      .elfarm-pwb-card::after {
        content: "";
        position: absolute;
        inset: 0;
        background: radial-gradient(circle at top right, rgba(239, 201, 164, 0.12), transparent 65%);
        opacity: 0;
        transition: opacity 0.5s ease;
        pointer-events: none;
        z-index: 1;
      }
      .elfarm-pwb-card:hover {
        border-color: rgba(239, 201, 164, 0.52);
        box-shadow: 0 24px 54px rgba(0, 0, 0, 0.55), 0 0 28px rgba(239, 201, 164, 0.14);
      }
      .elfarm-pwb-card:hover::before {
        transform: scaleX(1);
      }
      .elfarm-pwb-card:hover::after {
        opacity: 1;
      }
      .elfarm-pwb-img-container {
        position: relative;
        width: 100%;
        height: 290px;
        overflow: hidden;
        background: #081012;
      }
      .elfarm-pwb-img-container::after {
        content: "";
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 36%;
        background: linear-gradient(to top, rgba(15, 29, 34, 0.92), transparent);
        pointer-events: none;
        z-index: 2;
      }
      .elfarm-pwb-img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
        display: block;
        filter: saturate(0.96) contrast(1.03);
        transition: transform 0.7s cubic-bezier(0.22, 1, 0.36, 1), filter 0.5s ease;
      }
      .elfarm-pwb-card:hover .elfarm-pwb-img {
        transform: scale(1.08) translateY(-4px);
        filter: saturate(1.12) contrast(1.08);
      }
      .elfarm-pwb-cat-badge {
        position: absolute;
        top: 16px;
        right: 16px;
        background: rgba(11, 19, 21, 0.86);
        backdrop-filter: blur(8px);
        border: 1px solid rgba(239, 201, 164, 0.38);
        color: rgb(239, 201, 164);
        padding: 6px 14px;
        border-radius: 999px;
        font-family: "Jost", sans-serif;
        font-size: 11px;
        font-weight: 600;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        z-index: 3;
        transition: transform 0.35s ease, background 0.35s ease;
      }
      .elfarm-pwb-card:hover .elfarm-pwb-cat-badge {
        transform: translateY(-2px);
        background: rgb(239, 201, 164);
        color: rgb(11, 19, 21);
      }
      .elfarm-pwb-zoom-pill {
        position: absolute;
        bottom: 14px;
        right: 16px;
        background: rgba(11, 19, 21, 0.84);
        border: 1px solid rgba(239, 201, 164, 0.4);
        color: rgb(239, 201, 164);
        padding: 5px 12px;
        border-radius: 999px;
        font-family: "Jost", sans-serif;
        font-size: 11.5px;
        font-weight: 500;
        z-index: 3;
        opacity: 0;
        transform: translateY(8px);
        transition: opacity 0.35s ease, transform 0.35s ease;
      }
      .elfarm-pwb-card:hover .elfarm-pwb-zoom-pill {
        opacity: 1;
        transform: translateY(0);
      }
      .elfarm-pwb-content {
        position: relative;
        padding: 22px 24px 26px 24px;
        display: flex;
        flex-direction: column;
        flex-grow: 1;
        z-index: 2;
      }
      .elfarm-pwb-number {
        position: absolute;
        top: 10px;
        right: 20px;
        font-family: "Cormorant Garamond", serif;
        font-size: 54px;
        font-weight: 700;
        color: rgba(239, 201, 164, 0.07);
        line-height: 1;
        pointer-events: none;
        transition: transform 0.45s ease, color 0.45s ease;
      }
      .elfarm-pwb-card:hover .elfarm-pwb-number {
        transform: scale(1.12);
        color: rgba(239, 201, 164, 0.14);
      }
      .elfarm-pwb-header-row {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        gap: 12px;
        margin-bottom: 10px;
      }
      .elfarm-pwb-title {
        position: relative;
        display: inline-block;
        font-family: "Cormorant Garamond", serif;
        font-size: 25px;
        font-weight: 600;
        line-height: 1.2;
        color: rgb(239, 201, 164);
        margin: 0;
        padding-bottom: 6px;
        transition: transform 0.35s ease, color 0.35s ease;
      }
      .elfarm-pwb-title::after {
        content: "";
        position: absolute;
        bottom: 0;
        left: 0;
        width: 36px;
        height: 2px;
        background: linear-gradient(90deg, #efc9a4, transparent);
        transition: width 0.4s ease;
      }
      .elfarm-pwb-card:hover .elfarm-pwb-title {
        color: #ffffff;
        transform: translateX(3px);
      }
      .elfarm-pwb-card:hover .elfarm-pwb-title::after {
        width: 100%;
      }
      .elfarm-pwb-price {
        font-family: "Cormorant Garamond", serif;
        font-size: 24px;
        font-weight: 700;
        color: rgb(239, 201, 164);
        white-space: nowrap;
        flex-shrink: 0;
      }
      .elfarm-pwb-desc {
        font-family: "Jost", sans-serif;
        font-size: 14.5px;
        line-height: 1.6;
        color: rgb(200, 201, 203);
        margin: 0;
        transition: transform 0.35s ease;
      }
      .elfarm-pwb-card:hover .elfarm-pwb-desc {
        transform: translateY(-2px);
      }

      /* Floating Image Lightbox Modal (/menu & Blog Reader) */
      #elfarm-menu-lightbox {
        position: fixed;
        inset: 0;
        background: rgba(7, 13, 15, 0.92);
        backdrop-filter: blur(14px);
        z-index: 2147483645;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 24px;
        opacity: 0;
        visibility: hidden;
        pointer-events: none;
        transition: opacity 0.32s cubic-bezier(0.22, 1, 0.36, 1), visibility 0.32s ease;
      }
      #elfarm-menu-lightbox.is-open {
        opacity: 1;
        visibility: visible;
        pointer-events: auto;
      }
      .elfarm-lb-dialog {
        position: relative;
        width: 100%;
        max-width: 960px;
        background: rgb(11, 19, 21);
        border: 1px solid rgba(239, 201, 164, 0.35);
        border-radius: 20px;
        overflow: hidden;
        box-shadow: 0 32px 90px rgba(0, 0, 0, 0.78);
        display: grid;
        grid-template-columns: 1.15fr 1fr;
        transform: scale(0.94) translateY(12px);
        transition: transform 0.36s cubic-bezier(0.22, 1, 0.36, 1);
      }
      #elfarm-menu-lightbox.is-open .elfarm-lb-dialog {
        transform: scale(1) translateY(0);
      }
      @media (max-width: 820px) {
        .elfarm-lb-dialog {
          grid-template-columns: 1fr;
          max-height: 90vh;
          overflow-y: auto;
        }
      }
      .elfarm-lb-media {
        position: relative;
        background: #060b0d;
        min-height: 440px;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
      }
      @media (max-width: 820px) {
        .elfarm-lb-media {
          min-height: 290px;
          max-height: 340px;
        }
      }
      .elfarm-lb-media img {
        width: 100%;
        height: 100%;
        max-height: 540px;
        object-fit: cover;
        display: block;
        transition: transform 0.38s ease, opacity 0.28s ease;
      }
      .elfarm-lb-details {
        padding: 40px 36px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 16px;
      }
      @media (max-width: 820px) {
        .elfarm-lb-details {
          padding: 24px 22px 28px 22px;
        }
      }
      .elfarm-lb-counter {
        font-family: "Jost", sans-serif;
        font-size: 12px;
        font-weight: 600;
        letter-spacing: 0.16em;
        text-transform: uppercase;
        color: rgba(239, 201, 164, 0.75);
      }
      .elfarm-lb-cat {
        display: inline-flex;
        align-self: flex-start;
        padding: 5px 14px;
        border-radius: 999px;
        border: 1px solid rgba(239, 201, 164, 0.4);
        color: rgb(239, 201, 164);
        font-family: "Jost", sans-serif;
        font-size: 11.5px;
        font-weight: 600;
        letter-spacing: 0.1em;
        text-transform: uppercase;
      }
      .elfarm-lb-title {
        font-family: "Cormorant Garamond", serif;
        font-size: 36px;
        font-weight: 600;
        line-height: 1.15;
        color: #ffffff;
        margin: 0;
      }
      .elfarm-lb-price {
        font-family: "Cormorant Garamond", serif;
        font-size: 30px;
        font-weight: 700;
        color: rgb(239, 201, 164);
      }
      .elfarm-lb-desc {
        font-family: "Jost", sans-serif;
        font-size: 15.5px;
        line-height: 1.65;
        color: rgb(205, 206, 208);
        margin: 0;
      }
      .elfarm-lb-nav-row {
        display: flex;
        align-items: center;
        gap: 12px;
        margin-top: 12px;
        padding-top: 18px;
        border-top: 1px solid rgba(239, 201, 164, 0.16);
      }
      .elfarm-lb-btn {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        padding: 11px 20px;
        background: rgba(15, 29, 34, 0.95);
        border: 1.5px solid rgba(239, 201, 164, 0.55);
        color: rgb(239, 201, 164);
        border-radius: 999px;
        font-family: "Jost", sans-serif;
        font-size: 13px;
        font-weight: 600;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        cursor: pointer;
        transition: all 0.25s ease;
      }
      .elfarm-lb-btn:hover {
        background: rgb(239, 201, 164);
        color: rgb(11, 19, 21);
      }
      .elfarm-lb-close {
        position: absolute;
        top: 16px;
        right: 16px;
        width: 42px;
        height: 42px;
        border-radius: 50%;
        background: rgba(11, 19, 21, 0.88);
        border: 1.5px solid rgba(239, 201, 164, 0.5);
        color: rgb(239, 201, 164);
        font-size: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        z-index: 10;
        transition: all 0.25s ease;
      }
      .elfarm-lb-close:hover {
        background: rgb(239, 201, 164);
        color: rgb(11, 19, 21);
        transform: rotate(90deg);
      }
      .elfarm-lb-side-arrow {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        width: 46px;
        height: 46px;
        border-radius: 50%;
        background: rgba(11, 19, 21, 0.85);
        border: 1.5px solid rgba(239, 201, 164, 0.55);
        color: rgb(239, 201, 164);
        font-size: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        z-index: 6;
        transition: all 0.25s ease;
      }
      .elfarm-lb-side-arrow:hover {
        background: rgb(239, 201, 164);
        color: rgb(11, 19, 21);
      }
      .elfarm-lb-side-arrow.prev { left: 14px; }
      .elfarm-lb-side-arrow.next { right: 14px; }

      /* ============================================================================
         PHASE 6: CUSTOMER FACEBOOK SLIDER OVERLAY & CAMERA ICON REMOVAL
         Removes camera icon, pauses ticker on hover, shows FB caption/date/metrics
         ============================================================================ */
      [data-framer-name="Instagram Section"] .framer-1929t28,
      [data-framer-name="Instagram Section"] .framer-h1f67r,
      [data-framer-name="Instagram Section"] .framer-m117t1,
      [data-framer-name="Instagram Section"] [data-framer-name="Icon"],
      [data-framer-name="Instagram Section"] [data-framer-name="Icon Wrap"],
      [data-framer-name="Instagram Section"] [data-framer-name="Overlay"],
      [data-framer-name="Instagram Section"] svg {
        display: none !important;
        opacity: 0 !important;
        visibility: hidden !important;
        pointer-events: none !important;
      }
      [data-framer-name="Instagram Section"] a.elfarm-fb-card-ready {
        position: relative !important;
        overflow: hidden !important;
      }
      .elfarm-fb-hover-overlay {
        position: absolute;
        inset: 0;
        background: linear-gradient(to top, rgba(7, 13, 15, 0.96) 0%, rgba(11, 19, 21, 0.78) 55%, rgba(11, 19, 21, 0.25) 100%);
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        padding: 22px 20px;
        opacity: 0;
        transition: opacity 0.32s cubic-bezier(0.22, 1, 0.36, 1);
        z-index: 9;
        pointer-events: none;
        box-sizing: border-box;
      }
      a.elfarm-fb-card-ready:hover .elfarm-fb-hover-overlay {
        opacity: 1;
      }
      .elfarm-fb-badge-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 8px;
        margin-bottom: 8px;
      }
      .elfarm-fb-source-pill {
        background: rgba(239, 201, 164, 0.18);
        border: 1px solid rgba(239, 201, 164, 0.45);
        color: rgb(239, 201, 164);
        padding: 3px 10px;
        border-radius: 999px;
        font-family: "Jost", sans-serif;
        font-size: 10.5px;
        font-weight: 600;
        letter-spacing: 0.08em;
        text-transform: uppercase;
      }
      .elfarm-fb-date {
        font-family: "Jost", sans-serif;
        font-size: 11.5px;
        color: rgba(239, 201, 164, 0.85);
      }
      .elfarm-fb-caption {
        font-family: "Jost", sans-serif;
        font-size: 13.5px;
        line-height: 1.5;
        color: #ffffff;
        margin: 0 0 12px 0;
        display: -webkit-box;
        -webkit-line-clamp: 4;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
      .elfarm-fb-stats {
        display: flex;
        align-items: center;
        gap: 14px;
        padding-top: 10px;
        border-top: 1px solid rgba(239, 201, 164, 0.22);
        font-family: "Jost", sans-serif;
        font-size: 12px;
        font-weight: 600;
        color: rgb(239, 201, 164);
      }

      /* Reflective S-Curve WebGL Customer Gallery (CodePen ol-ivier 01a20e5e) */
      #elfarm-scurve-gallery-wrap {
        position: relative;
        width: 100%;
        height: 550px;
        background: #070b0d;
        border-top: 1px solid rgba(239, 201, 164, 0.16);
        border-bottom: 1px solid rgba(239, 201, 164, 0.16);
        overflow: hidden;
        user-select: none;
        -webkit-user-select: none;
        touch-action: pan-y;
      }
      @media (max-width: 809px) {
        #elfarm-scurve-gallery-wrap {
          height: 410px;
        }
      }
      #elfarm-scurve-canvas {
        display: block;
        width: 100%;
        height: 100%;
        cursor: grab;
      }
      #elfarm-scurve-canvas:active {
        cursor: grabbing;
      }
      #elfarm-scurve-fb-overlay {
        position: absolute;
        left: 0;
        top: 0;
        width: 340px;
        max-width: calc(100vw - 24px);
        background: linear-gradient(to top, rgba(7, 13, 15, 0.96) 0%, rgba(11, 19, 21, 0.86) 65%, rgba(11, 19, 21, 0.18) 100%);
        border: 1px solid rgba(239, 201, 164, 0.3);
        border-radius: 12px;
        padding: 18px 18px 16px;
        box-sizing: border-box;
        opacity: 0;
        pointer-events: none;
        transform: translate3d(0, 6px, 0);
        transition: opacity 0.25s cubic-bezier(0.22, 1, 0.36, 1), transform 0.25s cubic-bezier(0.22, 1, 0.36, 1);
        z-index: 15;
        backdrop-filter: blur(8px);
        -webkit-backdrop-filter: blur(8px);
      }
      #elfarm-scurve-fb-overlay.is-visible {
        opacity: 1;
        transform: translate3d(0, 0, 0);
      }
      #elfarm-scurve-fb-overlay.is-focused {
        pointer-events: auto;
      }
      #elfarm-scurve-close-btn {
        position: absolute;
        top: 18px;
        right: 22px;
        z-index: 25;
        background: rgba(11, 19, 21, 0.86);
        border: 1px solid rgba(239, 201, 164, 0.42);
        color: #efc9a4;
        padding: 9px 18px;
        border-radius: 999px;
        font-family: "Jost", sans-serif;
        font-size: 12px;
        font-weight: 700;
        letter-spacing: 0.12em;
        text-transform: uppercase;
        cursor: pointer;
        opacity: 0;
        pointer-events: none;
        transform: translateY(-6px);
        transition: opacity 0.3s ease, transform 0.3s ease, background 0.2s ease;
        backdrop-filter: blur(8px);
      }
      #elfarm-scurve-close-btn.is-visible {
        opacity: 1;
        pointer-events: auto;
        transform: translateY(0);
      }
      #elfarm-scurve-close-btn:hover {
        background: rgba(239, 201, 164, 0.2);
        color: #ffffff;
      }
      .elfarm-scurve-hintbar {
        position: absolute;
        bottom: 12px;
        left: 50%;
        transform: translateX(-50%);
        z-index: 12;
        display: inline-flex;
        align-items: center;
        gap: 10px;
        padding: 6px 14px;
        border-radius: 999px;
        background: rgba(7, 13, 15, 0.72);
        border: 1px solid rgba(239, 201, 164, 0.22);
        color: rgba(239, 201, 164, 0.86);
        font-family: "Jost", sans-serif;
        font-size: 11px;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        white-space: nowrap;
        pointer-events: none;
        backdrop-filter: blur(6px);
      }
      .elfarm-scurve-navbtn {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        z-index: 18;
        width: 42px;
        height: 42px;
        border-radius: 999px;
        border: 1px solid rgba(239, 201, 164, 0.35);
        background: rgba(11, 19, 21, 0.78);
        color: #efc9a4;
        font-size: 20px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: background 0.2s ease, transform 0.15s ease;
        backdrop-filter: blur(8px);
      }
      .elfarm-scurve-navbtn:hover {
        background: rgba(239, 201, 164, 0.22);
        color: #ffffff;
      }
      .elfarm-scurve-navbtn.prev { left: 14px; }
      .elfarm-scurve-navbtn.next { right: 14px; }

      /* 3D Disc Shelf Blog Gallery (CodePen Maseone 01a1db16) */
      .elfarm-ds-wrapper {
        --W: clamp(222px, 19vw, 268px);
        --H: calc(var(--W) * 1.03);
        --S: calc(var(--W) * 0.082);
        --sp: calc(var(--S) + 6px);
        position: relative;
        width: 100vw;
        max-width: 100vw;
        margin: 4px 0 0 calc(50% - 50vw);
        padding: 16px 0 20px;
        border-radius: 0;
        background: #090e10;
        border-top: 1px solid rgba(239, 201, 164, 0.2);
        border-bottom: 1px solid rgba(239, 201, 164, 0.2);
        box-shadow: 0 32px 70px rgba(0, 0, 0, 0.65);
        overflow: hidden;
        user-select: none;
        -webkit-user-select: none;
        box-sizing: border-box;
      }
      @media (max-width: 1024px) and (min-width: 768px) {
        .elfarm-ds-wrapper {
          --W: clamp(200px, 26vw, 248px);
          padding: 18px 0 20px;
        }
      }
      @media (max-width: 767px) {
        .elfarm-ds-wrapper {
          --W: clamp(172px, 48vw, 212px);
          padding: 16px 0 18px;
        }
      }
      .elfarm-ds-backdrops {
        position: absolute;
        inset: 0;
        z-index: 0;
        overflow: hidden;
        pointer-events: none;
      }
      .elfarm-ds-bd {
        position: absolute;
        inset: -8%;
        background-position: center;
        background-size: cover;
        filter: blur(42px) brightness(0.32) saturate(1.25);
        opacity: 0;
        transition: opacity 650ms ease;
      }
      .elfarm-ds-bd.is-active {
        opacity: 1;
      }
      .elfarm-ds-streaks {
        position: absolute;
        inset: -8% 0;
        width: 100%;
        height: 116%;
        z-index: 1;
        pointer-events: none;
        fill: none;
        stroke: rgba(239, 201, 164, 0.14);
        stroke-width: 2;
        animation: elfarmDsDrift 14s ease-in-out infinite alternate;
      }
      @keyframes elfarmDsDrift {
        to { transform: translateY(28px); }
      }
      .elfarm-ds-top {
        position: relative;
        z-index: 4;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 10px;
        padding: 0 clamp(16px, 3vw, 40px);
        color: rgba(245, 245, 245, 0.85);
        font-family: "Jost", sans-serif;
        font-size: 13px;
        font-weight: 600;
        letter-spacing: 0.08em;
        text-transform: uppercase;
      }
      .elfarm-ds-brand {
        display: inline-flex;
        align-items: center;
        gap: 9px;
      }
      .elfarm-ds-brand-dot {
        width: 16px;
        height: 16px;
        border-radius: 50%;
        background: conic-gradient(from 30deg, #efc9a4, #4ade80, #f59e0b, #efc9a4);
        -webkit-mask: radial-gradient(circle, transparent 3px, #000 3.5px);
        mask: radial-gradient(circle, transparent 3px, #000 3.5px);
      }
      .elfarm-ds-count strong {
        color: #efc9a4;
        font-size: 15px;
      }
      .elfarm-ds-shelf {
        position: relative;
        z-index: 3;
        height: calc(var(--H) * 1.12);
        outline: none;
        touch-action: pan-y;
        cursor: grab;
      }
      .elfarm-ds-shelf:active {
        cursor: grabbing;
      }
      .elfarm-ds-cases {
        position: absolute;
        inset: 0;
        margin: 0;
        padding: 0;
        list-style: none;
        perspective: 1500px;
        perspective-origin: 50% 45%;
        transform-style: preserve-3d;
      }
      .elfarm-ds-case {
        position: absolute;
        left: 50%;
        top: 48%;
        width: var(--W);
        height: var(--H);
        margin-left: calc(var(--W) / -2);
        margin-top: calc(var(--H) / -2);
        transform-style: preserve-3d;
        transition: transform 620ms cubic-bezier(0.2, 0.85, 0.25, 1), opacity 400ms ease;
        cursor: pointer;
      }
      .elfarm-ds-box {
        position: absolute;
        inset: 0;
        transform-style: preserve-3d;
      }
      .elfarm-ds-cover {
        position: absolute;
        inset: 0;
        transform-style: preserve-3d;
        transform: translateZ(calc(var(--S) / 2));
      }
      .elfarm-ds-out {
        position: relative;
        width: 100%;
        height: 100%;
        border-radius: 6px;
        overflow: hidden;
        background: #141c1f;
        box-shadow: 0 26px 50px -18px rgba(0, 0, 0, 0.78), inset 0 0 0 1px rgba(255, 255, 255, 0.22);
      }
      .elfarm-ds-out img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
        pointer-events: none;
      }
      .elfarm-ds-out::before {
        content: "";
        position: absolute;
        inset: -30% -60%;
        z-index: 3;
        pointer-events: none;
        background: linear-gradient(105deg, transparent 40%, rgba(255, 255, 255, 0.2) 45%, rgba(255, 255, 255, 0.72) 50%, rgba(255, 255, 255, 0.2) 55%, transparent 60%);
        mix-blend-mode: screen;
        transform: translateX(-75%);
      }
      .elfarm-ds-case.is-chosen .elfarm-ds-out::before {
        animation: elfarmDsGlint 4.4s cubic-bezier(0.45, 0.05, 0.35, 1) -1.1s infinite;
      }
      @keyframes elfarmDsGlint {
        0%, 48% { transform: translateX(-75%); }
        80%, 100% { transform: translateX(75%); }
      }
      .elfarm-ds-hinge {
        position: absolute;
        inset: 0 auto 0 0;
        width: 7%;
        background: repeating-linear-gradient(rgba(255, 255, 255, 0.16) 0 1px, rgba(0, 0, 0, 0.28) 1px 3px);
        box-shadow: inset -1px 0 0 rgba(255, 255, 255, 0.3);
        z-index: 2;
      }
      .elfarm-ds-art {
        position: absolute;
        inset: auto 0 0 7%;
        padding: 16px 14px 12px;
        margin: 0;
        background: linear-gradient(transparent, rgba(7, 13, 15, 0.92));
        z-index: 2;
      }
      .elfarm-ds-art span {
        display: block;
        font-family: "Jost", sans-serif;
        font-size: 9.5px;
        font-weight: 700;
        letter-spacing: 0.12em;
        text-transform: uppercase;
        color: #efc9a4;
        margin-bottom: 3px;
      }
      .elfarm-ds-art b {
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        font-family: "Cormorant Garamond", serif;
        font-size: 16px;
        font-weight: 700;
        line-height: 1.15;
        color: #ffffff;
      }
      .elfarm-ds-spine {
        position: absolute;
        inset: 0 auto 0 calc(var(--S) / -2);
        width: var(--S);
        transform: rotateY(-90deg);
        background: linear-gradient(90deg, #1b282b, #283a3e 50%, #162225);
        box-shadow: inset 0 0 0 1px rgba(239, 201, 164, 0.22);
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        padding: 10px 0;
        color: #f5f5f5;
      }
      .elfarm-ds-spine b {
        writing-mode: vertical-rl;
        font-size: 10px;
        font-weight: 700;
        letter-spacing: 0.05em;
        white-space: nowrap;
        overflow: hidden;
        max-height: 78%;
        color: #efc9a4;
      }
      .elfarm-ds-spine span {
        writing-mode: vertical-rl;
        font-size: 9px;
        opacity: 0.65;
      }
      .elfarm-ds-edge {
        position: absolute;
        inset: 0 auto 0 calc(var(--W) - var(--S) / 2);
        width: var(--S);
        transform: rotateY(90deg);
        background: rgba(239, 201, 164, 0.35);
      }
      .elfarm-ds-lid {
        position: absolute;
        inset: calc(var(--S) / -2) 0 auto;
        height: var(--S);
        transform: rotateX(90deg);
        background: rgba(239, 201, 164, 0.4);
      }
      .elfarm-ds-base {
        position: absolute;
        inset: auto 0 calc(var(--S) / -2);
        height: var(--S);
        transform: rotateX(-90deg);
        background: rgba(0, 0, 0, 0.55);
      }
      .elfarm-ds-back {
        position: absolute;
        inset: 0;
        border-radius: 6px;
        background: #10191c;
        box-shadow: inset 0 0 0 1px rgba(239, 201, 164, 0.16);
        transform: translateZ(calc(var(--S) / -2)) rotateY(180deg);
      }
      /* Glossy floor reflection */
      .elfarm-ds-mirror {
        position: absolute;
        top: calc(var(--H) * 0.93);
        left: 0;
        right: 0;
        height: calc(var(--H) * 0.34);
        overflow: hidden;
        pointer-events: none;
        opacity: 0.36;
        -webkit-mask-image: linear-gradient(#000, rgba(0, 0, 0, 0.28) 38%, transparent 88%);
        mask-image: linear-gradient(#000, rgba(0, 0, 0, 0.28) 38%, transparent 88%);
      }
      .elfarm-ds-mirror::before {
        content: "";
        position: absolute;
        top: 0;
        left: 8%;
        right: 8%;
        height: 1px;
        z-index: 2;
        background: linear-gradient(90deg, transparent, rgba(239, 201, 164, 0.42) 30% 70%, transparent);
      }
      .elfarm-ds-reflect {
        position: relative;
        width: 100%;
        height: calc(var(--H) * 1.15);
        transform-origin: 50% 0%;
        transform: scaleY(-1) translateY(calc(var(--H) * -0.93));
      }
      .elfarm-ds-caption-area {
        position: relative;
        z-index: 4;
        max-width: 740px;
        margin: -6px auto 0;
        text-align: center;
        padding: 0 12px;
      }
      .elfarm-ds-cap-badge {
        display: inline-block;
        padding: 4px 12px;
        border-radius: 999px;
        background: rgba(239, 201, 164, 0.14);
        border: 1px solid rgba(239, 201, 164, 0.35);
        color: #efc9a4;
        font-family: "Jost", sans-serif;
        font-size: 11px;
        font-weight: 700;
        letter-spacing: 0.12em;
        text-transform: uppercase;
        margin-bottom: 8px;
      }
      .elfarm-ds-cap-title {
        margin: 0 0 8px;
        font-family: "Cormorant Garamond", serif;
        font-size: clamp(22px, 3vw, 34px);
        font-weight: 700;
        line-height: 1.15;
        color: #ffffff;
      }
      .elfarm-ds-cap-desc {
        margin: 0 auto 14px;
        font-family: "Jost", sans-serif;
        font-size: 14.5px;
        line-height: 1.55;
        color: rgba(220, 224, 226, 0.86);
      }
      .elfarm-ds-actions {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
        gap: 10px;
      }
      .elfarm-ds-btn {
        padding: 9px 18px;
        border-radius: 999px;
        border: 1px solid rgba(239, 201, 164, 0.35);
        background: rgba(255, 255, 255, 0.06);
        color: #f5f5f5;
        font-family: "Jost", sans-serif;
        font-size: 12.5px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s ease;
      }
      .elfarm-ds-btn:hover {
        background: rgba(239, 201, 164, 0.2);
        border-color: #efc9a4;
      }
      .elfarm-ds-btn.is-primary {
        background: #efc9a4;
        border-color: #efc9a4;
        color: #11191b;
        font-weight: 700;
      }
      .elfarm-ds-btn.is-primary:hover {
        background: #ffffff;
      }

      /* ============================================================================
         PHASE 5: BOOK A TABLE FORM NOTES FIELD & CONFIRMATION BANNER
         ============================================================================ */
      .elfarm-booking-notes-wrap {
        width: 100%;
        margin-top: 14px;
        display: flex;
        flex-direction: column;
        gap: 8px;
      }
      .elfarm-booking-notes-label {
        font-family: "Jost", sans-serif;
        font-size: 15px;
        font-weight: 500;
        color: rgb(245, 245, 245);
      }
      .elfarm-booking-notes-input {
        width: 100%;
        padding: 14px 16px;
        background: rgba(11, 19, 21, 0.75);
        border: 1px solid rgba(239, 201, 164, 0.28);
        color: #ffffff;
        font-family: "Jost", sans-serif;
        font-size: 15px;
        box-sizing: border-box;
        outline: none;
        transition: border-color 0.25s ease;
      }
      .elfarm-booking-notes-input:focus {
        border-color: rgb(239, 201, 164);
      }
      .elfarm-booking-status-banner {
        margin-top: 16px;
        padding: 16px 20px;
        border-radius: 10px;
        background: rgba(27, 67, 50, 0.92);
        border: 1px solid rgb(239, 201, 164);
        color: #ffffff;
        font-family: "Jost", sans-serif;
        font-size: 14.5px;
        line-height: 1.55;
        display: none;
      }
      .elfarm-booking-status-banner.is-visible {
        display: block;
      }

      /* Interactive Sanctuary Mini-Map Section */
      .elfarm-minimap-wrap {
        width: 100%;
        max-width: 1264px;
        margin: 56px auto 0 auto;
        padding: 0 20px;
        box-sizing: border-box;
      }
      .elfarm-minimap-card {
        background: rgb(11, 19, 21);
        border: 1px solid rgba(239, 201, 164, 0.24);
        display: grid;
        grid-template-columns: 1fr 1.25fr;
        gap: 0;
        overflow: hidden;
        box-shadow: 0 24px 60px rgba(0, 0, 0, 0.45);
      }
      @media (max-width: 900px) {
        .elfarm-minimap-card {
          grid-template-columns: 1fr;
        }
      }
      .elfarm-minimap-info {
        padding: 44px 40px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 20px;
        border-right: 1px solid rgba(239, 201, 164, 0.16);
      }
      .elfarm-minimap-eyebrow {
        font-family: "Jost", sans-serif;
        font-size: 13px;
        font-weight: 600;
        letter-spacing: 0.16em;
        text-transform: uppercase;
        color: rgb(239, 201, 164);
        display: inline-flex;
        align-items: center;
        gap: 8px;
      }
      .elfarm-minimap-title {
        font-family: "Cormorant Garamond", serif;
        font-size: 38px;
        font-weight: 600;
        line-height: 1.15;
        color: rgb(255, 255, 255);
        margin: 0;
      }
      .elfarm-minimap-desc {
        font-family: "Jost", sans-serif;
        font-size: 15.5px;
        line-height: 1.6;
        color: rgb(200, 201, 203);
        margin: 0;
      }
      .elfarm-minimap-details {
        display: flex;
        flex-direction: column;
        gap: 12px;
        padding: 14px 0;
        border-top: 1px solid rgba(239, 201, 164, 0.14);
        border-bottom: 1px solid rgba(239, 201, 164, 0.14);
      }
      .elfarm-minimap-row {
        display: flex;
        align-items: flex-start;
        gap: 12px;
        font-family: "Jost", sans-serif;
        font-size: 14.5px;
        color: rgb(239, 201, 164);
      }
      .elfarm-minimap-row span {
        color: rgb(215, 216, 218);
      }
      .elfarm-minimap-actions {
        display: flex;
        flex-wrap: wrap;
        gap: 14px;
        margin-top: 4px;
      }
      .elfarm-map-btn-primary {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        padding: 13px 24px;
        background: rgb(239, 201, 164);
        color: rgb(11, 19, 21);
        border: 2px solid rgb(239, 201, 164);
        font-family: "Jost", sans-serif;
        font-size: 13.5px;
        font-weight: 600;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        text-decoration: none;
        transition: all 0.25s ease;
      }
      .elfarm-map-btn-primary:hover {
        background: transparent;
        color: rgb(239, 201, 164);
      }
      .elfarm-map-btn-secondary {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        padding: 13px 22px;
        background: rgb(15, 29, 34);
        color: rgb(239, 201, 164);
        border: 2px solid rgba(239, 201, 164, 0.55);
        font-family: "Jost", sans-serif;
        font-size: 13.5px;
        font-weight: 600;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        text-decoration: none;
        transition: all 0.25s ease;
      }
      .elfarm-map-btn-secondary:hover {
        background: rgb(239, 201, 164);
        color: rgb(11, 19, 21);
      }
      /* Sora-Style Animated Vector Map (dark charcoal roads, Sitio Nipa botanical reserve, pulsing crimson radar pin & floating card) */
      @keyframes elfarmSoraPinPulse {
        0% {
          transform: translate(-50%, -50%) scale(0.55);
          opacity: 0.42;
        }
        65% {
          transform: translate(-50%, -50%) scale(1.75);
          opacity: 0.08;
        }
        100% {
          transform: translate(-50%, -50%) scale(2.05);
          opacity: 0;
        }
      }
      @keyframes elfarmSoraPinHalo {
        0%, 100% {
          transform: translate(-50%, -50%) scale(0.92);
          opacity: 0.24;
        }
        50% {
          transform: translate(-50%, -50%) scale(1.16);
          opacity: 0.36;
        }
      }
      @keyframes elfarmSoraPinFloat {
        0%, 100% {
          transform: translate(-50%, -100%) translateY(0px);
        }
        50% {
          transform: translate(-50%, -100%) translateY(-4px);
        }
      }
      .elfarm-minimap-frame-box {
        position: relative;
        min-height: 410px;
        width: 100%;
        height: 100%;
        background: #040607;
        overflow: hidden;
      }
      .elfarm-sora-map-link {
        position: relative;
        display: block;
        width: 100%;
        height: 100%;
        min-height: 410px;
        text-decoration: none;
        cursor: pointer;
        background: #040607;
      }
      .elfarm-sora-map-svg {
        width: 100%;
        height: 100%;
        min-height: 410px;
        display: block;
      }
      .elfarm-sora-fade-sides {
        position: absolute;
        inset: 0;
        pointer-events: none;
        background: linear-gradient(90deg, rgb(11, 19, 21) 0%, rgba(11, 19, 21, 0) 24%, rgba(11, 19, 21, 0) 76%, rgb(11, 19, 21) 100%);
      }
      .elfarm-sora-fade-edges {
        position: absolute;
        inset: 0;
        pointer-events: none;
        background: linear-gradient(180deg, rgb(11, 19, 21) 0%, rgba(11, 19, 21, 0) 22%, rgba(11, 19, 21, 0) 78%, rgb(11, 19, 21) 100%);
      }
      .elfarm-sora-street-label {
        position: absolute;
        left: 22%;
        bottom: 21%;
        transform: rotate(-37deg);
        transform-origin: left center;
        font-family: "Jost", sans-serif;
        font-size: 11px;
        font-weight: 500;
        letter-spacing: 0.04em;
        color: rgba(255, 255, 255, 0.72);
        pointer-events: none;
        white-space: nowrap;
      }
      .elfarm-sora-water-label {
        position: absolute;
        right: 11%;
        bottom: 11%;
        font-family: "Jost", sans-serif;
        font-size: 11px;
        font-weight: 500;
        letter-spacing: 0.04em;
        color: rgba(215, 232, 244, 0.74);
        pointer-events: none;
        white-space: nowrap;
      }
      .elfarm-sora-pin-glow-wave {
        position: absolute;
        left: 53.5%;
        top: 52.5%;
        width: 84px;
        height: 84px;
        border-radius: 50%;
        background: rgb(244, 22, 28);
        pointer-events: none;
        animation: elfarmSoraPinPulse 2.4s cubic-bezier(0.16, 1, 0.3, 1) infinite;
      }
      .elfarm-sora-pin-glow-core {
        position: absolute;
        left: 53.5%;
        top: 52.5%;
        width: 72px;
        height: 72px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(244, 22, 28, 0.42) 0%, rgba(244, 22, 28, 0.14) 55%, rgba(244, 22, 28, 0) 100%);
        pointer-events: none;
        animation: elfarmSoraPinHalo 2.4s ease-in-out infinite;
      }
      .elfarm-sora-pin-marker {
        position: absolute;
        left: 53.5%;
        top: 52.5%;
        width: 34px;
        height: 44px;
        pointer-events: none;
        filter: drop-shadow(0 6px 14px rgba(244, 22, 28, 0.48));
        animation: elfarmSoraPinFloat 2.4s ease-in-out infinite;
      }
      .elfarm-sora-address-card {
        position: absolute;
        left: 57%;
        top: 23.5%;
        min-width: 215px;
        max-width: 255px;
        background: rgba(2, 4, 5, 0.94);
        border: 1px solid rgba(255, 255, 255, 0.14);
        border-radius: 8px;
        padding: 12px 16px;
        box-shadow: 0 18px 40px rgba(0, 0, 0, 0.72);
        transition: border-color 0.25s ease, transform 0.25s ease;
      }
      .elfarm-sora-map-link:hover .elfarm-sora-address-card {
        border-color: rgba(244, 22, 28, 0.6);
        transform: translateY(-2px);
      }
      .elfarm-sora-address-title {
        font-family: "Jost", sans-serif;
        font-size: 16.5px;
        font-weight: 700;
        color: #ffffff;
        line-height: 1.25;
        margin: 0 0 4px 0;
      }
      .elfarm-sora-address-sub {
        font-family: "Jost", sans-serif;
        font-size: 12.5px;
        font-weight: 400;
        color: rgba(255, 255, 255, 0.82);
        line-height: 1.35;
        margin: 0;
      }
      .elfarm-minimap-badge {
        position: absolute;
        bottom: 14px;
        left: 16px;
        background: rgba(5, 9, 10, 0.88);
        border: 1px solid rgba(239, 201, 164, 0.35);
        border-radius: 6px;
        color: rgb(239, 201, 164);
        padding: 6px 12px;
        font-family: "Jost", sans-serif;
        font-size: 11.5px;
        font-weight: 500;
        letter-spacing: 0.04em;
        pointer-events: none;
        backdrop-filter: blur(8px);
      }
      @media (max-width: 600px) {
        .elfarm-sora-address-card {
          left: auto;
          right: 14px;
          top: 16px;
          min-width: 185px;
        }
      }

      /* ============================================================================
         EDGE-TO-EDGE FULLSCREEN PWA, SMART ZOOM LOCK & DOWNLOAD APP HUB (/download)
         ============================================================================ */
      html, body {
        background-color: #0b1315 !important;
      }
      html.elfarm-zoom-locked,
      html.elfarm-zoom-locked body {
        touch-action: pan-x pan-y !important;
        -webkit-text-size-adjust: 100% !important;
      }
      html.elfarm-desktop-site-zoom,
      html.elfarm-desktop-site-zoom body {
        touch-action: auto !important;
      }
      @media all and (display-mode: standalone) {
        html, body {
          min-height: 100dvh !important;
          background-color: #0b1315 !important;
          padding-left: env(safe-area-inset-left, 0px);
          padding-right: env(safe-area-inset-right, 0px);
        }
        header,
        .framer-2nqvvj-container {
          padding-top: env(safe-area-inset-top, 0px) !important;
        }
        .zeticuz-dev-footer {
          padding-bottom: calc(28px + env(safe-area-inset-bottom, 0px)) !important;
        }
      }

      #elfarm-download-hub {
        position: relative;
        width: 100%;
        min-height: calc(100dvh - 120px);
        padding: clamp(132px, 15vh, 168px) clamp(18px, 4vw, 56px) clamp(56px, 7vh, 84px);
        background:
          radial-gradient(680px 380px at 14% 12%, rgba(239, 201, 164, 0.09), transparent 72%),
          radial-gradient(620px 360px at 86% 24%, rgba(28, 72, 62, 0.22), transparent 74%),
          rgb(11, 19, 21);
        color: rgb(245, 245, 245);
        z-index: 8;
        box-sizing: border-box;
      }
      @media (max-width: 1024px) {
        #elfarm-download-hub {
          padding-top: 104px !important;
        }
      }
      .elfarm-dl-inner {
        max-width: 1180px;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        gap: 34px;
      }
      .elfarm-dl-hero {
        text-align: center;
        max-width: 780px;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 14px;
      }
      .elfarm-dl-eyebrow {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 6px 16px;
        border-radius: 999px;
        border: 1px solid rgba(239, 201, 164, 0.4);
        background: rgba(239, 201, 164, 0.08);
        color: rgb(239, 201, 164);
        font-family: "Jost", sans-serif;
        font-size: 11.5px;
        font-weight: 600;
        letter-spacing: 0.14em;
        text-transform: uppercase;
      }
      .elfarm-dl-title {
        font-family: "Cormorant Garamond", Georgia, serif;
        font-size: clamp(36px, 5vw, 62px);
        font-weight: 500;
        line-height: 1.06;
        letter-spacing: -0.015em;
        margin: 0;
        color: rgb(245, 245, 245);
      }
      .elfarm-dl-title em {
        font-style: italic;
        color: rgb(239, 201, 164);
      }
      .elfarm-dl-sub {
        font-family: "Jost", sans-serif;
        font-size: clamp(14px, 1.35vw, 17px);
        line-height: 1.62;
        color: rgba(245, 245, 245, 0.78);
        margin: 0;
      }
      .elfarm-dl-status-banner {
        display: none;
        align-items: center;
        justify-content: space-between;
        gap: 16px;
        flex-wrap: wrap;
        padding: 16px 22px;
        border-radius: 14px;
        background: linear-gradient(135deg, rgba(239, 201, 164, 0.15), rgba(19, 36, 40, 0.92));
        border: 1px solid rgba(239, 201, 164, 0.55);
        font-family: "Jost", sans-serif;
        font-size: 14.5px;
        color: rgb(245, 245, 245);
      }
      .elfarm-dl-status-banner.is-visible {
        display: flex;
      }
      .elfarm-dl-cards {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 22px;
      }
      @media (max-width: 980px) {
        .elfarm-dl-cards {
          grid-template-columns: 1fr;
        }
      }
      .elfarm-dl-card {
        background: linear-gradient(165deg, rgba(16, 29, 32, 0.96), rgba(9, 16, 18, 0.98));
        border: 1px solid rgba(239, 201, 164, 0.22);
        border-radius: 18px;
        padding: 26px 24px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        gap: 20px;
        box-shadow: 0 22px 48px rgba(0, 0, 0, 0.42);
        transition: border-color 0.28s ease, transform 0.28s ease;
      }
      .elfarm-dl-card:hover {
        border-color: rgba(239, 201, 164, 0.55);
        transform: translateY(-3px);
      }
      .elfarm-dl-card-featured {
        border-color: rgba(239, 201, 164, 0.58);
        background: linear-gradient(165deg, rgba(24, 41, 44, 0.98), rgba(10, 18, 20, 0.99));
      }
      .elfarm-dl-card-badge {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        padding: 5px 12px;
        border-radius: 999px;
        background: rgba(239, 201, 164, 0.12);
        border: 1px solid rgba(239, 201, 164, 0.34);
        color: rgb(239, 201, 164);
        font-family: "Jost", sans-serif;
        font-size: 11px;
        font-weight: 600;
        letter-spacing: 0.09em;
        text-transform: uppercase;
        width: fit-content;
      }
      .elfarm-dl-card h2 {
        font-family: "Cormorant Garamond", Georgia, serif;
        font-size: 28px;
        font-weight: 600;
        color: rgb(245, 245, 245);
        margin: 8px 0 6px 0;
        line-height: 1.15;
      }
      .elfarm-dl-card p {
        font-family: "Jost", sans-serif;
        font-size: 13.5px;
        line-height: 1.56;
        color: rgba(245, 245, 245, 0.74);
        margin: 0;
      }
      /* Crisp Pill Download Button + Scannable QR Code Row (inspired by clean Pill+QR design) */
      .elfarm-dl-action-qr-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 16px;
        padding-top: 14px;
        border-top: 1px solid rgba(239, 201, 164, 0.14);
      }
      .elfarm-dl-pill-col {
        display: flex;
        flex-direction: column;
        gap: 8px;
        flex: 1;
      }
      .elfarm-dl-pill-btn {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        padding: 13px 24px;
        border-radius: 999px;
        border: 1px solid rgba(215, 243, 238, 0.45);
        background: #eaf6f3;
        color: #09594b;
        font-family: "Jost", sans-serif;
        font-size: 15px;
        font-weight: 600;
        letter-spacing: 0.015em;
        text-decoration: none;
        cursor: pointer;
        box-shadow: 0 10px 24px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.85);
        transition: transform 0.22s ease, background-color 0.22s ease, box-shadow 0.22s ease;
        white-space: nowrap;
      }
      .elfarm-dl-pill-btn:hover {
        transform: translateY(-2px);
        background: #ffffff;
        box-shadow: 0 14px 28px rgba(234, 246, 243, 0.22);
      }
      .elfarm-dl-pill-meta {
        font-family: "Jost", sans-serif;
        font-size: 11.5px;
        color: rgba(239, 201, 164, 0.85);
      }
      .elfarm-dl-qr-box {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 5px;
        flex-shrink: 0;
        cursor: pointer;
        border-radius: 12px;
        padding: 4px;
        transition: transform 0.2s ease, background-color 0.2s ease;
        outline: none;
      }
      .elfarm-dl-qr-box:hover,
      .elfarm-dl-qr-box:focus-visible {
        transform: translateY(-2px) scale(1.03);
        background: rgba(239, 201, 164, 0.08);
      }
      .elfarm-dl-qr-box:hover .elfarm-dl-qr-canvas-wrap {
        box-shadow: 0 14px 32px rgba(239, 201, 164, 0.22), 0 0 0 2px rgba(239, 201, 164, 0.6);
      }
      .elfarm-dl-qr-canvas-wrap {
        width: 108px;
        height: 108px;
        padding: 7px;
        background: #ffffff;
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 10px 26px rgba(0, 0, 0, 0.45);
        transition: box-shadow 0.2s ease;
      }
      .elfarm-dl-qr-canvas-wrap canvas,
      .elfarm-dl-qr-canvas-wrap svg {
        width: 94px !important;
        height: 94px !important;
        display: block;
      }
      .elfarm-dl-qr-cap {
        font-family: "Jost", sans-serif;
        font-size: 10px;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        color: rgba(245, 245, 245, 0.62);
      }
      .elfarm-dl-qr-hint {
        font-family: "Jost", sans-serif;
        font-size: 9.5px;
        font-weight: 600;
        letter-spacing: 0.06em;
        text-transform: uppercase;
        color: rgba(239, 201, 164, 0.88);
      }
      .elfarm-dl-steps-grid {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 20px;
      }
      @media (max-width: 780px) {
        .elfarm-dl-steps-grid {
          grid-template-columns: 1fr;
        }
      }
      .elfarm-dl-step-panel {
        background: rgba(14, 24, 27, 0.84);
        border: 1px solid rgba(239, 201, 164, 0.16);
        border-radius: 14px;
        padding: 20px 22px;
      }
      .elfarm-dl-step-panel h3 {
        font-family: "Cormorant Garamond", Georgia, serif;
        font-size: 22px;
        font-weight: 600;
        color: rgb(239, 201, 164);
        margin: 0 0 10px 0;
      }
      .elfarm-dl-step-panel ol {
        margin: 0;
        padding-left: 18px;
        font-family: "Jost", sans-serif;
        font-size: 13.5px;
        line-height: 1.72;
        color: rgba(245, 245, 245, 0.82);
      }

      /* Edge-to-Edge iOS & Cross-Browser PWA Install Modal */
      #elfarm-pwa-modal {
        position: fixed;
        inset: 0;
        z-index: 99999;
        display: none;
        align-items: center;
        justify-content: center;
        padding: max(20px, env(safe-area-inset-top)) 18px max(20px, env(safe-area-inset-bottom));
        background: rgba(4, 8, 9, 0.84);
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
      }
      #elfarm-pwa-modal.is-open {
        display: flex;
      }
      .elfarm-pwa-modal-card {
        width: 100%;
        max-width: 440px;
        background: linear-gradient(165deg, #101e21, #091113);
        border: 1px solid rgba(239, 201, 164, 0.45);
        border-radius: 20px;
        padding: 26px 24px 22px;
        color: #f5f5f5;
        box-shadow: 0 28px 64px rgba(0, 0, 0, 0.72);
        position: relative;
        font-family: "Jost", sans-serif;
      }
      .elfarm-pwa-close {
        position: absolute;
        top: 14px;
        right: 14px;
        width: 34px;
        height: 34px;
        border-radius: 50%;
        border: 1px solid rgba(239, 201, 164, 0.3);
        background: rgba(239, 201, 164, 0.08);
        color: #efc9a4;
        font-size: 18px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .elfarm-pwa-head {
        display: flex;
        align-items: center;
        gap: 14px;
        margin-bottom: 16px;
      }
      .elfarm-pwa-head img {
        width: 56px;
        height: 56px;
        border-radius: 14px;
        border: 1px solid rgba(239, 201, 164, 0.4);
        background: #0b1315;
      }
      .elfarm-pwa-head h3 {
        font-family: "Cormorant Garamond", Georgia, serif;
        font-size: 25px;
        font-weight: 600;
        color: #efc9a4;
        margin: 0 0 2px 0;
      }
      .elfarm-pwa-head p {
        font-size: 12.5px;
        color: rgba(245, 245, 245, 0.72);
        margin: 0;
      }
      .elfarm-pwa-step-list {
        display: flex;
        flex-direction: column;
        gap: 10px;
        margin: 14px 0 18px;
      }
      .elfarm-pwa-step-item {
        display: flex;
        align-items: flex-start;
        gap: 11px;
        padding: 11px 13px;
        border-radius: 12px;
        background: rgba(255, 255, 255, 0.04);
        border: 1px solid rgba(239, 201, 164, 0.14);
        font-size: 13.5px;
        line-height: 1.48;
      }
      .elfarm-pwa-step-num {
        width: 22px;
        height: 22px;
        border-radius: 50%;
        background: #efc9a4;
        color: #0b1315;
        font-weight: 700;
        font-size: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        margin-top: 1px;
      }
      .elfarm-pwa-modal-actions {
        display: flex;
        gap: 10px;
        flex-wrap: wrap;
      }

      /* Floating QR Zoom Modal (/download) */
      #elfarm-qr-zoom-modal {
        position: fixed;
        inset: 0;
        z-index: 100020;
        background: rgba(5, 10, 12, 0.86);
        backdrop-filter: blur(16px);
        -webkit-backdrop-filter: blur(16px);
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 20px;
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.22s ease;
      }
      #elfarm-qr-zoom-modal.is-open {
        opacity: 1;
        pointer-events: auto;
      }
      .elfarm-qr-zoom-card {
        width: 100%;
        max-width: 410px;
        background: linear-gradient(160deg, rgba(16, 30, 34, 0.98) 0%, rgba(11, 19, 21, 0.99) 100%);
        border: 1px solid rgba(239, 201, 164, 0.34);
        border-radius: 24px;
        padding: 26px 24px 24px 24px;
        box-shadow: 0 32px 80px rgba(0, 0, 0, 0.72);
        color: rgb(245, 245, 245);
        font-family: "Jost", sans-serif;
        position: relative;
        text-align: center;
        transform: scale(0.95);
        transition: transform 0.22s cubic-bezier(0.22, 1, 0.36, 1);
      }
      #elfarm-qr-zoom-modal.is-open .elfarm-qr-zoom-card {
        transform: scale(1);
      }
      .elfarm-qr-zoom-close {
        position: absolute;
        top: 14px;
        right: 14px;
        width: 34px;
        height: 34px;
        border-radius: 50%;
        border: 1px solid rgba(239, 201, 164, 0.35);
        background: rgba(255, 255, 255, 0.06);
        color: #f5f5f5;
        font-size: 20px;
        line-height: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
      }
      .elfarm-qr-zoom-close:hover {
        background: rgba(239, 201, 164, 0.2);
      }
      .elfarm-qr-zoom-badge {
        display: inline-block;
        max-width: calc(100% - 52px);
        padding: 5px 12px;
        border-radius: 999px;
        background: rgba(239, 201, 164, 0.14);
        border: 1px solid rgba(239, 201, 164, 0.34);
        color: rgb(239, 201, 164);
        font-size: 10.5px;
        font-weight: 600;
        letter-spacing: 0.08em;
        line-height: 1.35;
        text-transform: uppercase;
        margin: 2px auto 12px auto;
      }
      .elfarm-qr-zoom-title {
        font-family: "Cormorant Garamond", Georgia, serif;
        font-size: 28px;
        font-weight: 600;
        color: #ffffff;
        margin: 0 0 14px 0;
      }
      .elfarm-qr-zoom-stage {
        width: 318px;
        max-width: 100%;
        aspect-ratio: 1 / 1;
        margin: 0 auto 14px auto;
        padding: 14px;
        border-radius: 18px;
        background: #ffffff;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 14px 36px rgba(0, 0, 0, 0.5);
      }
      .elfarm-qr-zoom-stage canvas {
        width: 100% !important;
        height: 100% !important;
        max-width: 290px;
        max-height: 290px;
        display: block;
      }
      .elfarm-qr-zoom-url {
        font-size: 12px;
        color: rgba(245, 245, 245, 0.65);
        word-break: break-all;
        margin: 0 0 16px 0;
      }
      .elfarm-qr-zoom-actions {
        display: flex;
        justify-content: center;
        gap: 10px;
        flex-wrap: wrap;
      }

      /* Original Framer-Matched Animated Hamburger-to-X Toggle & Persistent Mobile Logo (<= 1024px) */
      #elfarm-mobile-brand-logo {
        display: none;
        position: fixed;
        top: calc(env(safe-area-inset-top, 0px) + 14px);
        left: 20px;
        width: 68px;
        height: 48px;
        align-items: center;
        justify-content: flex-start;
        pointer-events: auto !important;
        z-index: 125;
        text-decoration: none;
        -webkit-tap-highlight-color: transparent;
      }
      #elfarm-mobile-brand-logo img {
        width: 100%;
        height: 100%;
        object-fit: contain;
        display: block;
        pointer-events: none;
      }
      #elfarm-mobile-burger-btn {
        display: none;
        position: fixed;
        top: calc(env(safe-area-inset-top, 0px) + 17px);
        right: 18px;
        width: 42px;
        height: 42px;
        padding: 0;
        border: none;
        border-radius: 10px;
        background: transparent;
        cursor: pointer;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 6px;
        pointer-events: auto !important;
        z-index: 125;
        -webkit-tap-highlight-color: transparent;
      }
      @media (max-width: 1024px) {
        #elfarm-mobile-brand-logo,
        #elfarm-mobile-burger-btn {
          display: inline-flex !important;
        }
        header .framer-44446i,
        header [data-framer-name="Brand Logo"] {
          opacity: 0 !important;
          pointer-events: none !important;
        }
      }
      @media (min-width: 768px) and (max-width: 1024px) {
        #elfarm-mobile-brand-logo {
          top: calc(env(safe-area-inset-top, 0px) + 16px);
          left: 28px;
        }
        #elfarm-mobile-burger-btn {
          top: calc(env(safe-area-inset-top, 0px) + 19px);
          right: 26px;
        }
      }
      #elfarm-mobile-burger-btn .elfarm-burger-line {
        display: block;
        width: 24px;
        height: 1.8px;
        border-radius: 2px;
        background: rgb(245, 245, 245);
        transform-origin: center center;
        transition: transform 0.34s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.22s ease, background-color 0.24s ease;
      }
      #elfarm-mobile-burger-btn.is-open .elfarm-burger-line-1 {
        transform: translateY(7.8px) rotate(45deg);
        background: rgb(239, 201, 164);
      }
      #elfarm-mobile-burger-btn.is-open .elfarm-burger-line-2 {
        opacity: 0;
        transform: scaleX(0);
      }
      #elfarm-mobile-burger-btn.is-open .elfarm-burger-line-3 {
        transform: translateY(-7.8px) rotate(-45deg);
        background: rgb(239, 201, 164);
      }
      #elfarm-mobile-nav-backdrop {
        position: fixed;
        inset: 0;
        z-index: 118;
        background: rgba(6, 12, 14, 0.56);
        backdrop-filter: blur(5px);
        -webkit-backdrop-filter: blur(5px);
        opacity: 0;
        visibility: hidden;
        pointer-events: none;
        transition: opacity 0.28s cubic-bezier(0.22, 1, 0.36, 1), visibility 0.28s ease;
      }
      #elfarm-mobile-nav-backdrop.is-open {
        opacity: 1;
        visibility: visible;
        pointer-events: auto;
      }
      #elfarm-mobile-nav-drawer {
        position: fixed;
        top: calc(env(safe-area-inset-top, 0px) + 84px);
        left: 50%;
        width: calc(100vw - 40px);
        max-width: 440px;
        max-height: calc(100dvh - 104px);
        border-radius: 16px;
        z-index: 119;
        background: rgba(16, 26, 29, 0.96);
        border: 1px solid rgba(239, 201, 164, 0.14);
        box-shadow: 0 24px 60px rgba(0, 0, 0, 0.68);
        padding: 16px 24px;
        display: flex;
        flex-direction: column;
        transform-origin: top center;
        transform: translate3d(-50%, -14px, 0) scaleY(0.92);
        opacity: 0;
        visibility: hidden;
        pointer-events: none;
        transition: transform 0.36s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.26s ease, visibility 0.26s ease;
        overflow-y: auto;
        font-family: "Jost", sans-serif;
      }
      #elfarm-mobile-nav-drawer.is-open {
        transform: translate3d(-50%, 0, 0) scaleY(1);
        opacity: 1;
        visibility: visible;
        pointer-events: auto;
      }
      .elfarm-mnav-links {
        display: flex;
        flex-direction: column;
        gap: 4px;
        margin: 0;
      }
      .elfarm-mnav-link {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        padding: 10px 4px;
        border-radius: 8px;
        color: rgb(245, 245, 245);
        text-decoration: none;
        font-family: "Jost", sans-serif;
        font-size: 16px;
        font-weight: 500;
        letter-spacing: 0.01em;
        opacity: 0;
        transform: translate3d(0, -6px, 0);
        transition: opacity 0.28s cubic-bezier(0.22, 1, 0.36, 1), transform 0.32s cubic-bezier(0.22, 1, 0.36, 1), color 0.18s ease;
        transition-delay: calc(0.03s + var(--mnav-idx, 0) * 0.04s);
      }
      #elfarm-mobile-nav-drawer.is-open .elfarm-mnav-link {
        opacity: 1;
        transform: translate3d(0, 0, 0);
      }
      .elfarm-mnav-link:hover,
      .elfarm-mnav-link.is-active {
        color: rgb(239, 201, 164);
      }

      /* ZETICUZ Developer Footer Attribution */
      .zeticuz-dev-footer {
        width: 100%;
        padding: 20px 16px 28px 16px;
        border-top: 1px solid rgba(239, 201, 164, 0.14);
        display: flex;
        justify-content: center;
        align-items: center;
        background: rgb(11, 19, 21);
        position: relative;
        z-index: 20;
      }
      .zeticuz-dev-btn {
        display: inline-flex;
        align-items: center;
        gap: 10px;
        padding: 9px 20px;
        background: rgba(15, 29, 34, 0.9);
        border: 1px solid rgba(239, 201, 164, 0.28);
        color: rgb(239, 201, 164);
        font-family: "Jost", sans-serif;
        font-size: 12.5px;
        font-weight: 500;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        text-decoration: none;
        cursor: pointer;
        transition: all 0.25s ease;
      }
      .zeticuz-dev-btn:hover {
        border-color: rgb(239, 201, 164);
        background: rgba(239, 201, 164, 0.12);
        transform: translateY(-1px);
      }
      .zeticuz-dev-btn img {
        height: 24px;
        width: auto;
        max-width: 120px;
        display: block;
        object-fit: contain;
      }
    \`;
    document.head.appendChild(style);
  }

  // ============================================================================
  // PHASE 3B: FLOATING IMAGE LIGHTBOX MODAL WITH PREV/NEXT, KEYBOARD & SWIPE
  // ============================================================================
  function ensureMenuLightbox() {
    let lb = document.getElementById('elfarm-menu-lightbox');
    if (lb) return lb;

    lb = document.createElement('div');
    lb.id = 'elfarm-menu-lightbox';
    lb.setAttribute('role', 'dialog');
    lb.setAttribute('aria-modal', 'true');
    lb.setAttribute('aria-label', 'Menu Item Studio Lightbox');
    lb.innerHTML = \`
      <div class="elfarm-lb-dialog">
        <button type="button" class="elfarm-lb-close" id="elfarm-lb-close-btn" aria-label="Close modal">✕</button>
        <div class="elfarm-lb-media" id="elfarm-lb-touch-zone">
          <button type="button" class="elfarm-lb-side-arrow prev" id="elfarm-lb-prev-arrow" aria-label="Previous dish">❮</button>
          <img id="elfarm-lb-img" src="" alt="">
          <button type="button" class="elfarm-lb-side-arrow next" id="elfarm-lb-next-arrow" aria-label="Next dish">❯</button>
        </div>
        <div class="elfarm-lb-details">
          <div class="elfarm-lb-counter" id="elfarm-lb-counter">ITEM 01 OF 49</div>
          <div class="elfarm-lb-cat" id="elfarm-lb-cat">Signature Menu</div>
          <h3 class="elfarm-lb-title" id="elfarm-lb-title"></h3>
          <div class="elfarm-lb-price" id="elfarm-lb-price"></div>
          <p class="elfarm-lb-desc" id="elfarm-lb-desc"></p>
          <div class="elfarm-lb-nav-row">
            <button type="button" class="elfarm-lb-btn" id="elfarm-lb-prev-btn">← Previous</button>
            <button type="button" class="elfarm-lb-btn" id="elfarm-lb-next-btn">Next →</button>
          </div>
        </div>
      </div>
    \`;
    document.body.appendChild(lb);

    function closeLightbox() {
      lb.classList.remove('is-open');
    }
    function stepLightbox(delta) {
      if (!currentLightboxList || !currentLightboxList.length) return;
      currentLightboxIndex = (currentLightboxIndex + delta + currentLightboxList.length) % currentLightboxList.length;
      updateLightboxView();
    }

    lb.querySelector('#elfarm-lb-close-btn').addEventListener('click', closeLightbox);
    lb.querySelector('#elfarm-lb-prev-arrow').addEventListener('click', (e) => { e.stopPropagation(); stepLightbox(-1); });
    lb.querySelector('#elfarm-lb-next-arrow').addEventListener('click', (e) => { e.stopPropagation(); stepLightbox(1); });
    lb.querySelector('#elfarm-lb-prev-btn').addEventListener('click', (e) => { e.stopPropagation(); stepLightbox(-1); });
    lb.querySelector('#elfarm-lb-next-btn').addEventListener('click', (e) => { e.stopPropagation(); stepLightbox(1); });
    lb.addEventListener('click', (e) => {
      if (e.target === lb) closeLightbox();
    });

    window.addEventListener('keydown', (e) => {
      if (!lb.classList.contains('is-open')) return;
      if (e.key === 'Escape') closeLightbox();
      else if (e.key === 'ArrowLeft') stepLightbox(-1);
      else if (e.key === 'ArrowRight') stepLightbox(1);
    });

    // Touch swipe support for mobile
    let touchStartX = 0;
    const touchZone = lb.querySelector('#elfarm-lb-touch-zone');
    touchZone.addEventListener('touchstart', (e) => {
      if (e.changedTouches && e.changedTouches[0]) {
        touchStartX = e.changedTouches[0].screenX;
      }
    }, { passive: true });
    touchZone.addEventListener('touchend', (e) => {
      if (e.changedTouches && e.changedTouches[0]) {
        const dx = e.changedTouches[0].screenX - touchStartX;
        if (Math.abs(dx) > 40) {
          stepLightbox(dx < 0 ? 1 : -1);
        }
      }
    }, { passive: true });

    return lb;
  }

  function updateLightboxView() {
    const lb = ensureMenuLightbox();
    const item = currentLightboxList[currentLightboxIndex];
    if (!item) return;
    const imgEl = lb.querySelector('#elfarm-lb-img');
    imgEl.style.opacity = '0.35';
    imgEl.src = item.cleanImage;
    imgEl.alt = item.name;
    setTimeout(() => { imgEl.style.opacity = '1'; }, 60);

    lb.querySelector('#elfarm-lb-counter').textContent =
      'ITEM ' + String(currentLightboxIndex + 1).padStart(2, '0') + ' OF ' + String(currentLightboxList.length).padStart(2, '0');
    lb.querySelector('#elfarm-lb-cat').textContent = item.categoryLabel || 'Signature Menu';
    lb.querySelector('#elfarm-lb-title').textContent = item.name;
    lb.querySelector('#elfarm-lb-price').textContent = item.priceDisplay;
    lb.querySelector('#elfarm-lb-desc').textContent = item.description;
  }

  function openMenuLightbox(itemsList, index) {
    currentLightboxList = itemsList && itemsList.length ? itemsList : MENU_ITEMS;
    currentLightboxIndex = Math.max(0, Math.min(index || 0, currentLightboxList.length - 1));
    const lb = ensureMenuLightbox();
    updateLightboxView();
    lb.classList.add('is-open');
  }

  // Build CodePen PwbGLmL Card for /menu page
  function buildPwbMenuCard(item, idx) {
    const num = String(idx + 1).padStart(2, '0');
    return \`
      <article class="elfarm-pwb-card" data-dish-id="\${item.id}" data-dish-index="\${idx}" tabindex="0" role="button" aria-label="View \${item.name.replace(/"/g, '&quot;')}">
        <div class="elfarm-pwb-img-container">
          <span class="elfarm-pwb-cat-badge">\${item.categoryLabel || 'Menu'}</span>
          <img class="elfarm-pwb-img" decoding="\${idx < 9 ? 'sync' : 'async'}" loading="\${idx < 9 ? 'eager' : 'lazy'}" \${idx < 9 ? 'fetchpriority="high"' : ''} width="900" height="900" src="\${item.cleanImage}" alt="\${item.name.replace(/"/g, '&quot;')}">
          <span class="elfarm-pwb-zoom-pill">🔍 Click to Inspect Dish</span>
        </div>
        <div class="elfarm-pwb-content">
          <div class="elfarm-pwb-number">\${num}</div>
          <div class="elfarm-pwb-header-row">
            <h3 class="elfarm-pwb-title">\${item.name}</h3>
            <span class="elfarm-pwb-price">\${item.priceDisplay}</span>
          </div>
          <p class="elfarm-pwb-desc">\${item.description}</p>
          <div class="elfarm-pwb-mobile-foot">
            <span class="elfarm-pwb-mprice">\${item.priceDisplay}</span>
            <span class="elfarm-pwb-mplus" aria-hidden="true">+ View</span>
          </div>
        </div>
      </article>
    \`;
  }

  // Bind CodePen PwbGLmL 3D pointer tilt & Lightbox click on /menu cards
  function bindPwbCards(container, visibleItems) {
    const cards = container.querySelectorAll('.elfarm-pwb-card');
    cards.forEach((card, idx) => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const angleY = (x - centerX) / 22;
        const angleX = (centerY - y) / 22;
        card.style.transform = \`perspective(900px) translateY(-10px) rotateX(\${angleX.toFixed(2)}deg) rotateY(\${angleY.toFixed(2)}deg)\`;
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
      card.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        openMenuLightbox(visibleItems, idx);
      });
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openMenuLightbox(visibleItems, idx);
        }
      });
    });
  }

  function buildFramerTabHtml(tab, isActive) {
    if (isActive) {
      return \`
        <a class="framer-e3j0df framer-473nq6 elfarm-native-tab" href="#\${tab.id}" data-tab-id="\${tab.id}">
          <div class="framer-3k9lo2-container" style="opacity: 1; transform: none;">
            <div class="framer-BLYYx framer-PqXh3 framer-230u22 framer-v-4pjib7" data-framer-name="Active"
                 style="background-color: var(--token-96b34807-8926-496d-91c3-acabb6da071c, rgb(239, 201, 164)); opacity: 1;">
              <div class="framer-1e08qxj" data-framer-name="Text"
                   style="outline: none; display: flex; flex-direction: column; justify-content: flex-start; flex-shrink: 0; --extracted-r6o4lv: rgb(25, 25, 26); transform: none; opacity: 1;">
                <p class="framer-text framer-styles-preset-14j5oe9" data-styles-preset="y_SU9kuZM"
                   style="--framer-text-color: rgb(25, 25, 26);">\${tab.label}</p>
              </div>
            </div>
          </div>
        </a>
      \`;
    }
    return \`
      <a class="framer-e3j0df framer-473nq6 elfarm-native-tab" href="#\${tab.id}" data-tab-id="\${tab.id}">
        <div class="framer-3k9lo2-container" style="opacity: 1; transform: none;">
          <div class="framer-BLYYx framer-PqXh3 framer-230u22 framer-v-230u22" data-framer-name="Inactive"
               style="background-color: rgb(15, 29, 34); opacity: 1;">
            <div class="framer-1e08qxj" data-framer-name="Text"
                 style="outline: none; display: flex; flex-direction: column; justify-content: flex-start; flex-shrink: 0; --extracted-r6o4lv: rgb(160, 161, 163); transform: none; opacity: 1;">
              <p class="framer-text framer-styles-preset-14j5oe9" data-styles-preset="y_SU9kuZM"
                 style="--framer-text-color: rgb(160, 161, 163);">\${tab.label}</p>
            </div>
          </div>
        </div>
      </a>
    \`;
  }

  // Phase 3A: Build Homepage CodePen xxmpvqe 5-Circle Showcase
  // - Strictly 5 circles visible on desktop (slidesPerView: 5, centeredSlides: true, spaceBetween: 24)
  // - Middle circle much bigger than the rest (scale 1.14), neighbor circles smaller (0.74), outer circles smallest (0.62)
  // - Pauses immediately when pointing mouse at any circle, highlights with 3D lift + background glow orb
  // - Slides immediately (slideNext) as soon as pointer mouse moves away from any circle
  // - Clicking anywhere routes to /menu
  function renderHomeMenuShowcase(homeGrid) {
    homeGrid.style.display = 'none';
    let host = document.getElementById('elfarm-home-menu-showcase-host');
    if (host && host.querySelector('#elfarm-home-menu-showcase')) return;
    if (!host) {
      host = document.createElement('div');
      host.id = 'elfarm-home-menu-showcase-host';
      host.style.width = '100vw';
      host.style.maxWidth = '100vw';
      host.style.marginLeft = 'calc(50% - 50vw)';
      host.style.marginRight = 'calc(50% - 50vw)';
      homeGrid.parentNode.insertBefore(host, homeGrid.nextSibling);
    }

    const shuffledMenuItems = MENU_ITEMS.slice();
    for (let i = shuffledMenuItems.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const tmp = shuffledMenuItems[i];
      shuffledMenuItems[i] = shuffledMenuItems[j];
      shuffledMenuItems[j] = tmp;
    }
    for (let i = 1; i < shuffledMenuItems.length; i++) {
      if (shuffledMenuItems[i].category === shuffledMenuItems[i - 1].category) {
        for (let k = i + 1; k < shuffledMenuItems.length; k++) {
          if (shuffledMenuItems[k].category !== shuffledMenuItems[i - 1].category) {
            const swapItem = shuffledMenuItems[i];
            shuffledMenuItems[i] = shuffledMenuItems[k];
            shuffledMenuItems[k] = swapItem;
            break;
          }
        }
      }
    }

    const slidesHtml = shuffledMenuItems.map(item => \`
      <div class="swiper-slide elfarm-xxmpvqe-slide" data-dish-id="\${item.id}">
        <div class="elfarm-xxmpvqe-glow-orb" aria-hidden="true"></div>
        <div class="elfarm-xxmpvqe-img-ring">
          <img decoding="sync" loading="eager" width="680" height="680" src="\${item.cleanImage}" alt="\${item.name.replace(/"/g, '&quot;')}">
        </div>
        <div class="elfarm-xxmpvqe-caption">
          <div class="elfarm-xxmpvqe-cat">\${item.categoryLabel}</div>
          <h3 class="elfarm-xxmpvqe-title">\${item.name}</h3>
          <div class="elfarm-xxmpvqe-price">\${item.priceDisplay}</div>
          <p class="elfarm-xxmpvqe-desc">\${item.description}</p>
        </div>
      </div>
    \`).join('');

    host.innerHTML = \`
      <div class="elfarm-xxmpvqe-showcase" id="elfarm-home-menu-showcase">
        <div class="elfarm-xxmpvqe-flash"></div>
        <div class="swiper elfarm-xxmpvqe-swiper">
          <div class="swiper-wrapper">
            \${slidesHtml}
          </div>
          <div class="swiper-pagination elfarm-xxmpvqe-SwiperPagination"></div>
        </div>
      </div>
    \`;

    const showcaseEl = host.querySelector('#elfarm-home-menu-showcase');
    if (showcaseEl) {
      showcaseEl.removeAttribute('title');
      // Clicking anywhere on the homepage menu showcase smoothly routes to /menu
      showcaseEl.addEventListener('click', (e) => {
        if (e.target && e.target.classList && e.target.classList.contains('swiper-pagination-bullet')) return;
        e.preventDefault();
        window.location.href = './menu.html';
      });
    }

    function initSwiperInstance() {
      if (typeof window.Swiper !== 'function') {
        setTimeout(initSwiperInstance, 120);
        return;
      }
      const swiperContainer = host.querySelector('.elfarm-xxmpvqe-swiper');
      if (!swiperContainer || swiperContainer.swiper) return;

      const swiperInstance = new window.Swiper(swiperContainer, {
        grabCursor: true,
        centeredSlides: true,
        initialSlide: Math.floor(Math.random() * Math.min(8, shuffledMenuItems.length)),
        slidesPerView: 5,
        spaceBetween: 24,
        loop: true,
        loopAdditionalSlides: 5,
        speed: 650,
        autoplay: {
          delay: 4800,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        },
        breakpoints: {
          0: {
            slidesPerView: 1.45,
            spaceBetween: 14,
            centeredSlides: true,
          },
          640: {
            slidesPerView: 3,
            spaceBetween: 18,
            centeredSlides: true,
          },
          1024: {
            slidesPerView: 5,
            spaceBetween: 24,
            centeredSlides: true,
          }
        },
        pagination: {
          el: host.querySelector('.elfarm-xxmpvqe-SwiperPagination'),
          clickable: true,
          dynamicBullets: true,
        },
        on: {
          slideChangeTransitionStart: function () {
            if (!showcaseEl) return;
            showcaseEl.classList.add('is-flashing');
            setTimeout(() => {
              showcaseEl.classList.remove('is-flashing');
            }, 320);
          }
        }
      });

      // Bind pointer hover stop-sliding + spotlight highlight + background glow light + immediate slide on mouseleave
      if (showcaseEl && showcaseEl.dataset.elfarmHoverBound !== '1') {
        showcaseEl.dataset.elfarmHoverBound = '1';
        let leaveSlideTimer = null;
        let lastImmediateSlideAt = 0;

        const resetSlideVisuals = (s) => {
          s.classList.remove('is-hovered-slide');
          const ring = s.querySelector('.elfarm-xxmpvqe-img-ring');
          const img = ring ? ring.querySelector('img') : null;
          const orb = s.querySelector('.elfarm-xxmpvqe-glow-orb');
          if (ring) ring.style.transform = '';
          if (window.gsap) {
            if (img) window.gsap.to(img, { x: 0, y: 0, scale: 1, duration: 0.35, ease: 'power2.out', overwrite: 'auto', clearProps: 'transform' });
            if (orb) window.gsap.to(orb, { x: 0, y: 0, scale: 0.85, opacity: 0, duration: 0.35, ease: 'power2.out', overwrite: 'auto' });
          }
        };

        const clearSlideHighlights = () => {
          showcaseEl.classList.remove('has-hovered-slide');
          showcaseEl.querySelectorAll('.elfarm-xxmpvqe-slide.is-hovered-slide').forEach(resetSlideVisuals);
        };

        const stopAutoplay = () => {
          try {
            if (swiperInstance && swiperInstance.autoplay) {
              swiperInstance.autoplay.stop();
            }
          } catch (err) {}
        };

        const startAutoplay = () => {
          try {
            if (swiperInstance && swiperInstance.autoplay) {
              swiperInstance.autoplay.start();
            }
          } catch (err) {}
        };

        const triggerImmediateSlideOnLeave = () => {
          const now = Date.now();
          if (now - lastImmediateSlideAt < 280) return;
          lastImmediateSlideAt = now;
          try {
            if (swiperInstance && typeof swiperInstance.slideNext === 'function') {
              swiperInstance.slideNext(620);
            }
          } catch (err) {}
          startAutoplay();
        };

        showcaseEl.querySelectorAll('.elfarm-xxmpvqe-slide').forEach(slide => {
          const ring = slide.querySelector('.elfarm-xxmpvqe-img-ring');
          const targetEl = ring || slide;

          targetEl.addEventListener('mouseenter', () => {
            if (leaveSlideTimer) {
              clearTimeout(leaveSlideTimer);
              leaveSlideTimer = null;
            }
            stopAutoplay();
            showcaseEl.querySelectorAll('.elfarm-xxmpvqe-slide.is-hovered-slide').forEach(other => {
              if (other !== slide) resetSlideVisuals(other);
            });
            showcaseEl.classList.add('has-hovered-slide');
            slide.classList.add('is-hovered-slide');

            const orb = slide.querySelector('.elfarm-xxmpvqe-glow-orb');
            if (window.gsap && orb) {
              window.gsap.to(orb, { scale: 1.18, opacity: 1, duration: 0.42, ease: 'power2.out', overwrite: 'auto' });
            }
          });

          targetEl.addEventListener('mousemove', (e) => {
            if (leaveSlideTimer) {
              clearTimeout(leaveSlideTimer);
              leaveSlideTimer = null;
            }
            stopAutoplay();
            if (!slide.classList.contains('is-hovered-slide')) {
              showcaseEl.classList.add('has-hovered-slide');
              slide.classList.add('is-hovered-slide');
            }
            if (!window.gsap || !ring) return;
            const orb = slide.querySelector('.elfarm-xxmpvqe-glow-orb');
            const img = ring.querySelector('img');
            const rect = ring.getBoundingClientRect();
            const relX = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
            const relY = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
            if (img) {
              window.gsap.to(img, {
                x: relX * 8,
                y: relY * 8,
                scale: 1.08,
                duration: 0.28,
                ease: 'power2.out',
                overwrite: 'auto'
              });
            }
            if (orb) {
              window.gsap.to(orb, {
                x: relX * 18,
                y: relY * 18,
                scale: 1.2,
                opacity: 1,
                duration: 0.3,
                ease: 'power2.out',
                overwrite: 'auto'
              });
            }
          }, { passive: true });

          targetEl.addEventListener('mouseleave', () => {
            resetSlideVisuals(slide);
            if (!showcaseEl.querySelector('.elfarm-xxmpvqe-slide.is-hovered-slide')) {
              showcaseEl.classList.remove('has-hovered-slide');
            }
            if (leaveSlideTimer) clearTimeout(leaveSlideTimer);
            leaveSlideTimer = setTimeout(() => {
              if (!showcaseEl.querySelector('.elfarm-xxmpvqe-slide.is-hovered-slide')) {
                clearSlideHighlights();
                triggerImmediateSlideOnLeave();
              }
            }, 60);
          });
        });

        showcaseEl.addEventListener('mouseleave', () => {
          if (leaveSlideTimer) clearTimeout(leaveSlideTimer);
          clearSlideHighlights();
          triggerImmediateSlideOnLeave();
        });
      }
    }

    initSwiperInstance();
  }

  // ============================================================================
  // HOMEPAGE HERO PALAZZO REVOLVING WALNUT TABLE & PLATED FOODS + FOCAL PLATE SMOKE
  // - Exact Palazzo Framer Template (palazzo.framer.website) Gt & Ut mechanics:
  //   - Round walnut table background (./assets/images/palazzo-walnut-table.png)
  //   - 8 circular ceramic plate slots around the perimeter (step = 45°, front = 180° at 9-o'clock)
  //   - Orbit radius R = 0.3326 * tableSize, base plate diameter P = 0.2189 * tableSize, plateZoom = 1.08
  //   - Focal plate at 180° scales up bigger: scale = 1 + 0.26 * Math.max(0, 1 - diff / 45) -> 1.26x!
  //   - Interactive pointer drag-to-turn, coasting, spring physics (stiffness=120, damping=18), wheel, click-to-advance, and auto-spin
  //   - Dynamic Menu Queue: every time the table spins, loads the next El Farm menu food inside its studio ceramic plate (./assets/menu/plates/plated-<id>.jpg); loops back to dish 1 after all 30 food dishes have been shown.
  //   - Perfectly Timed Subtle Realistic Smoke on the 1.26x Focal Plate:
  //     - Starts smoking IMMEDIATELY when a new menu plate settles at the 180° focal position.
  //     - Subtle, realistic hot steam wisps (not too thick).
  //     - Disappears IMMEDIATELY when that menu turn finishes and the table spins to the next dish.
  // ============================================================================
  let palazzoTableController = null;

  function getActiveHeroTableHost() {
    const heroSection = document.querySelector('[data-framer-name^="Hero Section"], .framer-1myb8ii');
    if (window.innerWidth <= 809 && heroSection) {
      let mobHost = document.getElementById('elfarm-mobile-table-host');
      if (!mobHost) {
        mobHost = document.createElement('div');
        mobHost.id = 'elfarm-mobile-table-host';
        mobHost.className = 'elfarm-mobile-table-host';
        heroSection.appendChild(mobHost);
      } else if (mobHost.parentElement !== heroSection) {
        heroSection.appendChild(mobHost);
      }
      return mobHost;
    }
    const isVisible = (el) => el && getComputedStyle(el).display !== 'none' && getComputedStyle(el).visibility !== 'hidden' && el.getBoundingClientRect().height >= 400;
    const desktopHost = document.querySelector('[data-framer-name="Hero Image Block"]') || document.querySelector('.framer-c688wi');
    if (isVisible(desktopHost) && window.innerWidth >= 810) return desktopHost;
    const phoneHost = document.querySelector('[data-framer-name="Phone Hero Image Block"]');
    if (isVisible(phoneHost)) return phoneHost;
    if (isVisible(desktopHost)) return desktopHost;
    return heroSection || desktopHost || phoneHost;
  }

  function ensureHeroRevolvingTableMounted() {
    if (!palazzoTableController || !palazzoTableController.root) return;
    const targetHost = getActiveHeroTableHost();
    if (targetHost && palazzoTableController.root.parentElement !== targetHost) {
      targetHost.appendChild(palazzoTableController.root);
    }
    if (targetHost && palazzoTableController.smokeOverlay && palazzoTableController.smokeOverlay.parentElement !== targetHost) {
      targetHost.appendChild(palazzoTableController.smokeOverlay);
    }
    const hudHost = document.querySelector('[data-framer-name^="Hero Section"], .framer-1myb8ii') || targetHost;
    if (hudHost && palazzoTableController.hudEl && palazzoTableController.hudEl.parentElement !== hudHost) {
      hudHost.appendChild(palazzoTableController.hudEl);
    }
  }

  function initHeroRevolvingTable() {
    if (palazzoTableController) {
      ensureHeroRevolvingTableMounted();
      return;
    }

    const heroBlock = getActiveHeroTableHost();
    if (!heroBlock) return;

    // Pure AI-generated overhead ceramic plate studio photos (matches Palazzo ceramic plate style)
    const AI_VERIFIED_PLATED_IDS = new Set([
      'tapsilog',
      'sisig-silog',
      'hotsilog',
      'putok-batok-goto',
      'goto-overload',
      'samyang-wrap',
      'tiyula-itum',
      'chicken-kaliya',
      'native-chicken-tinola',
      'karekareng-hito',
      'crispy-fried-hito',
      'kambing-papaitan',
      'adobing',
      'chicken-sisig',
      'bangus-sisig',
      'crispy-pata',
      'sizzling-sisig',
      'dinuguan',
      'crispy-calamares',
      'barkadahan-special',
      'saging-con-ginamus',
      'all-time-favorites-combo',
      'chicken-pancit-miki-combo',
      'pinoy-favorites-bilao',
      'seafood-feast-bilao',
      'chicken-bilao',
      'pancit-miki-bilao'
    ]);
    const platedFoodItems = MENU_ITEMS.filter(item =>
      AI_VERIFIED_PLATED_IDS.has(item.id)
    ).map(item => ({
      id: item.id,
      name: item.name,
      categoryLabel: item.categoryLabel,
      priceDisplay: item.priceDisplay,
      platedSrc: \`./assets/menu/plates/plated-\${item.id}.jpg?v=27\`,
      fallbackSrc: item.cleanImage
    }));

    if (platedFoodItems.length === 0) return;
    const totalDishes = platedFoodItems.length;

    const root = document.createElement('div');
    root.className = 'elfarm-palazzo-table-root';
    root.id = 'elfarm-palazzo-table-root';
    root.setAttribute('data-current-step', '0');
    root.setAttribute('data-current-dish-id', platedFoodItems[0].id);
    root.setAttribute('data-smoke-active', '0');

    // Preload all 30 plated food images in memory so every plate is 100% decoded & instant
    const preloadedImages = platedFoodItems.map(d => {
      const pre = new Image();
      pre.decoding = 'sync';
      pre.src = d.platedSrc;
      return pre;
    });

    let slotsHtml = '';
    for (let t = 0; t < 8; t++) {
      const initDiffSlot = ((((t - 4) % 8) + 8) % 8);
      const initRel = initDiffSlot > 4 ? initDiffSlot - 8 : initDiffSlot;
      const initDishIdx = ((initRel % totalDishes) + totalDishes) % totalDishes;
      const initDish = platedFoodItems[initDishIdx];
      slotsHtml += \`
        <div class="elfarm-palazzo-plate-slot" style="--plate-idx: \${t};" data-slot-index="\${t}" data-dish-id="\${initDish.id}" data-course-index="\${initDishIdx + 1}">
          <div class="elfarm-palazzo-plate-entrance">
            <div class="elfarm-palazzo-plate-circle">
              <img decoding="sync" loading="eager" fetchpriority="high" width="600" height="600" src="\${initDish.platedSrc}" alt="\${initDish.name.replace(/"/g, '&quot;')}">
            </div>
          </div>
        </div>
      \`;
    }

    root.innerHTML = \`
      <div class="elfarm-palazzo-wheel" id="elfarm-palazzo-wheel">
        <img class="elfarm-palazzo-table-bg" id="elfarm-palazzo-table-bg" decoding="sync" loading="eager" fetchpriority="high" src="./assets/images/palazzo-walnut-table.png" alt="El Farm Revolving Walnut Table">
        <div class="elfarm-palazzo-table-sheen" aria-hidden="true"></div>
        <div class="elfarm-palazzo-plates-layer" id="elfarm-palazzo-plates-layer">
          \${slotsHtml}
        </div>
      </div>
    \`;

    const smokeOverlay = document.createElement('div');
    smokeOverlay.className = 'elfarm-palazzo-focal-smoke-wrap';
    smokeOverlay.id = 'elfarm-palazzo-focal-smoke-wrap';
    smokeOverlay.setAttribute('aria-hidden', 'true');
    smokeOverlay.innerHTML = '<canvas class="elfarm-palazzo-focal-smoke-canvas" id="elfarm-palazzo-focal-smoke-canvas" width="420" height="420"></canvas>';

    const hudEl = document.createElement('div');
    hudEl.className = 'elfarm-palazzo-hud';
    hudEl.id = 'elfarm-palazzo-hud';
    hudEl.innerHTML = \`
      <button type="button" class="elfarm-palazzo-drag-hint" id="elfarm-palazzo-drag-hint" aria-label="Turn the table to next menu dish">
        <svg viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
          <path d="M3.2 9a5.8 5.8 0 1 0 1.7-4.1"/>
          <polyline points="2.8 2.5 3.2 5.4 6.1 5.0"/>
        </svg>
        <span>Drag or scroll the table to turn it</span>
      </button>
      <div class="elfarm-palazzo-dish-badge" id="elfarm-palazzo-dish-badge">
        <span class="elfarm-palazzo-dish-step" id="elfarm-palazzo-dish-step">DISH 01 / \${String(totalDishes).padStart(2, '0')}</span>
        <span class="elfarm-palazzo-dish-title" id="elfarm-palazzo-dish-title">\${platedFoodItems[0].name}</span>
        <span class="elfarm-palazzo-dish-price" id="elfarm-palazzo-dish-price">\${platedFoodItems[0].priceDisplay}</span>
      </div>
    \`;

    const hudHost = document.querySelector('[data-framer-name^="Hero Section"], .framer-1myb8ii') || heroBlock;
    heroBlock.appendChild(root);
    heroBlock.appendChild(smokeOverlay);
    hudHost.appendChild(hudEl);

    const wheelEl = root.querySelector('#elfarm-palazzo-wheel');
    const tableBgEl = root.querySelector('#elfarm-palazzo-table-bg');
    const slotEls = Array.from(root.querySelectorAll('.elfarm-palazzo-plate-slot'));
    const slotImgs = slotEls.map(el => el.querySelector('img'));
    const smokeWrapEl = smokeOverlay;
    const smokeCanvas = smokeOverlay.querySelector('#elfarm-palazzo-focal-smoke-canvas');
    const smokeCtx = smokeCanvas ? smokeCanvas.getContext('2d') : null;
    const hudStepEl = hudEl.querySelector('#elfarm-palazzo-dish-step');
    const hudTitleEl = hudEl.querySelector('#elfarm-palazzo-dish-title');
    const hudPriceEl = hudEl.querySelector('#elfarm-palazzo-dish-price');
    const dragHintBtn = hudEl.querySelector('#elfarm-palazzo-drag-hint');

    // Palazzo Gt & Ut physics state
    // Step = 45 deg, Front focal position = 180 deg on Desktop (9-o'clock) and 270 deg on Mobile (12-o'clock)
    const STEP_DEG = 45;
    const FRONT_DEG = 180;
    const SPRING_STIFFNESS = 120;
    const SPRING_DAMPING = 18;
    const COAST_DECAY = 5;

    let theta = 45;           // Initial spin offset for smooth entrance rotate-in to dish 1
    let vel = 0;              // Angular velocity (deg/s)
    let mode = 'snapping';    // Smoothly spring from 45 -> 0 on load/refresh
    let snapTarget = 0;       // Target angle (multiple of 45)
    let isPointerDown = false;
    let hasDragged = false;
    let downX = 0;
    let downY = 0;
    let pointerDownSlot = null;
    let prevPointerAngle = 0;
    let prevPointerTime = 0;
    let lastInteractionTime = performance.now();
    let wheelLockUntil = 0;

    // Auto-spin timing:
    const DISH_HOLD_MS = 3800;
    const SMOKE_FADEOUT_LEAD_MS = 220;
    let nextAutoSpinAt = performance.now() + 4400;

    function normAngle180(deg) {
      return (((deg % 360) + 540) % 360) - 180;
    }

    function snapToGrid(deg) {
      return Math.round(deg / STEP_DEG) * STEP_DEG;
    }

    function startSnapTo(targetDeg) {
      snapTarget = snapToGrid(targetDeg);
      mode = 'snapping';
      // Immediately extinguish smoke as soon as table starts turning to next dish
      setSmokeActive(false);
    }

    function advanceNextCourse() {
      const currentSnap = snapToGrid(mode === 'snapping' ? snapTarget : theta);
      startSnapTo(currentSnap - STEP_DEG);
      nextAutoSpinAt = performance.now() + DISH_HOLD_MS + 900;
    }

    // Track which menu dish is currently assigned to each of the 8 slots
    const slotAssignedDishIdx = [];
    for (let t = 0; t < 8; t++) {
      const initDiffSlot = ((((t - 4) % 8) + 8) % 8);
      const initRel = initDiffSlot > 4 ? initDiffSlot - 8 : initDiffSlot;
      slotAssignedDishIdx[t] = ((initRel % totalDishes) + totalDishes) % totalDishes;
    }
    let activeFocalDishIdx = 0;

    function updateSlotMenuQueue(currentTheta) {
      // stepIdx increases by +1 each time theta decreases by 45°
      const stepIdx = Math.round(-currentTheta / STEP_DEG);

      for (let t = 0; t < 8; t++) {
        // Slot t is at 180° (4 * 45°) when t - stepIdx ≡ 4 (mod 8)
        const diffSlot = ((((t - 4 - stepIdx) % 8) + 8) % 8); // 0..7
        const rel = diffSlot > 4 ? diffSlot - 8 : diffSlot;   // -3..4 (0 = focal 180° spot, +4 = back edge 0°)
        const courseIdx = stepIdx + rel;
        const dishIdx = ((courseIdx % totalDishes) + totalDishes) % totalDishes;

        if (slotAssignedDishIdx[t] !== dishIdx) {
          slotAssignedDishIdx[t] = dishIdx;
          const dish = platedFoodItems[dishIdx];
          const img = slotImgs[t];
          if (img && dish) {
            img.src = dish.platedSrc;
            img.alt = dish.name;
          }
          slotEls[t].setAttribute('data-dish-id', dish ? dish.id : '');
          slotEls[t].setAttribute('data-course-index', String(dishIdx + 1));
        }
      }

      const focalDishIdx = ((stepIdx % totalDishes) + totalDishes) % totalDishes;
      if (focalDishIdx !== activeFocalDishIdx) {
        activeFocalDishIdx = focalDishIdx;
        const focalDish = platedFoodItems[focalDishIdx];
        if (focalDish) {
          root.setAttribute('data-current-step', String(stepIdx));
          root.setAttribute('data-current-dish-id', focalDish.id);
          if (hudStepEl) hudStepEl.textContent = \`DISH \${String(focalDishIdx + 1).padStart(2, '0')} / \${String(totalDishes).padStart(2, '0')}\`;
          if (hudTitleEl) hudTitleEl.textContent = focalDish.name;
          if (hudPriceEl) hudPriceEl.textContent = focalDish.priceDisplay;
        }
      }
    }

    // ==========================================================================
    // SUBTLE REALISTIC RISING SMOKE EFFECT ON THE 1.26x FOCAL PLATE
    // - Starts smoking immediately when the new menu dish settles at the 180° focal spot
    // - Delicate, realistic warm steam wisps (not too thick)
    // - Immediately disappears when that menu dish finishes and the table turns
    // ==========================================================================
    let smokeActive = false;
    const smokeParticles = [];
    const MAX_SMOKE_WISPS = 22;

    function createSubtleSmokeWisp(initialSpread, idx) {
      // Spawn inside the warm food bowl and drift upward as clearly visible, layered rising steam wisps
      const maxAge = 96 + Math.floor(Math.random() * 44);
      const preAge = initialSpread ? Math.floor(((idx || 0) / MAX_SMOKE_WISPS) * (maxAge * 0.78)) : 0;
      const vy = -(1.42 + Math.random() * 0.68);
      const startX = 210 + (Math.random() - 0.5) * 124;
      const baseStartY = 250 + (Math.random() - 0.5) * 52;
      return {
        x: startX + Math.sin(preAge * 0.045) * 7,
        y: baseStartY + vy * preAge,
        vx: (Math.random() - 0.5) * 0.34,
        vy,
        radius: 22 + Math.random() * 14,
        maxRadius: 68 + Math.random() * 28,
        peakAlpha: 0.34 + Math.random() * 0.16, // Rich, clearly visible warm rising steam
        age: preAge,
        maxAge,
        swayFreq: 0.036 + Math.random() * 0.022,
        swayAmp: 0.55 + Math.random() * 0.55,
        phase: Math.random() * Math.PI * 2
      };
    }

    function setSmokeActive(nextState) {
      if (smokeActive === nextState) return;
      smokeActive = nextState;
      root.setAttribute('data-smoke-active', smokeActive ? '1' : '0');
      if (!smokeWrapEl) return;

      if (smokeActive) {
        smokeParticles.length = 0;
        for (let i = 0; i < MAX_SMOKE_WISPS; i++) {
          smokeParticles.push(createSubtleSmokeWisp(true, i));
        }
        smokeWrapEl.classList.add('is-smoking');
      } else {
        smokeWrapEl.classList.remove('is-smoking');
        smokeParticles.length = 0;
        if (smokeCtx) {
          smokeCtx.clearRect(0, 0, 420, 420);
        }
      }
    }

    function renderFocalSmokeFrame() {
      if (!smokeCtx || !smokeActive) return;
      smokeCtx.clearRect(0, 0, 420, 420);
      smokeCtx.globalCompositeOperation = 'screen';

      for (let i = 0; i < smokeParticles.length; i++) {
        const p = smokeParticles[i];
        p.age++;
        if (p.age >= p.maxAge || p.y < 18) {
          Object.assign(p, createSubtleSmokeWisp(false, i));
        }

        const progress = p.age / p.maxAge;
        let alpha = 0;
        if (progress < 0.2) {
          alpha = (progress / 0.2) * p.peakAlpha;
        } else {
          alpha = (1 - (progress - 0.2) / 0.8) * p.peakAlpha;
        }

        const curR = p.radius + (p.maxRadius - p.radius) * progress;
        p.x += p.vx + Math.sin(p.age * p.swayFreq + p.phase) * p.swayAmp;
        p.y += p.vy;

        const topFade = Math.max(0, Math.min(1, (p.y - 18) / 68));
        const bottomFade = Math.max(0, Math.min(1, (315 - p.y) / 52));
        const sideFade = Math.max(0, Math.min(1, (186 - Math.abs(p.x - 210)) / 56));
        const finalAlpha = alpha * topFade * bottomFade * sideFade;
        if (finalAlpha <= 0.004) continue;

        smokeCtx.save();
        smokeCtx.translate(p.x, p.y);
        smokeCtx.rotate(Math.sin(p.age * 0.035 + p.phase) * 0.36);
        smokeCtx.scale(0.64, 1.54);

        const grad = smokeCtx.createRadialGradient(0, 0, curR * 0.04, 0, 0, curR);
        grad.addColorStop(0, \`rgba(255, 255, 255, \${Math.min(0.95, finalAlpha * 1.15).toFixed(3)})\`);
        grad.addColorStop(0.38, \`rgba(248, 240, 228, \${(finalAlpha * 0.68).toFixed(3)})\`);
        grad.addColorStop(0.75, \`rgba(232, 220, 206, \${(finalAlpha * 0.24).toFixed(3)})\`);
        grad.addColorStop(1, 'rgba(255, 255, 255, 0)');

        smokeCtx.fillStyle = grad;
        smokeCtx.beginPath();
        smokeCtx.arc(0, 0, curR, 0, Math.PI * 2);
        smokeCtx.fill();
        smokeCtx.restore();
      }
    }

    // Update DOM positions & scales of the walnut table and 8 plates (1:1 Palazzo Gt & Ut Responsive Formula)
    function renderTableGeometry() {
      const heroRect = heroBlock.getBoundingClientRect();
      const U = heroRect.width || window.innerWidth;
      const W = heroRect.height || window.innerHeight;
      const isMobile = window.innerWidth <= 809;

      let tableSize, orbitRadius, basePlateSize, centerX, centerY;
      if (isMobile) {
        const e = Math.min(U, W * 0.5);
        tableSize = 1.96 * e;
        orbitRadius = 0.3326 * tableSize;
        basePlateSize = 0.2189 * tableSize;
        centerX = U / 2;
        centerY = W - 0.133 * e;
      } else {
        tableSize = Math.min(Math.max(1.40 * W, 760), U * 1.12);
        orbitRadius = 0.3326 * tableSize;
        basePlateSize = 0.2189 * tableSize;
        const textGuardLeft = Math.min(540, U * 0.43);
        centerX = Math.max(U - 0.1745 * W, textGuardLeft + orbitRadius + 0.52 * basePlateSize);
        centerY = 0.54 * W;
      }

      root.style.width = \`\${tableSize.toFixed(1)}px\`;
      root.style.height = \`\${tableSize.toFixed(1)}px\`;
      root.style.left = \`\${(centerX - tableSize / 2).toFixed(1)}px\`;
      root.style.top = \`\${(centerY - tableSize / 2).toFixed(1)}px\`;

      const center = tableSize / 2;
      const mobileAngleOffset = isMobile ? 90 : 0;
      const activeFocalAngle = FRONT_DEG + mobileAngleOffset;

      if (tableBgEl) {
        tableBgEl.style.transform = \`rotate(\${(theta + mobileAngleOffset).toFixed(3)}deg)\`;
      }

      let minFocalDiff = 999;

      for (let t = 0; t < 8; t++) {
        const slotAngle = t * STEP_DEG + theta + mobileAngleOffset;
        const rad = (slotAngle * Math.PI) / 180;
        const cx = center + orbitRadius * Math.cos(rad);
        const cy = center + orbitRadius * Math.sin(rad);

        // Angular distance to the focal spot (180° on Desktop, 270° top-center on Mobile)
        const diff = Math.abs(normAngle180(slotAngle - activeFocalAngle));
        if (diff < minFocalDiff) minFocalDiff = diff;

        // Exact Palazzo focal plate scale-up: grows up to 1.26x as it enters the focal spot!
        const proximity = Math.max(0, 1 - diff / STEP_DEG);
        const scale = 1 + 0.26 * proximity;
        const isFocal = diff < 22.5;

        const el = slotEls[t];
        el.style.width = \`\${basePlateSize.toFixed(1)}px\`;
        el.style.height = \`\${basePlateSize.toFixed(1)}px\`;
        el.style.left = \`\${cx.toFixed(1)}px\`;
        el.style.top = \`\${cy.toFixed(1)}px\`;
        el.style.zIndex = isFocal ? '6' : '2';
        el.style.transform = \`translate(-50%, -50%) scale(\${scale.toFixed(4)})\`;
        el.setAttribute('data-scale', scale.toFixed(3));
        if (diff < 6) {
          el.classList.add('is-focal-plate');
        } else {
          el.classList.remove('is-focal-plate');
        }
      }

      // Position the upright focal smoke overlay directly over the focal plate in heroBlock coordinates
      if (smokeWrapEl) {
        const focalSize = basePlateSize * 1.48;
        const focalX = isMobile ? centerX : (centerX - orbitRadius);
        const focalY = isMobile ? (centerY - orbitRadius) : centerY;
        smokeWrapEl.style.width = \`\${focalSize.toFixed(1)}px\`;
        smokeWrapEl.style.height = \`\${focalSize.toFixed(1)}px\`;
        smokeWrapEl.style.left = \`\${focalX.toFixed(1)}px\`;
        smokeWrapEl.style.top = \`\${focalY.toFixed(1)}px\`;
      }

      return minFocalDiff;
    }

    // Pointer drag, click-plate-to-center, keyboard & mouse-wheel interaction (exact Palazzo Gt behavior)
    function getPointerAngleFromCenter(clientX, clientY) {
      const rect = root.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      return (Math.atan2(clientY - cy, clientX - cx) * 180) / Math.PI;
    }

    let touchPending = false;

    wheelEl.addEventListener('pointerdown', (e) => {
      if (e.button !== 0 && e.pointerType === 'mouse') return;
      isPointerDown = true;
      hasDragged = false;
      downX = e.clientX;
      downY = e.clientY;
      const clickedSlotEl = e.target && e.target.closest ? e.target.closest('.elfarm-palazzo-plate-slot') : null;
      pointerDownSlot = clickedSlotEl ? parseInt(clickedSlotEl.getAttribute('data-slot-index'), 10) : null;
      vel = 0;
      prevPointerAngle = getPointerAngleFromCenter(e.clientX, e.clientY);
      prevPointerTime = performance.now();
      lastInteractionTime = prevPointerTime;
      nextAutoSpinAt = prevPointerTime + DISH_HOLD_MS + 3200;

      if (e.pointerType === 'touch') {
        // Wait for initial touch gesture direction so vertical scrolling on mobile is never hijacked
        touchPending = true;
        mode = 'holding';
      } else {
        touchPending = false;
        mode = 'dragging';
        try { wheelEl.setPointerCapture(e.pointerId); } catch (err) {}
      }
    });

    wheelEl.addEventListener('pointermove', (e) => {
      if (!isPointerDown) return;
      if (touchPending) {
        const dx = Math.abs(e.clientX - downX);
        const dy = Math.abs(e.clientY - downY);
        if (dx < 6 && dy < 6) return;
        if (dy > dx * 1.1) {
          // Vertical swipe -> abort wheel capture immediately so page scrolls naturally
          isPointerDown = false;
          touchPending = false;
          mode = 'holding';
          return;
        }
        touchPending = false;
        mode = 'dragging';
        prevPointerAngle = getPointerAngleFromCenter(e.clientX, e.clientY);
        prevPointerTime = performance.now();
        try { wheelEl.setPointerCapture(e.pointerId); } catch (err) {}
      }
      if (mode !== 'dragging') return;
      const now = performance.now();
      const curAngle = getPointerAngleFromCenter(e.clientX, e.clientY);
      const delta = normAngle180(curAngle - prevPointerAngle);
      if (Math.hypot(e.clientX - downX, e.clientY - downY) > 6) {
        hasDragged = true;
        setSmokeActive(false);
      }
      theta += delta;
      const dt = Math.max(0.008, (now - prevPointerTime) / 1000);
      if (dt < 0.25) {
        const instVel = delta / dt;
        vel = 0.4 * instVel + 0.6 * vel;
      }
      prevPointerAngle = curAngle;
      prevPointerTime = now;
      lastInteractionTime = now;
      nextAutoSpinAt = now + DISH_HOLD_MS + 3200;
    });

    function onPointerEnd(e) {
      if (!isPointerDown) return;
      isPointerDown = false;
      touchPending = false;
      try { wheelEl.releasePointerCapture(e.pointerId); } catch (err) {}
      if (e.type === 'pointercancel') {
        mode = 'holding';
        return;
      }
      const now = performance.now();
      lastInteractionTime = now;
      nextAutoSpinAt = now + DISH_HOLD_MS + 2200;

      if (!hasDragged) {
        if (pointerDownSlot !== null && !Number.isNaN(pointerDownSlot)) {
          const isMobile = window.innerWidth <= 809;
          const mobileAngleOffset = isMobile ? 90 : 0;
          const activeFocalAngle = FRONT_DEG + mobileAngleOffset;
          const curSlotAngle = pointerDownSlot * STEP_DEG + theta + mobileAngleOffset;
          const deltaToFocal = normAngle180(activeFocalAngle - curSlotAngle);
          if (Math.abs(deltaToFocal) > 12) {
            startSnapTo(snapToGrid(theta + deltaToFocal));
            return;
          }
        }
        advanceNextCourse();
        return;
      }

      vel = Math.max(-900, Math.min(900, vel));
      if (Math.abs(vel) > 25) {
        mode = 'coasting';
      } else {
        startSnapTo(theta);
      }
    }

    wheelEl.addEventListener('pointerup', onPointerEnd);
    wheelEl.addEventListener('pointercancel', onPointerEnd);

    // Horizontal trackpad/wheel over the table spins it smoothly while leaving vertical page scroll completely free
    wheelEl.addEventListener('wheel', (e) => {
      const horizontal = Math.abs(e.deltaX) > Math.abs(e.deltaY) * 1.4;
      if (!horizontal) return;

      const rect = wheelEl.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dist = Math.hypot(e.clientX - cx, e.clientY - cy);
      if (dist > rect.width * 0.5) return;

      const rawDelta = e.deltaX;
      if (Math.abs(rawDelta) < 4) return;

      e.preventDefault();
      const now = performance.now();
      lastInteractionTime = now;
      nextAutoSpinAt = now + DISH_HOLD_MS + 2800;

      if (now < wheelLockUntil) return;
      wheelLockUntil = now + 280;
      const dir = rawDelta > 0 ? -1 : 1;
      const currentSnap = snapToGrid(mode === 'snapping' ? snapTarget : theta);
      startSnapTo(currentSnap + dir * STEP_DEG);
    }, { passive: false });

    // Subtle Palazzo-style scroll spin when scrolling down past Hero
    let lastScrollY = window.scrollY;
    window.addEventListener('scroll', () => {
      const sy = window.scrollY;
      const dy = sy - lastScrollY;
      lastScrollY = sy;
      if (!isPointerDown && Math.abs(dy) > 0 && sy < window.innerHeight * 0.9) {
        theta -= dy * 0.08;
        nextAutoSpinAt = performance.now() + DISH_HOLD_MS + 1400;
        if (mode === 'idle') {
          startSnapTo(theta);
        }
      }
    }, { passive: true });

    window.addEventListener('keydown', (e) => {
      if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
      if (window.scrollY > window.innerHeight * 0.7) return;
      const now = performance.now();
      if (now < wheelLockUntil) return;
      wheelLockUntil = now + 380;
      nextAutoSpinAt = now + DISH_HOLD_MS + 2400;
      const currentSnap = snapToGrid(mode === 'snapping' ? snapTarget : theta);
      startSnapTo(currentSnap + (e.key === 'ArrowRight' ? -STEP_DEG : STEP_DEG));
    });

    if (dragHintBtn) {
      dragHintBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        advanceNextCourse();
      });
    }

    // Main 60fps physics, dynamic plate assignment & smoke synchronization loop
    let lastFrameTime = performance.now();
    let heroInView = true;
    let tableRafPending = false;
    function scheduleTableFrame() {
      if (!tableRafPending && heroInView && !document.hidden) {
        tableRafPending = true;
        requestAnimationFrame(tickRevolvingTable);
      }
    }
    if ('IntersectionObserver' in window && (heroBlock || root)) {
      const heroObs = new IntersectionObserver((entries) => {
        heroInView = !!(entries[0] && entries[0].isIntersecting);
        if (heroInView) {
          lastFrameTime = performance.now();
          scheduleTableFrame();
        }
      }, { threshold: 0.01 });
      heroObs.observe(heroBlock || root);
    }
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden && heroInView) {
        lastFrameTime = performance.now();
        scheduleTableFrame();
      }
    });
    function tickRevolvingTable(now) {
      tableRafPending = false;
      ensureHeroRevolvingTableMounted();
      const dt = Math.min((now - lastFrameTime) / 1000, 0.05);
      lastFrameTime = now;

      if (mode === 'coasting') {
        theta += vel * dt;
        vel *= Math.exp(-COAST_DECAY * dt);
        if (Math.abs(vel) < 35) {
          startSnapTo(theta);
        }
      } else if (mode === 'snapping') {
        const displacement = theta - snapTarget;
        const accel = -SPRING_STIFFNESS * displacement - SPRING_DAMPING * vel;
        vel += accel * dt;
        theta += vel * dt;
        if (Math.abs(displacement) < 0.12 && Math.abs(vel) < 0.8) {
          theta = snapTarget;
          vel = 0;
          mode = 'idle';
        }
      } else if (mode === 'idle' && !isPointerDown) {
        // Extinguish smoke right as the current dish finishes (SMOKE_FADEOUT_LEAD_MS before table turns)
        if (now >= nextAutoSpinAt - SMOKE_FADEOUT_LEAD_MS && smokeActive) {
          setSmokeActive(false);
        }
        // Automatically spin the table to reveal the next El Farm menu dish
        if (now >= nextAutoSpinAt) {
          advanceNextCourse();
        }
      }

      updateSlotMenuQueue(theta);
      const minFocalDiff = renderTableGeometry();

      // Smoke Timing Rule:
      // - Once a dish settles into the big 1.26x focal spot (minFocalDiff <= 3.5 deg, low velocity, not about to spin away),
      //   turn smoke ON immediately!
      // - As soon as the dish finishes or the table turns, turn smoke OFF immediately!
      const isAboutToAutoSpin = (mode === 'idle' && (now >= nextAutoSpinAt - SMOKE_FADEOUT_LEAD_MS));
      const shouldSmokeNow = (!isPointerDown && mode !== 'dragging' && mode !== 'coasting' && minFocalDiff <= 3.8 && Math.abs(vel) < 12 && !isAboutToAutoSpin);
      setSmokeActive(shouldSmokeNow);

      if (smokeActive) {
        renderFocalSmokeFrame();
      }

      scheduleTableFrame();
    }

    updateSlotMenuQueue(0);
    renderTableGeometry();
    setSmokeActive(true);
    scheduleTableFrame();

    palazzoTableController = {
      root,
      smokeOverlay,
      hudEl,
      advanceNextCourse,
      getState: () => ({
        theta,
        mode,
        smokeActive,
        currentStep: Math.round(-theta / STEP_DEG),
        currentDishId: root.getAttribute('data-current-dish-id'),
        totalDishes
      })
    };
    window.__elfarmPalazzoTable = palazzoTableController;
  }

  function enhanceMenuSection() {
    const menuSection = document.querySelector('[data-framer-name="Menu Section"]');
    if (!menuSection) return;

    menuSection.querySelectorAll('.elfarm-menu-controls').forEach(el => el.remove());

    const homeGrid = menuSection.querySelector('.framer-w91vbs');
    const menuPageGrid = menuSection.querySelector('.framer-scnc0m');
    const origTabRow = menuSection.querySelector('.framer-1bh56fl');

    // CASE 1: HOMEPAGE (/) -> CodePen xxmpvqe 5-Second Auto-Cycling Coverflow Showcase (No Book / View Dish overlays)
    if (homeGrid && !menuPageGrid) {
      renderHomeMenuShowcase(homeGrid);
      return;
    }

    // CASE 2: MENU PAGE (/menu) -> Full 49-Item Inventory + CodePen PwbGLmL 3D Hover Cards + Mobile Grab/Coffee-App 2-Col Search Grid
    if (menuPageGrid) {
      let searchWrap = document.getElementById('elfarm-menu-search-wrap');
      if (!searchWrap && origTabRow && origTabRow.parentNode) {
        searchWrap = document.createElement('div');
        searchWrap.id = 'elfarm-menu-search-wrap';
        searchWrap.innerHTML =
          '<span class="elfarm-menu-search-icon" aria-hidden="true">&#x1F50D;</span>' +
          '<input id="elfarm-menu-search" type="search" autocomplete="off" placeholder="Search dishes, coffee, bilao..." aria-label="Search El Farm menu">' +
          '<button id="elfarm-menu-search-clear" type="button" aria-label="Clear search">&times;</button>';
        origTabRow.parentNode.insertBefore(searchWrap, origTabRow);

        const searchInput = searchWrap.querySelector('#elfarm-menu-search');
        const clearBtn = searchWrap.querySelector('#elfarm-menu-search-clear');
        const onSearchChange = () => {
          menuSearchQuery = (searchInput.value || '').trim().toLowerCase();
          clearBtn.classList.toggle('is-visible', menuSearchQuery.length > 0);
          renderMenuPage(true);
        };
        searchInput.addEventListener('input', onSearchChange);
        clearBtn.addEventListener('click', () => {
          searchInput.value = '';
          onSearchChange();
          searchInput.focus();
        });
      }

      function renderMenuPage(force) {
        const tabObj = MENU_PAGE_TABS.find(t => t.id === activeMenuTab) || MENU_PAGE_TABS[0];
        const q = (typeof menuSearchQuery === 'string') ? menuSearchQuery.trim() : '';
        const baseItems = q ? MENU_ITEMS : tabObj.items;
        const visibleItems = q
          ? baseItems.filter(i =>
              (i.name && i.name.toLowerCase().includes(q)) ||
              (i.categoryLabel && i.categoryLabel.toLowerCase().includes(q)) ||
              (i.description && i.description.toLowerCase().includes(q))
            )
          : baseItems;
        const stateKey = activeMenuTab + '-' + q + '-full-' + visibleItems.length;

        if (origTabRow) {
          origTabRow.style.display = 'flex';
          if (force || origTabRow.getAttribute('data-elfarm-tab') !== activeMenuTab || !origTabRow.querySelector('.elfarm-native-tab')) {
            origTabRow.innerHTML = MENU_PAGE_TABS.map(t => buildFramerTabHtml(t, t.id === activeMenuTab)).join('');
            origTabRow.setAttribute('data-elfarm-tab', activeMenuTab);

            origTabRow.querySelectorAll('.elfarm-native-tab').forEach(tabLink => {
              tabLink.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                const newTabId = tabLink.getAttribute('data-tab-id');
                if (newTabId) {
                  activeMenuTab = newTabId;
                  menuSearchQuery = '';
                  const inp = document.getElementById('elfarm-menu-search');
                  const clr = document.getElementById('elfarm-menu-search-clear');
                  if (inp) inp.value = '';
                  if (clr) clr.classList.remove('is-visible');
                  renderMenuPage(true);
                }
              });
            });
          }
        }

        const currentCards = menuPageGrid.querySelectorAll('.elfarm-pwb-card');
        if (force || menuPageGrid.getAttribute('data-elfarm-state') !== stateKey || currentCards.length !== visibleItems.length) {
          menuPageGrid.classList.add('elfarm-pwb-grid');
          menuPageGrid.innerHTML = visibleItems.length > 0
            ? visibleItems.map((item, idx) => buildPwbMenuCard(item, idx)).join('')
            : '<div class="elfarm-menu-empty">No menu items matched your search. Tap a category tab above to browse all dishes.</div>';
          menuPageGrid.setAttribute('data-elfarm-state', stateKey);
          if (visibleItems.length > 0) bindPwbCards(menuPageGrid, visibleItems);
        }
      }

      renderMenuPage(false);
    }
  }

  // ============================================================================
  // PHASE 5: BOOK A TABLE FORM — EMPTY INPUTS, GOOGLE SHEET SYNC & EMAIL ALERTS
  // ============================================================================
  function enhanceBookingForm() {
    const contactSec = document.querySelector('[data-framer-name="Contact  Section"]');
    if (!contactSec) return;
    const form = contactSec.querySelector('form');
    if (!form) return;

    // Ensure all fields start empty with clean placeholders (never pre-filled)
    if (form.dataset.elfarmFormCleaned !== '1') {
      form.dataset.elfarmFormCleaned = '1';

      const textInputs = form.querySelectorAll('input');
      textInputs.forEach((inp, idx) => {
        inp.value = '';
        inp.defaultValue = '';
        const p = (inp.getAttribute('placeholder') || '').toLowerCase();
        if (p.includes('julia25') || inp.type === 'email') {
          inp.setAttribute('placeholder', 'yourname@email.com');
          inp.setAttribute('name', 'email');
          inp.setAttribute('autocomplete', 'email');
        } else if (p.includes('julia') || idx === 0) {
          inp.setAttribute('placeholder', 'Enter first name');
          inp.setAttribute('name', 'firstName');
          inp.setAttribute('autocomplete', 'given-name');
        } else if (p.includes('william') || idx === 1) {
          inp.setAttribute('placeholder', 'Enter last name');
          inp.setAttribute('name', 'lastName');
          inp.setAttribute('autocomplete', 'family-name');
        } else if (p.includes('012') || inp.type === 'tel') {
          inp.setAttribute('placeholder', '');
          inp.setAttribute('name', 'phone');
          inp.setAttribute('autocomplete', 'tel');
        } else {
          inp.setAttribute('autocomplete', 'off');
        }
      });

      const selects = form.querySelectorAll('select');
      selects.forEach((sel, idx) => {
        if (idx === 0) {
          sel.setAttribute('name', 'time');
          sel.setAttribute('autocomplete', 'off');
          sel.innerHTML = \`
            <option value="" disabled selected>Select preferred time</option>
            <option value="9:00 AM">9:00 AM</option>
            <option value="10:30 AM">10:30 AM</option>
            <option value="12:00 PM">12:00 PM</option>
            <option value="1:30 PM">1:30 PM</option>
            <option value="3:00 PM">3:00 PM</option>
            <option value="5:00 PM">5:00 PM</option>
            <option value="6:30 PM">6:30 PM</option>
            <option value="8:00 PM">8:00 PM</option>
          \`;
          sel.value = '';
        } else if (idx === 1) {
          // Convert Date select into a clean interactive Date input with empty value
          const dateInput = document.createElement('input');
          dateInput.type = 'date';
          dateInput.name = 'date';
          dateInput.setAttribute('autocomplete', 'off');
          dateInput.required = true;
          dateInput.className = sel.className;
          dateInput.placeholder = 'Select reservation date';
          dateInput.value = '';
          dateInput.style.cssText = 'width:100%;padding:12px 14px;background:rgba(11,19,21,0.75);border:1px solid rgba(239,201,164,0.28);color:#fff;font-family:"Jost",sans-serif;font-size:15px;box-sizing:border-box;color-scheme:dark;';
          sel.parentNode.replaceChild(dateInput, sel);
        } else if (idx === 2) {
          sel.setAttribute('name', 'guests');
          sel.setAttribute('autocomplete', 'off');
          sel.innerHTML = \`
            <option value="" disabled selected>Select number of guests</option>
            <option value="1 Guest">1 Guest</option>
            <option value="2 Guests">2 Guests</option>
            <option value="3 - 4 Guests">3 - 4 Guests</option>
            <option value="5 - 6 Guests">5 - 6 Guests</option>
            <option value="7 - 10 Guests">7 - 10 Guests</option>
            <option value="10+ Guests (Salu-Salo / Event)">10+ Guests (Salu-Salo / Event)</option>
          \`;
          sel.value = '';
        }
      });

      // Inject Order / Notes input field and confirmation banner before the submit button
      if (!form.querySelector('#elfarm-booking-notes')) {
        const submitWrap = form.querySelector('button[type="submit"]')?.closest('.framer-173d47l-container, div') || form.lastElementChild;
        const notesDiv = document.createElement('div');
        notesDiv.className = 'elfarm-booking-notes-wrap';
        notesDiv.innerHTML = \`
          <label class="elfarm-booking-notes-label" for="elfarm-booking-notes">Order / Pre-Order Dishes or Pickleball Notes</label>
          <input type="text" id="elfarm-booking-notes" name="notes" autocomplete="off" class="elfarm-booking-notes-input" placeholder="e.g. Pre-order Golden Crispy Pata & Coconut Matcha Cloud, or 7PM Pickleball Court" value="">
          <div class="elfarm-booking-status-banner" id="elfarm-booking-status-banner" role="status" aria-live="polite"></div>
        \`;
        if (submitWrap && submitWrap.parentNode === form) {
          form.insertBefore(notesDiv, submitWrap);
        } else {
          form.appendChild(notesDiv);
        }
      }

      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        e.stopPropagation();

        const firstName = (form.querySelector('input[name="firstName"]')?.value || form.querySelectorAll('input')[0]?.value || '').trim();
        const lastName = (form.querySelector('input[name="lastName"]')?.value || form.querySelectorAll('input')[1]?.value || '').trim();
        const email = (form.querySelector('input[name="email"]')?.value || form.querySelector('input[type="email"]')?.value || '').trim();
        const phone = (form.querySelector('input[name="phone"]')?.value || form.querySelector('input[type="tel"]')?.value || '').trim();
        const time = (form.querySelector('select[name="time"]')?.value || '').trim();
        const date = (form.querySelector('input[name="date"], select[name="date"]')?.value || '').trim();
        const guests = (form.querySelector('select[name="guests"]')?.value || '').trim();
        const notes = (form.querySelector('#elfarm-booking-notes')?.value || '').trim();

        const banner = form.querySelector('#elfarm-booking-status-banner');
        const submitBtnText = form.querySelector('button[type="submit"] p');
        const origBtnLabel = submitBtnText ? submitBtnText.textContent : 'Book a Table';
        if (submitBtnText) submitBtnText.textContent = 'Submitting Reservation...';

        try {
          const res = await fetch('/api/bookings', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              firstName,
              lastName,
              name: (firstName + ' ' + lastName).trim(),
              email,
              phone,
              date: date || new Date().toISOString().slice(0, 10),
              time: time || '6:30 PM',
              guests: guests || '2 Guests',
              notes
            })
          });
          const data = await res.json();
          if (banner) {
            const escHtml = (v) => String(v || '')
              .replace(/&/g, '&amp;')
              .replace(/</g, '&lt;')
              .replace(/>/g, '&gt;')
              .replace(/"/g, '&quot;');
            const safeGuest = escHtml((firstName + ' ' + lastName).trim() || 'Guest');
            const safeGuests = escHtml(guests || '2 Guests');
            const safeDate = escHtml(date || 'Today');
            const safeTime = escHtml(time || '6:30 PM');
            banner.classList.add('is-visible');
            banner.innerHTML =
              '<strong>Reservation Confirmed for ' + safeGuest + '.</strong><br>' +
              'Your booking for <strong>' + safeGuests + '</strong> on <strong>' + safeDate + '</strong> at <strong>' + safeTime + '</strong> has been recorded for our reservations team.';
          }
          form.reset();
        } catch (err) {
          if (banner) {
            banner.classList.add('is-visible');
            banner.textContent = 'Reservation received! For immediate assistance, call 0917 182 9876.';
          }
        } finally {
          if (submitBtnText) submitBtnText.textContent = origBtnLabel;
        }
      }, true);
    }
  }

  // ============================================================================
  // PHASE 6: CUSTOMER FACEBOOK SLIDER — PAUSE ON HOVER, CAPTION/DATE/METRICS OVERLAY
  // ============================================================================
  let fbFeedFetched = false;
  function fetchLiveFacebookFeed() {
    if (fbFeedFetched) return;
    fbFeedFetched = true;
    const isLocalHost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    fetch(isLocalHost ? '/api/facebook-feed' : './assets/data/facebook-posts.json')
      .then(r => r.ok ? r.json() : null)
      .then(data => {
        if (data && Array.isArray(data.posts) && data.posts.length) {
          FB_FEED = data;
          enhanceCustomerFacebookSlider(true);
        }
      })
      .catch(() => {});
  }

  const scurveRuntime = {
    mounted: false,
    rafRunning: false,
    wrapEl: null,
    onRemount: null,
    posts: [],
    updateOverlay: null,
    updateTextures: null
  };

  function bind2dFallbackCards(instaSec, forceRefresh) {
    instaSec.querySelectorAll('.framer-1929t28, [data-framer-name="Icon"], svg').forEach(el => {
      el.style.display = 'none';
    });
    const cards = instaSec.querySelectorAll('a');
    const posts = (FB_FEED && Array.isArray(FB_FEED.posts)) ? FB_FEED.posts : [];
    cards.forEach((card, i) => {
      if (!forceRefresh && card.classList.contains('elfarm-fb-card-ready')) return;
      card.classList.add('elfarm-fb-card-ready');
      const img = card.querySelector('img');
      const src = img ? (img.getAttribute('src') || '') : '';
      const slotMatch = src.match(/customer-hd-(\d+)/);
      const slotIndex = slotMatch ? (parseInt(slotMatch[1], 10) - 1) : (i % Math.max(1, posts.length));
      const post = posts[slotIndex] || posts[i % Math.max(1, posts.length)] || {
        caption: 'Thank you for visiting EL FARM CAFÉ & RESTO in Sitio Nipa, Lamitan City!',
        date: 'November 2026',
        likes: 215,
        comments: 31,
        shares: 24,
        permalink: RESTO.facebookUrl
      };
      card.setAttribute('href', post.permalink || RESTO.facebookUrl);
      card.setAttribute('target', '_blank');
      card.setAttribute('rel', 'noopener noreferrer');
      let overlay = card.querySelector('.elfarm-fb-hover-overlay');
      if (!overlay) {
        overlay = document.createElement('div');
        overlay.className = 'elfarm-fb-hover-overlay';
        card.appendChild(overlay);
      }
      overlay.innerHTML =
        '<div class="elfarm-fb-badge-row">' +
          '<span class="elfarm-fb-source-pill">📘 Facebook Moment</span>' +
          '<span class="elfarm-fb-date">' + post.date + '</span>' +
        '</div>' +
        '<p class="elfarm-fb-caption">' + post.caption + '</p>' +
        '<div class="elfarm-fb-stats">' +
          '<span>👍 ' + post.likes + ' Likes</span>' +
          '<span>💬 ' + post.comments + ' Comments</span>' +
          '<span>↗ ' + post.shares + ' Shares</span>' +
        '</div>';
    });
  }

  function enhanceCustomerFacebookSlider(forceRefresh) {
    const instaSec = document.querySelector('[data-framer-name="Instagram Section"]');
    if (!instaSec) return;

    fetchLiveFacebookFeed();

    const posts = (FB_FEED && Array.isArray(FB_FEED.posts) && FB_FEED.posts.length > 0)
      ? FB_FEED.posts
      : [{
          image: './assets/images/customer-hd-1.webp',
          caption: 'Thank you for visiting EL FARM CAFÉ & RESTO in Sitio Nipa, Lamitan City!',
          date: 'November 26, 2026',
          likes: 248,
          comments: 36,
          shares: 29,
          permalink: RESTO.facebookUrl
        }];

    if (scurveRuntime.mounted && scurveRuntime.wrapEl) {
      const curHost = instaSec.querySelector('.framer-1hajl2m-container');
      if (curHost && curHost !== instaSec) curHost.style.setProperty('display', 'none', 'important');
      if (!instaSec.contains(scurveRuntime.wrapEl)) {
        instaSec.appendChild(scurveRuntime.wrapEl);
        if (typeof scurveRuntime.onRemount === 'function') scurveRuntime.onRemount();
      }
      if (forceRefresh && scurveRuntime.updatePosts) {
        scurveRuntime.updatePosts(posts);
      }
      return;
    }

    // Mount Reflective S-Curve WebGL Gallery (ol-ivier CodePen 01a20e5e) matching existing card height
    let wrap = document.getElementById('elfarm-scurve-gallery-wrap');
    if (!wrap) {
      wrap = document.createElement('div');
      wrap.id = 'elfarm-scurve-gallery-wrap';
      wrap.innerHTML =
        '<canvas id="elfarm-scurve-canvas" aria-label="El Farm Customer Moments Gallery"></canvas>' +
        '<button type="button" class="elfarm-scurve-navbtn prev" id="elfarm-scurve-prev" aria-label="Previous customer photo">&#8249;</button>' +
        '<button type="button" class="elfarm-scurve-navbtn next" id="elfarm-scurve-next" aria-label="Next customer photo">&#8250;</button>' +
        '<button type="button" id="elfarm-scurve-close-btn">✕ Close</button>' +
        '<div id="elfarm-scurve-fb-overlay"></div>' +
        '<div class="elfarm-scurve-hintbar">Drag left/right to browse &bull; Point for Facebook Moment &bull; Click to enlarge</div>';
    }
    scurveRuntime.wrapEl = wrap;

    const innerHost = instaSec.querySelector('.framer-1hajl2m-container') || instaSec;
    if (wrap.parentElement !== instaSec) {
      instaSec.appendChild(wrap);
    }

    const canvas = wrap.querySelector('#elfarm-scurve-canvas');
    const fbOverlay = wrap.querySelector('#elfarm-scurve-fb-overlay');
    const closeBtn = wrap.querySelector('#elfarm-scurve-close-btn');
    const prevBtn = wrap.querySelector('#elfarm-scurve-prev');
    const nextBtn = wrap.querySelector('#elfarm-scurve-next');

    const gl = canvas ? canvas.getContext('webgl2', { antialias: true, alpha: true }) : null;
    if (!gl) {
      wrap.remove();
      bind2dFallbackCards(instaSec, forceRefresh);
      return;
    }

    // Hide legacy ticker container smoothly once WebGL2 is confirmed ready
    if (innerHost && innerHost !== instaSec) {
      innerHost.style.display = 'none';
    }

    scurveRuntime.mounted = true;
    scurveRuntime.posts = posts.slice();

    const cardVS = \`#version 300 es
      layout(location = 0) in vec3 aPosition;
      layout(location = 1) in vec2 aTexCoord;
      uniform mat4 uProjection;
      uniform mat4 uView;
      uniform float uArcCenter;
      uniform float uWidth;
      uniform float uHeight;
      uniform float uOffsetY;
      uniform float uAmp;
      uniform float uFreq;
      uniform float uFocusBlend;
      uniform float uFullWidth;
      uniform float uFullHeight;
      out vec2 vTexCoord;
      out vec3 vLocalPos;
      out float vWorldX;
      out float vSlope;
      float arcLengthToX(float targetS) {
        float signS = sign(targetS);
        float absS = abs(targetS);
        float x = 0.0;
        float s = 0.0;
        const int STEPS = 28;
        float dx = absS / float(STEPS);
        for (int i = 0; i < STEPS; i++) {
          float midX = x + dx * 0.5;
          float dzdx = -uAmp * uFreq * cos(uFreq * midX);
          float ds = sqrt(1.0 + dzdx * dzdx) * dx;
          if (s + ds >= absS) {
            x += (absS - s) / sqrt(1.0 + dzdx * dzdx);
            break;
          }
          s += ds;
          x += dx;
        }
        return x * signS;
      }
      void main() {
        vLocalPos = aPosition;
        vTexCoord = aTexCoord;
        float arcPos = uArcCenter + aPosition.x * uWidth;
        float x = arcLengthToX(arcPos);
        float z = -uAmp * sin(uFreq * x);
        vec3 ribbonPos = vec3(x, aPosition.y * uHeight + uOffsetY, z);
        vec3 fullPos = vec3(aPosition.x * uFullWidth, aPosition.y * uFullHeight + uOffsetY, 0.25);
        vec3 finalPos = mix(ribbonPos, fullPos, uFocusBlend);
        vWorldX = mix(x, 0.0, uFocusBlend);
        vSlope = mix(-uAmp * uFreq * cos(uFreq * x), 0.0, uFocusBlend);
        gl_Position = uProjection * uView * vec4(finalPos, 1.0);
      }\`;

    const cardFS = \`#version 300 es
      precision highp float;
      in vec2 vTexCoord;
      in vec3 vLocalPos;
      in float vWorldX;
      in float vSlope;
      uniform sampler2D uTexture;
      uniform float uIsReflection;
      uniform float uOpacity;
      uniform float uAspect;
      uniform float uFocusBlend;
      out vec4 fragColor;
      void main() {
        float edgeFade = 1.0 - smoothstep(4.6, 6.8, abs(vWorldX));
        if (edgeFade <= 0.001 || uOpacity <= 0.001) discard;
        float borderScale = mix(0.012, 0.005, uFocusBlend);
        vec2 borderSize = vec2(borderScale / max(uAspect, 0.5), borderScale);
        vec2 border = smoothstep(vec2(0.0), borderSize, vTexCoord) * smoothstep(vec2(0.0), borderSize, 1.0 - vTexCoord);
        float borderMask = border.x * border.y;
        float normalZ = 1.0 / sqrt(1.0 + vSlope * vSlope);
        float normalX = -vSlope * normalZ;
        float shade = mix(0.86 + 0.14 * clamp(normalZ * 0.9 - normalX * 0.35, 0.0, 1.0), 1.0, uFocusBlend);
        float finalAlpha = uOpacity * edgeFade;
        if (uIsReflection > 0.5) {
          float heightRatio = clamp(vLocalPos.y, 0.0, 1.0);
          vec2 distUV = vTexCoord;
          distUV.x += sin(vLocalPos.y * 42.0) * 0.003 * heightRatio;
          float blurLod = heightRatio * 3.0;
          vec4 texColor = textureLod(uTexture, distUV, blurLod);
          vec3 finalColor = mix(vec3(0.75), texColor.rgb, borderMask) * shade;
          float baseRefl = mix(0.55, 0.65, uFocusBlend);
          float reflectionAlpha = pow(1.0 - heightRatio, 1.85) * baseRefl;
          fragColor = vec4(finalColor * reflectionAlpha, reflectionAlpha * finalAlpha);
        } else {
          vec4 texColor = texture(uTexture, vTexCoord);
          vec3 finalColor = mix(vec3(0.92, 0.80, 0.66), texColor.rgb, borderMask) * shade;
          fragColor = vec4(finalColor, finalAlpha);
        }
      }\`;

    const floorVS = \`#version 300 es
      layout(location = 0) in vec3 aPosition;
      uniform mat4 uProjection;
      uniform mat4 uView;
      out vec3 vWorldPos;
      void main() {
        vWorldPos = aPosition;
        gl_Position = uProjection * uView * vec4(aPosition, 1.0);
      }\`;

    const floorFS = \`#version 300 es
      precision highp float;
      in vec3 vWorldPos;
      out vec4 fragColor;
      void main() {
        float dist = length(vWorldPos.xz * vec2(0.35, 0.7));
        float spotlight = exp(-dist * 0.22) * 0.14;
        float grain = fract(sin(dot(vWorldPos.xz * 40.0, vec2(12.9898, 78.233))) * 43758.5453) * 0.015;
        vec3 floorColor = vec3(0.035, 0.055, 0.062) + vec3(spotlight + grain);
        fragColor = vec4(floorColor, 0.5);
      }\`;

    function compileProg(vsSrc, fsSrc) {
      const vs = gl.createShader(gl.VERTEX_SHADER);
      gl.shaderSource(vs, vsSrc);
      gl.compileShader(vs);
      const fs = gl.createShader(gl.FRAGMENT_SHADER);
      gl.shaderSource(fs, fsSrc);
      gl.compileShader(fs);
      const p = gl.createProgram();
      gl.attachShader(p, vs);
      gl.attachShader(p, fs);
      gl.linkProgram(p);
      return p;
    }

    const cardProgram = compileProg(cardVS, cardFS);
    const floorProgram = compileProg(floorVS, floorFS);

    const cardVAO = gl.createVertexArray();
    gl.bindVertexArray(cardVAO);
    const SEGMENTS = 36;
    const verts = [];
    for (let i = 0; i <= SEGMENTS; i++) {
      const u = i / SEGMENTS;
      const x = u - 0.5;
      verts.push(x, 0.0, 0.0, u, 1.0);
      verts.push(x, 1.0, 0.0, u, 0.0);
    }
    const cardVBO = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cardVBO);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(verts), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 20, 0);
    gl.enableVertexAttribArray(1);
    gl.vertexAttribPointer(1, 2, gl.FLOAT, false, 20, 12);
    const vertexCount = (SEGMENTS + 1) * 2;

    const floorVAO = gl.createVertexArray();
    gl.bindVertexArray(floorVAO);
    const floorVBO = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, floorVBO);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-50, 0, -50, 50, 0, -50, -50, 0, 50, 50, 0, 50]), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 12, 0);

    let items = scurveRuntime.posts.map((post, idx) => ({
      post,
      aspect: 0.78,
      tex: null,
      focusBlend: 0,
      idx
    }));

    function buildTextures() {
      items.forEach((item) => {
        const tex = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, tex);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([20, 28, 30, 255]));
        const im = new Image();
        im.crossOrigin = 'anonymous';
        im.src = item.post.image || './assets/images/customer-hd-1.webp';
        im.onload = () => {
          if (im.naturalWidth && im.naturalHeight) {
            item.aspect = Math.max(0.68, Math.min(1.45, im.naturalWidth / im.naturalHeight));
          }
          gl.bindTexture(gl.TEXTURE_2D, tex);
          gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, im);
          gl.generateMipmap(gl.TEXTURE_2D);
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        };
        item.tex = tex;
      });
    }
    buildTextures();

    scurveRuntime.updatePosts = (nextPosts) => {
      scurveRuntime.posts = nextPosts.slice();
      items = scurveRuntime.posts.map((post, idx) => ({
        post,
        aspect: 0.78,
        tex: null,
        focusBlend: 0,
        idx
      }));
      buildTextures();
    };

    function persp(fov, aspect, near, far) {
      const f = 1.0 / Math.tan(fov / 2);
      const nf = 1 / (near - far);
      return new Float32Array([f / aspect, 0, 0, 0, 0, f, 0, 0, 0, 0, (far + near) * nf, -1, 0, 0, 2 * far * near * nf, 0]);
    }

    function lookAtMat(eye, center, up) {
      let z0 = eye[0] - center[0], z1 = eye[1] - center[1], z2 = eye[2] - center[2];
      let len = 1 / Math.hypot(z0, z1, z2);
      z0 *= len; z1 *= len; z2 *= len;
      let x0 = up[1] * z2 - up[2] * z1, x1 = up[2] * z0 - up[0] * z2, x2 = up[0] * z1 - up[1] * z0;
      len = Math.hypot(x0, x1, x2);
      if (len) { len = 1 / len; x0 *= len; x1 *= len; x2 *= len; }
      const y0 = z1 * x2 - z2 * x1, y1 = z2 * x0 - z0 * x2, y2 = z0 * x1 - z1 * x0;
      return new Float32Array([x0, y0, z0, 0, x1, y1, z1, 0, x2, y2, z2, 0,
        -(x0 * eye[0] + x1 * eye[1] + x2 * eye[2]),
        -(y0 * eye[0] + y1 * eye[1] + y2 * eye[2]),
        -(z0 * eye[0] + z1 * eye[1] + z2 * eye[2]), 1]);
    }

    function projScreen(pt, viewM, projM, wCss, hCss) {
      const vx = viewM[0] * pt[0] + viewM[4] * pt[1] + viewM[8] * pt[2] + viewM[12];
      const vy = viewM[1] * pt[0] + viewM[5] * pt[1] + viewM[9] * pt[2] + viewM[13];
      const vz = viewM[2] * pt[0] + viewM[6] * pt[1] + viewM[10] * pt[2] + viewM[14];
      const vw = viewM[3] * pt[0] + viewM[7] * pt[1] + viewM[11] * pt[2] + viewM[15];
      const cx = projM[0] * vx + projM[4] * vy + projM[8] * vz + projM[12] * vw;
      const cy = projM[1] * vx + projM[5] * vy + projM[9] * vz + projM[13] * vw;
      const cw = projM[3] * vx + projM[7] * vy + projM[11] * vz + projM[15] * vw;
      return { x: (cx / cw * 0.5 + 0.5) * wCss, y: (-cy / cw * 0.5 + 0.5) * hCss };
    }

    const CARD_HEIGHT = 2.05;
    const GAP = 0.28;
    const S_AMPLITUDE = 1.15;
    const S_FREQUENCY = 0.65;

    function getRibbonLayout() {
      let cursor = 0;
      const centers = [];
      for (let i = 0; i < items.length; i++) {
        const width = CARD_HEIGHT * items[i].aspect;
        if (i === 0) { centers.push(0); cursor = width / 2 + GAP; }
        else { centers.push(cursor + width / 2); cursor += width + GAP; }
      }
      const totalLength = cursor + (CARD_HEIGHT * items[0].aspect) / 2;
      return { centers, totalLength };
    }

    function evalXZ(arcS) {
      const signS = Math.sign(arcS), absS = Math.abs(arcS);
      let x = 0, s = 0;
      const steps = 16, dx = absS / steps;
      for (let i = 0; i < steps; i++) {
        const midX = x + dx * 0.5;
        const dzdx = -S_AMPLITUDE * S_FREQUENCY * Math.cos(S_FREQUENCY * midX);
        const ds = Math.sqrt(1 + dzdx * dzdx) * dx;
        if (s + ds >= absS) { x += (absS - s) / Math.sqrt(1 + dzdx * dzdx); break; }
        s += ds; x += dx;
      }
      x *= signS;
      return { x, z: -S_AMPLITUDE * Math.sin(S_FREQUENCY * x) };
    }

    let targetIndex = 0;
    let currentIndex = 0;
    let focusedIndex = null;
    let hoveredIndex = null;
    let globalFocusBlend = 0;
    let latestBounds = [];
    let isDragging = false;
    let lastX = 0;
    let dragDist = 0;
    let vel = 0;
    let mouseX = 0, mouseY = 0;
    let pointerInWrap = false;
    let lastRenderedOvIdx = -1;
    let lastRenderedOvFocus = false;

    function renderFbOverlay(idx, box, isFocused) {
      if (idx === null || !box || !items[idx]) {
        fbOverlay.classList.remove('is-visible', 'is-focused');
        lastRenderedOvIdx = -1;
        return;
      }
      const post = items[idx].post;
      if (lastRenderedOvIdx !== idx || lastRenderedOvFocus !== isFocused) {
        lastRenderedOvIdx = idx;
        lastRenderedOvFocus = isFocused;
        fbOverlay.innerHTML =
          '<div class="elfarm-fb-badge-row">' +
            '<span class="elfarm-fb-source-pill">📘 Facebook Moment</span>' +
            '<span class="elfarm-fb-date">' + post.date + '</span>' +
          '</div>' +
          '<p class="elfarm-fb-caption">' + post.caption + '</p>' +
          '<div class="elfarm-fb-stats" style="justify-content:space-between;flex-wrap:wrap;">' +
            '<div style="display:flex;gap:12px;">' +
              '<span>👍 ' + post.likes + '</span>' +
              '<span>💬 ' + post.comments + '</span>' +
              '<span>↗ ' + post.shares + '</span>' +
            '</div>' +
            (isFocused ? '<a href="' + (post.permalink || RESTO.facebookUrl) + '" target="_blank" rel="noopener noreferrer" style="color:#efc9a4;text-decoration:underline;pointer-events:auto;">View Post ↗</a>' : '') +
          '</div>';
      }
      const wCss = wrap.clientWidth || 1200;
      const hCss = wrap.clientHeight || 550;
      const cardW = Math.max(250, Math.min(360, box.maxX - box.minX));
      const clampedLeft = Math.max(10, Math.min(wCss - cardW - 10, box.minX + ((box.maxX - box.minX) - cardW) * 0.5));
      const ovH = fbOverlay.offsetHeight || 156;
      const clampedTop = Math.max(12, Math.min(hCss - ovH - 12, box.maxY - ovH - 10));
      fbOverlay.style.width = cardW + 'px';
      fbOverlay.style.left = clampedLeft + 'px';
      fbOverlay.style.top = clampedTop + 'px';
      fbOverlay.classList.add('is-visible');
      fbOverlay.classList.toggle('is-focused', !!isFocused);
    }

    function pickCardAt(clientX, clientY) {
      const rect = wrap.getBoundingClientRect();
      const lx = clientX - rect.left;
      const ly = clientY - rect.top;
      const sorted = latestBounds.slice().sort((a, b) => b.depth - a.depth);
      for (let i = 0; i < sorted.length; i++) {
        const b = sorted[i];
        if (lx >= b.minX && lx <= b.maxX && ly >= b.minY && ly <= b.maxY) {
          return b.index;
        }
      }
      return null;
    }

    function setFocus(idx) {
      focusedIndex = idx;
      closeBtn.classList.toggle('is-visible', focusedIndex !== null);
      canvas.style.cursor = focusedIndex !== null ? 'zoom-out' : 'grab';
    }

    closeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      setFocus(null);
    });
    prevBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (focusedIndex !== null) setFocus((focusedIndex - 1 + items.length) % items.length);
      else targetIndex = Math.round(targetIndex) - 1;
    });
    nextBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (focusedIndex !== null) setFocus((focusedIndex + 1) % items.length);
      else targetIndex = Math.round(targetIndex) + 1;
    });

    canvas.addEventListener('mousedown', (e) => {
      isDragging = true;
      lastX = e.clientX;
      dragDist = 0;
      vel = 0;
    });
    wrap.addEventListener('mousemove', (e) => {
      pointerInWrap = true;
      const rect = wrap.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / Math.max(1, rect.width) - 0.5) * 2;
      mouseY = ((e.clientY - rect.top) / Math.max(1, rect.height) - 0.5) * 2;
      if (isDragging && focusedIndex === null) {
        const dx = e.clientX - lastX;
        dragDist += Math.abs(dx);
        lastX = e.clientX;
        const move = -dx * (2.6 / Math.min(rect.width, 1000));
        targetIndex += move;
        vel = move;
      } else if (!isDragging && focusedIndex === null) {
        hoveredIndex = pickCardAt(e.clientX, e.clientY);
      }
    });
    wrap.addEventListener('mouseleave', () => {
      pointerInWrap = false;
      hoveredIndex = null;
    });
    window.addEventListener('mouseup', (e) => {
      if (!isDragging) return;
      isDragging = false;
      if (dragDist < 6) {
        if (focusedIndex !== null) {
          if (!e.target.closest('#elfarm-scurve-fb-overlay a')) setFocus(null);
        } else {
          const hit = pickCardAt(e.clientX, e.clientY);
          if (hit !== null) setFocus(hit);
        }
      } else if (focusedIndex === null) {
        targetIndex += vel * 4.5;
      }
    });

    canvas.addEventListener('touchstart', (e) => {
      if (e.touches.length > 0) {
        isDragging = true;
        pointerInWrap = true;
        lastX = e.touches[0].clientX;
        dragDist = 0;
        vel = 0;
      }
    }, { passive: true });
    canvas.addEventListener('touchmove', (e) => {
      if (!isDragging || focusedIndex !== null || !e.touches.length) return;
      const cx = e.touches[0].clientX;
      const dx = cx - lastX;
      dragDist += Math.abs(dx);
      lastX = cx;
      const move = -dx * (2.6 / Math.min(wrap.clientWidth || 400, 900));
      targetIndex += move;
      vel = move;
    }, { passive: true });
    canvas.addEventListener('touchend', (e) => {
      if (!isDragging) return;
      isDragging = false;
      pointerInWrap = false;
      const t = e.changedTouches[0];
      if (dragDist < 8 && t) {
        if (focusedIndex !== null) setFocus(null);
        else {
          const hit = pickCardAt(t.clientX, t.clientY);
          if (hit !== null) setFocus(hit);
        }
      } else if (focusedIndex === null) {
        targetIndex += vel * 4;
      }
    });

    let responsiveCamZ = 4.9;
    function resizeCanvas() {
      const wCss = Math.max(300, wrap.clientWidth || window.innerWidth);
      const hCss = Math.max(300, wrap.clientHeight || 550);
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(wCss * dpr);
      canvas.height = Math.round(hCss * dpr);
      gl.viewport(0, 0, canvas.width, canvas.height);
      const asp = wCss / hCss;
      responsiveCamZ = asp < 1.2 ? 6.4 : 4.75;
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    function renderFrame() {
      if (!document.body.contains(wrap)) {
        scurveRuntime.rafRunning = false;
        return;
      }

      // Gentle continuous auto-slide matching original speed; pauses on hover, drag, or focus
      if (!isDragging && focusedIndex === null && hoveredIndex === null && !pointerInWrap) {
        targetIndex += 0.0022;
      }

      const ease = isDragging ? 0.24 : 0.085;
      currentIndex += (targetIndex - currentIndex) * ease;
      const tGlobal = focusedIndex !== null ? 1.0 : 0.0;
      globalFocusBlend += (tGlobal - globalFocusBlend) * 0.1;
      for (let i = 0; i < items.length; i++) {
        items[i].focusBlend += ((focusedIndex === i ? 1.0 : 0.0) - items[i].focusBlend) * 0.1;
      }

      gl.clearColor(0.027, 0.043, 0.051, 1.0);
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
      gl.disable(gl.CULL_FACE);

      const wCss = Math.max(300, wrap.clientWidth || window.innerWidth);
      const hCss = Math.max(300, wrap.clientHeight || 550);
      const screenAspect = canvas.width / canvas.height;
      const fov = Math.PI / 4;
      const projM = persp(fov, screenAspect, 0.1, 100.0);

      const rCamX = mouseX * 0.42;
      const rCamY = 1.68 - mouseY * 0.16;
      const fCamX = mouseX * 0.1;
      const fCamY = 1.38 - mouseY * 0.05;
      const camX = rCamX + (fCamX - rCamX) * globalFocusBlend;
      const camY = rCamY + (fCamY - rCamY) * globalFocusBlend;
      const camZ = responsiveCamZ + (3.65 - responsiveCamZ) * globalFocusBlend;
      const lookY = 0.78 + (1.0 - 0.78) * globalFocusBlend;
      const viewM = lookAtMat([camX, camY, camZ], [0, lookY, 0], [0, 1, 0]);

      const distToPlane = 3.65 - 0.25;
      const visH = 2 * distToPlane * Math.tan(fov / 2);
      const visW = visH * screenAspect;

      const layout = getRibbonLayout();
      const total = items.length;
      const wrapped = ((currentIndex % total) + total) % total;
      const baseIdx = Math.floor(wrapped);
      const frac = wrapped - baseIdx;
      const nextIdx = (baseIdx + 1) % total;
      const startP = layout.centers[baseIdx];
      const endP = baseIdx === total - 1 ? layout.totalLength : layout.centers[nextIdx];
      const camRibX = startP + (endP - startP) * frac;

      latestBounds = [];
      const drawList = items.map((item, i) => {
        let arcCenter = layout.centers[i] - camRibX;
        while (arcCenter > layout.totalLength / 2) arcCenter -= layout.totalLength;
        while (arcCenter < -layout.totalLength / 2) arcCenter += layout.totalLength;
        const width = CARD_HEIGHT * item.aspect;
        const xz = evalXZ(arcCenter);
        const fB = item.focusBlend;
        let fullH = visH * 0.78;
        let fullW = fullH * item.aspect;
        if (fullW > visW * 0.85) { fullW = visW * 0.85; fullH = fullW / item.aspect; }
        const opacity = Math.max(0.0, 1.0 - (globalFocusBlend - fB) * 1.45);
        const lXZ = evalXZ(arcCenter - width * 0.5);
        const rXZ = evalXZ(arcCenter + width * 0.5);
        const pts = [
          projScreen([lXZ.x, 0, lXZ.z], viewM, projM, wCss, hCss),
          projScreen([rXZ.x, 0, rXZ.z], viewM, projM, wCss, hCss),
          projScreen([lXZ.x, CARD_HEIGHT, lXZ.z], viewM, projM, wCss, hCss),
          projScreen([rXZ.x, CARD_HEIGHT, rXZ.z], viewM, projM, wCss, hCss),
          projScreen([xz.x, CARD_HEIGHT * 0.5, xz.z], viewM, projM, wCss, hCss)
        ];
        latestBounds.push({
          index: i,
          depth: fB > 0.001 ? 100 + fB : xz.z,
          minX: Math.min(...pts.map(p => p.x)),
          maxX: Math.max(...pts.map(p => p.x)),
          minY: Math.min(...pts.map(p => p.y)),
          maxY: Math.max(...pts.map(p => p.y))
        });
        return { index: i, arcCenter, width, aspect: item.aspect, opacity, depth: fB > 0.001 ? 100 + fB : xz.z, focusBlend: fB, fullW, fullH };
      });

      drawList.sort((a, b) => a.depth - b.depth);
      gl.enable(gl.BLEND);
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
      gl.disable(gl.DEPTH_TEST);
      gl.depthMask(false);

      const uProj = gl.getUniformLocation(cardProgram, 'uProjection');
      const uView = gl.getUniformLocation(cardProgram, 'uView');
      const uArc = gl.getUniformLocation(cardProgram, 'uArcCenter');
      const uW = gl.getUniformLocation(cardProgram, 'uWidth');
      const uH = gl.getUniformLocation(cardProgram, 'uHeight');
      const uOY = gl.getUniformLocation(cardProgram, 'uOffsetY');
      const uAmp = gl.getUniformLocation(cardProgram, 'uAmp');
      const uFreq = gl.getUniformLocation(cardProgram, 'uFreq');
      const uRefl = gl.getUniformLocation(cardProgram, 'uIsReflection');
      const uOp = gl.getUniformLocation(cardProgram, 'uOpacity');
      const uAsp = gl.getUniformLocation(cardProgram, 'uAspect');
      const uFB = gl.getUniformLocation(cardProgram, 'uFocusBlend');
      const uFW = gl.getUniformLocation(cardProgram, 'uFullWidth');
      const uFH = gl.getUniformLocation(cardProgram, 'uFullHeight');

      // Floor reflections
      gl.useProgram(cardProgram);
      gl.bindVertexArray(cardVAO);
      gl.uniformMatrix4fv(uProj, false, projM);
      gl.uniformMatrix4fv(uView, false, viewM);
      gl.uniform1f(uAmp, S_AMPLITUDE);
      gl.uniform1f(uFreq, S_FREQUENCY);
      gl.uniform1f(uRefl, 1.0);
      gl.uniform1f(uH, -CARD_HEIGHT);
      gl.uniform1f(uOY, -0.002);
      for (const c of drawList) {
        if (c.opacity <= 0.001) continue;
        gl.uniform1f(uArc, c.arcCenter);
        gl.uniform1f(uW, c.width);
        gl.uniform1f(uOp, c.opacity);
        gl.uniform1f(uAsp, c.aspect);
        gl.uniform1f(uFB, c.focusBlend);
        gl.uniform1f(uFW, c.fullW);
        gl.uniform1f(uFH, -c.fullH);
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, items[c.index].tex);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, vertexCount);
      }

      // Reflective floor plane
      gl.useProgram(floorProgram);
      gl.bindVertexArray(floorVAO);
      gl.uniformMatrix4fv(gl.getUniformLocation(floorProgram, 'uProjection'), false, projM);
      gl.uniformMatrix4fv(gl.getUniformLocation(floorProgram, 'uView'), false, viewM);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

      // Upright cards
      gl.useProgram(cardProgram);
      gl.bindVertexArray(cardVAO);
      gl.uniform1f(uRefl, 0.0);
      gl.uniform1f(uH, CARD_HEIGHT);
      gl.uniform1f(uOY, 0.0);
      for (const c of drawList) {
        if (c.opacity <= 0.001) continue;
        gl.uniform1f(uArc, c.arcCenter);
        gl.uniform1f(uW, c.width);
        gl.uniform1f(uOp, c.opacity);
        gl.uniform1f(uAsp, c.aspect);
        gl.uniform1f(uFB, c.focusBlend);
        gl.uniform1f(uFW, c.fullW);
        gl.uniform1f(uFH, c.fullH);
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, items[c.index].tex);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, vertexCount);
      }

      // Sync Facebook Moment glass overlay to hovered or focused card
      const activeOvIdx = focusedIndex !== null ? focusedIndex : (!isDragging ? hoveredIndex : null);
      const ovBox = activeOvIdx !== null ? latestBounds.find(b => b.index === activeOvIdx) : null;
      renderFbOverlay(activeOvIdx, ovBox, focusedIndex !== null);

      if (scurveRuntime.rafRunning && scurveInView && !document.hidden) requestAnimationFrame(renderFrame);
    }

    let scurveInView = true;
    if ('IntersectionObserver' in window && wrap) {
      const scurveObs = new IntersectionObserver((entries) => {
        scurveInView = !!(entries[0] && entries[0].isIntersecting);
        if (scurveInView && scurveRuntime.rafRunning && !document.hidden) {
          requestAnimationFrame(renderFrame);
        }
      }, { rootMargin: '260px 0px' });
      scurveObs.observe(wrap);
    }
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden && scurveInView && scurveRuntime.rafRunning) {
        requestAnimationFrame(renderFrame);
      }
    });
    scurveRuntime.onRemount = () => {
      resizeCanvas();
      if (!scurveRuntime.rafRunning) {
        scurveRuntime.rafRunning = true;
        if (scurveInView && !document.hidden) requestAnimationFrame(renderFrame);
      }
    };
    scurveRuntime.rafRunning = true;
    requestAnimationFrame(renderFrame);
  }

  // ============================================================================
  // PHASE 7: BLOG SECTION IMAGE & 3D DISC SHELF GALLERY (CodePen Maseone 01a1db16)
  // ============================================================================
  const BLOG_POSTS = [
    {
      img: './assets/images/blog-meet-cas-team.jpg',
      badge: 'MEET THE EL FARM TEAM',
      title: 'Our Team at Your Service! Meet CAS & the People Behind EL Farm.',
      summary: 'Next time you visit, don’t forget to say hi! 😊 Here at EL Farm, it’s not just about good food and drinks — it’s also about the people who make you feel at home. 🌿 Meet CAS, part of the EL Farm team who makes sure your EL Farm experience is always a great one — from friendly service with a smile to your favorite drinks and meals. 💚'
    },
    {
      img: './assets/images/RMRNTfOzx5SKsElm7QqEhd4LSOk-380b3b26.avif',
      badge: 'PICKLEBALL & RECREATION',
      title: 'Championship Floodlit Night Pickleball Court Under the Palms.',
      summary: 'Experience Basilan’s premier outdoor floodlit pickleball court right inside El Farm Sanctuary in Sitio Nipa, Lamitan City. Play intense rallies day or night surrounded by towering coconut palms, then recharge with iced Dirty Coffee and a Salu-Salo Bilao.'
    },
    {
      img: './assets/images/tOaLCvpOcZyAWdDImLbzOTOhI-3c606027.avif',
      badge: 'AL-FRESCO GARDEN NIGHTS',
      title: 'Starlight Lawn, Sail Canopies & Live-Edge Garden Banquets.',
      summary: 'As dusk settles over Brgy. Maloong Canal, our expansive green lawn transforms into a glowing sanctuary under starlight sail canopies and warm string lights — crafted for unforgettable family dinners and acoustic evenings.'
    },
    {
      img: './assets/images/Y1yOAhXr4jJN5uIPLyBGGR7JMA-5b08f87d.avif',
      badge: 'SPECIALTY CAFÉ BAR',
      title: 'Inside Our Timber Pavilion: Dirty Coffee, Matcha & Heirloom Kitchen.',
      summary: 'Step inside our warm timber café pavilion where freshly pulled double-shot espresso meets ceremonial Uji matcha, real buko Coconut Matcha Cloud, and time-honored Basilan culinary traditions.'
    },
    {
      img: './assets/resto-views/resto-7.jpg',
      badge: 'TWILIGHT ENTRANCE',
      title: 'Welcome to Sitio Nipa: Our Illuminated Archway & Lantern Trees.',
      summary: 'Malayo man kami, sulit naman ang dayo! Our illuminated wooden archway and lantern-draped trees welcome travelers from across Lamitan City and Isabela City into a peaceful farm escape.'
    },
    {
      img: './assets/resto-views/resto-8.jpg',
      badge: 'ARTISAN WOODCRAFT',
      title: 'Handcrafted Acacia Tables & Warm Rustic Farm Interiors.',
      summary: 'Every table at El Farm Cafe & Resto is hewn from thick, live-edge local hardwood slabs, pairing natural organic textures with cozy ambient pendant lighting.'
    },
    {
      img: './assets/images/XiDCr6H0L2pzCdbVT0MuAVtBLM.png',
      badge: 'CELEBRATIONS & EVENTS',
      title: 'Host Your Family Gatherings, Faculty Dinners & Salu-Salo Feasts.',
      summary: 'From faculty fellowships and birthday milestones to barkada reunions, our garden pavilions and overflowing Seafood & Pinoy Favorites Bilaos bring everyone together.'
    },
    {
      img: './assets/menu/studio-tiyula-itum.jpg',
      badge: 'BASILAN HERITAGE',
      title: 'Preserving Heirloom Flavors: Tiyula Itum & Festive Chicken Kaliya.',
      summary: 'Our kitchen proudly honors Basilan’s culinary heritage with authentic Tiyula Itum simmered with charred coconut and lemongrass, and golden turmeric Chicken Kaliya.'
    },
    {
      img: './assets/menu/studio-seafood-bilao.jpg',
      badge: 'COASTAL BOUNTY',
      title: 'The Art of the Salu-Salo Bilao: Curacha Crab, Prawns & Crispy Pata.',
      summary: 'Designed for generous sharing, our signature bilaos showcase fresh Basilan Curacha crab, garlic butter shrimp, crispy calamares, and golden crackling Crispy Pata.'
    },
    {
      img: './assets/menu/studio-coconut-matcha-cloud.jpg',
      badge: 'FARM-TO-CUP CRAFT',
      title: 'From Fresh Farm Buko to Ceremonial Matcha & Probiotic Yoghurt.',
      summary: 'We pair freshly harvested young coconuts and farm-fresh mulberries with ceremonial matcha and artisanal espresso to craft refreshing drinks you will only find at El Farm.'
    }
  ];

  function openBlogStoryModal(startIdx) {
    const modalList = BLOG_POSTS.map((bp, bIdx) => ({
      id: 'blog-' + bIdx,
      name: bp.title,
      categoryLabel: bp.badge,
      priceDisplay: 'Sitio Nipa Sanctuary',
      description: bp.summary,
      cleanImage: bp.img
    }));
    openMenuLightbox(modalList, startIdx);
  }

  function mountDiscShelfInHost(hostEl, suffix) {
    if (!hostEl) return;
    Array.from(hostEl.children).forEach(ch => {
      if (!ch.classList.contains('elfarm-ds-wrapper')) {
        ch.style.setProperty('display', 'none', 'important');
      }
    });
    if (hostEl.querySelector('.elfarm-ds-wrapper')) return;

    const wrap = document.createElement('div');
    wrap.id = 'elfarm-blog-disc-shelf-' + suffix;
    wrap.className = 'elfarm-ds-wrapper';

    const bdHtml = BLOG_POSTS.map((bp, i) =>
      '<div class="elfarm-ds-bd' + (i === 0 ? ' is-active' : '') + '" data-ds-bd="' + i + '" style="background-image:url(' + bp.img + ')"></div>'
    ).join('');

    function buildCaseItems(isReflect) {
      return BLOG_POSTS.map((bp, i) => {
        const tagOpen = isReflect ? '<div class="elfarm-ds-case" data-ds-rcase="' + i + '">' : '<li class="elfarm-ds-case" data-ds-case="' + i + '">';
        const tagClose = isReflect ? '</div>' : '</li>';
        return tagOpen +
          '<div class="elfarm-ds-box">' +
            '<div class="elfarm-ds-cover">' +
              '<div class="elfarm-ds-out">' +
                '<img src="' + bp.img + '" alt="' + bp.title + '" loading="' + (i < 4 ? 'eager' : 'lazy') + '">' +
                '<i class="elfarm-ds-hinge"></i>' +
                '<p class="elfarm-ds-art"><span>' + bp.badge + '</span><b>' + bp.title + '</b></p>' +
              '</div>' +
            '</div>' +
            '<div class="elfarm-ds-spine"><b>' + bp.badge + '</b><span>' + String(i + 1).padStart(2, '0') + '</span></div>' +
            '<div class="elfarm-ds-edge"></div><div class="elfarm-ds-lid"></div><div class="elfarm-ds-base"></div><div class="elfarm-ds-back"></div>' +
          '</div>' +
        tagClose;
      }).join('');
    }

    wrap.innerHTML =
      '<div class="elfarm-ds-backdrops" aria-hidden="true">' + bdHtml + '</div>' +
      '<svg class="elfarm-ds-streaks" viewBox="0 0 1600 900" preserveAspectRatio="none" aria-hidden="true">' +
        '<path d="M-100 330 C 300 230, 700 420, 1000 300 S 1500 200, 1700 280"/>' +
        '<path d="M-100 420 C 400 360, 800 500, 1150 380 S 1500 330, 1700 360"/>' +
        '<path d="M-100 250 C 350 300, 900 180, 1250 260 S 1550 300, 1700 230"/>' +
      '</svg>' +
      '<div class="elfarm-ds-top">' +
        '<span class="elfarm-ds-brand"><i class="elfarm-ds-brand-dot" aria-hidden="true"></i>EL Farm Stories Shelf</span>' +
        '<span class="elfarm-ds-count"><strong id="elfarm-ds-num-' + suffix + '">01</strong> / ' + String(BLOG_POSTS.length).padStart(2, '0') + '</span>' +
      '</div>' +
      '<div class="elfarm-ds-shelf" tabindex="0" aria-label="Sanctuary Story Shelf. Left and right arrows browse; Enter or click opens the story.">' +
        '<ol class="elfarm-ds-cases">' + buildCaseItems(false) + '</ol>' +
        '<div class="elfarm-ds-mirror" aria-hidden="true"><div class="elfarm-ds-reflect"><div class="elfarm-ds-cases">' + buildCaseItems(true) + '</div></div></div>' +
      '</div>' +
      '<div class="elfarm-ds-caption-area" id="elfarm-ds-caption-' + suffix + '">' +
        '<span class="elfarm-ds-cap-badge" id="elfarm-ds-badge-' + suffix + '"></span>' +
        '<h3 class="elfarm-ds-cap-title" id="elfarm-ds-title-' + suffix + '"></h3>' +
        '<p class="elfarm-ds-cap-desc" id="elfarm-ds-desc-' + suffix + '"></p>' +
        '<div class="elfarm-ds-actions">' +
          '<button type="button" class="elfarm-ds-btn" data-ds-prev="' + suffix + '">&larr; Prev Story</button>' +
          '<button type="button" class="elfarm-ds-btn is-primary" data-ds-read="' + suffix + '">Read Full Story</button>' +
          '<button type="button" class="elfarm-ds-btn" data-ds-next="' + suffix + '">Next Story &rarr;</button>' +
        '</div>' +
      '</div>';

    hostEl.appendChild(wrap);

    let sel = 0;
    const total = BLOG_POSTS.length;
    const mainCases = Array.from(wrap.querySelectorAll('[data-ds-case]'));
    const reflCases = Array.from(wrap.querySelectorAll('[data-ds-rcase]'));
    const bds = Array.from(wrap.querySelectorAll('[data-ds-bd]'));
    const numEl = wrap.querySelector('#elfarm-ds-num-' + suffix);
    const badgeEl = wrap.querySelector('#elfarm-ds-badge-' + suffix);
    const titleEl = wrap.querySelector('#elfarm-ds-title-' + suffix);
    const descEl = wrap.querySelector('#elfarm-ds-desc-' + suffix);
    const shelfEl = wrap.querySelector('.elfarm-ds-shelf');

    function layoutShelf() {
      const mobile = window.innerWidth < 768;
      const vwPx = document.documentElement.clientWidth;
      const parentLeft = wrap.parentElement ? wrap.parentElement.getBoundingClientRect().left : 0;
      wrap.style.marginLeft = (-parentLeft) + 'px';
      wrap.style.width = vwPx + 'px';
      wrap.style.maxWidth = vwPx + 'px';
      const caseW = (mainCases[0] && mainCases[0].offsetWidth) || (mobile ? 190 : 258);
      const spineW = caseW * 0.082;
      const stepL = spineW + 3;
      const stepR = mobile ? caseW * 0.22 : caseW * 0.29;
      const leftGap = caseW * 0.5 + spineW * 0.5 + (mobile ? 38 : 84);
      const rightGap = caseW * 0.82 + (mobile ? 26 : 54);
      const nLeft = Math.max(0, sel);
      const nRight = Math.max(0, total - 1 - sel);
      const visL = Math.min(nLeft, 8);
      const visR = Math.min(nRight, 7);
      const extL = visL > 0 ? (leftGap + (visL - 1) * stepL + spineW * 0.5) : (caseW * 0.5);
      const extR = visR > 0 ? (rightGap + (visR - 1) * stepR + caseW * 0.3) : (caseW * 0.5);
      const shiftX = -(extR - extL) * 0.5;
      const applyTransform = (el, idx) => {
        const d = idx - sel;
        const ad = Math.abs(d);
        const L = d < 0 ? 1 : 0;
        const R = d > 0 ? 1 : 0;
        const C = d === 0 ? 1 : 0;
        const x = shiftX + R * (rightGap + (d - 1) * stepR) - L * (leftGap + (ad - 1) * stepL);
        const z = C * 46 - L * (caseW * 0.5) - R * (caseW * 0.14);
        const rotY = L * 88.5 - R * 54;
        const sc = C ? 1 : (L ? 0.94 : 0.92);
        const vis = (L && ad > 8) || (R && ad > 7) ? 0 : 1;
        el.style.transform = 'translateX(' + x.toFixed(1) + 'px) translateZ(' + z.toFixed(1) + 'px) rotateY(' + rotY + 'deg) scale(' + sc + ')';
        el.style.zIndex = String(100 - ad);
        el.style.opacity = String(vis);
        el.classList.toggle('is-chosen', C === 1);
      };

      mainCases.forEach((el, idx) => applyTransform(el, idx));
      reflCases.forEach((el, idx) => applyTransform(el, idx));
      bds.forEach((el, idx) => el.classList.toggle('is-active', idx === sel));

      const active = BLOG_POSTS[sel];
      if (numEl) numEl.textContent = String(sel + 1).padStart(2, '0');
      if (badgeEl) badgeEl.textContent = active.badge;
      if (titleEl) titleEl.textContent = active.title;
      if (descEl) descEl.textContent = active.summary;
    }

    function setSel(next) {
      sel = Math.max(0, Math.min(total - 1, next));
      layoutShelf();
    }

    let dragStartX = null;
    let dragStartSel = 0;
    let dragged = false;

    shelfEl.addEventListener('pointerdown', (e) => {
      dragStartX = e.clientX;
      dragStartSel = sel;
      dragged = false;
    });
    window.addEventListener('pointermove', (e) => {
      if (dragStartX === null) return;
      const dx = e.clientX - dragStartX;
      if (Math.abs(dx) > 8) dragged = true;
      if (dragged) {
        setSel(Math.round(dragStartSel - dx / 65));
      }
    });
    window.addEventListener('pointerup', () => {
      dragStartX = null;
    });

    mainCases.forEach((el, idx) => {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (dragged) { dragged = false; return; }
        if (idx === sel) openBlogStoryModal(idx);
        else setSel(idx);
      });
    });

    wrap.querySelector('[data-ds-prev="' + suffix + '"]').addEventListener('click', () => setSel(sel - 1));
    wrap.querySelector('[data-ds-next="' + suffix + '"]').addEventListener('click', () => setSel(sel + 1));
    wrap.querySelector('[data-ds-read="' + suffix + '"]').addEventListener('click', () => openBlogStoryModal(sel));

    shelfEl.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') { e.preventDefault(); setSel(sel + 1); }
      else if (e.key === 'ArrowLeft') { e.preventDefault(); setSel(sel - 1); }
      else if (e.key === 'Enter') { e.preventDefault(); openBlogStoryModal(sel); }
    });

    window.addEventListener('resize', layoutShelf);
    layoutShelf();
  }

  function enhanceRestoViewsSection() {
    const blogSections = document.querySelectorAll('[data-framer-name="Blog Section"], [data-framer-name="Blog Tab Section"]');
    blogSections.forEach((blogSec, sIdx) => {
      blogSec.querySelectorAll('h1, h2, h3, p').forEach(el => {
        if (el.closest('.elfarm-ds-wrapper')) return;
        const t = el.textContent.trim();
        if (t === 'Culinary Insights') el.textContent = 'Explore El Farm Sanctuary';
        if (t.includes('Discover stories, tips')) {
          el.textContent = 'Tour our team stories, twilight archway, timber café pavilion, starlight garden canopies, and night pickleball court in Sitio Nipa.';
        }
        if (t === 'See All Blog') {
          el.textContent = 'Explore Sanctuary';
        }
      });

      const host =
        blogSec.querySelector('[data-framer-name="Blog Tab Block"]') ||
        blogSec.querySelector('.framer-73kyao');

      if (host) {
        mountDiscShelfInHost(host, 's' + sIdx);
      }
    });
  }

  const VERIFIED_TESTIMONIALS = [
    {
      name: 'Aer Nhicka',
      role: 'Verified El Farm Guest · Facebook Feedback',
      quote: 'Thank you mam 🥰 Masarap po ang foods and maganda din po ang ambiance ❤️ — Quick laag with the whole family at EL Farm Cafe & Resto!'
    },
    {
      name: 'Doc Mika & CHO LGU',
      role: 'Verified El Farm Guests',
      quote: 'Malayo man kami, sulit naman ang dayo! From the Coconut Matcha Cloud served in a real buko shell to the Seafood Feast Bilao and Sizzling Sisig, every dish at El Farm is worth the trip to Sitio Nipa!'
    },
    {
      name: 'LCEA Pickleball Club',
      role: 'Verified El Farm Guests',
      quote: 'Playing night pickleball under the coconut palms and then sharing a Salu-Salo Bilao and iced Dirty Coffee with the whole squad makes El Farm our favorite hangout spot in Lamitan City!'
    }
  ];

  function enhanceTestimonialsSection() {
    const testiSec = document.querySelector('[data-framer-name="Testimonial Section"]');
    if (!testiSec) return;

    const cards = testiSec.querySelectorAll('[data-framer-name^="Card "]');
    cards.forEach((card, idx) => {
      const review = VERIFIED_TESTIMONIALS[idx % VERIFIED_TESTIMONIALS.length];
      const nameWrap = card.querySelector('[data-framer-name="Name"] div, [data-framer-name="Name"] p');
      if (nameWrap && nameWrap.textContent.trim() !== review.name) {
        nameWrap.textContent = review.name;
      }
      const roleEl = card.querySelector('[data-framer-name="Designation"] p, [data-framer-name="Designation"] div');
      if (roleEl && roleEl.textContent.trim() !== review.role) {
        roleEl.textContent = review.role;
      }
      const quoteParagraphs = Array.from(card.querySelectorAll('p, div')).filter(el => {
        if (el.closest('[data-framer-name="Info Block"]')) return false;
        const txt = (el.textContent || '').trim();
        return el.children.length === 0 && txt.length > 45;
      });
      if (quoteParagraphs[0] && quoteParagraphs[0].textContent.trim() !== review.quote) {
        quoteParagraphs[0].textContent = review.quote;
      }
    });
  }

  // Inject Interactive Google Mini-Map in Contact Section
  function injectMiniMapSection() {
    if (window.location.pathname.toLowerCase().includes('download')) return;
    if (document.getElementById('elfarm-minimap-section')) return;
    const contactSec = document.querySelector('[data-framer-name="Contact  Section"]') || document.querySelector('[data-framer-name="Contact Info Section"]');
    if (!contactSec) return;

    const mapWrap = document.createElement('div');
    mapWrap.id = 'elfarm-minimap-section';
    mapWrap.className = 'elfarm-minimap-wrap';
    const googleMapsDirUrl = 'https://www.google.com/maps/search/?api=1&query=El+Farm+Cafe+and+Restaurant+Sitio+Nipa+Maloong+Canal+Lamitan+City+Basilan';
    mapWrap.innerHTML = \`
      <div class="elfarm-minimap-card">
        <div class="elfarm-minimap-info">
          <div class="elfarm-minimap-eyebrow">📍 SANCTUARY LOCATION &amp; NAVIGATION</div>
          <h3 class="elfarm-minimap-title">Find Us in Sitio Nipa, Lamitan City</h3>
          <p class="elfarm-minimap-desc">Malayo man kami, sulit naman ang dayo! Follow the scenic road to Sitio Nipa, Brgy. Maloong Canal, Lamitan City, Basilan — our farm café pavilion, garden tents, and night pickleball court await.</p>
          <div class="elfarm-minimap-details">
            <div class="elfarm-minimap-row"><strong>Address:</strong> <span>Sitio Nipa, Brgy. Maloong Canal, Lamitan City, Basilan</span></div>
            <div class="elfarm-minimap-row"><strong>Hours:</strong> <span>Open Daily · 9:00 AM – 9:00 PM (Dine-In, Pre-Order &amp; Pickleball)</span></div>
            <div class="elfarm-minimap-row"><strong>Contact:</strong> <span>0917 182 9876 · Lamitan Delivery Available (+₱100)</span></div>
          </div>
          <div class="elfarm-minimap-actions">
            <a href="\${googleMapsDirUrl}" target="_blank" rel="noopener noreferrer" class="elfarm-map-btn-primary">
              <span>🧭 GET DIRECTIONS ON GOOGLE MAPS</span>
            </a>
            <a href="tel:09171829876" class="elfarm-map-btn-secondary">
              <span>📞 CALL 0917 182 9876</span>
            </a>
          </div>
        </div>
        <div class="elfarm-minimap-frame-box">
          <a href="\${googleMapsDirUrl}" target="_blank" rel="noopener noreferrer" class="elfarm-sora-map-link" aria-label="Open El Farm Cafe & Restaurant Sitio Nipa Lamitan City on Google Maps">
            <svg class="elfarm-sora-map-svg" viewBox="0 0 640 480" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
              <rect width="640" height="480" fill="#050708"/>
              <!-- Botanical Farm Sanctuary Plot (El Farm Grounds & Pickleball Court) -->
              <rect x="292" y="138" width="76" height="86" rx="4" fill="#102016" opacity="0.92"/>
              <rect x="44" y="255" width="96" height="68" rx="4" fill="#0c1811" opacity="0.7"/>
              <!-- Maloong Canal / Lamitan Coastal Inlet Bottom-Right -->
              <path d="M 390 480 C 425 360 515 268 640 220 L 640 480 Z" fill="#071826"/>
              <path d="M 412 480 C 446 376 528 292 640 246" fill="none" stroke="#0b2438" stroke-width="2"/>
              <!-- Bridges / Crossings over Maloong Canal -->
              <line x1="490" y1="295" x2="532" y2="352" stroke="#0c0f12" stroke-width="8"/>
              <line x1="560" y1="252" x2="606" y2="314" stroke="#0c0f12" stroke-width="8"/>
              <!-- Secondary Rural Street Grid (Sitio Nipa & Brgy. Maloong Canal) -->
              <g stroke="#1a1e21" stroke-width="2.2" fill="none">
                <line x1="20" y1="68" x2="620" y2="34"/>
                <line x1="20" y1="138" x2="620" y2="108"/>
                <line x1="20" y1="230" x2="540" y2="196"/>
                <line x1="20" y1="305" x2="430" y2="285"/>
                <line x1="85" y1="10" x2="68" y2="465"/>
                <line x1="176" y1="10" x2="148" y2="465"/>
                <line x1="274" y1="10" x2="255" y2="465"/>
                <line x1="392" y1="10" x2="365" y2="465"/>
                <line x1="518" y1="10" x2="486" y2="300"/>
              </g>
              <!-- Minor Access Roads -->
              <g stroke="#14181b" stroke-width="1.5" fill="none">
                <path d="M 225 460 Q 250 385 330 355"/>
                <line x1="145" y1="365" x2="360" y2="355"/>
                <line x1="415" y1="158" x2="615" y2="145"/>
              </g>
              <!-- Main Curved Artery: Sitio Nipa / Maloong Canal Rd (passing directly under the El Farm pin) -->
              <path d="M 35 455 Q 255 310 620 155" fill="none" stroke="#2c3135" stroke-width="6.5" stroke-linecap="round"/>
              <path d="M 35 455 Q 255 310 620 155" fill="none" stroke="#3c4248" stroke-width="1.4" stroke-dasharray="1 0" opacity="0.55"/>
            </svg>
            <div class="elfarm-sora-fade-sides"></div>
            <div class="elfarm-sora-fade-edges"></div>
            <div class="elfarm-sora-street-label">Sitio Nipa · Maloong Canal</div>
            <div class="elfarm-sora-water-label">Maloong Canal</div>
            <div class="elfarm-sora-pin-glow-wave"></div>
            <div class="elfarm-sora-pin-glow-core"></div>
            <svg class="elfarm-sora-pin-marker" viewBox="0 0 36 46" fill="none" aria-hidden="true">
              <path d="M18 0C8.059 0 0 8.059 0 18c0 12.6 15.63 26.18 16.295 26.75a2.58 2.58 0 0 0 3.41 0C20.37 44.18 36 30.6 36 18 36 8.059 27.941 0 18 0Z" fill="#f4161c"/>
              <circle cx="18" cy="18" r="6.5" fill="#ffffff"/>
            </svg>
            <div class="elfarm-sora-address-card">
              <h4 class="elfarm-sora-address-title">EL Farm Café &amp; Resto</h4>
              <p class="elfarm-sora-address-sub">Sitio Nipa, Maloong Canal, Lamitan</p>
            </div>
            <div class="elfarm-minimap-badge">6.6582° N, 122.1457° E · Click to Open Google Maps</div>
          </a>
        </div>
      </div>
    \`;
    contactSec.appendChild(mapWrap);
  }

  function enhanceTextAndHours() {
    document.querySelectorAll('.framer-1r0dvt3-container, #__framer-badge-container, [data-framer-name="Free 3 Month"], [data-framer-name="Experience Badge"], .framer-1qu9lve').forEach(el => el.remove());

    const p = window.location.pathname.toLowerCase();
    let targetTitle = 'El Farm Cafe and Restaurant | Sanctuary Dining & Specialty Cafe in Lamitan City, Basilan';
    if (p.includes('about')) targetTitle = 'About Us | El Farm Cafe and Restaurant in Lamitan City, Basilan';
    else if (p.includes('menu')) targetTitle = 'Our Special Menu | El Farm Cafe and Restaurant in Lamitan City, Basilan';
    else if (p.includes('blog')) targetTitle = 'Sanctuary & Stories | El Farm Cafe and Restaurant in Lamitan City';
    else if (p.includes('download')) targetTitle = 'Download Official App | El Farm Cafe and Restaurant';
    else if (p.includes('contact')) targetTitle = 'Reservations & Location | El Farm Cafe and Restaurant | 0917 182 9876';
    if (document.title !== targetTitle) document.title = targetTitle;

    document.querySelectorAll('h1').forEach(h1 => {
      const fullTxt = h1.textContent.replace(/\\s+/g, ' ').trim();
      if (fullTxt === 'Where Cravings Meet Their Perfect Match') {
        h1.innerHTML = 'Where <span class="framer-text" style="--framer-text-color:var(--token-96b34807-8926-496d-91c3-acabb6da071c, rgb(239, 201, 164))">Farm Charm</span> Meets <span class="framer-text" style="--framer-text-color:var(--token-96b34807-8926-496d-91c3-acabb6da071c, rgb(239, 201, 164))">Culinary</span> Bliss';
      } else if (fullTxt === 'A Journey of Taste & Tradition') {
        const span = h1.querySelector('span');
        if (span) {
          span.textContent = 'Farm Charm';
          if (h1.firstChild && h1.firstChild.nodeType === 3) {
            h1.firstChild.nodeValue = 'A Sanctuary of ';
          }
        } else {
          h1.textContent = 'A Sanctuary of Farm Charm & Tradition';
        }
      }
    });

    const dynYr = new Date().getFullYear();
    const targetCopy = dynYr + ' © El Farm Cafe and Restaurant. All rights reserved.';
    document.querySelectorAll('[data-framer-name="Copyright Text"] p, .framer-sdqfcv p, footer p').forEach(pEl => {
      const pTxt = pEl.textContent.trim();
      if (/^20\d{2}\s*©|All rights reserved\./i.test(pTxt) && pTxt !== targetCopy) {
        pEl.textContent = targetCopy;
      }
    });

    document.querySelectorAll('h1, h2, h3, h4, p, span').forEach(el => {
      if (el.children.length > 0) return;
      const txt = el.textContent.trim();
      if (txt === 'Where Cravings Meet Their Perfect Match') {
        el.textContent = 'Where Farm Charm Meets Culinary Bliss';
      } else if (txt === 'A Journey of Taste & Tradition') {
        el.textContent = 'A Sanctuary of Farm Charm & Flavor';
      } else if (txt.includes('Mon – Thu (10:00 AM')) {
        el.textContent = 'Open Daily · 9:00 AM – 9:00 PM';
      } else if (txt.includes('Fri – Sun (11:00 AM')) {
        el.textContent = 'Sitio Nipa, Maloong Canal, Lamitan City';
      } else if (/^20\d{2}\s*©|All rights reserved\./i.test(txt)) {
        const curYr = new Date().getFullYear();
        const nextCopy = curYr + ' © El Farm Cafe and Restaurant. All rights reserved.';
        if (txt !== nextCopy) el.textContent = nextCopy;
      } else if (txt === 'Chef' && el.closest('.framer-1xvzshi')) {
        el.textContent = 'Specialty Coffee, Matcha & Heirloom Kitchen';
      } else if (txt.includes('Discover our tailored dining services')) {
        el.textContent = 'Explore our complete curated menu of signature espresso drinks, ceremonial matcha, heirloom Basilan dishes, sizzling favorites, and Salu-Salo feasts.';
      }
    });

    // Guarantee every <input>, <select>, and <textarea> across the entire page has a valid autocomplete attribute (0 DevTools issues)
    document.querySelectorAll('input, select, textarea').forEach(field => {
      if (!field.getAttribute('autocomplete')) {
        const type = (field.getAttribute('type') || '').toLowerCase();
        const name = (field.getAttribute('name') || '').toLowerCase();
        const ph = (field.getAttribute('placeholder') || '').toLowerCase();
        if (type === 'email' || name.includes('email') || ph.includes('email')) {
          field.setAttribute('autocomplete', 'email');
        } else if (type === 'tel' || name.includes('phone') || ph.includes('0917') || ph.includes('012')) {
          field.setAttribute('autocomplete', 'tel');
        } else if (name === 'firstname' || ph.includes('first name')) {
          field.setAttribute('autocomplete', 'given-name');
        } else if (name === 'lastname' || ph.includes('last name')) {
          field.setAttribute('autocomplete', 'family-name');
        } else if (name.includes('name')) {
          field.setAttribute('autocomplete', 'name');
        } else {
          field.setAttribute('autocomplete', 'off');
        }
      }
    });
  }

  let navDelegationBound = false;
  let primaryHeaderPress = null;
  let primaryHeaderFallbackTimer = null;

  function resolveLinkRoute(a) {
    if (!a ||
      a.classList.contains('elfarm-native-tab') ||
      a.classList.contains('elfarm-map-btn-primary') ||
      a.classList.contains('elfarm-map-btn-secondary') ||
      a.classList.contains('elfarm-fb-card-ready') ||
      a.dataset.elfarmBlogBound === '1'
    ) return null;
    const href = (a.getAttribute('href') || '').trim();
    if (a.closest('#elfarm-download-hub, #elfarm-pwa-modal') || a.hasAttribute('download') || href.toLowerCase().endsWith('.apk')) {
      return null;
    }
    const txt = a.textContent.trim().toLowerCase();
    const fname = (a.getAttribute('data-framer-name') || '').trim().toLowerCase();
    if (fname === 'primary header' || txt === 'view all menu' || txt === 'view menu' || txt === 'menu' || href.includes('menu.html') || href === './menu') {
      return { target: './menu.html', slug: 'menu' };
    }
    if (txt === 'about' || href.includes('about.html') || href === './about') {
      return { target: './about.html', slug: 'about' };
    }
    if (txt === 'blog' || txt === 'explore sanctuary' || href.includes('blog.html') || href === './blog') {
      return { target: './blog.html', slug: 'blog' };
    }
    if (txt === 'download app' || href.includes('download.html') || href === './download' || href === '/download') {
      return { target: './download.html', slug: 'download' };
    }
    if (txt === 'contact us' || href.includes('contact.html') || href === './contact') {
      return { target: './contact.html', slug: 'contact' };
    }
    if (txt === 'book your table') {
      return { target: '#contact-section', slug: '__book__' };
    }
    if (txt === 'home' || fname === 'brand logo' || fname === 'logo' || href === './index.html' || href === './' || href === '/') {
      return { target: './index.html', slug: 'index' };
    }
    return null;
  }

  function executeRoute(route) {
    if (!route) return;
    if (route.slug === '__book__') {
      const sec = document.querySelector('[data-framer-name="Contact  Section"]');
      if (sec) sec.scrollIntoView({ behavior: 'smooth' });
      else window.location.href = './contact.html';
      return;
    }
    if (route.target === './index.html') {
      try { sessionStorage.setItem('elfarm_intro_played', '1'); } catch (err) {}
    }
    const curPath = window.location.pathname.toLowerCase();
    const isAlreadyOnPage = route.slug === 'index'
      ? (curPath === '/' || curPath.endsWith('/index.html'))
      : curPath.includes(route.slug);
    if (isAlreadyOnPage) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.location.assign(route.target);
    }
  }

  function bindGlobalNavDelegation() {
    if (navDelegationBound) return;
    navDelegationBound = true;

    document.addEventListener('click', (e) => {
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
      const a = e.target && e.target.closest ? e.target.closest('a, header [data-framer-name="Primary Header"]') : null;
      if (!a) return;
      if (primaryHeaderFallbackTimer) {
        clearTimeout(primaryHeaderFallbackTimer);
        primaryHeaderFallbackTimer = null;
      }
      const route = resolveLinkRoute(a);
      if (!route) return;
      e.preventDefault();
      e.stopPropagation();
      executeRoute(route);
    }, true);

    // Resilience guard: if Framer hydration swaps a child node between pointerdown & mouseup on Desktop Header CTA
    document.addEventListener('pointerdown', (e) => {
      if (e.button !== 0 || window.innerWidth <= 1024) return;
      const cta = e.target && e.target.closest ? e.target.closest('header [data-framer-name="Primary Header"]') : null;
      if (cta) primaryHeaderPress = { x: e.clientX, y: e.clientY, t: Date.now() };
    }, true);

    document.addEventListener('pointerup', (e) => {
      if (!primaryHeaderPress || window.innerWidth <= 1024) return;
      const press = primaryHeaderPress;
      primaryHeaderPress = null;
      if (Date.now() - press.t > 5000) return;
      if (Math.hypot(e.clientX - press.x, e.clientY - press.y) > 24) return;
      const cta = e.target && e.target.closest ? e.target.closest('header [data-framer-name="Primary Header"]') : null;
      if (!cta) return;
      clearTimeout(primaryHeaderFallbackTimer);
      primaryHeaderFallbackTimer = setTimeout(() => {
        primaryHeaderFallbackTimer = null;
        executeRoute({ target: './menu.html', slug: 'menu' });
      }, 45);
    }, true);
  }

  function lockUhdImagesAndLinks() {
    bindGlobalNavDelegation();

    document.querySelectorAll('img').forEach(img => {
      const src = img.getAttribute('src') || '';
      if (src.includes('framerusercontent.com/images/')) {
        const fname = src.split('/images/')[1].split('?')[0];
        img.setAttribute('src', './assets/images/' + fname);
      }
      const srcset = img.getAttribute('srcset') || '';
      if (
        src.includes('r1buuQ3PjFpdDV70OBtJahkGk') ||
        src.includes('89U3OUUG1H7iWBCxQnqp77Ullc') ||
        src.includes('CpTRnnQgJsG1yUk8t8GcoKvmI') ||
        src.includes('UDBAh9VKVLzkggfpg8wc0kII00c') ||
        src.includes('AvBMxfABr1rynfnaeNp3UnXUFI4') ||
        src.includes('CBgNiEhjs18VYIIUJ4cpwLikXc') ||
        src.includes('lfILwFRnauLujF02Phxk22TB8MY') ||
        src.includes('3mFckv99KkdCNazIHtCn1DjaSsM') ||
        src.includes('rCIwinNRdwz0pYsm0e9Sjg1iam8') ||
        src.includes('RMRNTfOzx5SKsElm7QqEhd4LSOk') ||
        src.includes('tOaLCvpOcZyAWdDImLbzOTOhI') ||
        src.includes('Y1yOAhXr4jJN5uIPLyBGGR7JMA') ||
        src.includes('ejUa9RcHAoqxoyIcExDwLQhOyfg') ||
        src.includes('2xh8WnqDGhMUrwHlrwSqLrvKI7A') ||
        src.includes('1koQJbZb7xfDc5aFxDqcFJbpaQQ') ||
        src.includes('wXTaZJVHaEnKDLdFV6x01YY6z6E') ||
        src.includes('OuGE1AOr5ExxFgl7DC0CJoqVHQ') ||
        src.includes('CPNDlK7soukGFOKHhg7ft7UfZg') ||
        src.includes('mbWmer1JTp02g6LbsnpEzWidY0M') ||
        src.includes('VW9jfrMKGnJvAPcIFeHDQUA44') ||
        src.includes('1brzvnX6w5uxGnawGF8WYYY70I') ||
        src.includes('XiDCr6H0L2pzCdbVT0MuAVtBLM') ||
        src.includes('Vvys1nYJ5g2CQE6rXwycDfTNkY') ||
        srcset.includes('framerusercontent.com')
      ) {
        img.removeAttribute('srcset');
      }
    });

    const curPathLower = window.location.pathname.toLowerCase();
    // Normalize all Navbar & Footer links and remove stale current-page marker on VIEW MENU button
    document.querySelectorAll('a').forEach(a => {
      const route = resolveLinkRoute(a);
      if (route) {
        a.setAttribute('href', route.target);
        a.dataset.elfarmPageNav = route.target;
        if (route.slug === 'menu' && !curPathLower.includes('menu') && a.hasAttribute('data-framer-page-link-current')) {
          a.removeAttribute('data-framer-page-link-current');
        }
        return;
      }
      const href = a.getAttribute('href') || '';
      if (href.includes('facebook.com') || href.includes('instagram.com') || href.includes('linkedin.com') || href.includes('twitter.com')) {
        a.setAttribute('href', RESTO.facebookUrl);
        a.setAttribute('target', '_blank');
      } else if (href.includes('google.com/maps')) {
        a.setAttribute('href', 'https://www.google.com/maps/search/?api=1&query=El+Farm+Cafe+and+Restaurant+Sitio+Nipa+Maloong+Canal+Lamitan+City+Basilan');
      } else if (href.startsWith('mailto:')) {
        a.setAttribute('href', 'mailto:ligaya_gabriel@live.com.ph');
      } else if (href.startsWith('tel:')) {
        a.setAttribute('href', 'tel:09171829876');
      }
    });
  }

  function injectZeticuzFooter() {
    let existing = document.getElementById('zeticuz-attribution-bar');
    if (existing) {
      if (existing.parentElement && existing.parentElement.tagName === 'FOOTER') {
        existing.remove();
      } else {
        return;
      }
    }

    const bar = document.createElement('div');
    const curYr = new Date().getFullYear();
    bar.id = 'zeticuz-attribution-bar';
    bar.className = 'zeticuz-dev-footer';
    bar.innerHTML =
      '<button type="button" class="zeticuz-dev-btn" id="zeticuz-portfolio-btn" aria-label="Site Developed by ZETICUZ">' +
        '<span>SITE DEVELOPED BY:</span>' +
        '<img src="./assets/images/zeticuz-logo.svg" alt="ZETICUZ">' +
        '<span>&copy; ' + curYr + '</span>' +
      '</button>';
    document.body.appendChild(bar);
    bar.querySelector('#zeticuz-portfolio-btn').addEventListener('click', () => {
      window.open('https://www.zeticuz.xyz/', '_blank', 'noopener,noreferrer');
    });
  }

  // ============================================================================
  // AOMI NATURE HERO VIDEO BACKGROUND & MOBILE HERO GUARD (SERENE NATURAL MOTION)
  // ============================================================================
  const natureHeroState = {
    bgLayer: null,
    heroVideo: null
  };

  function initNatureHeroVideoAnd3dLeaves() {
    // Clean up any stale corner/pointer leaves if present
    ['elfarm-hero-leaves-back', 'elfarm-hero-leaves-front', 'elfarm-menu-leaves-layer'].forEach((id) => {
      const stale = document.getElementById(id);
      if (stale) stale.remove();
    });

    const heroSection = document.querySelector('[data-framer-name^="Hero Section"]') || document.querySelector('.framer-1myb8ii');
    if (heroSection && window.location.pathname !== '/menu' && !window.location.pathname.includes('menu.html')) {
      // 1. Mount Brightened Aomi Nature Misty Hills Looping Video Background inside Hero Section
      if (!natureHeroState.bgLayer) {
        const bgLayer = document.createElement('div');
        bgLayer.id = 'elfarm-hero-nature-bg';
        bgLayer.className = 'elfarm-hero-nature-bg-layer';
        const video = document.createElement('video');
        video.className = 'elfarm-hero-nature-video';
        video.autoplay = true;
        video.muted = true;
        video.loop = true;
        video.playsInline = true;
        video.preload = 'auto';
        video.poster = './assets/images/hero-nature-poster.png';
        video.setAttribute('autoplay', '');
        video.setAttribute('muted', '');
        video.setAttribute('loop', '');
        video.setAttribute('playsinline', '');
        const source = document.createElement('source');
        source.src = './assets/video/hero-nature-bg.mp4';
        source.type = 'video/mp4';
        video.appendChild(source);
        const scrim = document.createElement('div');
        scrim.className = 'elfarm-hero-nature-scrim';
        bgLayer.appendChild(video);
        bgLayer.appendChild(scrim);
        natureHeroState.bgLayer = bgLayer;
        natureHeroState.heroVideo = video;
      }
      if (natureHeroState.bgLayer.parentElement !== heroSection) {
        heroSection.insertBefore(natureHeroState.bgLayer, heroSection.firstChild);
      }
      if (natureHeroState.heroVideo && natureHeroState.heroVideo.paused) {
        natureHeroState.heroVideo.muted = true;
        natureHeroState.heroVideo.play().catch(() => {});
      }

      // 2. Mobile Hero Hydration Guard (ensures hero headline, CTA & revolving table show on <= 809px viewports without clipping)
      const heroContainer = heroSection.querySelector('.framer-yak54d') || heroSection;
      const existingVisibleH1 = Array.from(heroSection.querySelectorAll('h1')).find(h => h.offsetParent !== null && !h.closest('.elfarm-mobile-hero-content'));
      if (!existingVisibleH1 && !document.getElementById('elfarm-mobile-hero-content')) {
        const mobHero = document.createElement('div');
        mobHero.id = 'elfarm-mobile-hero-content';
        mobHero.className = 'elfarm-mobile-hero-content';
        mobHero.innerHTML = \`
          <h1 class="elfarm-mobile-hero-title">Where <span style="color:rgb(239,201,164)">Farm</span> Charm Meets <span style="color:rgb(239,201,164)">Culinary Bliss</span></h1>
          <p class="elfarm-mobile-hero-sub">Escape the ordinary in Sitio Nipa, Lamitan City — savor specialty coffee, ceremonial matcha, heirloom Basilan cuisine, Salu-Salo bilaos, and night pickleball under the palms.</p>
          <a class="elfarm-mobile-hero-cta" href="#contact-section">Book Your Table</a>
        \`;
        heroContainer.appendChild(mobHero);
        mobHero.querySelector('.elfarm-mobile-hero-cta').addEventListener('click', (e) => {
          const sec = document.querySelector('[data-framer-name="Contact  Section"]');
          if (sec) {
            e.preventDefault();
            sec.scrollIntoView({ behavior: 'smooth' });
          }
        });
      }
      if (window.innerWidth <= 809 && !document.getElementById('elfarm-mobile-table-host')) {
        const mobHost = document.createElement('div');
        mobHost.id = 'elfarm-mobile-table-host';
        mobHost.className = 'elfarm-mobile-table-host';
        heroSection.appendChild(mobHost);
      }
    }
  }

  // ============================================================================
  // SMART MOBILE ZOOM LOCK vs VIEW DESKTOP SITE ZOOM UNLOCK
  // ============================================================================
  let smartZoomInitialized = false;
  let smartZoomLocked = false;
  let smartZoomCheckQueued = false;

  function detectDesktopSiteOnTouchDevice() {
    const ua = navigator.userAgent || '';
    const hasCoarsePointer = Boolean(window.matchMedia && window.matchMedia('(pointer: coarse)').matches);
    const hasTouch = (navigator.maxTouchPoints > 0) || ('ontouchstart' in window);
    const sw = (window.screen && window.screen.width) || 9999;
    const sh = (window.screen && window.screen.height) || 9999;
    const minPhysical = Math.min(sw, sh);

    const isMobileUa = /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua);
    const isIpadUa = /iPad/i.test(ua);
    const isIpadDesktopUa = /Macintosh/i.test(ua) && navigator.maxTouchPoints > 1;
    const isRealDesktopOS = /Windows NT|Win64|WOW64|CrOS/i.test(ua) ||
      (/Macintosh/i.test(ua) && navigator.maxTouchPoints <= 1) ||
      (/Linux/i.test(ua) && !/Android/i.test(ua));

    // Normal desktop PC/laptop (even with touch screen monitor) is not a mobile tab
    if (isRealDesktopOS && !hasCoarsePointer && !isMobileUa && !isIpadUa) {
      return { isTouchDevice: false, desktopSiteOn: false, allowZoom: true };
    }

    if (!hasTouch && !isMobileUa && !isIpadUa) {
      return { isTouchDevice: false, desktopSiteOn: false, allowZoom: true };
    }

    const clientMobileHint = (navigator.userAgentData && typeof navigator.userAgentData.mobile === 'boolean')
      ? navigator.userAgentData.mobile
      : null;

    // When a mobile/tablet browser switches "Desktop site" ON, Chromium/Safari widens layout viewport >= 920px
    // (on narrow <920px mobile viewports, keep pinch-zoom locked consistently)
    const isPhoneHardware = minPhysical < 740;
    const desktopSiteOn = Boolean(
      (isPhoneHardware && window.innerWidth >= 920) ||
      (isIpadDesktopUa && window.innerWidth >= 980 && minPhysical <= 1080)
    );
    return { isTouchDevice: true, desktopSiteOn, allowZoom: desktopSiteOn };
  }

  function applySmartViewportZoomState() {
    const state = detectDesktopSiteOnTouchDevice();
    smartZoomLocked = !state.allowZoom;

    let vpMeta = document.querySelector('meta[name="viewport"]');
    if (!vpMeta) {
      vpMeta = document.createElement('meta');
      vpMeta.setAttribute('name', 'viewport');
      document.head.appendChild(vpMeta);
    }

    const htmlEl = document.documentElement;
    if (smartZoomLocked) {
      vpMeta.setAttribute(
        'content',
        'width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no, viewport-fit=cover'
      );
      htmlEl.classList.add('elfarm-zoom-locked');
      htmlEl.classList.remove('elfarm-desktop-site-zoom');
    } else {
      const targetContent = state.desktopSiteOn
        ? 'width=1200, maximum-scale=5.0, user-scalable=yes, viewport-fit=cover'
        : 'width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes, viewport-fit=cover';
      vpMeta.setAttribute('content', targetContent);
      htmlEl.classList.remove('elfarm-zoom-locked');
      htmlEl.classList.add('elfarm-desktop-site-zoom');
    }
  }

  function initSmartViewportZoomControl() {
    applySmartViewportZoomState();
    if (smartZoomInitialized) return;
    smartZoomInitialized = true;

    const scheduleEval = () => {
      if (smartZoomCheckQueued) return;
      smartZoomCheckQueued = true;
      setTimeout(() => {
        smartZoomCheckQueued = false;
        applySmartViewportZoomState();
      }, 90);
    };

    window.addEventListener('resize', scheduleEval, { passive: true });
    window.addEventListener('orientationchange', scheduleEval, { passive: true });

    document.addEventListener('touchstart', (e) => {
      if (smartZoomLocked && e.touches && e.touches.length > 1) {
        e.preventDefault();
      }
    }, { passive: false });

    document.addEventListener('touchmove', (e) => {
      if (smartZoomLocked && e.touches && e.touches.length > 1) {
        e.preventDefault();
      }
    }, { passive: false });

    ['gesturestart', 'gesturechange', 'gestureend'].forEach((evtName) => {
      document.addEventListener(evtName, (e) => {
        if (smartZoomLocked) e.preventDefault();
      }, { passive: false });
    });
  }

  // ============================================================================
  // ADVANCED EDGE-TO-EDGE CROSS-BROWSER PWA ENGINE (iOS SAFARI + ALL BROWSERS)
  // ============================================================================
  let pwaDeferredPrompt = null;
  let pwaInitialized = false;

  function detectClientPlatform() {
    const ua = navigator.userAgent || '';
    const isIOS = /iPhone|iPad|iPod/i.test(ua) || (/Macintosh/i.test(ua) && navigator.maxTouchPoints > 1);
    const isAndroid = /Android/i.test(ua);
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;
    const isCriOS = /CriOS/i.test(ua);
    const isFxiOS = /FxiOS/i.test(ua);
    const isSafari = isIOS && /Safari/i.test(ua) && !isCriOS && !isFxiOS;
    return { isIOS, isAndroid, isStandalone, isSafari, isCriOS, isFxiOS };
  }

  function ensurePwaModal() {
    let modal = document.getElementById('elfarm-pwa-modal');
    if (modal) return modal;
    modal = document.createElement('div');
    modal.id = 'elfarm-pwa-modal';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-labelledby', 'elfarm-pwa-modal-title');
    modal.innerHTML =
      '<div class="elfarm-pwa-modal-card">' +
      '  <button type="button" class="elfarm-pwa-close" id="elfarm-pwa-close-btn" aria-label="Close">×</button>' +
      '  <div class="elfarm-pwa-head">' +
      '    <img src="./assets/images/favicon-192x192.png?v=2" alt="El Farm App Icon">' +
      '    <div>' +
      '      <h3 id="elfarm-pwa-modal-title">Install El Farm App</h3>' +
      '      <p id="elfarm-pwa-modal-sub">Edge-to-Edge Fullscreen Experience · iOS &amp; All Browsers</p>' +
      '    </div>' +
      '  </div>' +
      '  <div id="elfarm-pwa-step-list" class="elfarm-pwa-step-list"></div>' +
      '  <div class="elfarm-pwa-modal-actions" id="elfarm-pwa-modal-actions"></div>' +
      '</div>';
    document.body.appendChild(modal);

    modal.querySelector('#elfarm-pwa-close-btn').addEventListener('click', () => {
      modal.classList.remove('is-open');
    });
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.classList.remove('is-open');
    });
    return modal;
  }

  function openPwaInstallModal(forcePlatform) {
    const plat = detectClientPlatform();
    const modal = ensurePwaModal();
    const subEl = modal.querySelector('#elfarm-pwa-modal-sub');
    const listEl = modal.querySelector('#elfarm-pwa-step-list');
    const actEl = modal.querySelector('#elfarm-pwa-modal-actions');

    const showIos = forcePlatform === 'ios' || plat.isIOS;
    if (plat.isStandalone) {
      subEl.textContent = 'Already running in Edge-to-Edge Fullscreen App Mode';
      listEl.innerHTML =
        '<div class="elfarm-pwa-step-item"><span class="elfarm-pwa-step-num">✓</span><div>El Farm Café &amp; Resto is already installed cleanly as a standalone fullscreen app on this device.</div></div>';
      actEl.innerHTML = '<button type="button" class="elfarm-dl-pill-btn" id="elfarm-pwa-done-btn">Done</button>';
      actEl.querySelector('#elfarm-pwa-done-btn').addEventListener('click', () => modal.classList.remove('is-open'));
    } else if (showIos) {
      subEl.textContent = plat.isCriOS ? 'Chrome on iPhone/iPad (Edge-to-Edge PWA)' : 'iPhone / iPad Safari Fullscreen App Setup';
      const step1 = plat.isCriOS
        ? 'Tap the <strong>Share (□↑)</strong> icon at the <strong>top-right address bar</strong> of Chrome on iOS.'
        : 'Tap the <strong>Share (□↑)</strong> button at the <strong>bottom bar</strong> in Safari (or open this link in Safari if inside an in-app browser).';
      listEl.innerHTML =
        '<div class="elfarm-pwa-step-item"><span class="elfarm-pwa-step-num">1</span><div>' + step1 + '</div></div>' +
        '<div class="elfarm-pwa-step-item"><span class="elfarm-pwa-step-num">2</span><div>Scroll down the sheet and tap <strong>"Add to Home Screen"</strong> (+ icon).</div></div>' +
        '<div class="elfarm-pwa-step-item"><span class="elfarm-pwa-step-num">3</span><div>Tap <strong>"Add"</strong> — launch <strong>El Farm</strong> from your Home Screen for full edge-to-edge display behind the notch/Dynamic Island.</div></div>';
      actEl.innerHTML =
        '<button type="button" class="elfarm-dl-pill-btn" id="elfarm-pwa-copy-btn">Copy Link for Safari</button>';
      const copyBtn = actEl.querySelector('#elfarm-pwa-copy-btn');
      copyBtn.addEventListener('click', () => {
        const shareUrl = window.location.origin + '/?source=pwa';
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(shareUrl).then(() => {
            copyBtn.textContent = 'Copied! Open in Safari ✓';
          }).catch(() => {});
        } else {
          copyBtn.textContent = shareUrl;
        }
      });
    } else {
      subEl.textContent = 'Browser PWA Installation (Chrome / Edge / Safari / Firefox)';
      listEl.innerHTML =
        '<div class="elfarm-pwa-step-item"><span class="elfarm-pwa-step-num">1</span><div>Look for the <strong>Install App (⊕)</strong> icon in your browser address bar or open the browser menu (<strong>⋮ / ⋯</strong>).</div></div>' +
        '<div class="elfarm-pwa-step-item"><span class="elfarm-pwa-step-num">2</span><div>Select <strong>"Install El Farm Cafe and Restaurant"</strong> or <strong>"Add to Home Screen / Apps"</strong> to run fullscreen offline-ready.</div></div>';
      actEl.innerHTML = '<button type="button" class="elfarm-dl-pill-btn" id="elfarm-pwa-ok-btn">Got It</button>';
      actEl.querySelector('#elfarm-pwa-ok-btn').addEventListener('click', () => modal.classList.remove('is-open'));
    }

    modal.classList.add('is-open');
  }

  async function triggerElFarmPwaInstall(forcePlatform) {
    if (pwaDeferredPrompt && forcePlatform !== 'ios') {
      try {
        pwaDeferredPrompt.prompt();
        const choice = await pwaDeferredPrompt.userChoice;
        pwaDeferredPrompt = null;
        if (choice && choice.outcome === 'accepted') return;
      } catch (e) {}
    }
    openPwaInstallModal(forcePlatform);
  }
  window.triggerElFarmPwaInstall = triggerElFarmPwaInstall;

  function initElFarmPWA() {
    if (pwaInitialized) return;
    pwaInitialized = true;

    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      pwaDeferredPrompt = e;
      const btn = document.getElementById('elfarm-pwa-install-btn');
      if (btn) btn.textContent = 'Install App Now';
    });

    if ('serviceWorker' in navigator) {
      const isLocalHost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
      if (isLocalHost) {
        navigator.serviceWorker.getRegistrations()
          .then((regs) => Promise.all(regs.map((r) => r.unregister())))
          .catch(() => {});
        if ('caches' in window) {
          caches.keys()
            .then((keys) => Promise.all(keys.filter((k) => k.indexOf('elfarm-pwa-') === 0).map((k) => caches.delete(k))))
            .catch(() => {});
        }
      } else {
        const swRegister = () => {
          navigator.serviceWorker.register('./sw.js', { scope: './' }).catch(() => {});
        };
        if (document.readyState === 'complete') swRegister();
        else window.addEventListener('load', swRegister, { once: true });
      }
    }
  }

  // ============================================================================
  // HEADER NAVBAR: INJECT "DOWNLOAD APP" RIGHT NEXT TO "BLOG" ACROSS ALL PAGES
  // ============================================================================
  function ensureDownloadNavLink() {
    const isDownloadPage = window.location.pathname.toLowerCase().includes('download');

    document.querySelectorAll('nav').forEach((nav) => {
      if (nav.closest('#elfarm-mobile-nav-drawer')) return;
      if (nav.querySelector('[data-elfarm-nav="download"]')) {
        if (isDownloadPage) {
          nav.querySelectorAll('a[data-framer-page-link-current="true"]').forEach((cur) => {
            if (cur.getAttribute('data-elfarm-nav') !== 'download') {
              cur.removeAttribute('data-framer-page-link-current');
            }
          });
          const dlA = nav.querySelector('[data-elfarm-nav="download"]');
          if (dlA) dlA.setAttribute('data-framer-page-link-current', 'true');
        }
        return;
      }

      const links = Array.from(nav.querySelectorAll('a'));
      const blogLink = links.find((a) => a.textContent.trim().toLowerCase() === 'blog' || (a.getAttribute('href') || '').includes('blog'));
      if (!blogLink) return;

      const blogWrapper = (blogLink.parentElement && blogLink.parentElement !== nav) ? blogLink.parentElement : blogLink;
      const cloneWrapper = blogWrapper.cloneNode(true);
      const dlAnchor = cloneWrapper.tagName === 'A' ? cloneWrapper : cloneWrapper.querySelector('a');
      if (!dlAnchor) return;

      dlAnchor.setAttribute('href', './download.html');
      dlAnchor.setAttribute('data-elfarm-nav', 'download');
      dlAnchor.setAttribute('data-framer-name', isDownloadPage ? 'Default Active' : 'Default Inactive');
      delete dlAnchor.dataset.elfarmPageNav;
      if (isDownloadPage) {
        dlAnchor.setAttribute('data-framer-page-link-current', 'true');
      } else {
        dlAnchor.removeAttribute('data-framer-page-link-current');
      }

      const textEl = dlAnchor.querySelector('p, span') || dlAnchor;
      textEl.textContent = 'Download App';

      if (blogWrapper.nextSibling) {
        nav.insertBefore(cloneWrapper, blogWrapper.nextSibling);
      } else {
        nav.appendChild(cloneWrapper);
      }

      if (isDownloadPage) {
        nav.querySelectorAll('a[data-framer-page-link-current="true"]').forEach((cur) => {
          if (cur !== dlAnchor) cur.removeAttribute('data-framer-page-link-current');
        });
      }
    });

    // Also keep Footer links consistent cleanly
    const footerNavLists = document.querySelectorAll('footer a');
    footerNavLists.forEach((a) => {
      if (a.textContent.trim().toLowerCase() === 'blog' && a.parentElement && !a.parentElement.parentElement.querySelector('[data-elfarm-footer-nav="download"]')) {
        const container = a.parentElement;
        if (container && container.parentElement && container.parentElement.children.length <= 6) {
          const cloned = container.cloneNode(true);
          const ca = cloned.querySelector('a') || (cloned.tagName === 'A' ? cloned : null);
          if (ca) {
            ca.setAttribute('href', './download.html');
            ca.setAttribute('data-elfarm-footer-nav', 'download');
            delete ca.dataset.elfarmPageNav;
            const tp = ca.querySelector('p, span') || ca;
            tp.textContent = 'Download App';
            if (container.nextSibling) container.parentElement.insertBefore(cloned, container.nextSibling);
            else container.parentElement.appendChild(cloned);
          }
        }
      }
    });
  }

  // ============================================================================
  // ORIGINAL FRAMER-MATCHED MOBILE/TABLET NAVIGATION DRAWER (<= 1024px ONLY)
  // - Animated Hamburger <-> X morph icon (#elfarm-mobile-burger-btn)
  // - Clean dark slide-down dropdown panel matching monkscrave.framer.website
  // - NEVER intercepts Desktop (> 1024px) header "VIEW MENU" CTA!
  // ============================================================================
  let mobileDrawerBound = false;

  function ensureMobileBurgerButton() {
    let mobLogo = document.getElementById('elfarm-mobile-brand-logo');
    if (!mobLogo) {
      mobLogo = document.createElement('a');
      mobLogo.id = 'elfarm-mobile-brand-logo';
      mobLogo.href = './index.html';
      mobLogo.setAttribute('data-framer-name', 'Brand Logo');
      mobLogo.setAttribute('aria-label', 'El Farm Cafe and Restaurant Home');
      mobLogo.innerHTML = '<img decoding="sync" src="./assets/images/9EbxgnnItr5IyHLUac9iSjrocis-64b569cd.svg" alt="El Farm Cafe and Restaurant" width="68" height="48">';
      document.body.appendChild(mobLogo);
    }
    let burger = document.getElementById('elfarm-mobile-burger-btn');
    if (!burger) {
      burger = document.createElement('button');
      burger.id = 'elfarm-mobile-burger-btn';
      burger.type = 'button';
      burger.setAttribute('aria-label', 'Toggle navigation menu');
      burger.setAttribute('aria-expanded', 'false');
      burger.innerHTML =
        '<span class="elfarm-burger-line elfarm-burger-line-1"></span>' +
        '<span class="elfarm-burger-line elfarm-burger-line-2"></span>' +
        '<span class="elfarm-burger-line elfarm-burger-line-3"></span>';
      document.body.appendChild(burger);
    }
    return burger;
  }

  function initMobileNavDrawer() {
    const burgerBtn = ensureMobileBurgerButton();
    let backdrop = document.getElementById('elfarm-mobile-nav-backdrop');
    let drawer = document.getElementById('elfarm-mobile-nav-drawer');

    if (!backdrop) {
      backdrop = document.createElement('div');
      backdrop.id = 'elfarm-mobile-nav-backdrop';
      document.body.appendChild(backdrop);
    }

    if (!drawer) {
      const pathLower = window.location.pathname.toLowerCase();
      const navItems = [
        { label: 'Home', href: './index.html', match: (p) => p === '/' || p.endsWith('/index.html') || p.endsWith('index.html') },
        { label: 'About', href: './about.html', match: (p) => p.includes('about') },
        { label: 'Blog', href: './blog.html', match: (p) => p.includes('blog') },
        { label: 'Download App', href: './download.html', match: (p) => p.includes('download') },
        { label: 'Contact us', href: './contact.html', match: (p) => p.includes('contact') },
        { label: 'Menu', href: './menu.html', match: (p) => p.includes('menu') },
      ];

      drawer = document.createElement('aside');
      drawer.id = 'elfarm-mobile-nav-drawer';
      drawer.setAttribute('aria-label', 'Mobile Navigation');
      drawer.setAttribute('aria-hidden', 'true');
      drawer.innerHTML =
        '<nav class="elfarm-mnav-links">' +
        navItems.map((item, idx) =>
          '<a class="elfarm-mnav-link' + (item.match(pathLower) ? ' is-active' : '') + '" style="--mnav-idx:' + idx + ';" href="' + item.href + '">' + item.label + '</a>'
        ).join('') +
        '</nav>';
      document.body.appendChild(drawer);
    }

    const syncBurgerState = (isOpen) => {
      const btn = document.getElementById('elfarm-mobile-burger-btn');
      if (btn) {
        btn.classList.toggle('is-open', isOpen);
        btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        btn.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
      }
    };

    const openDrawer = () => {
      if (window.innerWidth > 1024) return;
      backdrop.classList.add('is-open');
      drawer.classList.add('is-open');
      drawer.setAttribute('aria-hidden', 'false');
      syncBurgerState(true);
    };

    const closeDrawer = () => {
      backdrop.classList.remove('is-open');
      drawer.classList.remove('is-open');
      drawer.setAttribute('aria-hidden', 'true');
      syncBurgerState(false);
    };

    if (window.innerWidth > 1024 && drawer.classList.contains('is-open')) {
      closeDrawer();
    }

    if (!mobileDrawerBound) {
      mobileDrawerBound = true;
      backdrop.addEventListener('click', closeDrawer);
      drawer.querySelectorAll('a').forEach(a => a.addEventListener('click', closeDrawer));

      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && drawer.classList.contains('is-open')) {
          closeDrawer();
        }
      });

      window.addEventListener('resize', () => {
        if (window.innerWidth > 1024 && drawer.classList.contains('is-open')) {
          closeDrawer();
        }
      });

      document.addEventListener('click', (e) => {
        if (window.innerWidth > 1024) return;
        const primaryDesktopCta = e.target && e.target.closest ? e.target.closest('[data-framer-name="Primary Header"], .framer-pc5vzg-container') : null;
        if (primaryDesktopCta) return;
        const burgerTarget = e.target && e.target.closest
          ? e.target.closest('#elfarm-mobile-burger-btn, .framer-r826j9, [data-framer-name="Hamburger"], [data-framer-name="Burger"]')
          : null;
        if (!burgerTarget) return;
        e.preventDefault();
        e.stopPropagation();
        if (drawer.classList.contains('is-open')) closeDrawer();
        else openDrawer();
      }, true);
    }

    // Ensure any Desktop [data-framer-name="Header Button"] keeps direct navigation behavior without burger attributes
    document.querySelectorAll('header .framer-1g6xkw5, header [data-framer-name="Header Button"]').forEach(el => {
      if (el.getAttribute('role') === 'button') el.removeAttribute('role');
      if (el.getAttribute('aria-label') === 'Open navigation menu') el.removeAttribute('aria-label');
      if (el.hasAttribute('tabindex')) el.removeAttribute('tabindex');
    });
    if (burgerBtn) syncBurgerState(drawer.classList.contains('is-open'));
  }

  // ============================================================================
  // DEDICATED /download PAGE: ANDROID APK AUTO-DOWNLOAD + iOS PWA + QR CODES
  // ============================================================================
  let downloadHubAutoHandled = false;

  function renderQrIntoElement(el, urlText, qrWidth) {
    if (!el) return;
    const width = qrWidth || 94;
    if (window.ElFarmQR && typeof window.ElFarmQR.toCanvas === 'function') {
      const canvas = document.createElement('canvas');
      window.ElFarmQR.toCanvas(
        canvas,
        urlText,
        { width, margin: 1, errorCorrectionLevel: 'M', color: { dark: '#0b1315', light: '#ffffff' } },
        (err) => {
          if (!err) {
            el.innerHTML = '';
            el.appendChild(canvas);
          }
        }
      );
    }
  }

  function openQrZoomModal(opts) {
    let modal = document.getElementById('elfarm-qr-zoom-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'elfarm-qr-zoom-modal';
      modal.setAttribute('role', 'dialog');
      modal.setAttribute('aria-modal', 'true');
      modal.innerHTML =
        '<div class="elfarm-qr-zoom-card">' +
        '  <button type="button" class="elfarm-qr-zoom-close" aria-label="Close enlarged QR code">&times;</button>' +
        '  <div class="elfarm-qr-zoom-badge"></div>' +
        '  <h2 class="elfarm-qr-zoom-title"></h2>' +
        '  <div class="elfarm-qr-zoom-stage" id="elfarm-qr-zoom-stage"></div>' +
        '  <p class="elfarm-qr-zoom-url"></p>' +
        '  <div class="elfarm-qr-zoom-actions"></div>' +
        '</div>';
      document.body.appendChild(modal);

      const closeModal = () => modal.classList.remove('is-open');
      modal.querySelector('.elfarm-qr-zoom-close').addEventListener('click', closeModal);
      modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
      });
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('is-open')) closeModal();
      });
    }

    modal.querySelector('.elfarm-qr-zoom-badge').textContent = opts.badge || 'Scan with Camera';
    modal.querySelector('.elfarm-qr-zoom-title').textContent = opts.title || 'Scan QR Code';
    modal.querySelector('.elfarm-qr-zoom-url').textContent = opts.url || '';

    const actionsWrap = modal.querySelector('.elfarm-qr-zoom-actions');
    actionsWrap.innerHTML = '';
    if (opts.actionLabel && typeof opts.onAction === 'function') {
      const actionBtn = document.createElement('button');
      actionBtn.type = 'button';
      actionBtn.className = 'elfarm-dl-pill-btn';
      actionBtn.textContent = opts.actionLabel;
      actionBtn.addEventListener('click', () => opts.onAction());
      actionsWrap.appendChild(actionBtn);
    }

    const stage = modal.querySelector('#elfarm-qr-zoom-stage');
    stage.innerHTML = '';
    renderQrIntoElement(stage, opts.url, 300);

    requestAnimationFrame(() => modal.classList.add('is-open'));
  }

  function startAndroidApkDownload() {
    const a = document.createElement('a');
    a.href = './assets/downloads/el-farm-cafe.apk';
    a.setAttribute('download', 'El-Farm-Cafe-and-Resto.apk');
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    setTimeout(() => a.remove(), 1500);
  }

  function initDownloadAppPage() {
    if (!window.location.pathname.toLowerCase().includes('download')) return;

    document.title = 'Download Official App | El Farm Cafe and Restaurant';

    // Hide Contact page SSR sections robustly & mount #elfarm-download-hub cleanly at the top right below Header
    document.querySelectorAll('[data-framer-name="Contact  Section"], [data-framer-name="Contact Info Section"], [data-framer-name="Instagram Section"], #elfarm-minimap-section').forEach((sec) => {
      sec.style.setProperty('display', 'none', 'important');
    });

    const existingHub = document.getElementById('elfarm-download-hub');
    if (existingHub) {
      return;
    }

    const mainEl = document.getElementById('main') || document.body;
    const bannerEl = document.querySelector('.framer-3fabei-container');
    const footerWrapEl = document.querySelector('.framer-1nbmc36-container');
    const footerEl = document.querySelector('footer');
    const hub = document.createElement('section');
    hub.id = 'elfarm-download-hub';

    const origin = window.location.origin;
    const smartQrUrl = origin + '/download.html?auto=1';
    const androidQrUrl = origin + '/download.html?platform=android&auto=1';
    const iosQrUrl = origin + '/download.html?platform=ios&auto=1';

    hub.innerHTML =
      '<div class="elfarm-dl-inner">' +
      '  <div class="elfarm-dl-hero">' +
      '    <span class="elfarm-dl-eyebrow">Official Mobile App · Android APK &amp; Edge-to-Edge iOS PWA</span>' +
      '    <h1 class="elfarm-dl-title">Install <em>El Farm App</em> on Any Device</h1>' +
      '    <p class="elfarm-dl-sub">Order signature heirloom dishes, browse all 49 menu creations, reserve your table or night pickleball slot, and launch full-screen right from your Home Screen — no app store needed.</p>' +
      '  </div>' +
      '  <div id="elfarm-download-status" class="elfarm-dl-status-banner">' +
      '    <span id="elfarm-download-status-text"></span>' +
      '    <button type="button" class="elfarm-dl-pill-btn" id="elfarm-download-status-btn">Open Installer</button>' +
      '  </div>' +
      '  <div class="elfarm-dl-cards">' +
      '    <div class="elfarm-dl-card elfarm-dl-card-featured">' +
      '      <div>' +
      '        <span class="elfarm-dl-card-badge">Smart Universal QR · Auto Detects OS</span>' +
      '        <h2>Scan to Install</h2>' +
      '        <p>Scan with any phone camera. Android devices automatically start downloading the APK; iPhones and iPads automatically prompt edge-to-edge full-screen PWA installation.</p>' +
      '      </div>' +
      '      <div class="elfarm-dl-action-qr-row">' +
      '        <div class="elfarm-dl-pill-col">' +
      '          <button type="button" class="elfarm-dl-pill-btn" id="elfarm-smart-dl-btn">Download</button>' +
      '          <span class="elfarm-dl-pill-meta">Auto-detects Android APK or iOS PWA</span>' +
      '        </div>' +
      '        <div class="elfarm-dl-qr-box" id="elfarm-qr-box-smart" role="button" tabindex="0" aria-label="Enlarge Smart Universal QR code">' +
      '          <div class="elfarm-dl-qr-canvas-wrap" id="elfarm-qr-smart"></div>' +
      '          <span class="elfarm-dl-qr-cap">Scan Any Phone</span>' +
      '          <span class="elfarm-dl-qr-hint">Tap to enlarge</span>' +
      '        </div>' +
      '      </div>' +
      '    </div>' +
      '    <div class="elfarm-dl-card">' +
      '      <div>' +
      '        <span class="elfarm-dl-card-badge">Android · Official Signed Tablet &amp; Phone APK</span>' +
      '        <h2>Android App</h2>' +
      '        <p>Lightweight native Android tablet &amp; phone app (<code>El-Farm-Cafe-and-Resto.apk</code> · 145 KB). Zero ads, keeps Cashier &amp; Kitchen KDS screens awake, auto-rotates, and connects <code>window.print()</code> to Android thermal printers.</p>' +
      '      </div>' +
      '      <div class="elfarm-dl-action-qr-row">' +
      '        <div class="elfarm-dl-pill-col">' +
      '          <a href="./assets/downloads/el-farm-cafe.apk" download="El-Farm-Cafe-and-Resto.apk" class="elfarm-dl-pill-btn" id="elfarm-android-apk-btn">Download</a>' +
      '          <span class="elfarm-dl-pill-meta">Android 7.0+ · v2.0 · 145 KB</span>' +
      '        </div>' +
      '        <div class="elfarm-dl-qr-box" id="elfarm-qr-box-android" role="button" tabindex="0" aria-label="Enlarge Android APK QR code">' +
      '          <div class="elfarm-dl-qr-canvas-wrap" id="elfarm-qr-android"></div>' +
      '          <span class="elfarm-dl-qr-cap">Android APK QR</span>' +
      '          <span class="elfarm-dl-qr-hint">Tap to enlarge</span>' +
      '        </div>' +
      '      </div>' +
      '    </div>' +
      '    <div class="elfarm-dl-card">' +
      '      <div>' +
      '        <span class="elfarm-dl-card-badge">iPhone, iPad &amp; Desktop · Edge-to-Edge PWA</span>' +
      '        <h2>iOS &amp; Web App</h2>' +
      '        <p>Full-screen notch-to-home-bar app for iOS Safari, Chrome, Edge, Samsung Internet &amp; macOS/Windows. Opens seamlessly without browser bars.</p>' +
      '      </div>' +
      '      <div class="elfarm-dl-action-qr-row">' +
      '        <div class="elfarm-dl-pill-col">' +
      '          <button type="button" class="elfarm-dl-pill-btn" id="elfarm-pwa-install-btn">Download</button>' +
      '          <span class="elfarm-dl-pill-meta">iOS 16–18+ · Chrome · Safari · Edge</span>' +
      '        </div>' +
      '        <div class="elfarm-dl-qr-box" id="elfarm-qr-box-ios" role="button" tabindex="0" aria-label="Enlarge iOS and PWA QR code">' +
      '          <div class="elfarm-dl-qr-canvas-wrap" id="elfarm-qr-ios"></div>' +
      '          <span class="elfarm-dl-qr-cap">iOS &amp; PWA QR</span>' +
      '          <span class="elfarm-dl-qr-hint">Tap to enlarge</span>' +
      '        </div>' +
      '      </div>' +
      '    </div>' +
      '  </div>' +
      '  <div class="elfarm-dl-steps-grid">' +
      '    <div class="elfarm-dl-step-panel">' +
      '      <h3>Android APK Installation Steps</h3>' +
      '      <ol>' +
      '        <li>Tap <strong>Download</strong> (or scan the QR on Android) to save <code>El-Farm-Cafe-and-Resto.apk</code>.</li>' +
      '        <li>Open the downloaded APK from your notifications or <strong>Files &rarr; Downloads</strong>.</li>' +
      '        <li>If prompted, enable <strong>"Allow from this source"</strong> once, then tap <strong>Install</strong>.</li>' +
      '      </ol>' +
      '    </div>' +
      '    <div class="elfarm-dl-step-panel">' +
      '      <h3>iPhone &amp; iPad Fullscreen PWA Steps</h3>' +
      '      <ol>' +
      '        <li>Scan the QR (or tap <strong>Download</strong> on iOS &amp; Web App) to open in <strong>Safari</strong>.</li>' +
      '        <li>Tap the <strong>Share (□↑)</strong> icon and select <strong>"Add to Home Screen"</strong>.</li>' +
      '        <li>Launch <strong>El Farm</strong> from your Home Screen for edge-to-edge full-screen dining &amp; reservations.</li>' +
      '      </ol>' +
      '    </div>' +
      '  </div>' +
      '</div>';

    if (bannerEl && bannerEl.parentElement) {
      bannerEl.parentElement.insertBefore(hub, bannerEl);
    } else if (footerWrapEl && footerWrapEl.parentElement) {
      footerWrapEl.parentElement.insertBefore(hub, footerWrapEl);
    } else if (footerEl && footerEl.parentElement) {
      footerEl.parentElement.insertBefore(hub, footerEl);
    } else {
      mainEl.appendChild(hub);
    }

    renderQrIntoElement(hub.querySelector('#elfarm-qr-smart'), smartQrUrl);
    renderQrIntoElement(hub.querySelector('#elfarm-qr-android'), androidQrUrl);
    renderQrIntoElement(hub.querySelector('#elfarm-qr-ios'), iosQrUrl);

    const plat = detectClientPlatform();
    const bindQrBox = (selector, modalConfig) => {
      const box = hub.querySelector(selector);
      if (!box) return;
      const launch = () => openQrZoomModal(modalConfig);
      box.addEventListener('click', launch);
      box.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          launch();
        }
      });
    };
    bindQrBox('#elfarm-qr-box-smart', {
      badge: 'Smart Universal QR · Auto Detects OS',
      title: 'Scan to Install El Farm App',
      url: smartQrUrl,
      actionLabel: plat.isAndroid ? 'Download Android APK' : 'Install Web App',
      onAction: () => {
        if (plat.isAndroid) startAndroidApkDownload();
        else triggerElFarmPwaInstall(plat.isIOS ? 'ios' : undefined);
      }
    });
    bindQrBox('#elfarm-qr-box-android', {
      badge: 'Android · Official Signed Tablet & Phone APK',
      title: 'Android App QR Code',
      url: androidQrUrl,
      actionLabel: 'Download APK (145 KB)',
      onAction: startAndroidApkDownload
    });
    bindQrBox('#elfarm-qr-box-ios', {
      badge: 'iPhone, iPad & Desktop · Edge-to-Edge PWA',
      title: 'iOS & Web App QR Code',
      url: iosQrUrl,
      actionLabel: 'Install Web App',
      onAction: () => triggerElFarmPwaInstall(plat.isIOS ? 'ios' : undefined)
    });

    const smartBtn = hub.querySelector('#elfarm-smart-dl-btn');
    const pwaBtn = hub.querySelector('#elfarm-pwa-install-btn');
    if (pwaDeferredPrompt && !plat.isIOS) {
      pwaBtn.textContent = 'Install App Now';
    }

    smartBtn.addEventListener('click', () => {
      if (plat.isAndroid) {
        startAndroidApkDownload();
      } else {
        triggerElFarmPwaInstall(plat.isIOS ? 'ios' : undefined);
      }
    });
    pwaBtn.addEventListener('click', () => {
      triggerElFarmPwaInstall(plat.isIOS ? 'ios' : undefined);
    });

    // Handle QR scan query parameters: ?auto=1 or ?platform=android&auto=1 or ?platform=ios&auto=1
    if (!downloadHubAutoHandled) {
      downloadHubAutoHandled = true;
      const params = new URLSearchParams(window.location.search);
      const isAuto = params.get('auto') === '1';
      const reqPlat = (params.get('platform') || '').toLowerCase();
      const statusBanner = hub.querySelector('#elfarm-download-status');
      const statusText = hub.querySelector('#elfarm-download-status-text');
      const statusBtn = hub.querySelector('#elfarm-download-status-btn');

      if (isAuto || reqPlat) {
        if (reqPlat === 'android' || (isAuto && plat.isAndroid && reqPlat !== 'ios')) {
          statusText.innerHTML = '<strong>Android Detected:</strong> Downloading <code>El-Farm-Cafe-and-Resto.apk</code> automatically...';
          statusBtn.textContent = 'Download APK Again';
          statusBtn.addEventListener('click', startAndroidApkDownload);
          statusBanner.classList.add('is-visible');
          setTimeout(startAndroidApkDownload, 450);
        } else if (reqPlat === 'ios' || (isAuto && plat.isIOS)) {
          statusText.innerHTML = '<strong>iOS / Fullscreen PWA Ready:</strong> Follow the 2-tap prompt to add El Farm edge-to-edge to your Home Screen.';
          statusBtn.textContent = 'Show Install Prompt';
          statusBtn.addEventListener('click', () => triggerElFarmPwaInstall('ios'));
          statusBanner.classList.add('is-visible');
          setTimeout(() => triggerElFarmPwaInstall('ios'), 400);
        } else if (isAuto) {
          statusText.innerHTML = '<strong>Device Ready:</strong> Choose <strong>Install Web App</strong> (Edge-to-Edge PWA) or download the Android APK below.';
          statusBtn.textContent = 'Install App Now';
          statusBtn.addEventListener('click', () => triggerElFarmPwaInstall());
          statusBanner.classList.add('is-visible');
        }
      }
    }
  }

  let isApplying = false;
  function applyAllEnhancements() {
    if (isApplying) return;
    isApplying = true;
    try { injectStyles(); } catch (e) {}
    try { applySmartViewportZoomState(); } catch (e) {}
    try { ensureDownloadNavLink(); } catch (e) {}
    try { initMobileNavDrawer(); } catch (e) {}
    try { initAdaptiveHeroVideo(); } catch (e) {}
    try { lockUhdImagesAndLinks(); } catch (e) {}
    try { enhanceTextAndHours(); } catch (e) {}
    try { initNatureHeroVideoAnd3dLeaves(); } catch (e) {}
    try { initHeroRevolvingTable(); } catch (e) {}
    try { enhanceMenuSection(); } catch (e) {}
    try { enhanceBookingForm(); } catch (e) {}
    try { enhanceCustomerFacebookSlider(false); } catch (e) {}
    try { enhanceTestimonialsSection(); } catch (e) {}
    try { enhanceRestoViewsSection(); } catch (e) {}
    try { injectMiniMapSection(); } catch (e) {}
    try { initDownloadAppPage(); } catch (e) {}
    try { injectZeticuzFooter(); } catch (e) {}
    isApplying = false;
  }

  let lastScrolledState = null;
  function syncScrolledHeaderState() {
    const scrolled = (window.scrollY || window.pageYOffset || 0) > 10;
    if (scrolled !== lastScrolledState) {
      lastScrolledState = scrolled;
      document.querySelectorAll('.framer-2nqvvj-container, header.framer-atzvB').forEach((el) => {
        el.classList.toggle('is-scrolled', scrolled);
      });
    }
    const mainEl = document.getElementById('main');
    if (mainEl && mainEl.style.filter !== 'none') {
      mainEl.style.setProperty('filter', 'none', 'important');
      mainEl.style.setProperty('transform', 'none', 'important');
    }
  }

  injectStyles();
  bindGlobalNavDelegation();
  initSmartViewportZoomControl();
  initElFarmPWA();
  ensureDownloadNavLink();
  initMobileNavDrawer();
  initDownloadAppPage();
  initIntroVideo();
  syncScrolledHeaderState();
  window.addEventListener('scroll', syncScrolledHeaderState, { passive: true });
  applyAllEnhancements();

  setTimeout(applyAllEnhancements, 120);
  setTimeout(applyAllEnhancements, 420);
  setTimeout(applyAllEnhancements, 1100);

  let obsTimer = null;
  const observer = new MutationObserver(() => {
    if (isApplying) return;
    clearTimeout(obsTimer);
    obsTimer = setTimeout(applyAllEnhancements, 120);
  });
  window.addEventListener('load', () => {
    applyAllEnhancements();
    const mainEl = document.getElementById('main') || document.body;
    observer.observe(mainEl, { childList: true, subtree: true });
  });
})();`;

const encodedPayload = Buffer.from(rawEnhanceJsContent, 'utf8').toString('base64');
const protectedEnhanceJs = `/* Protected Runtime — El Farm Cafe & Restaurant · Engineered by ZETICUZ */
(function(){try{const _0xef=atob("${encodedPayload}");const _0xdec=new TextDecoder("utf-8").decode(Uint8Array.from(_0xef,c=>c.charCodeAt(0)));(new Function(_0xdec))();}catch(_e){console.error(_e);}})();\n`;

fs.writeFileSync(path.join(ROOT, 'assets/js/elfarm-enhance.js'), protectedEnhanceJs, 'utf8');
console.log('Generated protected & encoded assets/js/elfarm-enhance.js!');

// 3. Build SEO + Social OpenGraph + JSON-LD Schema + Favicon + Local Swiper Bundle Head Block
function buildSeoHeadBlock(pageTitle, pageDesc, canonicalPath) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    name: 'El Farm Cafe and Restaurant',
    alternateName: 'EL FARM CAFÉ & RESTO',
    description: pageDesc,
    url: 'https://el-farm-official.vercel.app' + canonicalPath,
    image: [
      'https://el-farm-official.vercel.app/assets/images/og-cover-elfarm.jpg?v=3',
      'https://el-farm-official.vercel.app/assets/images/favicon-192x192.png'
    ],
    telephone: '+63-917-182-9876',
    email: 'ligaya_gabriel@live.com.ph',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Sitio Nipa, Brgy. Maloong Canal',
      addressLocality: 'Lamitan City',
      addressRegion: 'Basilan',
      addressCountry: 'PH'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 6.6525,
      longitude: 122.1353
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: '09:00',
        closes: '21:00'
      }
    ],
    servesCuisine: ['Filipino', 'Basilan Heirloom Cuisine', 'Specialty Coffee', 'Ceremonial Matcha', 'Seafood'],
    priceRange: '₱45 - ₱1,599',
    sameAs: [
      'https://www.facebook.com/p/El-Farm-Cafe-and-Restaurant-61592749568852/'
    ]
  };

  const fullCanonicalUrl = 'https://el-farm-official.vercel.app' + canonicalPath;

  return `
  <title>${pageTitle}</title>
  <meta name="description" content="${pageDesc}">
  <meta name="keywords" content="El Farm Cafe and Restaurant, El Farm Lamitan, Lamitan City Basilan Restaurant, Sitio Nipa Maloong Canal, Specialty Coffee Basilan, Coconut Matcha Cloud, Tiyula Itum, Crispy Pata, Salu-Salo Bilao, Pickleball Lamitan">
  <meta name="author" content="El Farm Cafe and Restaurant">
  <meta name="robots" content="index, follow, max-image-preview:large">
  <meta name="theme-color" content="#0B1315">
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
  <meta name="apple-mobile-web-app-title" content="El Farm">
  <meta name="application-name" content="El Farm">
  <meta name="msapplication-TileColor" content="#0B1315">
  <meta name="format-detection" content="telephone=no">
  <link rel="manifest" href="./manifest.webmanifest?v=3">
  <link rel="canonical" href="${fullCanonicalUrl}">
  <link rel="icon" type="image/x-icon" href="./favicon.ico?v=2">
  <link rel="shortcut icon" type="image/x-icon" href="./favicon.ico?v=2">
  <link rel="icon" type="image/png" sizes="32x32" href="./assets/images/favicon-32x32.png?v=2">
  <link rel="icon" type="image/png" sizes="192x192" href="./assets/images/favicon-192x192.png?v=2">
  <link rel="apple-touch-icon" sizes="180x180" href="./assets/images/apple-touch-icon.png?v=2">
  <link rel="stylesheet" href="./assets/css/swiper-bundle.min.css">
  <meta property="og:type" content="restaurant">
  <meta property="og:site_name" content="El Farm Cafe and Restaurant">
  <meta property="og:locale" content="en_PH">
  <meta property="og:title" content="${pageTitle}">
  <meta property="og:description" content="${pageDesc}">
  <meta property="og:url" content="${fullCanonicalUrl}">
  <meta property="og:image" content="https://el-farm-official.vercel.app/assets/images/og-cover-elfarm.jpg?v=3">
  <meta property="og:image:secure_url" content="https://el-farm-official.vercel.app/assets/images/og-cover-elfarm.jpg?v=3">
  <meta property="og:image:type" content="image/jpeg">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:alt" content="El Farm Cafe and Restaurant in Sitio Nipa, Lamitan City, Basilan">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${pageTitle}">
  <meta name="twitter:description" content="${pageDesc}">
  <meta name="twitter:image" content="https://el-farm-official.vercel.app/assets/images/og-cover-elfarm.jpg?v=3">
  <script type="application/ld+json">${JSON.stringify(jsonLd)}</script>
`;
}

// 4. Transform all 6 HTML pages (index.html, about.html, menu.html, blog.html, download.html, contact.html)
const pageConfigs = [
  {
    raw: 'raw_index.html',
    uncageFallback: 'output_monkscrave/index.html',
    out: 'index.html',
    title: 'El Farm Cafe and Restaurant | Sanctuary Dining & Specialty Cafe in Lamitan City, Basilan',
    desc: 'Experience warm farm sanctuary dining at El Farm Cafe and Restaurant in Sitio Nipa, Lamitan City, Basilan. Enjoy handcrafted specialty coffee, ceremonial matcha, heirloom Basilan cuisine, family platter feasts, and floodlit night pickleball.',
    canonical: '/',
    withIntroVideo: true,
  },
  {
    raw: 'raw_about.html',
    uncageFallback: 'output_monkscrave_about/about.html',
    out: 'about.html',
    title: 'About Us | El Farm Cafe and Restaurant in Lamitan City, Basilan',
    desc: 'Discover the story of El Farm Cafe and Restaurant in Sitio Nipa, Brgy. Maloong Canal, Lamitan City, where serene farm hospitality meets heirloom Basilan flavors, specialty coffee, and outdoor night pickleball.',
    canonical: '/about',
    withIntroVideo: false,
  },
  {
    raw: 'raw_menu.html',
    uncageFallback: 'output_monkscrave_menu/menu.html',
    out: 'menu.html',
    title: 'Our Special Menu | El Farm Cafe and Restaurant in Lamitan City, Basilan',
    desc: 'Explore 49 handcrafted signature dishes and specialty drinks at El Farm Cafe and Restaurant, featuring Golden Crispy Pata, Seafood Feast Bilao, Coconut Matcha Cloud, Dirty Coffee, Tiyula Itum, and Sizzling Favorites.',
    canonical: '/menu',
    withIntroVideo: false,
  },
  {
    raw: 'raw_blog.html',
    uncageFallback: 'output_monkscrave_blog/blog.html',
    out: 'blog.html',
    title: 'Sanctuary & Stories | El Farm Cafe and Restaurant in Lamitan City',
    desc: 'Explore El Farm Sanctuary in Sitio Nipa, Lamitan City, featuring our hospitality team, floodlit night pickleball court, starlight garden canopies, timber cafe pavilion, and family celebration spaces.',
    canonical: '/blog',
    withIntroVideo: false,
  },
  {
    raw: 'raw_download.html',
    uncageFallback: 'output_monkscrave_contact/contact.html',
    out: 'download.html',
    title: 'Download Official App | El Farm Cafe and Restaurant',
    desc: 'Download the official El Farm Cafe and Restaurant Android app for tablets and phones or install our instant web app with quick QR scan support.',
    canonical: '/download',
    withIntroVideo: false,
  },
  {
    raw: 'raw_contact.html',
    uncageFallback: 'output_monkscrave_contact/contact.html',
    out: 'contact.html',
    title: 'Reservations & Location | El Farm Cafe and Restaurant | 0917 182 9876',
    desc: 'Visit El Farm Cafe and Restaurant in Sitio Nipa, Brgy. Maloong Canal, Lamitan City, Basilan. Open daily from 9:00 AM to 9:00 PM for table reservations, celebration platters, and night pickleball court bookings.',
    canonical: '/contact',
    withIntroVideo: false,
  },
];

for (const cfg of pageConfigs) {
  let rawPath = path.join(ROOT, 'scripts/dump', cfg.raw);
  if (!fs.existsSync(rawPath) && cfg.uncageFallback) {
    rawPath = path.join(uncageOutRoot, cfg.uncageFallback);
  }
  if (!fs.existsSync(rawPath)) continue;
  let html = fs.readFileSync(rawPath, 'utf8');

  html = applyTextReplacements(html);

  // Strip old Framer <title>, meta description, og:*, twitter:*, legacy favicon/manifest links, and viewport
  html = html.replace(/<title>[\s\S]*?<\/title>/gi, '');
  html = html.replace(/<meta\s+name="description"[^>]*>/gi, '');
  html = html.replace(/<meta\s+property="og:[^"]*"[^>]*>/gi, '');
  html = html.replace(/<meta\s+name="twitter:[^"]*"[^>]*>/gi, '');
  html = html.replace(/<link\b[^>]*rel=["'](?:icon|shortcut icon|apple-touch-icon|manifest)["'][^>]*>/gi, '');
  html = html.replace(/<link\s+rel="canonical"[^>]*>/gi, '');
  html = html.replace(
    /<meta\s+name="viewport"[^>]*>/i,
    '<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no, viewport-fit=cover">'
  );

  // Strip the floating "Free 3 Month" container, Framer badge container, and Framer telemetry script
  html = html.replace(/<div class="framer-1r0dvt3-container"[\s\S]*?<\/a><!--\/\$--><\/div>/g, '');
  html = html.replace(/<div id="__framer-badge-container">[\s\S]*?<\/div><\/a><\/div><\/div>/g, '');
  html = html.replace(/<script[^>]*src="\.\/assets\/js\/script-[^"]*"[^>]*><\/script>/gi, '');

  // Inject SEO + PWA Meta + Manifest + Favicon + Swiper CSS + OpenGraph + JSON-LD head block right after <meta name="viewport"...>
  const seoHead = buildSeoHeadBlock(cfg.title, cfg.desc, cfg.canonical);
  html = html.replace(/(<meta name="viewport"[^>]*>)/i, `$1\n${seoHead}`);

  // Pre-paint per-tab Splash Cover check + High-Priority Splash Logo Preload + Critical Anti-FOUC RWD CSS in <head>
  const splashHeadCheck = `<link rel="preload" as="image" href="./assets/images/el-splash-logo.jpg" fetchpriority="high"><link rel="preload" as="script" href="./pos/pos-widget.js?v=4"><script id="elfarm-splash-head-check">(function(){try{if(window.location.search.indexOf('posLogin=1')!==-1){sessionStorage.setItem('elfarm_intro_played','1');return;}if(!sessionStorage.getItem('elfarm_intro_played')){document.documentElement.classList.add('elfarm-intro-lock','elfarm-intro-pending');}}catch(e){document.documentElement.classList.add('elfarm-intro-lock','elfarm-intro-pending');}})();</script>`;
  const criticalRwdCss = `<style id="elfarm-critical-rwd">
    html,body{width:100%!important;max-width:100%!important;overflow-x:clip!important;overflow-y:auto!important;height:auto!important;background:#0b1315!important}
    html.elfarm-intro-lock,html.elfarm-intro-lock body{overflow:hidden!important;width:100%!important;height:100dvh!important;max-height:100dvh!important;background:#000000!important;overscroll-behavior:none!important;scrollbar-width:none!important;-ms-overflow-style:none!important}
    html.elfarm-intro-lock::-webkit-scrollbar,html.elfarm-intro-lock body::-webkit-scrollbar{display:none!important;width:0!important;height:0!important}
    html.elfarm-intro-pending::before{content:"";position:fixed;inset:0;width:100%;height:100dvh;background:#000000;z-index:2147483645;pointer-events:all}
    #main{filter:none!important;backdrop-filter:none!important;transform:none!important}
    @media (max-width:809px){[data-framer-name^="Hero Section"] .framer-yak54d{width:100%!important;max-width:100%!important}}
    [data-framer-name="Menu Section"]{overflow-x:clip!important;max-width:100%!important}
    [data-framer-name="Blog Section"] .framer-73kyao>:not(.elfarm-ds-wrapper),[data-framer-name="Blog Tab Block"]>:not(.elfarm-ds-wrapper),[data-framer-name="Blog Tab Section"] .framer-1lpg1ag,[data-framer-name="Instagram Section"] .framer-1hajl2m-container:not(.elfarm-2d-fallback-active),[data-framer-name="Instagram Section"]:has(#elfarm-scurve-gallery-wrap)>:not(#elfarm-scurve-gallery-wrap):not(.elfarm-2d-fallback-active){display:none!important;opacity:0!important;visibility:hidden!important;pointer-events:none!important}
    [data-framer-name="Blog Tab Block"],.framer-73kyao:has(.elfarm-ds-wrapper){display:block!important;width:100%!important;max-width:100%!important}
    [data-framer-name="Experience Badge"],.framer-1qu9lve{display:none!important;opacity:0!important;visibility:hidden!important;pointer-events:none!important}
    .framer-2nqvvj-container{position:fixed!important;top:0!important;left:0!important;right:0!important;width:100%!important;max-width:100%!important;z-index:120!important;opacity:1!important;visibility:visible!important;transform:none!important;isolation:isolate!important}
    .framer-2nqvvj-container::before{content:""!important;position:absolute!important;inset:0!important;z-index:-1!important;background:linear-gradient(180deg,rgba(7,13,15,0.96) 0%,rgba(11,19,21,0.92) 100%)!important;backdrop-filter:blur(16px) saturate(140%)!important;-webkit-backdrop-filter:blur(16px) saturate(140%)!important;border-bottom:1px solid rgba(239,201,164,0.24)!important;box-shadow:0 16px 36px -8px rgba(0,0,0,0.6)!important;opacity:0!important;transform:translateY(-100%)!important;transition:opacity 0.42s cubic-bezier(0.22,1,0.36,1),transform 0.46s cubic-bezier(0.22,1,0.36,1)!important;pointer-events:none!important}
    .framer-2nqvvj-container.is-scrolled::before{opacity:0.98!important;transform:translateY(0)!important;background:linear-gradient(180deg,rgba(7,13,15,0.99) 0%,rgba(11,19,21,0.97) 100%)!important}
    body:not(:has([data-framer-name^="Hero Section"])) .framer-2nqvvj-container::before{opacity:0.98!important;transform:translateY(0)!important;background:linear-gradient(180deg,rgba(7,13,15,0.99) 0%,rgba(11,19,21,0.97) 100%)!important}
    body:not(:has([data-framer-name^="Hero Section"])) .framer-2nqvvj-container.is-scrolled::before{opacity:0.98!important;transform:translateY(0)!important}
    @media (min-width:1025px){
      header.framer-atzvB,header.framer-atzvB.framer-v-1rfa6pd,header.framer-atzvB.framer-v-buob2u{padding:20px 0!important;height:auto!important;min-height:0!important;transform:none!important;transition:padding 0.38s cubic-bezier(0.22,1,0.36,1)!important}
      .framer-2nqvvj-container.is-scrolled header.framer-atzvB,header.framer-atzvB.is-scrolled{padding:12px 0!important}
      header .framer-1vd02cg,header .framer-pwnhug{transform:none!important;height:auto!important;min-height:0!important}
      header .framer-1k980me-container,header.framer-atzvB.framer-v-1rfa6pd .framer-1k980me-container,header.framer-atzvB.framer-v-buob2u .framer-1k980me-container{position:relative!important;top:auto!important;left:auto!important;right:auto!important;bottom:auto!important;width:auto!important;height:auto!important;transform:none!important;opacity:1!important;visibility:visible!important;pointer-events:auto!important;user-select:auto!important}
      header .framer-1k980me-container *,header nav.framer-wJ9c5,header nav.framer-wJ9c5 *,header .framer-fo7Wq,header .framer-fo7Wq *,header .framer-99kfy5,header [data-framer-name="Menu"],header [data-framer-name="Menu"] *{transform:none!important;will-change:auto!important}
      header nav.framer-wJ9c5>div,header [data-framer-name="Menu"]>div{position:relative!important;top:auto!important}
    }
    .framer-2nqvvj-container header,.framer-2nqvvj-container header [data-framer-name="Brand Logo"]{opacity:1!important;visibility:visible!important}
    header [data-framer-name="Primary Header"]{pointer-events:auto!important;cursor:pointer!important}
    header [data-framer-name="Primary Header"] *{pointer-events:none!important}
    header nav,header [data-framer-name="Menu"]{display:flex!important;flex-direction:row!important;flex-wrap:nowrap!important;width:auto!important;max-width:none!important}
    header nav>div,header [data-framer-name="Menu"]>div{flex:0 0 auto!important;width:auto!important;min-width:max-content!important}
    header nav a,header nav a div,header nav a p,header [data-framer-name="Menu"] a,header [data-framer-name="Menu"] a p{white-space:nowrap!important;width:auto!important;min-width:max-content!important}
    [data-framer-name^="Hero Section"],.framer-1myb8ii{width:100%!important;max-width:100%!important;margin-left:0!important;margin-right:0!important;overflow:hidden!important}
    @media (min-width:1025px){
      #elfarm-mobile-burger-btn,.framer-r826j9{display:none!important;pointer-events:none!important}
      header .framer-1g6xkw5,header [data-framer-name="Header Button"]{display:inline-flex!important;flex-direction:row!important;align-items:center!important;gap:10px!important;width:auto!important;height:auto!important;overflow:visible!important}
      header .framer-pc5vzg-container{display:inline-flex!important;align-items:center!important;height:42px!important;min-height:42px!important;max-height:42px!important}
      header [data-framer-name="Primary Header"]{height:42px!important;min-height:42px!important;max-height:42px!important;padding:0 18px!important;border-radius:2px!important;display:inline-flex!important;align-items:center!important;justify-content:center!important;box-sizing:border-box!important}
      #elfarm-pos-header-btn{pointer-events:auto!important;display:inline-flex!important;align-items:center!important;justify-content:center!important;gap:7px!important;height:42px!important;min-height:42px!important;max-height:42px!important;padding:0 15px!important;border-radius:2px!important;border:1px solid rgba(239,201,164,0.55)!important;background:rgba(11,19,21,0.78)!important;backdrop-filter:blur(10px)!important;-webkit-backdrop-filter:blur(10px)!important;color:#efc9a4!important;font-family:"Jost","Plus Jakarta Sans",sans-serif!important;font-size:12px!important;font-weight:600!important;letter-spacing:0.08em!important;text-transform:uppercase!important;white-space:nowrap!important;box-sizing:border-box!important;cursor:pointer!important}
      [data-framer-name="Menu Section"],[data-framer-name="About Banner Section"],[data-framer-name="Contact  Section"]{padding-top:max(154px,16vh)!important}
      [data-framer-name="Blog Tab Section"]{padding-top:114px!important;padding-bottom:44px!important}
      [data-framer-name="Blog Tab Section"] .framer-g1uqgj{gap:16px!important;max-width:1360px!important}
      [data-framer-name="Blog Tab Section"] .framer-pevpin,[data-framer-name="Blog Tab Section"] [data-framer-name="Title Block"]{max-width:780px!important;margin-bottom:0!important;gap:6px!important}
      [data-framer-name="Blog Tab Section"] .framer-xqdrjo,[data-framer-name="Blog Tab Section"] .framer-z5rkjv{position:relative!important;height:auto!important;transform:none!important;opacity:1!important;animation:none!important;transition:none!important}
      [data-framer-name="Blog Tab Section"] .framer-pevpin h1,[data-framer-name="Blog Tab Section"] .framer-pevpin h2,[data-framer-name="Blog Tab Section"] .framer-xqdrjo p{--framer-font-size:clamp(28px,3vw,38px)!important;--framer-line-height:1.18em!important;font-size:clamp(28px,3vw,38px)!important;line-height:1.18!important;margin:0!important}
      [data-framer-name="Blog Tab Section"] .framer-z5rkjv p{--framer-font-size:14.5px!important;--framer-line-height:1.45em!important;font-size:14.5px!important;line-height:1.45!important;margin:0!important}
    }
    @media (max-width:1024px){
      header,.framer-atzvB,.framer-2nqvvj-container{width:100%!important;max-width:100%!important;min-height:76px!important;height:auto!important;padding:0!important;display:flex!important;align-items:center!important}
      header .framer-1vd02cg{width:100%!important;max-width:100%!important;padding:14px 20px!important;margin:0!important}
      header .framer-44446i,header [data-framer-name="Brand Logo"]{width:68px!important;height:48px!important}
      header .framer-pwnhug{width:100%!important;display:flex!important;justify-content:space-between!important;align-items:center!important;padding:0!important}
      .framer-1k980me-container,.framer-1k980me-container *,header .framer-pc5vzg-container,header .framer-pc5vzg-container *,header [data-framer-name="Primary Header"],header .framer-1g6xkw5,header [data-framer-name="Header Button"],header .framer-r826j9,header .framer-r826j9 *,#elfarm-pos-header-btn{display:none!important;pointer-events:none!important}
      [data-framer-name="Menu Section"],[data-framer-name="About Banner Section"],[data-framer-name="Blog Tab Section"],[data-framer-name="Contact  Section"]{padding-top:106px!important}
      .framer-1bh56fl{flex-wrap:nowrap!important;justify-content:flex-start!important;overflow-x:auto!important;gap:8px!important;padding:2px 2px 10px!important}
    }
    @media (max-width:767px){
      .elfarm-pwb-grid{grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:11px!important}
    }
    @media (min-width:768px) and (max-width:1024px){
      .elfarm-pwb-grid{grid-template-columns:repeat(3,minmax(0,1fr))!important;gap:14px!important}
    }
    @media (min-width:1600px){
      [data-framer-name="Container"],.framer-yak54d{max-width:1480px!important;margin-left:auto!important;margin-right:auto!important}
    }
  </style>`;
  html = html.replace('</head>', `${splashHeadCheck}${criticalRwdCss}</head>`);

  // Inject Hero initial SSR dish guard (no splash overlay so page opens immediately), /menu hydration guard, or /download flash guard
  if (cfg.out === 'index.html') {
    const heroGuardCss = `<style id="elfarm-intro-critical-css">[data-framer-name="Hero Image Block"] [data-framer-name^="Image"],[data-framer-name="Hero Image Block"] > .ssr-variant:has([data-framer-name^="Image"]),.framer-c688wi [data-framer-name^="Image"],.framer-c688wi > .ssr-variant:has([data-framer-name^="Image"]),[data-framer-name="Phone Hero Image Block"] [data-framer-name^="Image"],[data-framer-name="Phone Hero Image Block"] [data-framer-name^="Leaf"],.framer-1j6fcxm,.framer-71xvpi,.framer-1qgz169,.framer-mv23c9,.framer-2bic5k,.framer-im3r88,.framer-eg25d9,.framer-1bj4dx3,.framer-vmjnap,[data-framer-name="Hero Image Block"] [data-framer-name^="Leaf"],.framer-c688wi [data-framer-name^="Leaf"],[data-framer-name="Hero Image Block"] > .ssr-variant:has([data-framer-name^="Leaf"]),.framer-c688wi > .ssr-variant:has([data-framer-name^="Leaf"]),.framer-qz7c8h,.framer-1c16luy,.framer-fcjafq,.framer-10n4q2h{display:none!important;opacity:0!important;visibility:hidden!important;pointer-events:none!important}</style>`;
    html = html.replace('</head>', `${heroGuardCss}</head>`);
  } else if (cfg.out === 'menu.html') {
    html = html.replace('</head>', '<style id="elfarm-ssr-guard">.framer-scnc0m:not(.elfarm-pwb-grid){opacity:0!important;pointer-events:none!important}</style></head>');
  } else if (cfg.out === 'download.html') {
    html = html.replace('</head>', '<style id="elfarm-download-page-guard">[data-framer-name="Contact  Section"],[data-framer-name="Contact Info Section"],[data-framer-name="Instagram Section"],#elfarm-minimap-section{display:none!important}</style></head>');
  }

  // Ensure all static <input>, <select>, and <textarea> tags in HTML have a valid autocomplete attribute
  html = html.replace(/<(input|select|textarea)\b(?![^>]*\bautocomplete=)([^>]*)>/gi, (match, tag, attrs) => {
    const lower = attrs.toLowerCase();
    let ac = 'off';
    if (lower.includes('type="email"') || lower.includes('name="email"')) ac = 'email';
    else if (lower.includes('type="tel"') || lower.includes('name="phone"')) ac = 'tel';
    else if (lower.includes('first name')) ac = 'given-name';
    else if (lower.includes('last name')) ac = 'family-name';
    else if (lower.includes('name="name"')) ac = 'name';
    return `<${tag} autocomplete="${ac}"${attrs}>`;
  });

  // Inject SSR POS LOGIN button beside VIEW MENU so both header actions paint simultaneously at the same height
  if (!html.includes('id="elfarm-pos-header-btn"')) {
    const ssrPosBtn = '<button id="elfarm-pos-header-btn" type="button" aria-label="Administrator & Staff POS Login" title="EL Farm Cafe - Staff & Admin POS Login" onclick="if(window.openElFarmPosLogin){window.openElFarmPosLogin();}else{window.location.href=\'./?posLogin=1\';}"><svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/></svg><span>POS Login</span></button>';
    html = html.replace(
      /(>VIEW MENU<\/p><\/div><\/a><!--\/\$--><\/div><!--\/\$-->)/i,
      `$1${ssrPosBtn}`
    );
  }

  // Strip srcset at build time for all replaced Framer images so lockUhdImagesAndLinks never aborts an in-flight AVIF download;
  // enforce lazy loading on hidden legacy Framer blog card images so display:none cards trigger 0 network downloads.
  const allReplacedFramerImgRe = /(?:r1buuQ3PjFpdDV70OBtJahkGk|89U3OUUG1H7iWBCxQnqp77Ullc|CpTRnnQgJsG1yUk8t8GcoKvmI|UDBAh9VKVLzkggfpg8wc0kII00c|AvBMxfABr1rynfnaeNp3UnXUFI4|CBgNiEhjs18VYIIUJ4cpwLikXc|lfILwFRnauLujF02Phxk22TB8MY|3mFckv99KkdCNazIHtCn1DjaSsM|rCIwinNRdwz0pYsm0e9Sjg1iam8|RMRNTfOzx5SKsElm7QqEhd4LSOk|tOaLCvpOcZyAWdDImLbzOTOhI|Y1yOAhXr4jJN5uIPLyBGGR7JMA|ejUa9RcHAoqxoyIcExDwLQhOyfg|2xh8WnqDGhMUrwHlrwSqLrvKI7A|1koQJbZb7xfDc5aFxDqcFJbpaQQ|wXTaZJVHaEnKDLdFV6x01YY6z6E|OuGE1AOr5ExxFgl7DC0CJoqVHQ|CPNDlK7soukGFOKHhg7ft7UfZg|mbWmer1JTp02g6LbsnpEzWidY0M|VW9jfrMKGnJvAPcIFeHDQUA44|1brzvnX6w5uxGnawGF8WYYY70I|XiDCr6H0L2pzCdbVT0MuAVtBLM|Vvys1nYJ5g2CQE6rXwycDfTNkY)/;
  const hiddenBlogImgRe = /(?:Y1yOAhXr4jJN5uIPLyBGGR7JMA|VW9jfrMKGnJvAPcIFeHDQUA44|XiDCr6H0L2pzCdbVT0MuAVtBLM|1brzvnX6w5uxGnawGF8WYYY70I|mbWmer1JTp02g6LbsnpEzWidY0M|CPNDlK7soukGFOKHhg7ft7UfZg)/;
  html = html.replace(/<img\b[^>]*>/gi, (imgTag) => {
    if (!allReplacedFramerImgRe.test(imgTag)) return imgTag;
    let cleaned = imgTag.replace(/\s+srcset="[^"]*"/gi, '');
    if (hiddenBlogImgRe.test(imgTag)) {
      cleaned = cleaned.replace(/\s+loading="[^"]*"/gi, '').replace(/<img\b/i, '<img loading="lazy" decoding="async"');
    }
    return cleaned;
  });

  // Inject local GSAP + Swiper bundle (+ QR generator on download page) + protected elfarm-enhance.js + POS Floating Login Widget right before </body>
  const qrScriptTag = cfg.out === 'download.html' ? '<script src="./assets/js/qrcode.min.js"></script>' : '';
  html = html.replace('</body>', `<script src="./assets/js/gsap.min.js"></script><script src="./assets/js/swiper-bundle.min.js"></script>${qrScriptTag}<script src="./pos/pos-widget.js?v=4"></script><script src="./assets/js/elfarm-enhance.js?v=34"></script></body>`);

  fs.writeFileSync(path.join(ROOT, cfg.out), html, 'utf8');
  console.log('Updated', cfg.out);
}
