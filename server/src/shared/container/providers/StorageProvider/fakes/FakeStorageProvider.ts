import StorageProvider from '../models/StorageProvider';

class FakeStorageProvider implements StorageProvider {
  private files: string[] = [];

  public async saveFile(file: string) {
    await this.files.push(file);

    return file;
  }

  public async deleteFile(file: string) {
    const fileIndex = this.files.findIndex((fileName) => fileName === file);

    await this.files.splice(fileIndex, 1);
  }
}

export default FakeStorageProvider;
