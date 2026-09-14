const pool = require('../config/db');

const getSermons = async (req, res) => {
  const { keyword, series, startDate, endDate } = req.query;
  try {
    let query = 'SELECT * FROM sermons WHERE 1=1';
    const params = [];
    let i = 1;
    if (keyword) {
      query += ` AND (title ILIKE $${i} OR preacher ILIKE $${i} OR series ILIKE $${i})`;
      params.push(`%${keyword}%`);
      i++;
    }
    if (series) {
      query += ` AND series = $${i}`;
      params.push(series);
      i++;
    }
    if (startDate) {
      query += ` AND sermon_date >= $${i}`;
      params.push(startDate);
      i++;
    }
    if (endDate) {
      query += ` AND sermon_date <= $${i}`;
      params.push(endDate);
      i++;
    }
    query += ' ORDER BY sermon_date DESC';
    const result = await pool.query(query, params);
    res.json({ success: true, sermons: result.rows });
  } catch (err) {
    console.error('getSermons error:', err.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

const createSermon = async (req, res) => {
  const { title, preacher, series, sermon_date, description, media_url } = req.body;
  try {
    if (!title || !preacher || !sermon_date || !media_url) {
      return res.status(400).json({ success: false, message: 'Title, preacher, date and media URL are required' });
    }
    const result = await pool.query(
      `INSERT INTO sermons 
        (title, preacher, series, sermon_date, description, media_url, created_by) 
       VALUES ($1, $2, $3, $4, $5, $6, $7) 
       RETURNING *`,
      [title, preacher, series || null, sermon_date, description || null, media_url, req.user.id]
    );
    res.status(201).json({ success: true, sermon: result.rows[0] });
  } catch (err) {
    console.error('createSermon error:', err.message);
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
};

const updateSermon = async (req, res) => {
  const { id } = req.params;
  const { title, preacher, series, sermon_date, description, media_url } = req.body;
  try {
    const result = await pool.query(
      `UPDATE sermons 
       SET title=$1, preacher=$2, series=$3, sermon_date=$4, 
           description=$5, media_url=$6, updated_at=NOW() 
       WHERE id=$7 RETURNING *`,
      [title, preacher, series || null, sermon_date, description || null, media_url, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Sermon not found' });
    }
    res.json({ success: true, sermon: result.rows[0] });
  } catch (err) {
    console.error('updateSermon error:', err.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

const deleteSermon = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      'DELETE FROM sermons WHERE id=$1 RETURNING id', 
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Sermon not found' });
    }
    res.json({ success: true, message: 'Sermon deleted successfully' });
  } catch (err) {
    console.error('deleteSermon error:', err.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

module.exports = { getSermons, createSermon, updateSermon, deleteSermon };