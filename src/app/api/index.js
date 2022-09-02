import axios from "axios"
import client from "../Utils/client";

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
export const logoutApi = async ({ token }) => {
  try {
    const { data } = await client().post('/logout', {}, {
      headers: {
        Authorization: token
      }
    });
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
export const getUsersListApi = async ({ token, page = 1, limit = 100 }) => {
  try {
    let payload = {
      "page_index": page,
      "page_size": limit
    }
    const { data } = await client().post(`/users/list`, payload, {
      headers: {
        Authorization: token
      }
    });
    return data
  } catch (error) {
    // get axios errors from error.response
    console.log(error);
    return error.response.data
  }
}

// get single users list  (GET)
export const getSingleUsersListApi = async ({ token, id }) => {
  try {
    const { data } = await client().get(`/user/${id}`, {
      headers: {
        Authorization: token
      }
    });
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
export const updateUserApi = async ({ token, payload, id }) => {
  try {
    const { data } = await client().post(`/user/${id}`, payload, {
      headers: {
        Authorization: token
      }
    });
    return data;
  } catch (error) {
    // get axios errors from error.response
    console.log(error);
    return error.response.data
  }
}

// delete user (DELETE)
export const deleteUserApi = async ({ token, id }) => {
  try {
    const { data } = await client().delete(`/user/${id}`, {
      headers: {
        Authorization: token
      }
    }
    );
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
export const getPostListApi = async ({ token, page = 1, limit = 10 }) => {
  try {
    const { data } = await client().get(`/articles/list?page=${page}&limit=${limit}`, {
      headers: {
        Authorization: token
      }
    });
    return data
  } catch (error) {
    // get axios errors from error.response
    console.log(error);
    return error.response.data
  }
}

// get post list by month (GET)
export const getPostListByMonthApi = async ({ token, after = '', before = '', status = 'any' }) => {
  try {
    const { data } = await client().get(`/articles/list?status=${status}&after=${after}&before=${before}`, {
      headers: {
        Authorization: token
      }
    }
    );
    return data
  } catch (error) {
    // get axios errors from error.response
    console.log(error);
    return error.response.data
  }
}

// get single post (GET) 
export const getSinglePostApi = async ({ token, id }) => {
  try {
    const { data } = await client().get(`/article/${id}`, {
      headers: {
        Authorization: token
      }
    });
    return data
  } catch (error) {
    // get axios errors from error.response
    console.log(error);
    return error.response.data
  }
}

//  add post(POST)
export const addPostApi = async ({ token, payload }) => {
  try {
    const { data } = await client().post(`/article/create`, payload, {
      headers: {
        Authorization: token
      }
    });
    return data;
  } catch (error) {
    // get axios errors from error.response
    console.log(error);
    return error.response.data
  }
}

//  update post(POST)
export const updatePostApi = async ({ token, id, payload }) => {
  try {
    const { data } = await client().post(`/article/create/${id}`, payload, {
      headers: {
        Authorization: token
      }
    });
    return data;
  } catch (error) {
    // get axios errors from error.response
    console.log(error);
    return error.response.data
  }
}

//delete post by id (DELETE)
export const deletePostApi = async ({ token, id }) => {
  try {
    const { data } = await client().delete(`/article/${id}`, {
      headers: {
        Authorization: token
      }
    });
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
export const fileUploadApi = async ({ token, payload }) => {
  try {
    const { data } = await client({ multipart: true }).post(`/upload`, payload, {
      headers: {
        Authorization: token
      }
    });
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
export const getCategoriesListApi = async ({ token, page = 1, limit = 10 }) => {
  try {
    const { data } = await client().get(`/categories/list?page=${page}&limit=${limit}`, {
      headers: {
        Authorization: token
      }
    }
    );
    return data
  } catch (error) {
    // get axios errors from error.response
    console.log(error);
    return error.response.data
  }
}

// get category list single (GET)
export const getSingleCategoryApi = async ({ token, id }) => {
  try {
    const { data } = await client().get(`/category/${id}`, {
      headers: {
        Authorization: token
      }
    }
    );
    return data
  } catch (error) {
    // get axios errors from error.response
    console.log(error);
    return error.response.data
  }
}

// add category (POST)
export const addCategoryApi = async ({ token, payload }) => {
  try {
    const { data } = await client().post(`/category/create`, payload, {
      headers: {
        Authorization: token
      }
    }
    );
    return data
  } catch (error) {
    // get axios errors from error.response
    console.log(error);
    return error.response.data
  }
}

// update category (POST)
export const updateCategoryApi = async ({ token, payload, id }) => {
  try {
    const { data } = await client().post(`/category/create/${id}`, payload, {
      headers: {
        Authorization: token
      }
    }
    );
    return data
  } catch (error) {
    // get axios errors from error.response
    console.log(error);
    return error.response.data
  }
}

//delete category by id (DELETE)
export const deleteCategoryApi = async ({ token, id }) => {
  try {
    const { data } = await client().delete(`/category/${id}`, {
      headers: {
        Authorization: token
      }
    }
    );
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
export const getDashboardApi = async ({ token }) => {
  try {
    const { data } = await client().get(`/dashboard`, {
      headers: {
        Authorization: token
      }
    });
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
export const getPaymentDetailsApi = async ({ token }) => {
  try {
    const { data } = await client().get(`/payment`, {
      headers: {
        Authorization: token
      }
    });
    return data
  } catch (error) {
    // get axios errors from error.response
    console.log(error);
    return error.response.data
  }
}

// add payment details (POST)
export const addPaymentDetailsApi = async ({ token, payload }) => {
  try {
    const { data } = await client().post(`/payment`, payload, {
      headers: {
        Authorization: token
      }
    });
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
export const getPayoutMarginApi = async ({ token }) => {
  try {
    const { data } = await client().get(`/margin`, {
      headers: {
        Authorization: token
      }
    });
    return data
  } catch (error) {
    // get axios errors from error.response
    console.log(error);
    return error.response.data
  }
}

// add payout margin  (POST)
export const addPayoutMarginApi = async ({ token, payload }) => {
  try {
    const { data } = await client().post(`/margin/create`, payload, {
      headers: {
        Authorization: token
      }
    });
    return data
  } catch (error) {
    // get axios errors from error.response
    console.log(error);
    return error.response.data
  }
}

// get wallet details for user
export const getWalletDetailsApi = async ({ token }) => {
  try {
    const { data } = await client().get(`/wallet`, {
      headers: {
        Authorization: token
      }
    });
    return data
  } catch (error) {
    // get axios errors from error.response
    console.log(error);
    return error.response.data
  }
}

// get wallet details for user
export const getTransactionsApi = async ({ token, page = 1, limit = 10 }) => {
  try {
    const { data } = await client().get(`/transactions?page=${page}&limit=${limit}`, {
      headers: {
        Authorization: token
      }
    });
    return data
  } catch (error) {
    // get axios errors from error.response
    console.log(error);
    return error.response.data
  }
}


// add payout margin  (POST)
export const addPayoffApi = async ({ token, payload }) => {
  try {
    const { data } = await client().post(`/payoff/create`, payload, {
      headers: {
        Authorization: token
      }
    });
    return data
  } catch (error) {
    // get axios errors from error.response
    console.log(error);
    return error.response.data
  }
}

// update payout margin  (POST)
export const updatePayoffApi = async ({ token, payload, id }) => {
  try {
    const { data } = await client().post(`/payoff/create/${id}`, payload, {
      headers: {
        Authorization: token
      }
    });
    return data
  } catch (error) {
    // get axios errors from error.response
    console.log(error);
    return error.response.data
  }
}

// get all payoff list (MONTHS)
export const getPayoffAllApi = async ({ token, page = 1, limit = 10 }) => {
  try {
    const { data } = await client().get(`/payoff/all?page=${page}&limit=${limit}`, {
      headers: {
        Authorization: token
      }
    });
    return data
  } catch (error) {
    // get axios errors from error.response
    console.log(error);
    return error.response.data
  }
}

// get all success payoff list (by users)
export const getSuccessPayoffListApi = async ({ token, page = 1, limit = 10 }) => {
  try {
    let payload = {
      "page_index": page,
      "page_size": limit
    }
    const { data } = await client().post(`/payoffs/list`, payload, {
      headers: {
        Authorization: token
      }
    });
    return data
  } catch (error) {
    // get axios errors from error.response
    console.log(error);
    return error.response.data
  }
}


// get all payoff list (monthwise user specific)
export const getPayoffsByMonthApi = async ({ token, payload }) => {
  try {
    const { data } = await client().post(`/payoff/users`, payload, {
      headers: {
        Authorization: token
      }
    });
    return data
  } catch (error) {
    // get axios errors from error.response
    console.log(error);
    return error.response.data
  }
}
