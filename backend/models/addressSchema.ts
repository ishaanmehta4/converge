var mongoose = require('mongoose');

var AddressSchema = new mongoose.Schema(
  {
    address_line_1: {
      type: String,
      default: '',
    },
    address_line_2: {
      type: String,
      default: '',
    },
    city: {
      type: String,
      default: '',
    },
    city_zip: {
      type: Number,
      default: '',
    },
    country: {
      type: String,
      required: true,
      default: 'India',
    },
    geolocation: {
      type: [String],
      default: [null, null],
    },
  },
  { _id: false }
);

module.exports = AddressSchema;
