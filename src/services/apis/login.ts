import {post} from '../httpMethods';

export const loginUser = async (payload: any) => {
  try {
    const result = await post('/login', payload);
    console.log(result, 'result');
    return result;
  } catch (er) {
    console.log(er);
    return er;
  }
};

export const signUp = async (payload: any) => {
  console.log(payload, 'payload');
  try {
    const result = await post('/login/signup', payload);
    console.log(result, 'result');
    return result;
  } catch (er: any) {
    console.log(er.response, 'error');
    // return er;
  }
};
