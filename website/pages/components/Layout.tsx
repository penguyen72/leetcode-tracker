import React, { ReactNode } from "react";
import { makeStyles } from "@mui/styles";
import { Typography } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import AssessmentIcon from "@mui/icons-material/Assessment";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import AccountCircle from "@mui/icons-material/AccountCircle";

const useStyles = makeStyles({
  icon: {
    marginRight: 5,
    color: "#F0F0F0",
  },
  appbar: {
    background: "#EAB03C",
    borderWidth: 1,
  },
  title: {
    color: "#F0F0F0",
    flexGrow: 1,
  },
  button: {
    color: "#F0F0F0",
  },
});

const Layout = ({ children }: { children: ReactNode }) => {
  const classes = useStyles();
  return (
    <div>
      <AppBar>
        <Toolbar className={classes.appbar}>
          <AssessmentIcon className={classes.icon}></AssessmentIcon>
          <Typography variant="h6" className={classes.title}>
            Welcome to Leetcode Tracker
          </Typography>
          <Button className={classes.appbar} href="/">
            Home
          </Button>
          <Button className={classes.appbar} href="/about">
            About
          </Button>
          <Button className={classes.appbar} href="/leetcode-tracker">
            Leetcode Tracker
          </Button>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
        </Toolbar>
      </AppBar>
      <div>{children}</div>
    </div>
  );
};

export default Layout;
