import React from "react";
import "./Comment.css";

const CommentButtons = ({ children }) => {
  const floatRight = {
    float: "right",
    fontSize: "small",
  };
  const update = {
    marginRight: "15px",
    padding: '0px 7px',
  
  };
  const remove = {
    
    padding: '0px 7px',
  };
 
  


  return (
    <div>
      <div className="comment-buttons  ">
      
      </div>
    </div>
  );
};

export default CommentButtons;
