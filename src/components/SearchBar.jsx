import { IoSearchOutline } from "react-icons/io5";

import './searchbar.css'

function SearchBar() {
  return (
    <div className='searchbar'>
        <IoSearchOutline className="seach__icon"/>
        <input type="text" placeholder='Seach Title' id='search__input'/>
    </div>
  )
}

export default SearchBar