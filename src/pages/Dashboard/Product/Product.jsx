import { useEffect, useState } from "react";
import DashboardHeader from "../../../component/DashboardHeader";
import { IconHelper } from "../../../helper/IconHelper";
import {
  Form,
  Input,
  Image,
  Button,
  Select,
  Divider,
  Table,
  Modal,
  message,
} from "antd";
import { requiredRules } from "../../../helper/form_validation";
import BasicInfo from "./forms/BasicInfo";
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  ShareAltOutlined,
} from "@ant-design/icons";
import ProductImages from "./forms/ProductImages";
import CategoryInfo from "./forms/CategoryInfo";
import { getProductSubCategoryData } from "../category/specialApi";
import _ from "lodash";
import {
  getCategoryName,
  getProductCategoryCount,
  getProductCategoryName,
  getSubCategoryCount,
  getSubCategoryName,
} from "../../../helper/filter_helper";
import {
  ErrorNotification,
  successMessage,
} from "../../../helper/notification_helper";
import {
  createProduct,
  DeleteProduct,
  getAllBrands,
  getAllFabric,
  updateProduct,
  updateProductRequestStatus,
} from "../../../helper/api_helper";
import { MdDoubleArrow } from "react-icons/md";

import AllProducts from "./pages/AllProducts";

import moment from "moment";

import { useSelector } from "react-redux";
import { GrCircleInformation } from "react-icons/gr";
import ProductVariantInfo from "./forms/ProductVariantInfo";
import { FaExternalLinkAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Product = () => {
  const [open, setOpen] = useState(false);
  const [images, setImgUrl] = useState([]);

  const role = useSelector((data) => data);

  const navigate = useNavigate();

  let currentRole = _.get(role, "role.currentRole.role", "");

  const [form] = Form.useForm();
  const [form1] = Form.useForm();

  const [category, setCatgory] = useState([]);
  const [subCategory, setSubCatgory] = useState([]);
  const [productCategory, setProductCatgory] = useState([]);

  // edit
  const [id, setId] = useState("");

  //   filters
  const [filterSubCategory, setFilterSubCatgory] = useState([]);
  const [filterProductCategory, setFilterProductCatgory] = useState([]);

  // resuest
  const [openRequest, closeRequest] = useState(false);
  const [requestStatus, setRequestStatus] = useState("Accepted");
  const [requestId, setRequestId] = useState("");
  const [brand, setAllBrand] = useState([]);
  const [fabric, setAllFabric] = useState([]);

  // dummy
  const [dummy, setDummy] = useState(false);

  const fetchData = async () => {
    try {
      const result = await Promise.all([
        getProductSubCategoryData(),
        getAllBrands(),
        getAllFabric(),
      ]);
      setCatgory(_.get(result, "[0].[0].data.data", []));
      setSubCatgory(_.get(result, "[0].[1].data.data", []));
      setProductCatgory(_.get(result, "[0].[2].data.data", []));
      setAllBrand(_.get(result, "[1].data.data", []));
      setAllFabric(_.get(result, "[2].data.data", []));
    } catch (err) {
      console.error(err);
    }
  };

  // const fetchMyproducts = async () => {
  //   try {
  //     setLoading(true);
  //     const result = await getMyProducts();
  //     setMyProducts(_.get(result, "data.data", []));
  //   } catch (err) {
  //     ErrorNotification(err);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  useEffect(() => {
    fetchData();
    // fetchMyproducts();
  }, [dummy]);

  const handleCategoryChange = (value) => {
    setFilterSubCatgory(getSubCategoryCount(value, subCategory));
    setFilterProductCatgory([]);
    form.setFieldValue({ product_sub_category_name: "" });
    form.setFieldValue({ product_product_category_name: "" });
  };

  const handleSubcategoryChange = (values) => {
    setFilterProductCatgory(getProductCategoryCount(values, productCategory));
    form.setFieldValue({ product_product_category_name: "" });
  };

  const handleCancel = () => {
    setOpen(false);
    setDummy(!dummy);
    setFilterSubCatgory([]);
    setFilterProductCatgory([]);
    setImgUrl([]);
    setId();
    form.resetFields();
  };

  const handleFinish = async (values) => {
    try {
      values.product_category_nameactual = _.get(
        getCategoryName(values.product_category_name, category),
        "[0].category_name",
        ""
      );
      values.product_sub_category_nameactual = _.get(
        getSubCategoryName(values.product_sub_category_name, subCategory),
        "[0].sub_category_name",
        ""
      );
      values.product_product_category_nameactual = _.get(
        getProductCategoryName(
          values.product_product_category_name,
          productCategory
        ),
        "[0].product_category_name",
        ""
      );
      values.product_images = images;

      let result = "";
      if (id) {
        result = await updateProduct(values, id);
      } else {
        result = await createProduct(values);
      }

      successMessage(_.get(result, "data.message", ""));
      handleCancel();
    } catch (err) {
      console.log(err);
      ErrorNotification(err);
    }
  };

  const handleCLick = (id) => {
    window.open(`/produt_details/${id}`);
  };

  const columns = [
    Table.EXPAND_COLUMN,
    Table.EXPAND_COLUMN,
    {
      title: "Images",
      dataIndex: "product_images",
      render: (data) => {
        let paths = data.map((res) => {
          return res[0];
        });
        return (
          <Image.PreviewGroup className="!w-[50px] !h-[50px]" items={paths}>
            <Image src={data[0]} className="!w-[30px] !h-[30px]" />
          </Image.PreviewGroup>
        );
      },
    },
    {
      title: "Product Name",
      dataIndex: "product_name",
      render: (data) => {
        return (
          <div className="capitalize w-[200px] !text-ellipsis !line-clamp-1">
            {data}
          </div>
        );
      },
    },

    {
      title: "Category",
      dataIndex: "product_category_nameactual",
    },
    {
      title: "Sub Category",
      dataIndex: "product_sub_category_nameactual",
    },
    {
      title: "Product Category",
      dataIndex: "product_product_category_nameactual",
    },
    {
      title: "Request",
      dataIndex: "product_approval_status",
      render: (status, all_value) => {
        return (
          <div>
            <div
              className={`${
                status === "pending"
                  ? "text-yellow-600"
                  : status === "Rejected"
                  ? "text-red-500"
                  : "text-secondary"
              } !font-Poppins capitalize flex items-center gap-x-2`}
            >
              {status}
              <div className="">
                {currentRole === "admin" ? (
                  <>
                    <EditOutlined
                      onClick={() => {
                        handleEdit(all_value);
                      }}
                    />
                  </>
                ) : (
                  <GrCircleInformation
                    onClick={() => {
                      message.warning(
                        _.get(all_value, "product_approval_status_comment", "")
                      );
                    }}
                    className={`${
                      status === "Rejected" ? "visible" : "invisible"
                    } cursor-pointer text-yellow-600`}
                  />
                )}
              </div>
            </div>
          </div>
        );
      },
    },
    {
      title: "Requested Time",
      dataIndex: "createdAt",
      render: (status) => {
        return (
          <div className="!font-Poppins">{moment(status).format("LLLL")}</div>
        );
      },
    },

    {
      align: "center",
      title: "Variants Count",
      dataIndex: "product_variants",
      render: (value) => {
        return <div className="center_div">{value?.length}</div>;
      },
    },

    {
      title: "Delete",
      dataIndex: "_id",
      align: "center",
      render: (status) => {
        return (
          <DeleteOutlined
            onClick={() => {
              handleDelete(status);
            }}
            className="cursor-pointer text-pink-600"
          />
        );
      },
    },

    {
      title: "Edit",
      dataIndex: "_id",
      align: "center",
      render: (status, alldata) => {
        return (
          <EditOutlined
            onClick={() => {
              handleEdit(alldata);
            }}
            className="cursor-pointer text-secondary"
          />
        );
      },
    },
    {
      align: "center",
      title: "View",
      dataIndex: "_id",
      render: (data) => {
        return (
          <FaExternalLinkAlt
            onClick={() => {
              handleCLick(data);
            }}
            className="cursor-pointer  !text-secondary !text-[10px] hover:!text-primary"
          />
        );
      },
    },
  ];

  const handleEdit = (data) => {
    setId(data._id);
    setOpen(true);
    form.setFieldsValue(data);
    setImgUrl(data.product_images);
    handleCategoryChange(data.product_category_name);
    handleSubcategoryChange(data.product_sub_category_name);
  };

  // delete product
  const handleDelete = async (id) => {
    try {
      const result = await DeleteProduct(id);
      successMessage(_.get(result, "data.message", ""));
      handleCancel();
    } catch (err) {
      ErrorNotification(err);
    }
  };

  // request
  const handleRequestFinish = async (values) => {
    try {
      if (
        Number(values.product_selling_price) > Number(values.mogo_selling_price)
      ) {
        return message.error(
          `The Mogo Selling Price needs to be Higher than the Vendor Final Selling  Price by a margin of ${values.product_selling_price} or more not ${values.mogo_mrp_price}`
        );
      }

      const formData = {
        ...values,
        product_id: requestId,
      };
      const result = await updateProductRequestStatus(formData);
      successMessage(_.get(result, "data.message", ""));

      handleCancelRequest();

      fetchData();
    } catch (err) {
      ErrorNotification(err);
    }
  };

  const handleCancelRequest = () => {
    closeRequest(false);
    setRequestStatus("Accepted");
    setRequestId("");
    setDummy(!dummy);
    form1.resetFields();
  };

  // const TabItem = [
  //   {
  //     key: 1,
  //     label: "All Info",
  //     children: (
  //       <AllProducts columns={columns} dummy={dummy} role={currentRole} />
  //     ),
  //   },
  //   {
  //     key: 2,
  //     label: "Active / In-Active ",
  //     children: <ActiveProducts columns={columns} dummy={dummy} />,
  //   },
  //   {
  //     key: 3,
  //     label: "Stock Details",
  //     children: <OutofStockProducts columns={columns} dummy={dummy} />,
  //   },
  //   {
  //     key: 4,
  //     label: "Product Request",
  //     children: <PendingProducts columns={columns} dummy={dummy} />,
  //   },
  //   {
  //     key: 5,
  //     label: "Product Prices",
  //     children: (
  //       <ProductPrices
  //         currentRole={currentRole}
  //         dummy={dummy}
  //         handleDelete={handleDelete}
  //       />
  //     ),
  //   },
  // ];

  // // product type controlS
  // const handleProductTypeChange = (e) => {
  //   setTypeofProduct(e);
  // };

  // // initial variant control

  // let initialValue = {
  //   product_variants: [
  //     {
  //       images: [],
  //       stock_status: "IN-STOCK",
  //       stock_count: "",
  //       selling_price: "",
  //       selling_quantity: "",
  //       product_dynamic_id: Date.now(),
  //     },
  //   ],
  // };

  // const handleUploadImages = (source, key) => {
  //   try {
  //     console.log(source, key);
  //     console.log(form.getFieldValue("product_variants"));
  //   } catch (err) {
  //     ErrorNotification(err);
  //   }
  // };

  // const handleVendorSellingPriceChange = (value) => {
  //   try {
  //     if (value === "mrp") {
  //       form.setFieldsValue({
  //         product_selling_price: "",
  //       });
  //     }
  //     // product_discount
  //     let mrp = form.getFieldValue("product_original_price");
  //     let selling = form.getFieldValue("product_selling_price");

  //     if (Number(mrp) < Number(selling)) {
  //       form.setFieldsValue({
  //         product_selling_price: "",
  //       });
  //       return message.error(
  //         `The Product Selling Price needs to be Lower than the Product MRP  Price by a margin of ${mrp} or less not ${selling}`
  //       );
  //     }
  //     form.setFieldsValue({
  //       product_discount: "",
  //     });
  //     let discount_price = mrp - selling;

  //     let final_discount = (discount_price / mrp) * 100;

  //     form.setFieldsValue({
  //       product_discount: final_discount.toFixed(1),
  //     });

  //     setDummy(!dummy);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const handleMogoSellingPriceChange = (value) => {
    try {
      if (value === "mrp") {
        form1.setFieldsValue({
          mogo_selling_price: "",
        });
        return setDummy(!dummy);
      }

      let price = form1.getFieldValue("mogo_mrp_price");
      let mogo_selling = form1.getFieldValue("mogo_selling_price");

      if (Number(price) < Number(mogo_selling)) {
        form1.setFieldsValue({
          mogo_selling_price: "",
        });
        return message.error(
          `The Product Selling Price needs to be Lower than the Mogo MRP  Price by a margin of ${price} or less not ${mogo_selling}`
        );
      }

      let discount = price - mogo_selling;
      let final_discount = (discount / price) * 100;

      form1.setFieldsValue({
        mogo_discount_price: final_discount.toFixed(1),
      });
      setDummy(!dummy);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="dashboard_header_div">
      <DashboardHeader
        name="Products"
        Icon={IconHelper.productIcon}
        open={open}
        setOpen={setOpen}
        vendorShown={true}
        adminShown={false}
      />
      {open ? (
        <Form
          // initialValues={initialValue}
          layout="vertical"
          form={form}
          className="rounded-lg !w-full"
          onFinish={handleFinish}
        >
          <div className="flex flex-col gap-y-4">
            <div className="items-center flex gap-x-2 justify-end pt-4">
              <Form.Item>
                <Button
                  htmlType="submit"
                  className="!bg-primary !text-white !h-[30px] !text-sm"
                >
                  {id ? "Update" : "Send Product Add Request"}
                </Button>
              </Form.Item>
              <Form.Item>
                <Button
                  className=" !h-[30px] !text-sm !bg-transparent hover:!bg-primary hover:!border-transparent hover:!text-white !text-primary"
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
              </Form.Item>
            </div>
            {currentRole === "admin" && (
              <d>
                <div className="product_box_heading">
                  <MdDoubleArrow className="icon" /> Product Approval Info
                </div>

                <div className="bg-white p-5 rounded-lg mt-2">
                  <Form.Item
                    label="Product Approval Status"
                    rules={[requiredRules("Product Approval Status")]}
                    name="product_approval_status"
                    initialValue={"Accepted"}
                  >
                    <Select
                      onChange={(e) => {
                        setRequestStatus(e);
                      }}
                      className="!antd_input2"
                      placeholder="Select Product Approval Status"
                    >
                      <Select.Option value="Accepted">Accepted</Select.Option>
                      <Select.Option value="Rejected">Rejected</Select.Option>
                    </Select>
                  </Form.Item>
                  {requestStatus === "Rejected" && (
                    <Form.Item
                      label="Comment's For Rejecting"
                      name="product_approval_status_comment"
                      rules={[requiredRules("Enter Comment's For Rejecting")]}
                    >
                      <Input.TextArea placeholder="Enter Comments For Rejecting" />
                    </Form.Item>
                  )}
                </div>
              </d>
            )}
            <div className="product_box_heading">
              <MdDoubleArrow className="icon" /> Product Basic Info
            </div>
            <div className="product_boxes">
              <BasicInfo
                role={currentRole}
                category={category}
                filterSubCategory={filterSubCategory}
                filterProductCategory={filterProductCategory}
                handleCategoryChange={handleCategoryChange}
                handleSubcategoryChange={handleSubcategoryChange}
              />
            </div>
            <>
              <div className="product_box_heading">
                <MdDoubleArrow className="icon" /> Product Images
              </div>
              <div className="product_boxes">
                <ProductImages
                  images={images}
                  setImgUrl={setImgUrl}
                  role={currentRole}
                />
              </div>
            </>
            <div className="product_box_heading">
              <MdDoubleArrow className="icon" /> Product Category Info
            </div>
            <div className="product_boxes">
              <CategoryInfo
                role={currentRole}
                category={category}
                filterSubCategory={filterSubCategory}
                filterProductCategory={filterProductCategory}
                handleCategoryChange={handleCategoryChange}
                handleSubcategoryChange={handleSubcategoryChange}
                brand={brand}
                fabric={fabric}
              />
            </div>
            {/* product variant start */}
            <div className="product_box_heading">
              <MdDoubleArrow className="icon" /> Product Variant Info
            </div>
            <div className="product_boxes">
              <ProductVariantInfo role={currentRole} />
            </div>
            {/* product variant end */}

            {/* <div className="product_box_heading">
              <MdDoubleArrow className="icon" /> Product Inventory Info
            </div>
            <div className="product_boxes">
              <ProductInentoryInfo />
            </div> */}
            {/* <div className="product_box_heading">
              <MdDoubleArrow className="icon" /> Product Price Info
            </div>
            <div className="product_boxes">
              <ProductPriceInfo
                className="icon"
                handleVendorSellingPriceChange={handleVendorSellingPriceChange}
              />
            </div> */}
          </div>
        </Form>
      ) : (
        <>
          {/* <Tabs
            destroyInactiveTabPane
            onChange={() => {
              setLoading(true);
            }}
            defaultActiveKey="1"
            items={TabItem}
          /> */}
          <AllProducts columns={columns} dummy={dummy} role={currentRole} />
        </>
      )}
      <Modal
        title="Accepted or Reject Request"
        open={openRequest}
        footer={false}
        destroyOnClose
        onCancel={handleCancelRequest}
      >
        <Form
          form={form1}
          layout="vertical"
          className="flex flex-col gap-y-4"
          onFinish={handleRequestFinish}
        >
          <Form.Item
            label="Select Result"
            rules={[requiredRules("please select result")]}
            name="product_approval_status"
            initialValue={"Accepted"}
          >
            <Select
              onChange={(e) => {
                setRequestStatus(e);
              }}
              className="!antd_input2"
              placeholder="Select Result"
            >
              <Select.Option value="Accepted">Accepted</Select.Option>
              <Select.Option value="Rejected">Rejected</Select.Option>
            </Select>
          </Form.Item>
          {requestStatus === "Rejected" && (
            <Form.Item
              label="Comment's For Rejecting"
              name="product_approval_status_comment"
              rules={[requiredRules("Enter Comment's For Rejecting")]}
            >
              <Input.TextArea placeholder="Enter Comments For Rejecting" />
            </Form.Item>
          )}

          {requestStatus === "Accepted" && (
            <>
              <Form.Item
                label="Vendor Final Selling Price"
                name="product_selling_price"
              >
                <Input
                  disabled
                  prefix="₹"
                  className="!border-transparent antd_input2 !w-full"
                />
              </Form.Item>

              <Divider type="horizontal" plain>
                Enter Mogo Prices
              </Divider>
              {/*  */}
              <Form.Item
                label="Mogo MRP Price"
                name="mogo_mrp_price"
                rules={[requiredRules("Enter Mogo MRP Price")]}
              >
                <Input
                  type="number"
                  onChange={() => {
                    handleMogoSellingPriceChange("mrp");
                  }}
                  placeholder="Enter Mogo MRP Price"
                  prefix="₹"
                  className="antd_input2 !w-full"
                />
              </Form.Item>

              <Form.Item
                label="Mogo Final Selling Price"
                name="mogo_selling_price"
                rules={[requiredRules("Enter Mogo Selling Price")]}
              >
                <Input
                  onChange={handleMogoSellingPriceChange}
                  placeholder="Enter Mogo Selling Price"
                  prefix="₹"
                  className="antd_input2 !w-full"
                />
              </Form.Item>
              <Form.Item label="Mogo Discount %" name="mogo_discount_price">
                <Input
                  disabled
                  type="number"
                  max={90}
                  min={0}
                  placeholder="Enter Mogo Discount %"
                  suffix="%"
                  className="antd_input2 !w-full"
                />
              </Form.Item>
            </>
          )}
          <Form.Item>
            <Button htmlType="submit" className="!primary_btn">
              Send
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Product;
