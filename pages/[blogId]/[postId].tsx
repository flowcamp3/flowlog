import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import BlogLayout from "./BlogLayout";
import connectMongo from "../../utils/connectMongo";
import Post from "../../models/postModel";
import { ParsedUrlQuery } from "querystring";

interface PostProps {
  post: any;
}

const PostPage: React.FC<PostProps> = ({ post }) => {
  return (
    <BlogLayout>
      <div className="container">
        <div className="container2">
          <div className="title">{post.title}</div>
          <div className="date">{post.date}</div>
          <div className="content">{post.content}</div>
        </div>
      </div>
      <style jsx>{`
        form {
          display: block;
        }
        .container {
          border: 1px solid #ccc;
          display: flex;
          flex-direction: column;
          width: 70%;
          margin: 0 auto;
        }
        .container2 {
          border: 1px solid #ccc;
          border-radius: 10px;
          // padding: 10px;
          margin: 10px;
        }
        .title {
          font-size: 40px;
          margin: 10px;
          margin-bottom: 20px;
        }
        .date {
          margin: 10px;
          font-size: 20px;
          text-align: right;
        }
        .content {
          margin: 10px;
          font-size: 20px;
        }
      `}</style>
    </BlogLayout>
  );
};

export default PostPage;

export const getStaticPaths: GetStaticPaths = async () => {
  await connectMongo();
  const posts = await Post.find({}, { blogId: 1, postId: 1 }).lean();
  const paths = posts.map(({ blogId, postId }) => ({
    params: { blogId, postId },
  }));
  return {
    paths,
    fallback: false,
  };
};

interface Params extends ParsedUrlQuery {
  blogId: string;
  postId: string;
}

export const getStaticProps: GetStaticProps<{}, Params> = async (context) => {
  if (!context.params) {
    return { notFound: true };
  }

  const { blogId, postId } = context.params;
  await connectMongo();
  const post = await Post.findOne({ blogId, postId }).lean();

  return {
    props: {
      post: JSON.parse(JSON.stringify(post)),
    },
  };
};
