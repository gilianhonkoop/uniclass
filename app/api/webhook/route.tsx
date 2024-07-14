import Stripe from "stripe";
import { NextResponse, NextRequest } from "next/server";
import { createClient } from "@/utils/supabase/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

const addPayment = async (
  first_name: string,
  last_name: string,
  email: string,
  phone: string,
  amount: number,
  training_id: number,
  order_date: string,
  payment_intent: string,
) => {
  const supabase = createClient();

  let deelnemers;
  let user_id;

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

    deelnemers = data[0].deelnemers;
  } catch (error) {
    console.log(error);
    return;
  }

  console.log("8");

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
    });
  } catch (error) {
    console.log(error);
    return;
  }

  console.log("9");

  try {
    // fetch user data
    const { data, error } = await supabase
      .from("gebruikers")
      .select()
      .eq("voornaam", first_name)
      .eq("achternaam", last_name)
      .eq("email", email)
      .eq("telefoon", phone);

    console.log("10");

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

  console.log("11");

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

  console.log("12");

  return;
};

export async function POST(req: NextRequest, res: NextResponse) {
  console.log("entered");
  const payload = await req.text();
  const response = JSON.parse(payload);

  const sig = req.headers.get("Stripe-Signature");

  console.log("2");

  const order_date = new Date(response?.created * 1000).toLocaleString();

  console.log("3");

  try {
    let event = stripe.webhooks.constructEvent(
      payload,
      sig as string,
      process.env.STRIPE_WEBHOOK_SECRET_KEY as string,
    );

    console.log("4");

    if (event.type == "checkout.session.completed") {
      if (response.data.object.payment_status == "paid") {
        console.log("5");

        let training_id = parseFloat(response.data.object.client_reference_id);
        let email = response.data.object.customer_details.email;
        let phone = response.data.object.customer_details.phone;
        let amount = parseFloat(response.data.object.amount_total) / 100;
        let first_name = response.data.object.custom_fields[0]?.text.value;
        let last_name = response.data.object.custom_fields[1]?.text.value;
        let payment_intent = response.data.object.payment_intent;

        console.log("6");

        addPayment(
          first_name,
          last_name,
          email,
          phone,
          amount,
          training_id,
          order_date,
          payment_intent,
        );

        console.log("7");
      }
    }
    return NextResponse.json({ status: 200, event: event.type });
  } catch (error) {
    return NextResponse.json({ status: 500, error });
  }
}
