var mongoose  = require('mongoose');
var Schema    = mongoose.Schema;

var AnswerSchema = new Schema({
  id: { type: String },
  content: { type: String },
  q_id: { type: String },
  create_p_id: { type: String },
  date: { type: Date, default: Date.now },
});
AnswerSchema.index({id: 1}, {unique: true});

mongoose.model('Answer', AnswerSchema);
