// pages/api/auth/sign.js
import connectMongo from "../../../utils/connectMongo";
import Post from "../../../models/postModel";

/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */

export default async function writehandler(req, res) {
  if (req.method === "POST") {
    try {
      await connectMongo();
      const latestPost = await Post.find({ blogId: req.body.blogId })
        .sort({ _id: -1 })
        .limit(1);
      if (latestPost.length > 0) {
        const latestPostId = latestPost[0].postId;
        req.body.postId = (parseInt(latestPostId) + 1).toString();
      } else {
        req.body.postId = 1;
      }

      const post = await Post.create(req.body);
      res.status(200).json({ post });
    } catch (error) {
      console.log(error);
      res.json({ error });
    }
  } else {
    res.status(405).end();
  }
}
