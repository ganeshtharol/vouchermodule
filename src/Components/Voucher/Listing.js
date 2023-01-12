import React from 'react'
import { Link } from "react-router-dom";

import Pagination from 'react-bootstrap/Pagination';

const Listing = () => {


    let active = 2;
    let items = [];
    for (let number = 1; number <= 5; number++) {
    items.push(
        <Pagination.Item key={number} active={number === active}>
        {number}
        </Pagination.Item>,
    );
    }
  
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
                          [...Array(10)].map((card, idx) => {
                              return (
                                  <div className="col-md-3" key={idx}>
                                      <div className="product">
                                          <div className="product-media">
                                              <div className="product-img">
                                                  <img src="https://m.media-amazon.com/images/I/414lKAC1oHL._AC_UL320_.jpg" alt="" />
                                              </div>
                                          </div>
                                          <div className="product-details">
                                              <Link to="/productDetails" className="product-title stretched-link">Lifestyle E-Gift Card - Flat 5% off - Redeemable at Stores</Link>
                                              <div className="product-price">
                                                  <span className="offer-price">$50 - $500</span>
                                              </div>
                                          </div>
                                      </div>
                                  </div>
                              )
                          })
                      }
                  </div>
                  <Pagination>
                        <Pagination.Prev />   
                        {items}
                        <Pagination.Next />
                    </Pagination>
              </div>
          </section>
      </div>
  </>
    )
}

export default Listing