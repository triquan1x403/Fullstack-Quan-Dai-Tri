import CloudinaryService from './cloudinary.service';

class ImageService {
  async getImage(encoded: string): Promise<string> {
    return await CloudinaryService.getCloudinaryImage(encoded);
  }
}

export default new ImageService();
