import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const baseURL = 'http://192.168.29.70:3000';

const base = async (options: any, token?: any) => {
  try {
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

export const get = (url: string, params?: any, token?: any) => {
  const options = {
    method: 'get',
    url,
    params,
  };
  return base(options, token);
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
