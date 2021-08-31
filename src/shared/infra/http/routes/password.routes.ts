import { Router } from 'express';

import { ResetPasswordController } from '@modules/accounts/useCases/resetPassword/ResetPasswordController';
import { SendMailForgotPasswordController } from '@modules/accounts/useCases/sendMailForgotPassword/SendMailForgotPasswordController';

const passwordRoutes = Router();

const sendMailForgotPasswordController = new SendMailForgotPasswordController();
const resetPasswordController = new ResetPasswordController();

passwordRoutes.post('/forgot', sendMailForgotPasswordController.handle);
passwordRoutes.post('/reset', resetPasswordController.handle);

export { passwordRoutes };
