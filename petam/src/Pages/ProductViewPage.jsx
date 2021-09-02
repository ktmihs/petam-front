// joo-ju

import "../style.css";
import React, { useEffect, useState } from "react";
import Content from "../Components/Content";
import "../Components/button/Button.css";
import "../Components/Content.css";
import "../Components/comment/Comment.css";
import { Link } from "react-router-dom";
import dateFormat from "dateformat";
import axios from "axios";
import ProductViewImage from "../Components/view/ProductViewImage";
import ProductViewName from "../Components/view/ProductViewName";
import ProductViewDetail from "../Components/view/ProductViewDetail";
import ProductViewCompanyAndPrice from "../Components/view/ProductViewCompanyAndPrice";
import ProductHospitalTable from "../Components/table/ProductHospitalTable";

axios.defaults.withCredentials = true;
const headers = { withCredentials: true };

function ProductViewPage(props) {
  const _id = props.match.params._id;
  const [productData, setProductData] = useState([
    {
      _id: "",
      name: "",
      price: "",
      company: "",
      discription: "",
      hospitals: [],
      enrollTime: "",
      image:""
    },
  ]);

  useEffect(async () => {
    try {
      const res = await axios.get("/api/products/readone/" + _id);

      setProductData({
        _id: res.data._id,
        no: res.data.no,
        name: res.data.name,
        company: res.data.company,
        price: res.data.price,
        discription: res.data.discription,
        hospitals: res.data.hospitals,
        // dateformat을 이용하여 년-월-일 시:분:초 로 표현
        enrollTime: dateFormat(res.data.enrollTime, "yyyy-mm-dd hh:mm:ss"),
        image:res.data.image
      });
    } catch (e) {
      console.error(e.message);
    }
  }, []);

  const [lastIdx, setLastIdx] = useState(0);
  // 댓글 작성 함수들

  const handleSubmit = (e) => {
    alert("An essay was submitted: " + this.state.value);
    e.preventDefault();
  };

  const writer = "joo-ju";

  return (
    <div>
      <Content className="">
        <ProductViewName class="">{productData.name}</ProductViewName>
        <hr className="w-90" />
        <div className="col-12 m-auto bg-white" style={scope}>
          <ProductViewImage image={productData.image}></ProductViewImage>
          <ProductViewCompanyAndPrice
            company={productData.company}
            price={productData.price}
          ></ProductViewCompanyAndPrice>
          <ProductViewDetail>{productData.discription}</ProductViewDetail>
          <Link style={{ textDecorationLine: 'none' }} to="/productlistpage">
            <div class="tolist">목록으로</div>
          </Link>
        </div>
      </Content>
      <Content>
        <h2 className="name">판매중인 병원</h2>
        <ProductHospitalTable
          headersName={['병원명', '전화번호']}
          history={props.history}
          hospitalinfo={productData.hospitals}
        />
      </Content>
    </div>
  );
}
export default ProductViewPage;

const scope = {
  minHeight: "300px",
};
