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

export const savePaymentData = async (payload: any) => {
  try {
    const result = await post(
      `/api/expense/${payload.id}/createExpense`,
      payload.newData,
    );
    return result.success;
  } catch (er) {
    console.log(er);
  }
};

export const getGroupPaymentData = async (payload: any) => {
  try {
    const result = await get(`/api/expense/${payload}/getexpenses`);
    return result;
  } catch (er) {
    console.log(er);
  }
};
