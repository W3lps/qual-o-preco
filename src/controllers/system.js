const Country = require('../models/country');

exports.indexPage = async (req, res, next) => {
  const countries = await Country.find();
  res.render('system/index', { pageTitle: 'Home', countries: countries });
};

exports.seeCountriesPage = async (req, res, next) => {
  try {
    const countries = await Country.find({}, '-cars');
    res.render('system/countries-list', {
      pageTitle: 'Países',
      countries: countries,
    });
  } catch (err) {
    console.log(err);
  }
};

exports.countryDetailsPage = async (req, res, next) => {
  const countryId = req.params.countryId;
  const loggedIn = req.session.isLoggedIn || false;
  try {
    const country = await Country.findById(countryId);

    res.render('system/country-details', {
      pageTitle: country.country,
      country: country,
      loggedIn: loggedIn,
    });
  } catch (err) {
    console.log(err);
  }
};
