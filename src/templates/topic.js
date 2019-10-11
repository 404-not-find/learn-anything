import React from "react";
import { graphql, Link } from "gatsby";

export const query = graphql`
  query($id: hasura_uuid!) {
    data {
      topic: topics_by_pk(id: $id) {
        id
        name
      }
    }
  }
`;

export default ({ data }) => {
  const topic = data.data.topic;

  return (
    <div style={{ margin: "5rem auto", width: "550px" }}>
      <h3>
        <Link to="/">Home</Link>
      </h3>
      <h1>{topic.name}</h1>
    </div>
  );
};
