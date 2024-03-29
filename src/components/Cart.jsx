import React from 'react';

const Cart = ({ quantity = 0, handleCartShow = Function.prototype }) => {
    return (
        <button className=" btn btn-outline-light d-flex align-items-center cart-btn" onClick={handleCartShow}>
            <i className="bi bi-bag-heart"></i>
            {quantity ? <span className='cart-quantity' > {quantity}</span> : null}
        </button>
    );
};

export default Cart;