import React from 'react';
import { Link } from 'react-router-dom';
import s from './LandingPage.module.css'

export default function LandingPage() {
  return (
    <div className='s.body'>
      <h1 className={s.tittle}>Welcome to DogWorld</h1>
      <Link to='/home'>
        <button className={s.boton}>Enter</button>
      </Link>
      <p className={s.creator}>© Mauricio Bo - by Henry</p>

    </div>
  )
}