import { useRouter } from "next/router";
import Posts from "./posts/index";
import GuestBook from "./guestbook";
import BlogLayout from "./BlogLayout";

export default function Blog() {
  const router = useRouter();
  const { blogId } = router.query;
  let content;

  if (router.pathname === "/[blogId]/guestbook") {
    content = <GuestBook />;
  } else if (router.pathname === "/[blogId]/posts") {
    content = <Posts />;
  } else if (router.pathname === "/[blogId]") {
    content = null;
  }

  return (
    <BlogLayout>
      <div>
        {blogId}
      </div>
      <div>{content && <div>{content}</div>}</div>
    </BlogLayout>
  );
}
