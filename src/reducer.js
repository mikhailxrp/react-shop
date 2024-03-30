export function reducer(state, { type, payload }) {
  switch (type) {
    // кейс получения списка товаров
    case 'SET_GOODS':
      return {
        ...state,
        goods: payload || [],
        loading: false,
      };
    case 'CLOSE_ALERT':
      return {
        ...state,
        alertName: '',
      };
    case 'REMOVE_PRODUCT_CART':
      // Удаление товара из корзины
      return {
        ...state,
        order: state.order.filter((el) => el.id !== payload.id),
      };
    // добавление товара в корзину
    case 'ADD_PRODUCT_CART': {
      const itemIndex = state.order.findIndex(
        (orderItem) => orderItem.id === payload.id
      );

      let newOrder = null;
      if (itemIndex < 0) {
        const newItem = {
          ...payload,
          quantity: 1,
        };

        newOrder = [...state.order, newItem];
      } else {
        newOrder = state.order.map((orderItem, index) => {
          if (index === itemIndex) {
            return {
              ...orderItem,
              quantity: orderItem.quantity + 1,
            };
          } else {
            return orderItem;
          }
        });
      }
      return {
        ...state,
        order: newOrder,
        alertName: payload.name,
      };
    }
    // изменения количество товара в корзине
    case 'INCREMENT_QUANTITY':
      return {
        ...state,
        order: state.order.map((item) => {
          if (payload.id === item.id) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        }),
      };
    case 'DECREMENT_QUANTITY':
      return {
        ...state,
        order: state.order.map((item) => {
          if (payload.id === item.id) {
            return {
              ...item,
              quantity: item.quantity !== 0 ? item.quantity - 1 : 0,
            };
          } else {
            return item;
          }
        }),
      };
    // Видимость корзины
    case 'SHOW_CART':
      return {
        ...state,
        isCartShow: !state.isCartShow,
      };
    default:
      return state;
  }
}
