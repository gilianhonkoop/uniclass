import Sidebar from "@/components/navigation/sidebar";
import CurrentPage from "@/utils/backend/CurrentPage";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const supabase = createClient();

  // IMPORTANT
  // const { data, error } = await supabase.auth.getUser();
  // if (error || !data?.user) {
  //   redirect("/login");
  // }

  return (
    <div className="flex flex-row flex-1 items-stretch justify-center w-full bg-gray-50 min-h-full">
      <div className="min-h-full max-w-[16%] w-full min-w-[10rem] shadow-md left-0 sticky bg-white">
        <Sidebar />
      </div>
      <div className="flex-1 h-full">
        <div className="w-full h-[6rem] shadow-md shadow-transparant flex items-center justify-center">
          <p className="text-test-primary font-bold text-3xl">
            <CurrentPage />
          </p>
        </div>
        {children}
      </div>
    </div>
  );
}
