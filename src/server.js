'use strict';

// 1st level packages -> we did not install anything
// 3rd party packages
const express = require('express');
// local modules
const notFoundHandler = require('./handlers/404');
const errorHandler = require('./handlers/500');
const logger = require('./middlewares/logger');
const validator = require('./middlewares/validator');
// const square = require('./middlewares/square')
const app = express();


function start(port) {
    app.listen(port, ()=> console.log(`Running on Port ${port}`))

}

// Global Middlewares
app.use(express.json()); // access the body
// app.use(cors()); install the package
app.use(logger);


// ---------- home route ---------------
app.get('/', (req, res)=> {
    res.send('this is home page!!! :D :D :D')
});
// ------------- test internal server error -------------
app.post('/bad', (req,res)=> {
    let number = 12;
    number.forEach(x=> console.log(x));
    res.send('this Bad Route');
})
// ------------- test bad route ------------
app.get('/data', (req, res)=> {
    res.json({
       id: 1, 
       name: "Test Student",
       email: "test@test.com"
    });
});


app.get('/person' ,validator, (req, res)=> {
    res.json({
        name: req.query.name
    })
});


app.use('*', notFoundHandler);
app.use(errorHandler);

module.exports = {
    app: app,
    start: start
}