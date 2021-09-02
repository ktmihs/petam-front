import React from "react";

const PostTableColumnTitle = ({ his, type, _id, children }) => {
  const toPostDetail = () => {
    {
      if (type == "post") {
        his.push("/PostView/" + _id);
      } else if (type == "product") {
        his.push("/product/detail/" + _id);
      }
    }
  };
  return (
    <td onClick={toPostDetail} className="post-table-column-title">
      {children}
    </td>
  );
};

export default PostTableColumnTitle;
