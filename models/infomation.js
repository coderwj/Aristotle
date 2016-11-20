var mongoose  = require('mongoose');
var Schema    = mongoose.Schema;

var InfomationSchema = new Schema({
  id: { type: String },
  title: { type: String },
  content: { type: String },
  create_t_id: { type: String },
  date: { type: String },
  class_id: { type: String },
});
InfomationSchema.index({id: 1}, {unique: true});

mongoose.model('Question', InfomationSchema);
