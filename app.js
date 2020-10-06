const express = require('express');
const authRoutes = require('./routs/auth');
const app = express();
const parser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const passport = require('passport')

app.use(passport.initialize( ) )

require('./middleware/passport')(passport)
app.use(morgan('dev'));
app.use(cors())
app.use(parser.urlencoded({
    extends: true
}));
app.use(parser.json());
app.use('/api/auth', authRoutes );

module.exports = app;