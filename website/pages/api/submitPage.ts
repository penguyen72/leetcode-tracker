// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
const { Client } = require("@notionhq/client");

const notion = new Client({
  auth: process.env.NOTION_SECRET,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const data = req.body;
  const response = await notion.pages.create({
    parent: {
      type: "database_id",
      database_id: process.env.NOTION_DB,
    },
    properties: {
      Number: {
        number: parseInt(data.number),
      },
      "Problem Name": {
        title: [
          {
            text: {
              content: data.name,
            },
            href: data.url,
          },
        ],
      },
      Difficulty: {
        multi_select: [
          {
            name: data.difficulty,
          },
        ],
      },
      Link: {
        url: data.url,
      },
    },
  });

  res.status(200).json(response);
}
