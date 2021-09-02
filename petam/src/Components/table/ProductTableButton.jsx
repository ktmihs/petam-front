import React, { Component, useEffect, useState } from "react";
import axios from "axios";

const ProductTableButton = ({ his, hospitalId, _id, children }) => {
  const [lastIdx, setLastIdx] = useState(0);

  useEffect(async () => {
    try {
      //_id: product의 아이디
      const res = axios
        .get("/api/products/read/hospital/" + _id + "/" + hospitalId)
        .then((response) => {
          setLastIdx(response.data);
        });
    } catch (e) {
      console.error(e.message);
    }
  }, []);

  function toSell() {
    let sellingPrice = Number(prompt("판매가를 입력하세요."));
    if (isNaN(sellingPrice) == true) {
      alert("잘못입력하셨습니다. 다시 입력해주세요 :D");
      return toSell();
    }

    axios
      .put(
        "/api/hospitals/product/" + hospitalId + "/" + _id + "/" + sellingPrice
      )
      .then((response) => {
        setLastIdx(1);
      });

    axios.put("api/products/" + _id + "/" + hospitalId);
  }
  function toNonSell() {
    axios
      .delete("api/products/hospital/" + _id + "/" + hospitalId)
      .then((response) => {
      });
    axios
      .delete("api/hospitals/product/" + hospitalId + "/" + _id)
      .then((response) => {
        setLastIdx(0);
      });
  }

  return lastIdx === 0 ? (
    <div onClick={toSell} className=" product-button-nonsell">
      미판매
    </div>
  ) : (
    <div onClick={toNonSell} value="no" className="product-button-sell">
      판매{" "}
    </div>
  );
};

export default ProductTableButton;
