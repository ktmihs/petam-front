// 제품 상세설명에서 해당 제품을 판매하는 병원을 표형식으로 출력함

import React, { Component, useEffect, useState } from "react";
import "./ProductHospitalTable.css";
import axios from "axios";
import ProductHospitalTableColumnName from "./ProductHospitalTableColumnName";

const ProductHospitalTable = (props) => {
  const { headersName, hospitalinfo, history } = props;

  return (
    <table className="product-table">
      <thead>
        <tr>
          {headersName &&
            headersName.map((item, index) => {
              return (
                <td className="product-table-header-column" key={index}>
                  {item}
                </td>
              );
            })}
        </tr>
      </thead>
      <tbody>
        {hospitalinfo &&
          hospitalinfo.map((item, index) => {
            const [hospitalData, setHospitalData] = useState([
              {
                _id: "",
                name: "",
                tel: "",
              },
            ]);

            useEffect(async () => {
              try {
                const res = axios
                  .get("/api/hospitals/readone/" + item)
                  .then((response) => {
                    setHospitalData({
                      _id: response.data._id,
                      name: response.data.name,
                      tel: response.data.tel,
                    });
                  });
              } catch (e) {
                console.error(e.message);
              }
            }, []);

            return (
              <tr>
                <ProductHospitalTableColumnName
                  // className="product-table-row"
                  key={index}
                  _id={hospitalData._id}
                  his={history}
                >
                  {hospitalData.name}
                </ProductHospitalTableColumnName>
                <ProductHospitalTableColumnName
                  // className="product-table-row"
                  key={index}
                  _id={hospitalData._id}
                  his={history}
                >
                  {hospitalData.tel}
                </ProductHospitalTableColumnName>
              </tr>
            );
          })}
      </tbody>
    </table>
  );
};

export default ProductHospitalTable;
