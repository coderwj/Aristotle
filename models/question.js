var mongoose  = require('mongoose');
var Schema    = mongoose.Schema;

var QuestionSchema = new Schema({
  id: { type: String },
  title: { type: String },
  content: { type: String },
  create_p_id: { type: String },
});
QuestionSchema.index({id: 1}, {unique: true});

mongoose.model('Question', QuestionSchema);
