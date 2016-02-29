var LogViewModel = function () {
    var self = this;
    self.logs = ko.observableArray([]);
    self.type = ko.observable('All');
    self.cpu = ko.observable(0);
    self.memory = ko.observable(0);

    
    self.getLogs = function (){
        if(self.type() === 'All'){
           App.Api.get('/api/log').success(function(data){
               self.logs(data);
           }); 
        }
        else{
            App.Api.get('/api/log/type/'+self.type()).success(function(data){
               self.logs(data);
           });            
        }
        
    }
    
    self.type.subscribe(function(){
        self.logs([]);
        self.getLogs();
    });
    
    self.init = function () {
        self.getLogs();
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
        
        socket.on("log", function (data) {
            console.log("Dodałem");
            self.logs.unshift(data);
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