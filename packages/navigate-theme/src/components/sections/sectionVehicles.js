import React, { useState } from "react"
import Img from "gatsby-image"
import Modal from "react-responsive-modal"
import { withPrefix } from "gatsby"

import Intro from "../../components/intro"

const SectionVehicles = ({
  imageOne,
  imageTwo,
  imageThree,
  imageFour,
  title,
  paragraph,
  listHeader,
  listItems,
  paragraphSecond,
}) => {
  // rendeering the list
  const renderList = () => {
    return listItems.map(({ label }, idx) => {
      return <li key={idx}>{label}</li>
    })
  }

  // setting the initial state for the modal
  const [{ open }, setModal] = useState({ open: false })

  return (
    <>
      <Intro
        title="Our luxury vehicles raise the bar"
        description="Part of the adventure is getting there, so you may as well do it in style! Cruise around in our luxury tour vehicles and experience the ultimate in comfort and style on your road trip."
      />

      <section className="section-vehicles">
        <div className="vehicles__container">
          <div className="vehicles__images">
            <Img fluid={imageOne} alt="vehicles-wildkiwi-1" />
            <Img fluid={imageTwo} alt="vehicles-wildkiwi-2" />
            <Img fluid={imageThree} alt="vehicles-wildkiwi-3" />
            <Img fluid={imageFour} alt="vehicles-wildkiwi-4" />
          </div>
          <div className="vehicles__text">
            <h2 className="">{title}</h2>
            <p>{paragraph}</p>
            <ul>
              <b>{listHeader}</b>
              {renderList()}
            </ul>
            <p>{paragraphSecond}</p>
          </div>
        </div>
      </section>

      {/* setting modal values */}
      <Modal
        open={open}
        onClose={() => setModal({ open: false })}
        className={{ overlay: "overlay", modal: "popup" }}
        center
      >
        <div className="popup">
          <iframe
            title="Wild kiwi"
            width="95%"
            height="95%"
            src="https://www.youtube.com/embed/IbUC6Mc6sjQ"
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </Modal>
    </>
  )
}

export default SectionVehicles
