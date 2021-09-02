import React,{useState} from 'react'
import '../Content.css'
import './Search.css'

// 검색 페이지 상단 검색창
function Search({getSearchWord}){
    const [searchWord,setSearchWord]=useState('')

    const handleChange=(e)=>{
        setSearchWord(e.target.value)
    }
    const handleSubmit=(e)=>{
        e.preventDefault();
        getSearchWord(searchWord)
        
    }

    return (
        <form onSubmit={handleSubmit} className='headerContainer'>
            <input placeholder="병원을 검색하세요..." value={searchWord} onChange={handleChange} name="name" className="search"/>
            <button type="submit" className="button search-button">검색</button>
        </form>
    )    
}

export default Search