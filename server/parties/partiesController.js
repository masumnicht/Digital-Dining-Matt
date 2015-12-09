/*jshint camelcase: false */

var partiesModel = require('./partiesModel.js');

// var redis = require('redis');
// var client = redis.createClient();
// client.quit();
// var redis = {};


// var usersModel = require('../users/usersModel.js');

// usersModel.user.post({
//         username: 'setTime',
//         password: '11123'})
//   .then(function(data) {
//     console.log(data.insertId);
//     console.log(data);
//     usersModel.user.put({
//       id: data.insertId,
//       password: 'caca'
//     });
//   })
//   .then(function() {
//     partiesModel.party.checkInAndCreateParty({
//       restaurant_id: 1,
//       party_size: 5,
//       user_id: 1});
//   })
//   .then(function(data) {
//     partiesModel.party.seatParty({
//       party_id: data.insertId,
//       table_id: 1});
//   })
//   .catch(function(err) {
//     console.log(err);
//   });

module.exports = {
  checkInAndCreateParty: function (req, res) {
    partiesModel.party.checkInAndCreateParty(req.body)
      .then(function (data) {
        res.status(201);
        res.send(data);
      });
  },
  editParty: function (req, res) {
    if (req.body.event === 'seat') {
      partiesModel.party.seat(req.params.id, req.body)
        .then(function (data) {
          res.status(200);
          res.send(data);
        });
    } else if (req.body.event === 'addParticipant') {
      partiesModel.party.addUserToParty(req.params.id, req.body)
        .then(function (data) {
          res.status(200);
          res.send(data);
        });
    } else {
      res.status(400);
      res.send();
    }
  }
};
