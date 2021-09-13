var mongoose = require('mongoose');

var ApplicationSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project',
      required: true,
    },
    cover_letter: {
      type: String
    },
    application_status: {
      type: String,
      enum: ['pending', 'accepted', 'rejected'],
      default: 'pending'
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Application', ApplicationSchema);
