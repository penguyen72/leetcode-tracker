import type { NextPage } from "next";
import { useState } from "react";
import styles from "../styles/pages/Home.module.css";

import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import LoadingDialog from "./components/LoadingDialog";
import { makeStyles } from "@mui/styles";
import { Typography } from "@mui/material";

const useStyles = makeStyles({
  field: {
    marginTop: 10,
    width: 500,
  },
});

const Home: NextPage = () => {
  const classes = useStyles();

  const [problemLink, setProblemLink] = useState("");
  const [linkError, setLinkError] = useState(false);
  const [fetchDialog, setFetchDialog] = useState(false);
  const [obtainInfoError, setObtainInfoError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [notionError, setNotionError] = useState(false);
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
          console.log(response);
          if (response.name === "" || response.error) {
            setObtainInfoError(true);
            setFetchDialog(false);
          } else {
            createPage(response)
              .then(() => {
                setSuccess(true);
              })
              .catch(() => {
                setNotionError(true);
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
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <div className={styles.information}>
        <Typography variant="h3">Leetcode Tracker</Typography>
        <TextField
          id="outlined-basic"
          label="Leetcode Problem"
          variant="outlined"
          helperText="Insert Leetcode Link"
          className={classes.field}
          required
          onChange={(e) => {
            setProblemLink(e.target.value);
          }}
        />
        <Button variant="outlined" onClick={handleSubmit}>
          Submit
        </Button>
        <Snackbar open={success} onClose={handleClose}>
          <Alert severity="success">Success!</Alert>
        </Snackbar>
        <Snackbar open={notionError} onClose={handleClose}>
          <Alert severity="error">There was an issue adding to Notion!</Alert>
        </Snackbar>
        <Snackbar open={linkError} onClose={handleClose}>
          <Alert severity="error">Please submit a proper link!</Alert>
        </Snackbar>
        <Snackbar open={obtainInfoError} onClose={handleClose}>
          <Alert severity="error">
            Could not obtain information from Leetcode.com!
          </Alert>
        </Snackbar>
        <LoadingDialog fetchDialog={fetchDialog} />
      </div>
    </Box>
  );
};

export default Home;
