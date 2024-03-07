import {get, post} from '../httpMethods';

export const historyList = async (payload: any) => {
  try {
    const result = await get(`/api/groups?groupId=${payload}`);
    return result;
  } catch (er) {
    console.log(er);
    return er;
  }
};
