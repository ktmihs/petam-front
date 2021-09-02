import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const PostTableRow = (props) => {
  const { _id, children } = props;
  return (
    // <Link class="b link-title" to={`/postView/${_id}`}>
    // <div className="b">
    <tr className="post-table-row">{children}</tr>
    // </div>
    // </Link>
  );
};

export default PostTableRow;
