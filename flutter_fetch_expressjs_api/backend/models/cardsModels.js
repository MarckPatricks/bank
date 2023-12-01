import mongoose from 'mongoose';

// modelo de datos para las tarjetas
const cardSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    cvv: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function (value) {
          return /^\d{3}$/.test(value);
        },
        message: 'CVV must have exactly 3 digits'
      }
    },
    expiry: {
      type: Date,
      required: true
    },
    number: {
      type: String,
      unique: true,
      required: true,
      validate: {
        validator: function (value) {
          return /^\d{4}-\d{4}-\d{4}-\d{4}$/.test(value);
        },
        message: 'Number must have the format 1111-2222-3333-4444'
      }
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

/*
  {
    "name": "Ejemplo",
    "cvv": "321",
    "expiry": "2023-12-31",
    "number": "4444-3333-2222-1111"
  }
*/

export default mongoose.model('Card', cardSchema);
