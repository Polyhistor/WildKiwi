import React from "react"
const TrustBox = ({ widgetTemplateId, height }) => {
  // Create a reference to the <div> element which will represent the TrustBox
  const ref = React.useRef(null)

  React.useEffect(() => {
    /*let's not worry about this ugly code here as it will be used
      only in development. 
      In production this script will be injected automatically by netlify*/

    if (process.env.NODE_ENV === "development") {
      var aScript = document.createElement("script")
      aScript.type = "text/javascript"
      aScript.src =
        "//widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js"
      aScript.async = "true"
      document.head.appendChild(aScript)
      aScript.onload = function() {
        var trustbox = document.getElementById("trustbox-reviews")
        window.Trustpilot.loadFromElement(trustbox)
      }
    } else {
      if (window.Trustpilot) {
        var trustbox = document.getElementById("trustbox-reviews")
        window.Trustpilot.loadFromElement(trustbox)
      }
    }
  }, [])
  return (
    <div
      id="trustbox-reviews"
      data-locale="en-GB"
      data-template-id={widgetTemplateId}
      data-businessunit-id="5a33cc12b894c90f18f19bf8"
      data-style-height={height ? height : "300px"}
      data-style-width="100%"
      data-theme="light"
      data-tags="SelectedReview"
      data-schema-type="Organization"
      style={{ position: "relative" }}
      ref={ref}
      className="trustpilot-widget"
    >
      <a
        href="https://www.trustpilot.com/review/example.com"
        target="_blank"
        rel="noopener"
      >
        {" "}
        Trustpilot
      </a>
    </div>
  )
}
export default TrustBox
