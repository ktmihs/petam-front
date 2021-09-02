// 댓글 1개를 보여주는 컴포넌트
import React from "react";
import "./Comment.css";

const CommentDetail = ({ children }) => {
  return <p className="comment-detail "> {children}</p>;
};

export default CommentDetail;
