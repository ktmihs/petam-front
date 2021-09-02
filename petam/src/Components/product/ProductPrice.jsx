import React from "react";

const ProductPrice = (props) => {
  const { children } = props;
  return (
    <div className="product-price ">{children}</div>
  );
};

export default ProductPrice;
