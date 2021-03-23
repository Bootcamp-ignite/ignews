import React from "react";

import styles from "./styles.module.scss";

export default function SubscribeButton() {
  return (
    <button type="button" className={styles.buttonContainer}>
      Subscribe now
    </button>
  );
}