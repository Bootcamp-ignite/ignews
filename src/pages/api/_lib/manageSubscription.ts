import { query as q } from "faunadb";
import { fauna } from "../../../services/fauna";
import { stripe } from "../../../services/stripe";

export async function saveSubscription(
  subscriptionId: string,
  customerId: string,
  createAction = false
) {
  const userRef = await fauna.query(
    q.Select("ref", q.Get(q.Match("user_by_stripe_customer_id", customerId)))
  );

  const subscription = await stripe.subscriptions.retrieve(subscriptionId);

  const subscriptionData = {
    stripe_subscription_id: subscription.id,
    user_ref: userRef,
    stripe_subscription_status: subscription.status,
    stripe_price_id: subscription.items.data[0].price.id,
  };

  if (createAction) {
    await fauna.query(
      q.Create(q.Collection("subscriptions"), { data: subscriptionData })
    );
  } else {
    const response = await fauna.query(
      q.Replace(
        q.Select(
          "ref",
          q.Get(
            q.Match("subscription_by_stripe_subscription_id", subscriptionId)
          )
        ),
        { data: subscriptionData }
      )
    );
  }
}
