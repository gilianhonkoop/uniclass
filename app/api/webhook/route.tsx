import Stripe from "stripe";
import { NextResponse, NextRequest } from "next/server";
import { createClient } from "@/utils/supabase/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

async function addPayment(
  first_name: string,
  last_name: string,
  email: string,
  phone: string,
  amount: number,
  training_id: number,
  order_date: string,
  payment_intent: string,
  payment_type: string | null,
) {
  const supabase = createClient();

  let deelnemers;
  let user_id;
  let training_naam;

  // fetch training information and check if
  // price matches

  try {
    const { data, error } = await supabase
      .from("trainingen")
      .select("prijs, deelnemers, naam")
      .eq("id", training_id);

    if (data == null) {
      return;
    }

    if (data[0].prijs != amount) {
      return;
    }

    training_naam = data[0].naam;
    deelnemers = data[0].deelnemers;
  } catch (error) {
    console.log(error);
    return;
  }

  try {
    // fetch user data
    const { data, error } = await supabase
      .from("gebruikers")
      .select()
      .eq("voornaam", first_name)
      .eq("achternaam", last_name)
      .eq("email", email)
      .eq("telefoon", phone);

    // insert if user doesnt exist
    if (data?.length == 0) {
      await supabase.from("gebruikers").insert({
        email: email,
        telefoon: phone,
        voornaam: first_name,
        achternaam: last_name,
        trainingen: [training_id],
      });

      const { data, error } = await supabase
        .from("gebruikers")
        .select("id")
        .eq("voornaam", first_name)
        .eq("achternaam", last_name)
        .eq("email", email)
        .eq("telefoon", phone);

      user_id = data![0].id;
    }

    // update if user already exists
    if (data?.length == 1) {
      user_id = data[0].id;
      let trainingen = data[0].trainingen;
      trainingen.push(training_id);

      const { error } = await supabase
        .from("gebruikers")
        .update({ trainingen: trainingen })
        .eq("id", data[0].id);
    }
  } catch (error) {
    console.log(error);
    return;
  }

  // insert order into orders table
  try {
    const { data, error } = await supabase.from("orders").insert({
      prijs: amount,
      email: email,
      telefoon: phone,
      voornaam: first_name,
      achternaam: last_name,
      training_id: training_id,
      order_date: order_date,
      status: "paid",
      payment_intent: payment_intent,
      training_naam: training_naam,
      gebruiker_id: user_id,
      betaalmethode: payment_type,
    });
    console.log(data, error);
  } catch (error) {
    console.log(error);
    return;
  }

  // update training participants
  try {
    deelnemers.push(user_id);

    const { error } = await supabase
      .from("trainingen")
      .update({ deelnemers: deelnemers })
      .eq("id", training_id);
  } catch (error) {
    return;
  }

  return;
}

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const payload = await req.text();
    const response = JSON.parse(payload);

    const sig = req.headers.get("Stripe-Signature");

    // const order_date = new Date(response?.created * 1000).toLocaleString();
    const order_date = new Date(response?.created * 1000).toLocaleString(
      "en-US",
      { timeZone: "Europe/Amsterdam" },
    );

    console.log(order_date);

    let event = stripe.webhooks.constructEvent(
      payload,
      sig as string,
      process.env.STRIPE_WEBHOOK_SECRET_KEY as string,
    );
    if (event.type == "checkout.session.completed") {
      if (response.data.object.payment_status == "paid") {
        let training_id = parseInt(response.data.object.client_reference_id);
        let email = response.data.object.customer_details.email as string;
        let phone = response.data.object.customer_details.phone as string;
        let amount = parseFloat(response.data.object.amount_total) / 100;
        let first_name = response.data.object.custom_fields[0]?.text.value;
        let last_name = response.data.object.custom_fields[1]?.text.value;
        let payment_intent = response.data.object.payment_intent;
        let payment_type: null | string = null;

        try {
          if (payment_intent != null) {
            const paymentIntent =
              await stripe.paymentIntents.retrieve(payment_intent);

            if (paymentIntent.payment_method_types[0] == "card") {
              const paymentMethod = await stripe.paymentMethods.retrieve(
                paymentIntent.payment_method as string,
              );

              payment_type = `card: ${paymentMethod.card?.brand}`;
            } else {
              payment_type = paymentIntent.payment_method_types[0];
            }
          }
        } catch (error) {
          console.log("retrieve payment type error");
        }

        await addPayment(
          first_name,
          last_name,
          email,
          phone,
          amount,
          training_id,
          order_date,
          payment_intent,
          payment_type,
        );
      }
    }
    return NextResponse.json({ status: 200, event: event.type });
  } catch (error) {
    return NextResponse.json({ status: 500, error });
  }
}
