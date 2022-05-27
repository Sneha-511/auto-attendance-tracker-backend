const httpStatus = require('http-status');
const { Image } = require('../models');
const ApiError = require('../utils/ApiError');
const config = require('../config/config');

const { cloudinary } = config;

/**
 * Create an image
 * @param {Object} imageBody
 * @returns {Promise<Image>}
 */
const createImage = async (req) => {
  const imageBody = { title: req.body.title, imageUrl: req.file.path, createdBy: req.user.id, publicId: req.publicId };
  return Image.create(imageBody);
};

/**
 * Get all images (optionally by a creator)
 * @returns {Promise<QueryResult>}
 */
const getAllImages = async (creatorId) => {
  const query = {};
  if (creatorId) {
    Object.assign(query, { createdBy: creatorId });
  }
  const images = await Image.find(query);
  return images;
};

/**
 * Get image by id
 * @param {ObjectId} id
 * @returns {Promise<Image>}
 */
const getImageById = async (id) => {
  return Image.findById(id);
};

/**
 * Delete image by imageId
 * @param {ObjectId} imageId
 * @returns {Promise<Image>}
 */
const deleteImageById = async (imageId, user) => {
  const image = await getImageById(imageId);
  if (!image) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Image not found');
  }

  if (user.role !== 'admin' && user.id !== image.createdBy.toString()) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Forbidden');
  }

  return cloudinary.uploader.destroy(`auto-attendance-tracker/${image.publicId}`, async (err) => {
    if (err) throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, err.message);
    await image.remove();
    return image;
  });
};

module.exports = {
  createImage,
  getAllImages,
  getImageById,
  deleteImageById,
};
