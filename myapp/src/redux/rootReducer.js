
import { combineReducers } from 'redux'
import customersReducer from './customersReducer'
import productsReducer from './productsReducer'
import purchasesReducer from './purchasesReducer'

export default combineReducers({
  customersReducer,
  productsReducer,
  purchasesReducer
})