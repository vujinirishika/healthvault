const mongoose = require("mongoose");

const Appointments = new mongoose.Schema(
  {
    patientname: { type: String, required: true },
    patientage: { type: Number, required: true },
    patientgender: { type: String, required: true },
    patientemail: { type: String, required: true },
    patientmobilenumber: { type: String, required: true },
    patientloc: { type: String, required: true },
    description: { type: String, required: true },
    docname: { type: String, required: true },
    date: { type: Number, required: true },
    username: { type: String, required: true },
    apptime: {type: String, required: true},
    bodytemp: { type: String},
    pulserate: { type: String},
    resprate: { type: String},
    bp: { type: String},
    pres: {type: String, required: true},
    recommendations: {type: String},
    status: {type: String},
    // files: [String],
  },
  { collection: "appointments" }
);

const model = mongoose.model("AppointmentsData", Appointments);

module.exports = model;