const router = require('express').Router();
const faker = require('faker');
const User = require('../models/User');

// get add-user page
router.get('/add-user', function (req, res, next) {
  return res.render('add-user');
});

// post add-user
router.post('/add-user', function (req, res, next) {
  const user = new User();

  user.name = req.body.name;
  user.email = req.body.email;
  user.role = req.body.role;
  user.password = req.body.password;

  user.save(function (err) {
    if (err) throw err;
    res.redirect('/add-user');
  });
});

// generate fake data
router.get('/generate-fake-data', function (req, res, next) {
  for (let i = 0; i < 90; i++) {
    const user = new User();

    user.name = faker.name.findName();
    user.email = faker.internet.email();
    user.role = faker.name.findName();
    user.password = faker.name.findName();

    user.save(function (err) {
      if (err) throw err;
    });
  }
  res.redirect('/add-user');
});

//get product listen
router.get('/users/', function (req, res, next) {
  var perPage = 10;
  var page = req.query.page || 1;
  User.find({})
    .skip(perPage * page - perPage)
    .limit(perPage)
    .exec(function (err, users) {
      User.count().exec(function (err, count) {
        if (err) return next(err);
        res.render('users', {
          users: users,
          current: page,
          pages: Math.ceil(count / perPage),
          perPage: perPage,
        });
      });
    });
});

module.exports = router;
