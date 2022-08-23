import axios from "axios"
import client from "../Utils/client";

/* ============================== */
/* ********* CATEGORY *********** */
/* ============================== */

// get categorylist all (GET)
// export const getCategoriesListApi = async ({ wpAuthToken, page = 1 }) => {
//   try {
//     const response = await axios.get(
//       `https://gatsby.saeculumsolutions.com/wp-json/wp/v2/categories?page=${page}&per_page=10`, {
//       headers: {
//         common: {
//           Authorization: `Bearer ${wpAuthToken}`
//         }
//       }
//     }
//     );
//     return response
//   } catch (error) {
//     console.log(error);
//     throw error;
//   }
// }

// get category list single (GET)
export const getSingleCategoryApi = async ({ wpAuthToken, id }) => {
  try {
    const response = await axios.get(
      `https://gatsby.saeculumsolutions.com/wp-json/wp/v2/categories/${id}?context=edit`, {
      headers: {
        common: {
          Authorization: `Bearer ${wpAuthToken}`
        }
      }
    }
    );
    return response
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// add category (POST)
export const addCategoryApi = async ({ wpAuthToken, payload }) => {
  try {
    const response = await axios.post(
      `https://gatsby.saeculumsolutions.com/wp-json/wp/v2/categories`, payload, {
      headers: {
        common: {
          Authorization: `Bearer ${wpAuthToken}`
        }
      }
    }
    );
    if (response && (response.status === 200 || response.status === 201)) {
      response.statusText = 'Success'
    }
    return response;
  } catch (error) {
    console.log(error);
    let err = {
      statusText: "Error",
      message: error.response.data.message
    }
    return err
  }
}

// update category (POST)
export const updateCategoryApi = async ({ wpAuthToken, payload }) => {
  try {
    const response = await axios.post(
      `https://gatsby.saeculumsolutions.com/wp-json/wp/v2/categories/${payload.id}`, payload, {
      headers: {
        common: {
          Authorization: `Bearer ${wpAuthToken}`
        }
      }
    }
    );
    if (response && (response.status === 200 || response.status === 201)) {
      response.statusText = 'Success'
    }
    return response;
  } catch (error) {
    console.log(error);
    let err = {
      statusText: "Error",
      message: error.response.data.message
    }
    return err
  }
}

//delete category by id (DELETE)
export const deleteCategoryApi = async ({ id, wpAuthToken }) => {
  try {
    const response = await axios.delete(
      `https://gatsby.saeculumsolutions.com/wp-json/wp/v2/categories/${id}?force=1`, {
      headers: {
        common: {
          Authorization: `Bearer ${wpAuthToken}`
        }
      }
    }
    );
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}


/* ============================== */
/* *********** USERS ************ */
/* ============================== */

// get users list all (GET)
export const getUsersListApi = async ({ wpAuthToken, page = 1 }) => {
  try {
    const response = await axios.get(
      `https://gatsby.saeculumsolutions.com/wp-json/wp/v2/users?page=${page}&per_page=10`, {
      // headers: {
      //     common: {
      //         Authorization: `Bearer ${wpAuthToken}`
      //     }
      // }
    }
    );
    return response
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// get single users list  (GET)
export const getSingleUsersListApi = async ({ wpAuthToken, id }) => {
  try {
    const response = await axios.get(
      `https://gatsby.saeculumsolutions.com/wp-json/wp/v2/users/${id}?context=edit`, {
      headers: {
        common: {
          Authorization: `Bearer ${wpAuthToken}`,
        }
      }
    }
    );
    return response
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// add user (POST)
export const addUserApi = async ({ wpAuthToken, payload }) => {
  try {
    const response = await axios.post(
      `https://gatsby.saeculumsolutions.com/wp-json/wp/v2/users`, payload, {
      headers: {
        common: {
          Authorization: `Bearer ${wpAuthToken}`
        }
      }
    }
    );
    if (response && (response.status === 200 || response.status === 201)) {
      response.statusText = 'Success'
    }
    console.log(response)
    return response;
  } catch (error) {
    console.log(error)
    let err = {
      statusText: "Error",
      message: error.response.data.message
    }
    return err
  }
}

// update user (POST)
export const updateUserApi = async ({ wpAuthToken, payload }) => {
  try {
    const response = await axios.post(
      `https://gatsby.saeculumsolutions.com/wp-json/wp/v2/users/${payload.id}`, payload, {
      headers: {
        common: {
          Authorization: `Bearer ${wpAuthToken}`
        }
      }
    }
    );
    if (response && (response.status === 200 || response.status === 201)) {
      response.statusText = 'Success'
    }
    return response;
  } catch (error) {
    console.log(error);
    let err = {
      statusText: "Error",
      message: error.response.data.message
    }
    return err
  }
}

// delete user (DELETE)
export const deleteUserApi = async ({ id, wpAuthToken }) => {
  try {
    const response = await axios.delete(
      `https://gatsby.saeculumsolutions.com/wp-json/wp/v2/users/${id}?force=1&reassign=1`, {
      headers: {
        common: {
          Authorization: `Bearer ${wpAuthToken}`
        }
      }
    }
    );
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}


/* ======================================= */
/* *********** AUTHENTICATION ************ */
/* ======================================= */

// user login  
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

// user register as well add user from admin panel when user role is administrator
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

// logout user
export const logoutApi = async ({ token }) => {
  try {
    const { data } = await client().post('/logout', {}, {
      headers: token
    });
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
export const getPostListByMonthApi = async ({ wpAuthToken, after = '', before = '' }) => {
  try {
    const response = await client().get(
      `https://gatsby.saeculumsolutions.com/wp-json/wp/v2/posts?per_page=100&status=publish&before=${before}&after=${after}&_embed`, {
      headers: {
        common: {
          Authorization: `Bearer ${wpAuthToken}`
        }
      }
    }
    );
    return response
  } catch (error) {
    // get axios errors from error.response
    console.log(error);
    throw error;
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

//delete post by id (GET)
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

/* ============================= */
/* ********* GENERAL *********** */
/* ============================= */

// file upload
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
export const getCategoriesListApi = async ({ token }) => {
  try {
    const { data } = await client().get(`categories/list`, {
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

/* ================================== */
/* *********** DASHBOARD ************ */
/* ================================== */

// get post list all (GET)
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


/* ================================== */
/* *********** PAYMENT ************ */
/* ================================== */

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