const db = require('./db');

async function testDB() {
  try {
    const res = await db.query('SELECT * FROM gallery LIMIT 1');
    console.log('Database connection successful. Gallery table exists.');
  } catch (err) {
    console.error('Database connection error:', err.message);
    if (err.message.includes('relation "gallery" does not exist')) {
        console.log('The gallery table is missing. Creating it now...');
        await db.query(`
            CREATE TABLE IF NOT EXISTS public.gallery (
                photo_id SERIAL PRIMARY KEY,
                category character varying(50),
                image_url text,
                description text
            );
        `);
        console.log('Gallery table created successfully.');
    }
  } finally {
    process.exit();
  }
}

testDB();
