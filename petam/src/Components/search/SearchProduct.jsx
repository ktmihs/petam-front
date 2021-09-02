import React, { useState } from "react";
import "../Content.css";
import "./Search.css";

function SearchProduct() {
const [state, setState] = useState({
    information: [],
    keyword: '',
  });
  // const state = ;

  const handleChange = e => {
    setState({
  keyword: e.target.value,
})
  }

  return (
    <form
      //   onSubmit={handleSubmit}
      className="headerContainer "
    >
      <input
        placeholder="Search..."
        // value={keyword}
        onChange={handleChange}
        // name="name"
        className="search "
      />
      <button type="submit" className="button search-button">
        검색
      </button>
    </form>
  );
}

export default SearchProduct;
