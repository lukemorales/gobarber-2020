import fs from 'fs';
import path from 'path';

import uploadConfig from '@config/upload-config';

import StorageProvider from '../models/StorageProvider';

class DiskStorageProvider implements StorageProvider {
  public async saveFile(file: string) {
    await fs.promises.rename(
      path.resolve(uploadConfig.tmpFolder, file),
      path.resolve(uploadConfig.uploadsFolder, file),
    );

    return file;
  }

  public async deleteFile(file: string) {
    const filePath = path.resolve(uploadConfig.uploadsFolder, file);

    try {
      await fs.promises.stat(filePath);
    } catch {
      return;
    }

    await fs.promises.unlink(filePath);
  }
}

export default DiskStorageProvider;
