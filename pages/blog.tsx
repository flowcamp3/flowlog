import BlogTabBar from "../component/BlogTabBar";
import { useRouter } from "next/router";
import Posts from "./blog/posts";
import Profile from "./blog/profile";

export default function Blog() {
  const router = useRouter();
  let content;
  if (router.pathname === "/blog") {
    content = null;
  } else if (router.pathname === "/blog/profile") {
    content = <Profile />;
  } else if (router.pathname === "/blog/posts") {
    content = <Posts />;
  }

  return (
    <div>
      <h1>내 블로그</h1>
      <BlogTabBar />
      <div>{content && <div>{content}</div>}</div>
    </div>
  );
}
