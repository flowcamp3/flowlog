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
        <div className="background_container">
          <div className="container2">
            <div className="title">{post.title}</div>
            <div className="date">{post.date}</div>
            <div className="content">{post.content}</div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .container {
          border: 1px solid #ccc;
          display: flex;
          flex-direction: column;
          width: 70%;
          margin: 0 auto;
        }
        .background_container {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 1000px;
          background-image: url("/assets/sample_header.jpg");
          background-size: cover;
          background-position: center;
        }
        .container2 {
          border: 1px solid #ccc;
          border-radius: 33px;
          background-color: rgba(255, 255, 255, 0.1);
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          width: 80%;
          height: 80%;
          box-shadow: -8px -8px 10px rgba(255, 255, 255, 0.2),
            8px -8px 10px rgba(255, 255, 255, 0.2),
            -8px 8px 10px rgba(255, 255, 255, 0.2),
            8px 8px 10px rgba(255, 255, 255, 0.2);
        }
        .title {
          font-size: 30px;
          margin-bottom: 20px;
          color: white;
        }
        .date {
          margin: 10px;
          font-size: 20px;
          text-align: right;
          color: var(--light-text);
        }
        .content {
          height: 60%;
          color: white;
          margin-top: 80px;
          font-size: 20px;
          text-align: center; /* Added to center the content */
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
