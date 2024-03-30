import { createContext, useReducer } from 'react';

import { reducer } from './reducer';
export const ShopContext = createContext();

const initialState = {
  goods: [],
  order: [],
  isCartShow: false,
  loading: true,
  alertName: '',
};

export const ContextProvider = ({ children }) => {
  const [value, dispatch] = useReducer(reducer, initialState);

  //   Получение товаров
  value.setGoods = (data) => {
    dispatch({ type: 'SET_GOODS', payload: data });
  };

  value.closeAlert = () => {
    dispatch({ type: 'CLOSE_ALERT' });
  };

  value.removeProductCart = (itemId) => {
    dispatch({ type: 'REMOVE_PRODUCT_CART', payload: { id: itemId } });
  };

  value.addProductCart = (item) => {
    dispatch({ type: 'ADD_PRODUCT_CART', payload: item });
  };

  value.incQuantity = (itemId) => {
    dispatch({ type: 'INCREMENT_QUANTITY', payload: { id: itemId } });
  };

  value.decQuantity = (itemId) => {
    console.log(itemId);
    dispatch({ type: 'DECREMENT_QUANTITY', payload: { id: itemId } });
  };

  value.handleCartShow = () => {
    dispatch({ type: 'SHOW_CART' });
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};
