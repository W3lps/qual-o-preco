const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const countrySchema = new Schema({
  country: {
    type: String,
    required: true,
  },
  currency: {
    type: String,
    required: true,
  },
  avgWage: {
    type: Number,
    required: true,
  },
  cars: [
    {
      model: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      imagePath: {
        type: String,
        required: true,
      },
    },
  ],
});

module.exports = mongoose.model('Country', countrySchema);
