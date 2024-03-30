import { createContext, useReducer } from 'react';
// импортирую reducer
import { reducer } from './reducer';
export const ShopContext = createContext();
// инициализируем state, т.е. тут будет храниться все состояние прилоения
const initialState = {
  goods: [],
  order: [],
  isCartShow: false,
  loading: true,
  alertName: '',
};

// компонент обертка через который будут пробрасываться все состояния через контекст которая принимает porop --> children в которые будет что-то пробрасывать
export const ContextProvider = ({ children }) => {
  //  создаем reduer который и будет выполнять все действия со state который принимает
  const [value, dispatch] = useReducer(reducer, initialState);

  //   Получение товаров
  value.setGoods = (data) => {
    dispatch({ type: 'SET_GOODS', payload: data });
  };

  //   событие показа алерта когда товар добавлен в корзину, данный метод вызывает dispatch в котором указываем тип события и какой-то payload если он нужен для выполнения функции
  value.closeAlert = () => {
    dispatch({ type: 'CLOSE_ALERT' });
  };
  //   событие удаления товара из корзины принимает itemId и срабатывает по типу события REMOVE_PRODUCT_CART и принимает payload который передаем как объект
  value.removeProductCart = (itemId) => {
    dispatch({ type: 'REMOVE_PRODUCT_CART', payload: { id: itemId } });
  };
  //   Событие добавления товара в корзину
  value.addProductCart = (item) => {
    dispatch({ type: 'ADD_PRODUCT_CART', payload: item });
  };
  // Событие увелечения количества определенного товара
  value.incQuantity = (itemId) => {
    dispatch({ type: 'INCREMENT_QUANTITY', payload: { id: itemId } });
  };
  // Событие уменьшения количества определенного товара
  value.decQuantity = (itemId) => {
    console.log(itemId);
    dispatch({ type: 'DECREMENT_QUANTITY', payload: { id: itemId } });
  };
  //   Появление корзины
  value.handleCartShow = () => {
    dispatch({ type: 'SHOW_CART' });
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};
