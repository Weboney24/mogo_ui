/* eslint-disable no-unused-vars */
import axios from "axios";

let base_url = import.meta.env.VITE_BASE_API_URL;
export let client_url = import.meta.env.VITE_BASE_API_URL;

// vendor registration
export const registerVendor = async (formdata) => await axios.post(`${base_url}/vendor/create_new_vendor`, formdata);

export const authVendor = async (formdata) => await axios.post(`${base_url}/vendor/auth_vendor`, formdata);

// axios
let vendorAxiosRequest = axios.create({
  base_url: `${base_url}`,
});

vendorAxiosRequest.interceptors.request.use((config) => {
  if (localStorage.getItem("vendor_token")) {
    let token = localStorage.getItem("vendor_token");
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  }
});

export const updateVendor = async (formdata) => await vendorAxiosRequest.put(`${base_url}/vendor/update_vendor_details`, formdata);

export const getAllReviews = async () => await vendorAxiosRequest.get(`${base_url}/adminui/getallreviews`);

// category
export const createCategory = async (formdata) => await vendorAxiosRequest.post(`${base_url}/vendor_category/create_category`, formdata);

export const getMyCategory = async (search_value) => await vendorAxiosRequest.get(`${base_url}/vendor_category/getmy_category/${search_value}`);

export const deleteMyCategory = async (id) => await vendorAxiosRequest.delete(`${base_url}/vendor_category/deletemy_category/${id}`);

export const updateCategory = async (formdata) => await vendorAxiosRequest.put(`${base_url}/vendor_category/update_category`, formdata);

// sub category
export const craeteSubCategory = async (formdata) => await vendorAxiosRequest.post(`${base_url}/vendor_category/create_subcategory`, formdata);

export const getSubCategory = async (id) => await vendorAxiosRequest.get(`${base_url}/vendor_category/get_subcategory/${id}`);

export const deleteSubCategory = async (id) => await vendorAxiosRequest.delete(`${base_url}/vendor_category/deletesub_category/${id}`);

export const updateSubCategory = async (formdata) => await vendorAxiosRequest.put(`${base_url}/vendor_category/update_sub_category`, formdata);

// Product category
export const createProductCategory = async (formdata) => await vendorAxiosRequest.post(`${base_url}/vendor_category/create_productcategory`, formdata);

export const getProductCategory = async () => await vendorAxiosRequest.get(`${base_url}/vendor_category/get_productcategory`);

export const deleteProductCategory = async (id) => await vendorAxiosRequest.delete(`${base_url}/vendor_category/deleteproduct_category/${id}`);

export const updateProductCategory = async (formdata) => await vendorAxiosRequest.put(`${base_url}/vendor_category/update_product_category`, formdata);

// brand
export const createBrand = async (formdata) => await vendorAxiosRequest.post(`${base_url}/vendor_category/create_brand`, formdata);

export const getAllBrands = async () => await vendorAxiosRequest.get(`${base_url}/vendor_category/get_all_brands`);

export const addTestmonial = async (formData) => await axios.post(`${base_url}/test/add_testimondial`, formData);
export const getTestmonail = async () => await axios.get(`${base_url}/test/get_testimondials`);
export const editTestmonail = async (id, formData) => await axios.put(`${base_url}/test/update_testimondial/${id}`, formData);
export const deleteTestmonail = async (id) => await axios.delete(`${base_url}/test/delete_testimondial/${id}`);

// fabric
export const createFabric = async (formdata) => await vendorAxiosRequest.post(`${base_url}/vendor_category/create_fabric`, formdata);

export const getAllFabric = async () => await vendorAxiosRequest.get(`${base_url}/vendor_category/get_all_fabric`);

// get role
export const getCurrentUserRole = async () => await vendorAxiosRequest.get(`${base_url}/auth/get_current_userRole`);

// products
export const createProduct = async (formdata) => await vendorAxiosRequest.post(`${base_url}/products/create_product`, formdata);

export const updateProduct = async (formdata, id) => await vendorAxiosRequest.put(`${base_url}/products/update_product/${id}`, formdata);

export const getMyProducts = async (search) => await vendorAxiosRequest.get(`${base_url}/products/getmy_product/${search}`);

export const getMyPendingProducts = async () => await vendorAxiosRequest.get(`${base_url}/products/getmy_pending_product`);

export const getMyOutofStockProducts = async (id) => await vendorAxiosRequest.get(`${base_url}/products/getmy_outof_stock_product/${id}`);

export const getMyActiveStockProducts = async (id) => await vendorAxiosRequest.get(`${base_url}/products/getmy_Active_product/${id}`);

export const updateProductRequestStatus = async (formData) => await vendorAxiosRequest.put(`${base_url}/products/updateProduct_request`, formData);

export const DeleteProduct = async (id) => await vendorAxiosRequest.delete(`${base_url}/products/deleteProduct/${id}`);

export const getAllProducts = async () => await vendorAxiosRequest.get(`${base_url}/products/getall_product`);

export const getSingleProduct = async (id) => await axios.get(`${base_url}/products_details/getsingle_product/${id}`);

// images
export const uploadImages = async (formdata) => await vendorAxiosRequest.post(`${base_url}/upload_images`, formdata);

export const removeImages = async (formdata) => await vendorAxiosRequest.post(`${base_url}/remove_images`, formdata);

// Banners

export const craeteBanner = async (formdata) => await vendorAxiosRequest.post(`${base_url}/banner/create_banner`, formdata);

export const getBanner = async () => await vendorAxiosRequest.get(`${base_url}/banner/get_banner`);

export const deleteBanner = async (id) => await vendorAxiosRequest.get(`${base_url}/banner/delete_banner/${id}`);

// coupon

export const createCoupons = async (formdata) => await vendorAxiosRequest.post(`${base_url}/coupon/create_coupon`, formdata);

export const getAllCoupon = async () => await vendorAxiosRequest.get(`${base_url}/coupon/collect_coupon`);

export const deleteCoupon = async (id) => await vendorAxiosRequest.delete(`${base_url}/coupon/delete_coupon/${id}`);

export const updateCoupon = async (formData, id) => await vendorAxiosRequest.put(`${base_url}/coupon/update_coupon/${id}`, formData);

//  stores
export const getAllStores = async () => await vendorAxiosRequest.get(`${base_url}/store/getAllStores`);

//  users
export const getAllUsers = async () => await vendorAxiosRequest.get(`${base_url}/store/getAllUsers`);

//  orders
export const getAllOrders = async () => await vendorAxiosRequest.get(`${base_url}/order/get_all_orders`);

export const updateOrderStatus = async (formData) => await vendorAxiosRequest.put(`${base_url}/order/update_order_status`, formData);

// customer ui
// category
export const getAllCategoryforCustomer = async (search) =>
  await axios.get(
    `${base_url}/mobile/get_all_categories/${JSON.stringify({
      name: search || "all",
    })}`
  );

export const getAllSubCategoryforCustomer = async (search) =>
  await axios.get(
    `${base_url}/mobile/get_all_subcategories/${JSON.stringify({
      name: search || "all",
    })}`
  );

// banner

export const getAllBannerforCustomer = async () => await axios.get(`${base_url}/mobile/get_banner`);

// offer products
export const getSpecialOfferforCustomer = async () => await axios.get(`${base_url}/mobile/get_banner`);

// stores

// profile

export const getCurrentUserData = async () => await vendorAxiosRequest.get(`${base_url}/auth/getcuurent_user_data`);

export const getZipCodeAddress = async (formData) => await axios.post(`${base_url}/vendor/get_zipcode_address`, formData);

// delivery locations
export const addNewDeliveryTiming = async (formData) => await vendorAxiosRequest.post(`${base_url}/delivery_charge/add_new_delivery_timing`, formData);

export const addNewDeliveryCharge = async (formData) => await vendorAxiosRequest.post(`${base_url}/delivery_charge/add_new_delivery_charge`, formData);

export const getDeliveryLocations = async () => await vendorAxiosRequest.get(`${base_url}/delivery_charge/getall_delivery_location`);
export const getDeliveryCharges = async () => await vendorAxiosRequest.get(`${base_url}/delivery_charge/getall_delivery_charges`);

// dashboard
export const fetchAllCounts = async () => await vendorAxiosRequest.get(`${base_url}/dashboard/getAll_Counts`);

// web customer account
export const getallBrands = async () => await axios.get(`${base_url}/customerui/getAll_Brands`);

export const getAllExploreProducts = async (search) => await axios.get(`${base_url}/customerui/getallExploreProducts/${search}`);

export const getAllProductFinalCategory = async () => await axios.get(`${base_url}/customerui/getAllProductFinalCategory`);

export const getAllSpecialProducts = async (search) =>
  await axios.get(
    `${base_url}/mobile/get_special_products/${JSON.stringify({
      name: search || "all",
    })}`
  );

export const getAllTrendingProducts = async (search) =>
  await axios.get(
    `${base_url}/mobile/get_trending_products/${JSON.stringify({
      name: search || "all",
    })}`
  );

export const getAllNewArivalProducts = async (search) =>
  await axios.get(
    `${base_url}/mobile/get_newarival_products/${JSON.stringify({
      name: search || "all",
    })}`
  );

export const getAllBanners = async () => await axios.get(`${base_url}/customerui/getAllBanners`);

export const getCutomerProductCategory = async () => await axios.get(`${base_url}/customerui/getCutomerProductCategory`);

export const getSingleVariantComments = async (id) => await axios.get(`${base_url}/customerui/getSingleVariantComments/${id}`);

export const getSingleVariantReview = async (id) => await axios.get(`${base_url}/customerui/getSingleVariantReview/${id}`);

export const globalSearchProduct = async (search) => await axios.get(`${base_url}/customerui/globalSearchProduct/${search}`);

export const createUser = async (formdata) => await axios.post(`${base_url}/user/create_new_user`, formdata);

export const authUser = async (formdata) => await axios.post(`${base_url}/customerui/authUser`, formdata);

// customer axios

// axios
let customerAxiosRequest = axios.create({
  base_url: `${base_url}`,
});

customerAxiosRequest.interceptors.request.use((config) => {
  if (localStorage.getItem("customers_token")) {
    let token = localStorage.getItem("customers_token");
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  }
});

export const loginStaus = async () => await customerAxiosRequest.get(`${base_url}/customerui/login_status`);

export const addToCart = async (formData) => await customerAxiosRequest.post(`${base_url}/customerui/add_to_cart`, formData);

export const getMyCartsProduct = async (_) => await customerAxiosRequest.get(`${base_url}/customerui/collect_my_carts`);

export const getMyCarts = async (search) =>
  await customerAxiosRequest.get(
    `${base_url}/customerui/get_my_cards/${JSON.stringify({
      name: search || "all",
    })}`
  );

export const getMyCartsCOunt = async (_) => await customerAxiosRequest.get(`${base_url}/customerui/collect_my_carts`);

export const updateMyCart = async (formData) => await customerAxiosRequest.put(`${base_url}/customerui/update_my_cards`, formData);

// wishlist

export const addToWishList = async (formData) => await customerAxiosRequest.post(`${base_url}/customerui/add_to_list`, formData);

export const collectMyWishList = async (_) => await customerAxiosRequest.get(`${base_url}/customerui/collect_my_list`);

export const getMyWishList = async (search) =>
  await customerAxiosRequest.get(
    `${base_url}/customerui/get_my_list/${JSON.stringify({
      name: search || "all",
    })}`
  );

export const updateMyWishList = async (formData) => await customerAxiosRequest.put(`${base_url}/customerui/update_my_list`, formData);

// delivery charge

export const getDeliveryforCustomerCharges = async (_) => await customerAxiosRequest.get(`${base_url}/customerui/getall_delivery_charges`);

// Delivery Address

export const getMyDeliveryAddress = async (_) => await customerAxiosRequest.get(`${base_url}/customerui/collectmy_delivery_address`);

// coupon code
export const veriFyCoupon = async (id) => await customerAxiosRequest.get(`${base_url}/customerui/get_coupon_details/${id}`);

// orders
export const MakeOrder = async (formData) => await customerAxiosRequest.post(`${base_url}/customerui/create_order`, formData);

export const getMyOrderDetails = async (_) => await customerAxiosRequest.get(`${base_url}/customerui/get_my_orders`);

export const getSingleOrderDetails = async (id) => await customerAxiosRequest.get(`${base_url}/customerui/get_single_order_details/${id}`);

// track
export const trackMyOrder = async (id) => await customerAxiosRequest.get(`${base_url}/customerui/track_my_order/${id}`);

// delivery address

export const addDeliveryAddress = async (formData) => await customerAxiosRequest.post(`${base_url}/customerui/add_delivery_address`, formData);

export const updateDeliveryAddress = async (formData, id) => await customerAxiosRequest.put(`${base_url}/customerui/updatemy_delivery_address/${id}`, formData);

export const deleteMydeliveryAddress = async (id) => await customerAxiosRequest.delete(`${base_url}/customerui/deletemy_delivery_address/${id}`);

// wishlist

// bulkRequest
export const makeBulkRequests = async (formData) => await customerAxiosRequest.post(`${base_url}/customerui/make_bulk_request`, formData);

export const getMyBulkUploadRequest = async (_) => await customerAxiosRequest.get(`${base_url}/customerui/get_my_bulkuploads`);

// reviews
export const makeReviews = async (formData) => await customerAxiosRequest.post(`${base_url}/customerui/make_reviews`, formData);

export const getVariantReviews = async (id) => await customerAxiosRequest.get(`${base_url}/customerui/get_single_variant_reviews/${id}`);

export const deleteVariantReviews = async (id) => await customerAxiosRequest.delete(`${base_url}/customerui/delete_single_variant_reviews/${id}`);

// comment
export const makeComment = async (formData) => await customerAxiosRequest.post(`${base_url}/customerui/make_comment`, formData);

export const getVariantComments = async (id) => await customerAxiosRequest.get(`${base_url}/customerui/get_single_variant_comments/${id}`);

export const deleteVariantComments = async (id) => await customerAxiosRequest.delete(`${base_url}/customerui/delete_single_variant_comments/${id}`);
