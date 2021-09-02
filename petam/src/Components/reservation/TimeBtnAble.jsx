import React from 'react'

// 활성화 된 시간 버튼
function TimeBtnAble({time,selectTime}){

    const handleClick=()=>{
        selectTime(time)       // 선택된 시간을 selectTime(TimeTable의 setStartTime)으로 설정
    }
    return <button onClick={handleClick} className='timeBtn' value={time}>{time}</button>
}

export default TimeBtnAble