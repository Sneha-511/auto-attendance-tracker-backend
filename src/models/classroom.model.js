const mongoose = require('mongoose');
const { toJSON } = require('./plugins');
const studentSchema = require('./student.model').schema;
const attendanceSchema = require('./attendance.model').schema;

const classroomSchema = mongoose.Schema(
  {
    name: {
      type: String,
    },
    startYear: {
      type: Number,
      required: true,
    },
    endYear: {
      type: Number,
      required: true,
    },
    imageUrl: {
      type: String,
      trim: true,
    },
    students: [studentSchema],
    attendanceRecords: [attendanceSchema],
    createdBy: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
classroomSchema.plugin(toJSON);

// validate start and end year
classroomSchema.pre('validate', function (next) {
  if (this.startYear > this.endYear) {
    next(new Error('End year must be greater than or equal to the start year.'));
  }
  next();
});

/**
 * @typedef Classroom
 */
const Classroom = mongoose.model('Classroom', classroomSchema);

module.exports = Classroom;
