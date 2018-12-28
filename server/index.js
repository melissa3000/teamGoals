const express = require('express');
// const passport = require('passport');
require('./services/passport');
require('./dbconnection');

const app = express();
// app.use(passport.initialize());
// app.use(passport.session());
// require function from authRoutes and call it with app to allow routes to access app and run routes
require('./routes/authRoutes')(app);

// Allow dynamic port binding for deployment to Heroku
const PORT = process.env.PORT || 5000;
app.listen(PORT);
