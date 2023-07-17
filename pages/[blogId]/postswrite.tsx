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
    const res = await fetch("/api/posts/write", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ blogId: session.user.email, title, content }),
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
        <div className="container2">
          <h1>포스트를 작성해주세요</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                placeholder="제목을 입력해주세요"
              />
            </div>
            <div className="form-group">
              <label htmlFor="content">Content</label>
              <textarea
                id="content"
                value={content}
                onChange={(event) => setContent(event.target.value)}
                placeholder="내용을 입력해주세요"
              />
            </div>
            <button type="submit">작성하기</button>
          </form>
        </div>
      </div>

      <style jsx>{`
        form {
          display: block;
        }
        .container {
          border: 1px solid #ccc;
          display: flex;
          flex-direction: column;
          width: 70%;
          margin: 0 auto;
        }
        .container2 {
          display: flex;
          flex-direction: column;
          width: 95%;
          margin: 0 auto;
        }
        .form-group {
          display: flex;
          flex-direction: column;
          margin-bottom: 16px;
        }
        label {
          font-size: 18px;
          margin-bottom: 8px;
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
        }
        textarea {
          height: 600px;
        }
        button {
          font-size: 16px;
          padding: 8px 16px;
          margin-bottom: 12px;
          background-color: #c1ece4;
          color: black;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }
      `}</style>
    </BlogLayout>
  );
};

export default WritePost;
