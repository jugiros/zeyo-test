const express = require('express');
const cors = require('cors');
const procesoRoutes = require('./routes/proceso.routes');
const ErrorHandler = require('./middleware/errorHandler');

const app = express();

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || 
        /^https?:\/\/localhost(:\d+)?$/.test(origin) ||
        /^https?:\/\/127\.0\.0\.1(:\d+)?$/.test(origin) ||
        /^https?:\/\/192\.168\.\d+\.\d+(:\d+)?$/.test(origin) ||
        /^https?:\/\/10\.\d+\.\d+\.\d+(:\d+)?$/.test(origin) ||
        /^https?:\/\/172\.(1[6-9]|2\d|3[01])\.\d+\.\d+(:\d+)?$/.test(origin)) {
      callback(null, true);
    } else {
      callback(new Error('No permitido por CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
};

app.use(cors(corsOptions));
app.use(express.json());
app.use('/api/procesos', procesoRoutes);

app.use(ErrorHandler.notFound);
app.use(ErrorHandler.handle);

module.exports = app;