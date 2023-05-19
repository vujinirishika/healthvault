const mongoose = require("mongoose");

const DoctorSlots = new mongoose.Schema(
  {
    docname: { type: String, required: true },
    username: { type: String, required: true },
    slot0: [Boolean],
    slot1: [Boolean],
    slot2: [Boolean],
    slot3: [Boolean],
    slot4: [Boolean],
    slot5: [Boolean],
    slot6: [Boolean],
    slot7: [Boolean],
    date: { type: Number},
    month: { type: Number},
    year: { type: Number},
  },
  { collection: "doctorSlots" }
);

const model = mongoose.model("DoctorSlotsData", DoctorSlots);

module.exports = model;