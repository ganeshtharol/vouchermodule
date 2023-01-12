
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "bootstrap/dist/css/bootstrap.css"
import { useDispatch, useSelector } from "react-redux";
import { setSuccessResponse } from "../../Reducer/mainReducer";

export default function Login() {
  const successRes = useSelector((state) => state.main.success);
  const errorRes = useSelector((state) => state.main.error);
  const dispatch = useDispatch();
  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address format")
      .required("Email is required"),
    password: Yup.string()
      .min(3, "Password must be 3 characters at minimum")
      .required("Password is required"),
  });

  const handleSubmit = async (values) => {
    const url = `${process.env.REACT_APP_API_URL}auth/login`;
    dispatch(setSuccessResponse(values, url));

  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-12">
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={LoginSchema}
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
                      <h1 className="mt-5">Login Form</h1>
                    </div>
                  </div>
                  <Form>
                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <Field
                        type="email"
                        name="email"
                        placeholder="Enter email"
                        autocomplete="off"
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
                      <ErrorMessage
                        component="div"
                        name="password"
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