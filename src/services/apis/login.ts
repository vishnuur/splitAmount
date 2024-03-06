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
