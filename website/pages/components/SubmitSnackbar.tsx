import React from "react";

import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const SubmitSnackbar = ({
  success,
  notionError,
  linkError,
  obtainInfoError,
  handleClose,
}: {
  success: boolean;
  notionError: boolean;
  linkError: boolean;
  obtainInfoError: boolean;
  handleClose: any;
}) => {
  return (
    <>
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
    </>
  );
};

export default SubmitSnackbar;
