import axios from "axios"

export const getCategoriesListApi = async () => {
    try {
        const res = await axios.get('https://gatsby.saeculumsolutions.com/wp-json/wp/v2/categories');
        return res
    } catch (error) {
        console.log(error)
    }
}

export const getSingleCategoryApi = async ({ id }) => {
    try {
        const res = await axios.get(`https://gatsby.saeculumsolutions.com/wp-json/wp/v2/categories/${id}`);
        return res
    } catch (error) {
        console.log(error)
    }
}

export const addCategoryApi = async ({ wpAuthtoken, payload }) => {
    try {
        const headers = {
            Authorization: `Bearer ${wpAuthtoken}`
            // Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvZ2F0c2J5LnNhZWN1bHVtc29sdXRpb25zLmNvbSIsImlhdCI6MTY1OTAwNjMyMiwibmJmIjoxNjU5MDA2MzIyLCJleHAiOjE2NTk2MTExMjIsImRhdGEiOnsidXNlciI6eyJpZCI6IjEifX19.VGl_YnAnkKD_merAIXGB8NGnawf1lEiQvRpbMG0Onco`
        }
        const res = await axios.post('https://gatsby.saeculumsolutions.com/wp-json/wp/v2/categories', payload, { headers })
        if (res && (res.status === 200 || res.status === 201)) {
            res.statusText = 'Success'
        }
        return res;
    } catch (error) {
        console.log(error)
    }
}

export const updateCategoryApi = async ({ wpAuthtoken, payload }) => {
    try {
        const headers = {
            Authorization: `Bearer ${wpAuthtoken}`
            // Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvZ2F0c2J5LnNhZWN1bHVtc29sdXRpb25zLmNvbSIsImlhdCI6MTY1OTAwNjMyMiwibmJmIjoxNjU5MDA2MzIyLCJleHAiOjE2NTk2MTExMjIsImRhdGEiOnsidXNlciI6eyJpZCI6IjEifX19.VGl_YnAnkKD_merAIXGB8NGnawf1lEiQvRpbMG0Onco`
        }
        const res = await axios.post(`https://gatsby.saeculumsolutions.com/wp-json/wp/v2/categories/${payload.id}`, payload, { headers })
        if (res && (res.status === 200 || res.status === 201)) {
            res.statusText = 'Success'
        }
        return res;
    } catch (error) {
        console.log(error)
    }
}

export const deleteCategoryApi = async ({ id, wpAuthtoken }) => {
    try {
        const headers = {
            Authorization: `Bearer ${wpAuthtoken}`
            // Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvZ2F0c2J5LnNhZWN1bHVtc29sdXRpb25zLmNvbSIsImlhdCI6MTY1OTAwNjMyMiwibmJmIjoxNjU5MDA2MzIyLCJleHAiOjE2NTk2MTExMjIsImRhdGEiOnsidXNlciI6eyJpZCI6IjEifX19.VGl_YnAnkKD_merAIXGB8NGnawf1lEiQvRpbMG0Onco`
        }
        const res = await axios.delete(`https://gatsby.saeculumsolutions.com/wp-json/wp/v2/categories/${id}?force=1`, { headers });
        return res
    } catch (error) {
        console.log(error)
    }
}

export const getPostListApi = async () => {
    try {
        const res = await axios.get('https://gatsby.saeculumsolutions.com/wp-json/wp/v2/posts?_embed');
        return res
    } catch (error) {
        console.log(error)
    }
}

export const getSinglePostApi = async ({ id }) => {
    try {
        const res = await axios.get(`https://gatsby.saeculumsolutions.com/wp-json/wp/v2/posts/${id}`);
        return res
    } catch (error) {
        console.log(error)
    }
}

export const getUsersListApi = async () => {
    try {
        const res = await axios.get('https://gatsby.saeculumsolutions.com/wp-json/wp/v2/users');
        return res
    } catch (error) {
        console.log(error)
    }
}

export const addUserApi = async ({ wpAuthtoken, payload }) => {
    try {
        const headers = {
            Authorization: `Bearer ${wpAuthtoken}`
            // Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvZ2F0c2J5LnNhZWN1bHVtc29sdXRpb25zLmNvbSIsImlhdCI6MTY1OTAwNjMyMiwibmJmIjoxNjU5MDA2MzIyLCJleHAiOjE2NTk2MTExMjIsImRhdGEiOnsidXNlciI6eyJpZCI6IjEifX19.VGl_YnAnkKD_merAIXGB8NGnawf1lEiQvRpbMG0Onco`
        }
        const res = await axios.post('https://gatsby.saeculumsolutions.com/wp-json/wp/v2/users', payload, { headers })
        if (res && (res.status === 200 || res.status === 201)) {
            res.statusText = 'Success'
        }
        return res;
    } catch (error) {
        console.log(error)
    }
}