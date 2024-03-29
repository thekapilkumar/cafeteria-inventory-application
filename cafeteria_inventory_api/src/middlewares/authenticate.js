import {User} from '../models';

const EXCLUDE_URLS = ['/api/v1/accounts/login'];

export default async function authenticate(request, response, next) {
  if (EXCLUDE_URLS.includes(request.path)) {
    return next();
  }
  const keyword = "Token";
  const authorization = request.headers?.authorization;
  if (!authorization) {
    return response.status(401).json({detail: 'Unauthorized'});
  }
  const values = authorization.split(' ');
  if (values.length !== 2) {
    return response.status(401).json({detail: 'Unauthorized'});
  }
  if (keyword.toLowerCase() !== values[0].toLowerCase()) {
    return response.status(401).json({detail: 'Unauthorized'});
  }
  const user = await User.findOne({
    'token.key': values[1],
  });
  if (!user) {
    return response.status(403).json({detail: 'Forbidden'});
  }
  request.user = user;
  return next();
}
