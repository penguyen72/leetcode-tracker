import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { makeStyles } from "@mui/styles";
import { Grid, Typography } from "@mui/material";

const useStyles = makeStyles({
  textPosition: {
    marginTop: 10,
    marginLeft: 20,
  },
});

const LoadingDialog = ({ fetchDialog }: { fetchDialog: boolean }) => {
  const classes = useStyles();

  return (
    <Dialog open={fetchDialog}>
      <DialogContent>
        <Grid container direction="row">
          <CircularProgress />
          <DialogContentText
            id="alert-dialog-description"
            className={classes.textPosition}
          >
            <Typography variant="body1">
              Currently obtaining information from Leetcode.com...
            </Typography>
          </DialogContentText>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default LoadingDialog;
