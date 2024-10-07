"use server";

import { createClient } from "@/utils/supabase/server";
import UserTable from "@/components/tables/UserTable";
import SearchUser from "@/components/search/SearchUser";

async function getUsers(page: number) {
  "use server";
  let page_limit: number = 25;

  const supabase = createClient();
  const { data, error } = await supabase
    .from("gebruikers")
    .select()
    .range((page - 1) * page_limit, page * page_limit - 1)
    .order("id", { ascending: false });

  if (data == null) {
    return [];
  }

  return data;
}

export default async function Gebruikers() {
  const zoekUser = async (formData: FormData) => {
    "use server";

    const optie = formData.get("optie") as string;
    const zoekterm = formData.get("zoekterm") as string;

    const supabase = createClient();
    let query = supabase.from("gebruikers").select();

    if (optie == "id") {
      console.log("abc");
      query = query.eq(optie, zoekterm);
    } else {
      query = query.ilike(optie, zoekterm);
    }

    const { data, error } = await query;

    return data;
  };
  return (
    <>
      <SearchUser zoekUser={zoekUser} />
      <h5 className="ml-10 mt-10">All orders:</h5>
      <div className="w-full h-full py-5 px-8 flex flex-col">
        <UserTable getUsers={getUsers} />
      </div>
    </>
  );
}
