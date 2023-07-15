import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function BlogTabBar() {
  const router = useRouter();
  return (
    <nav className={"nav_bar"}>
      <Link href="/blog/posts">
        <div
          className={[
            router.pathname === "/blog/posts" ? "active" : "",
            "btn",
          ].join(" ")}
        >
          포스트 구경하기
        </div>
      </Link>

      <Link href="/blog/guestbook">
        <div
          className={[
            router.pathname === "/blog/guestbook" ? "active" : "",
            "btn",
          ].join(" ")}
        >
          방명록 구경하기
        </div>
      </Link>

      <style jsx>{`
        .nav_bar {
          width: 100vw;
          @media (min-width: 1080px) {
            width: 1080px;
          }
          display: flex;

          background-color: var(--light-pink);
          background-color: var(--light-text);
          background-image: linear-gradient(
              45deg,
              var(--light-green) 25%,
              transparent 25%,
              transparent 75%,
              var(--light-green) 75%,
              var(--light-green)
            ),
            linear-gradient(
              45deg,
              var(--light-green) 25%,
              transparent 25%,
              transparent 75%,
              var(--light-green) 75%,
              var(--light-green)
            );
          background-position: 0 0, 10px 10px;
          background-size: 20px 20px;
          border-radius: 15px 15px 0 0;
        }

        .btn {
          color: var(--dark-green);
          padding: 10px;
          border-radius: 15px 15px 0 0;
        }

        .active {
          color: var(--light-text);
          background-color: var(--dark-green);
        }
      `}</style>
    </nav>
  );
}
