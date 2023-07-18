import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import FriendModal from "./FriendModal";
import { signOut, useSession } from "next-auth/react";

export default function TopNavBar() {
  const router = useRouter();
  const [modalOpen, setShowModal] = useState(false);
  const { data: session } = useSession();
  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className={"container"}>
      <nav className={"nav_bar"}>
        <Link href="/">
          <div className={"btn"}>FlowLog</div>
        </Link>

        <div style={{ display: "flex" }}>
          {session ? (
            <>
              <Link href={`/${session.user.email}`}>
                <div
                  className={[
                    router.pathname === `/${session.user.email}`
                      ? "active"
                      : "",
                    "btn",
                  ].join(" ")}
                >
                  내 블로그
                </div>
              </Link>
              <div
                style={{ cursor: "pointer" }}
                className="btn"
                onClick={() => {
                  openModal();
                }}
              >
                친구 목록
              </div>
              <FriendModal isOpen={modalOpen} onClose={closeModal}>
                <h2>친구 목록</h2>
                <p>모달 내용이 들어갑니다</p>
              </FriendModal>
              <div
                style={{ marginRight: "20px", cursor: "pointer" }}
                className="btn"
                onClick={() => {
                  signOut();
                }}
              >
                로그아웃
              </div>
            </>
          ) : (
            <Link href="/signin">
              <div style={{ marginRight: "20px" }} className="btn">
                로그인
              </div>
            </Link>
          )}
        </div>

        <style jsx>{`
          .container {
            width: 100vw;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .nav_bar {
            width: 100vw;
            // @media (min-width: 1080px) {
            //   width: 1080px;
            // }
            height: 40px;
            background-color: var(--light-green);
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
          .active {
            text-decoration: none;
          }
        `}</style>
      </nav>
    </div>
  );
}
