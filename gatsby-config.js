/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

require("dotenv").config();
const fetch = require("isomorphic-fetch");
const { createHttpLink } = require("apollo-link-http");

module.exports = {
  plugins: [
    {
      resolve: "gatsby-source-graphql",
      options: {
        typeName: "hasura",
        fieldName: "data",
        // Create Apollo Link manually. Can return a Promise.
        createLink: () => {
          return createHttpLink({
            uri: process.env.HASURA_ENDPOINT,
            headers: {
              "x-hasura-admin-secret": process.env.HASURA_ADMIN_SECRET,
            },
            fetch,
          });
        },
      },
    },
  ],
};
