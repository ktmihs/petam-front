import React from 'react'

// 비활성화 된 시간 버튼
function TimeBtnDisabled({time}){
    return <button className='timeBtnDisabled' value={time} disabled>{time}</button>
}

export default TimeBtnDisabled