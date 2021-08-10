import User from '../modules/accounts/entities/User';

declare global {
  namespace Express {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    export interface Request {
      user: User;
    }
  }
}
