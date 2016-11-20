var mongoose  = require('mongoose');
var Schema    = mongoose.Schema;

var StudentSchema = new Schema({
  id: { type: String},
  name: { type: String },
  class_id: { type: String },
  has_parent: { type: Boolean, default: false },

  //作业是否确认完成
  math_done: { type: Boolean, default: false },
  Chinese_done: { type: Boolean, default: false },
  English_done: { type: Boolean, default: false },

  //数学成绩
  math_score_1: { type: String, default: "未发布" },
  math_score_2: { type: String, default: "未发布" },
  math_score_3: { type: String, default: "未发布" },
  math_score_4: { type: String, default: "未发布" },

  //语文成绩
  Chinese_score_1: { type: String, default: "未发布" },
  Chinese_score_2: { type: String, default: "未发布" },
  Chinese_score_3: { type: String, default: "未发布" },
  Chinese_score_4: { type: String, default: "未发布" },

  //英语成绩
  English_score_1: { type: String, default: "未发布" },
  English_score_2: { type: String, default: "未发布" },
  English_score_3: { type: String, default: "未发布" },
  English_score_4: { type: String, default: "未发布" },
});
StudentSchema.index({id: 1}, {unique: true});

mongoose.model('Student', StudentSchema);
