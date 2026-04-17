const express = require('express');
const cors = require('cors');
const path = require('path');
const db = require('./db');
const fs = require('fs');
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
require('dotenv').config();

// Cloudinary Config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'yb-portfolio',
    allowed_formats: ['jpg', 'png', 'jpeg', 'webp'],
  },
});

const upload = multer({ storage: storage });

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, './')));

// --- CLIENT ENDPOINTS ---

// Booking Form Submission
app.post('/api/book', async (req, res) => {
  const { name, email, phone, event_type, event_date, location, message } = req.body;
  try {
    const result = await db.query(
      'INSERT INTO booking (name, email, phone, event_type, event_date, location, message) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [name, email, phone, event_type, event_date, location, message]
    );
    res.status(201).json({ success: true, data: result.rows[0] });
  } catch (err) {
    console.error("DEBUG [Booking Error]:", err.message);
    res.status(500).json({ success: false, error: 'Database error' });
  }
});

// Contact Form Submission
app.post('/api/contact', async (req, res) => {
  const { name, email, phone, message } = req.body;
  try {
    const result = await db.query(
      'INSERT INTO contact (name, email, phone, message) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, email, phone, message]
    );
    res.status(201).json({ success: true, data: result.rows[0] });
  } catch (err) {
    console.error("DEBUG [Contact Error]:", err.message);
    res.status(500).json({ success: false, error: 'Database error' });
  }
});

// Feedback Form Submission
app.post('/api/feedback', async (req, res) => {
  const { name, email, rating, message } = req.body;
  try {
    const result = await db.query(
      'INSERT INTO testimonials (client_name, email, rating, feedback) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, email, rating, message]
    );
    res.status(201).json({ success: true, data: result.rows[0] });
  } catch (err) {
    console.error("DEBUG [Feedback Error]:", err.message);
    res.status(500).json({ success: false, error: 'Database error' });
  }
});

// --- ADMIN ENDPOINTS ---

// Dashboard Stats
app.get('/api/admin/stats', async (req, res) => {
  try {
    const bookingsCount = await db.query('SELECT COUNT(*) FROM booking');
    const contactsCount = await db.query('SELECT COUNT(*) FROM contact');
    const feedbackCount = await db.query('SELECT COUNT(*) FROM testimonials');
    
    // For "Recent" lists
    const recentBookings = await db.query('SELECT * FROM booking ORDER BY booking_time DESC LIMIT 5');
    const recentContacts = await db.query('SELECT * FROM contact ORDER BY submitted_at DESC LIMIT 5');
    const recentFeedback = await db.query('SELECT * FROM testimonials ORDER BY submitted_at DESC LIMIT 5');

    res.json({
      counts: {
        bookings: bookingsCount.rows[0].count,
        contacts: contactsCount.rows[0].count,
        feedback: feedbackCount.rows[0].count,
        totalEnquiries: parseInt(bookingsCount.rows[0].count) + parseInt(contactsCount.rows[0].count)
      },
      recent: {
        bookings: recentBookings.rows,
        contacts: recentContacts.rows,
        feedback: recentFeedback.rows
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

// Get All Bookings
app.get('/api/admin/bookings', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM booking ORDER BY booking_time DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
});

// Get All Contacts
app.get('/api/admin/contacts', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM contact ORDER BY submitted_at DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
});

// Get All Feedback
app.get('/api/admin/feedback', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM testimonials ORDER BY submitted_at DESC');
    res.json(result.rows);
  } catch (err) {
    console.error("DEBUG [Get Feedback Error]:", err);
    res.status(500).json({ error: 'Database error' });
  }
});

// Update Booking Status (Accept/Reject)
app.patch('/api/admin/bookings/:id', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body; 
  try {
    // Note: status column might need to be added to the database
    await db.query('UPDATE booking SET status = $1 WHERE booking_id = $2', [status, id]);

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Database error' });
  }
});

// Delete Booking
app.delete('/api/admin/bookings/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await db.query('DELETE FROM booking WHERE booking_id = $1', [id]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Database error' });
  }
});

// Delete Contact Enquiry
app.delete('/api/admin/contacts/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await db.query('DELETE FROM contact WHERE contact_id = $1', [id]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Database error' });
  }
});

// Delete Feedback
app.delete('/api/admin/feedback/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await db.query('DELETE FROM testimonials WHERE testimonial_id = $1', [id]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Database error' });
  }
});



// --- GALLERY ENDPOINTS ---

// Get all gallery photos
app.get('/api/gallery', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM gallery ORDER BY photo_id DESC');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

// Upload a photo
app.post('/api/gallery', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, error: 'No image file uploaded' });
    }

    const { category, description } = req.body;
    const imageUrl = req.file.path; // Cloudinary URL
    
    const result = await db.query(
      'INSERT INTO gallery (category, image_url, description) VALUES ($1, $2, $3) RETURNING *',
      [category, imageUrl, description]
    );
    res.status(201).json({ success: true, data: result.rows[0] });
  } catch (err) {
    console.error("DEBUG [Upload Error]:", err);
    res.status(500).json({ 
      success: false, 
      error: 'Upload failed. Ensure Cloudinary credentials in .env are correct.',
      details: err.message 
    });
  }
});

// Delete a photo
app.delete('/api/gallery/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await db.query('DELETE FROM gallery WHERE photo_id = $1', [id]);
    res.json({ success: true, message: 'Photo deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Database error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
