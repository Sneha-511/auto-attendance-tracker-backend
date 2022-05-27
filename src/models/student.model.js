const mongoose = require('mongoose');
const { toJSON } = require('./plugins');

const studentSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      titlecase: true,
    },
    admNo: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
studentSchema.plugin(toJSON);

/**
 * @typedef Student
 */
const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
