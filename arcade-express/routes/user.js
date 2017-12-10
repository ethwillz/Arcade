var express = require('express');
var router = express.Router();
const knex = require('knex')(require('../knexfile'))

router.post('/', function(req, res, next) {
  knex('user').insert({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  })
  .then(() => res.sendStatus(200));
});

module.exports = router;
