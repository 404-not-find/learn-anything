import { useState, useCallback, useEffect } from "react";
import Link from "next/link";

import { toggleLightMode } from "../lib/theme";
import scrollToTop from "../lib/scroll-to-top";

const Logo = () => {
  return (
    <Link href="/">
      <a aria-label="Navigate Home">
        <svg
          height="40"
          viewBox="0 0 27 50"
          fill="var(--fg)"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M6.95456 27.754V42.4486C6.95456 44.1394 8.32823 45.51 10.0227 45.51C11.7172 45.51 13.0909 44.1394 13.0909 42.4486V27.754H13.9091V46.9386C13.9091 48.6294 15.2828 50 16.9773 50C18.6718 50 20.0455 48.6294 20.0455 46.9386V27.754H20.8636V35.9177C20.8636 37.6084 22.2373 38.9791 23.9318 38.9791C25.6263 38.9791 27 37.6084 27 35.9177V12.6513C27 5.21195 20.9558 0 13.5 0C6.04414 0 0 5.21197 0 12.6513L2.49689e-05 38.3668C2.49689e-05 40.0575 1.37369 41.4282 3.0682 41.4282C4.76271 41.4282 6.13638 40.0575 6.13638 38.3668V27.754H6.95456ZM19.8409 14.0799C20.6317 14.0799 21.2727 13.4403 21.2727 12.6513C21.2727 11.8622 20.6317 11.2226 19.8409 11.2226C19.0501 11.2226 18.4091 11.8622 18.4091 12.6513C18.4091 13.4403 19.0501 14.0799 19.8409 14.0799ZM9.81817 17.5495C9.81817 17.5495 9.81817 20.4067 13.5 20.4067C17.1818 20.4067 17.1818 17.5495 17.1818 17.5495H9.81817ZM8.5909 12.6513C8.5909 13.4403 7.94985 14.0799 7.15908 14.0799C6.36831 14.0799 5.72727 13.4403 5.72727 12.6513C5.72727 11.8623 6.36831 11.2226 7.15908 11.2226C7.94985 11.2226 8.5909 11.8623 8.5909 12.6513Z"
          />
        </svg>

        <style jsx>{`
          svg {
            transition: fill 0.1s ease-in;
          }

          a {
            outline: none;
            display: inline-flex;
          }

          a:focus svg,
          svg:hover,
          svg:focus {
            fill: var(--gray);
          }

          @media (max-width: 600px) {
            svg {
              height: 30px;
              width: auto;
            }
          }
        `}</style>
      </a>
    </Link>
  );
};

const Toggle = () => {
  return (
    <button
      onClick={toggleLightMode}
      aria-label="Toggle Theme"
      title="Toggle Theme"
      type="button"
    >
      <style jsx>{`
        button {
          --size: 20px;
          height: var(--size);
          width: var(--size);
          border: 2px solid var(--fg);
          border-radius: 50%;
          background: transparent;
          cursor: pointer;
          transition: border-color 0.1s ease-in-out;
        }

        button:hover,
        button:focus {
          outline: none;
          border-color: var(--gray);
        }
      `}</style>
    </button>
  );
};

const Description = ({ children, ...props }) => {
  const [scroll, setScroll] = useState("0%");

  const onScroll = useCallback(() => {
    window.requestAnimationFrame(() => {
      const h = document.documentElement;
      const b = document.body;
      const st = "scrollTop";
      const sh = "scrollHeight";
      const percent =
        ((h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight)) * 100;
      setScroll(`${percent}%`);
    });
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      style={{ "--p": scroll }}
      {...props}
      onClick={scrollToTop}
      title="Scroll to top"
    >
      {children}

      <style jsx>{`
        div {
          --p: 0%;

          cursor: pointer;
          background-image: linear-gradient(
            to right,
            var(--fg) var(--p),
            transparent var(--p)
          );
          background-clip: text;
          -webkit-background-clip: text;
          color: var(--gray-alpha);
          font-weight: 500;
        }
      `}</style>
    </div>
  );
};

const Header = ({ title, content }) => {
  return (
    <nav>
      <div className="header">
        <div className="logo">
          <Logo />
        </div>

        <div className="title" onClick={scrollToTop} title="Scroll to top">
          {title}
        </div>

        {content && typeof content === "string" ? (
          <div className="content">
            <Description>{content}</Description>
          </div>
        ) : (
          <div className="content">{content}</div>
        )}

        <div className="toggle">
          <Toggle />
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 960px) {
          nav {
            position: ${content ? "sticky" : "static"};
          }
        }
      `}</style>

      <style jsx>{`
        nav {
          z-index: 10;
          margin: var(--small-gap) auto var(--big-gap) auto;
          position: sticky;
          padding: var(--gap) 0;
          top: 0;
          background-color: var(--header-bg);
          backdrop-filter: saturate(180%) blur(20px);
          transition: background-color var(--transition);
        }

        .header {
          margin: 0 auto;
          padding: 0 var(--gap);
          max-width: calc(1.5 * var(--main-content));
          display: flex;
          align-items: center;
          flex-wrap: wrap;
        }

        .logo,
        .toggle,
        .content {
          display: flex;
          align-items: center;
        }

        .logo {
          flex-basis: calc(0.25 * var(--main-content));
        }

        .title {
          cursor: pointer;
          font-weight: bold;
          flex-basis: 100px;
        }

        .content {
          flex: 1;
          min-height: var(--gap-double);
          max-width: calc(var(--main-content) - 100px);
        }

        .toggle {
          flex: 1;
          justify-content: flex-end;
        }

        .m {
          display: none;
        }

        @media (max-width: 960px) {
          nav {
            margin: var(--gap-double) 0;
            padding: 0;
            top: calc(-1 * (30px + var(--gap)));
          }

          .header {
            max-width: var(--main-content);
          }

          .content,
          .description {
            order: 4;
            flex-basis: 100%;
            margin: var(--gap) 0;
            padding-top: var(--gap);
            max-width: unset;
            display: flex;

            overflow: auto;
            -ms-overflow-style: none;
            scrollbar-width: none;
          }

          .content::-webkit-scrollbar {
            display: none;
          }

          .logo,
          .title,
          .toggle {
            flex: 1;
            flex-basis: unset;
          }

          .title {
            text-align: center;
          }
        }
      `}</style>
    </nav>
  );
};

export default Header;
