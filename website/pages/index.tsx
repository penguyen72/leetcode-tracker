import type { NextPage } from "next";
import { useEffect, useState } from "react";
import styles from "../styles/pages/Home.module.css";

import TextField from "@mui/material/TextField";
import Navbar from "./components/Navbar";

const { Client } = require("@notionhq/client");

const notion = new Client({
  auth: process.env.NOTION_SECRET,
});

const Home: NextPage = () => {
  const [problemLink, setProblemLink] = useState("");
  const [secretKey, setSecretKey] = useState("");
  const [databaseID, setDatabaseID] = useState("");

  function createPage2() {
    fetch("/api/submitQuestion", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const createPage = () => {
    return new Promise((resolve, reject) => {
      const data = {
        parent: {
          type: "database_id",
          database_id: process.env.NOTION_DB,
        },
        properties: {
          Number: {
            number: 1,
          },
          "Problem Name": {
            title: [
              {
                text: {
                  content: "Problem Name",
                },
              },
            ],
          },
        },
      };
      const options = {
        method: "POST",
        headers: {
          mode: "no-cors",
          accept: "application/json",
          "Notion-Version": "2022-06-28",
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      };

      fetch("https://api.notion.com/v1/pages", options)
        .then((response) => response.json())
        .then((response) => console.log(response))
        .catch((err) => console.error(err));
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    createPage2();
    setProblemLink(e.target.problem.value);
    setSecretKey(e.target.notion_key.value);
    setDatabaseID(e.target.notion_db.value);
  };

  useEffect(() => {
    console.log(problemLink, secretKey, databaseID);
  }, [problemLink, secretKey, databaseID]);

  return (
    <div className={styles.problem}>
      <Navbar />
      <form onSubmit={handleSubmit}>
        <label>Insert Leetcode Problem Link</label>
        <input type="text" id="problem" name="problem"></input>
        <br />
        <label>Insert Notion Secret Key</label>
        <input type="password" id="notion_key" name="notion_key"></input>
        <br />
        <label>Insert Notion Database ID</label>
        <input type="text" id="notion_db" name="notion_db"></input>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export async function getStaticProps() {
  const response = await notion.databases.query({
    database_id: process.env.NOTION_DB,
  });

  return {
    props: {
      results: response.results,
    },
  };
}

export default Home;
