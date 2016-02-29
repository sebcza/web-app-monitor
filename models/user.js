/*jshint node: true */
// module.exports ==> exports


module.exports = function(mongoose){
  var user = mongoose.Schema({
    username: {type: String, index:true},
    token: {type: String, index:true}
    
});

return mongoose.model('User', user);  
}
