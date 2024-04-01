import {get} from '../httpMethods';

export const getUserID = async (payload: string) => {
  try {
    const result: any = await get(`api/find-userId?email=${payload}`);
    console.log(result, 'found ID');
    return result;
  } catch (er) {
    console.log(er, 'err');
    return er;
  }
};

export const getUserDetails = async (payload: string | number) => {
  try {
    const result: any = await get(`api/users/${payload}`);
    return result;
  } catch (er) {
    console.log(er, 'err');
    return er;
  }
};

export const getExpenseTypesList = async () => {
  try {
    const result: any = await get('api/expenseTypes');
    console.log(result, 'expenseapis');
    return result;
  } catch (er) {
    console.log(er, 'err');
    return er;
  }
};
