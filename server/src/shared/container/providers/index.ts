import { container } from 'tsyringe';

import DiskStorageProvider from './StorageProvider/implementations/DiskStorageProvider';
import StorageProvider from './StorageProvider/models/StorageProvider';
import EtherealMailProvider from './MailProvider/implementations/EtherealMailProvider';
import MailProvider from './MailProvider/models/MailProvider';

container.registerSingleton<StorageProvider>(
  'StorageProvider',
  DiskStorageProvider,
);

container.registerInstance<MailProvider>(
  'MailProvider',
  new EtherealMailProvider(),
);
