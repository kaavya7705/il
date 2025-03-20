import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  firstName: String,
  lastName: String,
  age: {
    type: Number,
    min: 18,
    max: 100,
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other']
  },
  phone: String,
  company: {
    name: String,
    industry: String,
    size: String,
    website: String,
  },
  description: String,
  number_of_pupils: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true,
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const User = mongoose.models.User || mongoose.model('User', userSchema);
export default User;