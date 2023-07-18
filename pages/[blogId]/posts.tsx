import { GetStaticProps, GetStaticPaths } from "next";
import { useRouter } from "next/router";
import BlogLayout from "./BlogLayout";
import Link from "next/link";
import Date from "../../component/date";
import connectMongo from "../../utils/connectMongo";
import Post from "../../models/postModel";
import User from "../../models/userModel";
import { Document } from "mongoose";
import React, { useState, useEffect } from "react";

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

const Posts: React.FC<PostsProps> = ({ allPostsData }) => {
  const router = useRouter();
  const { blogId } = router.query;
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = allPostsData.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(allPostsData.length / postsPerPage);

  const goToPrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const goToNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const goToLastPage = () => {
    setCurrentPage(totalPages);
  };

  useEffect(() => {
    goToLastPage();
  }, []);

  return (
    <BlogLayout>
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
            <h2 className="title">POST</h2>
            <button
              className="next-button"
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
            >
              &gt;
            </button>
          </div>
          <Link href={`/${blogId}/postswrite`}>
            <div className={"write_btn"}>✎ write</div>
          </Link>
          <ul className="list">
            {currentPosts.map(({ postId, date, title }) => (
              <li className="listItem" key={postId}>
                <Link href={`/${blogId}/${postId}`}>
                  <div className={"title_text"}>{title}</div>
                </Link>
                <br />
                <br />
                <small className="date_text">
                  <Date dateString={date} />
                </small>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <style jsx>{`
        .container {
          width: 70%;
          display: flex;
          flex-direction: column;
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
          position: relative;
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
    </BlogLayout>
  );
};

export default Posts;

export const getStaticPaths: GetStaticPaths = async () => {
  await connectMongo();
  const users = await User.find({}, { email: 1 }).lean();
  const paths = users.map(({ email }) => ({ params: { blogId: email } }));
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { blogId } = context.params as { blogId: string };
  await connectMongo();
  const allPostsData = await Post.find({ blogId }).sort({ _id: -1 }).lean();
  const allPostsDataSerializable = allPostsData.map(({ _id, ...post }) => post);
  return {
    props: {
      allPostsData: allPostsDataSerializable,
    },
  };
};
