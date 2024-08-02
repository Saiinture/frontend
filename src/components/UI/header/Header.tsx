import React, { useState } from "react";
import { useAuth } from "../../contexts/auth-context/AuthContext.tsx";
import { doSignOut } from "../../firebase/Auth.ts";
import toast from "react-hot-toast";
import styles from "./Header.module.css";
import { FaUser } from "react-icons/fa";
import Button from "./button/Button.tsx";
import LoginForm from "../login-form/LoginForm.tsx";
import RegisterForm from "../register-form/RegisterForm.tsx";
import { useNavigate } from "react-router-dom";
import Logo from "./logo/Logo.tsx";

interface HeaderProps {
  children: React.ReactNode;
}

function Header({ children }: HeaderProps) {
  const { user } = useAuth();
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const navigation = useNavigate();

  const handleLogout = async () => {
    await doSignOut().then(() => {
      toast.success("Logged out successfully!");
      if (window.location.pathname !== "/") {
        navigation("/");
      }
    });
  };

  return (
    <header className={styles.header}>
      <div className={styles.authContainer}>
        <div className={styles.logo}>
          <Logo className={styles.logo_svg} onClick={() => navigation("/")} />
        </div>
        <div className={styles.user_container}>
          {showRegisterModal && (
            <RegisterForm
              isOpen={showRegisterModal}
              onClose={() => setShowRegisterModal(false)}
            />
          )}
          {showLoginModal && (
            <LoginForm
              isOpen={showLoginModal}
              onClose={() => setShowLoginModal(false)}
            />
          )}
          {user ? (
            <>
              <div className={styles.logoutButtonContainer}>
                <Button onClick={handleLogout}>Log out</Button>
              </div>
              <div className={styles.FAContainer}>
                {user && user?.photoURL ? (
                  <img
                    src={user?.photoURL}
                    alt="user"
                    className={styles.userImage}
                  />
                ) : (
                  <FaUser size={50} className={styles.FA} />
                )}
              </div>
            </>
          ) : (
            <>
              <div>
                <Button onClick={() => setShowRegisterModal(true)}>
                  Sign up
                </Button>
              </div>
              <div>
                <Button onClick={() => setShowLoginModal(true)}>Log in</Button>
              </div>
            </>
          )}
        </div>
      </div>
      {children}
    </header>
  );
}

export default Header;
