export const API_ENDPOINTS = {
  REGISTER: '/register',
  LOGIN: '/login',
  LOGOUT: '/logout',

  ARTICLE: '/article/{{id}}',
  ARTICLE_CREATE: '/article/create/{{id}}',
  ARTICLE_LIST: '/articles/list?',
  ARTICLE_STATUS: '/article/status/update',

  DASHBOARD: '/dashboard',

  COMMENT_DELETE: '/comment/{{id}}',
  COMMENT_CREATE: '/comment/create',
  COMMENT_LIST: '/comment/list',

  PAYMENT: '/payment',
  WALLET: '/wallet',
  // TRANSACTIONS: '/transactions/{{page}}/{{limit}}',
  TRANSACTIONS: '/transactions?',

  TIER_LIST: '/tier/config',
  TIER_CREATE: '/tier/config/create/{{id}}',

  CATEGORY: '/category/{{id}}',
  CATEGORY_CREATE: '/category/create/{{id}}',
  // CATEGORY_LIST: '/categories/list/{{page}}/{{limit}}',
  CATEGORY_LIST: '/categories/list?',

  PAYOUT: '/payout',
  PAYOFF_USERS: '/payoff/users',
  PAYOFF_ALL: '/payoff/all?',
  PAYOFF_CREATE: '/payoff/create/{{id}}',
  PAYOFF_LIST: '/payoffs/list',

  USER_LIST: '/users/list',
  USER: '/user/{{id}}',
  






}


export default {
  API_ENDPOINTS
}