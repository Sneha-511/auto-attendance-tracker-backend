const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createClassroom = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    imageUrl: Joi.string().uri(),
    startYear: Joi.number().min(1900).max(3000).required(),
    endYear: Joi.number().min(Joi.ref('startYear')).max(3000).required(),
    students: Joi.array().items(
      Joi.object().keys({
        name: Joi.string().required(),
        admNo: Joi.string().required(),
        imageUrl: Joi.string().required(),
      })
    ),
    createdBy: Joi.forbidden(),
  }),
};

const getClassroomById = {
  params: Joi.object().keys({
    classroomId: Joi.string(),
  }),
};

const updateClassroom = {
  params: Joi.object().keys({
    classroomId: Joi.string(),
  }),
  body: Joi.object().keys({
    name: Joi.string(),
    imageUrl: Joi.string().uri(),
    startYear: Joi.number().min(1900).max(3000),
    endYear: Joi.number().min(Joi.ref('startYear')).max(3000),
    students: Joi.array().items(
      Joi.object().keys({
        name: Joi.string().required(),
        admNo: Joi.string().required(),
        imageUrl: Joi.string().required(),
      })
    ),
    createdBy: Joi.forbidden(),
  }),
};

const deleteClassroom = {
  params: Joi.object().keys({
    classroomId: Joi.string(),
  }),
};

const addStudent = {
  params: Joi.object().keys({
    classroomId: Joi.string(),
  }),
  body: Joi.object().keys({
    name: Joi.string().required(),
    admNo: Joi.string().required(),
    imageUrl: Joi.string().required(),
  }),
};

const updateStudent = {
  params: Joi.object().keys({
    classroomId: Joi.string(),
    studentId: Joi.string().custom(objectId),
  }),
  body: Joi.object().keys({
    name: Joi.string(),
    admNo: Joi.string(),
    imageUrl: Joi.string(),
  }),
};

const deleteStudent = {
  params: Joi.object().keys({
    classroomId: Joi.string(),
    studentId: Joi.string().custom(objectId),
  }),
};

const addAttendanceRecord = {
  params: Joi.object().keys({
    classroomId: Joi.string(),
  }),
  body: Joi.object().keys({
    day: Joi.date().required(),
    presentees: Joi.array().items(Joi.string().custom(objectId)),
  }),
};

const deleteAttendanceRecord = {
  params: Joi.object().keys({
    classroomId: Joi.string(),
    attendanceId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createClassroom,
  getClassroomById,
  updateClassroom,
  deleteClassroom,
  addStudent,
  updateStudent,
  deleteStudent,
  addAttendanceRecord,
  deleteAttendanceRecord,
};
