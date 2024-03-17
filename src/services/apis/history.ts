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
      `/api/groups/${payload.id}/payments`,
      payload.newData,
    );
    return result.success;
  } catch (er) {
    console.log(er);
  }
};

export const getGroupPaymentData = async (payload: any) => {
  try {
    const result = await get(`/api/groups/${payload}`);
    return result.payments;
  } catch (er) {
    console.log(er);
  }
};
