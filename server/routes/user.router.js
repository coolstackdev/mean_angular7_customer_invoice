var express = require('express');
var router = express.Router();

User = require('../models/user.model.js');
Invoice = require('../models/invoice.model.js');

// Get All Users
router.get('/', function (req, res) {
	User.getUsers(function (err, users) {
		if (err) {
			res.send(err);
		}
		res.json(users);
	});
});

// Get Single User
router.get('/:id', function (req, res) {
	User.getUserById(req.params.id, function (err, user) {
		if (err) {
			res.send(err);
		}
		res.json(user);
	});
});

// Add User
router.post('/', function (req, res) {
	var user = req.body;
	User.addUser(user, function (err, user) {
		if (err) {
			res.send(err);
		}
		res.json(user);
	});
});

// Update User
router.put('/:id', function (req, res) {

	console.log('user update put method');

	var id = req.params.id;
	var user = req.body;
	User.updateUser(id, user, {}, function (err, user) {
		if (err) {
			res.send(err);
		}
		res.json(user);
	});
});

// Delete User
router.delete('/:id', function (req, res) {
	var id = req.params.id;
	User.removeUser(id, function (err, user) {
		if (err) {
			res.send(err);
		}
		res.json(user);
	});
});

module.exports = router;