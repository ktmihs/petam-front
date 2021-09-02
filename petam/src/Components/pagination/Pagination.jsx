import React from "react"

// 페이지네이션(페이지 하단 1 2 3 ... 페이지 이동 버튼)
const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
  
  const pageNumber = []
  // Math.ceil: 올림
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumber.push(i)
  }
  let pArr=pageNumber.slice(0,10)
  let pgNum=50-(pageNumber.length)*2

  const style={
    margin:`3vw 0 0 ${pgNum}%`,
    padding:'5px 0',
    textAlign:'center'
  }

  return (
    <ul className="pagination" style={style}>
      |&nbsp;&nbsp;
      {pArr.map((pageNum) => (
          <li
          key={pageNum}
          className="pagination_item"
          onClick={() => paginate(pageNum)}
          >
          {pageNum}&nbsp;&nbsp;
          </li>
      ))}
      |
    </ul>
  )
}

export default Pagination