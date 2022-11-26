import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { Grid, Typography } from "@mui/material";

const styles = {
  textPosition: {
    marginTop: 10,
    marginLeft: 20,
  },
};

const LoadingDialog = ({ fetchDialog }: { fetchDialog: boolean }) => {
  return (
    <Dialog open={fetchDialog}>
      <DialogContent>
        <Grid container direction="row">
          <CircularProgress />
          <DialogContentText
            id="alert-dialog-description"
            sx={styles.textPosition}
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
