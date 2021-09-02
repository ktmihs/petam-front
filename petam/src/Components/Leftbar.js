import "../style.css";
import "../Components/leftbar/Leftbar.css";
import React, { Component } from "react";
import { useSelector, useDispatch } from 'react-redux';
import LeftbarCategory from "./leftbar/LeftbarCategory";

function Leftbar() {
  // 파일 다 따로 만들어서 해보기
      const { user, hospital } = useSelector(({ user, hospital }) => ({
        user: user.user,
        hospital: hospital.hospital,
      }));
    
    return (
      <div className="">
        <ul
          class="leftbar-scope navbar-nav sidebar-color sidebar sidebar-dark accordion"
          id="accordionSidebar"
        >
          <LeftbarCategory
            selections={[
              {
                title: '병원검색',
                address: '/hospital',
              },
            ]}
            h={47}
          >
            Hospital
          </LeftbarCategory>
          <LeftbarCategory
            selections={[
              {
                title: '전제 제품',
                address: '/allproduct',
              },
            ]}
            h={47}
          >
            Product
          </LeftbarCategory>
          <LeftbarCategory
            selections={[
              {
                title: '전체 글',
                address: '/postlistpage',
              },
            ]}
            h={47}
          >
            Community
          </LeftbarCategory>
          {user && (
            <LeftbarCategory
              selections={[
                {
                  title: '내 정보',
                  address: '/modify/' + user._id,
                },
                {
                  title: '내가 쓴 글',
                  address: '/mypostlistpage',
                },
                {
                  title: '내 진료 내역',
                  address: '/reservation',
                },
              ]}
              h={145}
            >
              My Page
            </LeftbarCategory>
          )}
          {hospital && (
            <LeftbarCategory
              selections={[
                {
                  title: '병원 정보',
                  address: '/modify/' + hospital._id,
                },
                {
                  title: '진료 내역',
                  address: '/hspreservation',
                },
                {
                  title: '판매 제품 변경',
                  address: '/productlistpage',
                },
                {
                  title: '새 제품 등록',
                  address: '/writeproductpage',
                },
              ]}
              h={188}
            >
              My Page
            </LeftbarCategory>
          )}
        </ul>
      </div>
    );
}
const styles = {
  menu: {
    backgroundColor: "#f0f0f0",
    overflow: "hidden",
    borderTop: "3px solid #f0f0f0",
    padding: "0px 30px",
    marginRight: "10px",
    marginLeft: "10px",
    borderRadius: "10px",
  },
  selection: {
    padding: 10,
    justifyContent: "center",
    margin: 0,
    borderBottom: "1px solid #ededed",
  },
  button: {
    color: "white",
    fontSize: "small",

    fontWeight: "bolder",
    textDecoration: "none",
    paddingLeft: "20px",
    paddingTop: "15px",
    paddingBottom: "15px",
    display: "flex",
    cursor: "pointer",
  },
};
export default Leftbar;
