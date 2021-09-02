import React,{useState} from 'react'
import '../Content.css'
import SearchContent from '../search/SearchContent'
import Pagination from '../pagination/Pagination'

// 내 예약 내역 페이지
function MyReservationPage({info, loading,linkName}){
    const [currentPage,setCurrentPage]=useState(1)  //현재 페이지
    const [postsPerPage]=useState(4)                //한 페이지에서 보여줄 info 수

    const indexOfLastPost=currentPage*postsPerPage  //해당 페이지에서 마지막 info의 index
    const indexOfFirstPost=indexOfLastPost-postsPerPage //  ...      첫번째 ...
    const currentPosts=info.slice(indexOfFirstPost, indexOfLastPost)    //각 페이지에서 보여질 info 배열
    const paginate = (pageNumber) => setCurrentPage(pageNumber)

    const totalCount={
        textAlign:'right'
    }
    return(
        <>
            <div style={totalCount}>총 {info.length}건</div>
            <hr/>
            <div>
                {/* {currentPosts._id} */}
                <SearchContent linkName={linkName} info={currentPosts} loading={loading}/>
                <Pagination postsPerPage={postsPerPage} totalPosts={info.length} paginate={paginate}/>
            </div>
        </>
    )
}

export default MyReservationPage