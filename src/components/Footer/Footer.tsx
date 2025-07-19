import React from "react";
import { FacebookFilled, TwitterCircleFilled } from "@ant-design/icons";
import styles from "./Footer.module.css";

/**
 * Footer displays the site's branding, copyright,
 * and social media links (Facebook and Twitter).
 *
 * @returns {JSX.Element} Footer section of the website.
 */
const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.leftContent}>
          <span className={styles.logo}>
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              className={styles.logoIcon}
            >
              <path
                d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z"
                fill="#00b797"
              />
            </svg>
            trainline
          </span>
          <span className={styles.socialLinks}>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FacebookFilled className={styles.facebookIcon} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <TwitterCircleFilled className={styles.twitterIcon} />
            </a>
          </span>
        </div>
        <div className={styles.rightContent}>
          <div>
            Copyright © 2025 Trainline.com Limited and its affiliated companies.
            All rights reserved. Trainline.com Limited is registered in England
            and Wales.
          </div>
          <div>
            Company No. 3846791. Registered address: 3rd floor, 120 Holborn,
            London EC1N 2TD, United Kingdom. VAT number: 791 7261 06.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
