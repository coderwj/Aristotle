var mongoose  = require('mongoose');
var Schema    = mongoose.Schema;

var ClassSchema = new Schema({
  id: { type: String},
  head_t_id: { type: String },
  math_t_id: { type: String },
  Chinese_t_id: { type: String },
  English_t_id: { type: String },
});
ClassSchema.index({id: 1}, {unique: true});

mongoose.model('Class', ClassSchema);
