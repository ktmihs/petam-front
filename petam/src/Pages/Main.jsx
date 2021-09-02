import React from 'react'
import Content from '../Components/Content'
import '../Components/Content.css'
import MainHospitalContent from '../Components/main/MainHospitalContent'
import MainProductContent from '../Components/main/MainProductContent'
import { useSelector } from 'react-redux'

// 메인 페이지
function Main() {

  const { user, hospital } = useSelector(({ user, hospital }) => ({
    user: user.user,
    hospital: hospital.hospital,
  }));

  return (
    <Content>
      <h2 className="name">Main Page!!</h2>
      <div className="bodyContainer">
        <MainHospitalContent />
        <MainProductContent /> 
      </div>
    </Content>
  )
}


export default Main
