/**
 * Disable sharp simd & cache.
 * https://github.com/gatsbyjs/gatsby/issues/6291
 */

const normalize = require(`./scripts/normalize`)

exports.onCreateNode = async ({ actions, getNodes, node }, pluginOptions) => {
  const { createNodeField } = actions
  const parameters = { createNodeField, getNodes, node }

  if (node.internal.type === "wordpress__POST") {
    await normalize.normalizeBlogNode(parameters)
  }

  if (node.internal.type === "wordpress__wp_users") {
    await normalize.normalizeAuthorNode(parameters)
  }
}

const sharp = require("sharp")
if (
  process.env.DISABLE_SHARP_CACHE &&
  process.env.DISABLE_SHARP_CACHE === "1"
) {
  sharp.simd(false)
  sharp.cache(false)
}

const extractMetadataFromContentfulData = (pageIdentifier, seoPageMetaData) => {
  const metadata = seoPageMetaData.find(
    x => x.node.referencedPageIdentifier === pageIdentifier
  )

  return metadata ? metadata.node : {}
}

const path = require("path")
const createPaginatedPages = require("gatsby-paginate")

// we are implementing gatsby API "createPages". The API will create pages for wordpress posts
exports.createPages = async ({ graphql, actions }, themeOptions) => {
  const { createPage } = actions

  // the graphql function allows us to run arbitrary queries against our local Gatsby Graphql schema.
  // think of it as a built-in database constructed from the fetched data

  return await graphql(`
    {
      allWordpressPost {
        edges {
          node {
            wordpress_id
            slug
            title
            excerpt
            categories {
              slug
              name
            }
            author {
              name
            }
            fields {
              featured_media {
                localFile {
                  childImageSharp {
                    fluid(quality: 70, maxWidth: 800) {
                      base64
                      aspectRatio
                      src
                      srcSet
                      sizes
                      originalImg
                      originalName
                    }
                  }
                }
              }
            }
          }
        }
      }
      allWordpressWpUsers {
        edges {
          node {
            wordpress_id
            slug
            authored_wordpress__POST {
              title
              slug
              categories {
                name
              }
            }
          }
        }
      }
      allWordpressCategory {
        edges {
          node {
            slug
            name
          }
        }
      }
      allContentfulActivities {
        edges {
          node {
            slug
            title
            subtitle
            price
            status
            seo {
              title
              description
            }
            country {
              slug
            }
            bannerImages {
              localFile {
                childImageSharp {
                  fluid(quality: 80, maxWidth: 700) {
                    base64
                    aspectRatio
                    src
                    srcSet
                    sizes
                    originalImg
                    originalName
                  }
                }
              }
            }
          }
        }
      }
      allContentfulDestinations {
        edges {
          node {
            url
            slug
            destinationCountry
            seo {
              title
              description
            }
          }
        }
      }
      allContentfulCountry {
        edges {
          node {
            slug
            seo {
              title
              description
            }
          }
        }
      }
      allContentfulSeoPageMeta {
        edges {
          node {
            title
            description
            referencedPageType
            referencedPageIdentifier
          }
        }
      }
      allContentfulReviews {
        edges {
          node {
            title
            date
            name
            logo {
              localFile {
                publicURL
              }
            }
          }
        }
      }
    }
  `).then(result => {
    // error handling after the query
    if (result.errors) {
      throw result.errors
      process.exit(1)
    }

    //cut off

    // allWordpressTag {
    //   edges {
    //     node {
    //       slug
    //       name
    //     }
    //   }
    // }

    const PageSeoMeta = result.data.allContentfulSeoPageMeta.edges

    const Reviews = result.data.allContentfulReviews.edges

    // accesing the wordpress blog data via a variable
    const BlogPosts = result.data.allWordpressPost.edges

    // setting the link to the template via Node legacy modules
    const BlogPostTemplate = require.resolve("./src/templates/blogSingle.js")

    // accessing to data regarding to all the wp_users
    const BlogAuthors = result.data.allWordpressWpUsers.edges

    // seting the link to the author page template via node legacy modules
    const BlogAuthorTemplate = require.resolve("./src/templates/blogAuthor.js")

    // accesing the data responsible for Wordpress categories
    const BlogCategories = result.data.allWordpressCategory.edges

    // the category blog page template
    const BlogCategoriesTemplate = require.resolve(
      "./src/templates/blogCategory.js"
    )

    // accessing the data responsible for blog tags
    // const BlogTags = result.data.allWordpressTag.edges.filter(
    //   t => t.node.taxonomy === "post_tag"
    // )

    // the tags page template
    // const BlogTagsTemplate = require.resolve("./src/templates/blogTag.js")

    // accessing the data for our contentful activities section
    const Activities = result.data.allContentfulActivities.edges

    // setting the link to the activities page template
    const ActivitiesTemplate = require.resolve(
      "./src/templates/activitiesSingle.js"
    )

    // setting the link the activities countries page
    const ActCountriesTemplate = require.resolve(
      "./src/templates/activitiesCountries.js"
    )

    // accessing the data for our contentful destination section
    const Destinations = result.data.allContentfulDestinations.edges

    // setting the link to the activities page template
    const DestinationsTemplate = require.resolve(
      "./src/templates/destinationsSingle.js"
    )

    // accessing the data for our contentful country section
    const Countries = result.data.allContentfulCountry.edges

    // setting the link to the countries page template
    const CountriesTemplate = require.resolve("./src/templates/countries.js")

    // this is for paginated pages - basically our blog home page
    createPaginatedPages({
      edges: BlogPosts,
      createPage: createPage,
      pageTemplate: require.resolve("./src/templates/blogMain.js"),
      pageLength: 10,
      pathPrefix: "blog",
    })

    createPaginatedPages({
      edges: Reviews,
      createPage: createPage,
      pageTemplate: require.resolve("./src/templates/reviewsMain.js"),
      pageLength: 5,
      pathPrefix: "reviews",
    })

    // creating another set of paginated page for the blog
    /* createPaginatedPages({
      edges: BlogPosts,
      createPage: createPage,
      pageTemplate: require.resolve("./src/templates/blogSearch.js"),
      pageLength: 18,
      pathPrefix: "blog/categorized",
    })*/

    const activitiesMeta = extractMetadataFromContentfulData(
      "activities-main-page",
      PageSeoMeta
    )

    // creating another set of paginated page for activities home page
    createPaginatedPages({
      edges: Activities,
      createPage: createPage,
      pageTemplate: require.resolve("./src/templates/activitiesMain.js"),
      pageLength: 16,
      pathPrefix: "activities",
      context: {
        metadata: activitiesMeta,
      },
    })

    // this is for single blog pages
    BlogPosts.forEach(post => {
      createPage({
        path: `/blog/${post.node.slug}`,
        component: BlogPostTemplate,
        context: {
          id: post.node.wordpress_id,
          site: themeOptions.site,
        },
      })
    })

    // this is for authors
    BlogAuthors.forEach(author => {
      createPage({
        path: `/blog/author/${author.node.slug}`,
        component: BlogAuthorTemplate,
        context: {
          id: author.node.wordpress_id,
          site: themeOptions.site,
        },
      })
    })

    // this is for categories (blog)
    BlogCategories.forEach(category => {
      createPage({
        path: `/blog/category/${category.node.slug}`,
        component: BlogCategoriesTemplate,
        context: {
          slug: category.node.slug,
          name: category.node.name,
          site: themeOptions.site,
        },
      })
    })

    // BlogTags.forEach(tag => {
    //   createPage({
    //     path: `blog/tag/${tag.node.slug}`,
    //     component: BlogTagsTemplate,
    //     context: {
    //       slug: tag.node.slug,
    //       name: tag.node.name,
    //       site: themeOptions.site,
    //     },
    //   })
    // })

    // this is for activities
    Activities.forEach(activity => {
      createPage({
        path: `${themeOptions.routesConfig.activitiesCountryRoutePrefix}${activity.node.country.slug}/${activity.node.slug}`,
        component: ActivitiesTemplate,
        context: {
          slug: activity.node.slug,
          metadata: activity.node.seo,
        },
      })
    })

    // this is for destinations
    Destinations.forEach(destination => {
      createPage({
        path: `${themeOptions.routesConfig.destinationCountryRoutePrefix}${destination.node.destinationCountry}/${destination.node.url}`,
        component: DestinationsTemplate,
        context: {
          slug: destination.node.slug,
          metadata: destination.node.seo,
        },
      })
    })

    /*TODO: We should not use plain strings for url values. All of them should be extracted
   from plugin config or for a custom config file.*/
    Countries.forEach(country => {
      createPage({
        path: `${themeOptions.routesConfig.destinationCountryRoutePrefix}${country.node.slug}`,
        component: CountriesTemplate,
        context: {
          toursBannerType: themeOptions.config.countryPage.toursBannerType,
          slug: country.node.slug,
          metadata: country.node.seo,
        },
      })

      const activityCountryMeta = extractMetadataFromContentfulData(
        `activities/${country.node.slug}`,
        PageSeoMeta
      )

      createPage({
        path: `${themeOptions.routesConfig.activitiesCountryRoutePrefix}${country.node.slug}`,
        component: ActCountriesTemplate,
        context: {
          slug: country.node.slug,
          metadata: activityCountryMeta,
        },
      })
    })
  })
}
