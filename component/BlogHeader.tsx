import React, { useRef, useEffect, useState } from "react";
import CharModal from "./CharModal";
import Image from "next/image";

const BlogHeader: React.FC = () => {
  const charContainerRef = useRef<HTMLDivElement>(null);
  const [charPosition, setCharPosition] = useState({ top: 0, left: 0 });
  const [selectedImage, setSelectedImage] = useState(
    "/assets/walking_char.gif"
  ); // Set the initial selected image
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEditButtonClick = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleImageClick = (imageSrc) => {
    setSelectedImage(imageSrc); // Set the selected image src when an image in the modal is clicked
    closeModal(); // Close the modal after selecting an image
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const container = charContainerRef.current;
      if (!container) return;

      const { top, left } = charPosition;
      let newTop = top;
      let newLeft = left;

      switch (event.key) {
        case "ArrowUp":
          newTop -= 10;
          break;
        case "ArrowDown":
          newTop += 10;
          break;
        case "ArrowLeft":
          newLeft -= 10;
          break;
        case "ArrowRight":
          newLeft += 10;
          break;
        default:
          return;
      }

      setCharPosition({ top: newTop, left: newLeft });
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [charPosition]);

  return (
    <div>
      <div className="container">
        <div className="img_container">
          <Image
            src="/assets/sample_header2.jpg"
            alt="sample header"
            layout="fill"
            objectFit="cover"
          />
          <div
            className="char_container"
            ref={charContainerRef}
            style={{
              top: `${charPosition.top}px`,
              left: `${charPosition.left}px`,
            }}
          >
            <Image
              src={selectedImage}
              alt="sample header"
              width={100}
              height={100}
              className="character"
            />
          </div>
        </div>
      </div>
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
                  <div
                    className="image_wrapper"
                    onClick={() => handleImageClick("/assets/walking_char.gif")}
                  >
                    <img
                      src="/assets/walking_char.gif"
                      alt="Image 1"
                      className="image"
                    />
                  </div>
                  <div
                    className="image_wrapper"
                    onClick={() => handleImageClick("/assets/char2.gif")}
                  >
                    <img
                      src="/assets/char2.gif"
                      alt="Image 2"
                      className="image"
                    />
                  </div>
                  <div
                    className="image_wrapper"
                    onClick={() => handleImageClick("/assets/char3.webp")}
                  >
                    <img
                      src="/assets/char3.webp"
                      alt="Image 3"
                      className="image"
                    />
                  </div>
                  <div
                    className="image_wrapper"
                    onClick={() => handleImageClick("/assets/char4.webp")}
                  >
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
        .container {
          z-index: -1;
          width: 100vw;
          @media (min-width: 1080px) {
            width: 1080px;
          }
          height: 400px;
          overflow: hidden;
          position: relative;
          display: flex;
        }
        .img_container {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }
        .char_container {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 100%;
          transition: top 0.3s ease, left 0.3s ease; /* 추가 */
        }
        .character {
          max-width: 400%;
          max-height: 400%;
        }
        .modify_btn {
          text-align: center;
          padding-bottom: 5px;
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
    </div>
  );
};

export default BlogHeader;
