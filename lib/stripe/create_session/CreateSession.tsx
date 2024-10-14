"use server";

import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export default async function CreateSession(
  price: number,
  trainingId: string,
  name: string,
  currUrl: string,
) {
  try {
    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            unit_amount: price * 100,
            product_data: {
              name: `Tentamentraining - ${name}`,
            },
            currency: "eur",
          },
          quantity: 1,
        },
      ],
      custom_fields: [
        {
          key: "firstname",
          label: {
            custom: "First name",
            type: "custom",
          },
          optional: false,
          type: "text",
        },
        {
          key: "lastname",
          label: {
            custom: "Last name",
            type: "custom",
          },
          optional: false,
          type: "text",
        },
      ],
      client_reference_id: `${trainingId}`,
      mode: "payment",
      success_url: `${currUrl}?success=true`,
      cancel_url: `${currUrl}?success=false`,
      phone_number_collection: {
        enabled: true,
      },
      automatic_tax: { enabled: false },
    });
    return session.url;
  } catch (err) {
    return null;
  }
}
