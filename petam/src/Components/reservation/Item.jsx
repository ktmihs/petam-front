import React from 'react'
import './reservation.css'
import TimeBtnAble from './TimeBtnAble'
import TimeBtnDisabled from './TimeBtnDisabled'

// 시간에 대해서 활성화 여부에 따라 버튼 다르게 하기
function Item({lastTime,reservationTime,time,selectTime}){

    const reserve=reservationTime.map(item=>item.split('.')[2])     // reservationTime에서 각 item 당 시간만 추출

    return(
        <>{
            (
                lastTime.present    // 예약하는 날짜와 현재 날짜가 같을 경우,
                && (lastTime.hour>time.split(':')[0]    // 현재 시간보다 이전 시간들은 비활성화(예약할 수 없도록)
                || (lastTime.hour==time.split(':')[0] && lastTime.minute>=time.split(':')[1]))  // 당일 30분 전에는 예약 금지
            ) 
            || (reserve && reserve.includes(time))      // 이미 예약된 시간일 경우, 비활성화
            ?
            <TimeBtnDisabled time={time}/>
            :
            <TimeBtnAble selectTime={selectTime} time={time}/>      // 그 외의 시간의 경우 예약 가능하게 활성화
        }</>  
    )
}

export default Item