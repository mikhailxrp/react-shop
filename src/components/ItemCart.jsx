import React, { useContext } from 'react';
import { ShopContext } from '../context';

const ItemCart = (props) => {
    const {
        id,
        name,
        price,
        quantity,
    } = props

    const { removeProductCart, incQuantity, decQuantity } = useContext(ShopContext)

    return (
        <li className="list-group-item cart-item">
            {name}
            <div className='quantity-count'>
                <i className="bi bi-plus-square-dotted quantity-icon" onClick={() => incQuantity(id)}></i>
                x{quantity}
                <i className="bi bi-dash-square-dotted quantity-icon" onClick={() => decQuantity(id)} ></i>
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