import { container } from 'tsyringe';

import DiskStorageProvider from './StorageProvider/implementations/DiskStorageProvider';
import StorageProvider from './StorageProvider/models/StorageProvider';
import EtherealMailProvider from './MailProvider/implementations/EtherealMailProvider';
import MailProvider from './MailProvider/models/MailProvider';
import PugMailTemplateProvider from './MailTemplateProvider/implementations/PugMailTemplateProvider';
import MailTemplateProvider from './MailTemplateProvider/models/MailTemplateProvider';

container.registerSingleton<StorageProvider>(
  'StorageProvider',
  DiskStorageProvider,
);

container.registerSingleton<MailTemplateProvider>(
  'MailTemplateProvider',
  PugMailTemplateProvider,
);

container.registerInstance<MailProvider>(
  'MailProvider',
  container.resolve(EtherealMailProvider),
);
