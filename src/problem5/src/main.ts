import 'express-error-handler';

import compression from 'compression';
import { log } from 'console';
import cors from 'cors';
import express from 'express';
import session from 'express-session';
import fs from 'fs';
import helmet from 'helmet';
import http from 'http';
import passport from 'passport';
import path from 'path';
import swagger from 'swagger-ui-express';
import yaml from 'yaml';

import { env } from './commons';
import { PrismaService } from './databases';
import { errorResponseMiddleware, successResponseMiddleware } from './middlewares';
import { appRoutes } from './modules';
import { GoogleStrategy } from './modules/auth/strategies';

async function main() {
  const application = express();
  application.use(express.urlencoded({ extended: false }));
  application.use(express.json());
  application.use(cors({ origin: '*' }));
  application.use(helmet({ xPoweredBy: false }));
  application.use(
    compression({ level: env.compressionLevel, threshold: env.compressionThreshold }),
  );
  application.use(session({ secret: env.appSession, resave: false, saveUninitialized: false }));

  application.use(passport.initialize());
  application.use(passport.session());
  passport.use(GoogleStrategy);

  application.use('/api', appRoutes);

  passport.serializeUser(
    (user: Express.User, done: (error: Error | null, user: Express.User) => void) => {
      return done(null, user);
    },
  );

  passport.deserializeUser(
    (user: Express.User, done: (error: Error | null, user: Express.User) => void) => {
      return done(null, user);
    },
  );

  const document = fs.readFileSync(path.resolve('./src/documents/swagger.document.yml'), 'utf-8');
  application.use('/api/document', swagger.serve, swagger.setup(yaml.parse(document)));

  application.use(successResponseMiddleware);
  application.use(errorResponseMiddleware);

  const server = http.createServer(application);
  server.listen(env.appPort, async () => {
    log(`Server is listening on http://localhost:${env.appPort}`);
    log(`Server document is listening on http://localhost${env.appPort}/api/document`);
    await PrismaService.connect();
  });
}

main();
