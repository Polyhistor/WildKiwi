import React, { useState, useEffect } from "react"
import { getTourDatesRequest, submitEnquiryRequest } from "../../services/api"
import { Formik, Field, Form } from "formik"
import * as Yup from "yup"
import Error from "./error"
import resolveVariationClass from "../../helpers/theme-variation-style"
import { TAG_MANAGER_TRACKER } from "../../config/tag-manager"
import { getPaxAges } from "../../config/pax-age"
import { PHONE_NUMBER_LIST_ORDERED } from "../../config/phone-country-code"

const validationSchema = Yup.object().shape({
  guests: Yup.number()
    .min(1, "At least one guest has to be entered")
    .required("Please enter the guest number"),
  firstName: Yup.string()
    .min(1, "First Name must be at least a character")
    .required("First Name must be entered"),
  lastName: Yup.string()
    .min(1, "Last name must be at least a character")
    .required("Last Name must be enetered"),
  email: Yup.string()
    .email("please enter a valid email address")
    .required("email is required"),
  emailConfirm: Yup.string()
    .email("please enter a valida email address")
    .oneOf([Yup.ref("email")], "email must match")
    .required("email confirm is required"),
  phoneCountryCode: Yup.number()
    .positive("value must be positive")
    .required("country code is required"),
  phoneNumber: Yup.number()
    .positive("value must be positive")
    .required("number is required"),
  age: Yup.number()
    .positive("value must be positive")
    .required("age is required"),
  date: Yup.string().required("Date is required"),
  productClass: Yup.string().required("Yacht Class is required"),
  yachtCabinName: Yup.string().required("Yacht Cabin type is required"),
  gender: Yup.string().required("gender is required"),
})

const BookForm = ({ tourId, inPage }) => {
  const productClass = ""
  const theme = process.env.GATSBY_THEME
  const [cabinTypes, setCabinTypes] = useState([])
  const [productClasses, setProductClasses] = useState([])
  const [response, setApiResponse] = useState([])
  const [success, setSuccess] = useState(false)
  let finalAPI

  const cleanProductClass = setFieldValue => {
    setFieldValue("productClass", "")
    setFieldValue("priceId", "")
    setProductClasses([])
  }

  const cleanCabinTypes = setFieldValue => {
    setFieldValue("yachtCabinName", "")
    setCabinTypes([])
  }

  const onDateChanged = (date, setFieldValue) => {
    cleanProductClass(setFieldValue)
    cleanCabinTypes(setFieldValue)
    setFieldValue("date", date)
    const findDate = response.dates.find(d => d.date === date)

    if (!findDate) {
      if (date !== "") {
        console.warn("Invalid date")
      }
    } else {
      setProductClasses(findDate.class)
    }
  }

  const onProductClassChanged = (productClassId, setFieldValue) => {
    cleanCabinTypes(setFieldValue)

    if (!(productClassId === "")) {
      const findDateWithClass = response.dates.find(d => {
        const productClass = d.class.find(c => c.id === productClassId)
        return productClass !== undefined
      })

      const productClass = findDateWithClass.class.find(
        c => c.id === productClassId
      )

      const cabinTypes = response.cabins.filter(
        c => c.product_class === productClass.name
      )
      setFieldValue("productClass", productClass.name)
      setFieldValue("priceId", productClass.id)
      setCabinTypes(cabinTypes)
    } else {
      setFieldValue("productClass", "")
      setFieldValue("priceId", "")
    }
  }

  const getCabinDescription = cabin => {
    return cabin.price ? `${cabin.name} (${cabin.price})` : cabin.name
  }

  const fetchDates = async () => {
    const result = await getTourDatesRequest(tourId)
    setApiResponse(result.data.data)
  }

  useEffect(() => {
    fetchDates()
  }, [tourId])

  const submitForm = async (values, actions) => {
    const cabinDetails = "" /*getCabinDetails(values.yachtCabinName)*/

    let apiData = {
      ...values,
    }
    try {
      const response = await submitEnquiryRequest(apiData)

      setSuccess(response.data.data)
    } catch (error) {
      // console.log(
      //   error,
      //   "someething seems to be wrong with this request"
      // )
    }

    /*try {
      const response = await submitEnquiryRequest(finalAPI)

      setSuccess(response.data.data)
    } catch (error) {
      // console.log(
      //   error,
      //   "someething seems to be wrong with this request"
      // )
    }*/
  }

  return (
    <section
      className={inPage ? "booking-form booking-form--in-page" : "booking-form"}
    >
      <Formik
        initialValues={{
          siteLocation: inPage ? "PAGE" : "POPUP",
          priceId: "",
          date: "",
          guests: "",
          productClass: "",
          age: "",
          firstName: "",
          lastName: "",
          email: "",
          emailConfirm: "",
          phoneCountryCode: "",
          phoneNumber: "",
          gender: "male",
          comments: "",
          consent: false,
          yachtCabinName: "",
          yachtCabinPrice: "",
          yachtCabinId: "",
        }}
        validationSchema={validationSchema}
        onSubmit={async (values, actions) => {
          await submitForm(values, actions)
        }}
      >
        {({
          errors,
          touched,
          handleChange,
          values,
          setFieldTouched,
          setFieldValue,
        }) => (
          <Form
            style={{
              marginTop: 100,
            }}
          >
            <div className="booking-details__fields-container">
              <Field
                component="select"
                name="gender"
                className={
                  errors.gender
                    ? "booking-form__fields booking-form__fields--half booking-form__fields--error"
                    : "booking-form__fields booking-form__fields--half"
                }
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </Field>
              <Error touched={touched.gender} message={errors.gender} />
            </div>

            <div className="booking-details__fields-container">
              <Field
                type="text"
                name="firstName"
                placeholder="First Name *"
                className="booking-form__fields"
                className={
                  errors.firstName
                    ? "booking-form__fields booking-form__fields--error"
                    : "booking-form__fields"
                }
              ></Field>
              <Error touched={touched.firstName} message={errors.firstName} />
            </div>
            <div className="booking-details__fields-container">
              <Field
                type="text"
                name="lastName"
                placeholder="Last Name *"
                className={
                  errors.lastName
                    ? "booking-form__fields booking-form__fields--error"
                    : "booking-form__fields"
                }
              ></Field>
              <Error touched={touched.lastName} message={errors.lastName} />
            </div>

            <div className="booking-details__fields-container">
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

            <div className="booking-details__fields-container">
              <Field
                type="text"
                name="emailConfirm"
                placeholder="Confirm Email Address *"
                className={
                  errors.emailConfirm
                    ? "booking-form__fields booking-form__fields--error"
                    : "booking-form__fields"
                }
              ></Field>
              <Error
                touched={touched.emailConfirm}
                message={errors.emailConfirm}
              />
            </div>
            <div className="booking-details__fields-container">
              <Field
                component="select"
                name="phoneCountryCode"
                placeholder="Country Code *"
                className={
                  errors.phoneCountryCode
                    ? "booking-form__fields booking-form__fields--half booking-form__fields--error"
                    : "booking-form__fields booking-form__fields--half"
                }
              >
                <option value="">Select Country Code</option>
                {PHONE_NUMBER_LIST_ORDERED.map((p, idx) => {
                  if (!p.dial_code) {
                    return <option key={idx} disabled value=""></option>
                  } else {
                    return (
                      <option key={idx} value={p.dial_code}>
                        {p.name} {p.dial_code}
                      </option>
                    )
                  }
                })}
              </Field>
              <Error
                touched={touched.phoneCountryCode}
                message={errors.phoneCountryCode}
              />
            </div>
            <div className="booking-details__fields-container">
              <Field
                type="number"
                name="phoneNumber"
                placeholder="Mobile *"
                className={
                  errors.phoneNumber
                    ? "booking-form__fields booking-form__fields--half booking-form__fields--error"
                    : "booking-form__fields booking-form__fields--half"
                }
              ></Field>
              <Error
                touched={touched.phoneNumber}
                message={errors.phoneNumber}
              />
            </div>
            <div className="booking-details__fields-container">
              <Field
                component="select"
                name="age"
                placeholder="Age *"
                className={
                  errors.age
                    ? "booking-form__fields booking-form__fields--half booking-form__fields--error"
                    : "booking-form__fields booking-form__fields--half"
                }
              >
                <option disabled value="">
                  Select your age
                </option>
                {getPaxAges().map((p, idx) => {
                  return (
                    <option key={idx} value={p}>
                      {p}
                    </option>
                  )
                })}
              </Field>
              <Error touched={touched.age} message={errors.age} />
            </div>
            <div className="booking-details__fields-container">
              <select
                onChange={e => onDateChanged(e.target.value, setFieldValue)}
                name="date"
                className={
                  errors.date
                    ? "booking-form__fields booking-form__fields--half booking-form__fields--error"
                    : "booking-form__fields booking-form__fields--half"
                }
              >
                <option value="">Select the dates</option>

                {response &&
                  response.dates &&
                  response.dates.map((p, idx) => {
                    return (
                      <option key={idx} value={p.date}>
                        {p.dateFormated}
                      </option>
                    )
                  })}
              </select>

              <Error touched={touched.date} message={errors.date} />
            </div>

            <div className="booking-details__fields-container">
              <select
                onChange={e =>
                  onProductClassChanged(e.target.value, setFieldValue)
                }
                name="productClass"
                value={values.priceId}
                className={
                  errors.productClass
                    ? "booking-form__fields booking-form__fields--half booking-form__fields--error"
                    : "booking-form__fields booking-form__fields--half"
                }
              >
                <option value="">Select the class</option>

                {productClasses &&
                  productClasses.map((p, idx) => {
                    return (
                      <option key={idx} value={p.id}>
                        {p.name}
                      </option>
                    )
                  })}
              </select>
              <Error
                touched={touched.productClass}
                message={errors.productClass}
              />
            </div>

            <div className="booking-details__fields-container">
              <Field
                component="select"
                name="yachtCabinName"
                className={
                  errors.yachtCabinName
                    ? "booking-form__fields booking-form__fields booking-form__fields--error"
                    : "booking-form__fields booking-form__fields"
                }
              >
                <option value="">Select the cabin type</option>
                {cabinTypes.map((e, idx) => (
                  <option key={idx} value={e.name}>
                    {getCabinDescription(e)}
                  </option>
                ))}
              </Field>
              <Error
                touched={touched.yachtCabinName}
                message={errors.yachtCabinName}
              />
            </div>

            <div className="booking-details__fields-container">
              <Field
                component="select"
                name="guests"
                className={
                  errors.guests
                    ? "booking-form__fields booking-form__fields--half booking-form__fields--error"
                    : "booking-form__fields booking-form__fields--half"
                }
              >
                <option value="">Select Passengers</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                <option value="11">10+</option>
              </Field>

              <Error touched={touched.guests} message={errors.guests} />
            </div>

            <div className="booking-details__fields-container">
              <Field
                component="textarea"
                name="comments"
                placeholder="Comments"
                className="booking-form__fields booking-form__fields--textarea"
              ></Field>
            </div>
            <div className="booking-details__fields-container">
              <Field
                id="consent"
                name="consent"
                type="checkbox"
                required
              ></Field>
              <label htmlFor="consent">
                I accept the&thinsp;
                <a
                  className={resolveVariationClass("link")}
                  href={`${process.env.GATSBY_SITE_URL}/terms-conditions`}
                  target="_blank"
                >
                  terms and conditions
                </a>
              </label>
            </div>
            {theme === "ms" && response ? (
              <>
                <p className="booking-form__additional-info mobile-yes">
                  {response.booking_notes} {response.general_notes}
                </p>
              </>
            ) : null}
            <button
              id={
                inPage
                  ? TAG_MANAGER_TRACKER.IN_PAGE_SUBMIT_BUTTON
                  : TAG_MANAGER_TRACKER.POPUP_SUBMIT_BUTTON
              }
              type="submit"
              className={theme === "ms" ? "btn btn--ms-teal" : "btn btn--green"}
            >
              Submit
            </button>
            {/* <button >test</button> */}
          </Form>
        )}
      </Formik>
    </section>
  )
}

export default BookForm
