const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createImage = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    createdBy: Joi.forbidden(),
  }),
};

const getImages = {
  query: Joi.object().keys({
    creator: Joi.custom(objectId),
  }),
};

const deleteImage = {
  params: Joi.object().keys({
    imageId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createImage,
  getImages,
  deleteImage,
};
