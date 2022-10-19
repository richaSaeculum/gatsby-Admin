import { UserType } from './../constants/user/user_type';
import { apiBaseUrl } from '../constants/configuration';

export const getApiEndPointFromQueryParams = (api: string, param: any) => {
  let AuthJson: string | null = localStorage.getItem('kt-auth-react-v')
  let auth;
  if (AuthJson) {
    auth = JSON.parse(AuthJson)
  }

  if (auth.user.user_role === UserType.AUTHOR)
    return addQueryParams(api, param)

  if (auth.user.user_role === UserType.ADMINISTRATOR)
    return UserType.ADMINISTRATOR + addQueryParams(api, param)

  if (auth.user.user_role === UserType.EDITOR)
    return UserType.EDITOR + addQueryParams(api, param)

}

export const getApiEndPointFromReplaceBraces = (api: string, param: any) => {
  let AuthJson: string | null = localStorage.getItem('kt-auth-react-v')
  let auth;
  if (AuthJson) {
    auth = JSON.parse(AuthJson)
  }

  if (auth.user.user_role === UserType.AUTHOR) 
    return replaceDoubleBraces(api, param)

  if (auth.user.user_role === UserType.ADMINISTRATOR)
    return UserType.ADMINISTRATOR + replaceDoubleBraces(api, param)

  if (auth.user.user_role === UserType.EDITOR)
    return UserType.EDITOR + replaceDoubleBraces(api, param)

}

export const replaceDoubleBraces = (str: string, result: any) => {
  const modifiedString = str.replace(/{{(.+?)}}/g, (_, g1) => result[g1] || '');
  return modifiedString.replace(/\[missing /g, '').replace(/ value\]/g, '');
};

export const addQueryParams = (str: string, param: any) => {
  const url = new URL(apiBaseUrl + str)

  for (const key in param) {
    if (param.hasOwnProperty(key) && param[key] !== '')
      url.searchParams.set(key, param[key])
  }
  return str + url.searchParams
}


export default {
  getApiEndPointFromQueryParams,
  getApiEndPointFromReplaceBraces,
  replaceDoubleBraces,
}