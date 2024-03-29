import React from 'react';

const ItemCart = (props) => {
    const {
        id,
        name,
        price,
        quantity,
        removeProductCart = Function.prototype,
        addQyantityItem = Function.prototype,
        removeQantityItem = Function.prototype
    } = props
    return (
        <li className="list-group-item cart-item">
            {name}
            <div className='quantity-count'>
                <i className="bi bi-plus-square-dotted quantity-icon" onClick={() => addQyantityItem(id)}></i>
                x{quantity}
                <i className="bi bi-dash-square-dotted quantity-icon" onClick={() => removeQantityItem(id)} ></i>
                = <span> {price * quantity}</span>руб.
            </div>
            <button
                type="button"
                className="btn btn-outline-danger cart-danger-btn"
                onClick={() => removeProductCart(id)}
            >
                <i className="bi bi-x-circle"></i>
            </button>
        </li>
    );
};

export default ItemCart;