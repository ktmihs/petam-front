//product 제품 설명
import React from "react";
import "./ProductView.css";
const scope = {
  width: "45%",
  // border: "2px solid orange",
  minHeight: "200px",
  float: "right",
};
const floatRight = {
  float: "right",
};
const ProductViewCompanyAndPrice = ({ company, price, children }) => {
  return (
    <div style={scope}>
      <div className="   product-title">제조원</div>
      <div className="product-detail">{company}</div>

      <div className="  product-title ">정가</div>
      <div className="product-detail">{price}</div>
    </div>
  );
};

export default ProductViewCompanyAndPrice;
