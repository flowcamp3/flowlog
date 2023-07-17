import { GetStaticProps, GetStaticPaths } from "next";
import { useRouter } from "next/router";
import BlogLayout from "./BlogLayout";
import utilStyles from "../../styles/Home.module.css";
import { getSortedPostsData } from "../../lib/posts";

interface Post {
  id: string;
  title: string;
  date: string;
}

interface PostsProps {
  allPostsData: Post[];
}

const Posts: React.FC<PostsProps> = ({ allPostsData }) => {
  const router = useRouter();
  return (
    <BlogLayout>
      <div className={"container"}>
        <h3>포스트 목록입니다</h3>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              {title}
              <br />
              {id}
              <br />
              {date}
            </li>
          ))}
        </ul>

        <style jsx>{`
          .container {
            border: 1px solid #ccc;
            width: 70%;
            display: flex;
            flex-direction: column;
            place-items: center;/
          }
        `}</style>
      </div>
    </BlogLayout>
  );
};

export default Posts;

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = [
    {
      params: {
        blogId: "koh2040@naver.com",
      },
    },
    {
      params: {
        blogId: "iineaya@naver.com",
      },
    },
  ];

  return {
    paths,
    fallback: false,
  };
};

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}
