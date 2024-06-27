/* eslint-env es6 */
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const  {sequelize}  = require('./sequelize'); // Import Sequelize instance
const routes = require('./routers/router')
const candidateRouter = require('./routers/candidateRouter')

// Load environment variables
require('dotenv').config();

const app = express();
app.use(bodyParser.json()); 


// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static('uploads'));

// Routes
app.use('/api', routes);
app.use('/api/candidate',candidateRouter)

// Error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

// Start server
const PORT = process.env.PORT || 3000;

// Connect to the database and start the server
sequelize.authenticate()
    .then(() => {
        console.log('Database connection has been established successfully.');
        return sequelize.sync();
    })
    .then(() => {
        console.log('Database synchronized');
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });
