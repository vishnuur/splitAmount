import {post} from '../httpMethods';

export const loginUser = async (payload: any) => {
  try {
    const result = await post('/login', payload);
    return result;
  } catch (er) {
    console.log(er);
    return er;
  }
};

export const signUp = async (payload: any) => {
  try {
    const result = await post('/login/signup', payload);
    return result;
  } catch (er: any) {
    console.log(er.response, 'error');
    // return er;
  }
};
