import { NextFunction, Request, Response } from 'express';
import createHttpError from 'http-errors';
import { StatusCodes } from 'http-status-codes';
import multer, { FileFilterCallback, memoryStorage } from 'multer';

import { regex } from '../commons';
import { UploadImageEvent } from '../modules/images/events';

export const multerValidateMiddleware = (
  fieldName: string,
  isMultiple: boolean = false,
  amount: number = 1,
) => {
  const multerConfig = multer({
    storage: memoryStorage(),
    limits: {
      fileSize: 10 * 1024 * 1024, // 10MB
    },
    preservePath: true,
    fileFilter: async (req: Request, file: Express.Multer.File, callback: FileFilterCallback) => {
      if (!regex.imageMimetype.test(file.mimetype)) {
        const field = `${fieldName.charAt(0).toUpperCase()}${fieldName.slice(1)}`;
        return callback(
          createHttpError(
            StatusCodes.BAD_REQUEST,
            `${field} must be valid format like jpeg, jpg, png, gif, webp, ...`,
          ),
        );
      }
      return callback(null, true);
    },
  });

  return isMultiple ? multerConfig.array(fieldName, amount) : multerConfig.single(fieldName);
};

export const singleImageHandlerMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const file = req.file;

    if (!file) {
      return next(createHttpError(StatusCodes.BAD_REQUEST, 'File does not exist'));
    }

    const base64Image = file.buffer.toString('base64');
    const uploadedImage = '';
    UploadImageEvent.emit('uploadSingle', { id: uploadedImage, file: base64Image });
    /*
     * Create Image Entity (TypeORM, Prisma, Drizzle, ...)
     * Put Image Entity Id To Event Emitter
     * Upload Image To Cloud
     * Update URL Of Passed Image Entity With URL Which Get From Cloud
     * Pass Image Id To Request
     * .......
     */
    req.body[`${file.fieldname}`] = uploadedImage;

    return next();
  } catch (error) {
    return next(error);
  }
};

export const multipleImageHandlerMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const files = req.files as Express.Multer.File[];

    if (files && files.length < 0) {
      return next(createHttpError(StatusCodes.BAD_REQUEST, 'Files does not exist'));
    }

    let fieldName = '';
    const uploadedImages: string[] = [];
    await Promise.all(
      files.map((file) => {
        fieldName = file.fieldname;
        const base64Image = file.buffer.toString('base64');
        const uploadedImage = '';
        UploadImageEvent.emit('uploadSingle', { id: uploadedImage, file: base64Image });

        uploadedImages.push(uploadedImage);
      }),
    );

    req.body[`${fieldName}`] = uploadedImages;
    return next();
  } catch (error) {
    return next(error);
  }
};
