import {get, post} from '../httpMethods';

export const createGroup = async (payload: any) => {
  try {
    const result = await post('/api/groups', payload);
    console.log(result, 'group saved');
    return result;
  } catch (er) {
    return er;
  }
};

export const listGroups = async () => {
  try {
    const result: any = await get('api/groups');
    console.log(result, 'groupsss');
    return result;
  } catch (er) {
    console.log(er, 'err');
    return er;
  }
};
