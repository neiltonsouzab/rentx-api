import { container } from 'tsyringe';

import { IMailProvider } from './MailProvider/IMailProvider';
import { EtheralMailProvider } from './MailProvider/implementations/EtherealMailProvider';
import { LocalStorageProvider } from './StorageProvider/implementations/LocalStorageProvider';
import { S3StorageProvider } from './StorageProvider/implementations/S3StorageProvider';
import { IStorageProvider } from './StorageProvider/IStorageProvider';

container.registerInstance<IMailProvider>(
  'MailProvider',
  new EtheralMailProvider(),
);

const storageProvider = {
  local: LocalStorageProvider,
  s3: S3StorageProvider,
};

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  storageProvider[process.env.STORAGE_DRIVER],
);
