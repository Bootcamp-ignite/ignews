import React from "react";
import { FaGithub } from "react-icons/fa";
import { FiX } from "react-icons/fi";

import styles from "./styles.module.scss";

export function SignInButton() {
  const signed = true;
  return signed ? (
    <button type="button" className={styles.buttonContainer}>
      <FaGithub color="#04D361" size={24} />
      maykonoliveira
      <FiX color="#737380" size={24} className={styles.closeIcon} />
    </button>
  ) : (
    <button type="button" className={styles.buttonContainer}>
      <FaGithub color="#EBA417" size={24} />
      Sign in with Github
    </button>
  );
}
