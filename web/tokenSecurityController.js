/*jshint node: true */
// poniżej użylismy krótszej (niż na wykładzie) formy

module.exports = function() {
    var token = function (req, res){
        res.render('token', {
            title: "Tokens",
            isAuthorize: req.cookies.authtoken
        });
    };
    
    
    
    return {
        token: token,
    };
}
