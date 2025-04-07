import { Avatar, Card, Spin } from "antd";
import React, { useEffect, useState } from "react";
import { getMyBulkUploadRequest } from "../../../helper/api_helper";
import _ from "lodash";
import { getCurrentVariant } from "../../../helper/filter_helper";

const BulkPurchase = () => {
  const [bulkRequest, setBulkRequest] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      const result = await getMyBulkUploadRequest();
      setBulkRequest(_.get(result, "data.data", []));
    } catch (err) {}
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Spin spinning={false}>
      <div className="flex items-center justify-between">
        <h1 className="font-Poppins">My Bulk Request</h1>{" "}
        
      </div>
      <div className="flex items-center flex-wrap gap-2">
          {bulkRequest.map((res, index) => {
            let variant = getCurrentVariant(
                _.get(res, 'product_id.product_variants', []),
                _.get(res, 'product_variant_id', ''),
              );
            return (
              <Card
                key={index}
                style={{
                  width: 300,
                  marginTop: 16,
                }}
                loading={loading}
              >
                <Card.Meta
                  avatar={
                    <Avatar src={_.get(res, 'product_id.product_images[0][0]', '')} />
                  }
                  title={_.get(res, 'product_id.product_name', '')}
                  description={_.get(res, 'count', '')}
                />
              </Card>
            );
          })}
        </div>
    </Spin>
  );
};

export default BulkPurchase;
