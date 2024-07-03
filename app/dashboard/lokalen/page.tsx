import LokaalRij from "@/components/LokaalRij";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

type LokaalEntry = {
  id: number;
  created_at: string;
  naam: string;
};

async function fetchLokalen() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("lokalen")
    .select()
    .order("id", { ascending: true });

  if (error) {
    return [];
  }

  return data;
}

export default async function Lokalen({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const lokalen: LokaalEntry[] = await fetchLokalen();

  const maakLokaal = async (formData: FormData) => {
    "use server";

    const new_lokaal = formData.get("lokaal") as string;

    const supabase = createClient();
    const { error } = await supabase
      .from("lokalen")
      .insert({ naam: new_lokaal });

    if (error) {
      return redirect("/dashboard/lokalen?message=Kon lokaal niet toevoegen");
    }

    return redirect("/dashboard/lokalen?message=Lokaal is toegeveogd");
  };

  return (
    <div className="flex flex-col w-full h-fit items-center">
      <form className="flex flex-col gap-5 items-center pt-20">
        <input
          placeholder="Vul een nieuw lokaal in"
          type="text"
          name="lokaal"
          required
          autoComplete="off"
          className="w-[20rem] shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        <button
          formAction={maakLokaal}
          className="w-[20rem] border rounded h-[3rem] bg-dark text-white"
        >
          Toevoegen
        </button>
      </form>
      {searchParams?.message && (
        <p className="mt-4 p-4 text-center text-md">{searchParams.message}</p>
      )}
      <div className="mt-20 mb-10 text-3xl u">Huidige lokalen:</div>
      <div className="w-full flex flex-col gap-2 items-center">
        {lokalen.map((lokaal, index) => {
          return <LokaalRij key={index} name={lokaal.naam} id={lokaal.id} />;
        })}
      </div>
    </div>
  );
}
