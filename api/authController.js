/*jshint node: true */
// module.exports ==> exports
module.exports = function(userModel){
    
    
    var isAuthenticated = function (req, res, next){
        if (req.cookies.authtoken) {
            userModel.findOne({token: req.cookies.authtoken}, function(err, user){
                if(err || user === null){
                    res.redirect('/login');
                }
                else{
                    next();
                }
            });
        }
        else{
            res.redirect('/login');
        }
        
        
    }
    
    
    
    var logIn = function (req, res) {
        var time = (60 * 1000)*15;
        var user = new userModel({
            username: 'sebcza',
            token: 'wdafsfawdafdfdfasdas'
        });
        user.save(function(err, user){
            res.cookie('authtoken', 'wdafsfawdafdfdfasdas', time);
            res.status(200);
            res.send({
                status: "Ok",
                statusCode: 200
            });
        });
    }
    
    var logOut = function (req, res) {
        res.clearCookie('authtoken');
        res.redirect('/login');
    }

    return {
        isAuthenticated: isAuthenticated,
        logIn:logIn,
        logOut:logOut
    }
}