const db = require('../db');

async function migrate() {
    try {
        console.log("Checking for 'status' column in 'booking' table...");
        const res = await db.query(`
            SELECT column_name 
            FROM information_schema.columns 
            WHERE table_name='booking' AND column_name='status';
        `);

        if (res.rows.length === 0) {
            console.log("Adding 'status' column to 'booking' table...");
            await db.query("ALTER TABLE booking ADD COLUMN status VARCHAR(20) DEFAULT 'Pending';");
            console.log("Migration successful.");
        } else {
            console.log("'status' column already exists.");
        }
        process.exit(0);
    } catch (err) {
        console.error("Migration failed:", err);
        process.exit(1);
    }
}

migrate();
