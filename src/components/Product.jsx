// Импортирую context 
import React, { useContext } from 'react';
import { ShopContext } from '../context';

const Product = ({ product }) => {
    const { addProductCart } = useContext(ShopContext)
    return (

        <div className="card justify-content-between" style={{ width: '18rem' }}>
            <img src={product.displayAssets[0].full_background} className="card-img-top" alt="..." />

            <div className="card-body">
                <h5 className="card-title mt-3">{product.displayName}</h5>
                <p className="card-title">Тип: {product.displayType}</p>
                <p className="card-text h-50">Описание:
                    <span>  {product.displayDescription !== '' ? product.displayDescription : ' No description...'}</span>
                </p>
            </div>
            <div className="card-body bottom-card">
                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => addProductCart({ id: product.mainId, name: product.displayName, price: product.price.finalPrice })}
                >
                    Купить
                </button>
                <p
                    className="card-text float-end"
                    style={{ display: 'inline-block' }}>
                    Цена:
                    <span className='card-price'>{product.price.finalPrice}</span>
                </p>
            </div>
        </div>
    );
};

export default Product;