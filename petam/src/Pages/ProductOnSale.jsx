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
import ProductTableButton from '../Components/table/ProductTableButton';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';

function ProductOnSale({ location, history, keyword }) {
  const { user, hospital } = useSelector(({ user, hospital }) => ({
    user: user.user,
    hospital: hospital.hospital,
  }));
  // 모든 product를 가지고 있음. search를 할 대 검색에어 아무것도 없을 떄 productData를 보여줌.
    const [productData, setProductData] = useState([
        {
            _id: "",
            price: "",
            company: "",
            enrollTime: "",
            discription: "",
            name: "",
       } 
  ]);
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
    const hospitalId = hospital._id; 
let productsInfo
  useEffect(async () => {
    try {
        console.log('--- state : ', state);
        console.log("hospitalId", hospitalId)
      // 데이터를 받아오는 동안 시간 소요 되므로 await로 대기
        
      const hospitalinfo = await axios.get('/api/hospitals/readone/' + hospitalId);
        productsInfo = hospitalinfo.data.products;
    } catch (e) {
      console.error(e.message);
    }
  }, []);

  return (
    <Content>
      <h2 className="name">판매중인 제품</h2>
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
              headersName={['no', '', '제조원', '제품명', '정가', '등록일', '']}
            >
              {
                                  productsInfo
                                  
                                  ? // 포스트를 역순으로 출력하고 싶다면 .reverse()를 추가하면 된다
                                  productsInfo.map((item, index) => {
                                      console.log("item == ", item)

                                      useEffect(async () => {
              try {
                const res = axios
                  .get("/api/products/readone/" + item)
                  .then((response) => {
                    setProductData({
                      _id: response.data._id,
                      name: response.data.name,
                      price: response.data.price,
                      enrollTime: response.data.enrollTime,
                      company: response.data.company,
                    });
                  });
              } catch (e) {
                console.error(e.message);
              }
                                      }, []);
                                      return (
                                        <PostTableRow>
                                          <PostTableColumnNo
                                            his={history}
                                            type="product"
                                            _id={productData._id}
                                          >
                                            {rowData.no}
                                          </PostTableColumnNo>
                                          <PostTableColumn
                                            his={history}
                                            type="product"
                                            _id={productData._id}
                                          >
                                          </PostTableColumn>
                                          <PostTableColumnTitle
                                            his={history}
                                            type="product"
                                            _id={productData._id}
                                          >
                                            {productData.company}
                                          </PostTableColumnTitle>
                                          <PostTableColumn
                                            his={history}
                                            type="product"
                                            _id={productData._id}
                                          >
                                            {productData.name}
                                          </PostTableColumn>
                                          <PostTableColumn
                                            his={history}
                                            type="product"
                                            _id={productData._id}
                                          >
                                            {productData.price}
                                          </PostTableColumn>
                                          <PostTableColumn
                                            his={history}
                                            type="product"
                                            _id={productData._id}
                                          >
                                            {productData.enrollTime}
                                          </PostTableColumn>

                                          <ProductTableButton
                                            his={history}
                                            hospitalId={hospitalId}
                                            _id={productData._id} //제품의 _id
                                          >
                                          </ProductTableButton>
                                        </PostTableRow>
                                      );
                                  })
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

                            <ProductTableButton
                              his={history}
                              hospitalId={hospitalId}
                              _id={rowData._id} 
                            >
                            </ProductTableButton>
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
// }
export default ProductOnSale;
