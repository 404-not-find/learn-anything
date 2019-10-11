import React from "react";
import debounceFn from "debounce-fn";
import { useStaticQuery, graphql, Link } from "gatsby";
import matchSorter from "match-sorter";

function useDebFn(cb, opts) {
  return React.useCallback(debounceFn(cb, opts), []);
}

export default () => {
  const result = useStaticQuery(
    graphql`
      {
        data {
          topics {
            name
          }
        }
      }
    `
  );

  // this will be the same every time and because this re-renders on every
  // keystroke I'm pretty sure useMemo is appropriate here.
  const topics = React.useMemo(() => {
    return result.data.topics.map(e => ({
      name: e.name,
    }));
  }, [result.data.topics]);

  const [search, setSearch] = React.useState("");
  const searchInputRef = React.useRef();
  const filteredTopics = matchSorter(topics, search, {
    keys: [
      // "name",
      { key: "name", threshold: matchSorter.rankings.CONTAINS },
    ],
  });

  return (
    <div style={{ margin: "5rem auto", width: "550px" }}>
      <div>
        <label htmlFor="search-input">Search Topics: </label>
        <input
          id="search-input"
          ref={searchInputRef}
          onChange={useDebFn(() => setSearch(searchInputRef.current.value), {
            wait: 200,
          })}
          type="search"
          autoFocus
        />
      </div>
      <div>
        {filteredTopics.map(topic => (
          <p>
            <Link to={`/topic/${topic.name}`}>{topic.name}</Link>
          </p>
        ))}
      </div>
    </div>
  );
};
