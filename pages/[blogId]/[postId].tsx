import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import BlogLayout from './BlogLayout';

interface PostProps {
  postId?: string;
}

const PostPage : React.FC<PostProps> = ({ postId }) => {

  return (
    <BlogLayout>
      <div>{postId}</div>
    </BlogLayout>
  );
};

export default PostPage;

export const getStaticPaths : GetStaticPaths = async () => {

  const paths = [
    {params : {blogId : 'koh2040@naver.com', postId : '1'}},
    {params : {blogId : 'koh2040@naver.com', postId : '2'}},
    {params : {blogId : 'koh2040@naver.com', postId : '3'}},
    {params : {blogId : 'koh2040@naver.com', postId : '4'}},
    {params : {blogId : 'koh2040@naver.com', postId : '5'}},
    {params : {blogId : 'koh2040@naver.com', postId : '6'}},
    
    {params : {blogId : 'iineaya@naver.com', postId : '1'}},
    {params : {blogId : 'iineaya@naver.com', postId : '2'}},
    {params : {blogId : 'iineaya@naver.com', postId : '3'}},
    {params : {blogId : 'iineaya@naver.com', postId : '4'}},
    {params : {blogId : 'iineaya@naver.com', postId : '5'}}
    
  ];

  return{
     paths,
     fallback:false
   }
}

export const getStaticProps:GetStaticProps<PostProps> = async ({params}) => {

   if(!params){
     return{
       notFound:true
     }
   }

   const{postId} = params;

   return{
     props:{
       postId: typeof postId === "string" ? postId: undefined
     }
   }
}
