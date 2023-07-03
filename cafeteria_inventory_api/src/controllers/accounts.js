import {
  accountDetailService,
  accountLoginService,
  accountLogoutService,
} from '../services';
import {accountLoginSchema} from '../validators';

export async function accountLogin(request, response) {
  try {
    const validatedData = await accountLoginSchema.validateAsync(request.body);
    const data = await accountLoginService(validatedData);
    if (!data) {
      return response.status(401).json({detail: 'Invalid credentials!'});
    }
    return response.status(201).json(data);
  } catch (e) {
    return response.status(400).json(e);
  }
}

export async function accountDetail(request, response) {
  const data = await accountDetailService(request.user);
  return response.status(200).json(data);
}

export async function accountLogout(request, response) {
  const data = await accountLogoutService(request.user);
  return response.status(204).json(data);
}
