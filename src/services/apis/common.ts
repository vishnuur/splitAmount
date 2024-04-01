import {get} from '../httpMethods';

export const getUserID = async (payload: any) => {
  try {
    const result: any = await get(`api/find-userId?email=${payload}`);
    console.log(result, 'found ID');
    return result;
  } catch (er) {
    console.log(er, 'err');
    return er;
  }
};
