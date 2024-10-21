"use server";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

async function updateOrders(
  supabase: any,
  new_training_id: string,
  curr_training_id: string,
  user_id: string,
) {
  "use server";

  const { data, error } = await supabase
    .from("orders")
    .select("changes")
    .eq("gebruiker_id", user_id)
    .eq("training_id", curr_training_id)
    .single();

  let changes: string = data.changes ? data.changes : "";
  changes += `changed training_id from ${curr_training_id} to ${new_training_id} `;

  const { error: error2 } = await supabase
    .from("orders")
    .update({ training_id: new_training_id, changes: changes })
    .eq("gebruiker_id", user_id)
    .eq("training_id", curr_training_id);

  return error;
}

async function updateGebruikers(
  supabase: any,
  trainingen: any,
  user_id: string,
) {
  "use server";
  const { error } = await supabase
    .from("gebruikers")
    .update({ trainingen: trainingen })
    .eq("id", user_id);

  return error;
}

async function updateTraining(
  supabase: any,
  deelnemers: any,
  training_id: string,
) {
  "use server";
  const { error } = await supabase
    .from("trainingen")
    .update({ deelnemers: deelnemers })
    .eq("id", training_id);

  return error;
}

export default async function edit({
  searchParams,
}: {
  searchParams: { status: string };
}) {
  const Update = async (formData: FormData) => {
    "use server";

    const optie = formData.get("optie") as string;
    const voornaam = formData.get("voornaam") as string;
    const achternaam = formData.get("achternaam") as string;
    const user_id = formData.get("user_id") as string;
    const curr_training_id = formData.get("curr_training_id") as string;
    const new_training_id = formData.get("new_training_id") as string;

    const supabase = createClient();
    let curr_error: any;

    // check if id name email and training is correct

    const { data, error } = await supabase
      .from("orders")
      .select()
      .eq("gebruiker_id", user_id)
      .eq("training_id", curr_training_id)
      .single();

    if (data == null) {
      return redirect(
        "/dashboard/move?status=Error: user is not registered for that training (1)",
      );
    }

    const { data: user_data, error: error1 } = await supabase
      .from("gebruikers")
      .select("trainingen")
      .eq("id", user_id)
      .ilike("voornaam", voornaam)
      .ilike("achternaam", achternaam)
      .single();

    if (user_data == null) {
      return redirect(
        "/dashboard/move?status=Error: user does not have a registration for that training",
      );
    }

    const { data: old_training_data, error: error4 } = await supabase
      .from("trainingen")
      .select("deelnemers")
      .eq("id", curr_training_id)
      .single();

    if (old_training_data == null) {
      return redirect(
        "/dashboard/move?status=Error user can't be moved as he is not in the training",
      );
    }

    if (optie == "verplaats") {
      // get new training data
      const { data: new_training_data, error: error6 } = await supabase
        .from("trainingen")
        .select("deelnemers")
        .eq("id", new_training_id)
        .single();

      if (new_training_data == null) {
        return redirect(
          "/dashboard/move?status=Error: new training does not exist",
        );
      }

      // update gebruikers table
      let trainings: any[] = user_data.trainingen;
      let new_trainings = trainings.filter((elem) => elem != curr_training_id);
      new_trainings.push(new_training_id);

      curr_error = await updateGebruikers(supabase, new_trainings, user_id);
      if (curr_error) {
        console.log(curr_error);
        return redirect("/dashboard/move?Error: " + JSON.stringify(curr_error));
      }

      // update old training
      let deelnemers: any[] = old_training_data.deelnemers;
      let leftover_deelnemers = deelnemers.filter((elem) => elem != user_id);

      curr_error = await updateTraining(
        supabase,
        leftover_deelnemers,
        curr_training_id,
      );
      if (curr_error) {
        return redirect("/dashboard/move?Error: " + JSON.stringify(curr_error));
      }

      // update new training
      deelnemers = new_training_data.deelnemers;
      deelnemers.push(user_id);

      curr_error = await updateTraining(supabase, deelnemers, new_training_id);
      if (curr_error) {
        return redirect("/dashboard/move?Error: " + JSON.stringify(curr_error));
      }

      // update orders table
      curr_error = await updateOrders(
        supabase,
        new_training_id,
        curr_training_id,
        user_id,
      );
      if (curr_error) {
        return redirect("/dashboard/move?Error: " + JSON.stringify(curr_error));
      }

      // log change
      const info: string = `moved user_id ${user_id} with name "${voornaam} ${achternaam}" from training_id 
      ${curr_training_id} to training_id ${new_training_id}`;

      const { error: log_error } = await supabase
        .from("logs")
        .insert({ type: "move", info: info });
    } else if (optie == "verwijder") {
      // update gebruikers table
      let trainings: any[] = user_data.trainingen;
      let new_trainings = trainings.filter((elem) => elem != curr_training_id);

      curr_error = await updateGebruikers(supabase, new_trainings, user_id);
      if (curr_error) {
        return redirect("/dashboard/move?Error: " + JSON.stringify(curr_error));
      }

      // update old training
      let deelnemers: any[] = old_training_data.deelnemers;
      let new_deelnemers = deelnemers.filter((elem) => elem != user_id);

      curr_error = await updateTraining(
        supabase,
        new_deelnemers,
        curr_training_id,
      );
      if (curr_error) {
        return redirect("/dashboard/move?Error: " + JSON.stringify(curr_error));
      }

      // update orders table
      const { error: orders_error } = await supabase
        .from("orders")
        .update({ status: "deleted" })
        .eq("gebruiker_id", user_id)
        .eq("trainig_id", curr_training_id);

      if (orders_error) {
        return redirect("/dashboard/move?Error: " + JSON.stringify(curr_error));
      }

      // log change
      const info: string = `deleted user_id ${user_id} with name "${voornaam} ${achternaam}" from 
      training_id ${curr_training_id}`;

      const { error: log_error } = await supabase
        .from("logs")
        .insert({ type: "delete", info: info });
    }

    return redirect("/dashboard/move?status=Success");
  };

  return (
    <div className="mx-10 my-10">
      <form className="flex flex-col gap-10 mt-1" id="dataform">
        <div className="flex flex-row gap-5 flex-1">
          <input
            placeholder="Voornaam"
            type="text"
            name="voornaam"
            required
            autoComplete="off"
            className="w-[20rem] h-[3rem] shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight 
            focus:outline-none focus:shadow-outline"
          />
          <input
            placeholder="Achternaam"
            type="text"
            name="achternaam"
            required
            autoComplete="off"
            className="w-[20rem] h-[3rem] shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight 
            focus:outline-none focus:shadow-outline"
          />
          <input
            placeholder="gebruiker ID"
            type="text"
            name="user_id"
            required
            autoComplete="off"
            className="w-[20rem] h-[3rem] shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight 
            focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="flex flex-row gap-5 flex-1">
          <input
            placeholder="Huidige training ID"
            type="text"
            name="curr_training_id"
            required
            autoComplete="off"
            className="w-[20rem] h-[3rem] shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight 
            focus:outline-none focus:shadow-outline"
          />
          <input
            placeholder="Nieuwe training ID (als verplaatsen)"
            type="text"
            name="new_training_id"
            autoComplete="off"
            className="w-[20rem] h-[3rem] shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight 
            focus:outline-none focus:shadow-outline"
          />
          <select
            name="optie"
            id="optie"
            className=" w-[20rem] h-[3rem] shadow border rounded py-2 px-3 text-gray-700 leading-tight 
            focus:outline-none focus:shadow-outline"
          >
            <option value="verplaats">Verplaats</option>
            <option value="verwijder">Verwijder</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-[20rem] border rounded h-[3rem] bg-primary-dark text-white"
          formAction={async (FormData) => {
            "use server";
            await Update(FormData);
          }}
        >
          Update
        </button>
        <h5 className="mt-5">{searchParams.status}</h5>
      </form>
    </div>
  );
}
