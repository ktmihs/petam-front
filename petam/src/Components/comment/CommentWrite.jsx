// joo-ju

import "../../style.css";
import React, { Component, useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import "../Content.css";
import axios from "axios";
import { useSelector } from 'react-redux';

const CommentWrite = ({ children, pid, comContent }) => {
  const post_id = children;
   const { user, hospital } = useSelector(({ user, hospital }) => ({
     user: user.user,
     hospital: hospital.hospital,
   }));

  const comWrite = () => {
    const content = comContent.value;
    const send_param = {
      post_id: children,
      writer: user.username,
      content: comContent.value,
    };
    axios
      .post("/api/comments", send_param)
      .then((response) => {
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="  col-12 m-auto bg-white">
      <div className="col-12 m-auto ,pt-3">
        <Form class="user" id="WritePostPage" onSubmit={comWrite}>
          <div class="form-group mt-3">
            <div class="float-right">
              <div
                class="comment-write-button"
                variant="primary"
                onClick={comWrite}
                type="submit"
                block
              >
                저장
              </div>
            </div>
          </div>
          <div class="form-group comment-scope ">
            <div>
              <textarea
                type="textarea"
                class="form-control comment-input"
                placeholder="comments…"
                type="submit"
                ref={(ref) => (comContent = ref)}
                value={comContent}
              />
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};
// }
export default CommentWrite;
