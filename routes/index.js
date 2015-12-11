'use strict';

var express = require('express');
var router = express.Router();

var utils = require('../lib/utils');

router.get('/', index);
router.get('/error', error);
router.get('/getRestaurants', getRestaurants);
router.get('/:id([0-9]{1,8})', info)
// router.get('/comments', ensureLoggedinIn, index);
// router.post('/comments', indexPost);
// router.get('/login', redirectIfLoggedIn, login);
// router.post('/login', loginHandler);
// router.get('/logout', logout);
// router.get('/create', createForm);
// router.post('/create', createHandler);
// router.get('/searching', searchForm);
// router.get('/delete', deleteDiary);

module.exports = router;

/** route middlewares **/

function index(req, res, next) {
  res.render('index', { title: 'Dagbók' });
}

function info(req, res, next) {
	var id = req.params.id;

  utils.getRestaurantById(id, function (err, all) {

    var url = all[0].url;
    url = url.trim();

    res.render('info', {name: all[0].name, address: all[0].address, phoneNumber: all[0].phonenumber,
    										url: url, logo: all[0].logo});
  });
}

function getRestaurants(req, res) {
	// req.session.distance = req.query.distance*1000;
	// console.log("session: " + req.session.distance);
  // Current logged in user
  // var user = req.session.user.username;
  // req.session.svangur = "hallo";
  // console.log(req.session.svangur);
  var distance = req.query.distance*1000;
  console.log(distance);
  // console.log("id: "+req.query.id);
  // console.log("inc console.dir");
  // console.dir(req);

   utils.listRestaurants(function (err, all) {
    // req.session.diaryID = all[0].id;
    // console.log(all);
    var test = utils.listRestaurantsInRadius(all, distance, 64.135731, -21.846231);
    // console.dir(test);
    res.send(test);
  });
}

function error(req, res) {
  // Caught and passed down to the errorHandler middleware
  throw new Error('borked!');
}



























// function searchForm(req, res) {
//   // Current logged in user
//   var user = req.session.user.username;
//   var date = req.query.date;
//   console.log('date: '+req.query.date);

//    users.listText(user, date, function (err, all) {
//     // console.log(all);
//     res.send(all);
//   });
// }

// function createForm(req, res, next) {
//   res.render('create', { title: 'Nýr aðgangur' });
// }

// function createHandler(req, res, next) {
//   var username = req.body.username;
//   var password = req.body.password;

//   // hér vantar *alla* villumeðhöndlun
//   users.createUser(username, password, function (err, status) {
//     if (err) {
//       console.error(err);
//     }

//     var success = true;

//     if (err || !status) {
//       success = false;
//     }

//     res.render('create', { title: 'Nýr aðgangur', 
//       post: true, success: success });
//   });
// }

// function ensureLoggedinIn(req, res, next) {
//   if (req.session.user) {
//     next(); // köllum í næsta middleware ef við höfum notanda
//   } else {
//     res.redirect('/login');
//   }
// }

// function redirectIfLoggedIn(req, res, next) {
//   if (req.session.user) {
//     res.redirect('/redirect');
//   } else {
//     next();
//   }
// }

// function login(req, res, next) {
//   res.render('login', { title: 'Innskráning' });
// }

// function loginHandler(req, res, next) {
//   var username = req.body.username;
//   var password = req.body.password;

//   users.auth(username, password, function (err, user) {
//     if (user) {
//       req.session.regenerate(function (){
//         req.session.user = user;
//         res.redirect('/comments');
//       });
//     } else {
//       var data = {
//         title: 'Login',
//         username: username,
//         error: true
//       };
//       res.render('login', data);
//     }
//   });
// }

// function logout(req, res, next) {
//   // eyðir session og öllum gögnum, verður til nýtt við næsta request
//   req.session.destroy(function(){
//     res.redirect('/');
//   });
// }

// function index(req, res, next) {
//   var user = req.session.user;
//   console.log('Logged in as: ' + user.username);

//   var d = new Date();
//   var date = d.getDate() + "-" + parseInt(d.getMonth()+1) + "-" + d.getFullYear();

//   users.listText(user.username, date, function (err, all) {
//     // req.session.diary = "prump";
//     res.render('comments', { title: 'comments zone',
//       user: user,
//       text: all });
//   })
// }


// My code here

// function indexPost(req, res, next) {
//   var user = req.session.user;

//   // Notaði þegar ég notaði form í html
//   // var title = req.body.title;
//   // var text = req.body.text;

//   // Date frá AJAX POST method
//   var title = req.body.title;
//   var text = req.body.text;
//   var date = req.body.date;

//   users.createComment(user.username, title, text, date, function (err, status) {
//     if (err) {
//       console.error(err);
//     }

//     var success = true;

//     if (err || !status) {
//       success = false;
//     }

//     users.listText(user.username, new Date(), function (err, all) {
//     // console.log(all)
//     res.render('comments', { title: 'comments zone',
//       user: user,
//       text: all });
//     })
//   });
// }

// function deleteDiary(req, res) {
//   // Current logged in user
//   var user = req.session.user.username;
//   var id = req.session.diaryID;
//   console.dir("Delete Diary: " + req.session.diaryID);

//    users.deleteDiary(id, function (err, all) {
//     console.log(all);
//     res.redirect('/comments');
//   });
// }
