/*jshint node: true */
// module.exports ==> exports
module.exports = function(logModel, auditLogModel, tokenSecurity, notification){
    var log = function (req, res){
        
        var query =  tokenSecurity.findOne({ token: req.params.token});
        query.exec(function(err, token){
            console.log(token);
           if(err || token == null){
                res.status(401);
                res.send('Invalid token!\n');
           }
            else{
                res.type('application/json');    
                var log = new logModel(
                    { 
                        type: req.body.type,
                        date: req.body.date,
                        content: req.body.content
                    });
                log.save();
                res.status(200);
                    var io = require('socket.io-client'),
                    socket = io.connect('http://localhost:3000');
                    socket.emit('addLog', log);
                res.send({
                    status: "OK",
                    statusCode: 200
                });                
            }

       });

    }

    var auditLog = function (req, res){
        
                var query =  tokenSecurity.findOne({ token: req.params.token});
        query.exec(function(err, token){
            console.log(token);
           if(err || token == null)
           {
                res.status(401);
                res.send('Invalid token!\n');
           }
            else
            {
                res.type('application/json');

                var auditLog = new auditLogModel(
                    { 
                        type: req.body.type,
                        date: req.body.date,
                        contentOld: req.body.contentOld,
                        contentNew: req.body.contentNew,
                        userName: req.body.userName,
                        userId: req.body.userId,
                        ip: req.body.ip
                    });
                auditLog.save();
                    var io = require('socket.io-client'),
                    socket = io.connect('http://localhost:3000');
                    socket.emit('addAuditLog', auditLog);                
                res.send({
                    status: "OK",
                    statusCode: 200
                });
                
            }

       });
    };
    
    
    var getLogs = function (req, res){
        if(req.params.type){
            var query = logModel.find({type: req.params.type});

        }
        else{
            var query = logModel.find();
        }
        query.limit(50);
        query.sort('-date');
        query.exec(function(err, logs){
            res.send(logs);
        });
        
    }
    
    
    var getAllAuditLogs = function(req, res){
        var query = auditLogModel.find();
        query.limit(50);
        query.sort('-date');
        query.exec(function(err, logs){
            res.send(logs);
        });
    }
    
    var getAuditLogsByType = function(req, res){
        var query = auditLogModel.find({type: req.params.type});
        query.limit(50);
        query.sort('-date');
        query.exec(function(err, logs){
            res.send(logs);
        });
    }
    var getAuditLogs = function(req, res){
        var query = auditLogModel
        .find()
        
        .where('type').equals(req.params.type)
        .where('userId').equals(req.params.userid)
        .where('ip').equals(req.params.ip);
        query.limit(50);
        query.sort('-date');
        query.exec(function(err, logs){
            res.send(logs);
        });        
    }
    var getAuditLogsIp = function(req, res){
         var query = auditLogModel.find({ip: req.params.ip});
        query.limit(50);
        query.exec(function(err, logs){
            res.send(logs);
        });       
    }
    
    var getAuditLogsUserId = function(req, res){
         var query = auditLogModel.find({userId: req.params.userid});
        query.limit(50);
        query.sort('-date');
        query.exec(function(err, logs){
            res.send(logs);
        });       
    }
    
    var analyzeErrorLog = function(req, res){
        var data = new Date();
        var query = logModel.find( 
        {"date": {"$gte": req.params.from, "$lt": req.params.to}});
        query.exec(function(err, logs){
            var array = [];
            
            logs.forEach(function(element, index){
                var isInArray=null;
                array.forEach(function(e, i){
                    if(e.content == element.content){
                        isInArray = e;
                        
                    }
                });
                
                if(isInArray!=null){
                    isInArray.counter++;
                }
                else{
                    array.push({
                    content: element.content,
                    counter:1
                });                     
                }

                

            });
            var io = require('socket.io-client'),
            socket = io.connect('http://localhost:3000');
            socket.emit('analyze', array);
            array.forEach(function(o){
                var quer = new notification({
                content: o.content,
                date: new Date(),
                counter:o.counter
            }); 
                quer.save();
            });

            res.send(array);
            
        });
    }
    
    return {
        analyzeErrorLog:analyzeErrorLog,
        getAuditLogs: getAuditLogs,
        getAuditLogsByType: getAuditLogsByType,
        getAuditLogsIp: getAuditLogsIp,
        getAllAuditLogs: getAllAuditLogs,
        getAuditLogsUserId: getAuditLogsUserId,
        getLogs:getLogs,
        auditLog: auditLog,
        log:log,
    }
}



