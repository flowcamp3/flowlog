import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import CharModal from "./CharModal";

export default function BlogTabBar() {
  const router = useRouter();
  const blogId = router.query.blogId as string;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEditButtonClick = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

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

      <div className="modify_btn" onClick={handleEditButtonClick}>
        edit
      </div>
      {/* Modal component */}
      {isModalOpen && (
        <CharModal isOpen={isModalOpen} onClose={closeModal}>
          <div className="modal_container">
            <div className="modal_overlay">
              <div className="modal_content">
                <div className="image_grid">
                  <div className="image_wrapper">
                    <img
                      src="/assets/walking_char.gif"
                      alt="Image 1"
                      className="image"
                    />
                  </div>
                  <div className="image_wrapper">
                    <img
                      src="/assets/char2.gif"
                      alt="Image 2"
                      className="image"
                    />
                  </div>
                  <div className="image_wrapper">
                    <img
                      src="/assets/char3.webp"
                      alt="Image 3"
                      className="image"
                    />
                  </div>
                  <div className="image_wrapper">
                    <img
                      src="/assets/char4.webp"
                      alt="Image 4"
                      className="image"
                    />
                  </div>
                </div>
                <button className="close_button" onClick={closeModal}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </CharModal>
      )}
      {/* <Link href={`/${blogId}/postswrite`}>
        <div
          className={[
            router.pathname === `/${blogId}/postswrite` ? "active" : "",
            "btn",
          ].join(" ")}
        >
          포스트 작성하기
        </div>
      </Link> */}

      <style jsx>{`
        .modal_container {
          // width: 700px;
          // width: 700px;
        }
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
        .modify_btn {
          margin-left: auto; // This will push the "Modify" button to the right
          border: 1px solid var(--dark-green);
          border-radius: 5px;
          padding-right: 15px;
          padding-left: 15px;
          padding-top: 10px;
          color: var(--dark-green);
        }
        .modify_btn:hover {
          background-color: var(--dark-green);
          color: var(--light-text);
        }
        .select_container {
          width: 600px;
          height: 600px;
          position: fixed;
        }
        .modal_overlay {
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 9999;
        }
        .modal_content {
          background-color: white;
          padding: 20px;
          border-radius: 10px;
        }
        .image_grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 10px;
        }
        .image_wrapper {
          position: relative;
          overflow: hidden;
          border-radius: 5px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        .image {
          width: 100%;
          height: 100%;
          transition: transform 0.3s, box-shadow 0.3s;
        }
        .image:hover {
          transform: scale(1.1);
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
        }
        .close_button {
          background-color: var(--dark-green);
          color: white;
          padding: 8px 16px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          margin-top: 20px;
        }
      `}</style>
    </nav>
  );
}
