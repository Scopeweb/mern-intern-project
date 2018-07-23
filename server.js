const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const chalk = require('chalk');
const bodyParser = require('body-parser');

// Load environment variables from .env file, where API keys and passwords are configured.
dotenv.load({
  path: '.env'
});

// Initiate express
const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// API routes
const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');

// Express Configuration
app.set('host', '0.0.0.0');
app.set('port', process.env.PORT || 8080);

// Connect to MongoDB
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, `${chalk.red('✗')} MongoDB connection error. Please make sure MongoDB is running.`));
db.once('open', function () {
  console.log(`${chalk.green('✓')} MongoDB database connected. Let's go 💪`)
});

app.get("/", (req, res) => res.send("Hello World!"));

// Routes
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

app.listen(app.get('port'), () => {
  console.log(`${chalk.green('✓')} App is running at http://localhost:${app.get('port')} in ${app.get('env')} mode`);
  console.log('Press CTRL-C to stop\n');
});
