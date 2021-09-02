// joo-ju

import "../style.css";
import React, { Component, useEffect, useState } from "react";
import Content from "../Components/Content";
import "../Components/Content.css";
import PostTable from "../Components/table/PostTable";
import PostTableColumn from "../Components/table/PostTableColumn";
import PostTableRow from "../Components/table/PostTableRow";
import PostTableColumnNo from "../Components/table/PostTableColumnNo";
import PostTableColumnTitle from "../Components/table/PostTableColumnTitle";
import dateFormat from "dateformat";
import axios from "axios";
import { useSelector } from "react-redux";
import {useHistory} from "react-router"
function HospitalPostListPage({ location, history, match }) {
 

    const { user, hospital } = useSelector(({ user, hospital }) => ({
      user: user.user,
      hospital: hospital.hospital,
    }));
  const [postData, setpostData] = useState([
    {
      _id: "",
      title: "",
      content: "",
      writer: "",
      enrollTime: "",
    },
  ]);

  const [lastIdx, setLastIdx] = useState(0);

  useEffect(async () => {
    try {
      const res = await axios.get("/api/posts/read/hospital/" + match.params.hospitalName);

      const _postData = await res.data.map(
        (rowData) => (
          setLastIdx(lastIdx + 1),
          {
            _id: rowData._id,
            no: rowData.no,
            view: rowData.view,
            title: rowData.title,
            content: rowData.content,
            writer: rowData.writer,
            // dateformat을 이용하여 년-월-일 로 표현
            enrollTime: dateFormat(rowData.enrollTime, "yyyy-mm-dd"),
          }
        )
      );
      setpostData(postData.concat(_postData));
    } catch (e) {
      console.error(e.message);
    }
  }, []);

  return (
    <Content>
      <h2 className="name">{match.params.hospitalName}   Reviews</h2>

      <div className="col-12 m-auto bg-white">
        <div className="col-12 m-auto pt-3">
          <div className="table table-responsive">
            <PostTable
              headersName={['no', '', '제목', '등록일', '작성자', '조회수']}
            >
              {lastIdx !== 0 ? (
                postData.map(
                  (rowData) =>
                    rowData._id !== '' && (
                      <PostTableRow>
                        <PostTableColumnNo
                          his={history}
                          type="post"
                          _id={rowData._id}
                        >
                          {rowData.no}
                        </PostTableColumnNo>
                        <PostTableColumn
                          his={history}
                          type="post"
                          _id={rowData._id}
                        >        
                        </PostTableColumn>
                        <PostTableColumnTitle
                          his={history}
                          _id={rowData._id}
                          type="post"
                        >
                          {rowData.title}
                        </PostTableColumnTitle>
                        {/* </Link> */}
                        <PostTableColumn
                          his={history}
                          type="post"
                          _id={rowData._id}
                        >
                          {rowData.enrollTime}
                        </PostTableColumn>
                        <PostTableColumn
                          his={history}
                          type="post"
                          _id={rowData._id}
                        >
                          {' '}
                          {rowData.writer}
                        </PostTableColumn>
                        <PostTableColumn
                          his={history}
                          type="post"
                          _id={rowData._id}
                        >
                          {rowData.view}
                        </PostTableColumn>
                      </PostTableRow>          
                    ),
                )
              ) : (
                <PostTableRow>
                  <PostTableColumnNo></PostTableColumnNo>
                  <PostTableColumn></PostTableColumn>
                  <PostTableColumnTitle>
                    작성된 글이 없습니다.
                  </PostTableColumnTitle>
                  <PostTableColumn></PostTableColumn>
                  <PostTableColumn></PostTableColumn>
                  <PostTableColumn></PostTableColumn>
                </PostTableRow>
              )}
            </PostTable>
          </div>
        </div>
      </div>
    </Content>
  );
}
export default HospitalPostListPage;
