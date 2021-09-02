import axios from "axios";
import React from "react";

const ProductHospitalTableColumnName = ({ his, _id, children }) => {
  const toHospitalDetail = () => {
    {
      let name;
      const res = axios.get("/api/hospitals/readone/" + _id).then((response) => {
        name = response.data;
        his.push("/hospital/" + response.data.name);
      });
    }
  };
  return (
    <td
      className=" product-table-column"
      onClick={toHospitalDetail}
    >
      {children}
    </td>
  );
};

export default ProductHospitalTableColumnName;
