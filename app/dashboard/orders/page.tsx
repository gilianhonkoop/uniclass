"use server";

import { createClient } from "@/utils/supabase/server";
import OrderTable from "@/components/tables/OrderTable";
import SearchOrder from "@/components/search/SearchOrder";

async function getOrders(page: number) {
  "use server";
  let page_limit: number = 25;

  const supabase = createClient();
  const { data, error } = await supabase
    .from("orders")
    .select()
    .range((page - 1) * page_limit, page * page_limit - 1)
    .order("id", { ascending: false });

  if (data == null) {
    return [];
  }

  return data;
}

export default async function Orders() {
  const zoekOrder = async (formData: FormData) => {
    "use server";

    const optie = formData.get("optie") as string;
    const zoekterm = formData.get("zoekterm") as string;

    const supabase = createClient();
    let query = supabase.from("orders").select();

    if (optie == "id") {
      query = query.eq(optie, zoekterm).neq("status", "deleted");
    } else {
      query = query.ilike(optie, zoekterm).neq("status", "deleted");
    }

    const { data, error } = await query;

    return data;
  };

  return (
    <>
      <SearchOrder zoekOrder={zoekOrder} />
      <h5 className="ml-10 mt-10">All orders:</h5>
      <div className="w-full h-full py-5 px-8 flex flex-col">
        <OrderTable getOrders={getOrders} />
      </div>
    </>
  );
}
