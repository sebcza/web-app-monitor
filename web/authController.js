/*jshint node: true */
// poniżej użylismy krótszej (niż na wykładzie) formy

module.exports = function() {
    var logIn = function (req, res){
        res.render('login', {
            title: "Login",
            isAuthorize: req.cookies.authtoken
        });
    };
 
    return {
        logIn: logIn  
    };
}




