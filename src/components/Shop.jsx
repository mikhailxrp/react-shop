import React, { useState, useEffect } from 'react';
import { API_URL } from '../config'
import GoodsList from './GoodsList';
import Preloader from './Preloader';
import Paginator from './Paginator';
import Cart from './Cart';
import ModalCart from './ModalCart';
import Alert from './Alert';

const Shop = () => {
    // Общий список товаров
    const [goods, setGoods] = useState([])
    // Товары в корзине
    const [order, setOrder] = useState([])
    // видимость корзины
    const [isCartShow, setIsCartShow] = useState(false)
    // состояние загрузки товаров
    const [loading, setLoading] = useState(true)
    // текущая страница --> пагинация
    const [currentPage, setCurrentPage] = useState(1)
    // количество товаров на странице 
    const [countGoodsPage] = useState(12)
    // Имя для всплывающей подсказки
    const [alertName, setAlertName] = useState('')

    // индекс последней страницы
    const lastGoodsPage = currentPage * countGoodsPage
    // индекс первой страницы
    const firrstGoodsPage = lastGoodsPage - countGoodsPage
    // текущая страница
    const currentPageGoods = goods.slice(firrstGoodsPage, lastGoodsPage)

    const paginate = (number) => {
        setCurrentPage(number)
    }

    // получаю объект(товар) и добавляю его в корзину
    const addProductCart = (item) => {
        // проверяю был ли добавлен товар в корзину тут получу индекс товара если он был добавлен в корзину, если нет придет -1
        const itemIndex = order.findIndex(orderItem => orderItem.id === item.id)

        // если не добавлен товар в корзину --> добавляю
        if (itemIndex < 0) {
            const newItem = {
                ...item,
                quantity: 1
            }
            setOrder([...order, newItem])
        } else {
            // если товар уже был в корзине тогда для аналогичного товара изменяю его количество в корзине
            const newOrder = order.map((orderItem, index) => {
                if (index === itemIndex) {
                    return {
                        ...orderItem,
                        quantity: orderItem.quantity + 1
                    }
                } else {
                    return orderItem
                }
            })
            // обновляю массив корзины 
            setOrder(newOrder)
        }
        setAlertName(item.name)
    }

    // Удаление товара из корзины
    const removeProductCart = (itemId) => {
        const newOrder = order.filter(el => el.id !== itemId)
        setOrder(newOrder)
    }

    // удаление и добавление товара из корзины
    const addQyantityItem = (itemId) => {
        setOrder(prevState => prevState.map(item => {
            if (itemId === item.id) {
                return { ...item, quantity: item.quantity + 1 }
            } else {
                return item
            }
        }))
    }
    const removeQantityItem = (itemId) => {
        setOrder(prevState => prevState.map(item => {
            if (itemId === item.id) {
                return { ...item, quantity: item.quantity !== 0 ? item.quantity - 1 : 0 }
            } else {
                return item
            }
        }))
    }


    // видимость корзины
    const handleCartShow = () => {
        setIsCartShow(!isCartShow)
    }
    // Закрытие подсказки корзины
    const closeAlert = () => {
        setAlertName('')
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
            data && setGoods(data.shop)
            setLoading(false)
        })

    }, [])

    return (
        <main className='container shop-content'>
            {alertName && <Alert name={alertName} closeAlert={closeAlert} />}
            {loading && <Preloader />}
            {!loading && <GoodsList goods={currentPageGoods} addProduct={addProductCart} />}
            <Cart quantity={order.length} handleCartShow={handleCartShow} />
            {isCartShow && <ModalCart
                order={order}
                handleCartShow={handleCartShow}
                removeProductCart={removeProductCart}
                addQyantityItem={addQyantityItem}
                removeQantityItem={removeQantityItem}
            />
            }
            <Paginator countGoodsPage={countGoodsPage} totalGoods={goods.length} paginate={paginate} />

        </main>
    );
};

export default Shop;