import React from "react";

const PostTableColumn = ({ his, type, _id, children }) => {
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
    <td onClick={toPostDetail} className="post-table-column-no">
      {children}
    </td>
  );
};

export default PostTableColumn;
