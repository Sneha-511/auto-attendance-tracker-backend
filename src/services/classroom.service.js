const httpStatus = require('http-status');
const mongoose = require('mongoose');
const { Classroom } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create an classroom
 * @param {Object} classroomBody
 * @returns {Promise<Classroom>}
 */
const createClassroom = async (body, user) => {
  const { name, startYear, endYear, students, imageUrl } = body;
  const classroomBody = {
    ...(students && { students }),
    ...(imageUrl && { imageUrl }),
    name,
    startYear,
    endYear,
    createdBy: user.id,
  };
  return Classroom.create(classroomBody);
};

/**
 * Get all classrooms
 * @returns {Promise<QueryResult>}
 */
const getAllClassrooms = async (user) => {
  const classrooms = await Classroom.find(
    { createdBy: user.id },
    { _id: 1, name: 1, startYear: 1, endYear: 1, imageUrl: 1 }
  ).sort({ endYear: 'desc' });
  return classrooms;
};

/**
 * Get classroom by id
 * @param {ObjectId} id
 * @returns {Promise<Classroom>}
 */
const getClassroomById = async (id) => {
  return Classroom.findById(id);
};

/**
 * Update classroom by id
 * @param {ObjectId} classroomId
 * @param {Object} updateBody
 * @returns {Promise<Classroom>}
 */
const updateClassroomById = async (classroomId, updateBody, user) => {
  const classroom = await getClassroomById(classroomId);
  if (!classroom) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Classroom not found');
  }
  if (user.role !== 'admin' && classroom.createdBy.toString() !== user.id) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Forbidden');
  }
  Object.assign(classroom, { ...updateBody });
  await classroom.save();
  return classroom;
};

/**
 * Delete classroom by classroomId
 * @param {ObjectId} classroomId
 * @returns {Promise<Classroom>}
 */
const deleteClassroomById = async (classroomId, user) => {
  const classroom = await getClassroomById(classroomId);
  if (!classroom) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Classroom not found');
  }
  if (user.role !== 'admin' && classroom.createdBy.toString() !== user.id) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Forbidden');
  }
  await classroom.remove();
  return classroom;
};

/**
 * Add a student in classroom
 * @param {ObjectId} classroomId
 * @param {Object} body
 * @param {Object} user
 * @returns {Promise<Classroom>}
 */
const addStudent = async (classroomId, body, user) => {
  const classroom = await getClassroomById(classroomId);
  if (!classroom) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Classroom not found');
  }
  if (user.role !== 'admin' && classroom.createdBy.toString() !== user.id) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Forbidden');
  }
  const studentId = new mongoose.Types.ObjectId();
  await Classroom.updateOne({ _id: classroomId }, { $push: { students: { ...body, _id: studentId } } });
  const data = { ...body, id: studentId };
  return data;
};

/**
 * Update details of an student in classroom
 * @param {ObjectId} classroomId
 * @param {ObjectId} studentId
 * @param {Object} body
 * @param {Object} user
 * @returns {Promise<Classroom>}
 */
const updateStudent = async (classroomId, studentId, body, user) => {
  const classroom = await getClassroomById(classroomId);
  if (!classroom) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Classroom not found');
  }
  if (user.role !== 'admin' && classroom.createdBy.toString() !== user.id) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Forbidden');
  }
  const { name, admNo, imageUrl } = body;
  return Classroom.updateOne(
    { _id: classroomId, 'students._id': studentId },
    {
      $set: {
        ...(name && { 'students.$.name': name }),
        ...(admNo && { 'students.$.admNo': admNo }),
        ...(imageUrl && { 'students.$.imageUrl': imageUrl }),
      },
    }
  );
};

/**
 * Delete an student in classroom
 * @param {ObjectId} classroomId
 * @param {ObjectId} studentId
 * @param {Object} user
 * @returns {Promise<Classroom>}
 */
const deleteStudent = async (classroomId, studentId, user) => {
  const classroom = await getClassroomById(classroomId);
  if (!classroom) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Classroom not found');
  }
  if (user.role !== 'admin' && classroom.createdBy.toString() !== user.id) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Forbidden');
  }
  return Classroom.updateOne(
    { _id: classroomId },
    {
      $pull: {
        students: { _id: studentId },
      },
    }
  );
};

/**
 * Add an attendance record in classroom
 * @param {ObjectId} classroomId
 * @param {Object} body
 * @param {Object} user
 * @returns {Promise<Classroom>}
 */
const addAttendanceRecord = async (classroomId, body, user) => {
  const classroom = await getClassroomById(classroomId);
  if (!classroom) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Classroom not found');
  }
  if (user.role !== 'admin' && classroom.createdBy.toString() !== user.id) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Forbidden');
  }
  const attendanceId = new mongoose.Types.ObjectId();
  await Classroom.updateOne({ _id: classroomId }, { $push: { attendanceRecords: { ...body, _id: attendanceId } } });
  const data = { ...body, id: attendanceId };
  return data;
};

/**
 * Delete an attendance record in classroom
 * @param {ObjectId} classroomId
 * @param {ObjectId} studentId
 * @param {Object} user
 * @returns {Promise<Classroom>}
 */
const deleteAttendanceRecord = async (classroomId, attendanceId, user) => {
  const classroom = await getClassroomById(classroomId);
  if (!classroom) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Classroom not found');
  }
  if (user.role !== 'admin' && classroom.createdBy.toString() !== user.id) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Forbidden');
  }
  return Classroom.updateOne(
    { _id: classroomId },
    {
      $pull: {
        attendanceRecords: { _id: attendanceId },
      },
    }
  );
};

module.exports = {
  createClassroom,
  getAllClassrooms,
  getClassroomById,
  updateClassroomById,
  deleteClassroomById,
  addStudent,
  updateStudent,
  deleteStudent,
  addAttendanceRecord,
  deleteAttendanceRecord,
};
