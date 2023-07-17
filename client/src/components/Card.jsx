import React from 'react';
import s from './Card.module.css';

export default function Card({ image, name, temperament, weight }) {
  return (
    <div className={s.caja}>
      <img src={image} alt="dog pick" width="300px" height="230px"
        style={{ border: '1px solid black' }}
      />
      <div className={s.paquete}>
        <h2 className={s.card}>{name}</h2>
        <h4 className={s.card}>{temperament}</h4>
        <h4 className={s.card}>{weight}</h4>
      </div>

    </div>
  )

}

/*
Imagen
Nombre
Temperamento
Peso
*/