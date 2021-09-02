import React from 'react'
import './mypage.css'
import Item from './Item'

// 전체 동물 리스트 보여주기
function PetsInfo({info}){    
    return(
        <>
            {
                info.map(item=>{
                    return(
                        <Item key={item.id} item={item}/>
                    )
                })
        }
        </>
    )
}

export default PetsInfo