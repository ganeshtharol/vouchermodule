import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setError, setIsAuthenticated, setSuccess, setUser } from "../../Reducer/mainReducer";
import { getOrderListResponse } from "../../Reducer/orderReducer";

function CartList() {
    const dispatch = useDispatch();
    const orderList = useSelector((state) => state.order.orderList);
    const error = useSelector((state) => state.main.error)
    useEffect(() => {
        const url = `${process.env.REACT_APP_API_URL}order/list`;
        dispatch(getOrderListResponse({},url));
    }, [])
    useEffect(() => {
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
        <div className="main-content">
            <section className="section-padding-40">
                <div className="container">
                    <div className="cart-item-list">
                        <div className="section-title">
                            <h4>Orders</h4>
                        </div>
                        <ul>
                            {
                                orderList.length > 0 && orderList.map((item, idx) => {
                                    return(
                                        <li className="item-product" key={idx}>
                                            <div className="main">
                                                <div className="item-info">
                                                    <figure><img src={item?.styleImg} alt="" /></figure>
                                                    <figcaption>
                                                        <h4>{item?.voucherDetail?.title}</h4>
                                                    </figcaption>
                                                </div>
                                                <div className="item-meta-data">
                                                    <h5>Code - {item?.vouCode}</h5>
                                                    <h5>Qty - {item?.quantity}</h5>
                                                    <h4 className="cart-item-price">₹{item?.amount}</h4>
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

