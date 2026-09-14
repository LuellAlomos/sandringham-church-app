const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
        service: 'gmail',
    auth: {
        user: process.env.EMAIL_URSER,
        pass: process.env.EMAIL_PASS
    }
});

const sendContact = async (req, res) => {
    const {name, email, message} = req.body;
    try {
        if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: 'Name, email and message are required' });
    }
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `New contact form message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    });
    res.json({ success: true, message: 'Message sent successfully' });
  } catch (err) {
    console.error('sendContact error:', err.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

module.exports = { sendContact };