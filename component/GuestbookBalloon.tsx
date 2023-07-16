import React from "react";

interface GuestbookBalloonProps {
  writerId: string;
  content: string;
}

// writerid가 블로그 쿼리와 일치 시 말풍선 방향 바꾸는 코드 추가해야 함
// 말풍선 옆에 user 아바타 놓는 코드 추가해야 함

export default function GuestbookBalloon({
  writerId,
  content,
}: GuestbookBalloonProps) {
  return (
    <div>
      <div className={"balloon"}>
        <div className={"content_container"}>
          <div className={"content"}>{content}</div>
          <div className={"writer"}>{writerId}</div>
        </div>
      </div>
      <style jsx>{`
        .content_container {
          padding: 25px;
          display: inline-flex;
          flex-direction: column;
        }
        .content {
          display: inline-block;
          padding-bottom: 25px;
        }
        .writer {
          color: var(--dark-green);
          display: inline-block;
        }
        .balloon {
          position: relative;
          display: inline-flex;

          margin: 50px;
          background: var(--light-text);
          border-radius: 10px;
          opacity: 0.9;
        }
        .balloon::after {
          border-top: 15px solid var(--light-text);
          border-left: 15px solid transparent;
          border-right: 0px solid transparent;
          border-bottom: 0px solid transparent;
          content: "";
          position: absolute;
          top: 10px;
          left: -15px;
        }
      `}</style>
    </div>
  );
}
