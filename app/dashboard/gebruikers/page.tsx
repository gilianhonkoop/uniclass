"use server";

import { createClient } from "@/utils/supabase/server";
import UserTable from "@/components/tables/UserTable";

async function getUsers() {
  "use server";

  const supabase = createClient();
  const { data, error } = await supabase
    .from("gebruikers")
    .select()
    .order("id", { ascending: false });

  if (data == null) {
    return [];
  }

  console.log(error);

  return data;
}

export default async function Gebruikers() {
  var users: any[] = [];
  users = await getUsers();

  return (
    <>
      <div className="w-full h-full py-5 px-8 flex flex-col">
        <UserTable users={users} />
      </div>
    </>
  );
}
