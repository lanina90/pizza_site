import React, {useCallback, useContext, useEffect, useRef, useState} from 'react';
import styles from './Search.module.scss'
import AppContext from "../../context/AppContext";
import debounce from 'lodash.debounce'
const Search = () => {
  const [value, setValue] = useState('')
  const {setSearchValue} = useContext(AppContext)

  const inputRef = useRef()

  const onClickClear = () => {
    setSearchValue('')
    setValue('')
    inputRef.current.focus()
  }

  const onChangeInput = e => {
    setValue(e.target.value)
    updateSearchValue(e.target.value)
  }

  const updateSearchValue = useCallback(
    debounce((str) => {
      setSearchValue(str)
    }, 250), []
  )
  return (
    <div className={styles.root}>
      <img className={styles.icon} src="/img/search.svg" alt="Search"/>
      <input
        ref={inputRef}
        value={value}
        onChange={onChangeInput}
        type="text"
        placeholder='Search for pizza....'/>
      {
        value ? <img
          className={styles.clearIcon}
          src="/img/clear_icon.svg"
          alt="Clear"
          onClick={() => onClickClear()}
        /> : ''
      }

    </div>

  )
};

export default Search;