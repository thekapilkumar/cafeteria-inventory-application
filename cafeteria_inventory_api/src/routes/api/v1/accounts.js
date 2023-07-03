import {Router} from 'express';

import {accountDetail, accountLogin, accountLogout} from '../../../controllers';

// eslint-disable-next-line new-cap
const accounts = Router();
accounts.route('/login').post(accountLogin);
accounts.route('/detail').get(accountDetail);
accounts.route('/logout').delete(accountLogout);

export default accounts;
