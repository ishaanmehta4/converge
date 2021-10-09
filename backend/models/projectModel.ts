var mongoose = require('mongoose');
var AddressSchema = require('./addressSchema')

var ProjectSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    address: {
      type: AddressSchema,
    },
    tags: {
      type: [String],
      default: [],
      trim: true,
    },
    skills_required: {
      type: [String],
      trim: true,
    },
    project_status: {
      type: String,
      enum: ['open', 'closed'],
      default: 'open'
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Project', ProjectSchema);
