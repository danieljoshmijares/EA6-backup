const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  empid: { type: String, required: true, unique: true },
  firstname: { type: String, required: true },
  middlename: { type: String },
  lastname: { type: String, required: true },
  position: { type: String, required: true },
  department: { type: String, required: true },
  salary: { type: Number, required: true }
});

module.exports = mongoose.model('Employee', employeeSchema);
