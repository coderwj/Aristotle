var mongoose  = require('mongoose');
var Schema    = mongoose.Schema;

var AnswerSchema = new Schema({
  content: { type: String },
  q_id: { type: String },
  create_p_id: { type: String },
  date: { type: Date, default: Date.now },
});

mongoose.model('Answer', AnswerSchema);
