import connectMongo from "../../utils/connectMongo";
import { NextApiRequest, NextApiResponse } from "next";
import User from "../../models/userModel";

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

    // GET request handler
    if (method === "GET") {
      const { email } = req.query;
      if (!email || typeof email !== "string") {
        return res.status(400).json({ message: "Invalid email" });
      }

      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      return res.status(200).json({ user });
    }

    // POST request handler
    else if (method === "POST") {
      const { email, userInfo, userImg } = req.body;
      if (!email || typeof email !== "string") {
        return res.status(400).json({ message: "Invalid email" });
      }

      const user = await User.findOneAndUpdate(
        { email },
        { userInfo, userImg },
        { new: true }
      );
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      return res.status(200).json({ user });
    }

    // DELETE request handler
    else if (method === "DELETE") {
      // Handle the DELETE request
    }

    // Invalid HTTP method
    else {
      res.status(405).end();
    }
  } catch (error) {
    console.error(error);
    res.status(500).end(); // Internal server error
  }
}
