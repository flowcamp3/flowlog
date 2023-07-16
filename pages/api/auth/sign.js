// pages/api/auth/sign.js
import connectMongo from "../../../utils/connectMongo";
import User from "../../../models/userModel";

/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */

export default async function handler(req, res) {
  console.log(req.body);
  console.log(req.body);
  if (req.method === "GET") {
    // GET 요청이 오면 DB와 연결하고, query를 통해 받은 email이 user라는 collection에 있는지 찾고,
    // 있으면 I know you를 출력하고 기본페이지로 리다이렉트한다.
    // 없으면 User not found를 출력하고 /signup으로 리다이렉트한다.
    try {
      const email = req.query.email;
      await connectMongo();
      const user = await User.findOne({ email: email });
      console.log("FIND DOCUMENT");

      if (user) {
        console.log("You don't need to signup");
        res.status(200).json({ redirect: "/" });
      } else {
        console.log("You need to signup");
        res.status(200).json({ redirect: "/signup" });
      }
    } catch (error) {
      console.log(error);
      res.json({ error });
    }
  } else if (req.method === "POST") {
    // POST 요청이 오면 DB와 연결하고, user라는 collection에 document를 추가한다.
    try {
      await connectMongo();
      const user = await User.create(req.body);
      res.status(200).json({ user });
    } catch (error) {
      console.log(error);
      res.json({ error });
    }
  } else {
    // 다른 메소드의 요청 처리
    res.status(405).end();
  }
}
