import { GetStaticProps, GetStaticPaths } from "next";
import { useRouter } from "next/router";
import BlogLayout from "./BlogLayout";
import Link from "next/link";
import Date from "../../component/date";
import connectMongo from "../../utils/connectMongo";
import Post from "../../models/postModel";
import User from "../../models/userModel";
import { Document } from "mongoose";
import React, { useState } from "react";

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

  return (
    <BlogLayout>
      <div className={"container"}>
        <div className={"post_container"}>
          {/* <h3>포스트 목록입니다</h3> */}
          <ul className={"list"}>
            {allPostsData.map(({ postId, date, title }) => (
              <li className={"listItem"} key={postId}>
                <Link href={`/${blogId}/${postId}`}>{title}</Link>
                <br />
                <br />
                <small className={"lightText"}>
                  <Date dateString={date} />
                </small>
              </li>
            ))}
          </ul>
        </div>
        <style jsx>{`
          .container {
            width: 70%;
            display: flex;
            flex-direction: column;
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
            margin: 0 0 1.25rem;
            font-size: large;
            border-radius: 10px;
            padding: 10px;
            transition: background-color 0.3s;
          }
          .listItem:hover {
            background-color: rgba(255, 255, 255, 0.7);
            color: var(--dark-text);
          }
          .lightText {
            color: #666;
          }
        `}</style>
      </div>
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
