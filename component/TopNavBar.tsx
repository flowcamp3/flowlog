import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./NavBar.module.css";

export default function TopNavBar() {
  const router = useRouter();
  return (
    <nav className={"nav_bar"}>
      <Link href="/blog">
        <div
          className={[router.pathname === "/blog" ? "active" : "", "btn"].join(
            " "
          )}
        >
          내 블로그
        </div>
      </Link>

      <button>
        <div className={"btn"}>친구 목록</div>
      </button>

      <Link href="/home">
        <div
          className={[router.pathname === "/home" ? "active" : "", "btn"].join(
            " "
          )}
        >
          로그아웃
        </div>
      </Link>

      <style jsx>{`
        .nav_bar {
          display: flex;
        
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
