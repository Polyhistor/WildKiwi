import React from "react"
import { graphql } from "gatsby"
import moment from "moment"
import Img from "gatsby-image"

import Layout2 from "../components/layout/layout2"
import SEO from "../components/seo"

const BlogPostTemplate = ({ data }, idx) => {
  const resolutions =
    data.wordpressPost.featured_media.localFile.childImageSharp.resolutions
  return (
    <Layout2>
      <SEO
        title={data.wordpressPost.title}
        description={data.wordpressPost.excerpt}
      />
      <article className="blog-single">
        <div className="blog-single__banner-container">
          <Img className="blog-single__banner" resolutions={resolutions} />
        </div>

        <div className="row-blog">
          <div className="blog-single__categories">
            {data.wordpressPost.categories.name !== null &&
              data.wordpressPost.categories[0].name}
          </div>
          {data.wordpressPost.data !== null && (
            <h1 className="blog-single__title" key={idx}>
              {data.wordpressPost.title}
            </h1>
          )}

          <img
            src={data.wordpressPost.author.avatar_urls.wordpress_96}
            alt={data.wordpressPost.author.name}
            className="blog-single__avatar"
          />
          <div className="blog-single__author-container">
            <span className="blog-single__author" key={idx + 2}>
              By {data.wordpressPost.author.name}
            </span>
            <br />
            <span>
              on &nbsp;
              {moment(data.wordpressPost.date)
                .local()
                .format("MMMM DD, YYYY")}
            </span>
          </div>
          <div
            className="blog-single__content"
            dangerouslySetInnerHTML={{ __html: data.wordpressPost.content }}
          />
          <div className="blog-single__sidebar">side bar</div>
        </div>
      </article>
    </Layout2>
  )
}

export default BlogPostTemplate

export const query = graphql`
  query($id: Int!) {
    wordpressPost(wordpress_id: { eq: $id }) {
      title
      content
      excerpt
      date
      author {
        name
        avatar_urls {
          wordpress_96
        }
      }
      # acf {
      #   img
      # }
      categories {
        name
      }
      featured_media {
        localFile {
          childImageSharp {
            resolutions(width: 1500, height: 600) {
              src
              srcSet
              width
              height
            }
          }
        }
      }
    }
  }
`
