const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var residentSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },

    phone_number: {
      type: Number,
      required: true
    },

    resident_number: {
      type: String,
      required: true
    },

    family_members: {
      type: Number,
      required: true
    },

    vehicle_numbers: []
  },
  {
    timestamps: true
  }
);

var Residents = mongoose.model("resident", residentSchema);

module.exports = Residents;
