var TokenViewModel = function () {
    var self = this;
    self.tokens = ko.observableArray(null);
    self.cpu = ko.observable(0);
    self.memory = ko.observable(0);
    
    self.name = ko.observable();
    self.token = ko.observable();

    

    
    self.getTokens = function (){
           App.Api.get('/api/token').done(function(data){
               self.tokens(data);
           }); 
    };
    
    self.showNewTokenModal = function () {
        $('#newToken').modal('show');  
    };
    
    
    self.addToken = function () {
        App.Api.post('/api/token', {name: self.name(), token: self.token()}).success(function(){
            $('#newToken').modal('hide');
            self.tokens(null);
            self.getTokens();
        });
    };
    
    self.deleteToken = function (data) {
        App.Api.delete('/api/token/'+data._id).success(function(data){
            self.tokens(null);
            self.getTokens();  
        });
    }
    
    
    self.init = function () {
        self.getTokens();
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