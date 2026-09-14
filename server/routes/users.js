const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/auth');
const pool = require('../config/db');

router.get('/profile', authenticate, async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT u.id, u.full_name, u.email, r.name as role FROM users u JOIN roles r ON u.role_id = r.id WHERE u.id = $1',
      [req.user.id]
    );
    if (result.rows.length === 0) return res.status(404).json({ success: false, message: 'User not found' });
    res.json({ success: true, user: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

router.patch('/profile', authenticate, async (req, res) => {
  const { full_name } = req.body;
  try {
    const result = await pool.query(
      'UPDATE users SET full_name=$1, updated_at=NOW() WHERE id=$2 RETURNING id, full_name, email',
      [full_name, req.user.id]
    );
    res.json({ success: true, user: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;