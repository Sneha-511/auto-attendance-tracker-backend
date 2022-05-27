const mongoose = require('mongoose');
const { toJSON } = require('./plugins');

const imageSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    publicId: {
      type: String,
      required: true,
    },
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
imageSchema.plugin(toJSON);

/**
 * @typedef Image
 */
const Image = mongoose.model('Image', imageSchema);

module.exports = Image;
