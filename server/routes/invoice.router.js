var express = require('express');
var router = express.Router();

User = require('../models/user.model.js');
Invoice = require('../models/invoice.model.js');

const ctrlInvoice = require('../controllers/invoice.controller');

router.get('/', ctrlInvoice.getInvoices);
router.get('/invoice/:id', ctrlInvoice.getInvoiceById);
router.post('/update', ctrlInvoice.updateInvoice);
router.post('/add', ctrlInvoice.addInvoice);


router.get('/customer/:customer_id', function (req, res) {
    console.log('server invoice/customer/' + req.params.customer_id);

    var customer_id = req.params.customer_id;
    Invoice.getCustomerInvoices(customer_id, function (err, invoices) {

        console.log(invoices);

        if (err) {
            res.send(err);
        }
        res.json(invoices);
    });
});

// Delete Invoice
router.delete('/:id', function (req, res) {
    var id = req.params.id;
    Invoice.removeInvoice(id, function (err, invoice) {
        if (err) {
            res.send(err);
        }
        res.json(invoice);
    });
});

module.exports = router;