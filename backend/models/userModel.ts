var mongoose = require('mongoose');
var UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    firebase_uid: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    display_name: {
      type: String,
      required: true,
      trim: true,
    },
    display_picture: {
      type: String,
      trim: true,
    },
    phone_number: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
    },
    skills: {
      type: [String],
      default: [],
    },
    fcm_device_tokens: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

// Static function to check the availability of the given username
UserSchema.statics.isUsernameAvailable = async function (username: String) {
  try {
    let tempUser = await this.findOne({ username });
    if (!tempUser) return true;
    else return false;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// Static function get mongoose ObjectID from Firebase UID
UserSchema.statics.getObjectIdFromUid = async function (firebase_uid: String) {
  try {
    let tempUser = await this.findOne({ firebase_uid });
    if (!tempUser) return { status: 'error', error: 'Invalid UID.' };
    return { status: 'success', objectId: tempUser._id };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = mongoose.model('User', UserSchema);
