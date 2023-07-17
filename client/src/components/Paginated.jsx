import React from 'react';
import s from './Paginated.module.css';

export default function Paginated({ dogsPerPage, allDogs, paginated, currentPage }) {
  const pageNumber = []

  for (let i = 0; i < Math.ceil(allDogs / dogsPerPage); i++) {
    pageNumber.push(i + 1)
  }

  return (
    <nav>
      <ul className='paginado'>
        {
          pageNumber?.map(number => (
            <li key={number} className={s.number}>
              <button
                style={number === currentPage ? { background: "rgb(76, 122, 175)" } : {}}
                onClick={() => paginated(number)}>
                {number}
              </button>
            </li>
          ))
        }
      </ul>
    </nav>
  )
}