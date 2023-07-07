import MenuIcon from "@mui/icons-material/Menu";
import { AppBar, IconButton, Toolbar } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import styles from "./navbar.module.scss";
import React from "react";

export const Navbar: React.FC = () => {
  return (
    <AppBar position="relative">
      <div className={styles.navbar}>
        <div className={styles.navbar_left}>
          <div className={styles.logo}>
            <a href="/home">
              <img src="shark-logo.png" alt="Logo" />
            </a>
          </div>
          <div className={styles.logo_text}>SHARKIO</div>
        </div>
        <AccountCircleIcon fontSize="large" />
      </div>
    </AppBar>
  );
};