import React from 'react'
import {Link} from 'react-router-dom'

// 메인페이지 title
function Title({title}){
    return(
        <>
            <img className="logo" src="/hospital.png" alt='none'/>
            <Link to='/hospital'><div className="contentName">{title}</div></Link> 
        </>
    )
}

export default Title