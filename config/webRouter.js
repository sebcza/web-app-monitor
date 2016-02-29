/*jshint node: true */
// module.exports ==> exports

module.exports = function(app, logController, authController, authControllerApi, tokenSecurityController, notifyController){
    app.get('/',authControllerApi.isAuthenticated, logController.log);
    app.get('/auditLog',authControllerApi.isAuthenticated, logController.auditLog);
    app.get('/login', authController.logIn);
    app.get('/logout',authControllerApi.isAuthenticated,  authControllerApi.logOut);
    app.get('/token',authControllerApi.isAuthenticated,  tokenSecurityController.token);
    app.get('/notify',authControllerApi.isAuthenticated,  notifyController.notify);


    return app;
}

