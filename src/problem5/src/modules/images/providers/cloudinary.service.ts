import { v2 as Cloudinary } from 'cloudinary';

import { env, HashEnum } from '../../../commons';
import { hashHandler } from '../../../utilities';

class CloudinaryService {
  constructor() {
    Cloudinary.config({
      cloud_name: env.cloudinaryCloudName,
      api_key: env.cloudinaryApiKey,
      api_secret: env.cloudinaryApiSecret,
    });
  }

  async uploadSingleImage(file: string): Promise<string> {
    try {
      const base64File = `data:image/png;base64,${file}`;
      const uploadedImage = await Cloudinary.uploader.upload(base64File, {
        folder: env.appName,
        format: 'jpg',
        transformation: {
          width: 350, // 350px
          crop: 'scale',
          quality: 35, // 35%
          fetch_format: 'webp',
        },
        resource_type: 'image',
      });

      const encodedImage = await hashHandler.encrypt(
        `${uploadedImage.public_id}.${uploadedImage.format}`,
        HashEnum.PLAINS,
      );
      const encodedURL = `${env.appUrl}/api/images/${encodedImage}`;
      return encodedURL;
    } catch (error) {
      throw error;
    }
  }

  async uploadMultipleImage(files: string[]): Promise<string[]> {
    try {
      const encodedImageURLs = await Promise.all(
        files.map(async (file) => await this.uploadSingleImage(file)),
      );
      return encodedImageURLs;
    } catch (error) {
      throw error;
    }
  }

  async getCloudinaryImage(encodedImage: string): Promise<string> {
    try {
      const decodedImage = await hashHandler.decrypt(encodedImage);
      const plainsImageURL = `${env.cloudinaryUploadedUrl}/${decodedImage}`;
      return plainsImageURL;
    } catch (error) {
      throw error;
    }
  }

  async removeSingleImage(url: string): Promise<void> {
    try {
      if (!url) {
        throw new Error('Image URL does not exist!');
      }

      const splittedURL = url.split('/');
      const encodedImage = splittedURL[splittedURL.length - 1] as string;
      const decodedImage = await hashHandler.decrypt(encodedImage);

      if (!decodedImage) {
        throw new Error('Encoded image does not exist!');
      }

      const publicId = decodedImage.split('.')[0] as string;

      await Cloudinary.uploader.destroy(publicId, {
        resource_type: 'image',
      });
    } catch (error) {
      throw error;
    }
  }

  async removeMultipleImage(urls: string[]): Promise<void> {
    try {
      Promise.all(urls.map(async (url) => await this.removeSingleImage(url)));
    } catch (error) {
      throw error;
    }
  }
}

export default new CloudinaryService();
