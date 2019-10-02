import React, { useState } from "react"
import { Formik, Field, Form } from "formik"
import * as Yup from "yup"
import { Error } from "@nt-websites/navigate-theme"

import GetInTouchData from "../getInTouchData"

// Our Schema validation logics here
const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(1, "First name must be at least a character")
    .required("Please fill in the name filed"),
  email: Yup.string()
    .email("Please enter a valid email email address")
    .required("Email adress is required"),
  message: Yup.string().required("Please enter in your message"),
})

// final data to be sent to the API
let finalAPI

let url = "https://api2.ntstage.com/contact"

const SectionGetInTouch = () => {
  // object that we use to synthesize later with form fields later
  const partialData = { productId: 8 }

  // setting the state for the success message
  const [{ success, message }, setSuccess] = useState({
    success: false,
    message: null,
  })

  const addressData = [
    "Address",
    "Level 2, 29 Hargreaves\nStreet,\nSt Marys Bay,\nNew Zealand",
    "Level 4, Hight Screet\nStree,\nSt Marys Bay,\nLondon",
  ]

  // setting our inital state
  const [state, setState] = useState("newzealand")

  // rendering out left side contents
  const renderLeftContents = () => {
    return GetInTouchData.map((block, idx) => {
      return (
        <div key={idx} className="get-in-touch__container">
          <h3 className="get-in-touch__header">{block.header} </h3>
          <pre className="get-in-touch__paragraph">{block.content}</pre>
        </div>
      )
    })
  }

  // handling dropdown change
  const handleDropdown = e => {
    setState(e.target.value)
  }

  return (
    <div className="section-get-in-touch">
      <div className="get-in-touch">
        <div className="get-in-touch--left">{renderLeftContents()}</div>
        <div className="get-in-touch--right">
          <div className="activity__selector">
            <select
              onChange={handleDropdown}
              className="activity__dropdown"
              id="country"
            >
              <option value="newzealand">NEW ZEALAND</option>
              <option value="uk">THE UK</option>
            </select>
          </div>
          <p className="get-in-touch__number">
            {state === "newzealand" ? "+64 9 973 5676" : "+44 9 973 5676"}
          </p>
          <div className="get-in-touch__container">
            <h3 className="get-in-touch__header">{addressData[0]}</h3>
            <pre className="get-in-touch__paragraph">
              {state === "newzealand" ? addressData[1] : addressData[2]}
            </pre>
          </div>

          <Formik
            initialValues={{
              name: "",
              email: "",
              message: "",
              consent: false,
            }}
            validationSchema={validationSchema}
            onSubmit={async (values, { resetForm }) => {
              finalAPI = { ...values, ...partialData }
              console.log(finalAPI)
              try {
                const response = await fetch(url, {
                  method: "POST",
                  body: JSON.stringify(finalAPI),
                  headers: {
                    "Content-Type": "application/json",
                  },
                })
                const json = await response.json()
                setSuccess({
                  success: true,
                  message: JSON.stringify(json.data.message),
                })
                resetForm()
                console.log("Success", JSON.stringify(json))
              } catch (error) {
                console.log("error", error)
              }
            }}
          >
            {({
              initialValues,
              errors,
              touched,
              handleChange,
              setFieldValue,
              resetForm,
            }) => (
              <Form className="get-in-touch__form">
                <h3 className="get-in-touch__header">Drop us a note</h3>
                <div>
                  <Field
                    type="text"
                    name="name"
                    placeholder="Name"
                    className={
                      errors.email
                        ? "booking-form__fields booking-form__fields--error"
                        : "booking-form__fields"
                    }
                  />
                  <Error touched={touched.name} message={errors.name} />
                </div>
                <div>
                  <Field
                    type="text"
                    name="email"
                    placeholder="Email Address *"
                    className={
                      errors.email
                        ? "booking-form__fields booking-form__fields--error"
                        : "booking-form__fields"
                    }
                  ></Field>
                  <Error touched={touched.email} message={errors.email} />
                </div>
                <div>
                  <Field
                    type="textarea"
                    name="message"
                    placeholder="Comments"
                    className="footer__form-input--big"
                  ></Field>
                  <Error touched={touched.comments} message={errors.comments} />
                </div>
                <div>
                  <Field
                    id="consent"
                    name="consent"
                    type="checkbox"
                    className={
                      errors.email
                        ? "booking-form__fields booking-form__fields--error"
                        : "booking-form__fields"
                    }
                    required
                  ></Field>
                  <label
                    className="footer__form-consent u-color-gray"
                    htmlFor="consent"
                  >
                    I accept the terms and conditions
                  </label>
                </div>
                <button className="btn btn--green-footer" type="submit">
                  submit
                </button>
              </Form>
            )}
          </Formik>
          {success ? (
            <h3 className="u-padding-top-medium filtered-tour__description-price success-message">
              {message}
            </h3>
          ) : null}
        </div>
      </div>
    </div>
  )
}

export default SectionGetInTouch
