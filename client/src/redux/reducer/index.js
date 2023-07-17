import { GET_DOGS, FILTER_BY_TEMPERAMENT, GET_TEMPERAMENTS, FILTER_CREATED, ORDER_BY_NAME, GET_NAME_DOG, GET_DETAIL, ORDER_BY_WEIGHT, DELETE_DETAIL } from '../actions';

const initialState = {

  dogs: [],
  allDogs: [],
  temperaments: [],
  detail: [],
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_DOGS:
      return {
        ...state,
        allDogs: action.payload,
        dogs: action.payload
      }
    case FILTER_BY_TEMPERAMENT:
      const allDoges = state.allDogs;
      const statusFilter = action.payload === "All"
        ? allDoges
        : allDoges.filter(
          (el) => {
            if (Array.isArray(el.temperaments)) {
              console.log(el, " ACA")
              return el.temperaments?.find((e) => e.name === action.payload)
            } else {
              console.log("ES CADENA= " + el.temperament)
              return el.temperament?.split(', ').find((e) => e === action.payload)
            }
          }
        )

      console.log(action.payload)
      return {
        ...state,
        dogs: statusFilter,

      }
    case GET_TEMPERAMENTS:
      return {
        ...state,
        temperaments: action.payload
      }
    case FILTER_CREATED:
      let ordenado = state.allDogs;
      let createdFilter = action.payload === "api" ?
        ordenado.filter(item => !item.createInDb) :
        ordenado.filter(item => item.createInDb)

      return {
        ...state,
        dogs: action.payload === 'All' ? ordenado :
          createdFilter
      }
    case ORDER_BY_NAME:
      let orderDog = action.payload === 'All' ? state.allDogs :
        action.payload === 'asc' ?
          state.dogs.sort(function (a, b) {
            if (a.name > b.name) {
              return 1;
            }
            if (b.name > a.name) {
              return -1;
            }
            return 0;
          }) :
          state.dogs.sort(function (a, b) {
            if (a.name > b.name) {
              return -1;
            }
            if (b.name > a.name) {
              return 1;
            }
            return 0;
          })
      return {
        ...state,
        dogs: orderDog
      }
    case GET_NAME_DOG:
      return {
        ...state,
        dogs: action.payload
      }
    case 'POST_DOG':
      return {
        ...state,
      }
    case GET_DETAIL:
      return {
        ...state,
        detail: action.payload
      }
    case ORDER_BY_WEIGHT:
      const dogWeight = action.payload === 'lighter' ?
        state.dogs.sort(function (a, b) {
          return a.weightFiltro - b.weightFiltro;
        }) :
        state.dogs.sort(function (a, b) {
          return b.weightFiltro - a.weightFiltro;
        })

      return {
        ...state,
        dogs: action.payload === 'All' ? state.allDogs :
          dogWeight
      }
    case DELETE_DETAIL:
      return {
        ...state,
        detail: []
      }

    default: return state;
  }
}