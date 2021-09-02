import React from 'react'
import Item from './Item'

// 병원 운영 시간의 time list를 map을 통해 뿌려줌 (Item에서 각 시간 별로 활성화 여부를 통해 버튼 생성)
function TimeList({lastTime,timeList, reservationTime,selectTime}){
  return(
      <div>
        {
          timeList.map(time=><Item lastTime={lastTime} reservationTime={reservationTime} time={time} selectTime={selectTime}/>)
        }
      </div>
    )
}

export default TimeList