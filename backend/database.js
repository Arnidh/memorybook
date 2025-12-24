const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'memories.db');
const db = new sqlite3.Database(dbPath);

// Initialize database tables
function initializeDatabase() {
  db.serialize(() => {
    // Create Pages table
    db.run(`
      CREATE TABLE IF NOT EXISTS pages (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        pageNumber INTEGER NOT NULL,
        title TEXT NOT NULL,
        date TEXT NOT NULL,
        type TEXT NOT NULL,
        content TEXT NOT NULL,
        caption TEXT,
        opened INTEGER DEFAULT 0
      )
    `);

    // Create FinalPage table
    db.run(`
      CREATE TABLE IF NOT EXISTS final_page (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        unlocked INTEGER DEFAULT 0,
        content TEXT NOT NULL
      )
    `);

    console.log('Database tables initialized');
  });
}

// Seed initial data
function seedDatabase() {
  db.get('SELECT COUNT(*) as count FROM pages', (err, row) => {
    if (err) {
      console.error('Error checking pages:', err);
      return;
    }

    // Only seed if database is empty
    if (row.count === 0) {
      console.log('Seeding database with initial memories...');

      const memories = [
        {
          pageNumber: 1,
          title: 'Board Game Café',
          date: '2025',
          type: 'image',
          content: '1.jpg',
          caption: 'The first time we went out together to a board game café. Sitting around, learning rules mid-game, making terrible moves, celebrating unexpected wins, and laughing at ourselves. It wasn\'t about the games as much as it was about how naturally everything felt—easy conversations, shared screens, and the beginning of something comfortable and familiar.'
        },
        {
          pageNumber: 2,
          title: 'Ready for the Race',
          date: '2025',
          type: 'image',
          content: '2.jpg',
          caption: 'Right before go-karting, helmets on and smiles full of nervous excitement. This moment captured the thrill of trying something new together—laughing, hyping each other up, and standing at the edge of speed and fun. The kind of experience where fear turns into confidence and memories form even before the race begins.'
        },
        {
          pageNumber: 3,
          title: 'Post Go-Karting Heart',
          date: '2025',
          type: 'image',
          content: '3.jpg',
          caption: 'Post go-karting, when the race was over but the excitement still hadn\'t settled. Four tired pairs of legs, dusty shoes, and a spontaneous idea to stand together and form a heart on the ground. No planning, no posing—just exhaustion mixed with happiness and the quiet realization that we\'d just shared an experience we\'d remember long after the adrenaline faded.'
        },
        {
          pageNumber: 4,
          title: 'Garba Night',
          date: '2025',
          type: 'image',
          content: '4.jpg',
          caption: 'A long Garba night filled with music, movement, and endless energy. Dancing for hours, missing steps, laughing through exhaustion, and staying till late without caring about time. This picture holds the glow of a night where joy mattered more than tired legs and the rhythm kept us together.'
        },
        {
          pageNumber: 5,
          title: 'Diwali Video Call',
          date: '2025',
          type: 'image',
          content: '5.jpg',
          caption: 'Diwali on a video call—screens instead of togetherness, but warmth all the same. Smiling faces, sleepy laughter, and small moments shared across distance. A quiet celebration that proved connection doesn\'t need physical presence, just people who matter.'
        },
        {
          pageNumber: 6,
          title: 'Nokia Industry Visit',
          date: '2025',
          type: 'image',
          content: '6.jpeg',
          caption: 'An industry visit to Nokia that went beyond just learning about technology. Walking through real-world innovation, listening closely, asking questions, and sharing that excitement of seeing what lies ahead. A memory tied to growth, curiosity, and experiencing something meaningful together.'
        },
        {
          pageNumber: 7,
          title: 'Argonyx Hackathon',
          date: '2025',
          type: 'image',
          content: '7.jpeg',
          caption: 'An overnight stay in college while organizing the Argonyx Hackathon. Long hours of planning, problem-solving, and managing chaos, mixed with random laughter and shared snacks. Exhausting yet fulfilling, this moment captured teamwork, responsibility, and the kind of fun that comes from building something together.'
        },
        {
          pageNumber: 8,
          title: 'College Hangouts',
          date: '2025',
          type: 'image',
          content: '8.jpeg',
          caption: 'Everyday college hangouts that became the most consistent part of our lives. Sitting around campus, talking about everything and nothing, sharing food, and letting time pass unnoticed. Not a special day, but the kind that quietly turns into the most important memories.'
        },
        {
          pageNumber: 9,
          title: 'Sneha\'s Birthday',
          date: '2025',
          type: 'image',
          content: '9.jpeg',
          caption: 'A fun evening at a Nepali restaurant celebrating Sneha\'s birthday. Good food, shared plates, loud laughter, and conversations that stretched long after the meal ended. A simple celebration that felt warm, complete, and full of joy.'
        },
        {
          pageNumber: 10,
          title: 'Google DevFest',
          date: '2025',
          type: 'image',
          content: '10.jpeg',
          caption: 'A day spent at Google DevFest, learning, listening, and getting inspired together. From talks to discussions, it was a shared experience of curiosity and growth. These little cards became reminders of a day where ideas felt exciting and learning felt shared.'
        },
        {
          pageNumber: 11,
          title: 'Sanjana\'s College Event',
          date: '2025',
          type: 'image',
          content: '11.jpeg',
          caption: 'Sanjana\'s college event, where amidst all the work and responsibility, we found time to just be ourselves. Laughing, joking, and ending it all with a goofy photo that captured our bond perfectly. A reminder that fun often hides in the middle of busy days.'
        },
        {
          pageNumber: 12,
          title: '154 Breakfast Club',
          date: '2025',
          type: 'image',
          content: '12.jpeg',
          caption: 'The semester finally ended, and we celebrated with a visit to the 154 Breakfast Club. Good food, relief after exams, endless laughs, and walking out with lighter wallets but happier hearts. The perfect end to a long, tiring semester, made special by the people it was shared with.'
        }
      ];

      const stmt = db.prepare(`
        INSERT INTO pages (pageNumber, title, date, type, content, caption, opened)
        VALUES (?, ?, ?, ?, ?, ?, 0)
      `);

      memories.forEach(memory => {
        stmt.run(
          memory.pageNumber,
          memory.title,
          memory.date,
          memory.type,
          memory.content,
          memory.caption
        );
      });

      stmt.finalize();

      // Insert final page
      db.run(`
        INSERT INTO final_page (unlocked, content)
        VALUES (0, 'As 2025 closes and 2026 begins, I want you to know how grateful I am for every moment we shared. From spontaneous adventures to quiet celebrations, from laughter-filled nights to peaceful mornings—each memory with you has made this year unforgettable.\\n\\nHere''s to more memories, more laughter, and more moments that turn into stories we''ll tell forever.\\n\\nHappy New Year 2026! 🎉✨')
      `);

      console.log('Database seeded successfully');
    }
  });
}

module.exports = {
  db,
  initializeDatabase,
  seedDatabase
};
