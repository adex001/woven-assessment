import { Request, Response } from "express";
import User from "../database/models/User";
import { signToken } from "../helpers/token";

class UserController {
  static async register(req: Request, res: Response): Promise<any> {
    const { username, email, password } = req.body;

    let user = await User.findOne({
      $or: [{ email }, { username }],
    });
    if (user) {
      return res.status(400).json({
        message: "Username or email exists! Try another",
      });
    }
    user = new User({ username, email, password });

    await user.save();
    return res.status(201).json({
      message: "User registered successfully",
      data: {
        id: user._id,
        username,
        email,
      },
    });
  }

  static async login(req: Request, res: Response): Promise<any> {
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
  }

  static async getProfile(req: Request, res: Response): Promise<any> {
    const { userId } = req.user;
    const user = await User.findById(userId).select(["-password", "-__v"]);
    if (!user)
      return res.status(404).json({
        message: "Profile not found",
      });
    return res.status(200).json({
      message: "User Profile Retrieved.",
      data: user,
    });
  }

  static async updateProfile(req: Request, res: Response): Promise<any> {
    const { userId } = req.user;
    const { username, email } = req.body;

    const user = await User.findById(userId).select(["-password", "-__v"]);

    if (!user)
      return res.status(404).json({
        message: "Profile not found",
      });

    if (username && (await User.findOne({ username }))) {
      return res.status(400).json({
        message: "Username exists. please try another",
      });
    }

    if (email && (await User.findOne({ email }))) {
      return res.status(400).json({
        message: "Email exists. please try another",
      });
    }

    return res.json({
      message: "Profile updated successfully.",
      data: user,
    });
  }

  static async uploadProfilePicture(
    req: Request,
    res: Response
  ): Promise<object> {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const { userId } = req.user;

    let user = await User.findById(userId).select(["-password", "-__v"]);

    if (!user)
      return res.status(404).json({
        message: "Profile not found",
      });

    user = await User.findByIdAndUpdate(
      userId,
      { profilePicture: req.file.filename },
      { new: true }
    ).select(["-password", "-__v"]);

    return res.status(200).json({
      message: "Profile picture uploaded successfully.",
      data: user,
    });
  }

  static async getProfilePicture(req: Request, res: Response) {
    const { userId } = req.user;
    const user = await User.findById(userId);
    if (!user?.profilePicture) {
      return res.status(404).json({ error: "Profile picture not found" });
    }
    return res.sendFile(user.profilePicture, { root: "uploads" });
  }
}

export default UserController;
