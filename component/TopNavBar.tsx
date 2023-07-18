import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import FriendModal from "./FriendModal";
import { signOut, useSession } from "next-auth/react";

interface FollowingData {
  blogId: string;
  blogName: string;
}

const allFollwing = (): FollowingData[] => {
  return [
    { blogId: "koh2040@naver.com", blogName: "panorama" },
    { blogId: "iineaya@naver.com", blogName: "ihihihi" },
    { blogId: "abcdefg@naver.com", blogName: "친구3" },
  ];
};

export default function TopNavBar() {
  const router = useRouter();
  const [modalOpen, setShowModal] = useState(false);
  const [allFollwingData, setAllFollowingData] = useState<FollowingData[]>([]);
  const { data: session } = useSession();
  const openModal = () => {
    setShowModal(true);
    setAllFollowingData(allFollwing());
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
              <div
                style={{ marginRight: "20px", cursor: "pointer" }}
                className="btn"
                onClick={() => {
                  signOut();
                }}
              >
                로그아웃
              </div>
              <FriendModal isOpen={modalOpen} onClose={closeModal}>
                <h2>친구 목록</h2>
                <ul className={"list"}>
                  {allFollwingData.map(({ blogId, blogName }) => (
                    <li className={"listItem"} key={blogId}>
                      <a href={`/${blogId}`} onClick={closeModal}>
                        {blogName}({blogId})
                      </a>
                    </li>
                  ))}
                </ul>
              </FriendModal>
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
          .list {
            list-style: none;
            padding: 10px;
            margin: 0;
          }
          .listItem {
            border: 1px solid #ccc;
            margin: 0 0 1.25rem;
            font-size: large;
            border-radius: 10px;
            padding: 10px;
          }
        `}</style>
      </nav>
    </div>
  );
}
