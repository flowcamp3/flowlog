// pages/api/auth/sign.js
import connectMongo from "../../utils/connectMongo";
import Post from "../../models/postModel";

/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */

export default async function handler(req, res) {
    if (req.method === "GET") {
      try {
        await connectMongo();
        const posts = await Post.find({}, { _id: 0 }).sort({ _id: -1 }).lean();
        res.status(200).json(posts);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    } else {
      // 다른 메소드의 요청 처리
      res.status(405).end();
    }
  }