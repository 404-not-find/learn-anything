import Page from "../components/page";
import Link from "../components/link";

const Index = () => {
  return (
    <Page
      title="Home"
      content={
        <div className="flex">
          <Link className="l-h invert" href="/topics">
            Topics
          </Link>
        </div>
      }
    ></Page>
  );
};

export default Index;
