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

// Copy the 6 SSR menu card dish images + video poster image into assets/images/
const ssrDishCopies = [
  ['public/assets/menu/crop-crispy-pata.jpg', 'assets/images/AvBMxfABr1rynfnaeNp3UnXUFI4.png'],
  ['public/assets/menu/crop-seafood-bilao-round.jpg', 'assets/images/CBgNiEhjs18VYIIUJ4cpwLikXc.png'],
  ['public/assets/menu/crop-coconut-matcha-clean.jpg', 'assets/images/lfILwFRnauLujF02Phxk22TB8MY.png'],
  ['public/assets/menu/crop-tiyula-itum.jpg', 'assets/images/Jzc1vfDXBXBHNYHAbZCWpYK6fk.png'],
  ['public/assets/menu/crop-bone-marrow-clean.jpg', 'assets/images/eP7teFsVW9rNtPP5aGnEtOrA7Qs.png'],
  ['public/assets/menu/crop-popcorn-latte.jpg', 'assets/images/D7nXQN03yxNmwK2rS610UZJ0ClA.png'],
  ['public/assets/resto-views/resto-1.jpg', 'assets/images/4WFXrcQsvuu3zgoqUQteURNLjV8.png'],
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
 * 100% Accurate Menu Offerings where EVERY card's image matches its exact title, price, and description
 * from the official El Farm menu boards and dish posters.
 */
const ACCURATE_MENU_ITEMS = [
  {
    id: 'dirty-coffee',
    name: 'Dirty Coffee (Iced Only)',
    category: 'coffee',
    priceDisplay: '₱70',
    description: 'Rich double-shot espresso poured over ice-cold creamy milk in a classic glass jar — create your own swirl.',
    cleanImage: './assets/menu/crop-dirty-coffee-clean.jpg',
  },
  {
    id: 'butter-caramel-popcorn-latte',
    name: 'Butter Caramel Popcorn Latte',
    category: 'coffee',
    priceDisplay: '₱130',
    description: 'Buttery caramel espresso latte topped with velvety whipped cream and golden caramel popcorn crunch.',
    cleanImage: './assets/menu/crop-popcorn-latte.jpg',
  },
  {
    id: 'coconut-matcha-cloud',
    name: 'Coconut Matcha Cloud',
    category: 'matcha-smoothies',
    priceDisplay: '₱140',
    description: 'Refreshing young coconut water crowned with a velvety ceremonial matcha cream cloud inside a real fresh buko shell.',
    cleanImage: './assets/menu/crop-coconut-matcha-clean.jpg',
  },
  {
    id: 'smores-smoothie',
    name: "S'mores Smoothie",
    category: 'matcha-smoothies',
    priceDisplay: '₱140',
    description: 'A decadent chocolatey smoothie blend topped with toasted marshmallows, chocolate drizzle, and graham crunch.',
    cleanImage: './assets/menu/crop-smores-smoothie.jpg',
  },
  {
    id: 'dubai-chewy-cookie-smoothie',
    name: 'Dubai Chewy Cookie Smoothie',
    category: 'matcha-smoothies',
    priceDisplay: '₱160',
    description: 'A rich dark chocolate smoothie layered with pistachio cream and topped with chewy cookie crumble and pistachio nuts.',
    cleanImage: './assets/menu/crop-dubai-cookie-smoothie.jpg',
  },
  {
    id: 'crispy-pata',
    name: 'Golden Crispy Pata',
    category: 'pork',
    priceDisplay: '₱850',
    description: 'Deep-fried whole pork knuckle with ultra-crispy golden crackling skin and tender meat, served with spiced soy-vinegar dip.',
    cleanImage: './assets/menu/crop-crispy-pata.jpg',
  },
  {
    id: 'sizzling-sisig',
    name: 'Sizzling Pork Sisig',
    category: 'pork',
    priceDisplay: '₱220',
    description: 'Savory chopped crispy pork mask and belly sizzled with onions, chili peppers, calamansi, and a fresh cracked egg on top.',
    cleanImage: './assets/menu/crop-sizzling-sisig.jpg',
  },
  {
    id: 'dinuguan',
    name: 'Special Pork Dinuguan',
    category: 'pork',
    priceDisplay: '₱150',
    description: 'Rich, savory pork stew slow-simmered in dark spiced gravy with garlic, vinegar, and whole green finger chilies.',
    cleanImage: './assets/menu/crop-dinuguan.jpg',
  },
  {
    id: 'seafood-feast-bilao',
    name: 'Seafood Feast Bilao',
    category: 'feasts',
    priceDisplay: '₱1,599',
    description: 'Bountiful coastal bilao loaded with Basilan Curacha crab, garlic butter shrimp, crispy calamares, grilled fish, steamed rice, and fresh fruits.',
    cleanImage: './assets/menu/crop-seafood-bilao-round.jpg',
  },
  {
    id: 'pinoy-favorites-bilao',
    name: 'Pinoy Favorites Bilao',
    category: 'feasts',
    priceDisplay: '₱999',
    description: 'Grilled barbecue skewers, salted duck eggs, ensalada, steamed white rice, and fresh watermelon & pineapple wedges on banana leaves.',
    cleanImage: './assets/menu/crop-pinoy-bilao.jpg',
  },
  {
    id: 'all-time-favorites-combo',
    name: 'All-Time Favorites Combo Feast',
    category: 'feasts',
    priceDisplay: '₱1,299',
    description: 'Full family feast combining a Pancit Miki Special bilao, golden Crispy Fried Chicken platter, lumpia shanghai, and hot savory soup.',
    cleanImage: './assets/menu/crop-combo-feast.jpg',
  },
  {
    id: 'chicken-pancit-miki-combo',
    name: 'Chicken & Pancit Miki Combo',
    category: 'feasts',
    priceDisplay: '₱1,199',
    description: 'Golden crispy fried chicken paired with a generous bilao of Pancit Miki Special, crispy lumpia shanghai, and hard-boiled eggs.',
    cleanImage: './assets/menu/crop-chicken-miki-combo.jpg',
  },
  {
    id: 'chicken-bilao',
    name: 'Chicken Bilao',
    category: 'feasts',
    priceDisplay: '₱749',
    description: 'Crispy golden fried chicken pieces surrounded by airy prawn crackers (kropek) and served with house gravy and dipping sauces.',
    cleanImage: './assets/menu/crop-chicken-bilao.jpg',
  },
  {
    id: 'pancit-miki-bilao',
    name: 'Pancit Miki Special Bilao',
    category: 'feasts',
    priceDisplay: '₱500',
    description: 'Stir-fried heirloom Basilan miki noodles topped with savory meats, vegetables, crispy lumpia shanghai, and sliced boiled eggs.',
    cleanImage: './assets/menu/crop-pancit-miki-clean.jpg',
  },
  {
    id: 'tiyula-itum',
    name: 'Tiyula Itum (Beef)',
    category: 'non-pork',
    priceDisplay: '₱220',
    description: "Basilan's iconic black beef soup slow-cooked with toasted coconut flesh, lemongrass, galangal, ginger, and aromatic spices.",
    cleanImage: './assets/menu/crop-tiyula-itum.jpg',
  },
  {
    id: 'chicken-kaliya',
    name: 'Chicken Kaliya',
    category: 'non-pork',
    priceDisplay: '₱350',
    description: 'Traditional festive chicken stew simmered in rich golden turmeric, toasted coconut, Piper retrofractum (paminta), and native herbs.',
    cleanImage: './assets/menu/crop-chicken-kaliya.jpg',
  },
  {
    id: 'native-chicken-tinola',
    name: 'Native Chicken Tinola',
    category: 'non-pork',
    priceDisplay: '₱350',
    description: 'Free-range native chicken slow-simmered in fragrant ginger and lemongrass broth with green papaya wedges and fresh chili leaves.',
    cleanImage: './assets/menu/crop-tinola-clean.jpg',
  },
  {
    id: 'karekareng-hito',
    name: 'Kare-Kareng Hito',
    category: 'non-pork',
    priceDisplay: '₱300',
    description: 'Crispy whole freshwater catfish ladled with thick, savory roasted peanut kare-kare sauce, eggplant, string beans, and pechay.',
    cleanImage: './assets/menu/crop-karekare-hito.jpg',
  },
  {
    id: 'crispy-fried-hito',
    name: 'Crispy Fried Hito',
    category: 'non-pork',
    priceDisplay: '₱250',
    description: 'Whole fresh hito (catfish) deep-fried until golden and crackling, served with spiced vinegar and soy-calamansi dip.',
    cleanImage: './assets/menu/crop-crispy-hito.jpg',
  },
  {
    id: 'kambing-papaitan',
    name: 'Kambing Papaitan',
    category: 'non-pork',
    priceDisplay: '₱250',
    description: 'Tender goat meat and innards simmered in a bold, citrusy ginger-garlic broth with green finger chilies.',
    cleanImage: './assets/menu/crop-papaitan.jpg',
  },
  {
    id: 'adobing',
    name: 'Adobing (Goat Adobo)',
    category: 'non-pork',
    priceDisplay: '₱250',
    description: 'Succulent goat meat slow-braised until fork-tender in soy sauce, cane vinegar, crushed garlic, bay leaves, and black peppercorns.',
    cleanImage: './assets/menu/crop-adobing.jpg',
  },
  {
    id: 'chicken-sisig',
    name: 'Sizzling Chicken Sisig',
    category: 'non-pork',
    priceDisplay: '₱200',
    description: 'Finely chopped grilled chicken breast and thigh tossed with red onions, chili, calamansi, and creamy house dressing on a cast-iron plate.',
    cleanImage: './assets/menu/crop-chicken-sisig.jpg',
  },
  {
    id: 'bangus-sisig',
    name: 'Sizzling Bangus Sisig',
    category: 'non-pork',
    priceDisplay: '₱200',
    description: 'Flaked crispy golden milkfish (bangus) belly sizzled with diced onions, ginger, finger chilies, and fresh calamansi juice.',
    cleanImage: './assets/menu/crop-bangus-sisig.jpg',
  },
  {
    id: 'putok-batok-goto',
    name: 'Putok Batok Bone Marrow Goto',
    category: 'everyday',
    priceDisplay: '₱150',
    description: 'Velvety ginger-infused rice porridge crowned with a whole torched beef bone marrow canoe, toasted garlic, and spring onions.',
    cleanImage: './assets/menu/crop-bone-marrow-clean.jpg',
  },
  {
    id: 'goto-overload',
    name: 'Goto Overload',
    category: 'everyday',
    priceDisplay: '₱120',
    description: 'Hearty lugaw rice porridge topped with tender beef tripe, hard-boiled egg, crispy garlic bits, scallions, and calamansi.',
    cleanImage: './assets/menu/crop-goto-overload.jpg',
  },
  {
    id: 'sisig-silog',
    name: 'Sisig Silog',
    category: 'everyday',
    priceDisplay: '₱150',
    description: 'Solo serving of our signature crispy pork sisig paired with golden garlic fried rice and a sunny-side-up egg.',
    cleanImage: './assets/menu/crop-sisigsilog.jpg',
  },
  {
    id: 'tapsilog',
    name: 'Beef Tapsilog',
    category: 'everyday',
    priceDisplay: '₱120',
    description: 'Sweet-savory marinated beef tapa pan-seared to perfection and served with garlic sinangag rice and a fried egg.',
    cleanImage: './assets/menu/crop-tapsilog.jpg',
  },
  {
    id: 'hotsilog',
    name: 'Classic Hotsilog',
    category: 'everyday',
    priceDisplay: '₱100',
    description: 'Two plump, juicy red hotdogs scored and pan-fried, served alongside golden garlic fried rice and a sunny-side-up egg.',
    cleanImage: './assets/menu/crop-hotsilog.jpg',
  },
  {
    id: 'samyang-wrap',
    name: 'Spicy Samyang Wrap',
    category: 'everyday',
    priceDisplay: '₱130',
    description: 'Fiery Korean Samyang buldak noodles, melted cheese, and savory meat wrapped inside a warm, crisp-toasted flour tortilla.',
    cleanImage: './assets/menu/crop-samyang-wrap.jpg',
  },
  {
    id: 'brownie-cupcakes',
    name: 'Fudgy Brownie Cupcakes',
    category: 'snacks-desserts',
    priceDisplay: '₱45',
    description: 'Rich, fudgy dark-chocolate brownie cupcakes with a crinkly top, studded with chocolate chips and festive sprinkles.',
    cleanImage: './assets/menu/dish-brownie-cupcakes.jpg',
  },
  {
    id: 'coffee-classics-menu',
    name: 'Coffee Classics & Lattes',
    category: 'coffee',
    priceDisplay: '₱50 – ₱120',
    description: 'Americano ₱50 · Dirty Coffee ₱70 · Lamitan Sunrise ₱95 · Spanish Latte ₱100 · Salted Caramel ₱100 · Honeycomb ₱110 · Biscoff ₱120.',
    cleanImage: './assets/menu/crop-menu-coffee-list.jpg',
  },
  {
    id: 'matcha-hojicha-menu',
    name: 'Matcha & Hojicha Collection',
    category: 'matcha-smoothies',
    priceDisplay: '₱110 – ₱140',
    description: 'Matcha Latte ₱110 · Hojicha Latte ₱110 · Hojicha Earl Grey Latte ₱120 · Coconut Matcha Cloud ₱140 · EL Special Matcha (Dunya) ₱140.',
    cleanImage: './assets/menu/crop-menu-matcha-list.jpg',
  },
  {
    id: 'yoghurt-refreshers-menu',
    name: 'Non-Caffeinated Yoghurt Drinks',
    category: 'matcha-smoothies',
    priceDisplay: '₱85',
    description: 'Creamy probiotic yoghurt fruit refreshers available in Mulberry Yoghurt Drink (₱85), Blueberry Yoghurt Drink (₱85), and Strawberry Yoghurt Drink (₱85).',
    cleanImage: './assets/menu/crop-menu-yoghurt-list.jpg',
  },
  {
    id: 'barkada-snacks-menu',
    name: 'Chix N Fries & Barkadahan',
    category: 'snacks-desserts',
    priceDisplay: '₱120 – ₱220',
    description: 'Chix N Fries (crispy chicken bites & fries) ₱120 · Crispy Calamares ₱150 · Barkadahan Special platter (for 3–4 pax) ₱220.',
    cleanImage: './assets/menu/crop-menu-snacks-list.jpg',
  },
  {
    id: 'local-favorites-menu',
    name: 'Saging Con Ginamus & Kamanting',
    category: 'snacks-desserts',
    priceDisplay: '₱90 – ₱120',
    description: 'Saging Con Ginamus (sweet saba bananas with traditional fermented fish dip) ₱90 · Kamanting Con Haleya (cassava with caramelized coconut) ₱120.',
    cleanImage: './assets/menu/crop-menu-local-favs-list.jpg',
  },
];

// Text & URL replacements for all 5 pages (Home, About, Menu, Blog, Contact) and JS/MJS bundles
const TEXT_REPLACEMENTS = [
  ['https://framerusercontent.com./assets/If6WM6ewOJhlLv6hDT9NyusyTlc.mp4', './assets/video/intro.mp4'],
  ['https://framerusercontent.com/assets/If6WM6ewOJhlLv6hDT9NyusyTlc.mp4', './assets/video/intro.mp4'],
  ['Monks Crave', 'El Farm Cafe & Resto'],
  ['Where Cravings Meet Their Perfect Match', 'Where Farm Charm Meets Culinary Bliss'],
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
  [
    "I absolutely loved the avocado toast with a poached egg! The quality of the ingredients and the attention to detail in the preparation made it a standout dish. I'm looking forward to my next visit for another round!",
    'Malayo man kami, sulit naman ang dayo! From the Coconut Matcha Cloud served in a real buko shell to the Seafood Feast Bilao and Sizzling Sisig, every dish at El Farm is worth the trip to Sitio Nipa!'
  ],
  ['Jessier Robak.', 'Doc Mika & CHO LGU'],
  ['Jessier Robak', 'Doc Mika & CHO LGU'],
  ['Alonso D. Dowson', 'LCEA Pickleball Club'],
  ['Kristin Watson', 'Calugusan Elem. Faculty'],
  ['Food Enthusiast', 'Verified El Farm Guests'],
  [
    'The food was absolutely delicious, and the service was excellent! The ambiance was perfect, and everything was fresh. Highly recommend this restaurant for a great dining experience!',
    'Playing night pickleball under the coconut palms and then sharing a Salu-Salo Bilao and iced Dirty Coffee with the whole squad makes El Farm our favorite hangout spot in Lamitan City!'
  ],
  [
    "Amazing food, friendly staff, and a cozy atmosphere! Everything was fresh, flavorful, and beautifully presented. Definitely one of the best dining experiences I've had—highly recommend!",
    'The starlight garden tents, warm string lights, and attentive staff made our faculty celebration so memorable. Their Native Chicken Tinola, Tiyula Itum, and Crispy Pata are unmatched!'
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

// Build native 16-card Framer Ticker slots for chunk-PGQRPBE7 (Desktop & Mobile) so all 16 customer photos loop edge-to-edge natively
function upgradeFramerTickerChunk(code) {
  const fbUrl = 'https://www.facebook.com/p/El-Farm-Cafe-and-Restaurant-61592749568852/';
  const desktopSlots = Array.from({ length: 16 }, (_, idx) => {
    const n = idx + 1;
    const pad = String(n).padStart(2, '0');
    const imgUrl = `./assets/images/customer-hd-${n}.webp`;
    return `o(A,{height:533,width:"400px",children:o(D,{className:"framer-1u6d0st-container","data-framer-name":"Social Large Card ${pad}",inComponentSlot:!0,layoutDependency:y,layoutId:"custLarge${pad}-container",name:"Social Large Card ${pad}",nodeId:"custLarge${pad}",rendersWithMotion:!0,scopeId:"Rxi6dnftz",children:o(R,{height:"100%",i42BfbWBP:j({pixelHeight:1600,pixelWidth:1200,src:"${imgUrl}",srcSet:"${imgUrl} 1200w"},"El Farm Guests ${pad}"),id:"custLarge${pad}",layoutId:"custLarge${pad}",name:"Social Large Card ${pad}",OmgFZsd3A:"${fbUrl}",style:{height:"100%",width:"100%"},variant:"DjGSxOeTQ",width:"100%"})})})`;
  }).join(',');

  const phoneSlots = Array.from({ length: 16 }, (_, idx) => {
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

// 1. Restore clean .framercms binary files and transform all .js / .mjs files in assets/js
const jsDir = path.join(ROOT, 'assets/js');
const rawJsBackupDir = path.join(ROOT, 'scripts/dump/raw_js');
const uncageOutRoot = 'C:/Users/ZETICUZ/.gemini/antigravity/scratch/ZE-Uncage/output';
const uncageDirs = [
  'output_monkscrave',
  'output_monkscrave_menu',
  'output_monkscrave_about',
  'output_monkscrave_blog',
  'output_monkscrave_contact',
].map(d => path.join(uncageOutRoot, d, 'assets/js'));

for (const srcDir of uncageDirs) {
  if (fs.existsSync(srcDir)) {
    for (const f of fs.readdirSync(srcDir)) {
      if (f.endsWith('.framercms')) {
        fs.copyFileSync(path.join(srcDir, f), path.join(jsDir, f));
      } else if ((f.endsWith('.js') || f.endsWith('.mjs')) && !fs.existsSync(path.join(rawJsBackupDir, f))) {
        fs.copyFileSync(path.join(srcDir, f), path.join(rawJsBackupDir, f));
      }
    }
  }
}

for (const f of fs.readdirSync(rawJsBackupDir)) {
  if (f.endsWith('.js') || f.endsWith('.mjs')) {
    let rawContent = fs.readFileSync(path.join(rawJsBackupDir, f), 'utf8');
    let updated = applyTextReplacements(rawContent);
    if (f.startsWith('chunk-PGQRPBE7')) {
      updated = upgradeFramerTickerChunk(updated);
    }
    // Strip sourceMappingURL comments for code security
    updated = updated.replace(/\/\/# sourceMappingURL=.*$/gm, '');
    fs.writeFileSync(path.join(jsDir, f), updated, 'utf8');
  }
}
console.log('Updated all JS/MJS bundles and restored binary FRAMERCMS files in assets/js!');

// 2. Generate Protected & Obfuscated assets/js/elfarm-enhance.js
const rawEnhanceJsContent = `(function () {
  const RESTO = ${JSON.stringify(restoData.restaurant)};
  const MENU_ITEMS = ${JSON.stringify(ACCURATE_MENU_ITEMS)};

  const ITEM_BY_ID = {};
  MENU_ITEMS.forEach(item => { ITEM_BY_ID[item.id] = item; });
  function pickItems(ids) {
    return ids.map(id => ITEM_BY_ID[id]).filter(Boolean);
  }

  // Home Page (/): Single line of 3 signature items
  const HOME_SINGLE_LINE_ITEMS = pickItems([
    'crispy-pata',
    'seafood-feast-bilao',
    'coconut-matcha-cloud'
  ]);

  // Menu Page (/menu): 5 Organized Top Selection Tabs (2 lines = 6 cards initially, +1 last line = 9 cards on LOAD MORE MENU)
  const MENU_PAGE_TABS = [
    {
      id: 'all-menu',
      label: 'All Menu',
      items: pickItems([
        'crispy-pata',
        'seafood-feast-bilao',
        'coconut-matcha-cloud',
        'tiyula-itum',
        'putok-batok-goto',
        'butter-caramel-popcorn-latte',
        'dirty-coffee',
        'native-chicken-tinola',
        'sizzling-sisig'
      ])
    },
    {
      id: 'beverages',
      label: 'Beverages / Drinks',
      items: pickItems([
        'dirty-coffee',
        'butter-caramel-popcorn-latte',
        'coconut-matcha-cloud',
        'smores-smoothie',
        'dubai-chewy-cookie-smoothie',
        'coffee-classics-menu',
        'matcha-hojicha-menu',
        'yoghurt-refreshers-menu',
        'brownie-cupcakes'
      ])
    },
    {
      id: 'desserts',
      label: 'Desserts',
      items: pickItems([
        'brownie-cupcakes',
        'smores-smoothie',
        'dubai-chewy-cookie-smoothie',
        'butter-caramel-popcorn-latte',
        'coconut-matcha-cloud',
        'yoghurt-refreshers-menu',
        'local-favorites-menu',
        'matcha-hojicha-menu',
        'dirty-coffee'
      ])
    },
    {
      id: 'main-courses',
      label: 'Main Courses',
      items: pickItems([
        'crispy-pata',
        'tiyula-itum',
        'chicken-kaliya',
        'native-chicken-tinola',
        'karekareng-hito',
        'crispy-fried-hito',
        'kambing-papaitan',
        'adobing',
        'dinuguan'
      ])
    },
    {
      id: 'appetizers',
      label: 'Appetizers',
      items: pickItems([
        'sizzling-sisig',
        'chicken-sisig',
        'bangus-sisig',
        'barkada-snacks-menu',
        'samyang-wrap',
        'putok-batok-goto',
        'seafood-feast-bilao',
        'pinoy-favorites-bilao',
        'pancit-miki-bilao'
      ])
    }
  ];

  let activeMenuTab = 'all-menu';
  let menuLinesShown = 2;

  // Replay Framer Hero 3-Plate, Leaf & Copy Entrance Animations cleanly once the Intro Video reveals the page
  function replayHeroEntranceAnimations() {
    if (window.__elfarmHeroAnimated) return;
    window.__elfarmHeroAnimated = true;

    try {
      if (typeof window.__elfarmRunFramerAppear === 'function') {
        window.__elfarmRunFramerAppear();
      }
    } catch (e) {}

    const specs = [
      { sel: '[data-framer-appear-id="sk9zdg"], .framer-sk9zdg', prefix: '', ix: -65, iy: 0, rot: 0, scale: 0.96, delay: 140, duration: 950 },
      { sel: '[data-framer-appear-id="71xvpi"], .framer-71xvpi', prefix: 'translateX(-50%) ', ix: 95, iy: -95, rot: 22, scale: 0.86, delay: 180, duration: 1100 },
      { sel: '[data-framer-appear-id="1j6fcxm"], .framer-1j6fcxm', prefix: 'translate(-50%, -50%) ', ix: 110, iy: 0, rot: 20, scale: 0.86, delay: 260, duration: 1050 },
      { sel: '[data-framer-appear-id="1qgz169"], .framer-1qgz169', prefix: '', ix: 0, iy: 190, rot: -20, scale: 0.86, delay: 320, duration: 1100 },
      { sel: '[data-framer-appear-id="qz7c8h"], .framer-qz7c8h', prefix: 'translateX(-50%) ', ix: 20, iy: -150, rot: -28, scale: 0.8, delay: 420, duration: 950, finalRot: 30 },
      { sel: '[data-framer-appear-id="1c16luy"], .framer-1c16luy', prefix: 'translate(-50%, -50%) ', ix: 20, iy: -150, rot: -28, scale: 0.8, delay: 440, duration: 950, finalRot: -75 },
      { sel: '[data-framer-appear-id="fcjafq"], .framer-fcjafq', prefix: 'translateX(-50%) ', ix: 20, iy: -150, rot: -28, scale: 0.8, delay: 460, duration: 950, finalRot: 30 },
      { sel: '[data-framer-appear-id="10n4q2h"], .framer-10n4q2h', prefix: 'translate(-50%, -50%) ', ix: 20, iy: -150, rot: 28, scale: 0.8, delay: 480, duration: 950, finalRot: -30 }
    ];

    const vw = window.innerWidth || 1280;
    const isTablet = vw >= 810 && vw <= 1199;
    const isMobile = vw < 810;

    specs.forEach(s => {
      const el = document.querySelector(s.sel);
      if (!el || typeof el.animate !== 'function') return;

      // Cancel any prior early appear WAAPI animations before replaying
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

  // Setup Full-Viewport Intro Animation Video on Landing Page (index.html) — Plays Once Per Tab Session
  function initIntroVideo() {
    const overlay = document.getElementById('elfarm-intro-overlay');
    const video = document.getElementById('elfarm-intro-video');

    const params = new URLSearchParams(window.location.search);
    const alreadyPlayed = !!window.__elfarmSkipIntro || sessionStorage.getItem('elfarm_intro_played') === '1' || params.get('skipIntro') === '1';

    if (alreadyPlayed) {
      document.documentElement.classList.remove('elfarm-intro-lock');
      document.documentElement.classList.add('elfarm-intro-reveal');
      if (overlay && overlay.parentNode) overlay.remove();
      return;
    }

    if (!overlay || !video) {
      document.documentElement.classList.remove('elfarm-intro-lock');
      document.documentElement.classList.add('elfarm-intro-reveal');
      return;
    }

    // Mark tab session as having played the intro so F5 / page reload in same tab skips it,
    // while opening a new browser tab or different browser plays it once again.
    try {
      sessionStorage.setItem('elfarm_intro_played', '1');
    } catch (e) {}

    let revealed = false;
    function revealMainSite() {
      if (revealed) return;
      revealed = true;
      try { sessionStorage.setItem('elfarm_intro_played', '1'); } catch (e) {}
      document.documentElement.classList.remove('elfarm-intro-lock');
      document.documentElement.classList.add('elfarm-intro-reveal');
      overlay.classList.add('elfarm-intro-fadeout');
      replayHeroEntranceAnimations();
      setTimeout(() => {
        if (overlay.parentNode) overlay.remove();
      }, 1150);
    }

    video.addEventListener('ended', revealMainSite);
    video.addEventListener('error', revealMainSite);

    // Ensure playback starts smoothly
    const playPromise = video.play();
    if (playPromise && typeof playPromise.catch === 'function') {
      playPromise.catch(() => {
        revealMainSite();
      });
    }

    // Fallback safety timer if video is unusually long or stalled
    setTimeout(revealMainSite, 18000);
  }

  // Corporate Security & Anti-Inspection Shield (Active for visitors; allows automated QA verification)
  function initSecurityShield() {
    document.querySelectorAll('img, video').forEach(el => {
      el.setAttribute('draggable', 'false');
    });

    if (navigator.webdriver) return;

    document.addEventListener('contextmenu', (e) => {
      e.preventDefault();
    });

    document.addEventListener('dragstart', (e) => {
      if (e.target && (e.target.tagName === 'IMG' || e.target.tagName === 'VIDEO')) {
        e.preventDefault();
      }
    });

    document.addEventListener('keydown', (e) => {
      const k = (e.key || '').toUpperCase();
      if (
        e.key === 'F12' ||
        (e.ctrlKey && e.shiftKey && (k === 'I' || k === 'J' || k === 'C')) ||
        (e.ctrlKey && (k === 'U' || k === 'S'))
      ) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
    }, true);

    try {
      console.clear();
      console.log(
        '%c🔒 PROTECTED SYSTEM — EL FARM CAFE & RESTAURANT',
        'color:#EFC9A4;background:#0B1315;font-size:16px;font-weight:bold;padding:10px 16px;border:1px solid #EFC9A4;'
      );
      console.log(
        '%cThis website and its source architecture are protected intellectual property. Unauthorized copying or reverse engineering is strictly prohibited.',
        'color:#C8C9CB;font-size:12px;'
      );
    } catch (_) {}
  }

  function injectStyles() {
    if (document.getElementById('elfarm-framer-styles')) return;
    const style = document.createElement('style');
    style.id = 'elfarm-framer-styles';
    style.textContent = \`
      /* Intro Video Fullscreen Lock (Zero Scrollbar while Intro Plays) */
      html.elfarm-intro-lock,
      html.elfarm-intro-lock body {
        overflow: hidden !important;
        height: 100vh !important;
        scrollbar-width: none !important;
        -ms-overflow-style: none !important;
      }
      html.elfarm-intro-lock::-webkit-scrollbar,
      html.elfarm-intro-lock body::-webkit-scrollbar {
        display: none !important;
        width: 0 !important;
        height: 0 !important;
      }
      html.elfarm-intro-lock #main {
        opacity: 0 !important;
        filter: brightness(0.12) !important;
      }
      html.elfarm-intro-reveal #main {
        opacity: 1 !important;
        filter: brightness(1) !important;
        transition: opacity 1.15s cubic-bezier(0.22, 1, 0.36, 1), filter 1.25s cubic-bezier(0.22, 1, 0.36, 1) !important;
      }
      #elfarm-intro-overlay {
        position: fixed !important;
        inset: 0 !important;
        width: 100vw !important;
        height: 100vh !important;
        background: #070d0f !important;
        z-index: 2147483646 !important;
        overflow: hidden !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        opacity: 1;
        visibility: visible;
        transition: opacity 1.05s cubic-bezier(0.22, 1, 0.36, 1), visibility 1.05s ease;
      }
      #elfarm-intro-overlay.elfarm-intro-fadeout {
        opacity: 0 !important;
        visibility: hidden !important;
        pointer-events: none !important;
      }
      #elfarm-intro-video {
        width: 100vw !important;
        height: 100vh !important;
        object-fit: cover !important;
        display: block !important;
        pointer-events: none !important;
      }

      /* Permanently Hide Framer Promo Badges & Gift Voucher Floating Pill */
      #__framer-badge-container,
      [data-framer-name="Badge"],
      [data-framer-name="Free 3 Month"],
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

      /* Asset & Image Protection */
      img, video {
        -webkit-user-drag: none;
        user-select: none;
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

      /* Header VIEW MENU CTA Button Shimmer & Hover Lift */
      header .framer-1g6xkw5 a {
        position: relative !important;
        overflow: hidden !important;
        transition: transform 0.32s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.32s ease !important;
      }
      header .framer-1g6xkw5 a::after {
        content: '' !important;
        position: absolute !important;
        top: 0 !important;
        left: -120% !important;
        width: 70% !important;
        height: 100% !important;
        background: linear-gradient(120deg, transparent, rgba(255,255,255,0.45), transparent) !important;
        transform: skewX(-20deg) !important;
        transition: left 0.6s cubic-bezier(0.22, 1, 0.36, 1) !important;
        pointer-events: none !important;
      }
      header .framer-1g6xkw5 a:hover {
        transform: translateY(-2px) scale(1.03) !important;
        box-shadow: 0 10px 28px rgba(239, 201, 164, 0.28) !important;
      }
      header .framer-1g6xkw5 a:hover::after {
        left: 140% !important;
      }

      /* Header Brand Logo Subtle Glow on Hover */
      header [data-framer-name="Brand Logo"],
      header [data-framer-name="Logo"] {
        transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1), filter 0.35s ease !important;
      }
      header [data-framer-name="Brand Logo"]:hover,
      header [data-framer-name="Logo"]:hover {
        transform: scale(1.05) !important;
        filter: drop-shadow(0 0 14px rgba(239, 201, 164, 0.35)) !important;
      }

      /* Hero 3 Circular Dish Plates Subtle Interactive Hover */
      .framer-1j6fcxm img,
      .framer-71xvpi img,
      .framer-1qgz169 img {
        transition: transform 0.55s cubic-bezier(0.22, 1, 0.36, 1), filter 0.55s ease !important;
      }
      .framer-1j6fcxm:hover img,
      .framer-71xvpi:hover img,
      .framer-1qgz169:hover img {
        transform: scale(1.04) rotate(2deg) !important;
        filter: drop-shadow(0 18px 34px rgba(239, 201, 164, 0.2)) brightness(1.04) !important;
      }

      /* Native Top Menu Selection Bar (.framer-1bh56fl) Hover & Layout */
      .framer-1bh56fl {
        display: flex !important;
        flex-direction: row !important;
        flex-wrap: wrap !important;
        justify-content: center !important;
        align-items: center !important;
        gap: 24px !important;
        width: 100% !important;
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

      /* Native Load More Menu Button (.framer-18lurl8) Hover */
      .framer-18lurl8 {
        grid-column: 1 / -1 !important;
        display: flex !important;
        justify-content: center !important;
        align-items: center !important;
        padding-top: 32px !important;
        width: 100% !important;
      }
      .elfarm-load-more-btn {
        cursor: pointer !important;
        transition: all 0.28s ease !important;
      }
      .elfarm-load-more-btn:hover {
        background-color: rgb(239, 201, 164) !important;
      }
      .elfarm-load-more-btn:hover p {
        color: rgb(15, 29, 34) !important;
      }

      /* Native Framer Menu Card Hover Interactions */
      .elfarm-menu-card-wrap {
        opacity: 1 !important;
        transform: none !important;
        transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1);
      }
      .elfarm-menu-card {
        cursor: pointer;
        text-decoration: none !important;
      }
      .elfarm-menu-card .framer-1ubtzqs img {
        transition: transform 0.55s cubic-bezier(0.22, 1, 0.36, 1) !important;
      }
      .elfarm-menu-card:hover .framer-1ubtzqs img {
        transform: scale(1.07) !important;
      }
      .elfarm-menu-card .elfarm-hover-overlay {
        opacity: 0 !important;
        transition: opacity 0.35s ease !important;
      }
      .elfarm-menu-card:hover .elfarm-hover-overlay {
        opacity: 1 !important;
      }
      .elfarm-menu-card .elfarm-hover-btn {
        opacity: 0 !important;
        transform: translate(-50%, -50%) scale(0.88) !important;
        transition: all 0.35s cubic-bezier(0.22, 1, 0.36, 1) !important;
        z-index: 4 !important;
      }
      .elfarm-menu-card:hover .elfarm-hover-btn {
        opacity: 1 !important;
        transform: translate(-50%, -50%) scale(1) !important;
      }

      /* Interactive Sanctuary Mini-Map Section (Framer Dark/Gold Aesthetic) */
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
      .elfarm-minimap-frame-box {
        position: relative;
        min-height: 390px;
        width: 100%;
        height: 100%;
        background: rgb(15, 29, 34);
      }
      .elfarm-minimap-frame-box iframe {
        width: 100%;
        height: 100%;
        min-height: 390px;
        border: 0;
        display: block;
        filter: contrast(1.04) saturate(0.95);
      }
      .elfarm-minimap-badge {
        position: absolute;
        bottom: 16px;
        left: 16px;
        background: rgba(11, 19, 21, 0.92);
        border: 1px solid rgba(239, 201, 164, 0.45);
        color: rgb(239, 201, 164);
        padding: 8px 14px;
        font-family: "Jost", sans-serif;
        font-size: 12.5px;
        font-weight: 500;
        letter-spacing: 0.04em;
        pointer-events: none;
        backdrop-filter: blur(8px);
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
        width: 22px;
        height: 22px;
        object-fit: contain;
      }
    \`;
    document.head.appendChild(style);
  }

  function buildFramerMenuCard(item) {
    return \`
      <div class="framer-11pmxu5-container framer-6x59lj-container elfarm-menu-card-wrap" data-dish-id="\${item.id}">
        <a class="framer-7GUPI framer-YB3pM framer-WNUwg framer-y8PII framer-lmsbje framer-v-lmsbje framer-uflrhs elfarm-menu-card"
           data-framer-name="Default"
           style="height: 100%; width: 100%; opacity: 1;"
           href="#contact-section"
           data-dish-name="\${item.name.replace(/"/g, '&quot;')}">
          <div class="framer-5627qk" data-framer-name="Card Image Wrap" style="opacity: 1;">
            <div class="framer-vk0iam elfarm-hover-btn" data-border="true" data-framer-name="Button / Fill"
                 style="--border-bottom-width: 2px; --border-color: rgb(239, 201, 164); --border-left-width: 2px; --border-right-width: 2px; --border-style: solid; --border-top-width: 2px; background-color: rgb(15, 29, 34);">
              <div class="framer-1dopkde" data-framer-name="Text"
                   style="outline: none; display: flex; flex-direction: column; justify-content: center; flex-shrink: 0; --extracted-r6o4lv: rgb(239, 201, 164); --framer-paragraph-spacing: 0px;">
                <p class="framer-text framer-styles-preset-9j9dpn" data-styles-preset="yxFueAAVc"
                   style="--framer-text-color: rgb(239, 201, 164);">Book A table</p>
              </div>
            </div>
            <div class="framer-1d0lgqf elfarm-hover-overlay" data-framer-name="Overlay"
                 style="background-color: rgba(0, 0, 0, 0.3);"></div>
            <div class="framer-1ubtzqs" data-framer-name="Card Image" style="transform: none; opacity: 1;">
              <div style="position:absolute;border-radius:inherit;top:0;right:0;bottom:0;left:0" data-framer-background-image-wrapper="true">
                <img decoding="async" width="900" height="900"
                     src="\${item.cleanImage}"
                     alt="\${item.name.replace(/"/g, '&quot;')}"
                     style="display:block;width:100%;height:100%;border-radius:inherit;object-position:center;object-fit:cover">
              </div>
            </div>
          </div>
          <div class="framer-1gqo5lg" data-framer-name="Card Body" style="opacity: 1;">
            <div class="framer-ros6jk" data-framer-name="Name & price Stack" style="opacity: 1;">
              <div class="framer-187g6ak" data-framer-name="Name Wrap" style="opacity: 1;">
                <div class="framer-k6kboe" style="outline: none; display: flex; flex-direction: column; justify-content: flex-start; flex-shrink: 0; --extracted-tcooor: rgb(239, 201, 164);">
                  <div class="framer-text framer-styles-preset-q3qcf4" data-styles-preset="BVe6GicAa"
                       style="--framer-text-color: rgb(239, 201, 164);">\${item.name}</div>
                </div>
              </div>
              <div class="framer-1x8bcjy" data-framer-name="Price" style="outline: none; display: flex; flex-direction: column; justify-content: flex-start; flex-shrink: 0; --extracted-tcooor: rgb(239, 201, 164);">
                <div class="framer-text framer-styles-preset-q3qcf4" data-styles-preset="BVe6GicAa"
                     style="--framer-text-color: rgb(239, 201, 164);">\${item.priceDisplay}</div>
              </div>
            </div>
            <div class="framer-1f7q7kc" data-framer-name="Text" style="outline: none; display: flex; flex-direction: column; justify-content: flex-start; flex-shrink: 0; --extracted-r6o4lv: rgb(200, 201, 203);">
              <p class="framer-text framer-styles-preset-5ekdcs" data-styles-preset="cxi4lrSfx"
                 style="--framer-text-alignment:left;--framer-text-color: rgb(200, 201, 203);">\${item.description}</p>
            </div>
          </div>
        </a>
      </div>
    \`;
  }

  function buildFramerTabHtml(tab, isActive) {
    if (isActive) {
      return \`
        <a class="framer-e3j0df framer-473nq6 elfarm-native-tab" href="#\${tab.id}" data-tab-id="\${tab.id}">
          <div class="framer-3k9lo2-container" style="opacity: 1; transform: none;">
            <div class="framer-BLYYx framer-PqXh3 framer-230u22 framer-v-4pjib7" data-framer-name="Active"
                 style="background-color: var(--token-96b34807-8926-496d-91c3-acabb6da071c, rgb(239, 201, 164)); opacity: 1;">
              <div class="framer-ekexm1" data-framer-name="Bg Primary"
                   style="background-color:var(--token-96b34807-8926-496d-91c3-acabb6da071c, rgb(239, 201, 164));opacity:0"></div>
              <div class="framer-1e08qxj" data-framer-name="Text"
                   style="outline: none; display: flex; flex-direction: column; justify-content: flex-start; flex-shrink: 0; --extracted-r6o4lv: var(--token-894c2eca-09aa-4170-a81d-72c8024ac4c1, rgb(25, 25, 26)); --framer-paragraph-spacing: 0px; transform: none; opacity: 1;"
                   data-framer-component-type="RichTextContainer">
                <p class="framer-text framer-styles-preset-14j5oe9" data-styles-preset="y_SU9kuZM"
                   style="--framer-text-color:var(--extracted-r6o4lv, var(--token-894c2eca-09aa-4170-a81d-72c8024ac4c1, rgb(25, 25, 26)))">\${tab.label}</p>
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
               style="background-color: var(--token-8d0e2c7c-6408-4069-8093-58b9373172f3, rgb(15, 29, 34)); opacity: 1;">
            <div class="framer-ekexm1" data-framer-name="Bg Primary"
                 style="background-color:var(--token-96b34807-8926-496d-91c3-acabb6da071c, rgb(239, 201, 164));opacity:0"></div>
            <div class="framer-1e08qxj" data-framer-name="Text"
                 style="outline: none; display: flex; flex-direction: column; justify-content: flex-start; flex-shrink: 0; --extracted-r6o4lv: var(--token-09d52d6c-5eb9-419c-98f4-280d58d22888, rgb(160, 161, 163)); --framer-paragraph-spacing: 0px; transform: none; opacity: 1;"
                 data-framer-component-type="RichTextContainer">
              <p class="framer-text framer-styles-preset-14j5oe9" data-styles-preset="y_SU9kuZM"
                 style="--framer-text-color:var(--extracted-r6o4lv, var(--token-09d52d6c-5eb9-419c-98f4-280d58d22888, rgb(160, 161, 163)))">\${tab.label}</p>
            </div>
          </div>
        </div>
      </a>
    \`;
  }

  function buildLoadMoreButtonHtml() {
    return \`
      <div class="framer-18lurl8" id="elfarm-load-more-wrap" data-framer-name="Button Wrap" style="opacity: 1; transform: none;">
        <div class="framer-t3equx-container">
          <div class="framer-Ahm4b framer-YB3pM framer-3b08rm framer-v-3b08rm elfarm-load-more-btn"
               id="elfarm-load-more-trigger"
               data-border="true"
               data-framer-name="Default"
               data-highlight="true"
               style="--border-bottom-width: 2px; --border-color: var(--token-96b34807-8926-496d-91c3-acabb6da071c, rgb(239, 201, 164)); --border-left-width: 2px; --border-right-width: 2px; --border-style: solid; --border-top-width: 2px; background-color: var(--token-8d0e2c7c-6408-4069-8093-58b9373172f3, rgb(15, 29, 34)); opacity: 1;"
               tabindex="0"
               role="button">
            <div class="framer-xjfqhg" data-framer-name="Text"
                 style="outline: none; display: flex; flex-direction: column; justify-content: flex-start; flex-shrink: 0; --extracted-r6o4lv: var(--token-96b34807-8926-496d-91c3-acabb6da071c, rgb(239, 201, 164)); transform: none; opacity: 1;"
                 data-framer-component-type="RichTextContainer">
              <p class="framer-text framer-styles-preset-9j9dpn" data-styles-preset="yxFueAAVc"
                 style="--framer-text-color:var(--extracted-r6o4lv, var(--token-96b34807-8926-496d-91c3-acabb6da071c, rgb(239, 201, 164)))">Load More Menu</p>
            </div>
            <div class="framer-1ptwmsj" data-framer-name="Background Color"
                 style="background-color:var(--token-96b34807-8926-496d-91c3-acabb6da071c, rgb(239, 201, 164));opacity:0"></div>
          </div>
        </div>
      </div>
    \`;
  }

  function bindCardClicks(container) {
    container.querySelectorAll('.elfarm-menu-card').forEach(card => {
      card.addEventListener('click', (e) => {
        e.preventDefault();
        const contactSec = document.querySelector('[data-framer-name="Contact  Section"]') || document.querySelector('[data-framer-name*="Contact"]');
        if (contactSec) {
          contactSec.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  }

  function enhanceMenuSection() {
    const menuSection = document.querySelector('[data-framer-name="Menu Section"]');
    if (!menuSection) return;

    menuSection.querySelectorAll('.elfarm-menu-controls').forEach(el => el.remove());

    const homeGrid = menuSection.querySelector('.framer-w91vbs');
    const menuPageGrid = menuSection.querySelector('.framer-scnc0m');
    const origTabRow = menuSection.querySelector('.framer-1bh56fl');

    // CASE 1: HOME PAGE -> Single line of 3 cards
    if (homeGrid && !menuPageGrid) {
      const currentCards = homeGrid.querySelectorAll('.elfarm-menu-card-wrap');
      if (homeGrid.getAttribute('data-elfarm-state') !== 'home-1line' || currentCards.length !== 3) {
        homeGrid.innerHTML = HOME_SINGLE_LINE_ITEMS.map(buildFramerMenuCard).join('');
        homeGrid.setAttribute('data-elfarm-state', 'home-1line');
        bindCardClicks(homeGrid);
      }
      return;
    }

    // CASE 2: MENU PAGE (/menu) -> Top 5-tab Selection Bar + 2 lines (6 cards) + LOAD MORE MENU -> 3rd & last line (9 cards)
    if (menuPageGrid) {
      function renderMenuPage(force) {
        const tabObj = MENU_PAGE_TABS.find(t => t.id === activeMenuTab) || MENU_PAGE_TABS[0];
        const visibleCount = menuLinesShown * 3;
        const visibleItems = tabObj.items.slice(0, visibleCount);
        const stateKey = activeMenuTab + '-' + menuLinesShown;

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
                  menuLinesShown = 2;
                  renderMenuPage(true);
                }
              });
            });
          }
        }

        const currentCards = menuPageGrid.querySelectorAll('.elfarm-menu-card-wrap');
        if (force || menuPageGrid.getAttribute('data-elfarm-state') !== stateKey || currentCards.length !== visibleItems.length) {
          const cardsHtml = visibleItems.map(buildFramerMenuCard).join('');
          const loadMoreHtml = (menuLinesShown < 3 && tabObj.items.length > visibleCount)
            ? buildLoadMoreButtonHtml()
            : '';

          menuPageGrid.innerHTML = cardsHtml + loadMoreHtml;
          menuPageGrid.setAttribute('data-elfarm-state', stateKey);
          bindCardClicks(menuPageGrid);

          const loadMoreBtn = menuPageGrid.querySelector('#elfarm-load-more-trigger');
          if (loadMoreBtn) {
            loadMoreBtn.addEventListener('click', (e) => {
              e.preventDefault();
              e.stopPropagation();
              menuLinesShown = 3;
              renderMenuPage(true);
            });
          }
        }
      }

      renderMenuPage(false);
    }
  }

  // Inject Interactive Google Mini-Map in Contact Section so guests can easily locate & navigate to Sitio Nipa, Lamitan City
  function injectMiniMapSection() {
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
          <iframe
            title="El Farm Cafe and Restaurant Location Map — Sitio Nipa, Brgy. Maloong Canal, Lamitan City, Basilan"
            src="https://maps.google.com/maps?q=El%20Farm%20Cafe%20and%20Restaurant%20Lamitan%20City%20Basilan&t=m&z=14&output=embed&iwloc=near"
            loading="eager"
            referrerpolicy="no-referrer-when-downgrade"
            allowfullscreen>
          </iframe>
          <div class="elfarm-minimap-badge">📌 El Farm Cafe &amp; Restaurant · Sitio Nipa, Lamitan City</div>
        </div>
      </div>
    \`;
    contactSec.appendChild(mapWrap);
  }

  function keepNativeCustomerSliderClean() {
    const instaSec = document.querySelector('[data-framer-name="Instagram Section"]');
    if (!instaSec) return;
    instaSec.querySelectorAll('.elfarm-sliding-header, .elfarm-cust-caption').forEach(el => el.remove());
  }

  function enhanceRestoViewsSection() {
    const blogSec = document.querySelector('[data-framer-name="Blog Section"]') || document.querySelector('[data-framer-name="Blog Tab Section"]');
    if (!blogSec) return;

    blogSec.querySelectorAll('h1, h2, h3, p').forEach(el => {
      const t = el.textContent.trim();
      if (t === 'Culinary Insights') el.textContent = 'Explore El Farm Sanctuary';
      if (t.includes('Discover stories, tips')) {
        el.textContent = 'Tour our twilight archway, timber café pavilion, starlight garden canopies, and floodlit night pickleball court in Sitio Nipa.';
      }
      if (t === 'See All Blog') {
        el.textContent = 'Explore Sanctuary';
      }
    });

    const cards = blogSec.querySelectorAll('[data-framer-name="Image"] img');
    const featuredViews = [
      { img: './assets/images/RMRNTfOzx5SKsElm7QqEhd4LSOk-380b3b26.avif', badge: 'PICKLEBALL & RECREATION', title: 'Championship Floodlit Night Pickleball Court Under the Palms.' },
      { img: './assets/images/tOaLCvpOcZyAWdDImLbzOTOhI-3c606027.avif', badge: 'AL-FRESCO GARDEN NIGHTS', title: 'Starlight Lawn, Sail Canopies & Live-Edge Garden Banquets.' },
      { img: './assets/images/Y1yOAhXr4jJN5uIPLyBGGR7JMA-5b08f87d.avif', badge: 'SPECIALTY CAFÉ BAR', title: 'Inside Our Timber Pavilion: Dirty Coffee, Matcha & Heirloom Kitchen.' },
      { img: './assets/images/VW9jfrMKGnJvAPcIFeHDQUA44.png', badge: 'TWILIGHT ENTRANCE', title: 'Welcome to Sitio Nipa: Our Illuminated Archway & Lantern Trees.' },
      { img: './assets/images/1brzvnX6w5uxGnawGF8WYYY70I.png', badge: 'ARTISAN WOODCRAFT', title: 'Handcrafted Acacia Tables & Warm Rustic Farm Interiors.' },
      { img: './assets/images/XiDCr6H0L2pzCdbVT0MuAVtBLM.png', badge: 'CELEBRATIONS & EVENTS', title: 'Host Your Family Gatherings, Faculty Dinners & Salu-Salo Feasts.' },
    ];
    cards.forEach((img, idx) => {
      const v = featuredViews[idx];
      if (!v) return;
      img.removeAttribute('srcset');
      img.removeAttribute('sizes');
      if (img.getAttribute('src') !== v.img) {
        img.setAttribute('src', v.img);
      }
      const cardRoot = img.closest('a');
      if (cardRoot) {
        cardRoot.setAttribute('href', RESTO.facebookUrl);
        cardRoot.setAttribute('target', '_blank');
        const h3 = cardRoot.querySelector('h3');
        if (h3 && h3.textContent !== v.title) h3.textContent = v.title;
        const p = cardRoot.querySelector('p');
        if (p && p.textContent !== v.badge) p.textContent = v.badge;
      }
    });
  }

  function enhanceTextAndHours() {
    document.querySelectorAll('.framer-1r0dvt3-container, #__framer-badge-container, [data-framer-name="Free 3 Month"]').forEach(el => el.remove());

    // Keep rich SEO document title intact even after Framer React hydration
    const p = window.location.pathname.toLowerCase();
    let targetTitle = 'El Farm Cafe and Restaurant — Escape the Ordinary | Lamitan City, Basilan';
    if (p.includes('about')) targetTitle = 'About Us — El Farm Cafe and Restaurant | Sitio Nipa, Lamitan City';
    else if (p.includes('menu')) targetTitle = 'Our Special Menu — El Farm Cafe and Restaurant | Lamitan City, Basilan';
    else if (p.includes('blog')) targetTitle = 'Sanctuary & Stories — El Farm Cafe and Restaurant | Lamitan City';
    else if (p.includes('contact')) targetTitle = 'Contact & Location Map — El Farm Cafe and Restaurant | 0917 182 9876';
    if (document.title !== targetTitle) document.title = targetTitle;

    document.querySelectorAll('video').forEach(v => {
      const s = v.getAttribute('src') || '';
      if (s.includes('If6WM6ewOJhlLv6hDT9NyusyTlc')) {
        v.setAttribute('src', './assets/video/intro.mp4');
      }
    });

    document.querySelectorAll('h1').forEach(h1 => {
      const fullTxt = h1.textContent.replace(/\\s+/g, ' ').trim();
      if (fullTxt === 'A Journey of Taste & Tradition') {
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
      } else if (txt.includes('2025 ©') || txt.includes('All rights reserved.')) {
        el.textContent = '2026 © El Farm Cafe and Restaurant. All rights reserved.';
      } else if (txt.includes('Discover our tailored dining services')) {
        el.textContent = 'Explore our complete curated menu of signature espresso drinks, ceremonial matcha, heirloom Basilan dishes, sizzling favorites, and Salu-Salo feasts.';
      }
    });
  }

  function lockUhdImagesAndLinks() {
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
        srcset.includes('framerusercontent.com')
      ) {
        img.removeAttribute('srcset');
      }
    });

    // Bind all 5 Navbar & Footer Page Links (Home, About, Menu, Blog, Contact us) cleanly to their dedicated Framer pages
    document.querySelectorAll('a').forEach(a => {
      if (a.classList.contains('elfarm-native-tab') || a.classList.contains('elfarm-menu-card') || a.classList.contains('elfarm-map-btn-primary') || a.classList.contains('elfarm-map-btn-secondary')) return;
      const txt = a.textContent.trim().toLowerCase();
      const href = a.getAttribute('href') || '';

      function bindPageNav(targetFile, checkSlug) {
        a.setAttribute('href', targetFile);
        if (a.dataset.elfarmPageNav !== targetFile) {
          a.dataset.elfarmPageNav = targetFile;
          a.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            if (targetFile === './index.html') {
              try { sessionStorage.setItem('elfarm_intro_played', '1'); } catch (err) {}
            }
            const curPath = window.location.pathname.toLowerCase();
            const isAlreadyOnPage = checkSlug === 'index'
              ? (curPath === '/' || curPath.endsWith('/index.html'))
              : curPath.includes(checkSlug);
            if (isAlreadyOnPage) {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
              window.location.href = targetFile;
            }
          }, true);
        }
      }

      if (txt === 'view all menu' || txt === 'view menu' || txt === 'menu' || href.includes('menu.html') || href === './menu') {
        bindPageNav('./menu.html', 'menu');
      } else if (txt === 'about' || href.includes('about.html') || href === './about') {
        bindPageNav('./about.html', 'about');
      } else if (txt === 'blog' || txt === 'explore sanctuary' || href.includes('blog.html') || href === './blog') {
        bindPageNav('./blog.html', 'blog');
      } else if (txt === 'contact us' || href.includes('contact.html') || href === './contact') {
        bindPageNav('./contact.html', 'contact');
      } else if (txt === 'book your table') {
        a.setAttribute('href', '#contact-section');
        if (!a.dataset.elfarmBookBound) {
          a.dataset.elfarmBookBound = '1';
          a.addEventListener('click', (e) => {
            const sec = document.querySelector('[data-framer-name="Contact  Section"]');
            if (sec) {
              e.preventDefault();
              e.stopPropagation();
              sec.scrollIntoView({ behavior: 'smooth' });
            } else {
              e.preventDefault();
              e.stopPropagation();
              window.location.href = './contact.html';
            }
          }, true);
        }
      } else if (txt === 'home' || a.getAttribute('data-framer-name') === 'Brand Logo' || a.getAttribute('data-framer-name') === 'Logo' || href === './index.html' || href === './' || href === '/') {
        bindPageNav('./index.html', 'index');
      } else if (href.includes('facebook.com') || href.includes('instagram.com') || href.includes('linkedin.com') || href.includes('twitter.com')) {
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
    bar.id = 'zeticuz-attribution-bar';
    bar.className = 'zeticuz-dev-footer';
    bar.innerHTML = \`
      <button type="button" class="zeticuz-dev-btn" id="zeticuz-portfolio-btn" aria-label="Site Developed by Sam Pangilinan">
        <img src="./assets/images/zeticuz-logo.svg" alt="ZETICUZ Logo">
        <span>SITE DEVELOPED BY: Sam Pangilinan · © 2026</span>
      </button>
    \`;
    document.body.appendChild(bar);
    bar.querySelector('#zeticuz-portfolio-btn').addEventListener('click', () => {
      window.open('https://www.zeticuz.xyz/', '_blank', 'noopener,noreferrer');
    });
  }

  let isApplying = false;
  function applyAllEnhancements() {
    if (isApplying) return;
    isApplying = true;
    try { injectStyles(); } catch (e) {}
    try { keepNativeCustomerSliderClean(); } catch (e) {}
    try { lockUhdImagesAndLinks(); } catch (e) {}
    try { enhanceTextAndHours(); } catch (e) {}
    try { enhanceMenuSection(); } catch (e) {}
    try { enhanceRestoViewsSection(); } catch (e) {}
    try { injectMiniMapSection(); } catch (e) {}
    try { injectZeticuzFooter(); } catch (e) {}
    try { initSecurityShield(); } catch (e) {}
    isApplying = false;
  }

  injectStyles();
  initIntroVideo();

  setTimeout(applyAllEnhancements, 180);
  setTimeout(applyAllEnhancements, 450);
  setTimeout(applyAllEnhancements, 950);
  setTimeout(applyAllEnhancements, 1800);
  setTimeout(applyAllEnhancements, 3000);

  let obsTimer = null;
  const observer = new MutationObserver(() => {
    if (isApplying) return;
    clearTimeout(obsTimer);
    obsTimer = setTimeout(applyAllEnhancements, 100);
  });
  window.addEventListener('load', () => {
    applyAllEnhancements();
    const mainEl = document.getElementById('main') || document.body;
    observer.observe(mainEl, { childList: true, subtree: true });
  });
})();`;

// Obfuscate / Base64-encode elfarm-enhance.js into a protected self-decoding runtime payload
const encodedPayload = Buffer.from(rawEnhanceJsContent, 'utf8').toString('base64');
const protectedEnhanceJs = `/* Protected Runtime — El Farm Cafe & Restaurant · Engineered by ZETICUZ */
(function(){try{const _0xef=atob("${encodedPayload}");const _0xdec=new TextDecoder("utf-8").decode(Uint8Array.from(_0xef,c=>c.charCodeAt(0)));(new Function(_0xdec))();}catch(_e){}})();\n`;

fs.writeFileSync(path.join(ROOT, 'assets/js/elfarm-enhance.js'), protectedEnhanceJs, 'utf8');
console.log('Generated protected & encoded assets/js/elfarm-enhance.js!');

// 3. Build SEO + Social OpenGraph + JSON-LD Schema + Favicon Head Block
function buildSeoHeadBlock(pageTitle, pageDesc, canonicalPath) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    name: 'El Farm Cafe and Restaurant',
    alternateName: 'EL FARM CAFÉ & RESTO',
    description: pageDesc,
    url: 'https://el-farm-official.vercel.app' + canonicalPath,
    image: [
      'https://el-farm-official.vercel.app/assets/images/og-cover-elfarm.jpg',
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
    priceRange: '₱50 - ₱1,599',
    sameAs: [
      'https://www.facebook.com/p/El-Farm-Cafe-and-Restaurant-61592749568852/'
    ]
  };

  const fullCanonicalUrl = 'https://el-farm-official.vercel.app' + canonicalPath;

  return `
  <title>${pageTitle}</title>
  <meta name="description" content="${pageDesc}">
  <meta name="keywords" content="El Farm Cafe and Restaurant, El Farm Lamitan, Lamitan City Basilan Restaurant, Sitio Nipa Maloong Canal, Specialty Coffee Basilan, Coconut Matcha Cloud, Tiyula Itum, Crispy Pata, Salu-Salo Bilao, Pickleball Lamitan">
  <meta name="author" content="Sam Pangilinan (ZETICUZ)">
  <meta name="robots" content="index, follow, max-image-preview:large">
  <meta name="theme-color" content="#0B1315">
  <link rel="canonical" href="${fullCanonicalUrl}">
  <link rel="icon" type="image/x-icon" href="./favicon.ico">
  <link rel="shortcut icon" type="image/x-icon" href="./favicon.ico">
  <link rel="icon" type="image/png" sizes="32x32" href="./assets/images/favicon-32x32.png">
  <link rel="icon" type="image/png" sizes="192x192" href="./assets/images/favicon-192x192.png">
  <link rel="apple-touch-icon" sizes="180x180" href="./assets/images/apple-touch-icon.png">
  <meta property="og:type" content="restaurant">
  <meta property="og:site_name" content="El Farm Cafe and Restaurant">
  <meta property="og:locale" content="en_PH">
  <meta property="og:title" content="${pageTitle}">
  <meta property="og:description" content="${pageDesc}">
  <meta property="og:url" content="${fullCanonicalUrl}">
  <meta property="og:image" content="https://el-farm-official.vercel.app/assets/images/og-cover-elfarm.jpg">
  <meta property="og:image:secure_url" content="https://el-farm-official.vercel.app/assets/images/og-cover-elfarm.jpg">
  <meta property="og:image:type" content="image/jpeg">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:alt" content="El Farm Cafe and Restaurant — Escape the Ordinary in Sitio Nipa, Lamitan City, Basilan">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${pageTitle}">
  <meta name="twitter:description" content="${pageDesc}">
  <meta name="twitter:image" content="https://el-farm-official.vercel.app/assets/images/og-cover-elfarm.jpg">
  <script type="application/ld+json">${JSON.stringify(jsonLd)}</script>
`;
}

// 4. Transform all 5 HTML pages (index.html, about.html, menu.html, blog.html, contact.html)
const pageConfigs = [
  {
    raw: 'raw_index.html',
    out: 'index.html',
    title: 'El Farm Cafe and Restaurant — Escape the Ordinary | Lamitan City, Basilan',
    desc: 'Escape the ordinary at El Farm Cafe and Restaurant in Sitio Nipa, Brgy. Maloong Canal, Lamitan City, Basilan. Savor specialty coffee, ceremonial matcha, heirloom Basilan cuisine, Salu-Salo bilaos, and night pickleball under the palms.',
    canonical: '/',
    withIntroVideo: true,
  },
  {
    raw: 'raw_about.html',
    out: 'about.html',
    title: 'About Us — El Farm Cafe and Restaurant | Sitio Nipa, Lamitan City',
    desc: 'Discover the story of El Farm Cafe and Restaurant in Sitio Nipa, Brgy. Maloong Canal, Lamitan City — where rustic farm charm meets heirloom Basilan flavors, specialty coffee, and outdoor night pickleball.',
    canonical: '/about',
    withIntroVideo: false,
  },
  {
    raw: 'raw_menu.html',
    out: 'menu.html',
    title: 'Our Special Menu — El Farm Cafe and Restaurant | Lamitan City, Basilan',
    desc: 'Explore the complete menu of El Farm Cafe and Restaurant: Golden Crispy Pata, Seafood Feast Bilao, Coconut Matcha Cloud, Dirty Coffee, Tiyula Itum, Native Chicken Tinola, and Sizzling Favorites.',
    canonical: '/menu',
    withIntroVideo: false,
  },
  {
    raw: 'raw_blog.html',
    out: 'blog.html',
    title: 'Sanctuary & Stories — El Farm Cafe and Restaurant | Lamitan City',
    desc: 'Tour the El Farm sanctuary in Sitio Nipa, Lamitan City: our championship floodlit night pickleball court, starlight garden canopies, timber café pavilion, and family celebration spaces.',
    canonical: '/blog',
    withIntroVideo: false,
  },
  {
    raw: 'raw_contact.html',
    out: 'contact.html',
    title: 'Contact & Location Map — El Farm Cafe and Restaurant | 0917 182 9876',
    desc: 'Find El Farm Cafe and Restaurant in Sitio Nipa, Brgy. Maloong Canal, Lamitan City, Basilan. Open Daily 9:00 AM – 9:00 PM. Call 0917 182 9876 for table reservations, pre-orders, and pickleball court bookings.',
    canonical: '/contact',
    withIntroVideo: false,
  },
];

for (const cfg of pageConfigs) {
  const rawPath = path.join(ROOT, 'scripts/dump', cfg.raw);
  if (!fs.existsSync(rawPath)) continue;
  let html = fs.readFileSync(rawPath, 'utf8');

  html = applyTextReplacements(html);

  // Strip old Framer <title>, meta description, og:*, twitter:*, and legacy favicon links
  html = html.replace(/<title>[\s\S]*?<\/title>/gi, '');
  html = html.replace(/<meta\s+name="description"[^>]*>/gi, '');
  html = html.replace(/<meta\s+property="og:[^"]*"[^>]*>/gi, '');
  html = html.replace(/<meta\s+name="twitter:[^"]*"[^>]*>/gi, '');
  html = html.replace(/<link\s+rel="(?:icon|apple-touch-icon)"[^>]*>/gi, '');
  html = html.replace(/<link\s+rel="canonical"[^>]*>/gi, '');

  // Strip the floating "Free 3 Month" container and Framer badge container from SSR HTML
  html = html.replace(/<div class="framer-1r0dvt3-container"[\s\S]*?<\/a><!--\/\$--><\/div>/g, '');
  html = html.replace(/<div id="__framer-badge-container">[\s\S]*?<\/div><\/a><\/div><\/div>/g, '');

  // Inject SEO + Favicon + OpenGraph + JSON-LD head block right after <meta name="viewport"...>
  const seoHead = buildSeoHeadBlock(cfg.title, cfg.desc, cfg.canonical);
  html = html.replace(/(<meta name="viewport"[^>]*>)/i, `$1\n${seoHead}`);

  // If landing page (index.html), inject synchronous sessionStorage check + fullscreen intro animation video (once per tab)
  if (cfg.withIntroVideo) {
    const introBootScript = `<script id="elfarm-intro-boot">(function(){try{var s=window.location.search.indexOf('skipIntro=1')!==-1||sessionStorage.getItem('elfarm_intro_played')==='1';window.__elfarmSkipIntro=s;if(!s){document.documentElement.classList.add('elfarm-intro-lock');}}catch(e){window.__elfarmSkipIntro=false;}})();</script>`;
    html = html.replace('</head>', `${introBootScript}</head>`);

    // Defer Framer's initial appear script until after intro video ends when intro is playing
    html = html.replace(
      'return c})()("data-framer-appear-id","__Appear_Animation_Transform__",false)</script>',
      'window.__elfarmRunFramerAppear=function(){try{c("data-framer-appear-id","__Appear_Animation_Transform__",false)}catch(e){}};if(window.__elfarmSkipIntro){window.__elfarmRunFramerAppear();}})()</script>'
    );

    const introOverlayHtml = `
<style id="elfarm-intro-critical-css">
html.elfarm-intro-lock,html.elfarm-intro-lock body{overflow:hidden!important;height:100vh!important;scrollbar-width:none!important}
html.elfarm-intro-lock::-webkit-scrollbar,html.elfarm-intro-lock body::-webkit-scrollbar{display:none!important;width:0!important;height:0!important}
html.elfarm-intro-lock #main{opacity:0!important;filter:brightness(0.12)!important}
html.elfarm-intro-reveal #main{opacity:1!important;filter:brightness(1)!important;transition:opacity 1.15s cubic-bezier(0.22,1,0.36,1),filter 1.25s cubic-bezier(0.22,1,0.36,1)!important}
html:not(.elfarm-intro-lock) #elfarm-intro-overlay{display:none!important}
#elfarm-intro-overlay{position:fixed;inset:0;width:100vw;height:100vh;background:#070d0f;z-index:2147483646;overflow:hidden;display:flex;align-items:center;justify-content:center;opacity:1;visibility:visible;transition:opacity 1.05s cubic-bezier(0.22,1,0.36,1),visibility 1.05s ease}
#elfarm-intro-overlay.elfarm-intro-fadeout{opacity:0!important;visibility:hidden!important;pointer-events:none!important}
#elfarm-intro-video{width:100vw;height:100vh;object-fit:cover;display:block;pointer-events:none}
</style>
<div id="elfarm-intro-overlay" aria-label="El Farm Intro Animation">
  <video id="elfarm-intro-video" src="./assets/video/intro.mp4" autoplay muted playsinline preload="auto"></video>
</div>`;
    html = html.replace('<body>', `<body>${introOverlayHtml}`);
  }

  // Inject protected elfarm-enhance.js right before </body>
  html = html.replace('</body>', '<script src="./assets/js/elfarm-enhance.js?v=6"></script></body>');

  fs.writeFileSync(path.join(ROOT, cfg.out), html, 'utf8');
  console.log('Updated', cfg.out);
}

// 5. Generate Production vercel.json with Clean URL Rewrites, Enterprise Security Headers & Caching
const vercelConfig = {
  version: 2,
  framework: null,
  buildCommand: null,
  outputDirectory: '.',
  cleanUrls: true,
  trailingSlash: false,
  rewrites: [
    { source: '/', destination: '/index.html' },
    { source: '/about', destination: '/about.html' },
    { source: '/menu', destination: '/menu.html' },
    { source: '/menu-categories/:slug*', destination: '/menu.html' },
    { source: '/blog', destination: '/blog.html' },
    { source: '/contact', destination: '/contact.html' }
  ],
  headers: [
    {
      source: '/(.*)',
      headers: [
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
        { key: 'X-XSS-Protection', value: '1; mode=block' },
        { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(self), interest-cohort=()' },
        { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' }
      ]
    },
    {
      source: '/assets/(images|fonts|menu|video)/(.*)',
      headers: [
        { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }
      ]
    }
  ]
};
fs.writeFileSync(path.join(ROOT, 'vercel.json'), JSON.stringify(vercelConfig, null, 2), 'utf8');
console.log('Generated vercel.json with enterprise security headers & clean URL rewrites!');

// 6. Generate robots.txt & sitemap.xml
const robotsTxt = `User-agent: *
Allow: /

Sitemap: https://el-farm-official.vercel.app/sitemap.xml
`;
fs.writeFileSync(path.join(ROOT, 'robots.txt'), robotsTxt, 'utf8');

const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://el-farm-official.vercel.app/</loc><changefreq>weekly</changefreq><priority>1.0</priority></url>
  <url><loc>https://el-farm-official.vercel.app/menu</loc><changefreq>weekly</changefreq><priority>0.9</priority></url>
  <url><loc>https://el-farm-official.vercel.app/about</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>
  <url><loc>https://el-farm-official.vercel.app/blog</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>
  <url><loc>https://el-farm-official.vercel.app/contact</loc><changefreq>monthly</changefreq><priority>0.9</priority></url>
</urlset>
`;
fs.writeFileSync(path.join(ROOT, 'sitemap.xml'), sitemapXml, 'utf8');
console.log('Generated robots.txt and sitemap.xml!');
