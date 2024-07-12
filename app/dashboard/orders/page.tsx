"use server";

import { createClient } from "@/utils/supabase/server";
import OrderTable from "@/components/tables/OrderTable";

async function getOrders() {
  "use server";

  const supabase = createClient();
  const { data, error } = await supabase
    .from("orders")
    .select()
    .order("id", { ascending: false });

  if (data == null) {
    return [];
  }

  console.log(error);

  return data;
}

export default async function Orders() {
  var orders: any[] = [];
  orders = await getOrders();

  return (
    <>
      <div className="w-full h-full py-5 px-8 flex flex-col">
        <OrderTable orders={orders} />
      </div>
    </>
  );
}
