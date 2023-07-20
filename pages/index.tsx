import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Date from "../component/date";

interface Post {
  blogId: string;
  postId: string;
  title: string;
  date: string;
  content: string;
}

interface PostDocument extends Post, Document {}
interface PostSerializable extends Omit<PostDocument, "_id"> {}
interface PostsProps {
  allPostsData: PostSerializable[];
}

export default function MainPage() {
  const router = useRouter();
  const { blogId } = router.query;
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;

  const [allPostsData, setAllPostsData] = useState<PostSerializable[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch(`/api/allposts`);
      const data = await res.json();
      setAllPostsData(data);
    };

    fetchPosts();
  }, [blogId]);

  const currentPosts = allPostsData.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(allPostsData.length / postsPerPage);
  const { data: session } = useSession();

  const goToPrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const goToNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, []);

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div className="container">
        <div className="post_container">
          <div className="upper_container">
            <button
              className="prev-button"
              onClick={goToPrevPage}
              disabled={currentPage === 1}
            >
              &lt;
            </button>
            <h2 className="title">NEWS</h2>
            <button
              className="next-button"
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
            >
              &gt;
            </button>
          </div>
          <ul className="list">
            {currentPosts.map(({ postId, date, title, blogId }) => (
              <Link href={`/${blogId}/${postId}`} key={postId}>
                <li className="listItem">
                  <div className={"title_text"}>{title}</div>
                  <br />
                  <br />
                  {blogId}
                  <small className="date_text">
                    <Date dateString={date} />
                  </small>
                </li>
              </Link>
            ))}
          </ul>
        </div>
      </div>
      <style jsx>{`
        .container {
          width: 100vw;
          @media (min-width: 1080px) {
            width: 1080px;
          }
          display: flex;
          flex-direction: column;
          // z-index: -1;
        }
        .title {
          color: var(--light-text);
          text-align: center;
          font-size: 55px;
          margin-left: 15px;
          margin-right: 15px;
        }
        .upper_container {
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .prev-button,
        .next-button {
          margin: 0 5px;
          font-size: 40px;
          padding: 5px 10px;
          color: var(--light-text);
          border: none;
          border-radius: 4px;
          cursor: pointer;
          background-color: transparent;
          transition: transform 0.3s ease;
        }

        .prev-button:disabled,
        .next-button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        .prev-button:hover,
        .next-button:hover,
        .write_btn:hover {
          color: white;
          transform: scale(1.1);
          text-shadow: -1px -1px 10px rgba(255, 255, 255, 0.5),
            1px -1px 10px rgba(255, 255, 255, 0.5),
            -1px 1px 10px rgba(255, 255, 255, 0.5),
            1px 1px 10px rgba(255, 255, 255, 0.5);
        }
        .write_btn {
          color: var(--light-text);
          text-align: center;
          font-size: 20px;
          transition: transform 0.3s ease;
        }
        .post_container {
          position: static;
          width: 100%;
          height: 1000px;
          background-image: url("/assets/sample_header.jpg");
          background-size: cover;
          background-position: center;
        }
        .list {
          list-style: none;
          padding: 10px;
          margin: 0;
        }
        .listItem {
          border: 1px solid #ccc;
          margin: 5% 10%;
          font-size: large;
          border-radius: 10px;
          padding: 25px;
          transition: background-color 0.3s;
        }
        .listItem:hover {
          background-color: rgba(255, 255, 255, 0.7);
          box-shadow: -1px -1px 10px rgba(255, 255, 255, 0.2),
            1px -1px 10px rgba(255, 255, 255, 0.2),
            -1px 1px 10px rgba(255, 255, 255, 0.2),
            1px 1px 10px rgba(255, 255, 255, 0.2);
          .title_text {
            color: var(--dark-text);
          }
        }
        .title_text {
          font-size: 20px;
          color: var(--light-text);
        }
        .date_text {
          color: #666;
        }
      `}</style>
    </div>
  );
}
