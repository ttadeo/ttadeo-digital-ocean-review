const express = require('express');
const app = express();
const PORT = process.env.PORT || 30001;

// Use Express's built-in JSON parser
app.use(express.json());

// In-memory storage for demonstration
let birthdays = [];

// Default home route
app.get('/', (req, res) => {
  res.send('Welcome to the Automated Birthday Reminder App!');
});

// Get all birthday entries
app.get('/birthdays', (req, res) => {
  res.json(birthdays);
});

// Create a new birthday entry
app.post('/birthdays', (req, res) => {
  const { name, date } = req.body;
  if (!name || !date) {
    return res.status(400).json({ error: 'Name and date are required.' });
  }
  const entry = { id: birthdays.length + 1, name, date };
  birthdays.push(entry);
  res.status(201).json(entry);
});

// Endpoint to simulate reminder trigger
app.get('/check-reminders', (req, res) => {
  res.json({ message: 'Reminder checked. Notifications sent if any birthdays are near.' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
