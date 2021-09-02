import React from "react";

const ProductImage = (props) => {
  const { children } = props;
  console.log(children)
  return (
    <>
      {
        children && children!==''?
        <img style={{width:'150px', height:'150px'}} src={'../'+children.split('\\')[2]} alt="image"/>
        :
        <img src={'../no_img.jpg'}/>
      }
    </>
  );
};

export default ProductImage;
