import React from "react"

// default components
import {
  Layout,
  Landing,
  GreenBar,
  Banner,
  AboutUsSection,
  Reviews,
  Trips,
  useImageQuery,
  useHomePageQuery,
  useWebSiteConfigQuery,
  renderSeo,
} from "@nt-websites/navigate-theme"

import useWorkingForUs from "../queries/workingForUsQuery"

const AboutUs = ({ data }) => {
  // extracting our custom hook
  const imageQuery = useImageQuery()
  const homeQuery = useHomePageQuery()
  const workForUsQuery = useWorkingForUs()
  const bottomBannerImage = useWebSiteConfigQuery()
    .contentfulWebsiteConfiguration.websiteBottomBannerImage.localFile
    .childImageSharp.fluid

  const aboutUsBannerImage = useWebSiteConfigQuery()
    .contentfulWebsiteConfiguration.aboutUsBannerImage.localFile.childImageSharp
    .fluid

  return (
    <Layout>
      {renderSeo(data)}
      <div className="hotfix--narrow-banner">
        <Landing
          imageData={aboutUsBannerImage}
          titleFirst="About us"
          buttonFirst="expore"
          buttonFirstURL="/blog"
          description="We’re lucky enough to be incredibly passionate about what we do."
          buttonStyles={["white", "white"]}
          optMargin="u-margin-top-percent-10"
          variation="dest"
          mobileBanner={true}
        />
      </div>
      <GreenBar />
      <AboutUsSection data={workForUsQuery[0].node} />
      <Banner
        imageData={bottomBannerImage}
        header="Private Yacht Charters"
        subHeaderFirst="Book your own"
        subHeaderSecond="private sailing trip"
        buttonText="explore"
        link="/private-yacht-charters"
      />
      <Reviews />
      <Trips
        data={homeQuery[0].node.popularTours}
        headerText="Our Explorer Routes"
      />
    </Layout>
  )
}

export default AboutUs
/**
 * We should use seo identifier variables from const PAGE_SEO_IDENTIFIER on this query instead plain strings. . But to do so, we need to pass
 * this data as a context. See LekoArts answer in https://github.com/gatsbyjs/gatsby/issues/10023.
 */
export const query = graphql`
  query {
    allContentfulSeoPageMeta(
      filter: { referencedPageIdentifier: { eq: "about-us" } }
    ) {
      edges {
        node {
          title
          description
        }
      }
    }
  }
`
