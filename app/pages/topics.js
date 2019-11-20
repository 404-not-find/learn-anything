import Page from '../components/page'

// Data
import useData from '../lib/use-data'
import { data } from '../data/topics.json'

function Topics() {
  const { items } = useData(data)

  return (
    <Page title="Topics">
      <article>
        {items.map(entry => {
          return (
            <ul key={entry.key}>
              <li key={entry.key}>{entry.key}</li>
            </ul>
          )
        })}
      </article>
    </Page>
  )
}

export default Topics
