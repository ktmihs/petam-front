// 병원 평점 등록

import "../style.css";
import React, { Component } from "react";
import { FaStar } from "react-icons/fa";
import { Button, Form } from "react-bootstrap";
import "../Components/Content.css";
import axios from "axios";
axios.defaults.withCredentials = true;
const headers = { withCredentials: true };

const NewPost = () => {

  return (
    <Form>
      // other input elements
      <div className={styles.rating}>
        <p>Rating</p>
        <div>
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStar />
        </div>
      </div>
    </Form>
  );
};
