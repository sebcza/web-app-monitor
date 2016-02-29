/*jshint node: true */
// poniżej użylismy krótszej (niż na wykładzie) formy

module.exports = function() {
    var logs = function (req, res){
        res.render('logs', {
            title: "Logi",
            isAuthorize: req.cookies.authtoken
        });
    };
    
    var auditLogs = function(req, res){
        res.render('auditLogs', {
        title: "AuditLogs",
        isAuthorize: req.cookies.authtoken
        });
    }
 
    return {
        auditLog: auditLogs,
        log: logs  
    };
}




