/*jshint node: true */
// poniżej użylismy krótszej (niż na wykładzie) formy

module.exports = function() {
    var notify = function (req, res){
        res.render('notify', {
            title: "Notification",
            isAuthorize: req.cookies.authtoken
        });
    };
 
    return {
        notify: notify  
    };
}




