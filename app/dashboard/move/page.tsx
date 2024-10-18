"use server";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

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

    if (optie == "verplaats") {
      // update gebruikers table
      const { data: data1, error: error1 } = await supabase
        .from("gebruikers")
        .select("trainingen")
        .eq("id", user_id)
        .ilike("voornaam", voornaam)
        .ilike("achternaam", achternaam)
        .single();

      if (data1 == null) {
        return redirect("/dashboard/move?status=Error");
      }

      let trainings: any[] = data1.trainingen;
      let new_trainings = trainings.filter((elem) => elem != curr_training_id);
      new_trainings.push(new_training_id);

      const { error: error2 } = await supabase
        .from("gebruikers")
        .update({ trainingen: new_trainings })
        .eq("id", user_id);

      // update old training

      const { data: data4, error: error4 } = await supabase
        .from("trainingen")
        .select("deelnemers")
        .eq("id", curr_training_id)
        .single();

      if (data4 == null) {
        return redirect("/dashboard/move?status=Error");
      }

      let deelnemers: any[] = data4.deelnemers;
      let new_deelnemers = deelnemers.filter((elem) => elem != user_id);

      const { error: error5 } = await supabase
        .from("trainingen")
        .update({ deelnemers: new_deelnemers })
        .eq("id", curr_training_id);

      // update new training

      const { data: data6, error: error6 } = await supabase
        .from("trainingen")
        .select("deelnemers")
        .eq("id", new_training_id)
        .single();

      if (data6 == null) {
        return redirect("/dashboard/move?status=Error");
      }

      deelnemers = data6.deelnemers;
      deelnemers.push(user_id);

      const { error: error7 } = await supabase
        .from("trainingen")
        .update({ deelnemers: deelnemers })
        .eq("id", new_training_id);

      // update orders table
      const { error: error3 } = await supabase
        .from("orders")
        .update({ training_id: new_training_id })
        .eq("gebruiker_id", user_id)
        .eq("training_id", curr_training_id);

      // log change

      const info: string = `moved user_id ${user_id} with name "${voornaam} ${achternaam}" from training_id ${curr_training_id} to training_id ${new_training_id}`;

      const { error: error8 } = await supabase
        .from("logs")
        .insert({ type: "move", info: info });
    } else if (optie == "verwijder") {
      // update gebruikers table
      const { data: data1, error: error1 } = await supabase
        .from("gebruikers")
        .select("trainingen")
        .eq("id", user_id)
        .ilike("voornaam", voornaam)
        .ilike("achternaam", achternaam)
        .single();

      if (data1 == null) {
        return redirect("/dashboard/move?status=Error");
      }

      let trainings: any[] = data1.trainingen;
      let new_trainings = trainings.filter((elem) => elem != curr_training_id);

      const { error: error2 } = await supabase
        .from("gebruikers")
        .update({ trainingen: new_trainings })
        .eq("id", user_id);

      // update old training

      const { data: data4, error: error4 } = await supabase
        .from("trainingen")
        .select("deelnemers")
        .eq("id", curr_training_id)
        .single();

      if (data4 == null) {
        return redirect("/dashboard/move?status=Error");
      }

      let deelnemers: any[] = data4.deelnemers;
      let new_deelnemers = deelnemers.filter((elem) => elem != user_id);

      const { error: error5 } = await supabase
        .from("trainingen")
        .update({ deelnemers: new_deelnemers })
        .eq("id", curr_training_id);

      // update orders table
      const { error: error3 } = await supabase
        .from("orders")
        .update({ status: "deleted" })
        .eq("gebruiker_id", user_id)
        .eq("trainig_id", curr_training_id);

      // log change

      const info: string = `deleted user_id ${user_id} with name "${voornaam} ${achternaam}" from training_id ${curr_training_id}`;

      const { error: error8 } = await supabase
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
        <h4 className="mt-5">{searchParams.status}</h4>
      </form>
    </div>
  );
}
