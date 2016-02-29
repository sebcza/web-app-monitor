/*jshint node: true */
// module.exports ==> exports


module.exports = function(mongoose){
  var notificationSchema = mongoose.Schema({
    content: {type: String, index:true},
    date: Date,
    counter: Number
    
});

return mongoose.model('Notification', notificationSchema);  
}


