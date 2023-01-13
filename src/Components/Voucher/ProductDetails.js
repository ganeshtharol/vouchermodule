
import { useEffect, useRef, useState } from "react";
import { Formik, Form, Field, ErrorMessage, useFormikContext } from "formik";
import Modal from 'react-bootstrap/Modal';
import DatePicker from "react-datepicker";
import * as Yup from "yup";

// Datepicker CSS
import "react-datepicker/dist/react-datepicker.css"
import { useDispatch, useSelector } from "react-redux";
import { getVoucherResponse, setCheckout } from "../../Reducer/voucherReducer";
import { useParams } from "react-router-dom";
import { setError, setIsAuthenticated, setSuccess, setUser } from "../../Reducer/mainReducer";

function ProductDetails() {

    const dispatch = useDispatch();
    const { id } = useParams();
    const ref = useRef(null);
    const voucher = useSelector((state) => state.voucher.currentVoucher);
    const successRes = useSelector((state) => state.main.success);
    const errorRes = useSelector((state) => state.main.error);
    const [show, setShow] = useState(false);
    const handleClose = () => {
        setShow(false);
        dispatch(setSuccess({}))
    };
    const handleShow = () => setShow(true);
    const [startDate, setStartDate] = useState(new Date());
    const [totalAmount, setTotalAmount] = useState(0);
    const [endDate] = useState(new Date());
    const Schema = Yup.object().shape({
        amount: Yup.number()
            .required("Please select amount"),
        emails: Yup.string().required("emails is required").test('emails', "Not a valid value", async (value) => {
            if (value) {
                let tempVal = value.split(",");
                let flag = [];
                for await (const iterator of tempVal) {
                    let reg = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g);
                    if (!reg.test(iterator)) {
                        flag.push(iterator)
                    }
                }
                return flag.length == 0;
            }
        }),
        from: Yup.string()
            .required("Enter name"),
        styleImg: Yup.string()
            .required("Please Select your gift card style"),
        message: Yup.string()
            .required("Please enter message"),
        deliveryDate: Yup.string()
            .required("Please select delivery date"),
        quantity: Yup.number()
            .required("Please enter quantity"),

    });

    const handleCalculations = (amount, qty, emailsQty, setFieldValue) => {
        if (emailsQty > 1) {
            setFieldValue('quantity', 1)
            setTotalAmount(Number(amount) * emailsQty)
        }
        else {
            setTotalAmount(Number(amount) * qty)
        }

    }


    const handleSubmit = (values) => {
        let emails = [];
        emails = values.emails.split(',')
        values.emails = emails;
        const url = `${process.env.REACT_APP_API_URL}order/checkout`;
        dispatch(setCheckout(values, url))
        values.emails = "";
        handleShow();
    }

    let items = [];
    for (let i = voucher?.detail?.priceFrom; i <= voucher?.detail?.priceTo;) {
        items.push(i);
        i = i + 500;
    }


    useEffect(() => {
        const url = `${process.env.REACT_APP_API_URL}voucher/detail`;
        dispatch(getVoucherResponse({ id: id }, url));
    }, [])

    useEffect(() => {
        endDate.setMonth(startDate.getMonth() + 3);
    }, [endDate, startDate])

    useEffect(() => {
        if (successRes) {
          setTimeout(() => {
            dispatch(setSuccess(null))
            dispatch(setError(null))
           
          }, 2000)
        }
        if (errorRes) {
          setTimeout(() => {
            dispatch(setError(null))
           
          }, 2000)
        }
      }, [successRes,errorRes]);

      useEffect(() => {
        if(errorRes?.statusCode === 401)
        {
         dispatch(setIsAuthenticated(false));
         dispatch(setSuccess(null));
         dispatch(setError({message:errorRes?.message}))
         dispatch(setUser(null));
         localStorage.removeItem("token");
         localStorage.removeItem("user");
        }
     }, [errorRes])


    return (
        <>
            <div className="main-content">
                <section className="section-padding-40">
                    <div className="container">
                        <div className="row product-main">
                            <div className="col-lg-6 mb-4 mb-lg-0">
                                <div className="gift-card-preview">
                                    <div className="gift-card-preview-img">
                                        <img src={voucher?.detail?.image} alt="" />
                                    </div>
                                    <div className="gift-card-preview-info">
                                        <h4>{"₹" + voucher?.detail?.priceFrom + "- ₹" + voucher?.detail?.priceTo}</h4>
                                        <p>{voucher?.detail?.title}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <Formik
                                    innerRef={ref}
                                    initialValues={{ amount: "", emails: "", from: "", styleImg: voucher?.style[0], message: "", deliveryDate: startDate, voucherId: id, quantity: 1, other: 0 }}
                                    validationSchema={Schema}
                                    onSubmit={(values) => {
                                        handleSubmit(values)
                                    }}
                                >
                                    {
                                        ({ touched, errors, isSubmitting, values, setFieldValue }) => {
                                            return (
                                                <Form>
                                                    <div className="form-block">
                                                        <h4 className="details-title">Select a style for your Gift Card </h4>
                                                        <div className="product-prices">
                                                            <div className="card-variety">
                                                                <ul>
                                                                    {
                                                                        voucher && voucher?.style.map((card, index) => {
                                                                            return (
                                                                                <li>
                                                                                    <div className="card-variety">
                                                                                        <Field
                                                                                            type="radio"
                                                                                            name="styleImg"
                                                                                            id={`varient${index}`}
                                                                                            value={card?.image}
                                                                                        />
                                                                                        <label htmlFor={`varient${index}`}>
                                                                                            <img src={card?.image} alt="" />
                                                                                        </label>
                                                                                    </div>
                                                                                </li>
                                                                            )
                                                                        })
                                                                    }
                                                                </ul>
                                                                {touched.styleImg && errors.styleImg && <div class="invalid-feedback d-block">{errors.styleImg}</div>}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="form-block border-0">
                                                        <h4 className="details-title">Enter your Gift Card details</h4>
                                                        {errorRes && <div>
                                                            <h1 className="p-3 mt-5">Error!</h1>
                                                            <div className="alert alert-danger mt-3">
                                                                {errorRes.message}
                                                            </div>
                                                        </div>}
                                                        <h5 className="product-prop">Amount</h5>
                                                        <div className="price-option">
                                                            <ul>

                                                                {
                                                                    items.length > 0 && items.map((amount, index) => {
                                                                        return (
                                                                            <li>
                                                                                <div className="price-radio">
                                                                                    <Field
                                                                                        type="radio"
                                                                                        name="amount"
                                                                                        id={`size${index}`}
                                                                                        value={Number(amount)}
                                                                                        className={`form-control
                                                                                        ${touched.amount && errors.amount ? "is-invalid" : ""}`}
                                                                                        onBlur={() => {
                                                                                            setFieldValue("other", 0)
                                                                                        }}
                                                                                    />
                                                                                    <label htmlFor={`size${index}`}>{Number(amount)}</label>
                                                                                </div>
                                                                            </li>
                                                                        )
                                                                    })
                                                                }

                                                                <li>
                                                                    <div className="custom-price">
                                                                        <Field
                                                                            type="number"
                                                                            placeholder="Other Amount"
                                                                            className="form-control"
                                                                            name="other"
                                                                            max={voucher?.detail?.priceTo}
                                                                            onBlur={(e) => {
                                                                                setFieldValue("amount", e.target.value)
                                                                                let emailQty = values.emails.split(',');
                                                                                handleCalculations(e.target.value, values.quantity, emailQty?.length, setFieldValue)
                                                                            }}
                                                                        />
                                                                    </div>
                                                                </li>
                                                            </ul>
                                                            {touched.amount && errors.amount && <div class="invalid-feedback d-block">{errors.amount}</div>}
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
                                                                        name="emails"
                                                                        className={`form-control
                                                                        ${touched.emails && errors.emails ? "is-invalid" : ""}`}
                                                                        onBlur={() => {
                                                                            let emailQty = values.emails.split(',');
                                                                            handleCalculations(values.amount, values.quantity, emailQty?.length, setFieldValue)
                                                                        }}
                                                                    />
                                                                    <div className="form-text">Max of 5 recipients </div>
                                                                    <ErrorMessage
                                                                        component="div"
                                                                        name="emails"
                                                                        className="invalid-feedback"
                                                                    />
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
                                                                        name="from"
                                                                        className={`form-control
                                                                        ${touched.from && errors.from ? "is-invalid" : ""}`}
                                                                    />
                                                                    <ErrorMessage
                                                                        component="div"
                                                                        name="from"
                                                                        className="invalid-feedback"
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
                                                                        className={`form-control
                                                                        ${touched.message && errors.message ? "is-invalid" : ""}`}
                                                                        name="message"
                                                                    />
                                                                    <ErrorMessage
                                                                        component="div"
                                                                        name="message"
                                                                        className="invalid-feedback"
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="row mb-4">
                                                                <div className="col-md-2">
                                                                    <label htmlFor="">Quantity</label>
                                                                </div>
                                                                <div className="col-md-10">
                                                                    <Field
                                                                        type="number"
                                                                        className={`form-control
                                                                        ${touched.quantity && errors.quantity ? "is-invalid" : ""}`}
                                                                        name="quantity"
                                                                        disabled={values.emails.split(',').length > 1}
                                                                        onBlur={() => {
                                                                            let emailQty = values.emails.split(',');
                                                                            handleCalculations(values.amount, values.quantity, emailQty?.length, setFieldValue)
                                                                        }}
                                                                    />
                                                                    <ErrorMessage
                                                                        component="div"
                                                                        name="quantity"
                                                                        className="invalid-feedback"
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="row mb-4">
                                                                <div className="col-md-2">
                                                                    <label htmlFor="">Delivery Date</label>
                                                                </div>
                                                                <div className="col-md-10">
                                                                    <DatePicker
                                                                        selected={startDate}
                                                                        onChange={(date) => setStartDate(date)}
                                                                        className="form-control"
                                                                        name="deliveryDate"
                                                                        minDate={startDate}
                                                                        maxDate={endDate}
                                                                    />
                                                                    <div className="form-text">Up to 3 months from today</div>
                                                                </div>
                                                            </div>
                                                            <div className="row">
                                                                <div className="col-md-10 offset-md-2">
                                                                    <div className="row">
                                                                        <div className="col-md-6">
                                                                            <label style={{ textAlign: "center" }}>Qty:{values.quantity} Gift card <br />
                                                                                <strong>₹{totalAmount}</strong>
                                                                            </label>
                                                                            <button type="submit" className="button button-purple w-100">Buy Now</button>
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
                        <p>Your Voucher Code is : {successRes?.data?.vouCode}</p>
                    </div>
                    <div className="gift-card-preview">
                        <div className="gift-card-preview-info">
                            <h4>{successRes?.data?.amount}</h4>
                            <p>{successRes?.data?.voucherDetail?.title}</p>
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