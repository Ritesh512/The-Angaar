const img = (id, w = 900) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`

// Local photos live in /public/images
const L = (f) => `/images/${f}`

export const brand = {
  name: 'The Angaar',
  tagline: 'Swaad Bhi, Sehat Bhi 🔥',
  taglineHi: 'स्वाद भी, सेहत भी',
  logo: L('logo.jpg'),
  cuisine:
    '100% Pure Vegetarian Tandoor & Street-Gourmet — Soya Chaap, Paneer Tikka, Mushroom Tikka, Rolls, Veg Dum Biryani, Burgers, Sandwiches, Fries, Cold Coffee',
  rating: 4.9,
  reviewCount: '90+',
  priceRange: '₹1 – ₹400 per person',
  address:
    'Shop No. 8 & 9, Rane Complex, near Rane Chowk, Waluj, CIDCO Waluj Mahanagar 1, Chhatrapati Sambhajinagar, Maharashtra 431136',
  phoneDisplay: '077699 54336',
  phoneHref: 'tel:+917769954336',
  phone2Display: '88060 66707',
  phone2Href: 'tel:+918806066707',
  whatsappNumber: '917769954336',
  whatsappHref:
    'https://wa.me/917769954336?text=' +
    encodeURIComponent('Hi The Angaar! I would like to reserve a table.'),
  mapsHref:
    'https://www.google.com/maps/search/?api=1&query=' +
    encodeURIComponent('The Angaar, Rane Complex, Rane Chowk, Waluj, Chhatrapati Sambhajinagar 431136'),
  instagramHandle: 'the__angaar',
  instagramHref: 'https://www.instagram.com/the__angaar/',
  // TODO: set your Google Place ID to open the review box directly:
  //   https://search.google.com/local/writereview?placeid=YOUR_PLACE_ID
  // Until then this opens the listing on Google Maps, where "Write a review" is one tap away.
  googleReviewHref:
    'https://www.google.com/maps/search/?api=1&query=' +
    encodeURIComponent('The Angaar, Rane Complex, Rane Chowk, Waluj, Chhatrapati Sambhajinagar 431136'),
  closesAt: { hour: 23, minute: 30 },
  // Opening time is not given anywhere; assumed 11:00 AM.
  opensAt: { hour: 11, minute: 0 },
}

// TODO: replace this with the restaurant's real Zomato listing link.
// Until then it opens a search for "The Angaar".
export const delivery = [
  {
    key: 'zomato',
    label: 'Order on Zomato',
    href: 'https://www.zomato.com/search?q=The%20Angaar',
    color: '#E23744',
  },
]

export const badges = [
  { key: 'veg', label: '100% Pure Veg' },
  { key: 'cash', label: 'All Payment Modes Accepted' },
  { key: 'reserve', label: 'Reservations Required' },
  { key: 'outdoor', label: 'Outdoor Seating Available' },
]

// Prices from The_Angaar_New_Menu.pdf (chaap/tikka plate, roll, biryani, pizza).
export const signatures = [
  { id: '01', word: 'MALAI', category: 'Soya Chaap', title: 'Malai Soya Chaap', price: 200, image: L('creamy-chaap.jpg') },
  { id: '02', word: 'TIKKA', category: 'Paneer', title: 'Paneer Tikka Angaar', price: 250, image: L('paneer-tikka.jpg'), focus: '45% 50%' },
  { id: '03', word: 'BURGER', category: 'Burgers', title: 'Tandoori Soya Chaap Burger', price: 100, image: L('signature-burger.webp') },
  { id: '04', word: 'BIRYANI', category: 'Dum Biryani', title: 'Angaar Special Veg Dum Biryani', price: 150, image: L('signature-biryani.webp'), focus: '50% 60%' },
  { id: '05', word: 'ROLL', category: 'Rolls', title: 'Malai Chaap Roll', price: 110, image: L('SoyaChaapRoll.webp') },
  { id: '06', word: 'PIZZA', category: 'Pizza', title: 'Angaar Special Pizza', price: 350, image: L('pizza.webp') },
]

export const garnish = [
  { kind: 'onion', x: -34, y: -26, size: 64, depth: 1.2, rot: -20 },
  { kind: 'lemon', x: 36, y: -22, size: 72, depth: 0.9, rot: 15 },
  { kind: 'mint', x: -40, y: 18, size: 56, depth: 1.5, rot: 40 },
  { kind: 'mint', x: 42, y: 24, size: 44, depth: 0.7, rot: -35 },
  { kind: 'ember', x: -18, y: 36, size: 14, depth: 1.8, rot: 0 },
  { kind: 'ember', x: 20, y: -38, size: 10, depth: 1.4, rot: 0 },
  { kind: 'ember', x: 48, y: 4, size: 12, depth: 2.0, rot: 0 },
  { kind: 'ember', x: -50, y: -4, size: 9, depth: 1.1, rot: 0 },
]

export const craftSteps = [
  { n: '01', title: 'Marinate', text: 'Soya & fresh paneer rest overnight in hung curd, yellow mustard and Kashmiri deghi mirch.', detail: 'Overnight · hung curd · mustard' },
  { n: '02', title: 'Skewer', text: 'Hand-threaded on iron seekh with onion and capsicum — never crowded.', detail: 'Iron seekh · hand-threaded' },
  { n: '03', title: 'Coal Roast', text: 'Over live charcoal until the edges blister and the smoke gets into the grain.', detail: 'Live charcoal · tandoor' },
  { n: '04', title: 'Butter Glaze', text: 'Finished with butter, chaat masala and a squeeze of lemon right at the pass.', detail: 'Butter · lemon · chaat masala' },
]

// What the in-store "What we eat, we serve" board promises (Branding.webp).
export const promise = [
  { title: 'No palm oil', text: 'Zero compromise on health.' },
  { title: 'No analogue paneer or cheese', text: 'We use only real ingredients.' },
  { title: 'Real malai paneer', text: 'Soft, fresh & protein-rich.' },
  { title: 'Real cheese', text: 'Authentic taste, rich in protein.' },
  { title: 'Protein-rich ingredients', text: 'Fuel your body. Nourish yourself.' },
  { title: 'Hygiene first', text: 'Clean kitchen. Safe food.' },
]

export const making = {
  video: '/video/navaratri.mp4',
  poster: '/video/navaratri-poster.jpg',
  facts: [
    ['15–20 min', 'Preparation time — cooked to order'],
    ['No analogue', 'Real malai paneer, no analogue paneer'],
    ['Free RO', 'Drinking water on every table'],
  ],
}

export const gallery = [
  { src: L('ShowImage.webp'), alt: 'The Angaar tandoor counter at night', caption: 'The counter' },
  { src: L('Interior.webp'), alt: 'Inside The Angaar — Chill, Grill, Thrill', caption: 'Chill · Grill · Thrill' },
  { src: L('Banner.webp'), alt: 'The Angaar menu banner', caption: 'Straight off the coals' },
]

export const spiceLevels = ['Mild', 'Medium', 'Angaar Fire']

/* ------------------------------------------------------------------ */
/* MENU — transcribed from The_Angaar_New_Menu.pdf (all prices in ₹).   */
/* prices: a number, or [[label, amount], ...] for Chaap / Roll etc.    */
/* spice: 0 mild · 1 medium (outline chilli) · 2 spicy (red chilli).    */
/* fav: 1–3 stars on the printed menu. Allergens/portion are NOT on the */
/* menu — they are per-category placeholders, please verify.            */
/* ------------------------------------------------------------------ */

const cat = (category, base, rows) => ({
  category,
  note: base.note,
  items: rows.map(([name, prices, spice = 0, d, fav = 0, image]) => ({
    name,
    prices: typeof prices === 'number' ? [['', prices]] : prices,
    spice,
    fav,
    desc: d || base.desc,
    tags: base.tags || ['Veg'],
    image: image || base.image,
    allergens: base.allergens,
    portion: base.portion,
  })),
})

const chaapFlavours = [
  ['Masala', 2], ['Garlic', 2, 'Garlic flavour.', 2], ['Punjabi', 1], ['Banjara', 2],
  ['Lamint', 0, 'Lemon flavour.'], ['Achari', 0, 'Achari flavour.'], ['Schezwan', 2],
  ['Afghani', 1, 'In fresh cream.', 3], ['Irani', 2, 'In fresh cream.', 3],
  ['Malai', 0, 'Non-spicy, in fresh cream.'], ['Reshmi', 1, 'In fresh cream.', 3],
]

const creamy = ['Afghani', 'Irani', 'Malai', 'Reshmi']

export const menu = [
  cat(
    'Soya Chaap & Rolls',
    { image: L('SoyaChaap.webp'), allergens: ['Soy', 'Dairy'], portion: 'Chaap plate · or 1 roll', desc: 'Coal-grilled soya chaap, marinated overnight.', tags: ['Veg', 'Tandoor'] },
    [
      ...chaapFlavours.map(([n, s, d, f]) => [
        `${n} Chaap`, [['Chaap', creamy.includes(n) || n === 'Malai' ? 200 : 180], ['Roll', 110]], s, d, f,
        creamy.includes(n) ? L('creamy-chaap.jpg') : undefined,
      ]),
      ['Cheese Chatpata Chaap', [['Chaap', 200], ['Roll', 120]], 0, 'Loaded with cheese and chatpata masala.', 0, L('cheese-chatpata.jpg')],
    ],
  ),
  cat(
    'Paneer / Mushroom Tikkas',
    { image: L('tikka-platter.jpg'), allergens: ['Dairy'], portion: 'Tikka plate · or 1 roll', desc: 'Real malai paneer or button mushroom, roasted over charcoal.', tags: ['Veg', 'Tandoor'] },
    [
      ...chaapFlavours.filter(([n]) => n !== 'Lamint').map(([n, s, d, f]) => [
        `${n} Tikka`, [['Tikka', 250], ['Roll', 130]], s, d, f,
      ]),
      ['Cheese Chatpata Tikka', [['Tikka', 250], ['Roll', 140]], 0, 'Loaded with cheese and chatpata masala.', 0, L('Biryani.webp')],
    ],
  ),
  cat(
    'Mix: Chaap + Paneer',
    { image: L('SoyaChaapRoll.webp'), allergens: ['Soy', 'Dairy'], portion: 'Mix plate · or 1 roll', desc: 'Half chaap, half paneer — the best of both.', tags: ['Veg', 'Tandoor'] },
    [
      ...chaapFlavours.map(([n, s, d, f]) => [n, [['Mix', 225], ['Roll', 120]], n === 'Schezwan' ? 1 : s, d, f]),
      ['Cheese Chatpata', [['Mix', 225], ['Roll', 130]], 0, 'Loaded with cheese and chatpata masala.'],
    ],
  ),
  cat(
    'Dum Biryani',
    { image: L('veg-biryani.jpg'), allergens: ['Dairy'], portion: '1 plate', desc: 'Dum-cooked and served hot.', tags: ['Veg', 'Dum'] },
    [
      ['Angaar Special Veg Dum Biryani', 150, 0, 'Our house special.', 3],
      ['Veg Dum Biryani — 1 kg', 900, 0, 'Available on booking only.'],
    ],
  ),
  cat(
    'Combos & Platter',
    { image: L('tikka-platter.jpg'), allergens: ['Gluten', 'Dairy', 'Soy'], portion: '1 combo', desc: 'A full meal at a fixed price.', tags: ['Veg', 'Combo'] },
    [
      ['Angaar Chaap Combo', 130, 0, '2 rumali roti + chaap gravy.'],
      ['Angaar Paneer Combo', 150, 0, '2 rumali roti + paneer gravy.'],
      ['Angaar Combo Special', 400, 0, '1 veg dum biryani + 1 chaap roll + 2 rumali roti + chaap gravy + 1 cold drink.', 3, L('veg-biryani.jpg')],
      ['Angaar Platter', 500, 0, 'Chaap + paneer tikka + mushroom tikka.'],
      ['Burger Combo', 250, 0, 'Veg tikki burger + fries + cold coffee.', 0, L('Burger.webp')],
      ['Pizza Combo', 550, 0, 'Pizza + veg tikki burger + fries + cold coffee.', 0, L('pizza.webp')],
    ],
  ),
  cat(
    'Pizza',
    { image: L('pizza.webp'), allergens: ['Gluten', 'Dairy'], portion: '1 pizza', desc: 'Oven-baked, loaded with cheese.', tags: ['Veg'] },
    [
      ['Margherita', 150],
      ['Cheese Corn', 200],
      ['Tandoori Chaap', 250],
      ['Tandoori Paneer', 300],
      ['Angaar Special', 350, 0, 'The house pizza.', 3],
    ],
  ),
  cat(
    'Burgers & Sandwiches',
    { image: L('Burger.webp'), allergens: ['Gluten', 'Dairy', 'Soy'], portion: '1 burger or sandwich', desc: 'Choose Afghani, Malai or Peri Peri.', tags: ['Veg'] },
    [
      ['Tandoori Soya Chaap Burger', 100, 0, 'Afghani / Malai / Peri Peri.'],
      ['Tandoori Paneer Burger', 110, 0, 'Afghani / Malai / Peri Peri.'],
      ['Veg Tikki Burger', 100],
      ['Tandoori Soya Chaap Sandwich', 100, 0, 'Afghani / Malai / Peri Peri.', 0, L('Sanwich.webp')],
      ['Tandoori Paneer Sandwich', 110, 0, 'Afghani / Malai / Peri Peri.', 0, L('Sanwich.webp')],
    ],
  ),
  cat(
    'Momos',
    { image: L('momos.jpg'), allergens: ['Gluten', 'Soy'], portion: '6 pcs', desc: 'Served with red chutney.', tags: ['Veg'] },
    [
      ['Steamed Veg Momos', 100],
      ['Fried Veg Momos', 110],
      ['Steamed Paneer Momos', 120, 0, null, 0],
      ['Fried Paneer Momos', 130],
      ['Angaar Special Veg Momos', 140, 0, 'The house special.', 3],
      ['Angaar Special Paneer Momos', 150, 0, 'The house special.', 3],
    ],
  ),
  cat(
    'Fries, Sides & Snacks',
    { image: L('loaded-fries.jpg'), allergens: ['Dairy'], portion: 'Regular', desc: 'Crisp, hot and generously seasoned.', tags: ['Veg'] },
    [
      ['Salted Fries', 80],
      ['Peri Peri Fries', 100],
      ['Cheese Peri Peri Fries', 120],
      ['Angaar Special Loaded Fries', 250, 0, 'The house special.', 3],
      ['Cheese Garlic Bread', 100, 0, null, 0, L('Sanwich.webp')],
      ['Jalapeño Nachos', 100],
      ['Cheese Nachos', 120],
      ['Cheese Peri Peri Corn', 100],
    ],
  ),
  cat(
    'Diet Menu',
    { image: L('diet.jpg'), allergens: [], portion: '1 plate', desc: 'Grilled, light, high-protein.', tags: ['Veg', 'High protein'] },
    [
      ['Chaap', 150],
      ['Paneer', 200, 0, null, 0],
      ['Mushroom', 200],
      ['Sweet Potato (Ratalu)', 120, 0, 'Seasonal.'],
    ],
  ),
  cat(
    'Desserts',
    { image: L('brownie.jpg'), allergens: ['Dairy', 'Gluten', 'Nuts'], portion: '1 serving', desc: 'The sweet finish.', tags: ['Veg'] },
    [
      ['Sizzling Brownie', 150],
      ['Ice Cream with Choco Chips', 70],
      ['Gulab Jamun with Ice Cream', 80],
    ],
  ),
  cat(
    'Extras',
    { image: L('SoyaChaapRoll.webp'), allergens: ['Dairy', 'Gluten'], portion: 'Add-on', desc: 'Add to any order.', tags: ['Veg'] },
    [
      ['Cream', 20],
      ['Cheese', 20],
      ['Rumali Roti', 20],
      ['Butter Rumali Roti', 30],
      ['Chaap Gravy', 80],
      ['Paneer Gravy', 100],
    ],
  ),
]

export const menuNotes = [
  'Preparation: 15–20 minutes',
  'Malai paneer · No analogue paneer · Free RO drinking water',
  'No palmolein oil used directly; sunflower oil for selected dishes',
]

// Public Google reviews, copied from the restaurant's Google listing.
export const reviews = [
  { id: 'rev-1', author: 'Akhilesh Prajapati', rating: 5, timeAgo: 'a month ago', text: 'The Soya Chaap and Paneer Tikka were fantastic. Both dishes were incredibly juicy, perfectly charred, and packed with flavor. Highly recommended for a satisfying, high-protein vegetarian meal!', highlightDish: 'Soya Chaap & Paneer Tikka' },
  { id: 'rev-2', author: 'Prajakta Kusare', rating: 5, timeAgo: 'a week ago', text: 'Amazing food, delicious flavours, excellent service, and a wonderful ambience. A must-visit for vegetarian food lovers. Highly recommended! ❤️', highlightDish: 'Pure Veg Ambience' },
  { id: 'rev-3', author: 'Krishna Bolkar', rating: 5, timeAgo: 'a month ago', text: 'The Paneer Roll and Soya Chaap were both delicious, fresh, and packed with flavour. The ingredients tasted premium and authentic, with no compromise on quality.', highlightDish: 'Paneer Roll & Soya Chaap' },
  { id: 'rev-4', author: 'Shubham Rathod', rating: 5, timeAgo: 'a month ago', text: 'If you are looking for authentic vegetarian tandoori flavors, generous portions, and great value for money, this combination of Chaap, Biryani, and Combos is a must-try!', highlightDish: 'Tandoori Combos & Biryani' },
  { id: 'rev-5', author: 'Nycrotech Gaming', rating: 5, timeAgo: 'a month ago', text: 'The owners are genuinely health conscious, and the entire food preparation is spotless and hygienic.', highlightDish: 'Hygiene & Preparation' },
  { id: 'rev-6', author: 'Samadhan Magare', badge: 'Local Guide', rating: 5, timeAgo: 'a month ago', text: 'Best soya chaap place in Waluj Mahanagar! I tried their Peri Peri Soya Chaap and it was too good. Must visit!', highlightDish: 'Peri Peri Soya Chaap' },
  { id: 'rev-7', author: 'Prashant Domle', rating: 5, timeAgo: 'a month ago', text: 'Tried soya chaap here for the first time and absolutely loved it. The chaap was melt-in-mouth soft, perfectly cooked, and packed with authentic tandoori flavours.', highlightDish: 'Tandoor Soya Chaap' },
  { id: 'rev-8', author: 'Abhishek Adhane', rating: 5, timeAgo: 'a month ago', text: 'The chaap was incredibly delicious, perfectly cooked, and full of flavour. The taste, quality, and sizzler presentation were all top-notch.', highlightDish: 'Taste & Presentation' },
  { id: 'rev-9', author: 'Akshay Khandare', badge: 'Local Guide', rating: 5, timeAgo: 'a month ago', text: 'Great food variety and even better quality. The team is friendly and welcoming, making the outdoor seating experience really enjoyable.', highlightDish: 'Service & Ambience' },
  { id: 'rev-10', author: 'Ritesh Prajapati', rating: 5, timeAgo: 'a month ago', text: 'Great hangout spot. You must try their Garlic Chaap Roll!', highlightDish: 'Garlic Chaap Roll' },
]
