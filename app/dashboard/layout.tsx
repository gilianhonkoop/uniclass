import Sidebar from "@/components/navigation/sidebar";
import CurrentPage from "@/utils/backend/CurrentPage";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/login");
  }

  return (
    <div className="flex flex-row items-center justify-center w-full h-screen bg-gray-50">
      <div className="h-full max-w-[16%] w-full min-w-[14rem] shadow-md">
        <Sidebar />
      </div>
      <div className="flex-1 h-full">
        <div className="w-full h-[6rem] shadow-md shadow-transparant flex items-center justify-center">
          <p className="text-cgreen font-bold text-3xl">
            <CurrentPage />
          </p>
        </div>
        {children}
      </div>
    </div>
  );
}
