import { container } from 'tsyringe';

import DiskStorageProvider from './StorageProvider/implementations/DiskStorageProvider';
import StorageProvider from './StorageProvider/models/StorageProvider';

container.register<StorageProvider>('StorageProvider', DiskStorageProvider);
