import React from "react";
import { useHistory, useLocation } from "react-router";

const PostTableColumn = ({ his, type, _id, children }) => {
  const toDetail = () => {
    {
      if (type == "post") {
        his.push("/PostView/" + _id);
      } else if (type == "product") {
        his.push("/product/detail/" + _id);
      }
    }
  };
  return (

    <td
      className=" post-table-column"
      onClick={toDetail}
    >
      {children}
    </td>
  );
};

export default PostTableColumn;
