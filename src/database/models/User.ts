import mongoose, { Document, Model, Types } from "mongoose";
import bcrypt from 'bcryptjs';


interface IUser extends Document {
  _id: Types.ObjectId,
  username: string;
  email: string;
  password: string;
  profilePicture?: string;
  comparePassword(password: string): Promise<boolean>;
}


const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profilePicture: { type: String },
});

// Save password hash
userSchema.pre<IUser>("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 8);
  }
  next();
});

userSchema.methods.comparePassword = function (
  password: string
): Promise<boolean> {
  return bcrypt.compare(password, this.password);
};

const User: Model<IUser> = mongoose.model<IUser>("User", userSchema);

export default User;
