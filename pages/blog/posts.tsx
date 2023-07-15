import BlogLayout from "./BlogLayout";
import PostView from "../../component/PostView";

export default function Posts() {
  return (
    <BlogLayout>
      <div className={"container"}>
        <h3>포스트 표시</h3>
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
