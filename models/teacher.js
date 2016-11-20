var mongoose  = require('mongoose');
var Schema    = mongoose.Schema;

var TeacherSchema = new Schema({
  id: { type: String },
  pass: { type: String },
  subject: { type: String },
});
TeacherSchema.index({id: 1}, {unique: true});

mongoose.model('Teacher', TeacherSchema);
