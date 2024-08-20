import { createClient } from "@/utils/supabase/server";

export default async function Index() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("trainingen")
    .select("prijs, deelnemers, naam")
    .eq("id", "13");

  console.log(data);

  return <div>abc</div>;
}
