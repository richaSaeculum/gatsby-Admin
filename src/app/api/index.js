import axios from "axios"
import client from "../Utils/client";
import Constant from "../constants/constants";
import Utils from "../Utils";

/* ======================================= */
/* *********** AUTHENTICATION ************ */
/* ======================================= */

// user login (POST)
export const login = async (payload) => {
  try {
    const { data } = await client().post('/login', payload);
    return data;
  } catch (error) {
    // get axios errors from error.response
    console.log(error);
    return error.response.data
  }
}

// user register as well add user from admin panel when user role is administrator (POST)
export const register = async (payload) => {
  try {
    const { data } = await client().post('/register', payload);
    return data;
  } catch (error) {
    // get axios errors from error.response
    console.log(error);
    return error.response.data
  }
}

// logout user (POST)
export const logoutApi = async () => {
  try {
    const { data } = await client().post('/logout');
    return data;
  } catch (error) {
    // get axios errors from error.response
    console.log(error);
    return error.response.data
  }
}


/* ============================== */
/* *********** USERS ************ */
/* ============================== */

// get users list all (POST)
export const getUsersListApi = async ({ page = 1, limit = 100 }) => {
  try {
    let payload = {
      "page_index": page,
      "page_size": limit
    }
    const { data } = await client().post(`/users/list`, payload);
    return data
  } catch (error) {
    // get axios errors from error.response
    console.log(error);
    return error.response.data
  }
}

// get single users list  (GET)
export const getSingleUsersListApi = async ({ id }) => {
  try {
    const { data } = await client().get(`/user/${id}`);
    return data
  } catch (error) {
    // get axios errors from error.response
    console.log(error);
    return error.response.data
  }
}

// add user api (POST)
export const addUserApi = async ({ payload }) => {
  try {
    const { data } = await client().post('/register', payload);
    return data;
  } catch (error) {
    // get axios errors from error.response
    console.log(error);
    return error.response.data
  }
}

// update user api (POST)
export const updateUserApi = async ({ payload, id }) => {
  try {
    const { data } = await client().post(`/user/${id}`, payload);
    return data;
  } catch (error) {
    // get axios errors from error.response
    console.log(error);
    return error.response.data
  }
}

// delete user (DELETE)
export const deleteUserApi = async ({ id }) => {
  try {
    const { data } = await client().delete(`/user/${id}`);
    return data;
  } catch (error) {
    // get axios errors from error.response
    console.log(error);
    return error.response.data
  }
}


/* ============================== */
/* *********** POSTS ************ */
/* ============================== */

// get post list all (GET)
export const getPostListApi = async ({ page = 1, limit = 10, status = '', after = '', before = '' }) => {
  try {
    let param = { page, limit, status, after, before }
    const { data } = await client().get(Utils.Common.getApiEndPointFromQueryParams(Constant.API_ENDPOINTS.ARTICLE_LIST, param));
    return data
  } catch (error) {
    // get axios errors from error.response
    console.log(error);
    return error.response.data
  }
}

// get post list by month (GET)
export const getPostListByMonthApi = async ({ after = '', before = '', status = '' }) => {
  try {
    let param = { status, after, before }
    const { data } = await client().get(Utils.Common.getApiEndPointFromQueryParams(Constant.API_ENDPOINTS.ARTICLE_LIST, param));
    return data
  } catch (error) {
    // get axios errors from error.response
    console.log(error);
    return error.response.data
  }
}

// get single post (GET) 
export const getSinglePostApi = async ({ id }) => {
  try {
    const { data } = await client().get(Utils.Common.getApiEndPointFromReplaceBraces(Constant.API_ENDPOINTS.ARTICLE, { id }));
    return data
  } catch (error) {
    // get axios errors from error.response
    console.log(error);
    return error.response.data
  }
}

//  add post(POST)
export const addPostApi = async ({ payload }) => {
  try {
    const { data } = await client().post(Utils.Common.getApiEndPointFromReplaceBraces(Constant.API_ENDPOINTS.ARTICLE_CREATE), payload);
    return data;
  } catch (error) {
    // get axios errors from error.response
    console.log(error);
    return error.response.data
  }
}

//  update post(POST)
export const updatePostApi = async ({ id, payload }) => {
  try {
    const { data } = await client().post(Utils.Common.getApiEndPointFromReplaceBraces(Constant.API_ENDPOINTS.ARTICLE_UPDATE, { id }), payload);
    return data;
  } catch (error) {
    // get axios errors from error.response
    console.log(error);
    return error.response.data
  }
}

//delete post by id (DELETE)
export const deletePostApi = async ({ id }) => {
  try {
    const { data } = await client().delete(Utils.Common.getApiEndPointFromReplaceBraces(Constant.API_ENDPOINTS.ARTICLE, { id }));
    return data;
  } catch (error) {
    // get axios errors from error.response
    console.log(error);
    return error.response.data;
  }
}


/* ============================= */
/* ********* GENERAL *********** */
/* ============================= */

// file upload (POST)
export const fileUploadApi = async ({ payload }) => {
  try {
    const { data } = await client({ multipart: true }).post(`/upload`, payload);
    return data;
  } catch (error) {
    // get axios errors from error.response
    console.log(error);
    return error.response.data
  }
}

// validate ifsc and get bank name (GET)
export const validateIFSC = async ({ ifsc }) => {
  try {
    const data = await axios.get(`https://ifsc.razorpay.com/${ifsc}`);
    return data;
  } catch (error) {
    // get axios errors from error.response
    console.log(error);
    return error.response
  }
}


/* ============================== */
/* ********* CATEGORY *********** */
/* ============================== */

// get categorylist all (GET)
export const getCategoriesListApi = async ({ page = 1, limit = 10 }) => {
  try {
    const { data } = await client().get(`/categories/list?page=${page}&limit=${limit}`);
    return data
  } catch (error) {
    // get axios errors from error.response
    console.log(error);
    return error.response.data
  }
}

// get category list single (GET)
export const getSingleCategoryApi = async ({ id }) => {
  try {
    const { data } = await client().get(`/category/${id}`);
    return data
  } catch (error) {
    // get axios errors from error.response
    console.log(error);
    return error.response.data
  }
}

// add category (POST)
export const addCategoryApi = async ({ payload }) => {
  try {
    const { data } = await client().post(`/category/create`, payload);
    return data
  } catch (error) {
    // get axios errors from error.response
    console.log(error);
    return error.response.data
  }
}

// update category (POST)
export const updateCategoryApi = async ({ payload, id }) => {
  try {
    const { data } = await client().post(`/category/create/${id}`, payload);
    return data
  } catch (error) {
    // get axios errors from error.response
    console.log(error);
    return error.response.data
  }
}

//delete category by id (DELETE)
export const deleteCategoryApi = async ({ id }) => {
  try {
    const { data } = await client().delete(`/category/${id}`);
    return data;
  } catch (error) {
    // get axios errors from error.response
    console.log(error);
    return error.response.data
  }
}


/* ================================== */
/* *********** DASHBOARD ************ */
/* ================================== */

// get dashboard details (GET)
export const getDashboardApi = async () => {
  try {
    const { data } = await client().get(`/dashboard`);
    return data
  } catch (error) {
    // get axios errors from error.response
    console.log(error);
    return error.response.data
  }
}


/* ================================ */
/* *********** PAYMENT ************ */
/* ================================ */

// get payment details if already added (GET)
export const getPaymentDetailsApi = async () => {
  try {
    const { data } = await client().get(`/payment`);
    return data
  } catch (error) {
    // get axios errors from error.response
    console.log(error);
    return error.response.data
  }
}

// add payment details (POST)
export const addPaymentDetailsApi = async ({ payload }) => {
  try {
    const { data } = await client().post(`/payment`, payload);
    return data
  } catch (error) {
    // get axios errors from error.response
    console.log(error);
    return error.response.data
  }
}


/* ================================= */
/* *********** SETTINGS ************ */
/* ================================= */

// get current payout margin
export const getPayoutMarginApi = async () => {
  try {
    const { data } = await client().get(`/margin`);
    return data
  } catch (error) {
    // get axios errors from error.response
    console.log(error);
    return error.response.data
  }
}

// add payout margin  (POST)
export const addPayoutMarginApi = async ({ payload }) => {
  try {
    const { data } = await client().post(`/margin/create`, payload);
    return data
  } catch (error) {
    // get axios errors from error.response
    console.log(error);
    return error.response.data
  }
}

// update tier  (POST)
export const updateTierApi = async ({ payload, id }) => {
  try {
    const { data } = await client().post(`/tier/config/create/${id}`, payload);
    return data
  } catch (error) {
    // get axios errors from error.response
    console.log(error);
    return error.response.data
  }
}

// get wallet details for user (GET)
export const getTierConfigApi = async () => {
  try {
    const { data } = await client().get(`/tier/config`);
    return data
  } catch (error) {
    // get axios errors from error.response
    console.log(error);
    return error.response.data
  }
}


// get wallet details for user
export const getWalletDetailsApi = async () => {
  try {
    const { data } = await client().get(`/wallet`);
    return data
  } catch (error) {
    // get axios errors from error.response
    console.log(error);
    return error.response.data
  }
}

// get wallet details for user
export const getTransactionsApi = async ({ page = 1, limit = 10 }) => {
  try {
    const { data } = await client().get(`/transactions?page=${page}&limit=${limit}`);
    return data
  } catch (error) {
    // get axios errors from error.response
    console.log(error);
    return error.response.data
  }
}


// add payout margin  (POST)
export const addPayoffApi = async ({ payload }) => {
  try {
    const { data } = await client().post(`/payoff/create`, payload);
    return data
  } catch (error) {
    // get axios errors from error.response
    console.log(error);
    return error.response.data
  }
}

// update payout margin  (POST)
export const updatePayoffApi = async ({ payload, id }) => {
  try {
    const { data } = await client().post(`/payoff/create/${id}`, payload);
    return data
  } catch (error) {
    // get axios errors from error.response
    console.log(error);
    return error.response.data
  }
}

// get all payoff list (MONTHS)
export const getPayoffAllApi = async ({ page = 1, limit = 10 }) => {
  try {
    const { data } = await client().get(`/payoff/all?page=${page}&limit=${limit}`);
    return data
  } catch (error) {
    // get axios errors from error.response
    console.log(error);
    return error.response.data
  }
}

// get all success payoff list (by users)
export const getSuccessPayoffListApi = async ({ page = 1, limit = 10 }) => {
  try {
    let payload = {
      "page_index": page,
      "page_size": limit
    }
    const { data } = await client().post(`/payoffs/list`, payload);
    return data
  } catch (error) {
    // get axios errors from error.response
    console.log(error);
    return error.response.data
  }
}


// get all payoff list (monthwise user specific)
export const getPayoffsByMonthApi = async ({ payload }) => {
  try {
    const { data } = await client().post(`/payoff/users`, payload);
    return data
  } catch (error) {
    // get axios errors from error.response
    console.log(error);
    return error.response.data
  }
}
