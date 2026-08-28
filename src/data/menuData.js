// Food Stop — complete menu data
// Prices shown in USD ($) unless marked LL (Lebanese Lira).
// Image sources:
//  - Restaurant's own hosted photos (S3): IMG('...')
//  - Free stock photos downloaded locally to /images/ (public folder)
//  - Brand assets (logo)

const S3 = (path) =>
  `https://s3.eu-central-1.amazonaws.com/act.omegapos.com/OmegaCloud/1000/SalesItems/${path}`

const L = (name) => `/images/${name}.jpg`

const img = (pic) => (pic ? (pic.startsWith('http') || pic.startsWith('/') ? pic : L(pic)) : null)

const items = []

const add = (group, name, price, pic, opts = {}) => {
  items.push({ group, name, price, pic: img(pic), ...opts })
}

// ---------- Starters ----------
add('Starters', 'Fries Medium', 4.4, 'fries')
add('Starters', 'Fries Large', 5.96, 'fries')
add('Starters', 'Wedges', 6.97, 'burger-3')
add('Starters', 'Curly Fries', 8.88, 'fast-food')
add('Starters', 'Mozerella Sticks', 6.63, 'cheese')
add('Starters', 'Buffalo Wings', 7.65, S3('whatsapp-image-2023-12-15-at-101902-am.jpeg'), { featured: true })
add('Starters', 'Bbq Wings', 7.98, 'grilled')
add('Starters', 'Super Combo', 13.94, 'food-bowl', { featured: true })

// ---------- Sandwiches ----------
add('Sandwiches', 'Mexican Chicken', 5.96, 'grilled')
add('Sandwiches', 'Supreme Chicken', 6.52, 'grilled')
add('Sandwiches', 'Special Chicken', 5.96, 'chicken-sandwich')
add('Sandwiches', 'Escalope Chicken', 5.96, 'sandwich')
add('Sandwiches', 'Francisco', 5.96, 'sandwich')
add('Sandwiches', 'Chinese Chicken', 5.51, 'burger-classic')
add('Sandwiches', 'Chicken Sub', 5.96, 'sandwich', { sub: 'Toasted sub, loaded & grilled' })
add('Sandwiches', 'Crispy Chicken Sandwich', 5.96, 'chicken-sandwich', { sub: 'Crispy fillet, fresh bun' })
add('Sandwiches', 'Fries Sandwich', 3.94, 'fries', { sub: 'Golden fries, house sauces' })
add('Sandwiches', 'Red Tawook', 4.5, 'shawarma-wrap', { sub: 'Marinated tawook, grilled' })
add('Sandwiches', 'Twister', 5.96, 'shawarma-wrap', { featured: true })
add('Sandwiches', 'Chicken BBQ', 6.52, 'grilled')
add('Sandwiches', 'Fajita Chicken', 6.97, 'grilled')
add('Sandwiches', 'Smoked steak', 8.43, 'meat', { sub: 'Slow-smoked & sliced' })
add('Sandwiches', 'PHILADELPHIA', 8.43, 'meat', { sub: 'Philly-style, melted cheese' })
add('Sandwiches', 'Philly Steak', 8.43, 'meat', { sub: 'Steak, peppers & cheese' })
add('Sandwiches', 'Philly chicken steak', 7.53, 'grilled', { sub: 'Chicken, peppers & cheese' })

// ---------- Shawarma ----------
add('Shawarma', 'Chicken Shawarma', 4.5, S3('c3ab7ae0d44873cdaee424f7d1e6634eba01c657.jpg'), { featured: true })
add('Shawarma', 'Chicken Markouk Shawarma', 5.51, 'shawarma-wrap', { sub: 'Markouk bread, garlic & pickles' })
add('Shawarma', 'Doner Chicken Shawarma', 6.18, 'shawarma-wrap', { sub: 'Freshly carved doner' })
add('Shawarma', 'Chicken Shawarma Meal', 7.53, 'food-bowl', { sub: 'With fries & drink' })
add('Shawarma', 'Shawarma plate', 11, S3('whatsapp-image-2023-12-22-at-81448-am-1.jpeg'), { featured: true })

// ---------- Burgers ----------
add('Burgers', 'Lebanese Burger', 5.96, 'burger-2')
add('Burgers', 'American Burger', 6.97, 'burger', { featured: true })
add('Burgers', 'Mozzarella Beef Burger', 7.98, 'burger-3', { sub: 'Beef patty, mozzarella core' })
add('Burgers', 'SWISS Mushroom Burger', 7.98, 'burger-3', { sub: 'Swiss cheese, sautéed mushrooms' })
add('Burgers', 'Stop Burger', 7.53, 'burger-classic', { signature: true, sub: 'Our house signature burger' })
add('Burgers', 'Chili Beef Burger', 6.97, 'burgers', { sub: 'House chili heat' })
add('Burgers', 'Smokin Beef Burger', 8.43, 'burger-3', { sub: 'Smoky BBQ, crispy onions' })
add('Burgers', 'Chili Sweet', 8.43, 'burger', { sub: 'Sweet & spicy glaze' })
add('Burgers', 'Chicken Burger', 5.96, 'chicken-sandwich', { sub: 'Juicy grilled chicken fillet' })
add('Burgers', 'Chili Chicken Burger', 5.96, 'chicken-sandwich', { sub: 'Crispy chicken, chili sauce' })
add('Burgers', 'Mozzarella Chicken Burger', 7.53, 'burger-3', { sub: 'Mozzarella, crispy chicken' })
add('Burgers', 'Zinger Burger', 6.52, S3('whatsapp-image-2023-12-22-at-92509-am.jpeg'), { featured: true })
add('Burgers', 'Special Zinger', 6.97, 'burger-2', { sub: 'Loaded house special' })
add('Burgers', 'Zinger Mozzarella Burger', 7.53, 'burger-3', { sub: 'Mozzarella-loaded zinger' })
add('Burgers', 'Creamy Cheese Zinger', 7.53, 'burger-3', { sub: 'Creamy cheese sauce' })
add('Burgers', 'Crunchy Zinger', 7.53, 'burger', { sub: 'Extra crunchy coating' })
add('Burgers', 'Mega Mighty Zinger', 7.98, 'burger-2', { sub: 'Double stacked & mighty' })
add('Burgers', 'Double Cheese Burger', 10, 'burger', { sub: 'Two beef patties, double cheese' })

// ---------- Platters ----------
add('Platters', 'Crispy 3 Pcs', 9, 'fast-food')
add('Platters', 'Crispy 5 Pcs', 11.47, 'chicken-sandwich', { sub: 'Crispy fried pieces & fries' })
add('Platters', 'Escalope Platter', 10.57, 'food-bowl', { sub: 'With fries, garlic & pickles' })
add('Platters', 'Combo Platter', 12.48, S3('whatsapp-image-2023-12-15-at-101906-am-2.jpeg'), { featured: true, sub: 'Mixed grill feast for sharing' })
add('Platters', 'Broasted 4 Pcs', 12.48, 'fast-food', { sub: 'Crispy broasted chicken' })
add('Platters', 'Tawook Platter', 9, 'bowl', { sub: 'Grilled tawook skewers' })

// ---------- Family Meal ----------
add('Family Meal', 'Crispy 10 Pcs', 19.56, 'food-bowl', { featured: true, sub: '10 crispy pieces & sides' })
add('Family Meal', 'Broasted 8 Pcs', 22, 'bowl', { sub: '8 broasted pieces & sides' })

// ---------- To Add ----------
add('To Add', 'Mozzarella Pane', 1.24, 'cheese', { sub: 'Extra mozzarella pane' })
add('To Add', 'Mozzarella Slice', 0.57, 'cheese', { sub: 'Add a mozzarella slice' })
add('To Add', 'Cheddar Slice', 0.57, 'cheese', { sub: 'Add a cheddar slice' })
add('To Add', 'Turkey', 0.57, 'meat', { sub: 'Add turkey slices' })
add('To Add', 'Tortilla Bread', 0.57, 'shawarma-wrap', { sub: 'Add tortilla wrap' })

// ---------- Beverages (priced in LL) ----------
add('Beverages', 'Small Water', 30000, 'drink-2', { ll: true, sub: 'Still water' })
add('Beverages', 'Laban', 100000, S3('png-clipart-ayran-buttermilk-dairy-products-milkman-milk-cheese-plastic-bottle.png'), { ll: true, sub: 'Chilled laban' })
add('Beverages', 'Soft Drinks', 100000, 'ice-drink', { ll: true, sub: 'Ice-cold soft drink' })
add('Beverages', 'Pepsi 1.5 L', 150000, 'drink', { ll: true, sub: '1.5 litre bottle' })

// ---------- Cocktail & Juice ----------
add('Cocktail & Juice', 'Orange Medium', 3.4, 'smoothie', { sub: 'Freshly squeezed oranges' })
add('Cocktail & Juice', 'Orange Large', 4.4, 'smoothie', { sub: 'Freshly squeezed oranges' })
add('Cocktail & Juice', 'Orange Litre', 6.8, 'smoothie', { sub: '1 litre, fresh squeezed' })
add('Cocktail & Juice', 'Strawberry Medium', 3.95, 'smoothie', { sub: 'Fresh strawberries, thick blend' })
add('Cocktail & Juice', 'Strawberry Large', 4.95, 'smoothie', { sub: 'Fresh strawberries, thick blend' })
add('Cocktail & Juice', 'Strawberry Litre', 7.85, 'smoothie', { sub: 'Share-size strawberry blend' })
add('Cocktail & Juice', 'Cocktail Juice Medium', 3.95, 'cocktail', { sub: 'Made-to-order fruit mix' })
add('Cocktail & Juice', 'Cocktail Juice Large', 4.95, 'cocktail', { sub: 'Made-to-order fruit mix' })
add('Cocktail & Juice', 'Cocktail Juice Litre', 7.85, 'cocktail', { sub: 'Share-size cocktail juice' })
add('Cocktail & Juice', 'Cocktail Juice & Kachta Medium', 4.95, 'dessert', { sub: 'Cocktail juice with kachta cream' })
add('Cocktail & Juice', 'Cocktail Juice & Kachta Large', 6, 'dessert', { sub: 'Cocktail juice with kachta cream' })
add('Cocktail & Juice', 'Fruit Cocktail Medium', 4.95, 'food-fruit', { sub: 'Seasonal fresh fruit cocktail' })
add('Cocktail & Juice', 'Fruit Cocktail Large', 6, 'food-fruit', { sub: 'Seasonal fresh fruit cocktail' })
add('Cocktail & Juice', 'Avocado Medium', 6.55, 'avocado', { sub: 'Thick avocado blend' })
add('Cocktail & Juice', 'Avocado Large', 7.55, 'avocado', { sub: 'Thick avocado blend' })
add('Cocktail & Juice', 'Fruit Cocktail & Avocado Meduim', 5.55, 'avocado', { sub: 'Fruit cocktail + avocado' })
add('Cocktail & Juice', 'Fruit Cocktail & Avocado Large', 6.55, 'avocado', { sub: 'Fruit cocktail + avocado' })
add('Cocktail & Juice', 'Cocktail Juice & Avocado meduim', 4.95, 'avocado', { sub: 'Cocktail juice + avocado' })
add('Cocktail & Juice', 'Avocado Juice Meduim', 5.55, 'avocado', { sub: 'Smooth avocado juice' })
add('Cocktail & Juice', 'Lemonade meduim', 3.4, 'lemonade', { sub: 'Freshly squeezed lemonade' })
add('Cocktail & Juice', 'Lemonade large', 4.4, 'lemonade', { sub: 'Freshly squeezed lemonade' })
add('Cocktail & Juice', 'Lemonade litre', 6.8, 'lemonade', { sub: 'Share-size lemonade' })
add('Cocktail & Juice', 'Minted Lemonade meduim', 3.95, 'lemonade', { sub: 'Lemonade with fresh mint' })
add('Cocktail & Juice', 'Minted Lemonade large', 4.95, 'lemonade', { sub: 'Lemonade with fresh mint' })
add('Cocktail & Juice', 'Minted Lemonade litre', 7.85, 'lemonade', { sub: 'Share-size minted lemonade' })

// ---------- Desserts ----------
add('Desserts', 'Special Kachta Platter', 9.5, 'dessert', { featured: true, sub: 'Kachta cream platter' })
add('Desserts', 'Crepe Nutella', 5.6, 'dessert', { sub: 'Warm crepe, nutella' })
add('Desserts', 'Crepe Kinder', 6.75, 'dessert', { sub: 'Warm crepe, kinder' })
add('Desserts', 'Crepe Lotus', 6.75, 'dessert', { sub: 'Warm crepe, lotus biscoff' })
add('Desserts', 'Crepe Oreo', 6.75, 'dessert', { sub: 'Warm crepe, oreo' })
add('Desserts', 'Ice Cream Scoop', 1.7, 'ice-cream', { sub: 'Single scoop' })
add('Desserts', 'Ice Cream 1 Kg', 15, 'ice-cream', { sub: '1 kg tub to share' })

// ---------- Hookah ----------
add('Hookah', 'Argileh', 5, 'fancy-food', { sub: 'House argileh' })
add('Hookah', 'Argileh Double Apple', 5.5, 'fancy-food', { sub: 'Classic double apple' })
add('Hookah', 'Argileh Apple & Mint', 5.5, 'fancy-food', { sub: 'Apple & fresh mint' })

export const MENU_SECTIONS = [
  { label: 'Starters', tagline: 'Golden, crisp & made to share' },
  { label: 'Sandwiches', tagline: 'Stacked, toasted & dangerously good' },
  { label: 'Shawarma', tagline: 'Slow-rotisserie, freshly carved' },
  { label: 'Burgers', tagline: 'Hand-pressed patties, house sauces' },
  { label: 'Platters', tagline: 'Feast for the hungry' },
  { label: 'Family Meal', tagline: 'Meals built for the table' },
  { label: 'To Add', tagline: 'The little extras that matter' },
  { label: 'Beverages', tagline: 'Always ice-cold' },
  { label: 'Cocktail & Juice', tagline: 'Fresh-squeezed, thick & cold' },
  { label: 'Desserts', tagline: 'Sweet endings' },
  { label: 'Hookah', tagline: 'Slow down, stay a while' },
]

export const MENU_ITEMS = items

export const SIGNATURE = items.find((i) => i.signature) || items[0]

export const FEATURED = items.filter((i) => i.featured)

export const BRAND = {
  name: 'Food Stop',
  location: 'Sultaniyeh, Sour (Tyre), Lebanon',
  phone: '71 356 564',
  phoneTel: '+96171356564',
  instagram: 'https://www.instagram.com/food_stop_leb?igsh=N3FmNm5nbzVrZGQx',
  facebook: 'https://www.facebook.com/FoodStopresto/',
  logo: '/images/foodstop-logo.svg',
}

export const HERO_IMAGE = L('burgers')
export const SHAWARMA_IMAGE = L('shawarma-wrap')
export const COMBO_IMAGE = L('food-bowl')
