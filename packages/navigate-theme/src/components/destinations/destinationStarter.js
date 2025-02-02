import React from "react"
import resolveVariationClass from "../../helpers/theme-variation-style"
const destinationStarter = ({ title, body, CSSModifier }) => {
  return (
    <div className="section-destination__starter">
      <div className="destination-starter">
        <h1
          className={`${resolveVariationClass(
            "heading-1"
          )} u-margin-bottom-small`}
        >
          {title}
        </h1>
        <p className="destination-starter__body">{body}</p>
      </div>
    </div>
  )
}

export default destinationStarter
