var LoginViewModel = function () {
    var self = this;
    self.userName = ko.observable();
    self.password = ko.observable();

    
    
    self.login = function(){
        App.Api.post('/api/login', {username: "", password: ""}).success(function(){
            window.location = "/";
        });
    }
    
    self.init = function () {
        return self;
    }
 
 

}