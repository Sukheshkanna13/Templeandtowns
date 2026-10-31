// Temple And Thorpe Resorts — client-editable data
// Update properties[], rooms{}, and reviews[] below when the client provides real content.
// Images: place files in /images/ and update the placeholder/label keys.

export const WA_URL = 'https://api.whatsapp.com/send/?phone=0000000000&text=Hi%2C+I%27d+like+to+chat+about+Temple+And+Thorpe+Resorts.&type=phone_number&app_absent=0';

// Shared gallery for the Nature Retreat rooms (swap per room once room-specific photos arrive)
const AUROVILLE_IMAGES = [
  'images/Auroville/1.jpeg', 'images/Auroville/2.jpeg', 'images/Auroville/3.jpeg', 'images/Auroville/4.jpeg', 'images/Auroville/5.jpeg',
  'images/Auroville/6.jpeg', 'images/Auroville/7.jpeg', 'images/Auroville/8.jpeg', 'images/Auroville/9.jpeg', 'images/Auroville/10.jpeg',
  'images/Auroville/11.jpeg', 'images/Auroville/12.jpeg', 'images/Auroville/13.jpeg', 'images/Auroville/14.jpeg', 'images/Auroville/15.jpeg',
  'images/Auroville/16.jpeg', 'images/Auroville/17.jpeg',
];

export const RETREAT_FEATURES = [
  'High Speed Internet',
  'Pool Area',
  'Common Kitchen',
  'Laundry',
  'Library',
  'Game Area',
  'Parking',
  'Power Backup',
  'Cactus Garden',
  'Lily Pond',
];

export const RETREAT_ROOM_AMENITIES = [
  'Large King Size Bed with smaller Side tables',
  'Single Folding bed with attached mattress',
  'Linens, Comforter And Towels',
  'Soap, Shampoo And Conditioner',
  'Working Table with two chairs',
  'Hot Water Kettle',
  'Stainless Steel Water Bottles',
  'Cups and Glasses',
  'Hair Dryer',
  'Iron (On Request)',
  'Large Wardrobe',
  '100 Liter Refrigerator',
  '42 Inches Smart Google TV',
  '1.5 Ton Airconditioner',
  'Ceiling Fan',
  'Three in one light (Warm, Warm White and White)',
];

export const RETREAT_BATHROOM_AMENITIES = [
  'Geyser (Hot Water)',
  'English Toilet',
  'Shower Head',
  'Bucket and Mug',
  'Seating Stool (On Request)',
  'Wash Basin',
  'Liquid Soap',
  'Brass Hanger (Behind Bathroom Door)',
  'Steel Towel Hanger',
  'Mirror with small storage',
];

export const RETREAT_SHARED_AMENITIES = [
  'Common Parking (Outdoor Gated Parking)',
  'Swimming Pool (Timings 7.00 AM - 8.00 PM) — NO LIFEGUARDS ON DUTY',
  'Swimming Pool Seat out area with Potted Bougainvilleas',
  'Developing Garden With Granite Seatings, Lawns, Pergola and Lily Pond',
  'Small Cactus Garden (Near Swimming Pool)',
  'Fruit Trees (Mango, Jackfruit, Sapota, etc.)',
  'Common Kitchen (2nd Floor) with Induction Cooking, Utensils, Hot Pots, Pressure Cookers, Mixers, Sandwich Maker, Hot Water Kettle, Microwave, Bowls and Dishes, Large Refrigerator',
  'Common Laundry (2nd Floor)',
  'Game Area (Between 1st and 2nd Floor)',
  'Small Library (Complete Works Of Mother and Sri Aurobindo)',
  'Large Terrace Seatout area (2nd Floor)',
  'Power Backup',
  'Common Water Purifier on all floors',
  'High Speed Wi-Fi',
];

export const RETREAT_HOUSE_RULES = [
  'Self-Service stay: Common self-service kitchen (induction, microwave, fridge, utensils) and laundry on the 2nd floor',
  'Kindly keep all gates closed at all times (roaming cows and goats can damage complete gardens in moments, if the gates are left open)',
  'Kindly shower before using the pool',
  'Please use swimming pool wear for pool',
  'Please use striped swimming pool towels for the pool',
  'Please do not dry clothes on the porch or on the walls. We have drying area on the terrace (second floor)',
  'No Smoking inside the rooms or premises',
  'No drugs or alcohol on the premises',
];

const retreatRoom = (id, name, floor, bookingUrl) => ({
  id,
  city: 'auroville',
  theme: 'nature',
  name,
  isSelfService: true,
  selfServiceNotice: '12-Room Self-Service Boutique Retreat · 2nd floor common kitchen & laundry',
  area: `Near Auroville Matrimandir · ${floor}`,
  blurb: `A private ${floor.toLowerCase()} room at TEMPLEANDTHORPE NATURE RETREAT, NEAR AUROVILLE MATRIMANDIR — 12 room boutique stay amidst natural settings with green forest backdrop, swimming pool, developing garden and self-service amenities. 5-7 minutes from Matrimandir.`,
  rating: 4.9,
  from: 'Book now',
  bookingUrl,
  cover: AUROVILLE_IMAGES[0],
  images: AUROVILLE_IMAGES,
  theSpace: '12 Room Self Service boutique stay, in a quiet forest backdrop, set up in an acre of land. 6 Nos. of Private Rooms, each with attached bath on the ground floor and another 6 Nos. of Private rooms with attached bath on the 1st floor.',
  roomAmenities: RETREAT_ROOM_AMENITIES,
  bathroomAmenities: RETREAT_BATHROOM_AMENITIES,
  sharedAmenities: RETREAT_SHARED_AMENITIES,
  houseRules: RETREAT_HOUSE_RULES,
});

const retreatRoomType = (id, type, floor) => (
  {
    id,
    type,
    capacity: 3,
    price: 'Book now',
    beds: '1 King Bed + Single Folding Bed',
    size: `${floor} · Attached Bath`,
    amenities: RETREAT_FEATURES,
  }
);

export const TT_DATA = {
  cities: [
    {
      slug: 'pondicherry',
      name: 'Pondicherry',
      tag: 'French quarter, slow mornings',
      hue: 210,
    },
    {
      slug: 'auroville',
      name: 'Near Auroville',
      tag: 'Nature retreat, simple living',
      hue: 145,
    },
  ],
  properties: [
    {
      id: 'p1',
      city: 'pondicherry',
      theme: 'town',
      name: 'White Town 1BHK - 1st Floor',
      isSelfService: true,
      selfServiceNotice: 'Self-Service Apartment · Private fully functional kitchen & laundry',
      area: 'White Town · 100m from beach',
      blurb: 'Madhubani 1 on 1st Floor, is located centrally in Pondicherry White Town. You will be close to beach, Sri Aurobindo Ashram, and nightlife. A cozy 1BHK with a small balcony, fully functional kitchen and self-service facilities.',
      rating: 4.93,
      from: 'Book now',
      bookingUrl: 'https://airbnb.com/h/templeandtownswhitetown1st',
      cover: 'images/1F-1BHK/1.jpeg',
      images: [
        'images/1F-1BHK/1.jpeg', 'images/1F-1BHK/2.jpeg', 'images/1F-1BHK/3.jpeg', 'images/1F-1BHK/4.jpeg', 'images/1F-1BHK/5.jpeg',
        'images/1F-1BHK/6.jpeg', 'images/1F-1BHK/7.jpeg', 'images/1F-1BHK/8.jpeg', 'images/1F-1BHK/9.jpeg', 'images/1F-1BHK/10.jpeg', 'images/1F-1BHK/11.jpeg',
      ],
    },
    {
      id: 'p2',
      city: 'pondicherry',
      theme: 'town',
      name: 'White Town 1BHK - 2nd Floor',
      isSelfService: true,
      selfServiceNotice: 'Self-Service Apartment · Private fully functional kitchen & laundry',
      area: 'White Town · 100m from beach',
      blurb: 'Madhubani 2 on 2nd Floor, located centrally in White Town. Steps from the marketplace, groceries, and all daily needs. A cozy 1BHK independent floor with self-service kitchen for comfortable stays.',
      rating: 4.86,
      from: 'Book now',
      bookingUrl: 'https://airbnb.com/h/templeandtownswhitetown2ndfloor',
      cover: 'images/2F-1BHK/1.jpeg',
      images: [
        'images/2F-1BHK/1.jpeg', 'images/2F-1BHK/2.jpeg', 'images/2F-1BHK/3.jpeg', 'images/2F-1BHK/4.jpeg', 'images/2F-1BHK/5.jpeg',
        'images/2F-1BHK/6.jpeg', 'images/2F-1BHK/7.jpeg', 'images/2F-1BHK/8.jpeg', 'images/2F-1BHK/9.jpeg', 'images/2F-1BHK/10.jpeg',
        'images/2F-1BHK/11.jpeg', 'images/2F-1BHK/12.jpeg', 'images/2F-1BHK/14.jpeg', 'images/2F-1BHK/15.jpeg', 'images/2F-1BHK/16.jpeg', 'images/2F-1BHK/17.jpeg',
      ],
    },
    {
      id: 'p3',
      city: 'pondicherry',
      theme: 'town',
      name: 'White Town 2BHK - 1st Floor',
      isSelfService: true,
      selfServiceNotice: 'Self-Service Apartment · Private fully functional kitchen & laundry',
      area: 'White Town · 100m from beach',
      blurb: 'Decor Inspired by Rajasthani Art and Traditions. 2BHK apartment in the 1st floor of an independent building with a full kitchen, self-service setup, and in close proximity to all attractions.',
      rating: 4.94,
      from: 'Book now',
      bookingUrl: 'https://airbnb.com/h/templeandtowns2bhk1st',
      cover: 'images/1F-2BHK/1.jpeg',
      images: [
        'images/1F-2BHK/1.jpeg', 'images/1F-2BHK/2.jpeg', 'images/1F-2BHK/3.jpeg', 'images/1F-2BHK/4.jpeg', 'images/1F-2BHK/5.jpeg',
        'images/1F-2BHK/6.jpeg', 'images/1F-2BHK/7.jpeg', 'images/1F-2BHK/8.jpeg', 'images/1F-2BHK/9.jpeg', 'images/1F-2BHK/10.jpeg',
        'images/1F-2BHK/11.jpeg', 'images/1F-2BHK/12.jpeg', 'images/1F-2BHK/13.jpeg', 'images/1F-2BHK/14.jpeg',
      ],
    },
    {
      id: 'p4',
      city: 'auroville',
      theme: 'nature',
      name: 'TEMPLEANDTHORPE NATURE RETREAT, NEAR AUROVILLE MATRIMANDIR',
      isSelfService: true,
      selfServiceNotice: '12-Room Self-Service Boutique Retreat · 2nd floor common kitchen & laundry',
      area: 'Near Auroville Matrimandir',
      blurb: 'TempleAndThorpe Nature Retreat is a 12 room boutique stay amidst natural settings, with green forest backdrops, swimming pool and developing garden. The Self-Service boutique retreat is inspired by various Indian art forms from all regions. 5-7 minutes from Matrimandir.',
      rating: 4.9,
      from: 'Book now',
      bookingUrl: 'https://www.booking.com/hotel/in/ttr-nature-retreat-auroville.html',
      cover: AUROVILLE_IMAGES[0],
      images: AUROVILLE_IMAGES,
      theSpace: '12 Room Self Service boutique stay, in a quiet forest backdrop, set up in an acre of land. 6 Nos. of Private Rooms, each with attached bath on the ground floor and another 6 Nos. of Private rooms with attached bath on the 1st floor.',
      roomAmenities: RETREAT_ROOM_AMENITIES,
      bathroomAmenities: RETREAT_BATHROOM_AMENITIES,
      sharedAmenities: RETREAT_SHARED_AMENITIES,
      houseRules: RETREAT_HOUSE_RULES,
    },
    retreatRoom('p5', 'TempleAndThorpe Room 206, 1st Floor Near Auroville Matrimandir', '1st Floor', 'https://www.airbnb.co.in/rooms/1771964630881690059'),
    retreatRoom('p6', 'TempleAndThorpe Room 205, 1st Floor Near Auroville Matrimandir', '1st Floor', 'https://www.airbnb.co.in/rooms/1787003545321046982'),
    retreatRoom('p7', 'TempleAndThorpe Room 106, Ground Floor Near Auroville Matrimandir', 'Ground Floor', 'https://www.airbnb.co.in/rooms/1784975376331049190'),
    retreatRoom('p8', 'TempleAndThorpe Room 105, Ground Floor Near Auroville Matrimandir', 'Ground Floor', 'https://www.airbnb.co.in/rooms/1792518932484614919'),
  ],
  rooms: {
    p1: [
      { id: 'r1a', type: '1BHK 1st Floor', capacity: 3, price: 'Book now', beds: '1 Queen + Living Room', size: 'Independent floor', amenities: ['Wi-Fi', 'Kitchen', 'Laundry', 'Balcony'] },
    ],
    p2: [
      { id: 'r2a', type: '1BHK 2nd Floor', capacity: 3, price: 'Book now', beds: '1 Queen + Living Room', size: 'Independent floor', amenities: ['Wi-Fi', 'Kitchen', 'Laundry', 'Balcony'] },
    ],
    p3: [
      { id: 'r3a', type: '2BHK 1st Floor', capacity: 5, price: 'Book now', beds: '2 Queen + Living Room', size: 'Independent floor', amenities: ['Wi-Fi', 'Kitchen', 'Rajasthani Decor'] },
    ],
    p4: [
      { id: 'r4a', type: 'Nature Retreat Room (12 Rooms Total)', capacity: 3, price: 'Book now', beds: '1 King Bed + Single Folding Bed', size: 'Attached Bath · 6 Ground & 6 1st Floor', amenities: RETREAT_FEATURES },
    ],
    p5: [retreatRoomType('r5a', 'Room 206', '1st Floor')],
    p6: [retreatRoomType('r6a', 'Room 205', '1st Floor')],
    p7: [retreatRoomType('r7a', 'Room 106', 'Ground Floor')],
    p8: [retreatRoomType('r8a', 'Room 105', 'Ground Floor')],
  },
  reviews: [
    { name: 'Abhijith', rating: 5, text: 'It was a great stay, and I am really happy with my experience.', when: '2026' },
    { name: 'Johnny', rating: 5, text: ' Stay was amazing Dev was great and helped us with local recommendations Even checking on us mid stay if everything went well overall great stay great locality restaurants are very close by and there\'s a rental place right outside the stay and the beach is also pretty close from here, Again thank you for an amazing stay', when: '2026' },
    { name: 'Bhumika', rating: 5, text: 'The stay was absolutely great! The place is beautiful and felt just like home. All the required amenities were available and well-maintained. The location is perfect, with the beach at a walkable distance which made the experience even better. The host was very responsive, friendly, and always ready to help. Highly recommended!', when: '2026' },
  ]
};
