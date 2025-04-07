import {
  getMyCategory,
  getProductCategory,
  getSubCategory,
} from "../../../helper/api_helper";

export const getCategoryData = async (search = "all") => {
  try {
    let sub_categoryQuery = {
      search: "all",
      filter: "no",
    };
    return await Promise.all([
      getMyCategory(search),
      getSubCategory(JSON.stringify(sub_categoryQuery)),
      getProductCategory(),
    ]);
  } catch (e) {}
};

export const getSubCategoryData = async (search = "all", filter = "no") => {
  try {
    let sub_categoryQuery = {
      search: search,
      filter: filter,
    };
    return await Promise.all([
      getMyCategory("all"),
      getSubCategory(JSON.stringify(sub_categoryQuery)),
      getProductCategory(),
    ]);
  } catch (e) {}
};

export const getProductSubCategoryData = async (
  search = "all",
  filter = "no"
) => {
  try {
    let sub_categoryQuery = {
      search: "all",
      filter: "no",
    };

    return await Promise.all([
      getMyCategory("all"),
      getSubCategory(JSON.stringify(sub_categoryQuery)),
      getProductCategory(),
    ]);
  } catch (e) {}
};
