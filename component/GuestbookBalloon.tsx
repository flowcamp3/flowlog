// writerid가 블로그 쿼리와 일치 시 말풍선 방향 바꾸는 코드 추가해야 함
// 말풍선 옆에 user 아바타 놓는 코드 추가해야 함

import React from "react";

interface GuestbookBalloonProps {
  writerId: string;
  content: string;
  onDelete: () => void;
}

const GuestbookBalloon: React.FC<GuestbookBalloonProps> = ({
  writerId,
  content,
  onDelete,
}) => {
  return (
    <div className="balloon">
      <div className="content_container">
        <div className="content">{content}</div>
        <div className="writer">{writerId}</div>
        <button className="delete_button" onClick={onDelete}>
          X
        </button>
      </div>
      <style jsx>{`
        .content_container {
          padding: 50px 25px 25px 25px;
          display: inline-flex;
          flex-direction: column;
        }
        .content {
          display: inline-block;
          padding-bottom: 20px;
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
          bottom: 30px;
          left: -15px;
        }
        .delete_button {
          position: absolute;
          top: 10px;
          right: 10px;
          padding: 5px;
          background-color: transparent;
          border: none;
          color: var(--dark-green);
          font-size: 16px;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default GuestbookBalloon;
