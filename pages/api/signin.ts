import { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/lib/db";
import { comparePasswords, createJWT } from "@/lib/auth";
import { serialize } from "cookie";
import { useRouter } from "next/router";

export default async function signin( req: NextApiRequest, res: NextApiResponse ) {
  console.log('in signin')
  if (req.method === "POST") {
    const user = await db.user.findUnique({
      where: {
        email: req.body.email,
      },
    });

    if (!user) {
      res.status(401);
      res.json({ error: "Invalid login" });
      return;
    }

    const isUser = await comparePasswords(req.body.password, user.password);

    if (isUser) {
      const jwt = await createJWT(user);
      res.setHeader(
        "Set-Cookie",
        serialize(
          process.env.COOKIE_SECRET, jwt, {
          httpOnly: true,
          path: "/",
          maxAge: 60 * 60 * 24 * 7,
        })
      );
      res.status(201);
      res.json({});
    } else {
      res.status(401);
      res.json({ error: "Invalid login" });
    }
  } else {
    res.status(402);
    res.json({});
  }
}