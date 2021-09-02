// joo-ju
// 제품을 등록할 수 있는 페이지

import "../style.css";
import "../Components/product/product.css";
import React, { useState,Component } from "react";
import { Button, Form, ImgInput } from "react-bootstrap";
import Content from "../Components/Content";
import "../Components/Content.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from "axios";

axios.defaults.withCredentials = true;
const headers = { withCredentials: true };

const floatLeft = {
  float: "left",
};
const floatRight = {
  float: "right",
};
const he = {
  height: "520px",
  // justifyContent: "center",
};
const formData=new FormData()

export default class WriteProductPage extends Component {

  state={
    send_param:{
      name:'',
      price:'',
      company:'',
      discription:'',
      image:''
    },
    image:{
      file:'',
      previewURL:''
    }
  }
  handleChange=(e)=>{
    const {name,value}=e.target
    this.setState({
      send_param:{
        ...this.state.send_param,
        [name]:value
      }
    })
  }
  handleImage=(e)=>{
    e.preventDefault(); 
    this.handleChange(e)
    let reader = new FileReader()
    let file = e.target.files[0]
    reader.onloadend = () => {
      this.setState({
        image:{
          file : file,
          previewURL : reader.result 
        }
      })
    }
    reader.readAsDataURL(file)
    formData.append('image', e.target.files[0])
    formData.append('filename',e.target.files[0].name)
    formData.append('productname',this.state.send_param.name)
    for(let data of formData){console.log(data[0],data[1])}
  }
  
  productWrite = () => {
    console.log("productWrite");
    
    const config = {
        headers: {
        'content-type': 'multipart/form-data'
        }    
    }
    axios.post("/api/images/product/image",formData,config)
    .then((response) => {
        console.log(response,formData.entries()[0])
    })
    .catch((error) => {
        console.log(error)
    })

    console.log("send_param : ", this.state.send_param);
    axios
      .post("/api/products", this.state.send_param)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render = () => (
    <Content>
      <h2 className="name">제품 등록</h2>

      <div className="col-12 m-auto bg-white ">
        <div className="col-12 m-auto pt-3">
          <Form class="user">
            <div class="form-group  " style={he}>
              <div class="col-sm-12 mb-3 mb-sm-0">
                <div style={floatLeft}>
                  {
                    this.state.image.file?
                    <div>
                      <img className=" product-image-preview" src={this.state.image.previewURL}/>
                    </div>
                    :
                    <div className=" product-image-preview"></div>
                  }
                  <input
                  className="product-input-image"
                  type="file"
                  accept="image/*"
                  value={this.state.send_param.image}
                  name="image"
                  id="image"
                  onChange={this.handleImage}
                  ></input>
                </div>
                <input
                  className="product-input-60"
                  style={floatRight}
                  name="name"
                  value={this.state.send_param.name}
                  onChange={this.handleChange}
                  placeholder="제품 이름"
                />

                <input
                  className="product-input-60"
                  style={floatRight}
                  name="company"
                  value={this.state.send_param.company}
                  onChange={this.handleChange}
                  placeholder="제조원"
                />
                <input
                  className="product-input-60"
                  style={floatRight}
                  name="price"
                  value={this.state.send_param.price}
                  onChange={this.handleChange}
                  placeholder="정가"
                />

                <textarea
                  className="product-input"
                  name="discription"
                  value={this.state.send_param.discription}
                  onChange={this.handleChange}
                  placeholder="제품 설명"
                />
                <div class="col-sm-3 float-left">
                  <Button
                    class=" btn w-100  btn-success "
                    variant="success"
                    type="submit"
                    block
                    onClick={this.productWrite}
                  >
                    저장
                  </Button>
                </div>

                <div class="col-sm-3 float-right">
                  <Button
                    class=" btn w-100  btn-success "
                    variant="danger"
                    block
                  >
                    취소
                  </Button>
                </div>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </Content>
  );
}
