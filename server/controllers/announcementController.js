const pool = require('../config/db');

const getAnnouncements = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM announcements WHERE is_archived = false ORDER BY created_at DESC'
    );
    res.json({ success: true, announcements: result.rows });
  } catch (err) {
    console.error('getAnnouncements error:', err.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

const createAnnouncement = async (req, res) => {
  const { title, body } = req.body;
  try {
    if (!title || !body) {
      return res.status(400).json({ success: false, message: 'Title and body are required' });
    }
    const result = await pool.query(
      'INSERT INTO announcements (title, body, created_by) VALUES ($1,$2,$3) RETURNING *',
      [title, body, req.user.id]
    );
    res.status(201).json({ success: true, announcement: result.rows[0] });
  } catch (err) {
    console.error('createAnnouncement error:', err.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

const updateAnnouncement = async (req, res) => {
  const { id } = req.params;
  const { title, body, is_archived } = req.body;
  try {
    const result = await pool.query(
      `UPDATE announcements SET title=$1, body=$2, is_archived=$3, updated_at=NOW()
       WHERE id=$4 RETURNING *`,
      [title, body, is_archived || false, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Announcement not found' });
    }
    res.json({ success: true, announcement: result.rows[0] });
  } catch (err) {
    console.error('updateAnnouncement error:', err.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

const deleteAnnouncement = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      'DELETE FROM announcements WHERE id=$1 RETURNING id', [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Announcement not found' });
    }
    res.json({ success: true, message: 'Announcement deleted successfully' });
  } catch (err) {
    console.error('deleteAnnouncement error:', err.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

module.exports = { getAnnouncements, createAnnouncement, updateAnnouncement, deleteAnnouncement };