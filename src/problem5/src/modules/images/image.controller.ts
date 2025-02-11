import { NextFunction, Request, Response } from 'express';
import { IncomingMessage } from 'http';
import createHttpError from 'http-errors';
import { StatusCodes } from 'http-status-codes';
import https from 'https';

import { createHttpItem } from '../../utilities';
import { ImageService } from './providers';
import { GetImageType } from './types';

class ImageController {
  async getImage(req: Request<GetImageType>, res: Response, next: NextFunction) {
    try {
      const { encodedImage } = req.params;

      const URL = await ImageService.getImage(encodedImage);
      https
        .get(URL, (incomingMessage: IncomingMessage) => {
          const contentType = incomingMessage.headers['content-type'];

          res.setHeader('Content-Type', contentType ?? 'image/webp');

          incomingMessage.pipe(res);
        })
        .on('error', (error) => {
          next(createHttpError(StatusCodes.BAD_REQUEST, error.message));
        });
    } catch (error) {
      return next(error);
    }
  }

  async uploadSingleImage(req: Request, res: Response, next: NextFunction) {
    return next(createHttpItem(null));
  }
}

export default new ImageController();
