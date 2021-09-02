import React,{useEffect,useState} from 'react'
import Content from '../Components/Content'
import '../Components/Content.css'
import ReserveContent from '../Components/hsppage/ReserveContent'
import axios from 'axios'
import Pagination from '../Components/pagination/Pagination'
import { useSelector } from 'react-redux'

// 로그인 된 병원의 예약 확인 페이지
function HospitalReservationPage(){
    const { hospital } = useSelector(({ hospital }) => ({
        hospital: hospital.hospital
    }))

    const [hspId,setHspId]=useState(hospital._id)   //병원 Id
    const [info,setInfo]=useState([])   //병원 정보
    const [currentPage,setCurrentPage]=useState(1)  //현재 페이지
    const [postsPerPage]=useState(10)                //한 페이지에서 보여줄 info 수

    const indexOfLastPost=currentPage*postsPerPage  //해당 페이지에서 마지막 info의 index
    const indexOfFirstPost=indexOfLastPost-postsPerPage //  ...      첫번째 ...
    const currentPosts=info.slice(indexOfFirstPost, indexOfLastPost)    //각 페이지에서 보여질 info 배열
    const paginate = (pageNumber) => setCurrentPage(pageNumber)

    useEffect(() => {
        const fetchPosts=async()=>{
            axios.get('/api/hospitals/readone/'+hospital._id)     // 병원 정보 받아오기
            .then(res=>{
                setHspId(res.data._id)
                axios.get('/api/reservations/hspfilter/'+res.data.name)  // 예약 정보 중, 해당 병원 정보만 받아오기
                .then(
                    res=>{
                        setInfo(res.data)
                    }
                )
                .catch(err=>console.log(err))
            })    
        }
        fetchPosts()
    }, [hospital])

    const totalCount={
        textAlign:'right'
    }

    return(
        <Content>
            <h2 className='name'>예약된 내역</h2>
            <div className='bodyContainer'>
                <div style={totalCount}>총 {info.length}건</div>
                <hr/>
                <div>
                    <ReserveContent hspId={hspId} info={currentPosts}/>
                    <Pagination postsPerPage={postsPerPage} totalPosts={info.length} paginate={paginate}/>
                </div>
                <hr/>
            </div>
        </Content>
    )
}

export default HospitalReservationPage