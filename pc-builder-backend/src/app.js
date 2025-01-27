const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const partsRoutes = require('./routes/parts');
const buildsRoutes = require('./routes/builds');
const compatibilityRoutes = require('./routes/compatibility');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/parts', partsRoutes);
app.use('/api/builds', buildsRoutes);
app.use('/api/compatibility', compatibilityRoutes);

module.exports = app;