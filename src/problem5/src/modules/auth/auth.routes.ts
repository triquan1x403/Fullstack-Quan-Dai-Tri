import { Router } from 'express';
import passport from 'passport';

import { env } from '../../commons';
import AuthController from './auth.controller';
import { GoogleStrategy } from './strategies';

export const authRoutes = Router();

authRoutes.get('/sign-in/google', passport.authenticate(GoogleStrategy.name));
authRoutes.get(
  '/sign-in/google/redirect',
  passport.authenticate(GoogleStrategy.name, { failureRedirect: env.googleSignInUrl }),
  AuthController.signInWithGoogle,
);
