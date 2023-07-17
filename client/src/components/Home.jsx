import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDogs, filterByTemeperaments, getTemperaments, filterCreated, orderByName, orderByWeight } from '../redux/actions';
import { Link } from 'react-router-dom';
import Card from './Card';
import Paginated from './Paginated';
import SearchBar from './SearchBar';
import s from './Home.module.css';

export default function Home() {

  const dispatch = useDispatch();
  const allDogs = useSelector(state => state.dogs)
  const allTemperaments = useSelector(state => state.temperaments)
  
  const [order, setOrder] = useState('');

  const [currentPage, setCurrentPage] = useState(1);
  const [dogsPerPage, setDogsPerPage] = useState(8);
  const indexOfLastDogs = currentPage * dogsPerPage // 8
  const indexOfFirstDog = indexOfLastDogs - dogsPerPage
  const currentDogs = allDogs.slice(indexOfFirstDog, indexOfLastDogs)

  const paginated = (pageNumber) => {
    setCurrentPage(pageNumber)
  }


  const searchPage = () => {
    setCurrentPage(1)
  }


  useEffect(() => {
    dispatch(getDogs());
    dispatch(getTemperaments());
  }, [dispatch])

  function handleClick(e) {
    e.preventDefault();
    dispatch(getDogs());
    setCurrentPage(1);
  }

  function handelTemperament(e) {
    dispatch(filterByTemeperaments(e.target.value))
    setCurrentPage(1);
    //console.log(e.target.value)
  }

  function handleFilterCreated(e) {
    dispatch(filterCreated(e.target.value))
    setCurrentPage(1);
  }

  function handleFilterByWeigth(e) {
    dispatch(orderByWeight(e.target.value))
    setCurrentPage(1);
    setOrder(`Ordenado ${e.target.value}`)
  }

  function handleOrderName(e) {
    dispatch(orderByName(e.target.value))
    setCurrentPage(1);
    setOrder(`Ordenado ${e.target.value}`)

  }

  return (
    <div className={s.principal}>
      {/* <Link to="/dogs">Create Dog</Link> */}
      {/* <h1 className={s.tittle}>World of Dogs</h1> */}

      <div>
        <select className={s.select} onChange={e => handelTemperament(e)}>
          <option value="All">All Temperaments</option>
          {
            allTemperaments?.map(elem => (
              <option value={elem.name} key={elem.id}>
                {elem.name}
              </option>
            ))
          }
        </select>
        <select className={s.select} onChange={e => handleFilterCreated(e)}>
          <option value="All">All</option>
          <option value="created">Created</option>
          <option value="api">Api</option>
        </select>
        <select className={s.select} onChange={e => handleOrderName(e)}>
          <option value="All">Alphabetical Order</option>
          <option value="asc">Ascendente A-Z</option>
          <option value="desc">Descendente Z-A</option>
        </select>
        <select className={s.select} onChange={e => handleFilterByWeigth(e)}>
          <option value="All">Order by Weight</option>
          <option value="lighter">Lower Weight</option>
          <option value="heavier">Greater Weight</option>
        </select>
        <Link to="/dogs">
          <button className={s.select}>Create Dog</button>
        </Link>
        <br /><br />
        <SearchBar searchPage={searchPage} />
        {/* <br /> */}
        <dir className={s.containerRefresh}>
          <button className={s.refresh} onClick={e => { handleClick(e) }}>
            Refresh
          </button>
        </dir>
        <div className={s.paginated}>
          <Paginated
            dogsPerPage={dogsPerPage}
            allDogs={allDogs.length}
            paginated={paginated}
            currentPage={currentPage}
          />
        </div>        
        
        <div className={s.card}>
          {
            currentDogs?.map(item => {
              return (
                <div key={item.id}>
                  <Link style={{ paddingLeft: 13, textDecoration: 'none' }} to={`/dogs/${item.id}`}>
                    <Card image={item.image} name={item.name} temperament={item.createInDb ? item.temperaments.map((e) => e.name + ", ") : item.temperament} weight={item.weight} />
                  </Link>
                </div>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}