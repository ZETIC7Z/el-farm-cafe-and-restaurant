import os
import shutil
from PIL import Image

BASE_DIR = r"c:\Users\ZETICUZ\Music\El Farm Cafe and Restaurant"
DUMP_DIR = os.path.join(BASE_DIR, "scripts", "dump", "highres")
ASSETS_DIR = os.path.join(BASE_DIR, "public", "assets")

for sub in ["logo", "resto-views", "customers", "menu"]:
    os.makedirs(os.path.join(ASSETS_DIR, sub), exist_ok=True)

def copy_asset(src_name, dest_sub, dest_name):
    src_path = os.path.join(DUMP_DIR, src_name)
    dest_path = os.path.join(ASSETS_DIR, dest_sub, dest_name)
    if os.path.exists(src_path):
        shutil.copy2(src_path, dest_path)
        print(f"Copied {src_name} -> {dest_sub}/{dest_name}")
    else:
        print(f"WARNING: Missing {src_path}")

# 1. Logo & Cover
copy_asset("041_fbid_122123760585424985.jpg", "logo", "logo.jpg")
copy_asset("042_fbid_122125148679424985.jpg", "logo", "cover.jpg")

# 2. Resto Views (10 shots of indoor, outdoor garden, twilight arch, pickleball court)
resto_views = [
    ("065_fbid_122127107931424985.jpg", "resto-1.jpg"), # Welcome arch at twilight
    ("042_fbid_122125148679424985.jpg", "resto-2.jpg"), # Full twilight entrance & pavilion
    ("067_fbid_122125349337424985.jpg", "resto-3.jpg"), # Night Pickleball Court & palms
    ("015_899735678_122129348373424985_3394265253296363140_n.jpg", "resto-4.jpg"), # Garden lawn with sail tents at night
    ("037_886726376_3012980215714844_5379929395327169454_n.jpg", "resto-5.jpg"), # Indoor cafe bar "COFFEE MATCHA MORE"
    ("053_fbid_122129233131424985.jpg", "resto-6.jpg"), # Glowing wooden signage & drink
    ("014_898463283_122129348325424985_9161291468116629415_n.jpg", "resto-7.jpg"), # Open-air garden tables & string lights
    ("060_fbid_122128920093424985.jpg", "resto-8.jpg"), # Daytime Pickleball court action
    ("036_889247786_3012980139048185_8960038343123121426_n.jpg", "resto-9.jpg"), # Indoor warm timber dining space
    ("038_889897156_3012980289048170_4433262638653839897_n.jpg", "resto-10.jpg"), # Veranda seating & greenery
]
for src, dst in resto_views:
    copy_asset(src, "resto-views", dst)

# 3. Customers (16 candid happy moments)
customer_photos = [
    ("051_fbid_122129826165424985.jpg", "customer-1.jpg"),
    ("057_fbid_122128998543424985.jpg", "customer-2.jpg"),
    ("058_fbid_122128998465424985.jpg", "customer-3.jpg"),
    ("059_fbid_122128920195424985.jpg", "customer-4.jpg"),
    ("009_904220262_122129547375424985_1980975675372943379_n.jpg", "customer-5.jpg"),
    ("010_901518937_122129547429424985_2051941349256949556_n.jpg", "customer-6.jpg"),
    ("011_901173336_122129547477424985_4731958844074026649_n.jpg", "customer-7.jpg"),
    ("012_904002897_122129547531424985_5308515597589833591_n.jpg", "customer-8.jpg"),
    ("016_902191361_122129345727424985_3613463756970653006_n.jpg", "customer-9.jpg"),
    ("017_900431621_122129344353424985_7293739731694254205_n.jpg", "customer-10.jpg"),
    ("018_901475612_122129329863424985_1790091497139812274_n.jpg", "customer-11.jpg"),
    ("019_900431577_122129328681424985_7141183982348677179_n.jpg", "customer-12.jpg"),
    ("020_901589131_122129327523424985_904220749833379297_n.jpg", "customer-13.jpg"),
    ("028_897608497_122128998627424985_2004468126939490500_n.jpg", "customer-14.jpg"),
    ("029_893580020_122128998717424985_1610238795627978_n.jpg", "customer-15.jpg"),
    ("061_fbid_122128920015424985.jpg", "customer-16.jpg"),
]
for src, dst in customer_photos:
    copy_asset(src, "customers", dst)

# 4. Menu Boards & Full Dish Posters
menu_assets = [
    ("049_fbid_122129818509424985.jpg", "board-cover.jpg"),
    ("044_fbid_122129818725424985.jpg", "board-drinks.jpg"),
    ("043_fbid_122129818767424985.jpg", "board-pork.jpg"),
    ("046_fbid_122129818641424985.jpg", "board-nonpork.jpg"),
    ("048_fbid_122129818551424985.jpg", "board-everyday.jpg"),
    ("047_fbid_122129818599424985.jpg", "board-snacks.jpg"),
    ("045_fbid_122129818683424985.jpg", "board-feasts.jpg"),
    ("052_fbid_122129810313424985.jpg", "dish-brownie-cupcakes.jpg"),
    ("053_fbid_122129233131424985.jpg", "dish-popcorn-latte.jpg"),
    ("054_fbid_122129232219424985.jpg", "dish-bone-marrow-goto.jpg"),
    ("055_fbid_122129156559424985.jpg", "dish-dirty-coffee.jpg"),
    ("062_fbid_122127869355424985.jpg", "dish-native-tinola.jpg"),
    ("063_fbid_122127861087424985.jpg", "dish-pancit-miki.jpg"),
    ("064_fbid_122127568257424985.jpg", "dish-seafood-bilao.jpg"),
    ("066_fbid_122126225205424985.jpg", "dish-coconut-matcha.jpg"),
    ("056_fbid_122129002533424985.jpg", "dish-tuesday-egg-hunt.jpg"),
]
for src, dst in menu_assets:
    copy_asset(src, "menu", dst)

# 5. Crop high-res dish close-ups from the 1448x2048 Menu Boards so every dish category has rich authentic photos
def crop_rel(src_file, out_name, box_rel):
    src_path = os.path.join(DUMP_DIR, src_file)
    if not os.path.exists(src_path):
        return
    with Image.open(src_path) as im:
        w, h = im.size
        left = int(box_rel[0] * w)
        top = int(box_rel[1] * h)
        right = int(box_rel[2] * w)
        bottom = int(box_rel[3] * h)
        cropped = im.crop((left, top, right, bottom))
        out_path = os.path.join(ASSETS_DIR, "menu", out_name)
        cropped.save(out_path, quality=92)
        print(f"Cropped {out_name} ({cropped.size})")

# From 043 (Pork Favorites: Sizzling Sisig, Crispy Pata, Dinuguan)
crop_rel("043_fbid_122129818767424985.jpg", "crop-sizzling-sisig.jpg", (0.50, 0.14, 0.93, 0.41))
crop_rel("043_fbid_122129818767424985.jpg", "crop-crispy-pata.jpg", (0.06, 0.37, 0.50, 0.65))
crop_rel("043_fbid_122129818767424985.jpg", "crop-dinuguan.jpg", (0.52, 0.66, 0.94, 0.92))

# From 044 (Signature Drinks: S'mores Smoothie, Dubai Chewy Cookie Smoothie)
crop_rel("044_fbid_122129818725424985.jpg", "crop-smores-smoothie.jpg", (0.05, 0.67, 0.32, 0.94))
crop_rel("044_fbid_122129818725424985.jpg", "crop-dubai-cookie-smoothie.jpg", (0.68, 0.67, 0.95, 0.94))

# From 046 (Non-Pork Specials: Kambing Papaitan, Crispy Hito, Kare-Kareng Hito, Chicken Kaliya, Tiyula Itum, Adobing, Chicken Sisig, Bangus Sisig)
crop_rel("046_fbid_122129818641424985.jpg", "crop-papaitan.jpg", (0.05, 0.25, 0.28, 0.40))
crop_rel("046_fbid_122129818641424985.jpg", "crop-crispy-hito.jpg", (0.36, 0.26, 0.63, 0.40))
crop_rel("046_fbid_122129818641424985.jpg", "crop-karekare-hito.jpg", (0.68, 0.24, 0.95, 0.40))
crop_rel("046_fbid_122129818641424985.jpg", "crop-chicken-kaliya.jpg", (0.04, 0.55, 0.31, 0.68))
crop_rel("046_fbid_122129818641424985.jpg", "crop-tiyula-itum.jpg", (0.68, 0.55, 0.95, 0.69))
crop_rel("046_fbid_122129818641424985.jpg", "crop-adobing.jpg", (0.04, 0.74, 0.31, 0.87))
crop_rel("046_fbid_122129818641424985.jpg", "crop-chicken-sisig.jpg", (0.35, 0.74, 0.64, 0.88))
crop_rel("046_fbid_122129818641424985.jpg", "crop-bangus-sisig.jpg", (0.68, 0.74, 0.96, 0.88))

# From 048 (Everyday Favorites: Hotsilog, Tapsilog, Sisig Silog, Samyang Wrap)
crop_rel("048_fbid_122129818551424985.jpg", "crop-hotsilog.jpg", (0.05, 0.20, 0.48, 0.40))
crop_rel("048_fbid_122129818551424985.jpg", "crop-tapsilog.jpg", (0.52, 0.20, 0.94, 0.40))
crop_rel("048_fbid_122129818551424985.jpg", "crop-sisigsilog.jpg", (0.06, 0.49, 0.47, 0.67))
crop_rel("048_fbid_122129818551424985.jpg", "crop-samyang-wrap.jpg", (0.53, 0.50, 0.94, 0.67))

# From 045 (Salu-Salo Feasts: Pinoy Favorites Bilao, Chicken Bilao, Combos)
crop_rel("045_fbid_122129818683424985.jpg", "crop-pinoy-bilao.jpg", (0.05, 0.16, 0.48, 0.36))
crop_rel("045_fbid_122129818683424985.jpg", "crop-chicken-bilao.jpg", (0.05, 0.43, 0.46, 0.62))
crop_rel("045_fbid_122129818683424985.jpg", "crop-combo-feast.jpg", (0.52, 0.68, 0.95, 0.88))

print("Asset organization and dish cropping complete!")
