import BlogLayout from "./BlogLayout";
import GuestbookBalloon from "../../component/GuestbookBalloon";

export default function GuestBook() {
  // 나중에 동적 처리를 위해 state 지정하거나 API 호출 해야 함
  const writerId = "user1";
  const content = "오랜만이다~ 밥 한번 먹자";
  return (
    <BlogLayout>
      <div className={"container"}>
        <div className={"guestbook_container"}>
          <h2 className={"title"}>GUESTBOOK</h2>
          <GuestbookBalloon writerId={writerId} content={content} />
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
            width: 100%;
            height: 1000px;
            background-image: url("/assets/sample_header.jpg");
            background-size: cover;
            background-position: center;
          }
        `}</style>
      </div>
    </BlogLayout>
  );
}
