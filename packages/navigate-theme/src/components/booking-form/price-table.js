import React, { useState, useEffect } from "react"
import Loader from "react-loader-spinner"

import { useWebSiteConfigQuery } from "../../queries/webSiteConfigQueries"

import resolveVariationClass from "../../helpers/theme-variation-style"

const PriceTable = ({ data }) => {
  const bookingFormConfig = useWebSiteConfigQuery().bookingForm

  //TODO:This should come from api somehow
  const pricesClassOrdered = bookingFormConfig.yachtClasses
  const useYachtClass = bookingFormConfig.useYachtClass

  // render buyerInfo
  const renderIfno = () => {
    if (entries === null) {
      return null
    }

    if (entries) {
      return (
        <p className="booking-form__additional-info u-margin-top-small ">
          {entries.general_notes} {entries.booking_notes}
        </p>
      )
    }
  }

  const bookingFormPromo = resolveVariationClass("booking-form__promo")

  const bookingFormAvailablity = resolveVariationClass(
    "booking-form__availability"
  )

  const bookingFormDot = resolveVariationClass("booking-form__do")

  // setting the initial state for entries -- the whole triple data thing has to change, but for now under tight schedule, we will just go for live
  let receivedData = null

  data === null || !data.data
    ? (receivedData = null)
    : (receivedData = data.data.data)

  const [entries, setEntries] = useState(receivedData)

  // making sure that we update our state once we fetch the data
  useEffect(() => {
    setEntries(receivedData)
  }, [receivedData])

  // initiating an empty array that stores references to our nodes
  const refs = []

  const renderHeader = () => {
    if (useYachtClass) {
      return (
        <div className="booking-form__header-classes">
          {pricesClassOrdered.map((p, idx) => {
            return (
              <h4 key={idx} className={resolveVariationClass("heading-4")}>
                {p.description}
              </h4>
            )
          })}
        </div>
      )
    }
    return null
  }

  const handleClick = () => {
    alert("Implement go to booking form below")
  }

  // rendering prices
  const renderPrices = prices => {
    return pricesClassOrdered.map((priceClass, idx) => {
      const p = prices.find(p => p.productClass === priceClass.code)
      if (p) {
        return (
          <div
            key={idx}
            onClick={() => handleClick(p)}
            className={
              p.availability === "Sold Out"
                ? "booking-form__price-entry booking-form__price-entry--soldout"
                : "booking-form__price-entry"
            }
          >
            {useYachtClass ? (
              <div
                className={`mobile-yes heading-5--capitalized ${resolveVariationClass(
                  "heading-5"
                )}`}
              >
                {p.productClass}
              </div>
            ) : null}
            <div className={resolveVariationClass("booking-form__price")}>
              <span className={bookingFormAvailablity}>{p.availability}</span>
              <span className="booking-form__original">
                {p.currencySymbol}
                {p.rrp}
              </span>
              <span className="booking-form__discount">
                {p.currencySymbol}
                {p.rrpWithDiscount}&thinsp;
                {p.currencyCode}
              </span>
            </div>
          </div>
        )
      } else {
        return (
          <div className="booking-form__price-entry heading-5" key={idx}>
            NOT AVAILABLE
          </div>
        )
      }
    })
  }

  // function that renders the entries (available tours)
  const renderEntries = () => {
    if (entries === null) {
      return (
        <h2 className={resolveVariationClass("heading-1")}>
          No Dates Available
        </h2>
      )
    }

    if (entries.months === undefined) {
      return (
        <Loader
          type="Oval"
          color="#1abc9c"
          height={100}
          width={100}
          timeout={3000} //3 secs
        />
      )
    }

    if (entries) {
      return entries.months.map((e, idx) => (
        <div
          key={idx}
          className={
            e.availability === "Sold Out"
              ? "booking-form__entry booking-form__entry--soldout"
              : "booking-form__entry"
          }
        >
          <div className="booking-form__shown">
            <span className="booking-form__month">
              {/*POUYA - MONTH INFORMATION */}
              {e.description} - {e.sale} - from {e.from.currencySymbol}{" "}
              {e.from.price}
              {e.from.currencyCode}
            </span>
            <input
              className="booking-form__input"
              id={`plus-holder-${idx + 50}`}
              type="checkbox"
              checked={idx === 0 ? true : null}
            ></input>
            <label
              className="booking-form__plus-holder"
              htmlFor={`plus-holder-${idx + 50}`}
            ></label>
            <div className="booking-form__hidden" ref={r => (refs[idx] = r)}>
              {e.dates.map((d, idx2) => (
                <div
                  key={idx2}
                  onClick={useYachtClass ? null : _ => handleClick()}
                  className={resolveVariationClass(
                    "booking-form__hidden-entries"
                  )}
                >
                  <div className="booking-form__left">
                    <div className="booking-form__date-container">
                      <span className="booking-form__date">
                        {d.startDateShort}
                      </span>
                      <span className="booking-form__destination">
                        {d.startLocation}
                      </span>
                    </div>
                    <div className="booking-form__mediator">
                      <span
                        className={
                          d.availability === "Sold Out"
                            ? `${bookingFormPromo} booking-form__promo--soldout`
                            : `${bookingFormPromo}`
                        }
                      >
                        {d.sale}
                      </span>
                      <div className="booking-form__line-container">
                        <div
                          className={
                            d.availability === "Sold Out"
                              ? `${bookingFormDot} booking-form__dot--soldout`
                              : `${bookingFormDot}`
                          }
                        ></div>
                        <div
                          className={
                            d.availability === "Sold Out"
                              ? "booking-form__line booking-form__line--soldout"
                              : "booking-form__line"
                          }
                        ></div>
                        <div
                          className={
                            d.availability === "Sold Out"
                              ? "booking-form__dot booking-form__dot--soldout"
                              : "booking-form__dot"
                          }
                        ></div>
                      </div>
                      <span className="booking-form__duration">
                        {d.durationInDays} Days
                      </span>
                    </div>
                    <div className="booking-form__date-container">
                      <span className="booking-form__date booking-form__date--end">
                        {d.endDateShort}
                      </span>
                      <span className="booking-form__destination booking-form__destination--end">
                        {d.endLocation}
                      </span>
                    </div>
                  </div>
                  <div className={resolveVariationClass("booking-form__right")}>
                    {useYachtClass ? renderPrices(d.prices) : null}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))
    }
  }

  return (
    <div id="priceTable" className="section-destination__price-table">
      <section className="booking-form booking-form--in-page">
        <div className={"booking-form__body booking-form__body--in-page"}>
          <div className="booking-form__phase-1">
            {receivedData !== null && (
              <div className="booking-form__tour-title u-margin-bottom-medium">
                <>
                  <h2 className={resolveVariationClass("heading-1")}>
                    {data.data.data.description} Pricing
                  </h2>
                  <p>
                    TODO: Contentful data here. Check the available dates below
                    and then fill in the following booking form to enquire or
                    secure your place.{" "}
                  </p>

                  <p>
                    Our boats accommodate 8-12 guests so book as a solo, couple
                    or if you have a group of friends you can book your own
                    dedicated yacht.
                  </p>
                </>
              </div>
            )}
            <div className="booking-form__entries">
              {renderHeader()}
              {renderEntries()}
              {renderIfno()}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default PriceTable
