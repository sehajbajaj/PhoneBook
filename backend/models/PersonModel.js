const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const personSchema = new Schema(
  {
    name: {
      type: String,
      requires: true,
      minLength: 3,
      trim: true,
      unique: true,
    },
    number: {
      type: Number,
      required: true,
      minLength: 3,
      maxLength: 10,
      unique: true,
    },
    location: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Person", personSchema);
