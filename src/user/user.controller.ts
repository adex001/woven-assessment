import { Request, Response } from "express";
import User from "../database/models/User";
import { signToken } from "../helpers/token";

class UserController {
  static async register(req: Request, res: Response): Promise<any> {
    try {
      const { username, email, password } = req.body;

      let user = await User.findOne({
        $or: [{ email }, { username }],
      });
      if (user) {
        return res.status(400).json({
          message: 'Username or email exists! Try another'
        });
      }
      user = new User({ username, email, password });

      await user.save();
      return res.status(201).json({ message: "User registered successfully", data: {
        id: user._id,
        username,
        email
      } });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ error: "Server error occured. Please try later." });
    }
  }

  static async login(req: Request, res: Response): Promise<any> {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username });

      if (!user || !(await user.comparePassword(password))) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      const token = await signToken({
        userId: user._id,
      });
      return res.status(200).json({
        message: "Login successful",
        data: {
          id: user._id,
          username: user.username,
          email: user.email,
          token,
        },
      });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ error: "Server error occured. Please try later." });
    }
  }

  static async getProfile(req: Request, res: Response): Promise<any> {
    const { userId } = req.user;
    try {
      const user = await User.findById(userId).select(["-password", "-__v"]);
      return res.status(200).json({
        message: "Users Retrieved.",
        data: user,
      });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ error: "Server error occured. Please try later." });
    }
  }

  static async updateProfile(req: Request, res: Response): Promise<any> {
    const { userId } = req.user;
    try {
      const { username, email } = req.body;
      const user = await User.findByIdAndUpdate(
        userId,
        { username, email },
        { new: true, runValidators: true }
      ).select(["-password", "-__v"]);

      return res.json({
        message: 'Profile updated successfully.',
        data: user,
      });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ error: "Server error occured. Please try later." });
    }
  }

  static async uploadProfilePicture(req: Request, res: Response) {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }

      const { userId } = req.user;

      const user = await User.findByIdAndUpdate(
        userId,
        { profilePicture: req.file.filename },
        { new: true }
      ).select(["-password", "-__v"]);

      return res.status(200).json({
        message: "Profile picture uploaded successfully.",
        data: user,
      });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ error: "Server error occured. Please try later." });
    }
  }

  static async getProfilePicture(req: Request, res: Response) {
    try {
      const { userId } = req.user;
      const user = await User.findById(userId);
      if (!user?.profilePicture) {
        return res.status(404).json({ error: "Profile picture not found" });
      }
      return res.sendFile(user.profilePicture, { root: "uploads" });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ error: "Server error occured. Please try later." });
    }
  }
}

export default UserController;
