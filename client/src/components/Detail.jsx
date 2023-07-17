import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getDetail, deleteDetail } from '../redux/actions';
import Loader from './Loader';

export default function Detail(props) {

  const { id } = useParams();

  const dispatch = useDispatch()
  const pet = useSelector((state) => state.detail)
  

  useEffect(() => {
    dispatch(getDetail(id));
    return () => dispatch(deleteDetail({}))
    
  }, [])  


  return (
    <div>
      {
        pet.length > 0 ? // image, name, temperament weight
          <div style={{ marginTop: '5px', color: 'yellow' }}>
            <h1 style={{ marginTop: '5px', color: 'yellow' }}>{pet[0].name}</h1>
            <img src={pet[0].image} alt="dog required" width="300px" height="230px" style={{ border: '1px solid black' }} />

            <h4>{!pet[0].createInDb ? pet[0].temperament :
              pet[0].temperaments.map(item => item.name + (' '))}
            </h4>
            <h4>Weight: {pet[0].weight} kg</h4>
            <h4>Height: {pet[0].height}</h4>
            <h4>Life span: {pet[0].life_span}</h4>
          </div> : <Loader/>
      }
       <Link to="/home"> 
        <button 
          style={{ background: 'rgba(255,255,0,0.2)', borderRadius: '6px' }}
        >Back</button>
       </Link> 
    </div>
  )
}