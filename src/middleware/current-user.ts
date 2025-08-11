import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";

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
    const payload = jwt.verify(req.session.jwt, process.env.JWT_KEY!);
    if (payload) {
      req.currentUser = payload as UserPayLoad;
    }
  } catch (err) {
    console.log(err);
  }

  next();
};
