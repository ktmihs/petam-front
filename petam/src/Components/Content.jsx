import React from "react"
import "./Content.css"

function Content({ children }) {
  const bodyStyle = {
    background: "white",
    height: "auto",
    width: "90%",
    padding: "10px 5px",
    margin: "4% 5%",
    borderRadius: "20px",
  }

  return( 
    <>
      <link href="http://fonts.googleapis.com/earlyaccess/nanumgothiccoding.css" rel="stylesheet"/>
      <link href="http://fonts.googleapis.com/earlyaccess/jejugothic.css" rel="stylesheet"/>
      <div className="jg" style={bodyStyle}>{children}</div>
    </>
  )
}

export default Content
