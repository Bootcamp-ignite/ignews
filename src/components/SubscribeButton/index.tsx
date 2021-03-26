import { signIn, useSession } from "next-auth/client";
import React from "react";
import { api } from "../../services/api";
import { getStripeJs } from "../../services/stripeJs";

import styles from "./styles.module.scss";

interface SubscribeButtonProps {
  priceId: string;
}

export default function SubscribeButton({ priceId }: SubscribeButtonProps) {
  const session = useSession();

  async function handleSubscribe() {
    if (!session) {
      signIn("github");
      return;
    }

    try {
      const response = await api.post("/subscribe");

      const { sessionId } = response.data;

      const stripe = await getStripeJs();

      await stripe.redirectToCheckout({ sessionId });
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <button
      type="button"
      className={styles.buttonContainer}
      onClick={handleSubscribe}
    >
      Subscribe now
    </button>
  );
}
