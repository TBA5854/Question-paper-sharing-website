const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const fileSchema = new Schema({
  fileName: { type: String, required: true },
  subject: { type: String, required: true, index:true },
  courseCode: { type: String, required: true, index:true },
  examType: { type: String, required: true, index:true },
  year: { type: Number, required: true, index: true },
  sem: { type: String, required: true, index:true },
  // description: { type: String ,required : true ,default : ''},
  path: { type: String, required: true },
  size: { type: Number, required: true },
  // user: { type: mongoose.Types.ObjectId, required: true }
  uuid: { type: String, required: true },

  
}, { timestamps: true });

module.exports = mongoose.model('File', fileSchema);