import Image from "next/image";

export default function UserProfile() {
  return (
    <div className={"container"}>
      <div className="contents">
        <div style={{ width: "80%", border: "1px solid #ccc" }}>
          <Image
            src="/assets/user_img.png"
            alt="User Image"
            layout="responsive"
            width={100}
            height={100}
          />
        </div>
        <div className={"user_nickname"}>UserNickname</div>
        <div className={"user_info"}>UserInfo</div>
      </div>

      <style jsx>{`
        .container {
          width: 30%;
          border: 1px solid #ccc;
        }
        .contents {
          padding-top: 100px;
          width: 100%;
          display: flex;
          flex-direction: column;
          place-items: center;
        }
        .user_nickname {
          padding-top: 30px;
          font-size: 25px;
          font-weight: 400;
        }
        .user_info {
          padding-top: 20px;
        }
      `}</style>
    </div>
  );
}
