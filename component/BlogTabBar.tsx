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
            "btn"
          ].join(" ")}
        >
          포스트 구경하기
        </div>
      </Link>

      <Link href="/blog/profile">
        <div
          className={[
            router.pathname === "/blog/profile" ? "active" : "",
            "btn"
          ].join(" ")}
        >
          프로필 구경하기
        </div>
      </Link>

      <style jsx>{`
        .nav_bar {
          display: flex;
          justify-content: space-between;
        }

        .btn {
          padding: 10px;
        }

        .active {
          color: blue;
          background-color: yellow;
        }
      `}</style>
    </nav>
  );
}
