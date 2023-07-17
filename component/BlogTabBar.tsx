import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function BlogTabBar() {
  const router = useRouter();
  const blogId = router.query.blogId as string;

  return (
    <nav className={"nav_bar"}>
      <Link href={`/${blogId}/posts`}>
        <div
          className={[
            router.asPath === `/${blogId}/posts` ? "active" : "",
            "btn",
          ].join(" ")}
        >
          POST
        </div>
      </Link>

      <Link href={`/${blogId}/guestbook`}>
        <div
          className={[
            router.asPath === `/${blogId}/guestbook` ? "active" : "",
            "btn",
          ].join(" ")}
        >
          GUESTBOOK
        </div>
      </Link>

      <Link href={`/${blogId}/postswrite`}>
        <div
          className={[
            router.pathname === `/${blogId}/postswrite` ? "active" : "",
            "btn",
          ].join(" ")}
        >
          포스트 작성하기
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
          height: 20px;
          width: 80px;
          text-align: center;
          color: var(--dark-green);
          padding: 10px;
          border-radius: 15px 15px 0 0;
          font-size: 18px;
        }
        .btn:hover {
          background-color: var(--dark-green);
          color: var(--light-text);
        }

        .active {
          color: var(--light-text);
          background-color: var(--dark-green);
        }
      `}</style>
    </nav>
  );
}
