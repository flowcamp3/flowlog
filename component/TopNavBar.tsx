import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import css from "styled-jsx/css";
import FriendModal from "./FriendModal";

export default function TopNavBar() {
  const router = useRouter();
  const [modalOpen, setShowModal] = useState(false);
  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <nav className={"nav_bar"}>
      <Link href="/">
        <div className={"btn"}>FlowLog</div>
      </Link>

      <div style={{ display: "flex" }}>
        <Link href="/blog">
          <div
            className={[
              router.pathname === "/blog" ? "active" : "",
              "btn",
            ].join(" ")}
          >
            내 블로그
          </div>
        </Link>

        <button onClick={openModal}>
          <div className={`btn friend_btn`}>친구 목록</div>
        </button>
        <FriendModal isOpen={modalOpen} onClose={closeModal}>
          <h2>이것은 모달입니다</h2>
          <p>모달 내용이 들어갑니다</p>
        </FriendModal>

        <Link href="/home">
          <div
            className={[
              router.pathname === "/home" ? "active" : "",
              "btn",
            ].join(" ")}
          >
            로그아웃
          </div>
        </Link>
      </div>

      <style jsx>{`
        .nav_bar {
          height: 40px;
          background-color: var(--light-pink);
          display: flex;
          justify-content: space-between;
          place-items: center;
        }
        .btn {
          text-decoration: none;
          padding-left: 10px;
          padding-right: 10px;
          text-align: center;
        }
        .friend_btn {
          font-family: inherit;
          font-size: inherit;
          background-color: transparent;
          border: none;
          padding: 0;
        }
        .active {
          text-decoration: none;
          color: blue;
        }
      `}</style>
    </nav>
  );
}
