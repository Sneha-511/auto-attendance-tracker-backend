const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const ApiError = require('../utils/ApiError');
const { classroomService } = require('../services');

const createClassroom = catchAsync(async (req, res) => {
  const classroom = await classroomService.createClassroom(req.body, req.user);
  res.status(httpStatus.CREATED).send(classroom);
});

const getAllClassrooms = catchAsync(async (req, res) => {
  const result = await classroomService.getAllClassrooms(req.user);
  res.send(result);
});

const getClassroomById = catchAsync(async (req, res) => {
  const result = await classroomService.getClassroomById(req.params.classroomId);
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Classroom not found');
  }
  res.send(result);
});

const updateClassroom = catchAsync(async (req, res) => {
  const classroom = await classroomService.updateClassroomById(req.params.classroomId, req.body, req.user);
  res.send(classroom);
});

const deleteClassroom = catchAsync(async (req, res) => {
  await classroomService.deleteClassroomById(req.params.classroomId, req.user);
  res.status(httpStatus.NO_CONTENT).send();
});

const addStudent = catchAsync(async (req, res) => {
  const data = await classroomService.addStudent(req.params.classroomId, req.body, req.user);
  res.status(httpStatus.CREATED).send(data);
});

const updateStudent = catchAsync(async (req, res) => {
  await classroomService.updateStudent(req.params.classroomId, req.params.studentId, req.body, req.user);
  res.status(httpStatus.NO_CONTENT).send();
});

const deleteStudent = catchAsync(async (req, res) => {
  await classroomService.deleteStudent(req.params.classroomId, req.params.studentId, req.user);
  res.status(httpStatus.NO_CONTENT).send();
});

const addAttendanceRecord = catchAsync(async (req, res) => {
  const data = await classroomService.addAttendanceRecord(req.params.classroomId, req.body, req.user);
  res.status(httpStatus.CREATED).send(data);
});

const deleteAttendanceRecord = catchAsync(async (req, res) => {
  await classroomService.deleteAttendanceRecord(req.params.classroomId, req.params.attendanceId, req.user);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createClassroom,
  getAllClassrooms,
  getClassroomById,
  updateClassroom,
  deleteClassroom,
  addStudent,
  updateStudent,
  deleteStudent,
  addAttendanceRecord,
  deleteAttendanceRecord,
};
