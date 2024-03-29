import React from 'react';

const Paginator = ({ countGoodsPage, totalGoods, paginate }) => {
    // количество кнопок
    const totalPage = []

    // расчет количества кнопок
    for (let btn = 1; btn <= Math.ceil(totalGoods / countGoodsPage); btn++) {
        totalPage.push(btn)
    }

    return (
        <div className='container'>
            <ul className="pagination d-flex justify-content-center mt-3 flex-wrap">
                {totalPage.map(pageNUmber => {
                    return <li className='page-item' key={pageNUmber} >
                        <a href='!#' className='page-link' onClick={() => paginate(pageNUmber)} >{pageNUmber}</a>
                    </li>
                })}
            </ul>
        </div>
    );
};

export default Paginator;