const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
//const connectDB = require('./config/db.js');
const errorHandler = require('./middleware/errorHandler');
dotenv.config({ path: path.join(__dirname, '/config/config_dev.env' )});
//connectDB();

const apiRouter = require('./routes/api.todos.route');

const app = express();

app.use(express.static(path.join(__dirname, 'public')))

app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')))
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')))
app.use('/js', express.static(path.join(__dirname, 'node_modules/jquery/dist')))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use('/api/todos/', apiRouter);

app.use(errorHandler);

app.listen(process.env.PORT, () => console.log(`Service is running on port: ${process.env.PORT}`));