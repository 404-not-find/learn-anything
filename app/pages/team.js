import Page from "../components/page";
import Link from "../components/link";

// Data
import useData from "../lib/use-data";
import { data } from "../data/team.json";

function Team() {
  const { items } = useData(data);

  return (
    <Page
      title="About"
      content={
        <div className="flex">
          <Link className="l-h invert active" href="/team">
            Team
          </Link>
          <Link className="l-h invert" href="/contact">
            Contact
          </Link>
        </div>
      }
    >
      <article>
        <li>
          {items.map(entry => {
            return (
              <td align="center" key={entry.name}>
                <img src={entry.image} alt={entry.name} />
                <br />
                <b>{entry.name}</b>
              </td>
            );
          })}
        </li>
      </article>

      <style jsx>{`
        li {
          display: flex;
        }

        img {
          border-radius: var(--radius);
          width: 85%;
        }
      `}</style>
    </Page>
  );
}

export default Team;
