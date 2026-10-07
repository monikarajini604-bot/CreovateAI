import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  role: {
    type: String,
    enum: ['creator', 'brand', 'admin'],
    default: 'creator',
    required: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    index: true
  },
  password: {
    type: String,
    required: true
  },
  mobile: {
    type: String,
    default: '',
    trim: true
  },
  contact_person: {
    type: String,
    default: '',
    trim: true
  },
  businessName: {
    type: String,
    default: '',
    trim: true
  },
  verificationStatus: {
    type: String,
    default: 'Verified'
  },
  email_verified: {
    type: Boolean,
    default: true
  },
  mobile_verified: {
    type: Boolean,
    default: true
  },
  avatar_url: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

// Helper to remove password from returned user object
UserSchema.methods.toSafeObject = function() {
  const obj = this.toObject();
  delete obj.password;
  delete obj.__v;
  return obj;
};

const User = mongoose.models.User || mongoose.model('User', UserSchema);

export default User;
