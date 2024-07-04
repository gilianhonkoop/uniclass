import Navbar from "@/components/navigation/Navbar";
import SearchBox from "@/components/search/SearchBox";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Image from "next/image";
import user from "@/icons/user.png";
import calendar from "@/icons/calendar2.png";
import clock from "@/icons/clock.png";
import location from "@/icons/location.png";
import Link from "next/link";
import { cookies } from "next/headers";
import Footer from "@/components/Footer";

function formatDate(date: string) {
  date = date.slice(0, 10);
  const dates = date.split("-");

  return dates[2] + "/" + dates[1] + "/" + dates[0];
}

function formatTime(begin: string, eind: string) {
  begin = begin.slice(11, 16);
  eind = eind.slice(11, 16);

  return begin + "-" + eind;
}

async function getUniversiteiten() {
  "use server";

  const supabase = createClient();
  const { data, error } = await supabase
    .from("universiteiten")
    .select()
    .order("id", { ascending: false });

  if (data == null) {
    return [];
  }

  return data;
}

async function getStudies(id: number | string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("studies")
    .select()
    .eq("universiteit_id", id)
    .order("id", { ascending: false });

  if (data == null) {
    return [];
  }

  return data;
}

async function getVakken(id: number | string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("vakken")
    .select()
    .eq("studie_id", id)
    .order("id", { ascending: false });

  if (data == null) {
    return [];
  }

  return data;
}

async function getTrainingen(id: number | string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("trainingen")
    .select()
    .eq("vak_id", id)
    .eq("status", "active")
    .order("id", { ascending: false });

  if (data == null) {
    return [];
  }

  return data;
}

async function getLessen(ids: string[]) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("lessen")
    .select()
    .in("id", ids)
    .order("begin", { ascending: true });

  if (data == null) {
    return [];
  }

  return data;
}

async function getLokaal(id: string | number) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("lokalen")
    .select("naam")
    .eq("id", id);

  if (data == null) {
    return [];
  }

  return data;
}

export default async function Page({
  params,
}: {
  params: { universiteit: string; studie: string; vak: string; vakId: string };
}) {
  document.body.style.overflowY = "auto";

  var language = "nl";

  async function setLanguage(language: string) {
    "use server";

    cookies().set("language", language);
  }

  const lan = cookies().get("language");

  if (lan?.value == "en") {
    language = lan.value;
  }

  const universiteiten = await getUniversiteiten();
  var uniId: string = "";
  var studieId: string = "";
  var vakId: string = "";

  const supabase = createClient();
  var { data, error } = await supabase
    .from("universiteiten")
    .select()
    .eq("naam", params.universiteit.replace(/-/g, " "))
    .limit(1);

  if (data?.length == 0) {
    redirect("/404");
  }

  uniId = data![0].id;

  var { data, error } = await supabase
    .from("studies")
    .select()
    .eq("universiteit_id", data![0].id)
    .eq("naam", params.studie.replace(/-/g, " "))
    .limit(1);

  if (data?.length == 0) {
    redirect("/404");
  }

  studieId = data![0].id;

  var { data, error } = await supabase
    .from("vakken")
    .select()
    .eq("studie_id", data![0].id)
    .eq("naam", params.vak.replace(/-/g, " "))
    .limit(1);

  if (data?.length == 0) {
    redirect("/404");
  }

  vakId = data![0].id;

  const studies = await getStudies(uniId);
  const vakken = await getVakken(studieId);

  const trainingen = await getTrainingen(vakId);

  return (
    <div className="animate-in flex-1 w-full flex flex-col items-center justify-center bg-white">
      <Navbar setLanguage={setLanguage} />
      <div className="flex-1 flex flex-col items-center opacity-0z-0 z-0 w-full mt-[3rem]">
        <div className="mb-[5rem]">
          <SearchBox
            language={language}
            inputUniversiteiten={universiteiten}
            inputStudies={studies}
            inputVakken={vakken}
            currUniversiteit={params.universiteit.replace(/-/g, " ")}
            currStudie={params.studie.replace(/-/g, " ")}
            currVak={params.vak.replace(/-/g, " ")}
            currUniversiteitId={uniId}
            currStudieId={studieId}
            currVakId={vakId}
          />
        </div>
        {trainingen.length == 0 && (
          <p>Er zijn momenteel geen trainingen voor dit vak.</p>
        )}
        {trainingen.length != 0 &&
          trainingen.map(async (training, index) => {
            const lessen = await getLessen(training.lessen);

            return (
              <div
                className="flex flex-row items-start mb-20 text-black"
                key={index}
              >
                <div className="flex flex-col text-left mb-10 max-w-[50rem]">
                  <div className="flex flex-row items-start mx-5">
                    <h4 className="text-primary mb-2">{training.naam}</h4>
                  </div>
                  <div className="flex flex-row items-start mx-5 mb-10">
                    <p className="whitespace-pre-wrap">
                      {training.omschrijving}
                    </p>
                  </div>
                  <div className="flex flex-row items-start justify-center mx-5 mb-10">
                    <div className="flex flex-row max-w-full flex-wrap justify-center gap-6">
                      <p className="hidden">a</p>
                      {lessen.map(async (les, index) => {
                        const lokaal = await getLokaal(les.lokaal_id);
                        return (
                          <div
                            className="w-[19rem] min-h-[10rem] border rounded-sm flex flex-col py-2 px-3"
                            key={index}
                          >
                            <p className="text-primary mb-auto font-medium">
                              {les.naam}
                            </p>
                            <div className="text-[16px] opacity-80 flex flex-row items-center mb-2">
                              <div className="min-w-[25px] w-[25px] h-[25px] relative mr-2">
                                <Image
                                  sizes="50, 50"
                                  src={calendar}
                                  fill={true}
                                  alt="Date icon"
                                />
                              </div>
                              {formatDate(les.begin)}
                            </div>
                            <div className="text-[16px] opacity-80 flex flex-row items-center mb-2">
                              <div className="min-w-[25px] w-[25px] h-[25px] relative mr-2">
                                <Image
                                  sizes="50, 50"
                                  src={clock}
                                  fill={true}
                                  alt="Time icon"
                                />
                              </div>
                              {formatTime(les.begin, les.eind)}
                            </div>
                            <div className="text-[16px] opacity-80 flex flex-row items-center mb-2">
                              <div className="min-w-[25px] w-[25px] h-[25px] relative mr-2">
                                <Image
                                  sizes="50, 50"
                                  src={location}
                                  fill={true}
                                  alt="Location icon"
                                />
                              </div>
                              {lokaal[0]?.naam}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <div className="flex flex-row items-start mx-5">
                    <div className="flex flex-row gap-1 justify-evenly w-full items-center md:items-start">
                      <div>
                        <h4 className="text-center text-primary mr-4%">
                          <span className="text-[18px] mr-1 opacity-60 text-black">
                            Totaal:
                          </span>
                          {"€" + training.prijs.toFixed(2)}
                        </h4>
                        <Link
                          href={training.betaallink}
                          target="_blank"
                          className="hover:cursor-pointer flex justify-center items-center mt-[1rem] h-[4rem] min-w-[12rem] 
                          rounded-md shadow-sm hover:shadow-md text-white bg-primary hover:scale-[101%]"
                        >
                          <p className="text-[15px] uppercase font-bold">
                            Bestel training {">"}
                          </p>
                        </Link>
                      </div>
                      {/* <div className="w-[6rem] h-[6rem] min-w-[6rem] min-h-[6rem] mr-5">
                        <div className="w-full h-full relative rounded-full overflow-hidden bg-red-300 mt-2 ">
                          <Image
                            sizes="50, 50"
                            src={user}
                            fill={true}
                            alt="Picture of the lecturer"
                          />
                        </div>
                        <p className="text-center text-[14px] mt-1">
                          {training.docent.split(" ")[0]}
                        </p>
                      </div> */}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
      <div className="w-full h-full bg-white">
        <svg
          className="waves"
          viewBox="0 24 150 28"
          preserveAspectRatio="none"
          shapeRendering="auto"
        >
          <defs>
            <path
              id="gentle-wave"
              d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
            />
          </defs>
          <g className="parralax">
            <use
              xlinkHref="#gentle-wave"
              x="48"
              y="0"
              fill="rgba(255, 148, 18, 0.3)"
            />
            <use
              xlinkHref="#gentle-wave"
              x="48"
              y="3"
              fill="rgba(255, 148, 18, 0.5)"
            />
            <use
              xlinkHref="#gentle-wave"
              x="48"
              y="5"
              fill="rgba(255, 148, 18, 0.7)"
            />
            <use
              xlinkHref="#gentle-wave"
              x="48"
              y="7"
              fill="rgba(255, 148, 18, 1)"
            />
          </g>
        </svg>
      </div>
      <Footer language={language} />
    </div>
  );
}

// server side training fetching based on vak name
// import searchbar as client side component and pass currUniversiteit/studie/vak
