const mongoose = require("mongoose");

const Patients = new mongoose.Schema(
  {
    name: { type: String, required: true },
    age: { type: Number, required: true },
    email: { type: String, required: true },
    mobilenumber: { type: String, required: true },
    username: { type: String, required: true },
    dob: { type: String, required: true },
    gender: { type: String, required: true },
  },
  { collection: "patients" }
);

const model = mongoose.model("PatientsData", Patients);

module.exports = model;
