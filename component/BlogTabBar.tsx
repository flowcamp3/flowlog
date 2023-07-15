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
          display: flex;
        }

        .btn {
          color: var(--dark-pink);
          padding: 10px;
          border-radius: 15px 15px 0 0;
        }

        .active {
          color: var(--light-text);
          background-color: var(--dark-pink);
        }
      `}</style>
    </nav>
  );
}
