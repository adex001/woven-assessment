import { Schema } from "joi";
import { Request, Response, NextFunction } from "express";

const schemaValidator =
  (schema: Schema) => (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body, { abortEarly: true });
    if (error) {
      return res.status(422).json({
        error: error.message,
      });
    }
    return next();
  };

export default schemaValidator;
