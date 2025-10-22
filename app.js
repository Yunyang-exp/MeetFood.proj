const express = require('express');
const app = express();
const mongoose = require('mongoose');

const userRoute = require('./routes/user');

app.use('/api/v1/user/', userRoute);