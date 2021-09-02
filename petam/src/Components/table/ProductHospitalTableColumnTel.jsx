import React from "react";

const ProductHospitalColumnTel = ({ his, type, _id, children }) => {
  const toPostDetail = () => {
    {
      if (type == "post") {
        his.push("/PostView/" + _id);
      } else if (type == "product") {
        his.push("/product/detail/" + _id);
      }
    }
  };
  return (
    <td onClick={toPostDetail} className="product-table-column-title">
      {children}
    </td>
  );
};

export default ProductHospitalColumnTel;
