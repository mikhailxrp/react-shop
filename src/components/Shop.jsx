import React, { useState, useEffect, useContext } from 'react';
import { ShopContext } from '../context';
import { API_URL } from '../config'
import GoodsList from './GoodsList';
import Preloader from './Preloader';
import Paginator from './Paginator';
import Cart from './Cart';
import ModalCart from './ModalCart';
import Alert from './Alert';

const Shop = () => {
    // Стейт из context
    const { goods, setGoods, loading, order, isCartShow, alertName } = useContext(ShopContext)

    // текущая страница --> пагинация
    const [currentPage, setCurrentPage] = useState(1)
    // количество товаров на странице 
    const [countGoodsPage] = useState(12)
    // индекс последней страницы
    const lastGoodsPage = currentPage * countGoodsPage
    // индекс первой страницы
    const firrstGoodsPage = lastGoodsPage - countGoodsPage
    // текущая страница
    const currentPageGoods = goods.slice(firrstGoodsPage, lastGoodsPage)


    const paginate = (number) => {
        setCurrentPage(number)
    }

    useEffect(() => {
        fetch(API_URL, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                Authorization: '6dfe859d-7b814ff3-ce34c777-c4e065d8'
            }
        }).then(result => {
            return result.json()
        }).then(data => {
            setGoods(data.shop)
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <main className='container shop-content'>
            {alertName && <Alert />}
            {loading && <Preloader />}
            {!loading && <GoodsList goods={currentPageGoods} />}
            <Cart quantity={order.length} />
            {isCartShow && <ModalCart />}
            <Paginator countGoodsPage={countGoodsPage} totalGoods={goods.length} paginate={paginate} />

        </main>
    );
};

export default Shop;