import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { getVoucherListResponse } from '../../Reducer/voucherReducer';

import Pagination from 'react-bootstrap/Pagination';
import { setError, setIsAuthenticated, setSuccess, setUser } from '../../Reducer/mainReducer';

const Listing = () => {
    const dispatch = useDispatch();
    const voucherList = useSelector((state) => state.voucher.voucherlist)
    const error = useSelector((state) => state.main.error)
    const [current, setCurrent] = useState({
        offSet: 1,
        data: []
    })

    const getCurrentItem = (index) => {
        setCurrent({
            offSet: index
        })
    }
    
    /************Pagination*********************/
    let items = [];
    voucherList && voucherList?.docs.forEach((element, index) => {
        if (index + 1 <= voucherList?.totalPages) {
            items.push(
                <Pagination.Item key={index} active={index + 1 === current?.offSet} onClick={(e) => { getCurrentItem(Number(e.target.text)) }}>
                    {index + 1}
                </Pagination.Item>,
            );
        }
    });

    useEffect(() => {
        const url = `${process.env.REACT_APP_API_URL}voucher/list`;
        dispatch(getVoucherListResponse({ page: current?.offSet }, url));
    }, [current])

    useEffect(() => {
        console.log(error);
       if(error?.statusCode === 401)
       {
        dispatch(setIsAuthenticated(false));
        dispatch(setSuccess(null));
        dispatch(setError({message:error?.message}))
        dispatch(setUser(null));
        localStorage.removeItem("token");
        localStorage.removeItem("user");
       }
    }, [error])

    return (
        <>
            <div className="main-content">
                <section className="section-padding-40">
                    <div className="container">
                        <div className="section-title">
                            <h4>Gifts Cards List</h4>
                        </div>
                        <div className="row cards-list g-4">
                            {
                                voucherList && voucherList?.docs.map((card, idx) => {
                                    return (
                                        <div className="col-md-3" key={idx}>
                                            <div className="product">
                                                <div className="product-media">
                                                    <div className="product-img">
                                                        <img src={card?.image} alt="" />
                                                    </div>
                                                </div>
                                                <div className="product-details">
                                                    <Link to={`/productDetails/${card?._id}`} className="product-title stretched-link">{card?.title}</Link>
                                                    <div className="product-price">
                                                        <span className="offer-price">{card?.priceFrom + " - " + card?.priceTo}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <Pagination>
                            <Pagination.Prev disabled={current?.offSet <= 1} onClick={() => { getCurrentItem(current?.offSet - 1) }} />
                            {items}
                            <Pagination.Next disabled={current?.offSet >= voucherList?.totalPages} onClick={() => { getCurrentItem(current?.offSet + 1) }} />
                        </Pagination>
                    </div>
                </section>
            </div>
        </>
    )
}

export default Listing