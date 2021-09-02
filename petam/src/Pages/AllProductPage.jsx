// joo-ju

import '../style.css';
import React, { Component, useEffect, useState } from 'react';
import Content from '../Components/Content';
import '../Components/Content.css';
import PostTable from '../Components/table/PostTable';
import PostTableColumn from '../Components/table/PostTableColumn';
import PostTableRow from '../Components/table/PostTableRow';
import PostTableColumnNo from '../Components/table/PostTableColumnNo';
import PostTableColumnTitle from '../Components/table/PostTableColumnTitle';
import dateFormat from 'dateformat';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';

function AllProductPage({ history, keyword }) {
  const { user, hospital } = useSelector(({ user, hospital }) => ({
    user: user.user,
    hospital: hospital.hospital,
  }));

  // 모든 product를 가지고 있음. search를 할 대 검색에어 아무것도 없을 떄 productData를 보여줌.
  const [productData, setProductData] = useState([]);
  // 검색후 filtering 된 데이터를 저장하는 변수
  const [searchData, setSearchData] = useState([]);
  const [state, setState] = useState(0);

  // 검색 창에 입력시 동작
  const handleChange = (e) => {
    // 입력창이 비어 있어 있을 떄 state를 0으로 설정
    if (keyword.value == '') {
      setState(0);
      setSearchData();
    }
    // 입력창이 비어있지 않다면 state를 1로 설정
    else {
      setState(1);
    }
    const infoName = productData.filter(
      (info) => info.name.indexOf(keyword.value) !== -1,
    );
    setSearchData(infoName);
  };
  const [lastIdx, setLastIdx] = useState(0);

  useEffect(async () => {
    try {
      console.log('--- state : ', state);
      // 데이터를 받아오는 동안 시간 소요 되므로 await로 대기
      // const res = await axios.get("http://localhost:4000/api/posts/list");
      const res = await axios.get('/api/products/read');
      console.log(res);
      const _productData = await res.data.map(
        (rowData) => (
          setLastIdx(lastIdx + 1),
          {
            _id: rowData._id,
            no: rowData.no,
            name: rowData.name,
            price: rowData.price,
            company: rowData.company,
            // dateformat을 이용하여 년-월-일 로 표현
            enrollTime: dateFormat(rowData.enrollTime, 'yyyy-mm-dd'),          
          }
        ),
      );
      setProductData(_productData);
    } catch (e) {
      console.error(e.message);
    }
  }, []);

  return (
    <Content>

      <h2 className="name">All Products</h2>
      <form
        className="headerContainer "
      >
        <input
          placeholder="Search.."
          value={keyword}
          ref={(ref) => (keyword = ref)}
          onChange={handleChange}
          className="search "
        />
        <button type="submit" className="button search-button">
          검색
        </button>
      </form>
      <div className="col-12 m-auto bg-white">
        <div className="col-12 m-auto pt-3">
          <div className="table table-responsive">
            <PostTable
              headersName={['no', '', '제조원', '제품명', '정가', '등록일']}
            >
              {
                state == 0
                  ? // 포스트를 역순으로 출력하고 싶다면 .reverse()를 추가하면 된다
                    productData.reverse().map(
                      (rowData) =>
                        // 최초 선언한 기본값은 나타내지 않음
                        rowData._id !== '' && (
                          <PostTableRow>
                            <PostTableColumnNo
                              his={history}
                              type="product"
                              _id={rowData._id}
                            >
                              {rowData.no}
                            </PostTableColumnNo>
                            <PostTableColumn
                              his={history}
                              type="product"
                              _id={rowData._id}
                            >
                            </PostTableColumn>

                            <PostTableColumnTitle
                              his={history}
                              type="product"
                              _id={rowData._id}
                            >
                              {rowData.company}
                            </PostTableColumnTitle>
                            <PostTableColumn
                              his={history}
                              type="product"
                              _id={rowData._id}
                            >
                              {rowData.name}
                            </PostTableColumn>
                            <PostTableColumn
                              his={history}
                              type="product"
                              _id={rowData._id}
                            >
                              {rowData.price}
                            </PostTableColumn>
                            <PostTableColumn
                              his={history}
                              type="product"
                              _id={rowData._id}
                            >
                              {rowData.enrollTime}
                            </PostTableColumn>

                          </PostTableRow>
                        ),
                    )
                  : searchData.reverse().map(
                      (rowData) =>
                        // 최초 선언한 기본값은 나타내지 않음
                        rowData._id !== '' && (
                          <PostTableRow>
                            <PostTableColumnNo
                              his={history}
                              type="product"
                              _id={rowData._id}
                            >
                              {rowData.no}
                            </PostTableColumnNo>
                            <PostTableColumn
                              his={history}
                              type="product"
                              _id={rowData._id}
                            >
                            </PostTableColumn>
                            <PostTableColumnTitle
                              his={history}
                              type="product"
                              _id={rowData._id}
                            >
                              {rowData.company}
                            </PostTableColumnTitle>
                            <PostTableColumn
                              his={history}
                              type="product"
                              _id={rowData._id}
                            >
                              {rowData.name}
                            </PostTableColumn>
                            <PostTableColumn
                              his={history}
                              type="product"
                              _id={rowData._id}
                            >
                              {rowData.price}
                            </PostTableColumn>
                            <PostTableColumn
                              his={history}
                              type="product"
                              _id={rowData._id}
                            >
                              {rowData.enrollTime}
                            </PostTableColumn>
                          </PostTableRow>
                        ),
                    )
              }
            </PostTable>
          </div>
        </div>
      </div>
    </Content>
  );
}
export default AllProductPage;
