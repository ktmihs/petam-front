import axios from 'axios';
import React, { useState, useEffect } from 'react';
import './main.css';
import SmallAd from './SmallAd';
import Title from './Title';

import { Link } from 'react-router-dom';

// 메인 페이지 병원 관련 content
function MainHospitalContent() {
  const [productData, setProductData] = useState({
    fir: '',
    sec: '',
  });
  let len 
  useEffect(() => {
    // const res = axios.get('/api/products/read');
    // console.log(res.data);
    axios.get('/api/products/read').then((ctx) => {
      len = ctx.data.length;
      console.log("len: ", len)
      setProductData({
        fir: ctx.data[len-1],
        sec: ctx.data[len-2],
      });
      
      console.log('---', ctx, ctx.data.length,len, ctx.data[len-1]);
    });
    console.log("productData : ",productData)
  }, []);

  return (
    <div className="contentBox">
      <div className="TopContent">
        <img className="logo" src="/product.png" alt="none" />
        <Link to="/allproduct">
          <div className="contentName">제품 검색</div>
        </Link>
      </div>
      <div className="BottomContent">
        <div className="adTitle">
          <a>
            <a className="news">[new!]</a> 새로 등록된 제품
          </a>
        </div>

        {productData.fir ? (
          <a className="link" href={`/product/detail/${productData.fir._id}`}>
            <div className="ad">
              [{productData.fir.company}]{productData.fir.name}
              <br />
              {productData.fir.discription}
              <br />
            </div>
          </a>
        ) : null}
        {productData.sec ? (
          <a className="link" href={`/hospital/${productData.sec._id}`}>
            <div className="ad">
              [{productData.sec.company}]{productData.sec.name}
              <br />
              {productData.sec.discription}
              <br />
            </div>
          </a>
        ) : null}
      </div>
    </div>
  );
}

export default MainHospitalContent;
