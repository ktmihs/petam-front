import React,{useState,useEffect} from 'react'
import { useSelector } from 'react-redux'
import Content from '../Components/Content'
import '../Components/Content.css'
import axios from 'axios'
import ReserveContent from '../Components/mypage/ReserveContent'

// 내 예약 내역 페이지
function MyReservationPage(){

    const [info,setInfo]=useState([])   //병원 정보
    const [infoComplete,setInfoComplete]=useState([])   // 진료 완료된 정보
    const [loading,setLoading]=useState(false)    //로딩 중 표시

    const { user } = useSelector(({ user }) => ({
        user: user.user
    }))

    useEffect(() => {
        const read=user.username
        const fetchPosts=async()=>{
            setLoading(true)
            axios.get('api/reservations/filter/'+read)   // 현재 로그인 된 아이디로 예약된 내역 모두 불러오기
            .then(
                res=>{setInfo(res.data),console.log(res.data)},
                setLoading(false)
            )
            .catch(err=>console.log(err))
            axios.get('api/reservations/filter/complete/'+read)   // 현재 로그인 된 아이디로 예약된 내역 모두 불러오기
            .then(
                res=>{setInfoComplete(res.data),console.log(res.data)},
                setLoading(false)
            )
            .catch(err=>console.log(err))
        }
        fetchPosts()
    }, [user])

    const [complete,setComplete]=useState(false)
    
    const isComplete=(e)=>{
        setComplete(e.target.name)
    }

    return(
        <Content>
            <h2 className='name'>내 예약 내역</h2>
            <div className='bodyContainer'>
                <div className='divide'>
                    <button onClick={isComplete} name='false' className='divide-left'>예약 내역</button>
                    <button onClick={isComplete} name='true' className='divide-right'>완료된 내역</button>
                </div>
                {
                complete==='true'?
                    <ReserveContent info={infoComplete} loading={loading} linkName={'complete'}/>
                    :
                    <ReserveContent info={info} loading={loading} linkName={'reservation'}/>
                }
                <hr/>
            </div>
        </Content>
    )
}

export default MyReservationPage