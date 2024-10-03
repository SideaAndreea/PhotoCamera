import mongoose from "mongoose";

//for create table into database
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    verified: { type: Boolean },
  },
  {
    //for date
    timestaps: true,
  }
);

const User = mongoose.model("User", userSchema);
export default User;
