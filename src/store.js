import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './cart/CartSlice'
import navbarReducer from './navbar/NavbarSlice'
import personalReducer from './personalInfo/PersonalSlice'

export default configureStore({
  reducer: {
    cart: cartReducer,
    navbar: navbarReducer,
    personal: personalReducer,
  },
})