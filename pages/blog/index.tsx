import BlogTabBar from "../../component/BlogTabBar";
import { useRouter } from "next/router";
import Posts from "./posts";
import Profile from "./profile";

export default function Blog() {
  const router = useRouter();
  let content;

  if (router.pathname === "/blog/profile") {
    content = <Profile />;
  } else if (router.pathname === "/blog/posts") {
    content = <Posts />;
  } else if (router.pathname === "/blog") {
    content = null;
  }

  return (
    <div>
      <h1>내 블로그</h1>
      <BlogTabBar />
      <div>{content && <div>{content}</div>}</div>
    </div>
  );
}
