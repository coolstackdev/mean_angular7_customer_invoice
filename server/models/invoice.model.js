var mongoose = require('mongoose');

// Invoice Schema
var invoiceSchema = mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	service: {
		type: String
	},
	price: {
		type: Number
	},
	due: {
		type: String
	},
	status: {
		type: String
	},
	createdAt: {
		type: Date,
		default: Date.now
	}
});

var Invoice = module.exports = mongoose.model('Invoice', invoiceSchema);

// Get Invoices
module.exports.getInvoices = function (callback, limit) {
	Invoice.find(callback).limit(limit).populate('user').sort([['createdAt', 'ascending']]);
}

// Get Single Invoice
module.exports.getInvoiceById = function (id, callback) {
	var query = { _id: id };
	Invoice.findOne(query, callback).populate('user');
}

// Add Invoice
module.exports.addInvoice = function (invoice, callback) {
	var add = {
		user: invoice.user_id,
		service: invoice.service,
		price: invoice.price,
		due: invoice.due,
		status: invoice.status
	}
	Invoice.create(add, callback);
}

// Update Invoice
module.exports.updateInvoice = function (id, invoice, options, callback) {
	var query = { _id: id };
	var update = {
		service: invoice.service,
		price: invoice.price,
		due: invoice.due,
		status: invoice.status
	}
	Invoice.findOneAndUpdate(query, update, options, callback);
}

// Remove Invoice
module.exports.removeInvoice = function (id, callback) {
	var query = { _id: id };
	Invoice.remove(query, callback);
}

// Get Customer Invoices
module.exports.getCustomerInvoices = function (customer_id, callback, limit) {
	var query = { user: customer_id };

	console.log('model: ' + customer_id);

	Invoice.find(query, callback).limit(limit).populate('user').sort([['createdAt', 'ascending']]);
}