import Page from "../components/page";
import Link from "../components/link";

// Data
import useData from "../lib/use-data";
import { data } from "../data/contact.json";

function Contact() {
  const { items } = useData(data);

  return (
    <Page
      title="About"
      content={
        <div className="flex">
          <Link className="l-h invert" href="/team">
            Team
          </Link>
          <Link className="l-h invert active" href="/contact">
            Contact
          </Link>
        </div>
      }
    >
      <article>
        {items.map(entry => {
          return (
            <li key={entry.name}>
              <Link className={`l-h ${entry.color}`} href={entry.link}>
                {entry.name}
              </Link>
            </li>
          );
        })}
      </article>

      <style jsx>{`
        li {
          display: flex;
          flex-direction: column;
          text-align: center;
        }
      `}</style>
    </Page>
  );
}

export default Contact;
