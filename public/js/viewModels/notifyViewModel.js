var NotifyViewModel = function () {
    var self = this;
    self.notifications = ko.observableArray(null);
    self.cpu = ko.observable(0);
    self.memory = ko.observable(0);


    

    
    self.getNotifications = function (){
           App.Api.get('/api/notify').done(function(data){
               self.notifications(data);
           }); 
    };
    
    
    
    self.init = function () {
        self.getNotifications();
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
        
        socket.on("cpu-monitor", function (data) {
            self.cpu(data);
        });        
        socket.on("analyzeNotify", function (data) {
            data.forEach(function(o){
                $('#alertsn').append('<div class="alert alert-danger" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button><strong>W ciągu 48h '+o.counter+' razy wystąpił błąd.</strong> '+ o.content+'</div>');                
            });

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