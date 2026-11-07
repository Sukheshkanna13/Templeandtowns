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

const makeRetreatGallery = (startIdx = 0) => {
  const rotated = [...AUROVILLE_IMAGES.slice(startIdx), ...AUROVILLE_IMAGES.slice(0, startIdx)];
  return rotated;
};

const retreatRoom = (id, name, floor, bookingUrl, startIdx = 0) => {
  const images = makeRetreatGallery(startIdx);
  return {
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
    cover: images[0],
    images,
    theSpace: '12 Room Self Service boutique stay, in a quiet forest backdrop, set up in an acre of land. 6 Nos. of Private Rooms, each with attached bath on the ground floor and another 6 Nos. of Private rooms with attached bath on the 1st floor.',
    roomAmenities: RETREAT_ROOM_AMENITIES,
    bathroomAmenities: RETREAT_BATHROOM_AMENITIES,
    sharedAmenities: RETREAT_SHARED_AMENITIES,
    houseRules: RETREAT_HOUSE_RULES,
  };
};

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
    retreatRoom('p5', 'TempleAndThorpe Room 206, 1st Floor Near Auroville Matrimandir', '1st Floor', 'https://www.airbnb.co.in/rooms/1771964630881690059', 3),
    retreatRoom('p6', 'TempleAndThorpe Room 205, 1st Floor Near Auroville Matrimandir', '1st Floor', 'https://www.airbnb.co.in/rooms/1787003545321046982', 6),
    retreatRoom('p7', 'TempleAndThorpe Room 106, Ground Floor Near Auroville Matrimandir', 'Ground Floor', 'https://www.airbnb.co.in/rooms/1784975376331049190', 9),
    retreatRoom('p8', 'TempleAndThorpe Room 105, Ground Floor Near Auroville Matrimandir', 'Ground Floor', 'https://www.airbnb.co.in/rooms/1792518932484614919', 12),
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
    {
      name: 'Sachin',
      badge: '3 years on Airbnb',
      rating: 5,
      when: '2 weeks ago',
      text: 'Our stay at TempleAndThorpe was an absolute delight! The rooms were clean, and very comfortable, and the quiet nature vibe made our family trip truly memorable and ensured we had everything we needed. Wishing the TempleAndThorpe team tremendous success ahead—we’d love to come back!',
      response: {
        author: 'Temple And Thorpe Resorts',
        when: '2 weeks ago',
        text: 'Thank you so much for staying with TempleAndThorpe. It was an absolute pleasure hosting you and your family. We are absolutely looking forward to seeing you all back again soon 🙏🙏🙏',
      },
    },
    {
      name: 'Trinetri',
      badge: '8 years on Airbnb',
      rating: 5,
      when: 'October 2026',
      text: 'We absolutely love staying at Temple and Thorpe and keep coming back every time we’re in Auroville. It has become one of our favourite places to stay. The location is fantastic - peaceful and tucked away, yet very close to the main Auroville area. The rooms are beautifully appointed, spotlessly clean, comfortable, and thoughtfully maintained. What really makes the stay special is Debashish, the host. He is warm, gracious and incredibly accommodating, always ready to help without ever being intrusive. He genuinely goes the extra mile to make you feel welcome. On this visit, knowing how much we love plants, he even offered to take us to a local nursery! It’s this personal touch and wonderful hospitality that keeps bringing us back. We would highly recommend Temple and Thorpe and can’t wait for our next visit!',
    },
    {
      name: 'Abhipsa',
      rating: 5,
      when: '3 days ago',
      text: 'Had a pleasant stay experience at Temple and Thorpe. Host was responsive and helpful throughout.',
      response: {
        author: 'Temple And Thorpe Resorts',
        when: 'November 2026',
        text: 'Thank you so much for staying with Temple And Thorpe resorts. It was a pleasure hosting you and your family. We are looking forward to seeing you all back soon 🙏🙏',
      },
    },
    {
      name: 'Tejaswi',
      rating: 5,
      when: '4 days ago',
      text: 'We went as a family of three people and stayed 3 nights. The stay is very close to the beach, just a 2-minute walk. We can get groceries, fruits and vegetables very close by, and there are branded showrooms too. I cooked all the meals — the kitchen has decent cookware for a family. The host response to any issues is very fast; we had a great time.',
      response: {
        author: 'Temple And Thorpe Resorts',
        when: 'November 2026',
        text: 'Thank you so much for staying with Temple And Thorpe Resorts. It was a pleasure hosting you and your family. We are looking forward to seeing you back soon 🙏🙏🙏',
      },
    },
    {
      name: 'Ragul',
      badge: 'Chennai, India',
      rating: 5,
      when: '6 days ago',
      text: 'One of the wonderful stay the owner was very polite full and very friendly. One of the best stay. Easy access to beach, French colony etc',
      response: {
        author: 'Temple And Thorpe Resorts',
        when: 'October 2026',
        text: 'Thank you so much for staying with Temple And Thorpe Resorts. It was an absolute pleasure hosting your group. We are looking forward to seeing you back soon 🙏🙏🙏',
      },
    },
    {
      name: 'Narendra',
      rating: 5,
      when: '1 week ago',
      text: 'Had a wonderful 2-day stay at Temple and Thorpe. The property was beautiful, peaceful, and well maintained, with a great ambience for a relaxing getaway. The place was comfortable, clean, and exactly what we needed for a pleasant stay. Overall, a great experience and I would happily recommend it for a relaxing trip.',
      response: {
        author: 'Temple And Thorpe Resorts',
        when: 'October 2026',
        text: 'Thank you so much for staying with TempleAndThorpe Resorts. It was our pleasure hosting you and your family. We are looking forward to seeing you back soon 🙏🙏',
      },
    },
    {
      name: 'Abhrajit',
      badge: 'Nadia, India',
      rating: 5,
      when: '1 week ago',
      text: 'We had an excellent stay! The property is beautiful, spacious, and very comfortable. The host is very responsive and helpful. Sri Aurobindo Ashram is just a 5-minute walk away, making the location perfect for exploring the area. The kitchen is also very well-equipped with everything needed. Overall, a wonderful experience. Highly recommended!',
    },
    {
      name: 'Guest',
      rating: 5,
      when: 'Dec 2025',
      text: 'Easy to find and close to wonderful cafes. The host was very responsive and provided wonderful recommendations on sightseeing and dining. Highly recommended for couples or solo stays.',
    },
    {
      name: 'Guest',
      rating: 5,
      when: 'Dec 2025',
      text: 'I recently had the pleasure of staying at TempleAndTowns Resorts Puducherry, and it was a truly wonderful experience. The accommodation was clean, well maintained, and thoughtfully arranged for comfort. The staff were warm, welcoming, and attentive to every detail.',
    },
    {
      name: 'Guest',
      rating: 5,
      when: 'Dec 2025',
      text: 'Temple and Towns Resorts exceeded expectations. The property is extremely well maintained, and the vibe is serene and refreshing. Every corner reflects care and quality. Great value for couples, families, or solo travelers. The host was always reachable throughout.',
    },
    {
      name: 'Bhumika',
      rating: 5,
      when: '2026',
      text: 'The stay was absolutely great! The place is beautiful and felt just like home. All the required amenities were available and well-maintained. The location is perfect, with the beach at a walkable distance which made the experience even better. The host was very responsive, friendly, and always ready to help. Highly recommended!',
    },
    {
      name: 'Johnny',
      rating: 5,
      when: '2026',
      text: "Stay was amazing! Dev was great and helped us with local recommendations, even checking on us mid stay if everything went well overall great stay great locality restaurants are very close by and there's a rental place right outside the stay and the beach is also pretty close from here, Again thank you for an amazing stay!",
    },
    {
      name: 'Abhijith',
      rating: 5,
      when: '2026',
      text: 'It was a great stay, and I am really happy with my experience.',
    },
  ],
  homepage: {
    autoScrollStays: true,
    autoScrollMoments: true,
    heroLine1: 'TEMPLEANDTHORPE NATURE RETREAT,',
    heroLine2: 'NEAR AUROVILLE MATRIMANDIR',
    holdSeconds: 10,
    fadeSeconds: 1.2,
    heroSlides: [
      {
        desktopJpg: 'images/hero/hero-desktop.jpg',
        alt: 'Temple And Thorpe Resorts Nature Retreat — garden pavilion and lily pond at sunset'
      },
      {
        desktopJpg: 'images/hero-2.jpg',
        alt: 'Temple And Thorpe Nature Retreat — lush green property view'
      }
    ]
  },
  moments: [
    {
      id: 'm1',
      label: 'pottery',
      cap: 'Pottery, Near Auroville',
      img: 'images/pottery.png',
      link: 'https://www.instagram.com/reel/',
      type: 'photo'
    },
    {
      id: 'm2',
      label: 'sea-evening',
      cap: 'Promenade, dusk',
      img: 'images/sea-evening.png',
      link: 'https://www.instagram.com/reel/',
      type: 'photo'
    },
    {
      id: 'm3',
      label: 'morning-yoga',
      cap: 'Yoga Near Auroville',
      img: 'images/morning-yoga.png',
      link: 'https://www.instagram.com/reel/',
      type: 'photo'
    },
    {
      id: 'm4',
      label: 'banyan-tree',
      cap: 'Nature walks in Auroville',
      img: 'images/banyan-tree.png',
      link: 'https://www.instagram.com/reel/',
      type: 'photo'
    },
    {
      id: 'm5',
      label: 'street-food',
      cap: 'White Town evenings',
      img: 'images/street-food.png',
      link: 'https://www.instagram.com/reel/',
      type: 'photo'
    }
  ],
  thingsToDo: [
    {
      id: 'act1',
      title: 'Matrimandir Meditation & Garden Walk',
      category: 'Spiritual & Nature',
      area: 'Near Auroville',
      desc: 'Experience profound silence and architectural harmony at the golden dome of Matrimandir, surrounded by twelve serene peaceful gardens.',
      image: 'images/Auroville/1.jpeg'
    },
    {
      id: 'act2',
      title: 'French Quarter Heritage Walk',
      category: 'Heritage & Architecture',
      area: 'Pondicherry White Town',
      desc: 'Stroll through cobbled boulevards lined with pastel mustard villas, charming bougainvillea-draped cafes, and French colonial heritage.',
      image: 'images/1F-1BHK/1.jpeg'
    },
    {
      id: 'act3',
      title: 'Sunrise Walk at Promenade Beach',
      category: 'Beaches & Ocean',
      area: 'Goubert Avenue, Pondicherry',
      desc: 'Watch spectacular golden sunrises over the Bay of Bengal along the scenic 1.5 km vehicular-free seaside promenade.',
      image: 'images/sea-evening.png'
    },
    {
      id: 'act4',
      title: 'Artisan Pottery & Clay Workshops',
      category: 'Workshops & Crafts',
      area: 'Auroville Village',
      desc: 'Get hands-on experience on traditional potter wheels guided by master Auroville artisans using organic local terracotta.',
      image: 'images/pottery.png'
    }
  ],
  events: [
    {
      id: 'ev1',
      title: 'Full Moon Yoga & Sound Bath',
      date: 'Next Full Moon · 6:30 AM',
      venue: 'Lotus Pavilion, Nature Retreat',
      desc: 'Awaken your senses with gentle restorative yoga accompanied by Tibetan singing bowls in our lush open garden pavilion.',
      rsvpUrl: 'https://wa.me/919999999999'
    },
    {
      id: 'ev2',
      title: 'Organic Farm-to-Table Dinner',
      date: 'Every Saturday · 7:30 PM',
      venue: 'Common Dining Pergola',
      desc: 'A 5-course artisanal dinner prepared with freshly harvested greens and vegetables from our Auroville partner permaculture gardens.',
      rsvpUrl: 'https://wa.me/919999999999'
    }
  ],
  cause: {
    title: 'Travel for a Cause · Green Living & Community',
    subtitle: 'Every booking directly supports local reforestation and Auroville community artisans.',
    metrics: [
      { label: 'Trees Planted', value: '1,200+' },
      { label: 'Local Artisans Supported', value: '35+' },
      { label: 'Rainwater Harvested', value: '100%' },
      { label: 'Solar Powered', value: '80%' }
    ],
    initiatives: [
      {
        name: 'Indigenous Tree Nursery',
        desc: 'We propagate native tropical dry evergreen forest trees and offer saplings to visiting guests to plant along the Auroville green belt.'
      },
      {
        name: 'Zero Single-Use Plastic Policy',
        desc: 'Pure filtered water in stainless steel bottles and glass carafes across all our rooms and apartments.'
      }
    ]
  },
  rewards: {
    title: 'Temple & Thorpe Privileges',
    badge: 'Direct Booking Benefits',
    perks: [
      { icon: 'key', title: 'Best Price Guaranteed', desc: 'Book direct with no intermediary commissions or platform service fees.' },
      { icon: 'clock', title: 'Flexible Check-in / Checkout', desc: 'Complimentary early check-in or late checkout upon availability.' },
      { icon: 'gift', title: 'Welcome Refreshments', desc: 'Locally brewed organic iced tea and fresh coastal coconut on arrival.' },
      { icon: 'shield', title: 'Free Cancellation', desc: 'Flexible reschedule or cancellation up to 48 hours before check-in.' }
    ]
  },
  contact: {
    phone: '+91 94888 88888',
    whatsapp: '919488888888',
    email: 'stay@templeandthorperesorts.com',
    address: 'Temple And Thorpe Nature Retreat, Near Matrimandir, Auroville, Tamil Nadu 605101',
    checkInTime: '2:00 PM',
    checkOutTime: '11:00 AM'
  },
  bookings: [
    {
      id: 'BK-1001',
      guestName: 'Ananya Sharma',
      phone: '+91 98765 43210',
      email: 'ananya@example.com',
      roomName: 'Nature Retreat - Standard Room (Room 101)',
      checkIn: '2026-11-15',
      checkOut: '2026-11-18',
      guests: '2 Guests',
      totalAmount: '₹8,400',
      status: 'Confirmed'
    },
    {
      id: 'BK-1002',
      guestName: 'Rahul Verma',
      phone: '+91 98111 22334',
      email: 'rahul.v@example.com',
      roomName: 'White Town 1BHK - 1st Floor',
      checkIn: '2026-11-20',
      checkOut: '2026-11-23',
      guests: '2 Guests',
      totalAmount: '₹14,500',
      status: 'Pending'
    },
    {
      id: 'BK-1003',
      guestName: 'Sylvie Laurent',
      phone: '+33 6 12 34 56 78',
      email: 'sylvie.l@paris.fr',
      roomName: 'Nature Retreat - Family Suite (Room 106)',
      checkIn: '2026-12-01',
      checkOut: '2026-12-07',
      guests: '4 Guests',
      totalAmount: '₹28,000',
      status: 'Confirmed'
    }
  ]
};
