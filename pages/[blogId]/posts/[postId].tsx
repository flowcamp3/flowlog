import { useRouter } from "next/router";
import BlogLayout from "../BlogLayout";
import PostView from "../../../component/PostView";

export default function Posts() {
  const router = useRouter();
  const { postId } = router.query;

  return (
    <BlogLayout>
      <div className={"container"}>
        <p>Post: {postId}</p>
        <h3>포스트 표시ss</h3>
        <PostView />

        <style jsx>{`
            .container{
              border: 1px solid #ccc;
              width: 70%;
              display: flex;
              flex-direction: column;
              place-items: center;/
            }
          `}</style>
      </div>
    </BlogLayout>
  );
}
