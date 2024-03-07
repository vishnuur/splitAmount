import axios from 'axios';
import {getAsyncStorage} from '../../utils/asyncStorageUtils';

const baseURL = 'http://192.168.29.70:3000';

const base = async (options: any) => {
  try {
    const token = await getAsyncStorage('token');

    return axios({
      baseURL,
      ...options,
      headers: {
        Authorization: token ? `Bearer ${token}` : null,
      },
    }).then(res => res.data);
  } catch (er) {
    console.log(er);
  }
};

export const get = (url: string, params?: any) => {
  const options = {
    method: 'get',
    url,
    params,
  };
  return base(options);
};
export const post = (url: string, data: any) => {
  const options = {
    method: 'post',
    url,
    data,
  };
  return base(options);
};
export const put = (url: string, data: any) => {
  const options = {
    method: 'put',
    url,
    data,
  };
  return base(options);
};
export const del = (url: string, data: any) => {
  const options = {
    method: 'delete',
    url,
    data,
  };
  return base(options);
};
