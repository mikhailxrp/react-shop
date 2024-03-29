import React, { useEffect } from 'react';

const Alert = ({ name = '', closeAlert = Function.prototype }) => {

    useEffect(() => {
        const timerId = setTimeout(closeAlert, 2000)

        // очистка таймера
        return () => { clearTimeout(timerId) }
    }, [name])

    return (
        <div className="toast-container position-fixed top-0 end-0 p-3">
            <div id="liveToast" className="toast show" role="alert" >
                <div className="toast-header">
                    <div className="rounded me-2"></div>
                </div>
                <div className="toast-body">
                    <span style={{ fontWeight: '700' }}>{name}</span> добавлен в корзину
                </div>
            </div>
        </div>
    );
};

export default Alert;