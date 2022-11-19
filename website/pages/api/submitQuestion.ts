// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Client } from "@notionhq/client";
import fetch from "node-fetch";
import { load } from "cheerio";

const puppeteer = require("puppeteer");

const notion = new Client({
  auth: process.env.NOTION_SECRET,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const url = "https://leetcode.com/problems/3sum/";

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    const [questionElement] = await page.$x(
      '//*[@id="app"]/div/div[2]/div[1]/div/div[1]/div/div[1]/div[1]/div/div[2]/div/div[1]/div[1]'
    );

    const [difficultyElement] = await page.$x(
      '//*[@id="app"]/div/div[2]/div[1]/div/div[1]/div/div[1]/div[1]/div/div[2]/div/div[1]/div[2]/div'
    );

    const questionContent = await questionElement.getProperty("textContent");
    const difficultyContent = await difficultyElement.getProperty(
      "textContent"
    );

    const title = await questionContent.jsonValue();
    const difficulty = await difficultyContent.jsonValue();

    // const [number, name] = title.split(". ");

    await browser.close();

    res.status(200).json({ title, difficulty });
  } catch (error) {
    res.status(400).json({ error });
  }
}
