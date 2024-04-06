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
  console.log(payload, 'payloaddata');
  try {
    const result = await post(
      `/api/expense/${payload.id}/createExpense`,
      payload.newData,
    );
    console.log(result, 'result');
    return result.success;
  } catch (er) {
    console.log(er, 'error');
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

export const getBasicChartData = async (payload: any) => {
  try {
    const result = await get(`/api/expenseChartBar/${payload}`);
    return result;
  } catch (er) {
    console.log(er);
  }
};
