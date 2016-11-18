var mongoose  = require('mongoose');
var Schema    = mongoose.Schema;

var StudentSchema = new Schema({
  id: { type: String},
  name: { type: String },
  class_id: { type: String },
  has_parent: { type: Boolean, default: false },
  math_done: { type: Boolean, default: false },
  Chinese_done: { type: Boolean, default: false },
  English_done: { type: Boolean, default: false },

});
StudentSchema.index({id: 1}, {unique: true});

mongoose.model('Student', StudentSchema);
