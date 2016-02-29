/*jshint node: true */
// module.exports ==> exports
module.exports = function(notification){
    
    var notify = function (req, res) {
         var query = notification.find();
        query.limit(50);
        query.exec(function(err, nots){
            res.send(nots);
        });              
    }

    return {
        notify: notify
    }
}