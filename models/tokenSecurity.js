/*jshint node: true */
// module.exports ==> exports


module.exports = function(mongoose){
  var token = mongoose.Schema({
    name: {type: String, index:true},
    token: {type: String, index:true},
    
});

return mongoose.model('tokenSecurity', token);  
}
