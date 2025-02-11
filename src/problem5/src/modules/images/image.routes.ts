import { Router } from 'express';

import { multerValidateMiddleware, singleImageHandlerMiddleware } from '../../middlewares';
import ImageController from './image.controller';

export const imageRoutes = Router();

imageRoutes.post(
  '/upload-single',
  multerValidateMiddleware('image'),
  singleImageHandlerMiddleware,
  ImageController.uploadSingleImage,
);

imageRoutes.get('/:encodedImage', ImageController.getImage);
