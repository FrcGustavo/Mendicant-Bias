/* eslint-disable no-console */
const exprees = require('express');
const cors = require('cors');
const morgan = require('morgan');
const config = require('./config');

const connectMongo = require('./dbs/mongo');

const postRotes = require('./routes/posts');
const AdminRoutes = require('./routes/AdminRoutes');
const AuthRoutes = require('./routes/AuthRoutes');

const app = exprees();
connectMongo();

app.use(exprees.urlencoded({ extended: true }));
app.use(exprees.json());
app.use(cors('*'));
app.use(morgan('dev'));

postRotes(app);
AdminRoutes(app);
AuthRoutes(app);

app.listen(config.srv.port, () => {
  console.log(`Server is runing on http://localhost:${config.srv.port}`);
});
