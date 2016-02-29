/*jshint node: true */
// module.exports ==> exports
module.exports = function(tokenSecurity){
    
    var getTokens = function(req, res)
    {
        var query = tokenSecurity.find();
        query.exec(function(err, tokens){
            res.send(tokens);
        }); 
    }
    
    var token = function(req, res){
        var toke = new tokenSecurity({
            name: req.body.name,
            token:req.body.token
        });
        console.log(req.body);
        toke.save();
        res.status(200);
        res.send({
            status: "Ok",
            statusCode: 200
        });
    }
    
    var deleteToken = function (req, res) {
        tokenSecurity.remove({_id: req.params.id}, function(err){
            res.status(200);
            res.send();
        });
    }
    return {
        token:token,
        deleteToken: deleteToken,
        getTokens: getTokens
    }
}