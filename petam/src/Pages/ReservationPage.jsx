import React, { useState } from 'react'
import { useHistory, useLocation } from 'react-router'
import Content from '../Components/Content'
import '../Components/Content.css'
import ReservationContent from '../Components/reservation/ReservaionContent'
import TimeTable from '../Components/reservation/TimeTable'
import swal from 'sweetalert'

// 예약 페이지
function ReservationPage({history}){
    
    const [time,setTime]=useState({     // 예약된 날짜 정보 받아오기
        year:'',
        month:'',
        dates:'',
        hour:'',
        minute:''
    })
    
    const [reserve,setReserve]=useState({   // 예약 정보 받아오기
        pet:'',
        option:'',
        text:''
    })

    const getReserve=(name,value)=>{    // ReservationContent에서 예약 정보 받아오기
        setReserve({
            ...reserve,
            [name]: value,
        })
    }

    const [nextPage,setNextPage]=useState(false)        // 다음 페이지로 넘어갈 수 있는 버튼 활성화 여부

    const hspId=useLocation()       // 이전 페이지에서 받아서 사용
    const [hsp,setHsp]=useState({   // 이전 페이지에서 병원 id와 name받아서 저장
        Id:hspId.id,
        Name:hspId.name
    })

    const res=useHistory()      // 다음 페이지에 정보 넘겨주기 위해 res 설정
    
    const toCheck=()=>{{    
        reserve.pet==='' || reserve.option==='' || reserve.option==='기타' && reserve.text===''?    //미입력 사항 존재할 때
        (
            reserve.pet==='' || reserve.option===''?
            swal('','예약 동물과 예약 목적을 선택해주세요!','warning')
            :
            swal('','예약 목적에 대한 메시지를 작성해주세요!','warning')
        )
        :
        res.push({      //전부 작성되면 다음 페이지로 이동 & 정보 보내기
            pathname:'/CheckReservationPage',
            id:hsp.Id,
            name:hsp.Name,
            pet:reserve.pet,
            option:reserve.option,
            text:reserve.text,
            dateDay:`${time.month}.${time.dates}.${time.hour}:${time.minute}`
        })
    }}

    const getTime=(startDate,startTime)=>{  // TimeTable에서 시간 정보 가져오기
        setTime({
            year:startDate.getFullYear(),
            month:startDate.getMonth()+1,
            dates:startDate.getDate(),
            hour:startTime.split(':')[0],
            minute:startTime.split(':')[1]
        })
    }
    
    const inner={
        display:'inline-block',
        margin:'0 5px'
    }
    const buttons={
        textAlign:'center'
    }
    const leftButton={
        display:'inline-block',
        backgroundColor:'#BBBCBC'
    }
    const rightButton={
        display:'inline-block',
        backgroundColor:'#5F8DDA'
    }

    return(
        <Content>
            <h2 className='name'>{hsp.Name}</h2>
            <div className='bodyContainer'>
                <div style={inner}>
                    {
                    nextPage?
                        <>
                            <ReservationContent time={time} getReserve={getReserve} />
                            <div style={buttons}>                   
                                <button style={leftButton} className='button' onClick={()=>setNextPage(false)}>이전으로</button>
                                <button style={rightButton} className='button' onClick={toCheck}>예약하기</button>  
                            </div>
                        </>
                    :
                        <>
                            <TimeTable getTime={getTime} hsp={hsp} />
                            {time.minute!==''?
                                <div style={buttons}>
                                    <button style={leftButton} className='button' onClick={()=>history.push('/Hospital/'+hsp.Name)}>취소</button>
                                    <button style={rightButton} className='button' onClick={()=>setNextPage(true)}>다음으로</button>  
                                </div>
                            :
                            null
                            }
                        </>
                    }
                </div>
            </div>
        </Content>
    )
}
export default ReservationPage