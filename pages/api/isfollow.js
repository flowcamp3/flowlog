// pages/api/auth/sign.js
import connectMongo from "../../utils/connectMongo";
import Following from "../../models/followingModel";

/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */

export default async function handler(req, res) {
    if (req.method === "GET") {
      const { sessionEmail, username } = req.query;
      await connectMongo();
      const following = await Following.findOne({ email: sessionEmail });
      if (following) {
        const isFollow = following.followings.some(
          (following) => following.email === username
        );
        res.status(200).json(isFollow);
      } else {
        res.status(404).json(false);
      }
    } else {
      res.status(405).end();
    }
  }