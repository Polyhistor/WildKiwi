import React from "react"

// default components
import {
  Layout,
  Landing,
  GreenBar,
  Banner,
  SectionHowItWorks,
  Reviews,
  Trips,
  useImageQuery,
  useHomePageQuery,
  useHowItWorksQuery,
  useWebSiteConfigQuery,
  renderSeo,
} from "@nt-websites/navigate-theme"

const HowItWorks = ({ data }) => {
  // extracting our custom hook
  const bottomBannerImage = useWebSiteConfigQuery()
    .contentfulWebsiteConfiguration.websiteBottomBannerImage.localFile
    .childImageSharp.fluid

  const homeQuery = useHomePageQuery()
  const howItWorksData = useHowItWorksQuery()
  const howItWorksBannerImage = useWebSiteConfigQuery()
    .contentfulWebsiteConfiguration.howItWorksBannerImage.localFile
    .childImageSharp.fluid
  return (
    <Layout>
      {renderSeo(data)}
      <div className="hotfix--narrow-banner">
        <Landing
          imageData={howItWorksBannerImage}
          titleFirst="How it works"
          buttonFirst="expore"
          buttonFirstURL="/blog"
          description="Everything you need to know about sailing with us."
          buttonStyles={["white", "white"]}
          optMargin="u-margin-top-percent-10"
          variation="dest"
          shape="circle"
          mobileBanner={true}
        />
      </div>
      <GreenBar />
      <SectionHowItWorks data={howItWorksData} />
      <Banner
        imageData={bottomBannerImage}
        header="How It Works"
        subHeaderFirst="Everything You Need To"
        subHeaderSecond="Know About Our Tours"
        buttonText="explore"
        link="/faq"
      />
      <Reviews />
      <Trips data={homeQuery[0].node.popularTours} headerText="Popular Trips" />
    </Layout>
  )
}

export default HowItWorks
/**
 * We should use seo identifier variables from const PAGE_SEO_IDENTIFIER on this query instead plain strings. . But to do so, we need to pass
 * this data as a context. See LekoArts answer in https://github.com/gatsbyjs/gatsby/issues/10023.
 */
export const query = graphql`
  query {
    allContentfulSeoPageMeta(
      filter: { referencedPageIdentifier: { eq: "how-it-works" } }
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
