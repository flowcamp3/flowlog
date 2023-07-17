import React, { useState, useEffect } from "react";
import BlogLayout from "./BlogLayout";
import GuestbookBalloon from "../../component/GuestbookBalloon";
import axios from "axios";

interface GuestBookProps {}

const GuestBook: React.FC<GuestBookProps> = () => {
  const writerId = "user1";
  const [content, setContent] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [contents, setContents] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);
  };

  const handleInputSubmit = async () => {
    if (content.trim() !== "") {
      try {
        await axios.post("/api/guestbook", {
          blogId: "yourBlogId", // Replace with the actual blogId
          visitorId: writerId,
          content: content,
        });
        setContents([...contents, content]);
        setContent("");
        setShowInput(false);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleShowInput = () => {
    setShowInput(true);
  };

  const handleDelete = (index: number) => {
    setContents((prevContents) => {
      const updatedContents = [...prevContents];
      updatedContents.splice(index, 1);
      return updatedContents;
    });
  };

  useEffect(() => {
    fetchGuestbookData();
  }, []);

  const fetchGuestbookData = async () => {
    try {
      const response = await axios.get("/api/guestbook", {
        params: { blogId: "yourBlogId" }, // Replace with the actual blogId
      });
      const data = response.data;
      setContents(data.map((item: any) => item.content));

      // 맨 마지막 페이지로 설정
      const lastPage = Math.ceil(data.length / itemsPerPage);
      setCurrentPage(lastPage);
    } catch (error) {
      console.error(error);
    }
  };

  // 이전 페이지로 이동
  const goToPrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  // 다음 페이지로 이동
  const goToNextPage = () => {
    const maxPage = Math.ceil(contents.length / itemsPerPage);
    setCurrentPage((prevPage) => Math.min(prevPage + 1, maxPage));
  };

  // 현재 페이지에 해당하는 GuestbookBalloon 리스트 생성
  const currentItems = contents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <BlogLayout>
      <div className={"container"}>
        <div className={"guestbook_container"}>
          <div className={"upper_container"}>
            <button
              className="prev-button"
              onClick={goToPrevPage}
              disabled={currentPage === 1}
            >
              &lt;
            </button>
            <h2 className={"title"}>GUESTBOOK</h2>

            <button
              className="next-button"
              onClick={goToNextPage}
              disabled={
                currentPage === Math.ceil(contents.length / itemsPerPage)
              }
            >
              &gt;
            </button>
          </div>
          {currentItems.map((item, index) => (
            <GuestbookBalloon
              key={index}
              writerId={writerId}
              content={item}
              onDelete={() =>
                handleDelete(index + (currentPage - 1) * itemsPerPage)
              }
            />
          ))}
          <div className={"input_container"}>
            {showInput ? (
              <div className="input_wrapper">
                <button className={"send_button"} onClick={handleInputSubmit}>
                  SEND MESSAGE
                </button>
                <textarea
                  className={"input_textarea"}
                  placeholder={"Enter your message..."}
                  value={content}
                  onChange={handleInputChange}
                  maxLength={50}
                ></textarea>
              </div>
            ) : (
              <button className={"input_button"} onClick={handleShowInput}>
                INPUT
              </button>
            )}
          </div>
        </div>

        <style jsx>{`
          .container {
            width: 70%;
            display: flex;
          }
          .title {
            color: var(--light-text);
            text-align: center;
            font-size: 55px;
            margin-left: 15px;
            margin-right: 15px;
          }
          .upper_container {
            display: flex;
            justify-content: center;
            align-items: center;
          }
          .guestbook_container {
            position: relative;
            width: 100%;
            height: 1000px;
            background-image: url("/assets/sample_header.jpg");
            background-size: cover;
            background-position: center;
          }
          .input_container {
            display: flex;
            position: absolute;
            bottom: 40px;
            left: 40px;
            align-items: center;
            justify-content: flex-end;
            margin-top: 10px;
          }
          .input_button,
          .send_button {
            font-size: 17px;
            padding: 5px 10px;
            background-color: var(--light-text);
            border: none;
            border-radius: 4px;
            color: var(--dark-text);
            cursor: pointer;
          }
          .input_wrapper {
            display: flex;
            align-items: center;
          }
          .input_textarea {
            opacity: 0.8;
            border: none;
            resize: none;
            width: 300px;
            height: 80px;
            padding: 5px;
          }
          .prev-button,
          .next-button {
            margin: 0 5px;
            font-size: 40px;
            padding: 5px 10px;
            color: var(--light-text);
            border: none;
            border-radius: 4px;
            cursor: pointer;
            background-color: transparent;
          }
          .prev-button:disabled,
          .next-button:disabled {
            opacity: 0.5;
            cursor: not-allowed;
          }
        `}</style>
      </div>
    </BlogLayout>
  );
};

export default GuestBook;
