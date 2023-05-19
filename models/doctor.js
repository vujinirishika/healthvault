const mongoose = require("mongoose");

const Doctors = new mongoose.Schema(
  {
    name: { type: String, required: true },
    specialist: {
      type: String,
      enum: ['Cardilogy', 'Dermotology', 'Dental', 'Neurology','Staff'],
    },
    email: { type: String, required: true },
    mobilenumber: { type: String, required: true },
    username: { type: String, required: true },
    dob: { type: String, required: true },
    gender: { type: String, required: true },
  },
  { collection: "doctors" }
);

const model = mongoose.model("DoctorsData", Doctors);

module.exports = model;