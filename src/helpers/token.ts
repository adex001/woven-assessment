import JWT, { VerifyErrors } from "jsonwebtoken";
import config from "../config";
import { UserPayload } from "../user/user.type";

export const signToken = (payload: UserPayload): Promise<string> => {
  return new Promise((resolve, reject) => {
    JWT.sign(
      { ...payload },
      config.JWT_SECRET,
      {
        expiresIn: config.expiresIn,
      },
      (err, token) => {
        if (err) {
          reject(err);
        } else {
          resolve(token as string);
        }
      }
    );
  });
};

export const verifyToken = (token: string): Promise<UserPayload> => {
return new Promise((resolve, reject) => {
  JWT.verify(
    token,
    config.JWT_SECRET,
    (err, decoded) => {
      if (err) {
        reject(err);
      } else {
        resolve(decoded as UserPayload);
      }
    }
  );
});
};
