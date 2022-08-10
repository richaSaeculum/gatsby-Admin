// calls all apis for ya

import Axios from 'axios';
import { apiBaseUrl, apiFileUploadBaseUrl } from '../constants/configuration';

// const TYPE_JSON = 'application/json';
const TYPE_JSON = 'application/json;charset=UTF-8';

export const buildAPIInstance = ({ multipart = false, contenttype = TYPE_JSON }) => {
    const objAxios = Axios.create({
        baseURL: multipart ? apiFileUploadBaseUrl : apiBaseUrl,
        headers: {
        },
    });

    return objAxios;
};

const client = (params = {}) => buildAPIInstance(params);

export default client;