import React, { useState } from "react"
import { Link, withPrefix } from "gatsby"
import Modal from "react-responsive-modal"

import BookingForm from "../destinations/bookingForm"

const Buttonbox = () => {
  // setting the initial state for the modal
  const [{ open }, setModal] = useState({
    open: false,
  })

  return (
    <>
      <div className="header__nav-button">
        <Link className="header__nav-button-box-icon" to="/">
          <svg className="svg-icon--login">
            <use xlinkHref={withPrefix("sprite.svg#icon-Login")} />
          </svg>
        </Link>
        <Link className="header__nav-button-box-link" to="/">
          <span
            onClick={() => setModal({ open: true })}
            className="btn btn--red btn-animated"
          >
            book
          </span>
        </Link>
      </div>

      <Modal
        open={open}
        onClose={() => setModal({ open: false })}
        className={{ overlay: "overlay", modal: "popup" }}
        center
      >
        <BookingForm data={null} country={null}></BookingForm>
      </Modal>
    </>
  )
}

export default Buttonbox
