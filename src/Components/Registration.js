
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "bootstrap/dist/css/bootstrap.css"
import Queries from "../Services/Queries";
import { useSelector } from "react-redux";

export default function Registration() {
  const { CommonPostApi } = Queries(Registration);

  const successRes = useSelector((state) => state.main.success);
  const errorRes = useSelector((state) => state.main.error);
  // const user = useSelector((state) => state.main.user);
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

  const handleSubmit = async (values) => {
    const url = `${process.env.REACT_APP_API_URL}auth/signup`;
    await CommonPostApi(values,url);
  }
  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-12">
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
                <div>
                  <div className="row mb-5">
                    <div className="col-lg-12 text-center">
                      <h1 className="mt-5">Registration Form</h1>
                    </div>
                  </div>
                  <Form>
                    <div className="form-group">
                      <label htmlFor="name">Name</label>
                      <Field
                        type="text"
                        name="name"
                        placeholder="Enter name"
                        autoComplete="off"
                        className={`mt-2 form-control
                          ${touched.name && errors.name ? "is-invalid" : ""}`}
                      />

                      <ErrorMessage
                        component="div"
                        name="name"
                        className="invalid-feedback"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email" className="mt-3">Email</label>
                      <Field
                        type="email"
                        name="email"
                        placeholder="Enter email"
                        autoComplete="off"
                        className={`mt-2 form-control
                          ${touched.email && errors.email ? "is-invalid" : ""}`}
                      />

                      <ErrorMessage
                        component="div"
                        name="email"
                        className="invalid-feedback"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="password" className="mt-3">
                        Password
                      </label>
                      <Field
                        type="password"
                        name="password"
                        placeholder="Enter password"
                        className={`mt-2 form-control
                          ${touched.password && errors.password
                            ? "is-invalid"
                            : ""
                          }`}
                      />
                      {/* <i className="fa fa-lock"></i>
                      <i onClick={Eye} className={`fa ${eye ? "fa-eye-slash" : "fa-eye"}`}></i> */}
                      <ErrorMessage
                        component="div"
                        name="password"
                        className="invalid-feedback"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="confirmPassword" className="mt-3">
                        Confirm Password
                      </label>
                      <Field
                        type="password"
                        name="confirmPassword"
                        placeholder="Enter Confirm password"
                        className={`mt-2 form-control
                          ${touched.confirmPassword && errors.confirmPassword
                            ? "is-invalid"
                            : ""
                          }`}
                      />
                      <ErrorMessage
                        component="div"
                        name="confirmPassword"
                        className="invalid-feedback"
                      />
                    </div>

                    <button
                      type="submit"
                      className="btn btn-primary btn-block mt-4"
                    >
                      Submit
                    </button>
                  </Form>
                </div>
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
  );
}