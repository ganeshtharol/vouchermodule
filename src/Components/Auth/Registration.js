import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "bootstrap/dist/css/bootstrap.css"
import { useDispatch, useSelector } from "react-redux";
import { setSuccessResponse } from "../../Reducer/mainReducer";

import { useState } from "react";


import { Link } from "react-router-dom";

export default function Registration() {

  const dispatch = useDispatch();
  const successRes = useSelector((state) => state.main.success);
  const errorRes = useSelector((state) => state.main.error);
  const Schema = Yup.object().shape({
    name: Yup.string()
      .required("Name is required"),
    email: Yup.string()
      .email("Invalid email address format")
      .required("Email is required"),
    password: Yup.string()
      .min(3, "Password must be 3 characters at minimum")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required("Confirm Password is required"),
  });


  const [passwordType, setPasswordType] = useState('password');
  const [repeatPasswordType, setRepeatPasswordType] = useState('password');

  const togglePassword = () => {
    if (passwordType === "password") {
      setPasswordType("text")
      return;
    }
    setPasswordType("password")
  }


  const toggleRepeatPassword = () => {
    if (repeatPasswordType === "password") {
      setRepeatPasswordType("text")
      return;
    }
    setRepeatPasswordType("password")
  }

  const handleSubmit = async (values) => {
    const url = `${process.env.REACT_APP_API_URL}auth/signup`;
    dispatch(setSuccessResponse(values, url));
  }
  return (


    <div class="auth-container section-padding-100">
      <div class="container">
        <div class="row form-wrapper">
          <div class="col-md-5">
            <div class="form-media">
              <div class="text-center">
                <h4>Welcome!</h4>
                <p>Exploring amazing Gift cards!</p>
              </div>
            </div>
          </div>
          <div class="col-md-7">
            <div class="form-border-box">
              <div class="form-title">
                <h4>Signup</h4>
                <p>Please enter your details below to continue</p>
              </div>
              <Formik
                initialValues={{ email: "", password: "", name: "", confirmPassword: "" }}
                validationSchema={Schema}
                onSubmit={(values) => {
                  handleSubmit(values)
                  alert("Form is validated! Submitting the form...");
                }}
              >
                {({ touched, errors, isSubmitting, values }) =>
                  !isSubmitting ? (

                    <Form>
                      <div className="form-group">

                        <Field
                          type="text"
                          name="name"
                          placeholder="Name"
                          autoComplete="off"
                          className={`form-control
                          ${touched.name && errors.name ? "is-invalid" : ""}`}
                        />

                        <ErrorMessage
                          component="div"
                          name="name"
                          className="invalid-feedback"
                        />
                      </div>
                      <div className="form-group">

                        <Field
                          type="email"
                          name="email"
                          placeholder="Email Address"
                          autoComplete="off"
                          className={`form-control
                          ${touched.email && errors.email ? "is-invalid" : ""}`}
                        />

                        <ErrorMessage
                          component="div"
                          name="email"
                          className="invalid-feedback"
                        />
                      </div>

                      <div className="form-group position-relative">

                        <Field
                          type={passwordType}
                          name="password"
                          placeholder="Password"
                          className={`form-control
                          ${touched.password && errors.password
                              ? "is-invalid"
                              : ""
                            }`}
                        />
                        <button className='password_toggle_btn' onClick={togglePassword} type="button">
                          {
                            passwordType === "password" ? <i className="bi bi-eye"></i> : <i className="bi bi-eye-slash"></i>
                          }
                        </button>
                        {/* <i className="fa fa-lock"></i>
                      <i onClick={Eye} className={`fa ${eye ? "fa-eye-slash" : "fa-eye"}`}></i> */}
                        <ErrorMessage
                          component="div"
                          name="password"
                          className="invalid-feedback"
                        />
                      </div>
                      <div className="form-group position-relative">
                        <Field
                          type={repeatPasswordType}
                          name="confirmPassword"
                          placeholder="Repeat Password"
                          className={`mt-2 form-control
                          ${touched.confirmPassword && errors.confirmPassword
                              ? "is-invalid"
                              : ""
                            }`}
                        />
                        <button className='password_toggle_btn' onClick={toggleRepeatPassword} type="button">
                          {
                            repeatPasswordType === "password" ? <i className="bi bi-eye"></i> : <i className="bi bi-eye-slash"></i>
                          }
                        </button>
                        <ErrorMessage
                          component="div"
                          name="confirmPassword"
                          className="invalid-feedback"
                        />
                      </div>

                      <div class="row">
                        <div class="col-md-6">
                          <button type="submit" class="button button-purple w-100">Signup</button>
                        </div>
                      </div>

                      <p class="goto">Already have an account? <Link to="/login">Login</Link></p>
                    </Form>

                  ) : successRes ? (
                    <div>
                      <h1 className="p-3 mt-5">Form Submitted</h1>
                      <div className="alert alert-success mt-3">
                        {successRes.message}
                      </div>
                    </div>
                  ) : errorRes ?
                    (
                      <div>
                        <h1 className="p-3 mt-5">Error!</h1>
                        <div className="alert alert-danger mt-3">
                          {errorRes.message}
                        </div>
                      </div>
                    ) : null
                }
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>



  );
}