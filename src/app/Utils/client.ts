// calls all apis for ya

import Axios from 'axios';
import { apiBaseUrl, apiFileUploadBaseUrl } from '../constants/configuration';

// const TYPE_JSON = 'application/json';
const TYPE_JSON = 'application/json;charset=UTF-8';

export const buildAPIInstance = ({ multipart = false, contenttype = TYPE_JSON }) => {

    let AuthJson: string | null = localStorage.getItem('kt-auth-react-v')
    let auth;
    if (AuthJson) {
        auth = JSON.parse(AuthJson)
    }
    const objAxios = Axios.create({
        baseURL: multipart ? apiFileUploadBaseUrl : apiBaseUrl,
        headers: {
            Authorization: auth && auth.token
        },
    });

    return objAxios;
};

const client = (params = {}) => buildAPIInstance(params);

export default client;