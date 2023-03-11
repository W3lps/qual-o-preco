const Country = require('../models/country');
const User = require('../models/user');

exports.addCarPage = (req, res, next) => {
  res.render('admin/add-car');
};

exports.addCar = async (req, res, next) => {};

exports.updateCarPage = async (req, res, next) => {};

exports.deleteCar = async (req, res, next) => {};

exports.addCountryPage = (req, res, next) => {
  res.render('admin/add-country');
};

exports.addCountryData = async (req, res, next) => {
  const country = req.body.country;
  const currency = req.body.currency;
  const avgWage = req.body.avgWage;

  const countryData = new Country({
    country: country,
    currency: currency,
    avgWage: avgWage,
  });
  await countryData.save();

  res.redirect('admin/add-country');
};
