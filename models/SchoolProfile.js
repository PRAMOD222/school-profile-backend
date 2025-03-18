const mongoose = require("mongoose");

const schoolProfileSchema = new mongoose.Schema({
    accountId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    subDomain :{
      type: String,
      required: true,
      unique: true
    },
    name: {
      type: String,
      required: true,
    },
    logo: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    city :{
      type: String,
      required: true
    },
    address: {
      type: String,
      required: true,
    },
    googleMapLink: {
      type: String,
      required: true,
    },
    aboutSchool: {
      type: String,
      required: true,
    },
    vision: {
      type: String,
      required: true,
    },
    mission: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("SchoolProfile", schoolProfileSchema);
