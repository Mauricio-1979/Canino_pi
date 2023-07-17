import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getNameDog } from '../redux/actions';
import s from './SearchBar.module.css';

export default function SearchBar({ searchPage }) {

  const dispatch = useDispatch()
  const [name, setName] = useState('')

  function handleInputChange(e) {
    e.preventDefault()
    setName(e.target.value)
    console.log(name)
  }

  function handleSubmit(e) {
    e.preventDefault()
    searchPage()
    dispatch(getNameDog(name))
    setName("")
  }

  return (
    <div>
      <input className={s.search} type="text"
        placeholder='Search..'
        value={name}
        onChange={e => handleInputChange(e)}
      />
      <button className={s.search} type='submit'
        onClick={handleSubmit}
      >SEARCH</button>

    </div>
  )
}