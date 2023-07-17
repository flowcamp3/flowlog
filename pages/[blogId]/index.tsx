import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import { ReactElement } from "react";
import Posts from "./posts";
import GuestBook from "./guestbook";
import BlogLayout from "./BlogLayout";

interface BlogProps {
  blogId: string;
  content: ReactElement | null;
}

const Blog: React.FC<BlogProps> = ({ blogId, content }) => {
  return (
    <BlogLayout>
      <div>{blogId}</div>
      <div>{content && <div>{content}</div>}</div>
    </BlogLayout>
  );
};

export default Blog;

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = [
    {
      params: {
        blogId: "koh2040@naver.com",
        page: "index",
      },
    },
    {
      params: {
        blogId: "iineaya@naver.com",
        page: "index",
      },
    },
  ];

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<BlogProps> = async ({ params }) => {
  if (!params) {
    return {
      notFound: true,
    };
  }

  const { blogId, page } = params;

  let content: ReactElement | null;

  if (page === "guestbook") {
    content = <GuestBook />;
  } else if (page === "posts") {
    content = <Posts allPostsData={[]} />;
  } else {
    content = null;
  }

  return {
    props: {
      blogId: blogId as string,
      content,
    },
  };
};
