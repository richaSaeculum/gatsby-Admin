import axios from 'axios'
import { AuthModel, UserModel } from './_models'

const API_URL = process.env.REACT_APP_API_URL

export const GET_USER_BY_ACCESSTOKEN_URL = `${API_URL}/verify_token`
export const LOGIN_URL = `http://13.232.236.62:9000/api/login`
export const REGISTER_URL = `http://13.232.236.62:9000/api/register`
export const REQUEST_PASSWORD_URL = `${API_URL}/forgot_password`

// Server should return AuthModel
// export function login(email: string, password: string) {
//   return axios.post(LOGIN_URL, {
//     user_email: email,
//     user_password: password,
//   })
// }

// Server should return AuthModel
export function register(
  email: string,
  firstname: string,
  lastname: string,
  password: string,
  username: string,
  user_role?: string
) {
  return axios.post(REGISTER_URL, {
    user_first_name: firstname,
    user_last_name: lastname,
    user_name: username,
    user_email: email,
    user_password: password,
    user_role: 'Author',
    user_website: 'test@tewst.com'
  })
}

// Server should return object => { result: boolean } (Is Email in DB)
export function requestPassword(email: string) {
  return axios.post<{ result: boolean }>(REQUEST_PASSWORD_URL, {
    email,
  })
}

export function getUserByToken(token: string) {
  return axios.post<UserModel>(GET_USER_BY_ACCESSTOKEN_URL, {
    api_token: token,
  })
}
