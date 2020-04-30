/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
const exprees = require('express');
const cors = require('cors');
const morgan = require('morgan');
const config = require('./config');

const connectMongo = require('./dbs/mongo');

const PostRoutes = require('./routes/PostRoutes');
const AdminRoutes = require('./routes/AdminRoutes');
const AuthRoutes = require('./routes/AuthRoutes');

const app = exprees();
connectMongo();

app.use(exprees.urlencoded({ extended: true }));
app.use(exprees.json());
app.use(cors('*'));
app.use(morgan('dev'));

PostRoutes(app);
AdminRoutes(app);
AuthRoutes(app);

app.use((error, req, res, next) => {
  console.dir(error);
  res.status(error.status).json({
    name: error.name,
    status: error.status,
    message: error.message,
    stack: error.stack,
  });
});

app.listen(config.srv.port, () => {
  console.log(`Server is runing on http://localhost:${config.srv.port}`);
});
