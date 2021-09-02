import React, { Component, useEffect, useState } from "react";
import "./ProductHospitalTable.css";
import axios from "axios";
import ProductHospitalTableColumnName from "./ProductHospitalTableColumnName";
const ProductHospitalTableRow = (props) => {
  const { headersName, children } = props;

  {
    headersName &&
      headersName.map((item, index) => {
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
              .get("/api/hospitals/read/" + item)
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
              key={index}
            >
              {hospitalData.name}
            </ProductHospitalTableColumnName>
            <ProductHospitalTableColumnName
              key={index}
            >
              {hospitalData.tel}
            </ProductHospitalTableColumnName>
            <td
              className=" product-table-column"
            >
              {children}
            </td>
            <td
              className=" product-table-column"
            >
              {children}
            </td>
          </tr>
        );
      });
  }
};

export default ProductHospitalTableRow;
