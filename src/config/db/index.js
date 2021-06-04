const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect('mongodb+srv://xuantuuit:xuantuuit@westudy.u01et.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {dbName: 'westudy'},
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        });
        console.log('Connect successfully!!!');
    } catch (error) {
        console.log('Connect failure!!!');
    }
}

module.exports = { connect };


// mongoose.connect('mongodb+srv://xuantuuit:<xuantuuit>@westudy.u01et.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
//    { useNewUrlParser: true }, (err) => {
//        if (err) {
//            console.log('Can not connect to mongodb, because ' + err);
//        }
//        else {
//            console.log('Connect to mongodb successful');
//        }
//    });