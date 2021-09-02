import axios from 'axios'
import React,{useState,useEffect} from 'react'
import { useSelector } from 'react-redux'
import Content from '../Components/Content'
import "../Components/mypage/mypage.css"
import PetsInfo from '../Components/mypage/PetsInfo'

function AddPetPage(){
    const { user } = useSelector(({ user }) => ({
        user: user.user
    }))
    const username=user.username
    const [pets,setPets]=useState([])
    const [pet,setPet]=useState({
        parent:user.username,   // 보호자
        name:'',        // 동물 이름
        species:'',     // 동물 종
        age:'',         // 동물 나이
        gender:''       // 성별
    })
    const {parent,name,species,age,gender}=pet

    useEffect(() => {
        axios.get('/api/pets/'+username)
        .then(
            res=>setPets(res.data)
        )
    }, [pets,username])  // 동물 리스트가 업데이트 될 때마다 화면 리렌더링

    const handleChange=(e)=>{
        const {name,value}=e.target
        setPet({
            ...pet,
            parent:user.username, 
            [name]: value
        })
    }

    const handleCheck=(e)=>{
        e.preventDefault();
        (name==='' || age==='' || species==='' || gender==='')?    //미입력 사항 존재할 때
            swal('','모두 작성해주세요!','warning')
        :
        (
            handleSubmit(),
            swal('',`${name}을(를) 등록합니다!`, 'success')
            .then(setPet({name:'',age:'',gender:''}))
        )
    }
    const handleSubmit=()=>{
        axios.put('/api/auth/pet/'+username+'/'+`${name}(${species})`)      // 로그인 된 보호자 정보에 동물 추가
        .then((response) => {
            console.log(response)
        })
        .catch((error) => {
            console.log(error)
        })
        axios.post('/api/pets/',pet)        // 동물 테이블에 저장
        .then((response) => {
            console.log(response)
        })
        .catch((error) => {
            console.log(error)
        })
    }
    
    const line={
        margin:'20px 50px'
    }
    const info={
        margin:'30px 50px',
        textAlign:'center',
        borderRadius:'30px',
        boxShadow: '8px 8px 16px 3px rgba(0,0,0,0.3)'
    }
    
    return(
        <Content>
            <div className="title mt-4"><h3>등록된 반려 동물 리스트</h3></div>
            <div className="petsDiv">
            <PetsInfo info={pets}/>     {/*등록된 동물 리스트*/}
            </div>
            <hr style={line}/>
            <div style={info}>
                <div className="divstyle mt-4">새로운 반려 동물 등록</div>
                <form onSubmit={handleCheck}>
                    <div className="divstyle">
                        <input className="inputDisabled-pet mt-4" value={username} disabled/>
                    </div>
                    <div className="divstyle">
                        <input className="input-pet mt-2" name="species" value={species} placeholder="종(ex.개,고양이)" onChange={handleChange}/>
                    </div>
                    <div className="divstyle">
                        <div className="radio">
                            <input type="radio" name="gender" value="수컷" onChange={handleChange}/>&nbsp;<label>수컷 </label> &ensp;
                            <input type="radio" name="gender" value="암컷" onChange={handleChange}/>&nbsp;<label>암컷 </label>
                        </div>
                    </div>
                    <div className="divstyle">
                        <input className="input-pet mt-2" name="name" value={name} placeholder="이름" onChange={handleChange}/>
                    </div>
                    <div className="divstyle">
                        <input className="input-pet mt-2" name="age" value={age} placeholder="생년월일(숫자 6자리)" onChange={handleChange}/>
                    </div>
                    <div>
                        <button className="addBtn mt-4 mb-4" type="submit">등록하기</button>
                    </div>
                </form>
            </div>
        </Content>
    )
}

// AddPetPage > PetsInfo > Item > PetInfo
export default AddPetPage