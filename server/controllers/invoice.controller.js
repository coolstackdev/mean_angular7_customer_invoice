const mongoose = require('mongoose');

const Invoice = mongoose.model('Invoice');

module.exports.getInvoices = (req, res, next) => {

    Invoice.find({}).populate('user').sort([['createdAt', 'ascending']]).exec(function (err, result) {
        return res.status(200).json(result);
    });
}

module.exports.getInvoiceById = (req, res, next) => {

    var query = { _id: req.params.id };
    Invoice.findOne(query).populate('user').exec((err, result) => {
        console.log(result);
        return res.status(200).json(result);
    });
}

module.exports.updateInvoice = (req, res, next) => {

    console.log('udpate invoice');

    var update = {
        user: req.body.user,
        service: req.body.service,
        price: req.body.price,
        due: req.body.due,
        status: req.body.due
    }
    console.log('////////////////////from request//////////////////');
    console.log(update);

    Invoice.findOne({ _id: req.body._id }, (err, invoice) => {

        invoice.user = update.user;
        invoice.service = update.service;
        invoice.price = update.price;
        invoice.due = update.due;
        invoice.status = update.status;

        invoice.save((err, doc) => {
            if (!err)
                res.send(doc);
            else {
                if (err.code == 11000)
                    res.status(422).send(['Duplicate email address found.']);
                else
                    return next(err);
            }

        });
    });

}

module.exports.addInvoice = (req, res, next) => {

    console.log('invoice server controller');

    var invoice = new Invoice();

    invoice.user = req.body.user;
    invoice.service = req.body.service;
    invoice.price = req.body.price;
    invoice.due = req.body.due;
    invoice.status = req.body.status;

    console.log(invoice);

    invoice.save((err, doc) => {
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


// // user details
// module.exports.userProfile = (req, res, next) => {
//     User.findOne({ _id: req._id },
//         (err, user) => {
//             if (!user)
//                 return res.status(404).json({ status: false, message: 'User record not found.' });
//             else
//                 return res.status(200).json({ status: true, user: _.pick(user, ['title', 'fullName', 'organization', 'address1', 'address2', 'city', 'state', 'zip', 'email']) });
//         }
//     );
// }


// // Get All Customers
// router.get('/', function (req, res) {
//     Invoice.getInvoices(function (err, invoices) {
//         console.log(err);
//         console.log(invoices);

//         if (err) {
//             res.send(err);
//         }
//         res.json(invoices);
//     });
// });

// // Get Single Invoice
// router.get('/:id', function (req, res) {
//     Invoice.getInvoiceById(req.params.id, function (err, invoice) {
//         if (err) {
//             res.send(err);
//         }
//         res.json(invoice);
//     });
// });

// // Add Invoice
// router.post('/', function (req, res) {
//     var invoice = req.body;
//     Invoice.addInvoice(invoice, function (err, invoice) {
//         if (err) {
//             res.send(err);
//         }
//         res.json(invoice);
//     });
// });

// // Update Invoice
// router.put('/:id', function (req, res) {
//     var id = req.params.id;
//     var invoice = req.body;
//     Invoice.updateInvoice(id, invoice, {}, function (err, invoice) {
//         if (err) {
//             res.send(err);
//         }
//         res.json(invoice);
//     });
// });

// // Delete Invoice
// router.delete('/:id', function (req, res) {
//     var id = req.params.id;
//     Invoice.removeInvoice(id, function (err, invoice) {
//         if (err) {
//             res.send(err);
//         }
//         res.json(invoice);
//     });
// });

// // Get All Invoices For a Single Customer
// router.get('/customer/:customer_id', function (req, res) {
//     var customer_id = req.params.customer_id;
//     Invoice.getCustomerInvoices(customer_id, function (err, invoices) {
//         if (err) {
//             res.send(err);
//         }
//         res.json(invoices);
//     });
// });
