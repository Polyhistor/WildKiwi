import React from "react"
import { withPrefix } from "gatsby"

import Review from "./review"

const Reviews = () => {
  return (
    <section className="section-facebook-reviews">
      <div className="row">
        <div className="col-1-of-4">
          <div className="facebook-reviews">
            <span className="facebook-reviews__rating">
              4.9<span className="facebook-reviews__rating-decimal">/5</span>
            </span>
            <center className="facebook-reviews__stars-box">
              <svg className="svg-icon--star-big">
                <use xlinkHref={withPrefix("sprite.svg#icon-Star")} />
              </svg>
              <svg className="svg-icon--star-big">
                <use xlinkHref={withPrefix("sprite.svg#icon-Star")} />
              </svg>
              <svg className="svg-icon--star-big">
                <use xlinkHref={withPrefix("sprite.svg#icon-Star")} />
              </svg>
              <svg className="svg-icon--star-big">
                <use xlinkHref={withPrefix("sprite.svg#icon-Star")} />
              </svg>
              <svg className="svg-icon--star-big">
                <use xlinkHref={withPrefix("sprite.svg#icon-Star")} />
              </svg>
            </center>
            <center className="facebook-reviews__title">Facebook Review</center>
            <center className="facebook-reviews__subtitle">
              based on 151 reviews
            </center>
            <a
              aria-current="page"
              className="btn btn--green tablet-green-button"
              href="/"
            >
              more reviews
            </a>
          </div>
        </div>
        <div className="col-1-of-4">
          <Review
            text="Where do I start! Absolutely fantastic tour! The places are all breathtaking, postcard quality views around every corner. I am in love with New Zealand now and can’t wait to be back."
            author="Melissa James"
            country="Australia"
          />
        </div>
        <div className="col-1-of-4">
          <Review
            text="Had the most amazing tour in the south island. I was nervous about travelling solo the first time but such a small group of awesome people made it a great experience and I never felt like I was alone!"
            author="Isabella Durham"
            country="Australia"
          />
        </div>
        <div className="col-1-of-4">
          <Review
            text="The itinerary was great, we got to see so much and even the driving days were fun because we got to stop off at so many beautiful and out of the way places."
            author="Hayley Fraser"
            country="Australia"
          />
        </div>
        <div className="mobile-yes u-center-text u-margin-top-small">
          <a
            aria-current="page"
            className="btn btn--green tablet-green-button"
            href="/"
          >
            more reviews
          </a>
        </div>
      </div>
    </section>
  )
}

export default Reviews
