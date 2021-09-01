import { IMailProvider, SendMailData } from '../IMailProvider';

class FakeMailProvider implements IMailProvider {
  private messages: SendMailData[] = [];

  async send(message: SendMailData): Promise<void> {
    this.messages.push(message);
  }
}

export { FakeMailProvider };
