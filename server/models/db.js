const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true })
    // mongoose.connect("mongodb://localhost/mean_migrate", { useNewUrlParser: true })
    .then(() => console.log('Connecting to database successful'))
    .catch(err => console.error('Could not connect to Mongo DB', err));
mongoose.set('useCreateIndex', true);

require('./user.model');
require('./invoice.model');
