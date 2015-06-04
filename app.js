/*jshint node: true */
// ładujemy wykorzystywane moduły
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var cookieSession = require('cookie-session');
var logger = require('morgan');
var errorHandler = require('errorhandler');
// tworzymy i konfigurujemy obiekt aplikacji
var app = express();
var api = require('./api');
var web = require('./web');
var port = process.env.PORT || 3000;
var env = process.env.NODE_ENV || 'development';
var secret = process.env.SECRET || '$uper $ecret';

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// obsługa danych typu application/json
app.use(bodyParser.json());
// obsługa danych typu application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// obsługa sesji za pomocą ciasteczek
app.use(cookieSession({secret: secret}));
// „middleware” obsługujące LESS-a

// „serwery statyczne”
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'bower_components/jquery/dist')));

if ('development' == env) {
    app.use(logger('dev'));
    app.use(errorHandler());
} else {
    app.use(logger('short'));
}

app.post('/api/log', api.log);
app.post('/api/auditlog', api.auditlog);

// uruchamiamy aplikację
app.listen(port, function () {
    console.log("Serwer nasłuchuje na porcie " + port);
});
