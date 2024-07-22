import Navbar from "@/components/navigation/Navbar";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import Footer from "@/components/Footer";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import SearchFunctions2 from "@/components/search/SearchFunctions2";
import Trainings from "@/components/Trainings";

const Waves = dynamic(() => import("@/components/waves/waves"), {
  loading: () => <></>,
});

export default async function Page({ params }: { params: { info: string } }) {
  var language = "nl";

  async function setLanguage(language: string) {
    "use server";

    cookies().set("language", language);
  }

  const lan = cookies().get("language");

  if (lan?.value == "en") {
    language = lan.value;
  }

  const info: string[] = decodeURIComponent(params.info).split(" ");

  if (info.length != 3) {
    redirect("/404");
  }

  var uniId: string = info[0];
  var studieId: string = info[1];
  var vakId: string = info[2];

  return (
    <div className="animate-in flex-1 w-full flex flex-col items-center justify-center bg-white">
      <Navbar setLanguage={setLanguage} />
      <div className="flex-1 flex flex-col items-center opacity-0z-0 z-0 w-full mt-[3rem] mb-[5rem] gap-[5rem]">
        <Suspense fallback={<></>}>
          {" "}
          <SearchFunctions2
            language={language}
            uniId={uniId}
            studieId={studieId}
            vakId={vakId}
            empty={false}
          />
        </Suspense>
        <Suspense fallback={<>Loading...</>}>
          <Trainings vakId={vakId} pathName={params.info} />
        </Suspense>
      </div>
      <Waves backgroundColor={"bg-white"} />
      <Footer language={language} />
    </div>
  );
}

// server side training fetching based on vak name
// import searchbar as client side component and pass currUniversiteit/studie/vak
