var mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// User Schema
var userSchema = mongoose.Schema({
	firstName: {
		type: String,
		required: true
	},
	lastName: {
		type: String,
		required: true
	},
	company: {
		type: String
	},
	logoUrl: {
		type: String
	},
	email: {
		type: String,
		required: true
	},
	phone: {
		type: String
	},
	street: {
		type: String
	},
	city: {
		type: String
	},
	state: {
		type: String
	},
	zip: {
		type: String
	},
	createdAt: {
		type: Date,
		default: Date.now
	},
	password: {
		type: String,
		required: 'Password can\'t be empty',
		minlength: [6, 'Password must be at least 6 character long']
	},
	saltSecret: String
});

/* from user schema */

// Custom validation for email
userSchema.path('email').validate((val) => {
	emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return emailRegex.test(val);
}, 'Invalid e-mail.');

// Events
userSchema.pre('save', function (next) {
	bcrypt.genSalt(10, (err, salt) => {
		bcrypt.hash(this.password, salt, (err, hash) => {
			this.password = hash;
			this.saltSecret = salt;
			next();
		});
	});
});

// Methods
userSchema.methods.verifyPassword = function (password) {
	return bcrypt.compareSync(password, this.password);
};

userSchema.methods.generateJwt = function () {
	return jwt.sign({ _id: this._id },
		process.env.JWT_SECRET,
		{
			expiresIn: process.env.JWT_EXP
		});
}

/** ///////////////////////////////////// */

var User = module.exports = mongoose.model('User', userSchema);

// Get users
module.exports.getUsers = function (callback, limit) {
	User.find(callback).limit(limit).sort([['firstName', 'ascending']]);
}

// Get user
module.exports.getUserById = function (id, callback) {
	User.findById(id, callback);
}

// Add User
module.exports.addUser = function (user, callback) {
	var add = {
		firstName: user.firstName,
		lastName: user.lastName,
		company: user.company,
		logoUrl: user.logoUrl,
		email: user.email,
		phone: user.phone,

		street: user.street,
		city: user.city,
		state: user.state,
		zip: user.zip

	}
	User.create(add, callback);
}

// Update User
module.exports.updateUser = function (id, user, options, callback) {
	var query = { _id: id };
	var update = {
		firstName: user.firstName,
		lastName: user.lastName,
		company: user.company,
		logoUrl: user.logoUrl,
		email: user.email,
		phone: user.phone,
		street: user.street,
		city: user.city,
		state: user.state,
		zip: user.zip

	}
	User.findOneAndUpdate(query, update, options, callback);
}


// Remove User
module.exports.removeUser = function (id, callback) {
	var query = { _id: id };
	User.remove(query, callback);
}
