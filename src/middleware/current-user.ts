import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface UserPayLoad {
  email: string;
  id: string;
}

declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayLoad;
    }
  }
}

export const currentUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.session?.jwt) {
    return next();
  }

  try {
    console.log(req.session.jwt);
    console.log(process.env.JWT_KEY);
    const payload = jwt.verify(
      req.session.jwt,
      process.env.JWT_KEY!
    ) as UserPayLoad;
    console.log(payload);
    req.currentUser = payload;
  } catch (err) {
    console.log(err);
  }

  next();
};
