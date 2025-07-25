//Working on my device
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public')); // ✅ Serve static files

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.error('MongoDB Error:', err));

// Employee Model
const Employee = require('./models/Employee');

// ✅ If you want root to serve index.html, do NOT define a custom `/` route

// API Routes
app.post('/api/employees', async (req, res) => {
  try {
    const newEmployee = new Employee(req.body);
    await newEmployee.save();
    res.status(201).json({ message: 'Record added successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.get('/api/employees/:empid', async (req, res) => {
  try {
    const employee = await Employee.findOne({ empid: req.params.empid });
    if (!employee) return res.status(404).json({ error: 'Employee not found' });
    res.json(employee);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/employees/:empid', async (req, res) => {
  try {
    const updated = await Employee.findOneAndUpdate(
      { empid: req.params.empid },
      req.body,
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ error: 'Employee not found' });
    res.json({ message: 'Record updated successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.delete('/api/employees/:empid', async (req, res) => {
  try {
    const deleted = await Employee.findOneAndDelete({ empid: req.params.empid });
    if (!deleted) return res.status(404).json({ error: 'Employee not found' });
    res.json({ message: 'Record deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start Server 
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
