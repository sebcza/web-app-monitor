/*jshint node: true */
// module.exports ==> exports


module.exports = function(mongoose){
  var auditLogSchema = mongoose.Schema({
    type: {type: String, index:true},
    date: Date,
    contentOld: String,
    contentNew: String,
    userName: String,
    userId: Number,
    ip: String
});

return mongoose.model('auditLog', auditLogSchema);  
}


