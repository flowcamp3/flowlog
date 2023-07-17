import Image from "next/image";

export default function UserProfile() {
  return (
    <div className={"container"}>
      <div className="contents">
        <div className={"user_img"}>
          <Image
            src="/assets/user_img.png"
            alt="User Image"
            layout="responsive"
            width={100}
            height={100}
          />
        </div>
        <div className={"lower_container"}>
          <div className={"user_nickname"}>UserNickname</div>
          <div className={"user_info"}>UserInfo</div>
        </div>
      </div>

      <style jsx>{`
        .container {
          width: 30%;
          background-color: var(--light-text);
          background-image: radial-gradient(
            circle at 40% 40%,
            var(--light-green) 0%,
            var(--light-green) 20%,
            transparent 20%,
            transparent 100%
          );
          background-size: 20px 20px;
          
          );
        }
        .user_img {
          width: 60%;
          border: 5px solid var(--dark-green);
          box-shadow: 10px 10px var(--dark-green);
        }
        .contents {
          padding-top: 100px;
          width: 100%;
          display: flex;
          flex-direction: column;
          place-items: center;
        }

        .lower_container{
          margin-top: 40px;
          width: 70%;
          height: 400px;
          background-color: white;
          border: 5px solid var(--dark-green);
          box-shadow: 10px 10px var(--dark-green);
          display: flex;
          flex-direction: column;
          place-items: center;

        }
        .user_nickname {
          margin-top: 15px;
          margin-bottom: 5px;
          color: var(--dark-green);
          font-size: 25px;
          font-weight: 400;
          text-decoration: underline;
          text-decoration-style: dotted;
          text-decoration-skip-ink: none;
        }
        .user_info {
          padding-top: 20px;
          color: var(--dark-green);
        }
      `}</style>
    </div>
  );
}
