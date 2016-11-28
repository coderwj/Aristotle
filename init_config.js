

var init_config = {

  stu_t : [
    {id: 'stu1', name: '学生1', class_id: 'class1',
    score_t: [['70', '80', '90'],['70', '80', '90'],['70', '80', '90'],['70', '80', '90']]},

    {id: 'stu2', name: '学生2', class_id: 'class1',
    score_t: [['70', '80', '90'],['70', '80', '90'],['70', '80', '90'],['70', '80', '90']]},

    {id: 'stu3', name: '学生3', class_id: 'class2',
    score_t: [['70', '80', '90'],['70', '80', '90'],['70', '80', '90'],['70', '80', '90']]},

    {id: 'stu4', name: '学生4', class_id: 'class2',
    score_t: [['70', '80', '90'],['70', '80', '90'],['70', '80', '90'],['70', '80', '90']]},
  ],

  teacher_t : [
    {id: '张老师', pass: '1', subject: 'math'},
    {id: '王老师', pass: '1', subject: 'Chinese'},
    {id: '李老师', pass: '1', subject: 'English'},
  ],

  class_t : [
    {id: 'class1', head_t_id: '张老师', math_t_id: '张老师', Chinese_t_id: '王老师', English_t_id: '李老师'},
    {id: 'class2', head_t_id: '张老师', math_t_id: '张老师', Chinese_t_id: '王老师', English_t_id: '李老师'},
  ],

  homework_t : [
    {class_id: 'class1', subject: 'math', content: '这是一班的数学作业：......'},
    {class_id: 'class1', subject: 'Chinese', content: '这是一班的语文作业：......'},
    {class_id: 'class1', subject: 'English', content: '这是一班的英语作业：......'},
  ],

  info_t : [
    {id: '国庆节放假通知',
     content: '根据国家相关部门关于2014年节假日安排的通知，结合我单位工作实际情况，现将2014年国庆节放假的有关事项安排如下：\n' +
          '10月1日至7日放假调休，共7天。\n' +
          '9月28日(星期日)、10月11日(星期六)上班。\n' +
          '请各部门妥善安排好值班和安全、保卫等工作，遇有重大突发事件发生，要按规定及时报告并妥善处置，确保度过一个平安愉快的假期。',
     create_t_id: '张老师',
     class_id: 'class1'},

     {id: '关于延长自习室开放时间的通知',
     content: '为满足西土城路校区部分同学希望延长晚间自习时间的需求，经学校有关部门研究，决定自即日起将教三楼129、131、133三间教室的开放时间延长至23:00，现将相关事宜通知如下：' +
          '1．延长自习室开放时间是为了满足部分学生的学习需要，学校鼓励同学们按照正常作息时间学习和生活；' +
          '2．请在教室自习的学生自觉维护室内卫生，爱护室内设施，保持安静、良好的自习环境；' +
          '3．安全起见，23:00以后回宿舍就寝的同学，请尽量结伴而行；',
     create_t_id: '王老师',
     class_id: 'class2'},
  ],

};

module.exports = init_config;
