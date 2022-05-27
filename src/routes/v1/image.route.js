const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const { uploadImage } = require('../../middlewares/uploadImage');
const imageValidation = require('../../validations/image.validation');
const imageController = require('../../controllers/image.controller');

const router = express.Router();

router
  .route('/')
  .post(auth(), uploadImage.single('image'), validate(imageValidation.createImage), imageController.createImage)
  .get(auth(), validate(imageValidation.getImages), imageController.getImages);

router.route('/:imageId').delete(auth(), validate(imageValidation.deleteImage), imageController.deleteImage);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Images
 *   description: Images management and retrieval
 */

/**
 * @swagger
 * /images:
 *   post:
 *     summary: Upload an image
 *     tags: [Images]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *             properties:
 *               title:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *             example:
 *               title: a sample image
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Image'
 *       "400":
 *         $ref: '#/components/responses/InvalidImageFormat'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *
 *   get:
 *     summary: Get all images
 *     tags: [Images]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: creator
 *         schema:
 *           type: string
 *         description: User id of creator
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Image'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 * /images/{imageId}:
 *   delete:
 *     summary: Delete a image
 *     tags: [Images]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: imageId
 *         required: true
 *         schema:
 *           type: string
 *         description: Image id
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
