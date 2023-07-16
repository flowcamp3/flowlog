import { useRouter } from 'next/router'
import BlogLayout from "../BlogLayout";
import PostView from "../../../component/PostView";

export default function Posts() {
  const router = useRouter()

  return (
    <BlogLayout>
      <div className={"container"}>
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
