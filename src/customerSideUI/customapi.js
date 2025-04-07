import {
  getAllCategoryforCustomer,
  getAllSubCategoryforCustomer,
} from "../helper/api_helper";

export const getCategoryInfo = async () => {
  return await Promise.all([
    getAllCategoryforCustomer(),
    getAllSubCategoryforCustomer(),
  ]);
};

export const getSpecialOfferInfo = async () => {
  return await Promise.all([
    // eslint-disable-next-line no-undef
    getSpecialOfferforCustomer(),
  ]);
};
