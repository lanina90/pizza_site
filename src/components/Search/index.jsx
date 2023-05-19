import React from 'react';
import styles from './Search.module.scss'
const Search = ({setSearchValue, searchValue}) => {
  return (
    <div className={styles.root} >
      <img className={styles.icon} src="/img/search.svg" alt="Search"/>
      <input
        value={searchValue}
        onChange={e => setSearchValue(e.target.value) }
        type="text"
        placeholder='Search for pizza....'/>
      {
        searchValue ?    <img
          className={styles.clearIcon}
          src="/img/clear_icon.svg"
          alt="Clear"
          onClick={()=> setSearchValue('')}
        /> : ''
      }

    </div>

  )
};

export default Search;