import { Router } from 'express';

import { authRoutes } from './auth/auth.routes';
import { demoRoutes } from './demo/demo.routes';
import { imageRoutes } from './images/image.routes';
import { resourcesRoutes } from './resources/resources.routes';

export const appRoutes = Router();

appRoutes.use('/auth', authRoutes);
appRoutes.use('/demo', demoRoutes);
appRoutes.use('/images', imageRoutes);
appRoutes.use('/resources', resourcesRoutes);
