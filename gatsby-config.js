module.exports = {
  siteMetadata: {
    title: `Wild Kiwi`,
    description: `We bring your dreams into reality`,
    author: `Pouya Ataei`,
    copyright: `Navigate Group Ltd`,
  },
  plugins: [
    `gatsby-plugin-playground`,
    `gatsby-plugin-sass`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        // background_color: `#663399`,
        // theme_color: `#ffffff`,
        // display: `minimal-ui`,
        icon: `src/images/wild_kiwi_favicon.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
    {
      resolve: `gatsby-source-wordpress`,
      options: {
        /*
         * The base URL of the Wordpress site without the trailingslash and the protocol. This is required.
         * Example : 'gatsbyjsexamplewordpress.wordpress.com' or 'www.example-site.com'
         */
        baseUrl: `www.wildkiwi.com`,
        // The protocol. This can be http or https.
        protocol: `https`,
        // Indicates whether the site is hosted on wordpress.com.
        // If false, then the assumption is made that the site is self hosted.
        // If true, then the plugin will source its content on wordpress.com using the JSON REST API V2.
        // If your site is hosted on wordpress.org, then set this to false.
        hostingWPCOM: false,
        // Set verboseOutput to true to display a verbose output on `npm run develop` or `npm run build`
        // It can help you debug specific API Endpoints problems.
        verboseOutput: false,
        // Set how many pages are retrieved per API request.
        perPage: 50,
        // Search and Replace Urls across WordPress content.
        searchAndReplaceContentUrls: {
          sourceUrl: "https://www.wildkiwi.com/",
          replacementUrl: "http://localhost:8000/",
        },
        // Set how many simultaneous requests are sent at once.
        concurrentRequests: 10,
        // Set WP REST API routes whitelists
        // and blacklists using glob patterns.
        // Defaults to whitelist the routes shown
        // in the example below.
        // See: https://github.com/isaacs/minimatch
        // Example:  `["/*/*/comments", "/yoast/**"]`
        // ` will either include or exclude routes ending in `comments` and
        // all routes that begin with `yoast` from fetch.
        // Whitelisted routes using glob patterns
        includedRoutes: [
          `**/categories`,
          `**/posts`,
          `**/pages`,
          // `**/media`,
          // `**/tags`,
          // `**/taxonomies`,
          `**/users`,
        ],
        // use a custom normalizer which is applied after the built-in ones.
        normalizer: function({ entities }) {
          return entities
        },
      },
    },
  ],
}
