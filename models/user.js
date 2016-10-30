var mongoose  = require('mongoose');
var Schema    = mongoose.Schema;

var UserSchema = new Schema({
  name: { type: String},
  loginname: { type: String},
  pass: { type: String },


  create_at: { type: Date, default: Date.now },
  update_at: { type: Date, default: Date.now },

  active: { type: Boolean, default: false },


});


UserSchema.index({loginname: 1}, {unique: true});

UserSchema.pre('save', function(next){
  var now = new Date();
  this.update_at = now;
  next();
});

mongoose.model('User', UserSchema);
