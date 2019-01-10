const mongoose = require('mongoose');
const passport = require('passport');
const _ = require('lodash');

const User = mongoose.model('User');

//export index router js to register
module.exports.register = (req, res, next) => {
    var user = new User();

    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    user.company = req.body.company;
    user.logoUrl = req.body.logoUrl;
    user.email = req.body.email;
    user.phone = req.body.phone;
    user.street = req.body.street;
    user.state = req.body.state;
    user.city = req.body.city;
    user.zip = req.body.zip;
    user.password = req.body.password;

    user.save((err, doc) => {
        if (!err)
            res.send(doc);
        else {
            if (err.code == 11000)
                res.status(422).send(['Duplicate email address found.']);
            else
                return next(err);
        }

    });
}

module.exports.authenticate = (req, res, next) => {
    // call for passport authentication
    passport.authenticate('local', (err, user, info) => {
        // error from passport middleware
        if (err) return res.status(400).json(err);
        // registered user
        else if (user) return res.status(200).json({ "token": user.generateJwt() });
        // unknown user or wrong password
        else return res.status(404).json(info);
    })(req, res);
}

// user details
module.exports.userProfile = (req, res, next) => {
    User.findOne({ _id: req._id },
        (err, user) => {
            if (!user)
                return res.status(404).json({ status: false, message: 'User record not found.' });
            else
                return res.status(200).json({ status: true, user: _.pick(user, ['title', 'fullName', 'organization', 'address1', 'address2', 'city', 'state', 'zip', 'email']) });
        }
    );
}

// module.exports.getUsers = (req, res, next) => {

//     User.find({}).exec((err, result) => {
//         console.log(result);
//         return res.status(200).json(result);
//     });
// }
