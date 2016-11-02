var mongoose  = require('mongoose');
var Schema    = mongoose.Schema;

var UserSchema = new Schema({
  name: { type: String},
  pass: { type: String },


  create_at: { type: Date, default: Date.now },
  update_at: { type: Date, default: Date.now },

  active: { type: Boolean, default: false },


});


UserSchema.index({name: 1}, {unique: true});

UserSchema.pre('save', function(callback){
  var now = new Date();
  this.update_at = now;
  callback();
});

mongoose.model('User', UserSchema);
