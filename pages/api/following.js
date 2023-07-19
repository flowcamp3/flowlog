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
    // 친구 추가 기능
    try {
      await connectMongo();
      const following = await Following.findOne({ email: req.body.sessionEmail });
      if (following) {
        const isFollow = following.followings.some(
          (following) => following.email === req.body.username
        );
        if (!isFollow) {
          following.followings.push({ email: req.body.username });
          await following.save();
          console.log("추가했어요");
        }
        res.status(200).json(following);
      } else {
        res.status(404).end();
      }
      
    } catch (error) {
      console.log(error);
      res.json({ error });
    }
  } else if (req.method === "DELETE") {
    // 친구 삭제 기능
    try {
      await connectMongo();
      const following = await Following.findOne({ email: req.body.sessionEmail });
      if (following) {
        const index = following.followings.findIndex(
          (following) => following.email === req.body.username
        );
        if (index !== -1) {
          following.followings.splice(index, 1);
          await following.save();
          console.log("삭제했어요")
        }
        res.status(200).json(following);
      } else {
        res.status(404).end();
      }
      
    } catch (error) {
      console.log(error);
      res.json({ error });
    }
  } else {
    // 다른 메소드의 요청 처리
    res.status(405).end();
  }
}
