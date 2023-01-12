function CartList() {
    return (
        <div className="main-content">
            <section className="section-padding-40">
                <div className="container">
                    <div className="cart-item-list">
                        <div className="section-title">
                            <h4>Cart Item</h4>
                        </div>
                        <ul>
                            {
                                [...Array(3)].map((item, idx) => {
                                    return(
                                        <li className="item-product" key={idx}>
                                            <div className="main">
                                                <div className="item-info">
                                                    <figure><img src="https://m.media-amazon.com/images/I/4178FMimIyL._SR80,60_.jpg" alt="" /></figure>
                                                    <figcaption>
                                                        <h4>Voucher Pay eGift Card</h4>
                                                    </figcaption>
                                                </div>
                                                <div className="item-meta-data">
                                                    <h4 className="cart-item-price">$30.00</h4>
                                                </div>
                                            </div>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                    <div className="order-summary-details mb-4">
                        <div className="total">
                            <h4>Estimated Total<span>$90</span></h4>
                        </div>
                    </div>
                    <div className="row">                                                
                        <div className="col-xl-3 col-lg-4 col-md-6">
                            <button className="button button-purple w-100" type="button">Buy Now</button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}


export default CartList;

