import mongoose from "mongoose";

//schema
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },

    email: {
      type: String,
      trim: true,
    },

    password: {
      type: String,
      trim: true,
    },

    role: {
      type: String,
      default: true,
    },

    photo: {
      type: String,
      default: null,
    },

    status: {
      type: Boolean,
      default: true,
    },

    trash: {
      type: Boolean,
      default: false,
    },
  },

  {
    timestamps: true,
  }
);

//export modal
export default mongoose.model("User", userSchema);
