const express = require('express');
const bodyParser = require('body-parser');
const { route } = require('../Node js/express-demo/routes/courses');
const cookieParser = require('cookie-parser');
const config = require('config');
const app = express();
app.use(cookieParser());
app.use(express.static('images'));
app.use(bodyParser.urlencoded({ extended: true }))
if (!config.get('jwtPrivateKey')) {
    console.error('FATAL ERROR: JwtPrivateKey Not Define');
    process.exit(1);
}


app.set('view engine', 'ejs');

app.use(require('./routes/userRoute'));
app.use(require('./routes/categoryRoute'));
app.use(require('./routes/contactusRoute'));
app.use(require('./routes/testimonialRoute'));
app.use(require('./routes/portfolioRoute'));
require('./startup/db')();

app.listen(7070);
console.log('port 7070 is listing');