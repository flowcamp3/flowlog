import React, { useState, useEffect } from "react";
import Image from "next/image";
import EditProfileModal from "./EditProfileModal";
import { useSession } from "next-auth/react";
import axios from "axios";

interface UserProfileProps {}

const UserProfile: React.FC<UserProfileProps> = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userInfo, setUserInfo] = useState("UserInfo");
  const [user_info, setUser_info] = useState("");

  const { data: session } = useSession();
  const username = session?.user.email;

  const handleEditButtonClick = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleUserInfoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserInfo(event.target.value);
  };

  const handleSaveButtonClick = () => {
    setIsModalOpen(false); // Close the modal
    updateUserInfo();
  };

  const updateUserInfo = async () => {
    try {
      const response = await axios.post("/api/userprofile", {
        email: username,
        userInfo: userInfo,
      });
      const updatedUser = response.data.user;
      if (updatedUser) {
        // Handle successful update
        setUserInfo(updatedUser.userInfo);
      }
    } catch (error) {
      // Handle error
    }
  };
  const fetchUserInfo = async () => {
    try {
      const response = await axios.get(`/api/userprofile`, {
        params: { email: username },
      });
      const user = response.data.user;
      if (user) {
        setUserInfo(user.userInfo);
        setUser_info(user.userInfo);
      }
    } catch (error) {
      // Handle error
    }
  };

  useEffect(() => {
    if (username) {
      fetchUserInfo();
    }
  }, [username]);

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
          <button className={"edit_button"} onClick={handleEditButtonClick}>
            edit
          </button>
          <div className={"user_nickname"}>{username}</div>
          <div className={"user_info"}>{userInfo}</div>
        </div>
      </div>

      {isModalOpen && (
        <EditProfileModal isOpen={isModalOpen} onClose={handleEditButtonClick}>
          <div className="modal_content">
            <div className="image_section">
              <Image
                src="/assets/user_img.png"
                alt="User Image"
                width={200}
                height={200}
              />
              <button className="add_image_button">Add Image</button>
            </div>
            <div className="info_section">
              <input
                type="text"
                value={userInfo}
                onChange={handleUserInfoChange}
              />
            </div>
            <button onClick={handleSaveButtonClick}>Save</button>
          </div>
        </EditProfileModal>
      )}

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

        .lower_container {
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
        .edit_button {
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

        /* EditProfileModal styles */
        .modal_content {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }
        .image_section {
          margin-bottom: 20px;
        }
        .add_image_button {
          font-size: 16px;
          padding: 5px 10px;
          background-color: var(--light-text);
          border: none;
          border-radius: 4px;
          color: var(--dark-text);
          cursor: pointer;
          margin-top: 10px;
        }
        .info_section input {
          width: 200px;
          height: 30px;
          padding: 5px;
        }
      `}</style>
    </div>
  );
};

export default UserProfile;
