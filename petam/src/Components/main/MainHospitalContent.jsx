import axios from 'axios'
import React,{useState,useEffect} from 'react'
import './main.css'
import SmallAd from './SmallAd'
import Title from './Title'

// 메인 페이지 병원 관련 content
function MainHospitalContent(){
  const [adHsp,setAdHsp]=useState({
    fir:'',
    sec:''
  })
  
  useEffect(() => {
    axios.get('/api/hospitals/last')
    .then(ctx=>{
      setAdHsp({
        fir:ctx.data[0],
        sec:ctx.data[1]
      })
      console.log(ctx, ctx.data,ctx.data[0])
    })
  }, [])
  
  return(
      <div className="contentBox">
        <div className="TopContent">
          <Title title={'동물 병원 검색'}/>           
        </div>
        <div className="BottomContent">
          <div className="adTitle"><a><a className="news">[new!]</a> 새로 등록된 병원</a></div>

          {adHsp.fir?<SmallAd data={adHsp.fir}/>:null} {/* 광고할 병원이 있을 경우에만 */}
          {adHsp.sec?<SmallAd data={adHsp.sec}/>:null}

        </div>
      </div>
  )
}

export default MainHospitalContent