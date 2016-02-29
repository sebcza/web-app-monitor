/*jshint node: true */
// ładujemy wykorzystywane moduły
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var cookieSession = require('cookie-session');
var logger = require('morgan');
var errorHandler = require('errorhandler');
var cookieParser = require('cookie-parser');
var app = express();
var httpServer = require("http").Server(app);
var io = require("socket.io")(httpServer);

// tworzymy i konfigurujemy obiekt aplikacji

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mat2tab-logs');

//Models
var logModel = require('./models/log.js')(mongoose);
var auditLogModel = require('./models/auditLog.js')(mongoose);
var tokenSecurity = require('./models/tokenSecurity.js')(mongoose);
var user = require('./models/user.js')(mongoose);
var notification = require('./models/notification.js')(mongoose);

//Controllers API
var logControllerApi = require('./api/logController.js')(logModel, auditLogModel, tokenSecurity,notification);
var tokenSecurityControllerApi = require('./api/tokenSecurityController.js')(tokenSecurity);
var authControllerApi = require('./api/authController.js')(user);
var notifyControllerApi = require('./api/notifyController.js')(notification);


//Controllers WEB
var logController = require('./web/logController.js')();
var authController = require('./web/authController.js')();
var tokenSecurityController = require('./web/tokenSecurityController.js')();
var notifyController = require('./web/notifyController.js')();


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

app.use(cookieParser());

// „serwery statyczne”
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'bower_components/jquery/dist')));

if ('development' == env) {
    app.use(logger('dev'));
    app.use(errorHandler());
} else {
    app.use(logger('short'));
}


// Routing
app = require('./config/apiRouter.js')(app, logControllerApi, tokenSecurityControllerApi, authControllerApi, notifyControllerApi);

app = require('./config/webRouter.js')(app, logController, authController, authControllerApi, tokenSecurityController, notifyController);


//sockety

io.sockets.on("connection", function (socket) {
    socket.on("addLog", function (data) {
        console.log("hehe");
        io.sockets.emit("log", data);
    });
    socket.on("cpu", function (data) {
       io.sockets.emit("cpu-monitor", data);
    });    
    socket.on("memory", function (data) {
       io.sockets.emit("memory-monitor", data);
    });        
    socket.on("addAuditLog", function (data) {
        io.sockets.emit("auditLog", data);
    });
     socket.on("analyze", function (data) {
        io.sockets.emit("analyzeNotify", data);
    });   
    socket.on("error", function (err) {
        console.dir(err);
    });
});


// uruchamiamy aplikację
httpServer.listen(port, function () {
    console.log("Serwer nasłuchuje na porcie " + port);
});
