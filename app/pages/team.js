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
        </div>
      }
    >
      <article>
        <table>
          <tr>
            {items.map(entry => {
              return (
                <td align="center">
                  <img src={entry.image} alt={entry.name} />
                  <br />
                  <b>{entry.name}</b>
                </td>
              );
            })}
          </tr>
        </table>
      </article>

      <style jsx>{`
        img {
          border-radius: 10%;
          width: 90%;
        }
      `}</style>
    </Page>
  );
}

export default Team;
