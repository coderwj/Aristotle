var mongoose  = require('mongoose');
var Schema    = mongoose.Schema;

var InformationSchema = new Schema({
  id: { type: String },
  title: { type: String },
  content: { type: String },
  create_t_id: { type: String },
  date: { type: Date, default: Date.now },
  class_id: { type: String },
});
InformationSchema.index({id: 1}, {unique: true});

mongoose.model('Information', InformationSchema);
