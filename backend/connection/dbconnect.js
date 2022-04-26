const mongoose = require('mongoose');


mongoose.connect('mongodb://localhost:27017/login_database').then(() => {
    console.log('Successfully connected to database');
}).catch((error) => {
    console.log('database connection failed. exiting now...');
    console.error(error);
    process.exit(1);
});

