import React from 'react';
import ItemCart from './ItemCart';

const ModalCart = (props) => {
    const {
        order = [],
        handleCartShow = Function.prototype,
        removeProductCart = Function.prototype,
        addQyantityItem = Function.prototype,
        removeQantityItem = Function.prototype
    } = props
    // ощая стоимость товаров
    const totalPrice = order.reduce((sum, el) => {
        return sum + el.price * el.quantity
    }, 0)
    return (
        <div className="list-group list-cart">
            <li className="list-group-item active text-center" aria-current="true">
                Корзина
                <i className="bi bi-x-circle close-cart" onClick={handleCartShow}></i>
            </li>
            {
                order.length ? order.map(item => {
                    return <ItemCart
                        {...item}
                        key={item.id}
                        removeProductCart={removeProductCart}
                        addQyantityItem={addQyantityItem}
                        removeQantityItem={removeQantityItem}
                    />
                }) : <li className="list-group-item  cart-item">Корзина пуста</li>
            }
            <li className="list-group-item active">Общая стоимость товаров: {totalPrice}руб.</li>
            <div className='order-wrapper'>
                <button type="button" className="btn btn-outline-primary d-block m-auto">Оформить заказ</button>
            </div>
        </div>
    );
};

export default ModalCart;