import React, {useCallback, useContext, useEffect, useRef, useState} from 'react';
import styles from './Search.module.scss'
import debounce from 'lodash.debounce'
import {useDispatch, useSelector} from "react-redux";
import {setSearchValue} from "../../redux/slices/filterSlice";
const Search = () => {
  const dispatch = useDispatch()

  const [value, setValue] = useState('')

  const inputRef = useRef()

  const onClickClear = () => {
    dispatch(setSearchValue(''))
    setValue('')
    inputRef.current.focus()
  }

  const onChangeInput = e => {
    setValue(e.target.value)
    updateSearchValue(e.target.value)
  }

  const updateSearchValue = useCallback(
    debounce((str) => {
      dispatch(setSearchValue(str))
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