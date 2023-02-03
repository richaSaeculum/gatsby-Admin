import { UserType } from './../constants/user/user_type';
import { apiBaseUrl } from '../constants/configuration';

export const getApiEndPointFromQueryParams = (api: string, param: any) => {
  let AuthJson: string | null = localStorage.getItem('kt-auth-react-v')
  let auth;
  if (AuthJson) {
    auth = JSON.parse(AuthJson)
  }

  if (auth.user.user_role === UserType.AUTHOR)
    return UserType.AUTHOR + addQueryParams(api, param)

  if (auth.user.user_role === UserType.ADMINISTRATOR)
    return UserType.ADMINISTRATOR + addQueryParams(api, param)

  if (auth.user.user_role === UserType.EDITOR)
    return UserType.EDITOR + addQueryParams(api, param)

}

export const getApiEndPoint = (api: string, param: any = {}) => {
  let AuthJson: string | null = localStorage.getItem('kt-auth-react-v')
  let auth;
  if (AuthJson) {
    auth = JSON.parse(AuthJson)
  }

  if (auth.user.user_role === UserType.AUTHOR)
    return UserType.AUTHOR + replaceDoubleBraces(api, param)

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

export function imageFileValidators(file: File, validators: any) {
  if (!(file instanceof File) || !validators) return null;

  // check extentions
  if (validators.allowedExtensions?.length) {
    const error = fileExtensions(file, validators.allowedExtensions);
    if (error) return error;
  }

  // check file min size
  if (validators.minFileSize) {
    const error = fileMinSize(file, validators.minFileSize);
    if (error) return error;
  }

  // check file max size
  if (validators.maxFileSize) {
    const error = fileMaxSize(file, validators.maxFileSize);
    if (error) return error;
  }

  return null;
}

export function fileMinSize(file: File, minSize: number) {
  if (!(file instanceof File) || file.size >= minSize * 1024 * 1024) return null;
  return { type: 'minsize', error: { required: minSize, actualSize: file.size, file } };
};

export function fileMaxSize(file: File, maxSize: number) {
  if (!(file instanceof File) || file.size <= maxSize * 1024 * 1024) return null;
  return { type: 'maxsize', error: { required: maxSize, actualSize: file.size, file } };
};

export function fileExtensions(file: File, allowedExtensions: Array<string>) {
  if (allowedExtensions.length === 0) return null;

  if (file instanceof File) {
    const ext = getExtension(file.name);
    if (!ext || !allowedExtensions.find(extn => extn.toLowerCase() === ext.toLowerCase())) {
      return { type: 'extention', error: { required: allowedExtensions, actualExtension: ext, file } };
    }
  }
  return null;
}

export function getExtension(filename: string): null | string | undefined {
  if (!filename) return '';
  if (filename.indexOf('.') === -1) {
    return null;
  }
  return filename.split('.').pop();
}


export default {
  getApiEndPointFromQueryParams,
  getApiEndPoint,
  replaceDoubleBraces,
  imageFileValidators,
  fileMinSize,
  fileMaxSize,
  fileExtensions,
  getExtension,
}