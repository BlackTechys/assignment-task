import React from "react";
import { Button, Space } from "antd";
import { User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import styles from "./Header.module.css";

/**
 * Header displays the site logo, navigation links,
 * and user actions like sign in, register, and cart access.
 *
 * @returns {JSX.Element} Top navigation bar of the site.
 */
const Header: React.FC = () => {
  const navigate = useNavigate();
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <img
          src="https://static.trainlinecontent.com/content/vul/logos/trainline-mint.svg"
          alt="Trainline"
          onClick={() => navigate("/")}
        />
      </div>

      <div className={styles.nav}>
        <Space size="large">
          <span className={styles.navItem}>Referrals</span>
          <span className={styles.navItem}>Business</span>
          <span className={styles.navItem}>Cart</span>
          <span className={styles.navItem}>My Bookings</span>
          <span className={styles.navItem}>Register</span>
        </Space>

        <Space>
          <Button type="primary" className={styles.signInButton}>
            <User size={16} />
            Sign in
          </Button>
        </Space>
      </div>
    </header>
  );
};

export default Header;
