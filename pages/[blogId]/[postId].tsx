import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import BlogLayout from "./BlogLayout";
import connectMongo from "../../utils/connectMongo";
import Post from "../../models/postModel";

interface PostProps {
  postId?: string;
}

const PostPage: React.FC<PostProps> = ({ postId }) => {
  return (
    <BlogLayout>
      <div>{postId}</div>
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

export const getStaticProps: GetStaticProps<PostProps> = async ({ params }) => {
  if (!params) {
    return {
      notFound: true,
    };
  }
  const { postId } = params;

  return {
    props: {
      postId: typeof postId === "string" ? postId : undefined,
    },
  };
};
