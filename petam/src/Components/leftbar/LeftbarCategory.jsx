// import React from "react";
import "./Leftbar.css";
import React, { Component, useState } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Form } from "react-bootstrap";
import { Motion, spring } from "react-motion";

const styles = {
  menu: {
    // justifyContent: "center",
    backgroundColor: "#f0f0f0",
    overflow: "hidden",
    borderTop: "3px solid #f0f0f0",
    padding: "0px 30px",
    // width: "90%",
    marginRight: "10px",
    marginLeft: "10px",
    borderRadius: "10px",
  },
  selection: {
    padding: 10,
    justifyContent: "center",
    margin: 0,
    borderBottom: "1px solid #ededed",
    // border: "1px solid red",
  },
  button: {
    color: "white",
    fontSize: "small",

    fontWeight: "bolder",
    textDecoration: "none",
    // padding: "15px 20px",
    paddingLeft: "20px",
    paddingTop: "20px",
    paddingBottom: "20px",
    // justifyContent: "center",
    // alignItems: "center",
    display: "flex",
    cursor: "pointer",
  },
};

const LeftbarCategory = (props) => {
  // h는 selection 1개당 46px
  // 만약 selection이 3개라면 46*3 + 3해줘야 함.
  const { selections, children, h } = props;
  const [state, setstate] = useState({
    height: 0,
  });
  const animate = () => {
    setstate((state) => ({
      height: state.height === h ? 0 : h,
    }));
  };
  return (
    <div>
      <div style={styles.button} onClick={animate}>
        {children}
      </div>

      <Motion style={{ height: spring(state.height) }}>
        {({ height }) => (
          <div style={Object.assign({}, styles.menu, { height })}>
            {selections.map((item, index) => {
              return (
                // {
                //   links.map((l, idx) => {
                //     return (
                //      <Link key={idx} to={links}></Link>
                //   );
                // })}
                <Link className="link" key={index} to={item.address}>
                  <p style={styles.selection} key={index}>
                    {item.title}
                  </p>
                </Link>
              );
            })}
          </div>
        )}
      </Motion>
    </div>
  );
};

export default LeftbarCategory;
