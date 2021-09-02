import React,{ useState,useEffect } from 'react'
import { useLocation } from 'react-router'
import { useSelector } from 'react-redux'
import Content from '../Components/Content'
import '../Components/Content.css'
import swal from 'sweetalert'
import axios from 'axios'

function CheckReservationPage({location,history}){
    const { user } = useSelector(({ user }) => ({
        user: user.user
    }))
    const [reservation,setReservation]=useState({
        hospitalName:'',
        hostId:user.username,   
        pet:'', 
        type:'',
        memo:'',
        dateDay:'',
    })
    const hsp=useLocation()       // 이전 페이지에서 location으로 받은 정보를 저장
    const reserve=useLocation({  
        pet:location.pet,   
        option:location.option,
        text:location.text,
        dateDay:location.dateDay
    })

    useEffect(() => {
        const saveReservation=async()=>{
            setReservation({
                ...reservation,
                hospitalName:hsp.name,
                pet:reserve.pet,
                type:reserve.option,
                memo:reserve.text,
                dateDay:reserve.dateDay
            })
        }
        saveReservation()
    }, [])
    
    const handleSubmit=()=>{
        axios.post("/api/reservations",reservation)     // 작성된 예약 정보 DB에 POST
        .then((response) => {
            console.log('reservation:',response)
        })
        .catch((error) => {
            console.log(error)
        })
        axios.put("/api/hospitals/"+hsp.id+'/'+reserve.dateDay)        // 병원에 예약 시간 정보 저장
        .then((response) => {
            console.log('reservationTime:',response)
        })
        .catch((error) => {
            console.log(error)
        })
    }

    const handleClick=()=>{    
        swal({
            text:'예약이 확정되었습니다.',
            icon:'success',
            closeOnClickOutside:false,
            confirm:{
                text:'확인',
                value:true
            }
        }).then((result)=>{
            handleSubmit()
            if(result){
                history.push({
                    pathname:'/reservation',
                })
            }
        })
    }

    const goBack=()=>{
        history.push({      //전부 작성되면 다음 페이지로 이동 & 정보 보내기
            pathname:'/ReservationPage',
            id:hsp.id,
            name:hsp.name
        })
    }

    const contentBox={
        border:'none',
        height:'auto'
    }
    const buttons={
        textAlign:'center'
    }
    const leftButton={
        display:'inline-block',
        backgroundColor:'red'
    }
    const rightButton={
        display:'inline-block',
        backgroundColor:'#5F8DDA'
    }
    
    return(
        <Content>
            <h2 className='name'>예약 정보 확인</h2>
            <div className='bodyContainer'>
                <div className='contentBox' style={contentBox}>
                    <div>
                        예약 병원 : {hsp.name}<br/>
                        예약 동물 : {reserve.pet}<br/>
                        예약 일정 : {reserve.dateDay.split('.')[0]}월 {reserve.dateDay.split('.')[1]}일 {reserve.dateDay.split('.')[2]}<br/>
                        예약 목적 : {reserve.option}<br/>
                        기타 내용 : {reserve.text}
                    </div>
                </div>
                <div className='contentBox' style={contentBox}>
                    <div>
                        ※주의사항※<br/><br/>
                        당일 예약 불가합니다.<br/>
                        예약 취소는 1일 전까지 가능합니다.<br/>
                        예약 관련 자세한 사항은 병원으로 문의 바랍니다.
                    </div>
                </div>
            </div>
            <div style={buttons}>
                <button style={leftButton} className='button' onClick={goBack}>다시 선택</button>
                <button style={rightButton} className='button' onClick={handleClick}>예약확정</button>  
            </div>
        </Content>
    )
}

export default CheckReservationPage