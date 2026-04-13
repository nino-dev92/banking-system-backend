import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

//const ACCESS_TOKEN = process.env.ACCESS_TOKEN_SECRET as string;

export const protect = (req: Request, res: Response, next: NextFunction) => {
  const header = req.headers.authorization;

  if (!header || !header.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const token = header.split(" ")[1];

  // jwt.verify(
  //   token!,
  //   process.env.ACCESS_TOKEN_SECRET as string,
  //   (err: any, user) => {
  //     if (err) return res.status(401).json({ error: "Invalid Token" });
  //     (req as any).user = user;
  //     next();
  //   },
  // );

  try {
    // Get userId from token
    const decoded = jwt.verify(
      token as string,
      process.env.ACCESS_TOKEN_SECRET as string,
    );
    (req as any).user = decoded;

    next();
  } catch {
    return res.status(401).json({ error: "Invalid token" });
  }
};
