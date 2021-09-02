//data item 하나하나 보여주기
 
import React from 'react'
import './hsppage.css'
import axios from 'axios'

// 로그인 된 병원의 예약 정보를 테이블 칼럼에 하나씩 보여줌
function Item({item}){

    // 진료 완료 버튼을 누르면 진료가 완료되었음을 알려주고, 예약된 시간 정보들을 삭제함
    const handleSubmit=()=>{
        swal('','진료완료!','success')
        axios.put('/api/reservations/'+item._id)        // check를 true로 변경
    }
    
    // 진료 완료 버튼 클릭 시,
    const handleClick=()=>{
        swal({
            text:'진료완료 처리를 하시겠습니까?',
            icon: "warning",
            buttons: ['cancel',true],
            dangerMode: true,
            closeOnClickOutside:false,
            confirm:{
                text:'확인',
                value:true
            }
        })
        .then((willCheck)=>{
            if(willCheck) handleSubmit()
        })
    }
    return(
        <div>
            <td className="td">{item.dateDay}</td>
            <td className="td">{item.pet}</td>
            <td className="td">{item.type}</td>
            <td className="td">{item.memo}</td>
            <td className="td"><button className="reserve-check" onClick={handleClick}>진료완료</button></td>
            <hr/>
        </div>
    )
}
export default Item