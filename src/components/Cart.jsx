import React, { useContext } from 'react';
import { ShopContext } from '../context';

const Cart = () => {
    const { order, handleCartShow } = useContext(ShopContext)
    const quantity = order.length
    return (
        <button className=" btn btn-outline-light d-flex align-items-center cart-btn" onClick={handleCartShow}>
            <i className="bi bi-bag-heart"></i>
            {quantity ? <span className='cart-quantity' > {quantity}</span> : null}
        </button>
    );
};

export default Cart;