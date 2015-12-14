'use strict';

var express = require('express');
var router = express.Router();

var utils = require('../lib/utils');

router.get('/', index);
router.get('/error', error);
router.get('/getRestaurants', getRestaurants);
router.get('/:id([0-9]{1,8})', info)

module.exports = router;

/** route middlewares **/

function index(req, res, next) {
  res.render('index', { title: 'Info - Svangur' });
}

function info(req, res, next) {
	var id = req.params.id;
  var userLatitude = req.session.userLatitude;
  var userLongitude = req.session.userLongitude;

  var defaultUserLatitude = 64.1417172;
  var defaultUserLongitude = -21.9288258;

  if(userLatitude == undefined) userLatitude = defaultUserLatitude;
  if(userLongitude == undefined) userLongitude = defaultUserLongitude;

  utils.getRestaurantById(id, function (err, all) {

    var url = all[0].url;
    url = url.trim();
    if(url == "NULL") url = "";

    var phoneNumber = all[0].phonenumber;
    phoneNumber = phoneNumber.trim();
    if(phoneNumber == "NULL") phoneNumber = "";

    res.render('info', {title: 'Svangur', name: all[0].name, address: all[0].address, phoneNumber: phoneNumber,
    										url: url, logo: all[0].logo, latitude : all[0].horizontal, longitude: all[0].vertical,
                        userLatitude: userLatitude, userLongitude: userLongitude});
  });
}

function getRestaurants(req, res) {
  req.session.userLatitude = req.query.latitude;
  req.session.userLongitude = req.query.longitude;

  var distance = req.query.distance*1000;
  var latitude = req.query.latitude;
  var longitude = req.query.longitude;

  var defaultLatitude = 64.1417172;
  var defaultLongitude = -21.9288258;

  if(latitude == undefined) latitude = defaultLatitude;
  if(longitude == undefined) longitude = defaultLongitude;

   utils.listRestaurants(function (err, all) {

    var restaurants = utils.listRestaurantsInRadius(all, distance, latitude, longitude);

    res.send(restaurants);
  });
}

function error(req, res) {
  // Caught and passed down to the errorHandler middleware
  throw new Error('borked!');
}