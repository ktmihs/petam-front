import React from 'react'
import '../Content.css'
import './Search.css'
import { BiPhone } from 'react-icons/bi'

// 병원 하나씩 보여주기 & 예약 정보 하나씩 보여주기 (linkname으로 구분)
function Item({linkName,item}){
  const link=linkName
  const name=item.name
  const id=item._id
  const hospitalName=item.hospitalName
  const telIcon = { marginRight: '5px' }
  const info = { marginTop: "7px" }

  return( 
    link==='hospital'?
      <a href={`/${link}/${name}`}>
        <div className="item-box">
          {
            item.image && item.image!==''?
            <img className="img-style" src={item.image.split('\\')[2]}/>
            :
            <img className="img-style" src={'no_img.jpg'}/>
        }
        <div style={info}>{item.name}</div>
        <div style={info}>
        <BiPhone size="18" style={telIcon}/>
          {item.tel}
          </div>
        </div>
      </a>
    : link === 'complete' ? 
      <div className="reservation">
        <h5 className="sign">{hospitalName}</h5>
        {item.dateDay}<br />
        {item.type}<br />
        {
          item.postCheck?
          <h6 className="reserve-btn">작성완료</h6>
          :
          <a href={`/writepostpage/${id}`}><h6 className="reserve-btn">후기작성</h6></a>
        }
      </div>
      :
      <div className="reservation">
        <h5 className='sign'>{hospitalName}</h5>
        {item.dateDay}<br/>
        {item.type}<br/>
        <a href={`/${link}/${id}`}><h5 className='sign-btn'>▶</h5></a>
      </div>
  )
}
export default Item