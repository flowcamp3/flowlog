import connectMongo from "../../../utils/connectMongo";
import { NextApiRequest, NextApiResponse } from "next";
import Guestbook from "../../../models/guestbookModel";

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

    // GET 요청 처리 - 모든 원소 반환
    if (method === "GET") {
      await connectMongo();
      const data = await Guestbook.find();
      res.status(200).json(data);
    }
    // GET 요청 처리 - _id 일치하는 원소 반환
    else if (method === "GET" && req.query.id) {
      await connectMongo();
      const { id } = req.query;
      const data = await Guestbook.findById(id);
      res.status(200).json(data);
    }
    // POST 요청 처리
    else if (method === "POST") {
      await connectMongo();
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
      await connectMongo();
      const { id } = req.body;
      await Guestbook.findByIdAndDelete(id);
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
