import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { postDog, getTemperaments } from '../redux/actions';
import { useDispatch, useSelector } from "react-redux";
import s from './CreateDog.module.css';


export default function CreateDog() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const temperaments = useSelector((state) => state.temperaments)


  const [input, setInput] = useState({
    name: "",
    height: "",
    maxWeight: "",
    minWeight: "",
    life_span: "",
    image: "",
    temperament: []
  })

  useEffect(() => {
    dispatch(getTemperaments())
  }, [])

  const [errors, setErrors] = useState({
    name: "",
    height: "",
    maxWeight: ""
  })

  function validate(e) {
    if (e.target.name === "name") {
      if (e.target.value.length === 0) {
        setErrors({
          ...errors,
          name: "The name field is required"
        })
      } else if (!(/^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/.test(e.target.value))) {
        setErrors({
          ...errors,
          name: "The field can only contain letters"
        })
      } else {
        setErrors({
          ...errors,
          name: ""
        })
      }
    }
    //------------------
    if (e.target.name === "height") {
      if (e.target.value.length === 0) {
        setErrors({
          ...errors,
          height: "The height field is required"
        })
      } else if (!(/^[0-9]+$/.test(e.target.value)) || e.target.value > 100 || e.target.value < 20) {
        setErrors({
          ...errors,
          height: "The field can only contain numbers from 20 to 120"
        })
      } else {
        setErrors({
          ...errors,
          height: ""
        })
      }
    }
    //------------
    if (e.target.name === "maxWeight") {
      if (e.target.value.length === 0) {
        setErrors({
          ...errors,
          maxWeight: "The maxWeight field is required"
        })
      } else if (!(/^[0-9]+$/.test(e.target.value)) || e.target.value > 100 || e.target.value < 1) {
        setErrors({
          ...errors,
          maxWeight: "The field can only contain numbers from 1 to 100"
        })
      } else {
        setErrors({
          ...errors,
          maxWeight: ""
        })
      }
    }
    if (e.target.name === "life_span") {
      if (e.target.value.length === 0) {
        setErrors({
          ...errors,
          life_span: "the life-span field is required"
        })
      }
      else if (!(/^[0-9]+$/.test(e.target.value)) || e.target.value > 20 || e.target.value < 8) {
        setErrors({
          ...errors,
          life_span: "The field can only contain numbers from 8 to 20"
        })
      } else {
        setErrors({
          ...errors,
          life_span: ""
        })
      }
    }

  }



  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    })
    validate(e)

  }
  const handleBlur = (e) => {
    handleChange(e);
    
  };

  function handleSelect(e) {
    if (input.temperament.includes(e.target.value)) {
      return;
    }
    setInput({
      ...input,
      temperament: [...input.temperament, e.target.value]
    })
  }

  function handleDelete(e) {
    setInput({
      ...input,
      temperament: input.temperament.filter(item => item !== e)
    })
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(input)
    dispatch(postDog(input));
    alert("Dog Created with succes");
    setInput({
      name: "",
      height: "",
      maxWeight: "",
      minWeight: "",
      life_span: "",
      image: "",
      temperament: []
    })

    navigate('/home')
  }


  return (
    <div className={s.container}>
      <div className={s.caja}>
        <Link to='/home'>
          <button className={s.boton2}>Back</button>
        </Link>
        <h1 style={{ color: 'yellow' }}>CREATE YOUR DOG</h1>
        <div >
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className={s.form}>
              <label htmlFor="">Nombre (<span style={{ color: 'red' }}>*</span>)</label>
              <input type="text" value={input.name}
                name="name"
                onBlur={handleBlur}
                onChange={handleChange}
                className={errors.name ? s.error : s.success}
              />
            </div>
            {errors && errors.name && (
              <p
                style={{ color: "red" }}
              >{errors.name}</p>
            )}
            <div className={s.form}>
              <label htmlFor="">Height (<span style={{ color: 'red' }}>*</span>)</label>
              <input type="text"
                value={input.height}
                name="height"
                onBlur={handleBlur}
                onChange={handleChange}
              />
            </div>
            {errors && errors.height && (
              <p
                style={{ color: "red" }}
              >{errors.height}</p>
            )}
            <div className={s.form}>
              <label htmlFor="">Max-Weight (<span style={{ color: 'red' }}>*</span>)</label>
              <input type="text"
                value={input.maxWeight}
                name="maxWeight"
                onBlur={handleBlur}
                onChange={handleChange}
              />
            </div>
            {errors && errors.maxWeight && (
              <p style={{ color: "red" }}> {errors.maxWeight}</p>
            )}
            <div className={s.form}>
              <label htmlFor="">Min-Weight</label>
              <input type="text"
                value={input.minWeight}
                name="minWeight"
                onBlur={handleBlur}
                onChange={handleChange}
              />
            </div>
            <div className={s.form}>
              <label htmlFor="">Life span (<span style={{ color: 'red' }}>*</span>)</label>
              <input type="text"
                value={input.life_span}
                name="life_span"
                onBlur={handleBlur}
                onChange={handleChange}
              />
            </div>
            {errors && <errors className="life"></errors> && (
              <p style={{ color: "red" }}> {errors.life_span}</p>
            )}
            <div className={s.form}>
              <label htmlFor="">Image</label>
              <input type="text"
                value={input.image}
                name="image"
                onChange={handleChange}
              />
            </div>
            <select onChange={(e) => handleSelect(e)}
              style={{ marginTop: '10px' }}
            >
              {
                temperaments.map(item => (
                  <option value={item.name} key={item.id}>
                    {item.name}
                  </option>
                ))
              }
            </select> <br />
            <p style={{ color: 'rgb(189, 92, 92)' }}>campos obligatorios (<span style={{ color: 'red' }} >*</span>)</p>
            <button type="submit"
              // style={{background:'rgba(255,255,0,0.2)', orderRadius:'6px', margin:'5px'}}
              disabled={(errors.name || errors.height || errors.maxWeight || errors.life_span || !input.name || !input.height || !input.maxWeight || !input.life_span) ? true : false}
              className={(errors.name || errors.height || errors.maxWeight || errors.life_span || !input.name || !input.height || !input.maxWeight || !input.life_span) ? "null" : s.boton2}
            >
              Create Dog
            </button>
          </form>
        </div>
        <ul>
          <li style={{ listStyle: 'none', display: 'inline', color: 'yellow' }}>{input.temperament.map(t => (
            <div key={t.id} style={{ display: 'inline-block' }}>
              <p>{t} <button onClick={() => handleDelete(t)}>X</button></p>
            </div>
          ))}
          </li>
        </ul>
      </div>
    </div>
  )
}