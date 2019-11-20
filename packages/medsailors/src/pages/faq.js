import React from "react"

// default components
import {
  Layout,
  SEO,
  Landing,
  GreenBar,
  Banner,
  SectionFAQ,
  Reviews,
  Trips,
  useImageQuery,
  useHomePageQuery,
  useFAQQuery,
  renderSeo,
} from "@nt-websites/navigate-theme"

const FAQ = ({ data }) => {
  const SVGIcon = "wheel"

  // extracting our custom hook
  const imageQuery = useImageQuery()
  const homeQuery = useHomePageQuery()
  const FAQData = useFAQQuery()

  return (
    <Layout>
      {renderSeo(data)}
      <div className="hotfix--narrow-banner">
        <Landing
          imageData={imageQuery.MSFAQ.childImageSharp.fluid}
          titleFirst="FAQs"
          buttonFirst="expore"
          buttonFirstURL="/blog"
          description="Have questions? Find all the answers below so you can be fully prepared for the adventure of a lifetime."
          buttonStyles={["white", "white"]}
          optMargin="u-margin-top-percent-10"
          variation="dest"
          shape="triangle"
        />
      </div>
      <GreenBar
        text="Skippered sailing holidays for 20-35 year olds"
        imageData={SVGIcon}
        imageAlt="Wild-Kiwi-Mountaints-Logo"
      />
      <SectionFAQ FAQData={FAQData} />
      <Banner
        imageData={imageQuery.MSBottomBanner.childImageSharp.fluid}
        header="How It Works"
        subHeaderFirst="Everything You Need To"
        subHeaderSecond="Know About Our Tours"
        buttonText="explore"
        link="/how-it-works"
      />
      <Reviews />
      <Trips data={homeQuery[0].node.popularTours} headerText="Popular Trips" />
    </Layout>
  )
}
/**
 * We should use seo identifier variables from const PAGE_SEO_IDENTIFIER on this query instead plain strings. . But to do so, we need to pass
 * this data as a context. See LekoArts answer in https://github.com/gatsbyjs/gatsby/issues/10023.
 */
export const query = graphql`
  query {
    allContentfulSeoPageMeta(
      filter: { referencedPageIdentifier: { eq: "faq" } }
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

export default FAQ
