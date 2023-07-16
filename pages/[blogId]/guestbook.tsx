import React, { useState } from "react";
import BlogLayout from "./BlogLayout";
import GuestbookBalloon from "../../component/GuestbookBalloon";

interface GuestBookProps {}

const GuestBook: React.FC<GuestBookProps> = () => {
  const writerId = "user1";
  const [content, setContent] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [contents, setContents] = useState<string[]>([]);

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);
  };

  const handleInputSubmit = () => {
    if (content.trim() !== "") {
      setContents([...contents, content]);
      setContent("");
      setShowInput(false);
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

  return (
    <BlogLayout>
      <div className={"container"}>
        <div className={"guestbook_container"}>
          <h2 className={"title"}>GUESTBOOK</h2>
          {contents.map((item, index) => (
            <GuestbookBalloon
              key={index}
              writerId={writerId}
              content={item}
              onDelete={() => handleDelete(index)}
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
        `}</style>
      </div>
    </BlogLayout>
  );
};

export default GuestBook;
