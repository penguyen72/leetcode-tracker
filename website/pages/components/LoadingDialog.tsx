import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";

const LoadingDialog = ({ fetchDialog }: { fetchDialog: boolean }) => {
  return (
    <Dialog open={fetchDialog}>
      <DialogTitle>Please Wait...</DialogTitle>
      <CircularProgress />
      <DialogContentText id="alert-dialog-description">
        We are currently obtaining information on Leetcode.com
      </DialogContentText>
    </Dialog>
  );
};

export default LoadingDialog;
