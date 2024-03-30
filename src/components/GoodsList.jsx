import React from 'react';
import Product from './Product';

const GoodsList = ({ goods }) => {

    return (
        <div className='container'>
            <div className='product-wrapper pt-4'>
                {!goods.length && <h3>Ничего нет...</h3>}
                {goods.map(product => {
                    return <Product key={product.mainId} product={product}></Product>
                })}
            </div>
        </div>
    );
};

export default GoodsList;