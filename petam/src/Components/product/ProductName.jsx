import React from "react";

const ProductName = (props) => {
  const { children } = props;
  return (
    <div className="product-name">{children}</div>
  );
};

export default ProductName;
