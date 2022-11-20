import type { NextPage } from "next";
import { useEffect, useState } from "react";
import styles from "../styles/pages/Home.module.css";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";
import { stepLabelClasses } from "@mui/material";

const { Client } = require("@notionhq/client");

const notion = new Client({
  auth: process.env.NOTION_SECRET,
});

const Home: NextPage = () => {
  const [problemLink, setProblemLink] = useState("");
  const [secretKey, setSecretKey] = useState("");
  const [databaseID, setDatabaseID] = useState("");

  function createPage(leetcodeURL: string) {
    fetch("/api/submitQuestion", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url: leetcodeURL }),
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

  // const createPage = () => {
  //   return new Promise((resolve, reject) => {
  //     const data = {
  //       parent: {
  //         type: "database_id",
  //         database_id: process.env.NOTION_DB,
  //       },
  //       properties: {
  //         Number: {
  //           number: 1,
  //         },
  //         "Problem Name": {
  //           title: [
  //             {
  //               text: {
  //                 content: "Problem Name",
  //               },
  //             },
  //           ],
  //         },
  //       },
  //     };
  //     const options = {
  //       method: "POST",
  //       headers: {
  //         mode: "no-cors",
  //         accept: "application/json",
  //         "Notion-Version": "2022-06-28",
  //         "content-type": "application/json",
  //       },
  //       body: JSON.stringify(data),
  //     };

  //     fetch("https://api.notion.com/v1/pages", options)
  //       .then((response) => response.json())
  //       .then((response) => console.log(response))
  //       .catch((err) => console.error(err));
  //   });
  // };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setProblemLink(e.target.problem.value);
    createPage(problemLink);
  };

  // useEffect(() => {
  //   console.log(problemLink);
  // }, [problemLink]);

  return (
    <div className={styles.parent}>
      <div className={styles.information}>
        <TextField
          id="outlined-basic"
          label="Leetcode Problem"
          variant="outlined"
          helperText="Insert Leetcode Link"
          fullWidth={true}
        />
        {/* <LoadingButton
        loading
        loadingPosition="start"
        startIcon={<SaveIcon />}
        variant="outlined"
      >
        Uploading
      </LoadingButton> */}
        <Button variant="outlined">Submit</Button>
        <form onSubmit={handleSubmit}>
          <label>Insert Leetcode Problem Link</label>
          <input type="text" id="problem" name="problem"></input>
          <br />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
    // <div>
    //   <TextField
    //     id="outlined-basic"
    //     label="Outlined"
    //     variant="outlined"
    //     helperText="Insert Leetcode Link"
    //     fullWidth={true}
    //   />
    //   {/* <LoadingButton
    //     loading
    //     loadingPosition="start"
    //     startIcon={<SaveIcon />}
    //     variant="outlined"
    //   >
    //     Uploading
    //   </LoadingButton> */}
    //   <Button variant="outlined">Outlined</Button>
    //   <form onSubmit={handleSubmit}>
    //     <label>Insert Leetcode Problem Link</label>
    //     <input type="text" id="problem" name="problem"></input>
    //     <br />
    //     <button type="submit">Submit</button>
    //   </form>
    // </div>
    // <div className={styles.component}>
    //   <div className={styles.information}>
    //     <TextField
    //       id="outlined-basic"
    //       label="Outlined"
    //       variant="outlined"
    //       helperText="Insert Leetcode Link"
    //       fullWidth={true}
    //     />
    //     {/* <LoadingButton
    //     loading
    //     loadingPosition="start"
    //     startIcon={<SaveIcon />}
    //     variant="outlined"
    //   >
    //     Uploading
    //   </LoadingButton> */}
    //     <Button variant="outlined">Outlined</Button>
    //     <form onSubmit={handleSubmit}>
    //       <label>Insert Leetcode Problem Link</label>
    //       <input type="text" id="problem" name="problem"></input>
    //       <br />
    //       <button type="submit">Submit</button>
    //     </form>
    //   </div>
    // </div>
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
