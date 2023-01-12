
import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Modal from 'react-bootstrap/Modal';
import DatePicker from "react-datepicker"


// Datepicker CSS
import "react-datepicker/dist/react-datepicker.css"

function ProductDetails() {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [startDate, setStartDate] = useState(new Date());

    return (
        <>
            <div className="main-content">
                <section className="section-padding-40">
                    <div className="container">
                        <div className="row product-main">
                            <div className="col-lg-6 mb-4 mb-lg-0">
                                <div className="gift-card-preview">
                                    <div className="gift-card-preview-img">
                                        <img src="https://m.media-amazon.com/images/G/31/gc/designs/livepreview/happy_pongal_noto_email_in-main._CB618407262_.jpg" alt="" />
                                    </div>
                                    <div className="gift-card-preview-info">
                                        <h4>$500</h4>
                                        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cumque veniam quas accusantium incidunt suscipit.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <Formik>
                                    {
                                        () => {
                                            return (
                                                <Form>
                                                    <div className="form-block">
                                                        <h4 className="details-title">Select a style for your Gift Card </h4>
                                                        <div className="product-prices">
                                                            <div className="card-variety">
                                                                <ul>
                                                                    {
                                                                        [...Array(5)].map((card, index) => {
                                                                            return (
                                                                                <li>
                                                                                    <div className="card-variety">
                                                                                        <Field
                                                                                            type="radio"
                                                                                            name="card"
                                                                                            id={`varient${index}`}
                                                                                        />
                                                                                        <label htmlFor={`varient${index}`}>
                                                                                            <img src="https://m.media-amazon.com/images/I/41v8Czik9OL._SR80,60_.jpg" alt="" />
                                                                                        </label>
                                                                                    </div>
                                                                                </li>
                                                                            )
                                                                        })
                                                                    }
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="form-block border-0">
                                                        <h4 className="details-title">Enter your Gift Card details</h4>
                                                        <h5 className="product-prop">Amount</h5>
                                                        <div className="price-option">
                                                            <ul>
                                                                {
                                                                    [...Array(5)].map((card, index) => {
                                                                        return (
                                                                            <li>
                                                                                <div className="price-radio">
                                                                                    <Field
                                                                                        type="radio"
                                                                                        name="card-price"
                                                                                        id={`size${index}`}
                                                                                    />
                                                                                    <label htmlFor={`size${index}`}>500</label>
                                                                                </div>
                                                                            </li>
                                                                        )
                                                                    })
                                                                }
                                                                <li>
                                                                    <div className="custom-price">
                                                                        <Field
                                                                            type="text"
                                                                            placeholder="Other Amount"
                                                                            className="form-control"
                                                                        />
                                                                    </div>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                        <div className="delivery-details">
                                                            <h5 className="product-prop mb-4">Delivery Details</h5>
                                                            <div className="row mb-4">
                                                                <div className="col-md-2">
                                                                    <label htmlFor="" className="form-label">To</label>
                                                                </div>
                                                                <div className="col-md-10">
                                                                    <Field
                                                                        as="textarea"
                                                                        placeholder="Enter recipient e-mail address"
                                                                        className="form-control"

                                                                    />
                                                                    <div className="form-text">Max of 5 recipients </div>
                                                                </div>
                                                            </div>
                                                            <div className="row mb-4">
                                                                <div className="col-md-2">
                                                                    <label htmlFor="">From</label>
                                                                </div>
                                                                <div className="col-md-10">
                                                                    <Field
                                                                        type="text"
                                                                        placeholder="Your Name"
                                                                        className="form-control"
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="row mb-4">
                                                                <div className="col-md-2">
                                                                    <label htmlFor="">Message</label>
                                                                </div>
                                                                <div className="col-md-10">
                                                                    <Field
                                                                        as="textarea"
                                                                        placeholder="Write a message"
                                                                        className="form-control"
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="row mb-4">
                                                                <div className="col-md-2">
                                                                    <label htmlFor="">Quantity</label>
                                                                </div>
                                                                <div className="col-md-10">
                                                                    <Field
                                                                        type="text"
                                                                        className="form-control"
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="row mb-4">
                                                                <div className="col-md-2">
                                                                    <label htmlFor="">Delivery Date</label>
                                                                </div>
                                                                <div className="col-md-10">
                                                                    {/* <Field
                                                                        type="text"
                                                                        className="form-control"
                                                                    /> */}
                                                                    <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} className="form-control" />
                                                                    <div className="form-text">Up to 3 months from today</div>
                                                                </div>
                                                            </div>
                                                            <div className="row">
                                                                <div className="col-md-10 offset-md-2">
                                                                    <div className="row">
                                                                        <div className="col-md-6 mb-3 mb-md-0">
                                                                            <button className="button button-black w-100" type="button">Add to Cart</button>
                                                                        </div>
                                                                        <div className="col-md-6">
                                                                            <button className="button button-purple w-100" type="button" onClick={handleShow}>Buy Now</button>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                            </div>
                                                        </div>
                                                    </div>
                                                </Form>
                                            )
                                        }
                                    }
                                </Formik>

                            </div>
                        </div>
                    </div>
                </section>
            </div>

            <Modal show={show} onHide={handleClose}>
                <Modal.Body>
                    <div className="order-success">
                        <h4>Thank You!</h4>
                        <p>Your Order has been placed.</p>
                    </div>
                    <div className="gift-card-preview">
                        <div className="gift-card-preview-img">
                            <img src="https://m.media-amazon.com/images/G/31/gc/designs/livepreview/happy_pongal_noto_email_in-main._CB618407262_.jpg" alt="" />
                        </div>
                        <div className="gift-card-preview-info">
                            <h4>$500</h4>
                            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cumque veniam quas accusantium incidunt suscipit.</p>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    
                        <div className="col-md-5">
                        <button onClick={handleClose} className="button button-purple w-100">
                            Close
                        </button>
                        </div>
                
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ProductDetails;