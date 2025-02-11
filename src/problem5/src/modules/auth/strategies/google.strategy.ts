import { Request } from 'express';
import createHttpError from 'http-errors';
import { Profile } from 'passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';

import { env } from '../../../commons';
// import { GoogleSignInType } from '../types/google-sign-in.type';

export const GoogleStrategy = new Strategy(
  {
    clientID: env.googleClientId,
    clientSecret: env.googleClientSecret,
    callbackURL: env.googleCallbackUrl,
    scope: ['profile', 'email'],
    passReqToCallback: true,
  },
  async (
    req: Request,
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: VerifyCallback,
  ) => {
    try {
      const email = profile.emails?.[0]?.value;

      if (!email) {
        return done(createHttpError('Google email does not exist!'));
      }

      const params = {
        email,
        firstName: profile.name?.givenName || '',
        lastName: profile.name?.familyName || '',
      };

      const token = params;
      //   const token = (await authService.signInWithGoogle(params)) as SuccessPayloadType<SignInType>;

      return done(null, token);
    } catch (error) {
      return done(error as Error);
    }
  },
);
