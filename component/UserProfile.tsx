import React, { useState, useEffect } from "react";
import Image from "next/image";
import EditProfileModal from "./EditProfileModal";
import { useSession } from "next-auth/react";
import axios from "axios";
import { useRouter } from "next/router";

interface UserProfileProps {}

const UserProfile: React.FC<UserProfileProps> = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userInfo, setUserInfo] = useState("UserInfo");
  const [user_info, setUser_info] = useState("");
  const { data: session } = useSession();
  const router = useRouter();
  const username = router.query.blogId as string;
  const [isFollowing, setIsFollowing] = useState(false);

  const handleFollowButtonClick = () => {
    setIsFollowing(!isFollowing);
  };

  const uploadPhoto = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]!;
    const filename = encodeURIComponent(file.name);
    const fileType = encodeURIComponent(file.type);

    const res = await fetch(
      `/api/upload-url?file=${username}&fileType=${fileType}`
    );
    const { url, fields } = await res.json();
    const formData = new FormData();

    Object.entries({ ...fields, file }).forEach(([key, value]) => {
      formData.append(key, value as string);
    });

    const upload = await fetch(url, {
      method: "POST",
      body: formData,
    });

    if (upload.ok) {
      console.log("Uploaded successfully!");
    } else {
      console.error("Upload failed.");
    }
  };

  const handleEditButtonClick = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleUserInfoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserInfo(event.target.value);
  };

  const handleSaveButtonClick = () => {
    setIsModalOpen(false); // Close the modal
    updateUserInfo();
    window.location.reload();
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

  async function checkIsFollow(
    sessionEmail: string,
    username: string
  ): Promise<boolean> {
    const res: Response = await fetch(
      `/api/isfollow?sessionEmail=${sessionEmail}&username=${username}`
    );
    const data: boolean = await res.json();
    return data;
  }  

  useEffect(() => {
    if (username) {
      fetchUserInfo();
    }
  }, [username]);

  useEffect(() => {
    async function checkFollowingStatus() {
      if (session && username !== session.user.email) {
        const isFollow = await checkIsFollow(session.user.email, username);
        setIsFollowing(isFollow);
      }
    }
    checkFollowingStatus();
  }, [session, username]);

  return (
    <div className={"container"}>
      <div className="contents">
        <div className={"user_img"}>
          <img
            src={`https://${process.env.NEXT_PUBLIC_BUCKET_NAME}.s3.${
              process.env.NEXT_PUBLIC_AWS_REGION
            }.amazonaws.com/${encodeURIComponent(username)}`}
            alt="User Image"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.onerror = null;
              target.src = "/assets/user_img.png";
            }}
          />
        </div>
        <div className="lower_container">
          {session && (
            <>
              {username === session.user.email ? (
                <button className="edit_button" onClick={handleEditButtonClick}>
                  edit
                </button>
              ) : (
                <button
                  className="follow_button"
                  onClick={handleFollowButtonClick}
                  style={{
                    backgroundColor: isFollowing
                      ? "var(--dark-green)"
                      : "transparent",
                    color: isFollowing ? "white" : "var(--dark-green)",
                  }}
                >
                  {isFollowing ? "following" : "follow"}
                </button>
              )}
            </>
          )}
          <div className="user_nickname">{username}</div>
          <div className="user_info">{userInfo}</div>
        </div>
      </div>

      {isModalOpen && (
        <EditProfileModal isOpen={isModalOpen} onClose={handleEditButtonClick}>
          <div className="modal_content">
            <div className="image_section">
              <img
                src={`https://${process.env.NEXT_PUBLIC_BUCKET_NAME}.s3.${
                  process.env.NEXT_PUBLIC_AWS_REGION
                }.amazonaws.com/${encodeURIComponent(username)}`}
                alt="User Image"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.onerror = null;
                  target.src = "/assets/user_img.png";
                }}
              />
              <input
                onChange={uploadPhoto}
                type="file"
                accept="image/png, image/jpeg"
              />
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
          font-size: 20px;
          display: flex;
          flex-direction: column;
          place-items: center;
        }
        .edit_button {
          font-size: 20px;
          border: 2px solid var(--dark-green);
          color: var(--dark-green);
          margin: 10px;
          width: 120px;
          border-radius: 20px;
        }
        .follow_button {
          font-size: 20px;
          border: 2px solid var(--dark-green);
          color: var(--dark-green);
          margin: 10px;
          width: 120px;
          border-radius: 20px;
        }
        .user_nickname {
          margin-top: 15px;
          margin-bottom: 5px;
          color: var(--dark-green);
          font-size: 20px;
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
