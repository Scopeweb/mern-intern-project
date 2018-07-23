/**
 * Import node modules
 */
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const chalk = require('chalk');

/**
 * Load environment variables from .env file, where API keys and passwords are configured.
 */
dotenv.load({
  path: '.env'
});

/**
 * Setup Express
 */
const app = express();

const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');

/**
 * Expresss configuration
 */
app.set('host', '0.0.0.0');
app.set('port', process.env.port || 8080);

/**
 * Connect to Mongo database
 */
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, `${chalk.red('✗')} MongoDB connection error. Please make sure MongoDB is running.`));
db.once('open', function () {
  console.log(`${chalk.green('✓')} MongoDB database connected. Let's go 💪`)
});

app.get("/", (req, res) => res.send("Hello World!"));

/**
 * Use routes
 */
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

app.listen(app.get('port'), () => {
  console.log(`${chalk.green('✓')} App is running at http://localhost:${app.get('port')} in ${app.get('env')} mode`);
  console.log('Press CTRL-C to stop\n');
});
