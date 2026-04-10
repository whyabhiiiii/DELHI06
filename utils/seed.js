const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Activity = require('../models/Activity');
const TimeSlot = require('../models/TimeSlot');
const User = require('../models/User');

dotenv.config();

const activities = [
  {
    title: 'Old Delhi Food Walk',
    description: 'Embark on a mouthwatering journey through the legendary food lanes of Old Delhi. From the iconic parathas of Paranthe Wali Gali to the aromatic kebabs of Jama Masjid, this walk is a feast for all your senses. Taste street food that has been perfected over generations — crispy jalebis, creamy rabri, spicy chaat, and much more. Our expert guides share the stories, history, and secret recipes behind each dish.',
    shortDescription: 'Taste legendary street food from Chandni Chowk to Jama Masjid — parathas, kebabs, jalebis & more.',
    category: 'Food & Culinary',
    duration: '3.5 Hours',
    durationHours: 3.5,
    price: 2500,
    maxGroupSize: 8,
    difficulty: 'easy',
    coverImage: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800',
    images: [
      'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800',
      'https://images.unsplash.com/photo-1567337710282-00832b415979?w=800',
    ],
    highlights: [
      'Taste 12+ iconic dishes across 6 legendary food stops',
      'Visit Paranthe Wali Gali — the 150-year-old paratha street',
      'Try the famous Jama Masjid kebabs & nihari',
      'Sample Old Delhi\'s best jalebis, rabri & kulfi',
      'Hear stories of Mughal-era culinary traditions',
      'Small groups for a personal experience',
    ],
    includes: [
      'All food tastings (12+ dishes)',
      'Bottled water',
      'Expert local guide',
      'Walking tour of historic food lanes',
    ],
    meetingPoint: 'Gate 1, Chandni Chowk Metro Station',
    rating: 4.8,
    reviewCount: 47,
    badge: 'Bestseller',
    badgeColor: '#e67e22',
  },
  {
    title: 'Heritage Architecture Walk',
    description: 'Step back in time and witness the architectural grandeur of Shahjahanabad. This heritage walk takes you through the magnificent lanes of Old Delhi, exploring Mughal, British Colonial, and Hindu architectural styles that coexist in this living museum. Visit the stunning Jama Masjid, walk through the historic Chandni Chowk, discover hidden havelis with intricate jharokhas, and learn about the city that Shah Jahan built.',
    shortDescription: 'Explore Mughal masterpieces, hidden havelis & centuries-old monuments in Shahjahanabad.',
    category: 'Heritage & History',
    duration: '4 Hours',
    durationHours: 4,
    price: 1800,
    maxGroupSize: 10,
    difficulty: 'easy',
    coverImage: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800',
    images: [
      'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800',
      'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800',
    ],
    highlights: [
      'Explore the majestic Jama Masjid — India\'s largest mosque',
      'Walk through 400-year-old Mughal-era lanes',
      'Discover hidden havelis with stunning architecture',
      'See the iconic Red Fort from exclusive viewpoints',
      'Learn about Shahjahanabad\'s rich history',
      'Photography opportunities at every turn',
    ],
    includes: [
      'Expert heritage guide',
      'Monument entry tickets',
      'Historical maps & booklet',
      'Bottled water',
    ],
    meetingPoint: 'Gate 3, Jama Masjid',
    rating: 4.7,
    reviewCount: 32,
    badge: 'Heritage',
    badgeColor: '#8e44ad',
  },
  {
    title: 'Authentic Cooking Class',
    description: 'Learn to cook authentic Old Delhi cuisine in a traditional kitchen setting. Under the guidance of a master chef whose family has been cooking for generations, you\'ll learn to prepare classic Mughlai dishes from scratch. From kneading the perfect naan dough to balancing the spices in a rich curry, this hands-on class teaches you techniques that no cookbook can. End the class with a feast of your own creations!',
    shortDescription: 'Master Mughlai cooking with a family chef — hands-on biryani, kebabs, naan & curry class.',
    category: 'Food & Culinary',
    duration: '5 Hours',
    durationHours: 5,
    price: 3500,
    maxGroupSize: 6,
    difficulty: 'easy',
    coverImage: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800',
    images: [
      'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800',
    ],
    highlights: [
      'Cook 4 traditional Mughlai dishes from scratch',
      'Learn from a 3rd-generation family chef',
      'Visit a local spice market to pick ingredients',
      'Hands-on experience — you cook everything yourself',
      'Take home a recipe booklet & spice kit',
      'Feast on your own creations at the end',
    ],
    includes: [
      'All ingredients & cooking equipment',
      'Spice market visit',
      'Recipe booklet',
      'Complimentary spice kit to take home',
      'Full meal of dishes you cook',
    ],
    meetingPoint: 'Dariba Kalan, Chandni Chowk',
    rating: 4.9,
    reviewCount: 28,
    badge: 'Popular',
    badgeColor: '#27ae60',
  },
  {
    title: 'Chandni Chowk Market Tour',
    description: 'Dive into the vibrant chaos of Asia\'s oldest and busiest market — Chandni Chowk. This guided tour navigates you through the maze of specialized bazaars, each dedicated to specific trades that have thrived here for centuries. From the glittering wedding jewelry of Dariba Kalan to the aromatic spice markets of Khari Baoli, experience the commercial heart of Old Delhi.',
    shortDescription: 'Navigate the vibrant bazaars of Asia\'s oldest market — spices, jewelry, textiles & more.',
    category: 'Markets & Shopping',
    duration: '3 Hours',
    durationHours: 3,
    price: 1500,
    maxGroupSize: 10,
    difficulty: 'easy',
    coverImage: 'https://images.unsplash.com/photo-1567157577867-05ccb1388e13?w=800',
    images: [
      'https://images.unsplash.com/photo-1567157577867-05ccb1388e13?w=800',
    ],
    highlights: [
      'Explore Khari Baoli — Asia\'s largest spice market',
      'Visit Dariba Kalan — the 400-year-old silver street',
      'Navigate the colorful textile bazaars',
      'Learn expert bargaining techniques',
      'Discover hidden wholesale markets',
      'Quick chai & snack breaks included',
    ],
    includes: [
      'Expert market guide',
      'Chai & street snacks',
      'Shopping tips & maps',
      'Rickshaw ride through narrow lanes',
    ],
    meetingPoint: 'Chandni Chowk Metro Station, Exit 1',
    rating: 4.6,
    reviewCount: 19,
    badge: 'Trending',
    badgeColor: '#2980b9',
  },
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await Activity.deleteMany({});
    await TimeSlot.deleteMany({});
    console.log('🗑️  Cleared existing activities & time slots');

    // Insert activities
    const createdActivities = await Activity.create(activities);
    console.log(`📦 Seeded ${createdActivities.length} activities`);

    // Create time slots for each activity
    const timeSlots = [];
    for (const activity of createdActivities) {
      timeSlots.push(
        {
          activity: activity._id,
          time: '07:00 AM',
          maxCapacity: activity.maxGroupSize,
          recurring: true,
          daysOfWeek: [0, 1, 2, 3, 4, 5, 6],
        },
        {
          activity: activity._id,
          time: '05:00 PM',
          maxCapacity: activity.maxGroupSize,
          recurring: true,
          daysOfWeek: [0, 1, 2, 3, 4, 5, 6],
        }
      );
    }

    await TimeSlot.insertMany(timeSlots);
    console.log(`⏰ Seeded ${timeSlots.length} time slots`);

    // Ensure admin user exists
    const adminExists = await User.findOne({ email: 'admin@delhi6.in' });
    if (!adminExists) {
      await User.create({
        name: 'Delhi 6 Admin',
        email: 'admin@delhi6.in',
        password: 'delhi6admin123',
        phone: '+91-9876543210',
        role: 'admin',
      });
      console.log('👤 Created admin user: admin@delhi6.in / delhi6admin123');
    } else {
      console.log('👤 Admin user already exists');
    }

    console.log('\n🎉 Database seeded successfully!\n');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seed error:', error.message);
    process.exit(1);
  }
};

seedDB();
