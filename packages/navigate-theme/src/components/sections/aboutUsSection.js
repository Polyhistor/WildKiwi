import React from "react"
import Img from "gatsby-image"

import { WorkForUs } from "@nt-websites/navigate-theme"

import useAboutUsQuery from "../../queries/aboutUsQuery"
import useTeamQuery from "../../queries/teamQuery"

export const AboutUs = () => {
  const theme = process.env.GATSBY_THEME

  // extracting query out of our custom hook
  const aboutUsData = useAboutUsQuery()

  // extracting our second hook
  const teamData = useTeamQuery()

  // rendering boxes for our values
  const renderHowBoxes = () => {
    return aboutUsData.map((element, idx) => {
      return (
        <div className="about-us__box" key={idx}>
          <div className="about-us__image">
            <Img
              fluid={element.node.banner.localFile.childImageSharp.fluid}
              alt={element.node.title}
            />
          </div>
          <h3 className="how-it-works__header activity__title">
            {element.node.title}
          </h3>
          <p className="how-it-works__description">
            {element.node.content.content}
          </p>
        </div>
      )
    })
  }

  // rendering boxes for team members
  const renderTeam = () => {
    return teamData
      .sort((a, b) => a.node.contentfulid - b.node.contentfulid)
      .map((element, idx) => {
        return (
          <div className="about-us__box" key={idx}>
            <div className="about-us__image">
              <Img
                fluid={element.node.image.localFile.childImageSharp.fluid}
                alt={element.node.title}
              />
            </div>
            <h3 className="about-us__header activity__title">
              {element.node.name}
            </h3>
            <p className="about-us__description">{element.node.title}</p>
          </div>
        )
      })
  }

  return (
    <section className="section-about-us">
      <div className="about-us__container">
        <h2
          className={
            theme === "ms"
              ? "heading-1 heading-1--ms  u-margin-bottom-small"
              : "heading-1"
          }
        >
          Our Values
        </h2>
        {renderHowBoxes()}
        <h2
          className={
            theme === "ms"
              ? "heading-1 heading-1--ms  u-margin-bottom-small"
              : "heading-1"
          }
        >
          Meet our loving team
        </h2>
        {renderTeam()}
      </div>
    </section>
  )
}
