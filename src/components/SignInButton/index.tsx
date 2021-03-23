import React from "react";
import { FaGithub } from "react-icons/fa";
import { FiX } from "react-icons/fi";

import { signIn, signOut, useSession } from "next-auth/client";

import styles from "./styles.module.scss";

export function SignInButton() {
  const [session] = useSession();

  return session ? (
    <button
      type="button"
      className={styles.buttonContainer}
      onClick={() => signOut()}
    >
      <FaGithub color="#04D361" size={24} />
      {session.user.name}
      <FiX color="#737380" size={24} className={styles.closeIcon} />
    </button>
  ) : (
    <button
      type="button"
      className={styles.buttonContainer}
      onClick={() => signIn("github")}
    >
      <FaGithub color="#EBA417" size={24} />
      Sign in with Github
    </button>
  );
}
