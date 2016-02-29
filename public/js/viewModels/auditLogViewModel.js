var AuditLogViewModel = function () {
    var self = this;
    self.auditLogs = ko.observableArray([]);
    self.auditType = ko.observable('All');
    self.cpu = ko.observable(0);
    self.memory = ko.observable(0);

    

    
    self.getAuditLogs = function (){
        if(self.auditType() === 'All'){
           App.Api.get('/api/auditlog').success(function(data){
               self.auditLogs(data);
           }); 
        }
        else{
            App.Api.get('/api/auditlog/type/'+self.auditType()).success(function(data){
               self.auditLogs(data);
           }); 
        }
        
    }
    
    self.auditType.subscribe(function(){
        self.auditLogs([]);
        self.getAuditLogs();
    });
    
    self.init = function () {
        self.getAuditLogs();
                var socket = io(window.location.href);
        
        socket.on('connect', function () {
            console.log('Nawiązano połączenie przez Socket.io');
        });
        socket.on('disconnect', function () {
            console.log('Połączenie przez Socket.io zostało zakończone');
        });
        socket.on("error", function (err) {
            console.error(err);
        });        
        
        socket.on("auditLog", function (data) {
            self.auditLogs.unshift(data);
        });
        socket.on("cpu-monitor", function (data) {
            self.cpu(data);
        });
        socket.on("memory-monitor", function (data) {
            function Round(n, k)
            {
                var factor = Math.pow(10, k);
                return Math.round(n*factor)/factor;
            }
            self.memory(Round(data, 3));
        }); 
        return self;
    }
 
 

}