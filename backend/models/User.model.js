const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema(
  {
    fullName: { type: String, required: true },
    userName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avatar: {
      type: String,
      default: "https://cdn-icons-png.freepik.com/256/3177/3177440.png",
    },
  },
  {
    timestamps: true,
  }
);
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre("save", async function (next) {
  if (!this.isModified) {
    next();
  }
  const salt = await bcrypt.genSalt(9);
  this.password = await bcrypt.hash(this.password, salt);
});
const User = mongoose.model("User", userSchema);
module.exports = User;
