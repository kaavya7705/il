import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const mentorSchema = new mongoose.Schema({
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
  phone: String,
  expertise: {
    type: String,
    required: [true, 'Expertise is required'],
  },
  experience: {
    type: Number,
    required: [true, 'Years of experience is required'],
  },
  company: {
    name: String,
    industry: String,
    size: String,
    website: String,
  },
  bio: String,
  availableHours: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true,
});

// Hash password before saving
mentorSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const Mentor = mongoose.models.Mentor || mongoose.model('Mentor', mentorSchema);
export default Mentor;