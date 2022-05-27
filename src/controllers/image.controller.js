const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const ApiError = require('../utils/ApiError');
const { imageService } = require('../services');

const createImage = catchAsync(async (req, res) => {
  if (req.errorMessage) {
    throw new ApiError(httpStatus.BAD_REQUEST, req.errorMessage);
  }
  const image = await imageService.createImage(req);
  res.status(httpStatus.CREATED).send(image);
});

const getImages = catchAsync(async (req, res) => {
  const creatorId = req.query.creator;
  const result = await imageService.getAllImages(creatorId);
  res.send(result);
});

const deleteImage = catchAsync(async (req, res) => {
  await imageService.deleteImageById(req.params.imageId, req.user);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createImage,
  getImages,
  deleteImage,
};
