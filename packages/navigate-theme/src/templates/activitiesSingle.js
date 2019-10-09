import React from "react"
import { graphql } from "gatsby"

// default components
import Layout2 from "../components/layout/layout2"
import LandingChartered from "../components/header/landings/landingChartered"
import GreenBar from "../components/bars/greenBar"
import SectionActivity from "../components/activity/sectionActivity"
import ActivityScaffold from "../components/activity/activityScaffold"
import ActivityRelated from "../components/activity/activityRelated"
import Banner from "../components/banners/banner"
import Reviews from "../components/reviews/reviews"
import Trips from "../components/trips/trips"

// utilities
import useHomePageQuery from "../queries/homePageQuery"
import { Breadcrumb } from "gatsby-plugin-breadcrumb"
import { renderSeoFromContext } from "../helpers/seo-helper"

const ActivitiesSingle = ({
  pageContext,
  data,
  location,
  data: { allPageJson },
}) => {
  // intricated object destruction
  const {
    breadcrumb: { crumbs },
  } = pageContext

  console.log(crumbs)

  let customCrub = []

  crumbs.forEach(e => [...customCrub, e.pathname])

  console.log(customCrub)

  // extracting our custom hook
  const homeQuery = useHomePageQuery()
  return (
    <Layout2>
      {renderSeoFromContext(pageContext)}
      <LandingChartered
        bannerFirst={
          data.contentfulActivities.bannerImages[0].localFile.childImageSharp
            .fluid
        }
        bannerSecond={
          data.contentfulActivities.bannerImages[1] !== undefined
            ? data.contentfulActivities.bannerImages[1].localFile
                .childImageSharp.fluid
            : null
        }
        bannerThird={
          data.contentfulActivities.bannerImages[2] !== undefined
            ? data.contentfulActivities.bannerImages[2].localFile
                .childImageSharp.fluid
            : null
        }
        bannerFourth={
          data.contentfulActivities.bannerImages[3] !== undefined
            ? data.contentfulActivities.bannerImages[3].localFile
                .childImageSharp.fluid
            : null
        }
        bannerFifth={
          data.contentfulActivities.bannerImages[4] !== undefined
            ? data.contentfulActivities.bannerImages[4].localFile
                .childImageSharp.fluid
            : null
        }
        country={data.contentfulActivities.country.title}
        buttonText="watch trail"
        buttonTextSecond="view photos"
      />
      <GreenBar
        text="Epic adventure for 18 to 35 year olds"
        imageAlt="Wild-Kiwi-Mountaints-Logo"
      />
      <SectionActivity>
        <div className="activity__breadcrumb-container">
          <Breadcrumb
            className="activity__breadcrumb"
            crumbs={crumbs}
            crumbSeparator="&ensp;/&ensp;"
          />
        </div>
        <ActivityScaffold
          title={data.contentfulActivities.title}
          subtitle={data.contentfulActivities.subtitle}
          price={data.contentfulActivities.price}
          svgMap={data.contentfulActivities.svgMap.localFile.publicURL}
          description={
            data.contentfulActivities.description !== null
              ? data.contentfulActivities.description.json
              : "there has been no description found for this tour on Contentful, please consider adding one"
          }
        />
        <ActivityRelated country={data.contentfulActivities.country} />
      </SectionActivity>
      <Banner
        header="How it works"
        subHeaderFirst="everything you need to"
        subHeaderSecond="know about our tours"
        buttonText="continue"
        link="/how-it-works"
      />
      <Reviews />
      <Trips data={homeQuery[0].node.popularTours} />
    </Layout2>
  )
}

export default ActivitiesSingle

export const query = graphql`
  query($slug: String!) {
    contentfulActivities(slug: { eq: $slug }) {
      ...Activities
    }
  }
`
