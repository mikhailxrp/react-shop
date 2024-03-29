import React from 'react';
import Product from './Product';

// в случае если что-то не так пишем что по умолчанию это фу-я addProduct = Function.prototype 
const GoodsList = ({ goods = [], addProduct = Function.prototype }) => {

    return (
        <div className='container'>
            <div className='product-wrapper pt-4'>
                {!goods.length && <h3>Ничего нет...</h3>}
                {goods.map(product => {
                    return <Product key={product.mainId} product={product} addProduct={addProduct}></Product>
                })}
            </div>
        </div>
    );
};

export default GoodsList;