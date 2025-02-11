import EventEmitter from 'events';

import { CloudinaryService } from '../providers';
import { UploadSingleImageType } from '../types';

class UploadImageEvent extends EventEmitter {
  constructor() {
    super();
    this.on('uploadSingle', this.uploadImage);
  }

  private async uploadImage(params: UploadSingleImageType) {
    try {
      const URL = await CloudinaryService.uploadSingleImage(params.file);

      /*
       * Update Image With Above URL
       * ...
       */

      console.log('URL:', URL);
    } catch (error) {
      throw error;
    }
  }
}

export default new UploadImageEvent();
