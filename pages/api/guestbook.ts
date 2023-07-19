import connectMongo from "../../utils/connectMongo";
import { NextApiRequest, NextApiResponse } from "next";
import Guestbook from "../../models/guestbookModel";

/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { method } = req;
    await connectMongo();

    // GET 요청 처리 - 블로그 아이디가 일치하는 모든 원소 반환
    if (method === "GET") {
      const { blogId } = req.query;

      // If blogId is provided, return all elements matching the blogId
      if (blogId) {
        const data = await Guestbook.find({ blogId: blogId });
        res.status(200).json(data);
      } else {
        const data = await Guestbook.find();
        res.status(200).json(data);
      }
    }
    // GET 요청 처리 - _id 일치하는 원소 반환
    else if (method === "GET" && req.query.id) {
      const { id } = req.query;
      const data = await Guestbook.findById(id);
      res.status(200).json(data);
    }
    // POST 요청 처리
    else if (method === "POST") {
      console.log("포스트보낸다!!");
      const { blogId, visitorId, content } = req.body;
      const newEntry = new Guestbook({
        blogId: blogId,
        visitorId: visitorId,
        date: new Date(),
        content: content,
      });
      await newEntry.save();
      res.status(201).end();
    }
    // DELETE 요청 처리
    else if (method === "DELETE") {
      const { id } = req.query; // Change id to query parameter
      await Guestbook.findByIdAndDelete(id); // Use findByIdAndDelete to delete by id
      res.status(200).end();
    }
    // 허용되지 않은 HTTP 메서드 처리
    else {
      res.status(405).end();
    }
  } catch (error) {
    console.error(error);
    res.status(500).end(); // 내부 서버 오류 처리
  }
}
