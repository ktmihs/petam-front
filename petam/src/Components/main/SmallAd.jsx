import React from 'react'
import './main.css'

// 메인페이지 병원 광고(새로운 병원 보여주기)
function SmallAd({data}){
    return(
        <a className="link" href={`/hospital/${data.name}`}>
          <div className="ad">    
            {data.name}
            <br/>{data.tel}
            <br/>{data.new_addr}
            <br/>
          </div>
        </a>
    )
}
export default SmallAd