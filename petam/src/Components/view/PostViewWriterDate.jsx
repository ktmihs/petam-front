import React from "react";
import "./PostView.css";

const PostTable = (props) => {
  const { writer, date, children } = props;

  return (
    <div className="">
      <div className=" post-view-writer-date">
        {writer} ⎢ {date}
      </div>
    </div>
  );
};

export default PostTable;
