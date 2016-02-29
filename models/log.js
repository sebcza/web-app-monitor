/*jshint node: true */
// module.exports ==> exports


module.exports = function(mongoose){
  var logSchema = mongoose.Schema({
    type: {type: String, index:true},
    date: Date,
    content: String
    
});

return mongoose.model('Log', logSchema);  
}


