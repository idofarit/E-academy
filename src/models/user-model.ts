import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    clerkUserID: {
      type: String,
      required: true,
      unique: true,
    },
    profilePic: {
      type: String,
      required: false,
    },
    isAdmin: {
      type: Boolean,
      default: false,
      required: true,
    },
    isActive: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  { timestamps: true }
);

if (mongoose.models && mongoose.models["users"]) {
  delete mongoose.models["users"];
}

const UserModel = mongoose.model("users", userSchema);
export default UserModel;
