import _ from "lodash";

export const checkCouponIncludedOrNot = (orderDetails, currentProduct) => {
  try {
    // Function to clean numbers (removes commas and converts to valid numbers)
    const parseNumber = (value) => {
      const cleanValue = String(value).replace(/,/g, ""); // Remove commas
      return isNaN(Number(cleanValue)) ? 0 : Number(cleanValue);
    };

    const productFinalTotal = parseNumber(_.get(currentProduct, "product_finalTotal", "0"));
    const deliveryCharge = parseNumber(_.get(currentProduct, "deliveryCharge", "0"));

    if (_.isEmpty(_.get(orderDetails, "coupondiscountDetails", []))) {
      return productFinalTotal + deliveryCharge;
    } else {
      const couponDiscount = parseNumber(_.get(orderDetails, "coupondiscountDetails[0].coupon_discount", "0"));
      const productCount = _.get(orderDetails, "productDetails", []).length || 1; // Prevent division by zero

      let discount = (productFinalTotal * couponDiscount) / (100 * productCount);
      let final = productFinalTotal - discount;

      return Math.abs(final) + deliveryCharge;
    }
  } catch (err) {
    console.error("Error in checkCouponIncludedOrNot:", err);
    return 0; // Default return value to prevent issues
  }
};


export const getVariantPrice = (variant_id, variantProducts) => {
  try {
    const result = _.get(variantProducts, "product_variants", []).filter(
      (res) => {
        return res.varient_unique_id === variant_id;
      }
    );

    return _.get(result, "[0]", "");
  } catch (err) {}
};

export const findDiscountPercentage = (variant_id, variantProducts) => {
  try {
    let mrp = getVariantPrice(variant_id, variantProducts)?.mogo_mrp_price;
    let selling = getVariantPrice(
      variant_id,
      variantProducts
    )?.mogo_selling_price;

    let amount = mrp - selling;
    let discount = (amount / mrp) * 100;
    return discount;
  } catch (err) {}
};
