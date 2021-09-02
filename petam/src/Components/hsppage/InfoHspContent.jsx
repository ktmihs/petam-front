import React,{useState,useEffect} from 'react'
import axios from 'axios'
import swal from 'sweetalert';
import { useHistory } from 'react-router'
import "../mypage/mypage.css"
import { useSelector } from 'react-redux'

// 병원 정보 수정 페이지의 내용
function InfoHspContent(){
    const { hospitalId } = useSelector(({ hospital }) => ({
        hospitalId: hospital.hospital,
    }))
    
    const [hospital,setHospital]=useState({
        tel:'',
        old_addr:'',
        new_addr:'',
        zip_code:'',
        name:'',
        company_number:'',
        password:'',
        image:''
    })
    const {tel,old_addr,new_addr,zip_code,name,company_number,password}=hospital 
    const [passwordConfirm,setPasswordConfirm]=useState('')
    const [id,setId]=useState()
    const res=useHistory()
    
    const [image,setImage]=useState('')
    const [imaged,setImaged]=useState('')
    const formData=new FormData()
    const [form,setForm]=useState(new FormData)
    const config = {
        headers: {
        'content-type': 'multipart/form-data'
        }    
    }

    // 현재 로그인 된 병원 정보 받아오기
    useEffect(() => {
        if(!hospitalId) {return res.push('/')}
        axios.get('/api/hospitals/read/company/'+hospitalId.company_number)
        .then(
            ctx=>{setHospital({
                tel:ctx.data.tel,
                old_addr:ctx.data.old_addr,
                new_addr:ctx.data.new_addr,
                zip_code:ctx.data.zip_code,
                company_number:ctx.data.company_number,
                name:ctx.data.name,
                password:ctx.data.password
            })
            if(ctx.data.image){ setImaged(ctx.data.image.split('\\')[2])}
            setId(ctx.data._id)
            console.log(ctx,ctx.data)
            })
    }, [hospitalId])

    const handleImage=(e)=>{
        setHospital({
            ...hospital,
            image:e.target.value
        })
        setImage(e.target.value)
        formData.append('image', e.target.files[0])
        formData.append('filename',e.target.files[0].name)
        formData.append('hospitalname',name)
        setForm(formData)
    }
    
    const handleChange=(e)=>{
        const {name,value}=e.target 
        name==='passwordConfirm'?       // 비밀번호 확인일 경우에만 따로 저장
        setPasswordConfirm(value)
        :
        setHospital({
            ...hospital,
            [name]: value
        })
        console.log(name,value)
    }

    const handleCheck=(e)=>{
        e.preventDefault();
        (tel==='' || old_addr==='' || new_addr==='' || zip_code==='' || password==='' || passwordConfirm==='')?    //미입력 사항 존재할 때
            swal('','모두 작성해주세요!','warning')
        :
        (
            password !== passwordConfirm?
                swal('','비밀번호와 비밀번호 확인이 일치하지 않습니다!','warning')
            :
            (
                handleSubmit(),
                swal('','수정된 정보로 저장됩니다!', 'success'),
                res.push({      //전부 작성되면 다음 페이지로 이동 & 정보 보내기
                    pathname:'/',
                })
            )
        )
    }
    const handleSubmit=()=>{
        for(let data of form){console.log(data[0],data[1])}
        axios.post("/api/images/image",form,config)
        .then((response) => {
            console.log(response,form.entries()[0])
        })
        .catch((error) => {
            console.log(error)
        })
        axios.put("/api/hospitals/"+id,hospital)        // 기존 등록 병원
        .then((response) => {
            console.log(response)
        })
        .catch((error) => {
            console.log(error)
        })
    }

    const fileSize={
        width:'100%',
        margin:'5px 30px'
    }
    const fileStyle={
        margin:'40px 20px'
    }

    return(
        <form onSubmit={handleCheck}>
            <div style={fileSize} className='divstyle'>
                {
                    imaged?<img className="img-style" src={'../'+imaged}/>:null
                }
                <input style={fileStyle} type="file" value={image} accept="image/*" name="image" onChange={handleImage} />
            </div>
            <div className='divstyle'>
                <input className="inputDisabled mt-2 box-size" name="company_number" value={company_number} disabled/>  
            </div>
            <div className='divstyle'>
                <input className="inputDisabled mt-2 box-size" name="name" value={name} disabled/>
            </div>
            <div className='divstyle'>
                <input className="input mt-2 box-size" name="tel" placeholder="tel" value={tel} onChange={handleChange}/>
            </div>
            <div className='divstyle'>
                <input className="input mt-2 box-size" name="old_addr" placeholder="old_addr" value={old_addr} onChange={handleChange}/>
            </div>
            <div className='divstyle'>
                <input className="input mt-2 box-size" name="new_addr" placeholder="new_addr" value={new_addr} onChange={handleChange}/>
            </div>
            <div className='divstyle'>
                <input className="input mt-2 box-size" name="zip_code" placeholder="zip_code" value={zip_code} onChange={handleChange}/>
            </div>
            <div className='divstyle'>
                <input className="input mt-2 box-size" type="password" name="password" placeholder="password" onChange={handleChange}/>
            </div>
            <div className='divstyle'>
                <input className="input mt-2 box-size" type="password" name="passwordConfirm" placeholder="confirm password" onChange={handleChange}/>
            </div>
            <div>
                <button className="modifyBtn mt-4 mb-3" type="submit">수정하기</button>
            </div>
        </form>
    )
}

export default InfoHspContent