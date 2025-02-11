import { NextFunction, Request, Response } from 'express';

class AuthController {
  async signInWithGoogle(req: Request, res: Response, next: NextFunction) {
    const auth = req.user;
    return next(auth);
  }
}

export default new AuthController();
