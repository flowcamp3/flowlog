import React, { useState, useEffect } from "react";
import BlogLayout from "./BlogLayout";
import GuestbookBalloon from "../../component/GuestbookBalloon";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

interface GuestBookProps {}

const GuestBook: React.FC<GuestBookProps> = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const { blogId } = router.query;

  const writerId = session?.user.email ?? "";
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
          blogId: blogId,
          visitorId: session?.user.email,
          content: content,
        });
        setContents([...contents, { visitorId: session?.user.email, content }]); // Update contents array with object
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

  const handleDelete = async (id: string) => {
    // Update handleDelete to accept id parameter
    try {
      await axios.delete(`/api/guestbook?id=${id}`); // Pass id as a query parameter
      setContents(
        (prevContents) => prevContents.filter((item) => item._id !== id) // Filter out the item with matching id
      );
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchGuestbookData();
  }, []);

  const fetchGuestbookData = async () => {
    try {
      const response = await axios.get("/api/guestbook", {
        params: { blogId: blogId },
      });
      const data = response.data;
      setContents(data);

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
              writerId={item.visitorId}
              content={item.content}
              onDelete={() => handleDelete(item._id)}
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
            background-image: url("/assets/sample_header3.jpg");
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
            transition: transform 0.3s ease;
          }
          .prev-button:disabled,
          .next-button:disabled {
            opacity: 0.5;
            cursor: not-allowed;
          }
          .prev-button:hover,
          .next-button:hover {
            color: white;
            transform: scale(1.1);
            text-shadow: -1px -1px 10px rgba(255, 255, 255, 0.5),
              1px -1px 10px rgba(255, 255, 255, 0.5),
              -1px 1px 10px rgba(255, 255, 255, 0.5),
              1px 1px 10px rgba(255, 255, 255, 0.5);
          }
        `}</style>
      </div>
    </BlogLayout>
  );
};

export default GuestBook;
