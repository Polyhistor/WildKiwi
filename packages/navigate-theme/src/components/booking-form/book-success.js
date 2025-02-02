import React from "react"
import resolveVariationClass from "../../helpers/theme-variation-style"

const BookSuccess = ({ email, showContinueButton }) => {
  return (
    <>
      <section className="booking-form__thank-you">
        <div className="booking-form__thank-you-container">
          <h2 className={resolveVariationClass("heading-2")}>
            Thanks for your booking enquiry.
          </h2>

          <p className="paragraph"></p>
          <p className="paragraph">
            We are sending a welcome message to you shortly. If you do not
            receive it, please let us know at{" "}
            <a href={`mailto:${email}`}>{email}</a>
          </p>
          <p className="paragraph">
            Please note: Our office hours are Monday to Friday 9 am - 5.30 pm
            &#38; Saturday 12 pm - 4 pm.
          </p>

          <p className="paragraph">
            Our customer service team will be in touch with your booking details
            ASAP!
          </p>
        </div>
        {showContinueButton && 
        <button
        className={resolveVariationClass("btn")}
        onClick={_ => window.history.go(-1)}
      >
        Continue
      </button>
        }
        
      </section>
    </>
  )
}

export default BookSuccess
