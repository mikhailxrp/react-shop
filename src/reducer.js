// Экспортируем функцию reducer которая принимает state и action - это некий объект в данном случае принимает type и payload т.е. тип действия и какие-то значения
export function reducer(state, { type, payload }) {
  // тут буду проверять тип действия(action) и выполнять какие-то действия или возвращать state как он есть
  switch (type) {
    // кейс получения списка товаров
    case 'SET_GOODS':
      return {
        ...state,
        goods: payload || [],
        loading: false,
      };
    // проверяем тип пришедшего содытия и если это тип подходит под указанное событие тут это 'CLOSE_ALERT' тогда возвращаем какое-то действие со стейтом, в данном конкретном случае реализуем функциональность той функции которая написана в компоненте shop
    case 'CLOSE_ALERT':
      return {
        ...state,
        alertName: '',
      };
    case 'REMOVE_PRODUCT_CART':
      // тут берем state и меняем у него одно значение ключа order - этот ключ соотвествует массиву корзины, там храняться все товары добавленные в корзину, но здесь получаем значение itemId как payload.id - именно так был передан itemId в файле context.js
      return {
        ...state,
        order: state.order.filter((el) => el.id !== payload.id),
      };

    //   в этом кейсе обрабатываем добавление товара в корзину собственно говоря тут пишем схожу логику, с некоторыми изменениями тут paylod это тот товар который передан в корзину поэтому и обращаемся к ключам товара через точку у payload
    case 'ADD_PRODUCT_CART': {
      // проверка был ли добавлен товар в корзину
      const itemIndex = state.order.findIndex(
        (orderItem) => orderItem.id === payload.id
      );
      //   тут создаем переменную которая будет новым заказом
      let newOrder = null;
      if (itemIndex < 0) {
        const newItem = {
          ...payload,
          quantity: 1,
        };
        // тут добавляем товар в корзину
        newOrder = [...state.order, newItem];
      } else {
        // если товар уже был в корзине тогда для аналогичного товара изменяю его количество в корзине
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
