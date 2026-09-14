const pool = require('../config/db');

const getEvents = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM events ORDER BY event_date ASC');
    res.json({ success: true, events: result.rows });
  } catch (err) {
    console.error('getEvents error:', err.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

const createEvent = async (req, res) => {
  const { title, description, event_date, start_time, end_time, location } = req.body;
  try {
    if (!title || !event_date || !start_time) {
      return res.status(400).json({ success: false, message: 'Title, date and start time are required' });
    }
    const result = await pool.query(
      `INSERT INTO events (title, description, event_date, start_time, end_time, location, created_by)
       VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *`,
      [title, description || null, event_date, start_time, end_time || null, location || null, req.user.id]
    );
    res.status(201).json({ success: true, event: result.rows[0] });
  } catch (err) {
    console.error('createEvent error:', err.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

const updateEvent = async (req, res) => {
  const { id } = req.params;
  const { title, description, event_date, start_time, end_time, location } = req.body;
  try {
    const result = await pool.query(
      `UPDATE events SET title=$1, description=$2, event_date=$3,
       start_time=$4, end_time=$5, location=$6, updated_at=NOW()
       WHERE id=$7 RETURNING *`,
      [title, description || null, event_date, start_time, end_time || null, location || null, id]
    );
    if (result.rows.length === 0) return res.status(404).json({ success: false, message: 'Event not found' });
    res.json({ success: true, event: result.rows[0] });
  } catch (err) {
    console.error('updateEvent error:', err.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

const deleteEvent = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM events WHERE id=$1 RETURNING id', [id]);
    if (result.rows.length === 0) return res.status(404).json({ success: false, message: 'Event not found' });
    res.json({ success: true, message: 'Event deleted successfully' });
  } catch (err) {
    console.error('deleteEvent error:', err.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

const rsvpEvent = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query(
      'INSERT INTO event_rsvps (event_id, user_id) VALUES ($1,$2)',
      [id, req.user.id]
    );
    res.status(201).json({ success: true, message: 'RSVP registered successfully' });
  } catch (err) {
    if (err.code === '23505') {
      return res.status(400).json({ success: false, message: 'You have already RSVPd to this event' });
    }
    console.error('rsvpEvent error:', err.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

const cancelRsvp = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query(
      'DELETE FROM event_rsvps WHERE event_id=$1 AND user_id=$2',
      [id, req.user.id]
    );
    res.json({ success: true, message: 'RSVP cancelled successfully' });
  } catch (err) {
    console.error('cancelRsvp error:', err.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

const getEventRsvps = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      `SELECT u.id, u.full_name, u.email, r.created_at
       FROM event_rsvps r JOIN users u ON r.user_id = u.id
       WHERE r.event_id = $1`,
      [id]
    );
    res.json({ success: true, rsvps: result.rows, count: result.rows.length });
  } catch (err) {
    console.error('getEventRsvps error:', err.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

module.exports = { getEvents, createEvent, updateEvent, deleteEvent, rsvpEvent, cancelRsvp, getEventRsvps };