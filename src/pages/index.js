import React from "react";
import { graphql, Link } from "gatsby";
// import slugify from "../utils/slugify";

export const query = graphql`
  {
    data {
      topics {
        name
      }
    }
  }
`;

export default ({ data }) => (
  <div style={{ margin: "5rem auto", width: "550px" }}>
    {data.data.topics.map(topic => (
      <p>
        <Link to={`/topic/${topic.name}`}>{topic.name}</Link>
      </p>
    ))}
  </div>
);
