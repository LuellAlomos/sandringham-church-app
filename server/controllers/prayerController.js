const pool = require('../config/db');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const submitPrayer = async (req, res) => {
  const { description, visibility } = req.body;
  try {
    if (!description) {
      return res.status(400).json({ success: false, message: 'Prayer request description is required' });
    }
    if (description.length > 500) {
      return res.status(400).json({ success: false, message: 'Description must be 500 characters or less' });
    }
    const result = await pool.query(
      `INSERT INTO prayer_requests (user_id, description, visibility, status)
       VALUES ($1, $2, $3, 'pending') RETURNING *`,
      [req.user.id, description, visibility || 'private']
    );
    res.status(201).json({ success: true, prayer: result.rows[0] });
  } catch (err) {
    console.error('submitPrayer error:', err.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

const getPrayers = async (req, res) => {
  const { status } = req.query;
  try {
    let query = `SELECT p.*, u.full_name, u.email 
                 FROM prayer_requests p 
                 JOIN users u ON p.user_id = u.id`;
    const params = [];
    if (status) {
      query += ' WHERE p.status = $1';
      params.push(status);
    }
    query += ' ORDER BY p.created_at DESC';
    const result = await pool.query(query, params);
    res.json({ success: true, prayers: result.rows });
  } catch (err) {
    console.error('getPrayers error:', err.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

const moderatePrayer = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    if (!['approved', 'declined'].includes(status)) {
      return res.status(400).json({ success: false, message: 'Status must be approved or declined' });
    }
    const result = await pool.query(
      `UPDATE prayer_requests SET status=$1, updated_at=NOW()
       WHERE id=$2 RETURNING *`,
      [status, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Prayer request not found' });
    }
    const prayer = result.rows[0];
    const userResult = await pool.query('SELECT * FROM users WHERE id=$1', [prayer.user_id]);
    const user = userResult.rows[0];
    if (user) {
      const subject = status === 'approved'
        ? 'Your prayer request has been received'
        : 'Update on your prayer request';
      const text = status === 'approved'
        ? `Dear ${user.full_name},\n\nThank you for sharing your prayer request with us. Pastor Talagi and the congregation are praying for you.\n\nGod bless,\nSandringham Presbyterian Church`
        : `Dear ${user.full_name},\n\nThank you for your prayer request. We have received it and our pastoral team will be in touch.\n\nGod bless,\nSandringham Presbyterian Church`;
      try {
        await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: user.email,
          subject,
          text
        });
      } catch (emailErr) {
        console.error('Email send error:', emailErr.message);
      }
    }
    res.json({ success: true, prayer: result.rows[0] });
  } catch (err) {
    console.error('moderatePrayer error:', err.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

const getMyPrayers = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM prayer_requests WHERE user_id=$1 ORDER BY created_at DESC',
      [req.user.id]
    );
    res.json({ success: true, prayers: result.rows });
  } catch (err) {
    console.error('getMyPrayers error:', err.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

module.exports = { submitPrayer, getPrayers, moderatePrayer, getMyPrayers };