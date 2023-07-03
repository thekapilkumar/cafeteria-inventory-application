import {Router} from 'express';

import accounts from './accounts';

const urlpatterns = new Map([['/accounts', accounts]]);

// eslint-disable-next-line new-cap
const v1 = Router();
urlpatterns.forEach((router, prefix) => {
  v1.use(prefix, router);
});

export default v1;
