const { default: mongoose } = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    length: { min: 4, max: 24 },
  },
  email: { type: String, unique: true, trim: true, required: true },
  phone: { type: String, trim: true, length: { min: 11, max: 11 } },
  firstName: { type: String, trim: true, length: { min: 2, max: 24 } },
  lastName: { type: String, trim: true, length: { min: 2, max: 24 } },
  age: { type: Number, length: { min: 1, max: 101 } },
  password: { type: String, required: true, trim: true },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const UserModel = mongoose.model("user", UserSchema);

module.exports = {
  UserModel,
};
