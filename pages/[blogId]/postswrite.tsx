import { FormEvent, useState } from "react";
import { useRouter } from "next/router";
import BlogLayout from "./BlogLayout";
import { useSession } from "next-auth/react";

const WritePost = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const { blogId } = router.query;
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!session) {
      alert("Please sign in first");
      return;
    }

    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
    const date = currentDate.getDate().toString().padStart(2, "0");

    const res = await fetch("/api/posts/write", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        blogId: session.user.email,
        title,
        content,
        date: `${year}-${month}-${date}`,
      }),
    });
    if (res.status === 200) {
      window.location.href = "http://localhost:3000/" + blogId + "/posts";
    } else {
      alert("작성에 실패했습니다");
    }
  };

  return (
    <BlogLayout>
      <div className="container">
        <div className="background_container">
          <div className="container2">
            <form onSubmit={handleSubmit}>
              <div className="form_group">
                <label htmlFor="title">Title</label>
                <input
                  id="title"
                  type="text"
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  placeholder="제목을 입력해주세요"
                  className={"text_box"}
                />
              </div>
              <div className="form_group">
                <label htmlFor="content">Content</label>
                <textarea
                  id="content"
                  value={content}
                  onChange={(event) => setContent(event.target.value)}
                  placeholder="내용을 입력해주세요"
                  className={"text_box"}
                />
              </div>
              <button type="submit">작성하기</button>
            </form>
          </div>
        </div>
      </div>

      <style jsx>{`
        form {
          margin-top: 40px;
          margin-bottom: 40px;

          display: flex;
          flex-direction: column;

          width: 80%;
        }
        .container {
          display: flex;
          flex-direction: column;
          width: 70%;
          margin: 0 auto;
        }
        .text_box {
          background-color: transparent;
          outline-style: solid;
          outline: white;
          color: white;
        }
        .background_container {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 1000px;
          background-image: url("/assets/sample_header.jpg");
          background-size: cover;
          background-position: center;
        }
        .container2 {
          border: 1px solid #ccc;
          border-radius: 33px;
          background-color: rgba(255, 255, 255, 0.3);

          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;

          width: 80%;
          height: 80%;

          box-shadow: -8px -8px 10px rgba(255, 255, 255, 0.2),
            8px -8px 10px rgba(255, 255, 255, 0.2),
            -8px 8px 10px rgba(255, 255, 255, 0.2),
            8px 8px 10px rgba(255, 255, 255, 0.2);
        }
        .form_group {
          display: flex;
          flex-direction: column;
          margin-bottom: 16px;
        }
        label {
          color: var(--light-text);
          font-size: 20px;
          margin-bottom: 8px;
          text-align: center;
        }
        input,
        textarea {
          font-family: stardust, DungG;
          font-size: 16px;
          padding: 8px;
          border: 1px solid #ccc;
          border-radius: 4px;
        }
        ::placeholder {
          font-family: stardust, DungG;
          font-size: 16px;
          color: white;
          opacity: 0.5;
        }
        textarea {
          height: 400px;
          margin-bottom: 70px;
        }
        button {
          font-size: 16px;
          padding: 8px 16px;
          margin-bottom: 12px;
          background-color: transparent;
          color: white;
          border: 1px solid white;
          border-radius: 4px;
          cursor: pointer;
        }
        button:hover {
          background-color: white;
          color: var(--dark-text);
          box-shadow: -1px -1px 10px rgba(255, 255, 255, 0.5),
            1px -1px 10px rgba(255, 255, 255, 0.5),
            -1px 1px 10px rgba(255, 255, 255, 0.5),
            1px 1px 10px rgba(255, 255, 255, 0.5);
        }
      `}</style>
    </BlogLayout>
  );
};

export default WritePost;
