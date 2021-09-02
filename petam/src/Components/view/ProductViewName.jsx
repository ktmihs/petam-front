import React from "react";
import "./ProductView.css";

const ProductViewName = ({ children }) => {
  return (
    <div>
      {/* <h4 className="product-view-name"> 제품명</h4> */}
      <h2 className="product-view-name">{children}</h2>
    </div>
  );
};

export default ProductViewName;
