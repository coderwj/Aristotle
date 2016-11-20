var mongoose  = require('mongoose');
var Schema    = mongoose.Schema;

var ParentSchema = new Schema({
  id: { type: String },
  pass: { type: String },
  stu_id: { type: String },

  create_at: { type: Date, default: Date.now },
  update_at: { type: Date, default: Date.now },

  active: { type: Boolean, default: false },


});


ParentSchema.index({id: 1}, {unique: true});

ParentSchema.pre('save', function(callback){
  var now = new Date();
  this.update_at = now;
  callback();
});

mongoose.model('Parent', ParentSchema);
