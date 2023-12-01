import mongoose from 'mongoose';

// modelo de datos para el administrador
const adminSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

/*
  {
    "username": "admin",
    "password": "123456"
  }
*/

export default mongoose.model('Admin', adminSchema);
