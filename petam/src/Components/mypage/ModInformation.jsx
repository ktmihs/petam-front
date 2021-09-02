import React from 'react'
import { useHistory } from 'react-router'
import { useSelector } from 'react-redux'
import InfoContent from './InfoContent'
import InfoHspContent from '../hsppage/InfoHspContent'
import InfoTitle from './InfoTitle'
import '../../style.css'
import "../sign/Register.css"
import "../sign/sign.css"

// 정보 수정 페이지
function ModInformation(){
    const res=useHistory()
    const { user, hospital } = useSelector(({ user, hospital }) => ({
        user: user.user,
        hospital: hospital.hospital,
    }))

    const myPet=()=>{   // 펫 정보 페이지로 이동
        res.push({
            pathname:'/addPet/',
            email:user
        })
    }

    const articleStyle={
        maxWidth: '700px',
        padding:'15px 0 30px 0'
    }
    const margin={
        margin:'60px 0'
    }
    const pet={
        display:'inline-block',
        width:'15vw',
        maxWidth:'130px',
        height:'50px',
        backgroundColor:'#19447390',
        color:'white',
        fontSize:'17px',
        border:'0',
        borderRadius:'5px',
        margin:'10px',
    }
    const text={
        display:'inline-block'
    }
    const bottom={
        margin:'15px 0',
        marginLeft:'15vw'
    }
    return(
        <div style={margin}>
            <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.0.8/css/all.css"/>
            <div class="container container fadeInDown">
                <div>
                    {hospital?
                    // 병원 정보 수정 content
                    <article id="formContent" class="card-body mx-auto" style={articleStyle}>
                        <div>
                        <InfoTitle />
                        <InfoHspContent user={hospital}/>
                        </div>
                    </article>
                    :
                    // 개인 정보 수정 content
                    <article id="formContent" class="card-body mx-auto" style={articleStyle}>
                        <div>
                        <InfoTitle />
                        <InfoContent user={user}/>
                        </div>
                        <div style={bottom}>
                            <small style={text}>반려동물 등록하기 <h5 style={text}>👉</h5></small>
                            <button style={pet} onClick={myPet}>MY PET</button>
                        </div>
                    </article>
                    }
                </div>
            </div> 
        </div>
    )
}
export default ModInformation