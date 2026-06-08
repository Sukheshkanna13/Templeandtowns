// Temple And Towns Resorts — client-editable data
// Update properties[], rooms{}, and reviews[] below when the client provides real content.
// Images: place files in /images/ and update the placeholder/label keys.

export const WA_URL = 'https://api.whatsapp.com/send/?phone=0000000000&text=Hi%2C+I%27d+like+to+chat+about+Temple+And+Towns+Resorts.&type=phone_number&app_absent=0';

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
      area: 'White Town · 100m from beach',
      blurb: 'Madhubani 1 on 1st Floor, is located centrally in Pondicherry White Town. You will be close to beach, Sri Aurobindo Ashram, and nightlife. A cozy 1BHK with a small balcony and fully functional kitchen.',
      rating: 4.9,
      reviews: '10+',
      from: 'Book on Airbnb',
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
      area: 'White Town · 100m from beach',
      blurb: 'Madhubani 2 on 2nd Floor, located centrally in White Town. Steps from the marketplace, groceries, and all daily needs. A cozy 1BHK independent floor for long stays.',
      rating: 4.8,
      reviews: '10+',
      from: 'Book on Airbnb',
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
      area: 'White Town · 100m from beach',
      blurb: 'Decor Inspired by Rajasthani Art and Traditions. 2BHK apartment in the 1st floor of a independent building with a full kitchen and in close proximity to all attractions.',
      rating: 4.9,
      reviews: '10+',
      from: 'Book on Airbnb',
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
      name: 'Temple And Towns Resorts Nature Retreat',
      area: 'Near Auroville',
      blurb: 'Nestled in the peaceful surroundings Near Auroville, designed for resting and simple living. 12 Rooms with attached baths, Swimming Pool, Parking, Garden on a one acre facility. 5-7 minutes from Matrimandir.',
      rating: 4.9,
      reviews: '10+',
      from: 'Book on Booking.com',
      bookingUrl: 'https://www.booking.com/hotel/in/ttr-nature-retreat-auroville.html',
      cover: 'images/Auroville/1.jpeg',
      images: [
        'images/Auroville/1.jpeg', 'images/Auroville/2.jpeg', 'images/Auroville/3.jpeg', 'images/Auroville/4.jpeg', 'images/Auroville/5.jpeg',
        'images/Auroville/6.jpeg', 'images/Auroville/7.jpeg', 'images/Auroville/8.jpeg', 'images/Auroville/9.jpeg', 'images/Auroville/10.jpeg',
        'images/Auroville/11.jpeg', 'images/Auroville/12.jpeg', 'images/Auroville/13.jpeg', 'images/Auroville/14.jpeg', 'images/Auroville/15.jpeg',
        'images/Auroville/16.jpeg', 'images/Auroville/17.jpeg',
      ],
    },
  ],
  rooms: {
    p1: [
      { id: 'r1a', type: '1BHK 1st Floor', capacity: 3, price: 'Book on Airbnb', beds: '1 Queen + Living Room', size: 'Independent floor', amenities: ['Wi-Fi', 'Kitchen', 'Laundry', 'Balcony'] },
    ],
    p2: [
      { id: 'r2a', type: '1BHK 2nd Floor', capacity: 3, price: 'Book on Airbnb', beds: '1 Queen + Living Room', size: 'Independent floor', amenities: ['Wi-Fi', 'Kitchen', 'Laundry', 'Balcony'] },
    ],
    p3: [
      { id: 'r3a', type: '2BHK 1st Floor', capacity: 5, price: 'Book on Airbnb', beds: '2 Queen + Living Room', size: 'Independent floor', amenities: ['Wi-Fi', 'Kitchen', 'Rajasthani Decor'] },
    ],
    p4: [
      { id: 'r4a', type: 'Nature Retreat', capacity: 2, price: 'Book on Booking.com', beds: '1 Queen', size: 'Attached Pool', amenities: ['WiFi', 'Garden View', 'Pool Access'] },
    ],
  },
  reviews: [
    { name: 'Abhijith', rating: 5, text: 'It was a great stay, and I am really happy with my experience.', when: '2026' },
    { name: 'Johnny', rating: 5, text: ' Stay was amazing Dev was great and helped us with local recommendations Even checking on us mid stay if everything went well overall great stay great locality restaurants are very close by and there\'s a rental place right outside the stay and the beach is also pretty close from here, Again thank you for an amazing stay', when: '2026' },
    { name: 'Bhumika', rating: 5, text: 'The stay was absolutely great! The place is beautiful and felt just like home. All the required amenities were available and well-maintained. The location is perfect, with the beach at a walkable distance which made the experience even better. The host was very responsive, friendly, and always ready to help. Highly recommended!', when: '2026' },
  ]
};
