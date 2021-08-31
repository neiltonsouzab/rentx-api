import { container } from 'tsyringe';

import { IMailProvider } from './MailProvider/IMailProvider';
import { EtheralMailProvider } from './MailProvider/implementations/EtherealMailProvider';

container.registerInstance<IMailProvider>(
  'MailProvider',
  new EtheralMailProvider(),
);
