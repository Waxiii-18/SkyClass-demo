const { db } = require('../config/firebase');

// Sample courses data for demo
const sampleCourses = [
  {
    title: "Introduction to Web Development",
    instructor: "John Doe",
    category: "web-development",
    description: "Learn the fundamentals of web development including HTML, CSS, and JavaScript. Perfect for beginners who want to start their coding journey.",
    thumbnail: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=250&fit=crop",
    price: 0,
    level: "Beginner",
    duration: "8 hours",
    lessons: 24,
    status: "published",
    createdAt: new Date().toISOString(),
    enrollmentCount: 1250,
    averageRating: 4.8,
    ratingCount: 156
  },
  {
    title: "JavaScript Fundamentals",
    instructor: "Jane Smith",
    category: "programming",
    description: "Master JavaScript from basics to advanced concepts including ES6+, async programming, and modern development practices.",
    thumbnail: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=400&h=250&fit=crop",
    price: 29.99,
    level: "Intermediate",
    duration: "12 hours",
    lessons: 36,
    status: "published",
    createdAt: new Date().toISOString(),
    enrollmentCount: 2100,
    averageRating: 4.9,
    ratingCount: 234
  },
  {
    title: "React.js Basics",
    instructor: "Mike Johnson",
    category: "web-development",
    description: "Build modern web applications with React.js, including hooks, state management, and routing.",
    thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=250&fit=crop",
    price: 49.99,
    level: "Beginner",
    duration: "10 hours",
    lessons: 28,
    status: "published",
    createdAt: new Date().toISOString(),
    enrollmentCount: 1800,
    averageRating: 4.7,
    ratingCount: 189
  }
];

// Sample lessons data
const sampleLessons = {
  "course-1": [
    {
      id: "lesson-1",
      title: "Welcome to Web Development",
      duration: "15 min",
      type: "video",
      description: "Introduction to the course and what you'll learn",
      url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    },
    {
      id: "lesson-2",
      title: "HTML Basics",
      duration: "45 min",
      type: "video",
      description: "Learn the fundamentals of HTML markup",
      url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    },
    {
      id: "lesson-3",
      title: "CSS Fundamentals",
      duration: "60 min",
      type: "video",
      description: "Styling your web pages with CSS",
      url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    }
  ]
};

async function seedCourses() {
  try {
    console.log('🌱 Seeding courses...');
    
    for (const course of sampleCourses) {
      const courseRef = await db.collection('courses').add(course);
      console.log(`✅ Added course: ${course.title} (ID: ${courseRef.id})`);
      
      // Add lessons if they exist
      const lessons = sampleLessons[`course-${sampleCourses.indexOf(course) + 1}`];
      if (lessons) {
        for (const lesson of lessons) {
          await db.collection('lessons').add({
            ...lesson,
            courseId: courseRef.id,
            createdAt: new Date().toISOString()
          });
        }
      }
    }
    
    console.log('✅ Courses seeded successfully!');
  } catch (error) {
    console.error('❌ Error seeding courses:', error);
  }
}

async function seedUsers() {
  try {
    console.log('🌱 Seeding sample users...');
    
    const sampleUsers = [
      {
        uid: "demo-user-1",
        email: "student@skyclass.com",
        displayName: "Demo Student",
        role: "student",
        createdAt: new Date().toISOString()
      },
      {
        uid: "demo-admin-1",
        email: "admin@skyclass.com",
        displayName: "Demo Admin",
        role: "admin",
        createdAt: new Date().toISOString()
      }
    ];
    
    for (const user of sampleUsers) {
      await db.collection('users').doc(user.uid).set(user);
      console.log(`✅ Added user: ${user.displayName} (${user.role})`);
    }
    
    console.log('✅ Users seeded successfully!');
  } catch (error) {
    console.error('❌ Error seeding users:', error);
  }
}

async function seedData() {
  console.log('🚀 Starting data seeding...');
  await seedCourses();
  await seedUsers();
  console.log('🎉 Data seeding completed!');
}

module.exports = { seedData, seedCourses, seedUsers };
