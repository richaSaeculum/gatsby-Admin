import axios from "axios"

/* ============================== */
/* ********* CATEGORY *********** */
/* ============================== */

// get categorylist all (GET)
export const getCategoriesListApi = async ({ wpAuthToken }) => {
    try {
        const response = await axios.get(
            'https://gatsby.saeculumsolutions.com/wp-json/wp/v2/categories', {
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

// get category list single (GET)
export const getSingleCategoryApi = async ({ wpAuthToken, id }) => {
    try {
        const response = await axios.get(
            `https://gatsby.saeculumsolutions.com/wp-json/wp/v2/categories/${id}`, {
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
            'https://gatsby.saeculumsolutions.com/wp-json/wp/v2/categories', payload, {
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
        throw error;
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
        throw error;
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
/* *********** POSTS ************ */
/* ============================== */

// get post list all (GET)
export const getPostListApi = async ({ wpAuthToken, status = 'any' }) => {
    try {
        const response = await axios.get(
            `https://gatsby.saeculumsolutions.com/wp-json/wp/v2/posts?per_page=100&&status=${status}&&_embed`, {
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

// get single post (GET) 
export const getSinglePostApi = async ({ wpAuthToken, id }) => {
    try {
        const response = await axios.get(
            `https://gatsby.saeculumsolutions.com/wp-json/wp/v2/posts/${id}`, {
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


/* ============================== */
/* *********** USERS ************ */
/* ============================== */

// get users list all (GET)
export const getUsersListApi = async ({ wpAuthToken }) => {
    console.log(wpAuthToken)
    try {
        const response = await axios.get(
            `https://gatsby.saeculumsolutions.com/wp-json/wp/v2/users`, {
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
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
}