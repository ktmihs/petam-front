import React from 'react'
import './hsppage.css'
import Item from './Item'

// 로그인 된 병원에 예약된 정보 보여주기(map으로 칼럼 하나씩)
function reserveContent({hspId,info}){
    return(
        <>
            <table className="tables">
                <div>
                    <th className="th">예약 시간</th>
                    <th className="th">이름</th>
                    <th className="th">진단 종류</th>
                    <th className="th">내용</th>
                    <th className="th">확인</th>
                </div>
                <hr/>
                {
                    info.map(item=>{
                        return(
                            <Item key={item.id} hspId={hspId} item={item}/>
                        )
                    })
                }
            </table>
        </>
    )
}
export default reserveContent