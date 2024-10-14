import React from "react";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footerStyle}>
      <div className={styles.containerStyle}>
        <h1 className={styles.titleStyle}>Coffeetopia</h1>
        <p className={styles.descriptionStyle}>
          Your daily dose of coffee perfection. Brewed with love!
        </p>
      </div>
      <div className={styles.bottomStyle}>
        <p>
          &copy; {new Date().getFullYear()} Coffeetopia. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
