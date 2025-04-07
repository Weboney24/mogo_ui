import _ from "lodash";

/* eslint-disable no-empty */
export const getCategoryName = (value, category) => {
  try {
    let filteredData = category.filter((res) => {
      return res._id === value;
    });
    return filteredData;
  } catch (err) {}
};

export const getSubCategoryName = (value, subCategory) => {
  try {
    let filteredData = subCategory.filter((res) => {
      return res._id === value;
    });
    return filteredData;
  } catch (err) {}
};

export const getSubCategoryCount = (value, subCategory) => {
  try {
    let filteredData = subCategory.filter((res) => {
      return res.category_name === value;
    });
    return filteredData;
  } catch (err) {}
};

export const getProductCategoryCount = (value, productCategory) => {
  try {
    let filteredData = productCategory.filter((res) => {
      return res.sub_category_name === value;
    });
    return filteredData;
  } catch (err) {}
};

export const getProductName = (id, product) => {
  try {
    console.log(product, id);
    return product.filter((res) => {
      return res._id === id;
    });
  } catch (err) {
    console.log(err);
  }
};

export const getProductCategoryName = (value, productCategory) => {
  try {
    let filteredData = productCategory.filter((res) => {
      return res._id === value;
    });
    return filteredData;
  } catch (err) {}
};

export const orderTrack = [
  {
    id: 1,
    name: "Confirmed",
  },
  {
    id: 2,
    name: "Item Packed",
  },
  {
    id: 3,
    name: "Item Picked Up By Delivery Partner",
  },
  {
    id: 4,
    name: "Out For Delivery",
  },
  {
    id: 5,
    name: "Delivered",
  },
];

export const getAvailableList = (status) => {
  switch (status) {
    case "confirmed":
      return orderTrack.filter((res) => {
        return ![1, 3, 4, 5].includes(res.id);
      });
    case "Item Packed":
      return orderTrack.filter((res) => {
        return ![1, 2, 4, 5].includes(res.id);
      });
    case "Item Picked Up By Delivery Partner":
      return orderTrack.filter((res) => {
        return ![1, 2, 3, 5].includes(res.id);
      });
    case "Out For Delivery":
      return orderTrack.filter((res) => {
        return ![1, 2, 3, 4].includes(res.id);
      });
    case "Delivered":
      return orderTrack.filter((res) => {
        return ![1, 2, 3, 4, 5].includes(res.id);
      });
  }
};

export const CartStatus = (productIDs, currentProductId) => {
  try {
    return productIDs.includes(currentProductId);
  } catch (err) {}
};

export const getProductDetails = (variant_id, product) => {
  try {
    const finalProduct = product?.filter((res) => {
      return res.product_variants.find((value) => {
        return value.varient_unique_id === variant_id;
      });
    });

    return finalProduct;
  } catch (err) {}
};

export const getDeliveryChargesPrice = (deliveryCharges, current_weight) => {
  try {
    const result = deliveryCharges
      ?.sort((res, res2) => {
        return res.product_weight - res2.product_weight;
      })
      ?.filter((res) => {
        return Number(res.product_weight) <= Number(current_weight);
      });
    return _.get(result, `[${result.length - 1}].delivery_charge`, "");
  } catch (err) {}
};

export const getDeliveryChargeTotal = (value) => {
  try {
    const data = value?.map((res) => {
      return Number(res.deliveryCharge);
    });
    return _.sum(data);
  } catch (err) {}
};

export const getCurrentVariant = (value, id) => {
  try {
    const data = value?.filter((res) => {
      return res.varient_unique_id === id;
    });
    return data;
  } catch (err) {}
};

export const getFinalPrice = (checkoutDetails) => {
  try {
    if (Array.isArray(checkoutDetails)) {
      let result = checkoutDetails.map((res) => {
        let price = res.product_finalTotal.replace(/,/g, "");
        return Number(price) || 0;
      });

      return _.sum(result);
    } else {
      throw new Error("checkoutDetails is not an array");
    }
  } catch (err) {
    console.error("Error in getFinalPrice:", err.message);
    return 0;
  }
};

export const getFinalSoloPrice = (checkoutDetails, dicount) => {
  try {
    let result =
      checkoutDetails &&
      checkoutDetails.map(res => {
        return Math.abs(
          (Number(dicount / checkoutDetails.length) *
            Number(res.product_finalTotal)) /
            100 -
            Number(res.product_finalTotal),
        );
      });

    return _.sum(result);
  } catch (err) {}
};
