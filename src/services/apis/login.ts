import {post} from '../httpMethods';

export const loginUser = async (payload: any) => {
  try {
    const result = await post('/login', payload);
    console.log(result, 'login result');
    return result;
  } catch (er) {
    return er;
  }
};
