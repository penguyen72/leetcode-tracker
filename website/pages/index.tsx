import type { NextPage } from "next";
import { useState } from "react";
import styles from "../styles/pages/Home.module.css";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const { Client } = require("@notionhq/client");

const notion = new Client({
  auth: process.env.NOTION_SECRET,
});

const Home: NextPage = () => {
  const [problemLink, setProblemLink] = useState("");
  const [linkError, setLinkError] = useState(false);
  const [fetchDialog, setFetchDialog] = useState(false);
  const [obtainInfoError, setObtainInfoError] = useState(false);
  const [secretKey, setSecretKey] = useState("");
  const [databaseID, setDatabaseID] = useState("");

  const obtainInformation = (leetcodeURL: string): any => {
    return new Promise((resolve, reject) => {
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
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  const createPage = (data: any): any => {
    return new Promise((resolve, reject) => {
      fetch("/api/submitPage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => {
          return response.json();
        })
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  const validateLink = (url: string): boolean => {
    return /^https:\/\/leetcode.com\/problems\/[a-z\-]+\/$/.test(url);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (validateLink(problemLink)) {
      setFetchDialog(true);
      obtainInformation(problemLink)
        .then((response: any) => {
          if (response.name === "") {
            setObtainInfoError(true);
            setFetchDialog(false);
          } else {
            createPage(response)
              .then(() => {
                console.log("success");
              })
              .catch(() => {
                console.log("error");
              });
            setFetchDialog(false);
          }
        })
        .catch(() => {
          setObtainInfoError(true);
          setFetchDialog(false);
        });
    } else {
      setLinkError(true);
    }
  };

  const handleClose = () => {
    setLinkError(false);
    setObtainInfoError(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.information}>
        <TextField
          id="outlined-basic"
          label="Leetcode Problem"
          variant="outlined"
          helperText="Insert Leetcode Link"
          fullWidth={true}
          onChange={(e) => {
            setProblemLink(e.target.value);
          }}
        />
        <Button variant="outlined" onClick={handleSubmit}>
          Submit
        </Button>
        <Snackbar open={linkError} onClose={handleClose}>
          <Alert severity="error">Please submit a proper link!</Alert>
        </Snackbar>
        <Snackbar open={obtainInfoError} onClose={handleClose}>
          <Alert severity="error">
            Could not obtain information from Leetcode.com!
          </Alert>
        </Snackbar>
        <Dialog open={fetchDialog}>
          <DialogTitle>Please Wait...</DialogTitle>

          <CircularProgress />
          <DialogContentText id="alert-dialog-description">
            We are currently obtaining information on Leetcode.com
          </DialogContentText>
        </Dialog>
        {/* <form onSubmit={handleSubmit}>
          <label>Insert Leetcode Problem Link</label>
          <input type="text" id="problem" name="problem"></input>
          <br />
          <button type="submit">Submit</button>
        </form> */}
      </div>
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
