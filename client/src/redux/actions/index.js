import axios from 'axios';

export const GET_DOGS = "getDogs";
export const GET_TEMPERAMENTS = "getTemperaments";
export const FILTER_BY_TEMPERAMENT = "filterByTemeperaments";
export const FILTER_CREATED = "filterCreated";
export const ORDER_BY_NAME = "orderByName";
export const GET_NAME_DOG = "getNameDog";
export const GET_DETAIL = "getDetail";
export const ORDER_BY_WEIGHT = "orderByWeight";
export const DELETE_DETAIL = 'deleteDetail';

export function getDogs() {
  return async function (dispatch) {
    var result = await axios.get("http://localhost:3500/dogs")
    return dispatch({
      type: GET_DOGS,
      payload: result.data
    })
  }
}

export function getTemperaments() {
  return async function (dispatch) {
    var result = await axios.get('http://localhost:3500/temperaments')
    return dispatch({
      type: GET_TEMPERAMENTS,
      payload: result.data
    })
  }
}

export function postDog(payload) {
  return async function (dispatch) {
    const response = await axios.post("http://localhost:3500/dogs", payload)
    //console.log(response);
    return response;
  }
}

export function filterByTemeperaments(payload) {
  //console.log(payload)
  return {

    type: FILTER_BY_TEMPERAMENT,
    payload
  }
}

export function filterCreated(payload) {
  return {
    type: FILTER_CREATED,
    payload
  }
}

export function orderByName(payload) {
  return {
    type: ORDER_BY_NAME,
    payload
  }
}

export function orderByWeight(payload) {
  return {
    type: ORDER_BY_WEIGHT,
    payload
  }
}

export function getNameDog(name) {
  return async function (dispatch) {
    try {
      var perro = await axios.get(`http://localhost:3500/dogs?name=${name}`)
      return dispatch({
        type: GET_NAME_DOG,
        payload: perro.data
      })
    } catch (err) {
      console.log(err)
    }
  }

}

export function getDetail(id) {
  return async function (dispatch) {
    try {
      var detalle = await axios.get(`http://localhost:3500/dogs/${id}`)
      return dispatch({
        type: GET_DETAIL,
        payload: detalle.data
      })
    } catch (error) {
      console.log(error)
    }
  }
}

export function deleteDetail(payload){
  return {
    type: DELETE_DETAIL,
    payload    
  }
}