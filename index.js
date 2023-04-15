/* eslint-disable no-console */
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

mongoose.connect(process.env.DB_URI)
  .then(() => console.log('db connected'))
  .catch((err) => console.log(err));

app.use(cors());
app.use(express.json({
  verify: (req, res, buf) => {
    req.rawBody = buf;
  },
}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'frontend', 'dist')));

app.use('/api/auth', require('./src/routes/auth.routes'));
app.use('/api/profile', require('./src/routes/profile.routes'));
app.use('/api/payments', require('./src/routes/payments.routes'));
app.use('/api/forms', require('./src/routes/forms.routes'));
app.use('/api/webhooks', require('./src/routes/webhooks.routes'));
app.use('/api/public/v1', require('./src/routes/api.routes'));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'dist', 'index.html'));
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
