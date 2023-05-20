import React, {useContext, useEffect, useRef} from 'react';
import styles from './Search.module.scss'
import AppContext from "../../context/AppContext";

const Search = () => {

  const {searchValue, setSearchValue} = useContext(AppContext)

  const inputRef = useRef()

  const onClickClear = () => {
    setSearchValue('')
    inputRef.current.focus()
  }

  useEffect(() => {
    document.querySelector('input')
  }, [])
  return (
    <div className={styles.root} >
      <img className={styles.icon} src="/img/search.svg" alt="Search"/>
      <input
        ref={inputRef}
        value={searchValue}
        onChange={e => setSearchValue(e.target.value) }
        type="text"
        placeholder='Search for pizza....'/>
      {
        searchValue ?    <img
          className={styles.clearIcon}
          src="/img/clear_icon.svg"
          alt="Clear"
          onClick={()=> onClickClear()}
        /> : ''
      }

    </div>

  )
};

export default Search;