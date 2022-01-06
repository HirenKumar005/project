const mongoose = require('mongoose');

module.exports = function () {
    mongoose.connect('mongodb://localhost/project')
        .then(() => console.log('Mongodb Concted...'))
        .catch(err => console.log('Database Not concted...', err));


}