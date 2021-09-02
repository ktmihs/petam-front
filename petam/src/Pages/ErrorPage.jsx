import React from 'react'
import {Link} from 'react-router-dom'
import Content from '../Components/Content'

// 잘못된 링크, url 입력 시 error page
function ErrorPage(){

    const error={
        textAlign:'center',
        color:'red',
        fontSize:'50px',
        margin:'13vw 25%',
        width:'50%'
    }
    const home={
        textAlign:'center',
        textDecorationLine:'none',
        color:'#395382'
    }

    return(
        <Content>
            <div style={error}>
                <strong>PAGE ERROR!!</strong>
            </div>
            <Link to='/'>
                <h3 style={home}>link to home</h3>
            </Link>
            
        </Content>
    )
}

export default ErrorPage