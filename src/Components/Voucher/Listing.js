import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { getVoucherListResponse } from '../../Reducer/voucherReducer';

const Listing = () => {
    const dispatch = useDispatch();
    const voucherList = useSelector((state)=> state.voucher.voucherlist )
    console.log(voucherList);
    useEffect(()=>{
        const url = `${process.env.REACT_APP_API_URL}voucher/list`;
        dispatch(getVoucherListResponse(url));
    },[])
  
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
                                              <Link to="/productDetails" className="product-title stretched-link">{card?.title}</Link>
                                              <div className="product-price">
                                                  <span className="offer-price">{card?.priceFrom + " - " + card?.priceFrom}</span>
                                              </div>
                                          </div>
                                      </div>
                                  </div>
                              )
                          })
                      }
                  </div>
              </div>
          </section>
      </div>
  </>
    )
}

export default Listing