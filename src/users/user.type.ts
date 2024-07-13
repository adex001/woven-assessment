import { Types } from "mongoose";

// Payload interface for the JWT
export interface UserPayload {
  userId: Types.ObjectId;
  username?: string;
}
