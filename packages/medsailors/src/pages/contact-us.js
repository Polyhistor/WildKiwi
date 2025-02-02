import React from "react"

// default components
import {
  Layout,
  Landing,
  GreenBar,
  Banner,
  SectionGetInTouch,
  Reviews,
  Trips,
  useImageQuery,
  useHomePageQuery,
  renderSeo,
  useContactQuery,
  resolveVariationClass,
  useWebSiteConfigQuery,
} from "@nt-websites/navigate-theme"

const GetInTouch = ({ data }) => {
  const link = resolveVariationClass("link")

  // extracting our custom hook
  const bottomBannerImage = useWebSiteConfigQuery()
    .contentfulWebsiteConfiguration.websiteBottomBannerImage.localFile
    .childImageSharp.fluid

  const contactUsBannerImage = useWebSiteConfigQuery()
    .contentfulWebsiteConfiguration.contactUsBannerImage.localFile
    .childImageSharp.fluid

  const imageQuery = useImageQuery()
  const homeQuery = useHomePageQuery()
  const contactData = useContactQuery()

  /*replace link*/
  const leftContactSection = contactData.leftSection.map(c => {
    c.content = c.content
      .replace(`#LINK#`, link)
      .replace(`#LINK#`, link)
      .replace(`#LINK#`, link)
      .replace(`#LINK#`, link)
    return c
  })

  return (
    <Layout>
      {renderSeo(data)}
      <div className="hotfix--narrow-banner">
        <Landing
          imageData={contactUsBannerImage}
          titleFirst="Get in touch"
          buttonFirst="expore"
          buttonFirstURL="/blog"
          description="We're always here to help, just send us a message and a member of the MedSailors team will be in touch."
          buttonStyles={["white", "white"]}
          optMargin="u-margin-top-percent-10"
          variation="dest"
          shape="circle"
          mobileBanner={true}
        />
      </div>
      <GreenBar />
      <SectionGetInTouch
        phoneNumberData={contactData.phoneAddress}
        leftContactSection={leftContactSection}
      />{" "}
      <Banner
        imageData={bottomBannerImage}
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

export default GetInTouch
/**
 * We should use seo identifier variables from const PAGE_SEO_IDENTIFIER on this query instead plain strings. . But to do so, we need to pass
 * this data as a context. See LekoArts answer in https://github.com/gatsbyjs/gatsby/issues/10023.
 */
export const query = graphql`
  query {
    allContentfulSeoPageMeta(
      filter: { referencedPageIdentifier: { eq: "contact-us" } }
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
