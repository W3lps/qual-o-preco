const Country = require('../models/country');
const User = require('../models/user');

exports.addCarPage = async (_, res) => {
  // const countries = await Country.find(
  //   { country: { $ne: 'Brasil' } },
  //   { country: 1, _id: 0 }
  // );
  const countries = await Country.find();
  res.render('admin/add-car', {
    pageTitle: 'Adicionar Carro',
    countries: countries,
  });
};

exports.addCar = async (req, res, next) => {
  const selectedCountry = req.body.country;
  const model = req.body.model;
  const price = req.body.price;

  try {
    const country = await Country.findOne({ country: selectedCountry });
    country.cars = [...country.cars, { model: model, price: price }];
    await country.save();
    console.log(country);
  } catch (err) {
    console.log(err);
  }

  res.redirect('/admin/add-car');
};

exports.updateCarPage = async (req, res, next) => {};

exports.updateCar = async (req, res, next) => {};

exports.deleteCar = async (req, res) => {
  const carId = req.params.carId;
  const countryId = req.body.countryId;

  try {
    const country = await Country.findById(countryId);
    const car = country.cars.findIndex(car => car._id === carId);
    country.cars.splice(car, 1);

    country.save();
    res.redirect('/');
  } catch (err) {
    console.log(err);
  }
};

exports.addCountryPage = (_, res) => {
  res.render('admin/add-country', { pageTitle: 'Adicionar País' });
};

exports.addCountry = async (req, res) => {
  const country = req.body.country;
  const currency = req.body.currency;
  const avgWage = req.body.avgWage;

  try {
    const countryData = new Country({
      country: country,
      currency: currency,
      avgWage: avgWage,
      cars: [],
    });
    await countryData.save();

    res.redirect('/');
  } catch (err) {
    console.log(err);
    res.redirect('/admin/add-country');
  }
};

exports.updateCountryPage = async (req, res, next) => {};

exports.updateCountry = async (req, res, next) => {};

exports.deleteCountry = async (req, res) => {
  const countryId = req.params.countryId;

  try {
    await Country.findByIdAndRemove(countryId);
    res.redirect('/see-countries');
  } catch (err) {
    console.log(err);
  }
};
