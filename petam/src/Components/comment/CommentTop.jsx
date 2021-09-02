import React from "react";
import "./Comment.css";

const CommentTop = ({ writer, time, children }) => {
  const floatRight = {
    float: "right",
  };
  const floatLeft = {
    float: "left",
  };
  return (
    <div>
      <div className="comment-top ">
        <p className="comment-top-writer" style={floatLeft}>
          {writer}
        </p>
        <p className="comment-top-time " style={floatRight}>
          {time}
        </p>
      </div>
    </div>
  );
};

export default CommentTop;
