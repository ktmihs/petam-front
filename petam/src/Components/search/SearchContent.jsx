import React from 'react'
import '../Content.css'
import Item from './Item'

// 검색어에 맞는 병원 정보 보여주기(map으로)
function SearchContent({linkName, info, loading}){
    if (loading){
        return <h2>Loading...</h2>
    }
    return(
        <>
            {
                info.map(item=>{
                    return(
                        <Item linkName={linkName} key={item.id} item={item}/>
                    )
                })
            }
        </>
    )
}
export default SearchContent