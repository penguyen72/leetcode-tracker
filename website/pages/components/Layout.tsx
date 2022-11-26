import React, { ReactNode } from "react";
import { Typography } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import AssessmentIcon from "@mui/icons-material/Assessment";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import AccountCircle from "@mui/icons-material/AccountCircle";

const styles = {
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
};

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <AppBar>
        <Toolbar sx={styles.appbar}>
          <AssessmentIcon sx={styles.icon}></AssessmentIcon>
          <Typography variant="h6" sx={styles.title}>
            Welcome to Leetcode Tracker
          </Typography>
          <Button sx={styles.appbar} href="/">
            Home
          </Button>
          <Button sx={styles.appbar} href="/about">
            About
          </Button>
          <Button sx={styles.appbar} href="/leetcode-tracker">
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
