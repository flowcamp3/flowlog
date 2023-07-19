// pages/api/auth/sign.js
import connectMongo from "../../utils/connectMongo";
import Following from "../../models/followingModel";

/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const email = req.query.email;
      await connectMongo();
      const following = await Following.findOne({ email: email });
      // _id 제거
      const followingsWithoutId = following.followings
        .map(({ email }) => ({ email }))
        .sort((a, b) => a.email.localeCompare(b.email));

      if (following) {
        res.status(200).json(followingsWithoutId);
      } else {
        res.status(404).json({ message: "No followings found for this email" });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } else if (req.method === "POST") {
    try {
      console.log(req.body);
      await connectMongo();
      const following = await Following.findOne({ email: email });
      console.log("FIND DOCUMENT");
      res.status(200).json({ redirect: "/signup" });
    } catch (error) {
      console.log(error);
      res.json({ error });
    }
  } else {
    // 다른 메소드의 요청 처리
    res.status(405).end();
  }
}
