const express = require('express');
const validate = require('../../middlewares/validate');
const classroomValidation = require('../../validations/classroom.validation');
const classroomController = require('../../controllers/classroom.controller');
const auth = require('../../middlewares/auth');

const router = express.Router();

router
  .route('/')
  .post(auth(), validate(classroomValidation.createClassroom), classroomController.createClassroom)
  .get(auth(), classroomController.getAllClassrooms);

router
  .route('/:classroomId')
  .get(validate(classroomValidation.getClassroomById), classroomController.getClassroomById)
  .patch(auth(), validate(classroomValidation.updateClassroom), classroomController.updateClassroom)
  .delete(auth(), validate(classroomValidation.deleteClassroom), classroomController.deleteClassroom);

router
  .route('/:classroomId/students')
  .post(auth(), validate(classroomValidation.addStudent), classroomController.addStudent);

router
  .route('/:classroomId/students/:studentId')
  .patch(auth(), validate(classroomValidation.updateStudent), classroomController.updateStudent)
  .delete(auth(), validate(classroomValidation.deleteStudent), classroomController.deleteStudent);

router
  .route('/:classroomId/attendance')
  .post(auth(), validate(classroomValidation.addAttendanceRecord), classroomController.addAttendanceRecord);

router
  .route('/:classroomId/attendance/:attendanceId')
  .delete(auth(), validate(classroomValidation.deleteAttendanceRecord), classroomController.deleteAttendanceRecord);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Classrooms
 *   description: Classroom management and retrieval
 */

/**
 * @swagger
 * /classrooms:
 *   post:
 *     summary: Create a classroom
 *     tags: [Classrooms]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - startYear
 *               - endYear
 *             properties:
 *               name:
 *                 type: string
 *               imageUrl:
 *                 type: string
 *               startYear:
 *                 type: number
 *               endYear:
 *                 type: number
 *               students:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/Student'
 *             example:
 *               name: Computer Science
 *               startYear: 2021
 *               endYear: 2022
 *
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Classroom'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *
 *   get:
 *     summary: Get all classrooms
 *     tags: [Classrooms]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Classroom'
 */

/**
 * @swagger
 * /classrooms/{classroomId}:
 *   get:
 *     summary: Get details of a classroom by classroomId
 *     tags: [Classrooms]
 *     parameters:
 *       - in: path
 *         name: classroomId
 *         required: true
 *         schema:
 *           type: string
 *         description: Classroom id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Classroom'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   patch:
 *     summary: Update a classroom
 *     description: Only the creator of classroom can update any classroom.
 *     tags: [Classrooms]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: classroomId
 *         required: true
 *         schema:
 *           type: string
 *         description: Classroom id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               imageUrl:
 *                 type: string
 *               startYear:
 *                 type: number
 *               endYear:
 *                 type: number
 *               students:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/Student'
 *             example:
 *               name: Mathematics
 *               startYear: 2022
 *               endYear: 2023
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Classroom'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   delete:
 *     summary: Delete a classroom
 *     description: Only the creator of classroom can delete that classroom.
 *     tags: [Classrooms]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: classroomId
 *         required: true
 *         schema:
 *           type: string
 *         description: Classroom id
 *     responses:
 *       "204":
 *         description: No content
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */

/**
 * @swagger
 * /classrooms/{classroomId}/students:
 *   post:
 *     summary: Add an student
 *     description: Only the creator of classroom can add students to it.
 *     tags: [Classrooms]
 *     parameters:
 *       - in: path
 *         name: classroomId
 *         required: true
 *         schema:
 *           type: string
 *         description: Classroom id
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - admNo
 *             properties:
 *               name:
 *                 type: string
 *               admNo:
 *                 type: string
 *               imageUrl:
 *                 type: string
 *             example:
 *               name: Sample Name
 *               admNo: 19293
 *               imageUrl: https://via.placeholder.com/150
 *
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Student'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *
 */

/**
 * @swagger
 * /classrooms/{classroomId}/students/{studentId}:
 *   patch:
 *     summary: Update an student of a classroom
 *     tags: [Classrooms]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: classroomId
 *         required: true
 *         schema:
 *           type: string
 *         description: Classroom id
 *       - in: path
 *         name: studentId
 *         required: true
 *         schema:
 *           type: string
 *         description: _id of student
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               admNo:
 *                 type: string
 *               imageUrl:
 *                 type: string
 *             example:
 *               name: Sample Name
 *               admNo: 13233
 *               imageUrl: https://via.placeholder.com/150
 *     responses:
 *       "204":
 *         description: No content
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   delete:
 *     summary: Delete an student
 *     description: Only the creator of classroom can delete any of its students.
 *     tags: [Classrooms]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: classroomId
 *         required: true
 *         schema:
 *           type: string
 *         description: Classroom id
 *       - in: path
 *         name: studentId
 *         required: true
 *         schema:
 *           type: string
 *         description: _id of student
 *     responses:
 *       "204":
 *         description: No content
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */

/**
 * @swagger
 * /classrooms/{classroomId}/attendance:
 *   post:
 *     summary: Add an attendance record
 *     description: Only the creator of classroom can add attendance record to it.
 *     tags: [Classrooms]
 *     parameters:
 *       - in: path
 *         name: classroomId
 *         required: true
 *         schema:
 *           type: string
 *         description: Classroom id
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - day
 *               - presentees
 *             properties:
 *               day:
 *                 type: string
 *                 format: date-time
 *               presentees:
 *                 type: array
 *                 items:
 *                   type: string
 *             example:
 *               day: 2022-05-20T16:23:56.057Z
 *               presentees: []
 *
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Attendance'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *
 */

/**
 * @swagger
 * /classrooms/{classroomId}/attendance/{attendanceId}:
 *   delete:
 *     summary: Delete an attendance record
 *     description: Only the creator of classroom can delete any of its attendance records.
 *     tags: [Classrooms]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: classroomId
 *         required: true
 *         schema:
 *           type: string
 *         description: Classroom id
 *       - in: path
 *         name: attendanceId
 *         required: true
 *         schema:
 *           type: string
 *         description: _id of attendance record
 *     responses:
 *       "204":
 *         description: No content
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */
