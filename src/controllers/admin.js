const fs = require('fs');

const Country = require('../models/country');
const User = require('../models/user');

const deleteFile = function (filePath) {
  fs.unlink(filePath, err => {
    if (err) throw err;
  });
};

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
  const image = req.file;
  const imagePath = image.path;

  try {
    const country = await Country.findOne({ country: selectedCountry });
    country.cars = [
      ...country.cars,
      { model: model, price: price, imagePath: imagePath },
    ];
    await country.save();
    console.log(country);
  } catch (err) {
    console.log(err);
  }

  res.redirect('/admin/add-car');
};

exports.deleteCar = async (req, res) => {
  const carId = req.params.carId;
  const countryId = req.body.countryId;

  try {
    const country = await Country.findById(countryId);
    let carImagePath;
    country.cars.map(car => {
      car._id.toString() === carId ? (carImagePath = car.imagePath) : '';
    });
    deleteFile(carImagePath);

    const carIndex = country.cars.findIndex(car => car._id === carId);
    country.cars.splice(carIndex, 1);

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

exports.updateCountryDataPage = async (req, res, next) => {
  const countryId = req.params.countryId;

  try {
    const country = await Country.findById(countryId);
    res.render('admin/update-country', {
      pageTitle: 'Atualizar Dados',
      country: country,
    });
  } catch (err) {
    console.log(err);
  }
};

exports.updateCountryData = async (req, res, next) => {
  const newCountryName = req.body.newCountryName;
  const newCurrency = req.body.newCurrency;
  const newAvgWage = req.body.newAvgWage;
  const countryId = req.body.countryId;

  try {
    const country = await Country.findById(countryId);

    country.country = newCountryName;
    country.currency = newCurrency;
    country.avgWage = newAvgWage;
    await country.save();

    res.redirect(`/admin/update-country/${countryId}`);
  } catch (err) {
    console.log(err);
  }
};

exports.deleteCountry = async (req, res) => {
  const countryId = req.params.countryId;

  try {
    await Country.findByIdAndRemove(countryId);
    res.redirect('/see-countries');
  } catch (err) {
    console.log(err);
  }
};
