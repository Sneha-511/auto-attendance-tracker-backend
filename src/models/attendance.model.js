const mongoose = require('mongoose');
const { toJSON } = require('./plugins');

const attendanceSchema = mongoose.Schema(
  {
    day: {
      type: Date,
      required: true,
    },
    presentees: [
      {
        type: mongoose.SchemaTypes.ObjectId,
      },
    ],
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
attendanceSchema.plugin(toJSON);

/**
 * @typedef Attendance
 */
const Attendance = mongoose.model('Attendance', attendanceSchema);

module.exports = Attendance;
