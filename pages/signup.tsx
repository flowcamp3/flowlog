import { useState, ChangeEvent, FormEvent } from "react";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();
  const [blogId, setBlogId] = useState<string>("");
  const [blogName, setBlogName] = useState<string>("");

  const handleBlogIdChange = (e: ChangeEvent<HTMLInputElement>) => {
    setBlogId(e.target.value);
  };

  const handleBlogNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setBlogName(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!session) {
      alert("Please sign in first");
      return;
    }
    const res = await fetch("/api/auth/sign", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: session.user.email, blogId, blogName }),
    });
    if (res.status === 200) {
      window.location.href = "http://localhost:3000";
    } else {
      alert("Sign up failed");
    }
  };

  return (
    <div>
      <h1>회원가입 해주세요</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Blog ID:
          <input type="text" value={blogId} onChange={handleBlogIdChange} />
        </label>
        <br />
        <label>
          Blog Name:
          <input type="text" value={blogName} onChange={handleBlogNameChange} />
        </label>
        <br />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}
