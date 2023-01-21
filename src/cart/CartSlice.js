import { createSlice } from '@reduxjs/toolkit';
import {NotificationManager} from 'react-notifications';

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
  },
  reducers: {
    addItem: (state, action) => {
      const foundItem = state?.items?.find(item => item.id === action.payload.id);
      if (foundItem) {
        const index = state?.items?.indexOf(foundItem);
        const newItems = [...state.items];
        newItems.splice(index, 1, action.payload);
        NotificationManager.success('Item adicionado ao carrinho!', null, 2000);
        return { items: newItems };
      } else {
        NotificationManager.success('Item adicionado ao carrinho!', null, 2000);
        return { items: [...state.items, action.payload] };
      }
    },
    removeItem: (state, action) => {
        const foundItem = state?.items?.find(item => item.id === action.payload.id);
        if (foundItem && foundItem.quantity > 1) {
          const index = state?.items?.indexOf(foundItem);
          const newItems = [...state.items];
          newItems.splice(index, 1, action.payload);
          NotificationManager.error('Item removido do carrinho!', null, 2000);
          return { items: newItems };
        } else {
          const index = state?.items?.indexOf(foundItem);
          const newItems = [...state.items];
          newItems.splice(index, 1);
          NotificationManager.error('Item removido do carrinho!', null, 2000);
          return { items: newItems };
        }
    },
  },
})

// Action creators are generated for each case reducer function
export const { addItem, removeItem, incrementItem, decrementItem } = cartSlice.actions

export default cartSlice.reducer