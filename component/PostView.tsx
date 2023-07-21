import Image from "next/image";
import { useState } from "react";
// import PostModal from "./PostModal";

export default function PostView() {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleImageClick = () => {
    openModal();
  };
  return (
    <div className={"post_container"}>
      <div className={"icon-container"}></div>
      <div className={"img_container"} onClick={handleImageClick}>
        <Image
          src="/assets/sample_post_img.jpg"
          alt="User Image"
          layout="responsive"
          width={100}
          height={100}
        />
      </div>
      <div className={"title"}>title</div>
      <div className={"info"}>게시글 설명이에요</div>

      {/* <PostModal isOpen={modalOpen} onClose={closeModal}>
        <Image
          src="/assets/sample_post_img.jpg"
          alt="User Image"
          layout="responsive"
          width={100}
          height={100}
        />
      </PostModal> */}
      <style jsx>{`
        .post_container {
          border: 1px solid #ccc;
          border-radius: 5%;
          display: flex;
          flex-direction: column;
          place-items: center;
          width: 80%;
          background-color: white;
        }
        .icon-container {
          padding-top: 5%;
        }
        .img_container {
          width: 100%;
        }
        .title {
          padding-top: 30px;
        }
      `}</style>
    </div>
  );
}
