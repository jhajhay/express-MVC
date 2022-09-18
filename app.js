const express = require("express");
const path = require("path");
const session = require('express-session');
const Mysql = require('mysql');
const cookieSession = require('cookie-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const route = require('./system/core/routes.js');
const config = require('./config.js');
const app = express();

app.use(function(req,res,next){
    req.start_etime = process.hrtime();
    req.connection = Mysql.createConnection(config.database);
    req.connection.connect(function(err) {
            if (err){
                res.send(error);
            }
            next();
    });
})
app.use(cookieParser());
app.use(bodyParser.urlencoded(config.bodyParser));
app.use(cookieSession(config.cookieSession));
app.use(session(config.session));
app.use(express.static(path.join(__dirname, "./assets")));
app.use(route);
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

app.listen(config.port, function() {
    console.log("listening on port ",config.port);
});