type SendMailData = {
  to: string;
  subject: string;
  templatePath: string;
  variables: {
    [key: string]: string | number;
  };
};

interface IMailProvider {
  send(data: SendMailData): Promise<void>;
}

export { IMailProvider, SendMailData };
