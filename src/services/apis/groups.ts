import {get, post} from '../httpMethods';

export const createGroup = async (payload: any) => {
  try {
    const result = await post('/api/groups', payload);
    return result;
  } catch (er) {
    return er;
  }
};

export const listGroups = async () => {
  try {
    const result: any = await get('api/groups');
    return result;
  } catch (er) {
    console.log(er, 'err');
    return er;
  }
};

export const getGroupDetail = async (id: any) => {
  try {
    const result: any = await get(`api/groups/${id}`);
    return result;
  } catch (er) {
    console.log(er);
  }
};
