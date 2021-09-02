//product 제품 설명
import React from "react";
import "./ProductView.css";
const scope = {
  width: "100%",
  //   border: "2px solid orange",
  minHeight: "350px",
};
const ProductViewDetail = ({ children }) => {
  return (
    <div style={scope}>
      <div className=" product-title">제품 설명</div>
      <div className="product-detail">{children}</div>
    </div>
  );
};

export default ProductViewDetail;
