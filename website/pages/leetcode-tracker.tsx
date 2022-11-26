import React, { useState } from "react";
import type { NextPage } from "next";

import Box from "@mui/material/Box";
import SubmitSnackbar from "./components/SubmitSnackbar";
import LoadingDialog from "./components/LoadingDialog";
import Layout from "./components/Layout";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const styles = {
  screen: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
  },
  title: { color: "#EAB03C" },
  field: {
    marginTop: 5,
    width: 500,
  },
  information: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: 800,
    height: 400,
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
    boxShadow: "0 2px 6px #000",
  },
};

const LeetcodeTracker: NextPage = () => {
  const [problemLink, setProblemLink] = useState("");
  const [linkError, setLinkError] = useState(false);
  const [fetchDialog, setFetchDialog] = useState(false);
  const [obtainInfoError, setObtainInfoError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [notionError, setNotionError] = useState(false);

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
    <Layout>
      <Box sx={styles.screen}>
        <Box sx={styles.information}>
          <Typography variant="h3" sx={styles.title}>
            Leetcode Tracker
          </Typography>
          <TextField
            id="outlined-basic"
            label="Leetcode Problem"
            variant="outlined"
            helperText="Insert Leetcode Link"
            sx={styles.field}
            fullWidth
            required
            onChange={(e) => {
              setProblemLink(e.target.value);
            }}
          />
          <Button variant="outlined" onClick={handleSubmit}>
            Submit
          </Button>
        </Box>
        <SubmitSnackbar
          success={success}
          notionError={notionError}
          linkError={linkError}
          obtainInfoError={obtainInfoError}
          handleClose={handleClose}
        />
        <LoadingDialog fetchDialog={fetchDialog} />
      </Box>
    </Layout>
  );
};

export default LeetcodeTracker;
