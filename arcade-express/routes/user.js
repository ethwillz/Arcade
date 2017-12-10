var express = require('express');
var router = express.Router();
const knex = require('knex')(require('../knexfile'))

router.post('/signup', function(req, res, next) {
  if(req.body.password !== req.body.confirm_password) return res.sendStatus(432); //passwords don't match

  if(!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(req.body.password)) return res.sendStatus(436);

  knex('user').where('username', req.body.username)
    .orWhere('email', req.body.email)
    .then(([user]) => {
      if(user) return res.sendStatus(433);
    });

  var emailFilter=/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
  if(!emailFilter.test(req.body.email)) return res.sendStatus(434)//email improperly formed

  if(!/^[0-9a-zA-Z]+$/.test(req.body.username)) return res.sendStatus(435); //username invalid (not alphanumeric)

  knex('user').insert({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  })
  .then(() => res.sendStatus(200));
});

router.post('/authenticate', function(req, res, next) {
  let user = knex('user').where({
    username: req.body.username,
    password: req.body.password,
  }).then(([user]) => {
    if(user) res.sendStatus(200);
    else res.sendStatus(401);
  });
});

module.exports = router;
