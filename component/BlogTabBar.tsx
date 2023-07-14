import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function BlogTabBar() {
  const router = useRouter();
  return (
    <nav>
      <Link href="/blog/posts">
        <div
          className={[
            router.pathname === "/blog/posts" ? "active" : "",
            "btn",
          ].join(" ")}
        >
          포스트 들어갈 칸
        </div>
      </Link>

      <Link href="/blog/profile">
        <div
          className={[
            router.pathname === "/blog/profile" ? "active" : "",
            "btn",
          ].join(" ")}
        >
          프로필 들어갈 칸
        </div>
      </Link>

      <style jsx>{`
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
