import React, { useState,useEffect } from 'react'
import Content from '../Components/Content'
import '../Components/Content.css'
import Search from '../Components/search/Search'
import SearchContent from '../Components/search/SearchContent'
import axios from 'axios'
import Pagination from '../Components/pagination/Pagination'

// 검색 페이지
function SearchPage(){
    
    const [searchWord,setSearchWord]=useState('')
    const [info,setInfo]=useState([])   //병원 정보
    const [loading,setLoading]=useState(false)    //로딩 중 표시
    const [currentPage,setCurrentPage]=useState(1)  //현재 페이지
    const [postsPerPage,setPostsPerPage]=useState(100)                //한 페이지에서 보여줄 info 수

    const linkName='hospital'       // 링크이름

    const indexOfLastPost=currentPage*postsPerPage  //해당 페이지에서 마지막 info의 index
    const indexOfFirstPost=indexOfLastPost-postsPerPage //  ...      첫번째 ...
    const currentPosts=info.slice(indexOfFirstPost, indexOfLastPost)    //각 페이지에서 보여질 info 배열
    
    const paginate = (pageNumber) => setCurrentPage(pageNumber)

    useEffect(() => {
        const fetchPosts=async()=>{
            setLoading(true)
            axios.get('api/hospitals/read/'+searchWord) // 검색 단어로 정보 불러옴
            .then(
                res=>{
                    setInfo(res.data),
                    res.data.length>1000?   // 병원 데이터가 1000을 넘을 경우
                    setPostsPerPage(150)    // 한 페이지 당 150으로 변경
                    :
                    null
                },
                setLoading(false),
            )
            .catch(err=>console.log(err))
        }
        fetchPosts()
    }, [searchWord])  // searchWord 바뀔 때마다 렌더링 해줌

    //병원 검색 받으면 리렌딩 ()
    const getSearchWord=(word)=>{ setSearchWord(word) }
    
    const button={
        position:'relative',
        textAlign:'right',
        left:'85%',
        textDecoration:'none',
        fontSize:'14px',
        color:'#f98',
        height:'20px',
        padding:'7px',
        backgroundColor:'white',
        border:'3px solid #f98',
        borderRadius:'20px'
    }

    return (
        <Content>
            <a name='top'/>
            <h2 className='name'>{searchWord} 검색 결과</h2>
            <Search getSearchWord={getSearchWord} />
            <a href='#bottom' style={button}>Down</a>
            <div className='bodyContainer'>
                <SearchContent  linkName={linkName} info={currentPosts} loading={loading}/>
                <Pagination postsPerPage={postsPerPage} totalPosts={info.length} paginate={paginate}/>
            </div>
            <a href='#top' name='bottom' style={button}>&ensp;Up&ensp;</a>
            <br/><br/>
        </Content>
      )
}

export default SearchPage