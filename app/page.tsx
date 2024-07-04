import Navbar from "@/components/navigation/Navbar";
import SearchBox from "@/components/search/SearchBox";
import { createClient } from "@/utils/supabase/server";
import Footer from "@/components/Footer";
import Image from "next/image";
import bracket from "@/icons/angle_bracket.svg";
import edu from "@/illustrations/landingpage.svg";
import slagen from "@/illustrations/slagen.svg";
import math from "@/illustrations/math.svg";
import GetStarted from "@/components/GetStarted";
import { cookies } from "next/headers";
import BlobAnimtation from "@/components/BlobAnimation";

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

export default async function Index() {
  const universiteiten = await getUniversiteiten();
  var language = "nl";

  async function setLanguage(language: string) {
    "use server";

    cookies().set("language", language);
  }

  const lan = cookies().get("language");

  if (lan?.value == "en") {
    language = lan.value;
  }

  return (
    <div className="animate-in flex-1 w-full flex flex-col h-screen relative items-center bg-white text-black">
      <Navbar setLanguage={setLanguage} />
      <div className=" flex-1 flex flex-col items-center relative w-full sm:mt-[0rem] mt-[5rem]">
        <section className="bg-test-bg w-full h-full min-h-[calc(100vh-80px)] drop-shadow-md flex flex-col">
          <div
            className=" h-fit z-10 relative flex flex-1 w-full 
          lg:mb-[4vh] lg:mb-0 mb-0 sm:mb-[3rem] items-center justify-center mt-[4rem]"
          >
            <div
              className="mx-[5rem] flex flex-col lg:flex-row items-center w-full 
            max-h-[fit] max-w-6xl gap-[2rem] sm:gap-[5rem] lg:gap-8"
            >
              <div className="flex w-[100%] h-full flex-col items-center lg:items-start justify-evenly">
                {language == "nl" && (
                  <h1 className="font-normal text-center lg:text-left md:min-w-[90vw] lg:min-w-fit">
                    <div className="wrapper-typing flex flex-col items-center lg:items-start">
                      <span className="text-test-black">
                        Volg een training{" "}
                      </span>
                      <div className="min-w-[280px] max-w-[382px]">
                        <span className="font-normal spantext"></span>
                      </div>
                    </div>
                  </h1>
                )}
                {language == "en" && (
                  <h1 className="font-normal font-medium text-center lg:text-left">
                    <div className="wrapper-typing flex flex-col items-center lg:items-start">
                      <span className="text-test-black">
                        Find a training in{" "}
                      </span>
                      <div className="min-w-[280px] max-w-[382px]">
                        <span className="font-normal spantext"></span>
                      </div>
                    </div>
                  </h1>
                )}
                {language == "nl" && (
                  <p
                    className="text-[max(16px,2vw)] lg:text-[max(20px,1.2vw)] lg:mx-0 md:mx-[5rem] sm:mx-[2rem] mx-0rem 
                  mt-8 font-normal text-test-black text-center lg:text-left leading-tight text-opacity-90 "
                  >
                    Bereid je voor op{" "}
                    <span className="text-test-primary"> examens </span> onder
                    begeleiding van
                    <span className="text-test-primary"> ervaren </span>
                    docenten. Bouw{" "}
                    <span className="text-test-primary"> vertrouwen </span> en
                    behaal{" "}
                    <span className="text-test-primary"> resultaten</span>.
                  </p>
                )}
                {language == "en" && (
                  <p
                    className="text-[max(16px,2vw)] lg:text-[max(20px,1.2vw)] mt-8 font-normal text-test-black text-center 
                  lg:text-left leading-tight text-opacity-90"
                  >
                    Prepare for your{" "}
                    <span className="text-test-primary"> exams </span> under the
                    guidance of
                    <span className="text-test-primary"> experienced </span>
                    teachers. Build{" "}
                    <span className="text-test-primary"> confidence </span> and
                    achieve <span className="text-test-primary"> results</span>.
                  </p>
                )}
                <div className="visible lg:invisible">
                  {language == "nl" && <GetStarted text="Zoek Training" />}
                  {language == "en" && <GetStarted text="Find Training" />}
                </div>
              </div>
              <div className="flex w-[100%] h-full">
                <div className="w-full h-[25rem] relative flex items-center justify-center">
                  <BlobAnimtation />
                  <Image src={edu} fill={true} alt="classroom illustration" />
                </div>
              </div>
            </div>
          </div>

          <div
            className="min-h-[30rem] lg:min-h-0 z-20 relative flex flex-1 items-center 
          justify-center w-full items-center"
          >
            <div
              id="search"
              className="scroll-mt-[17.5rem] h-[15rem] sm:h-[10rem] flex justify-center items-center mx-[5rem]"
            >
              <SearchBox
                language={language}
                inputUniversiteiten={universiteiten}
                inputStudies={[]}
                inputVakken={[]}
                currUniversiteit={""}
                currStudie={""}
                currVak={""}
                currUniversiteitId={""}
                currStudieId={""}
                currVakId={""}
              />
            </div>
          </div>
          <div className="w-full h-[5vh] mb-5 items-center justify-center lg:mt-0 md:mt-[3rem] hidden lg:flex">
            <div className="w-[5vh] h-[5vh] rotate-90 relative">
              <Image
                src={bracket}
                className="bracket-arrow"
                alt="edit"
                fill={true}
              />
            </div>
          </div>
        </section>

        <section className="z-0 w-full h-full min-h-[calc(100vh-120px)] lg:py-0 py-20 flex-col lg:flex-row flex justify-center items-center">
          <div className="max-w-[40rem] w-full h-full flex justify-center items-center mx-5 lg:mt-5">
            <div className="min-h-[30rem] w-full max-w-[25rem] flex flex-col">
              <div className="flex flex-1 relative">
                <Image
                  sizes="50, 50"
                  src={math}
                  fill={true}
                  alt="studying person"
                  loading="lazy"
                />
              </div>
              {language == "nl" && (
                <div className="flex flex-col items-center pt-8">
                  <h6 className="text-primary font-normal ">
                    Haal Elk Vak Met Vertrouwen
                  </h6>
                  <p className="text-center">
                    Leer strategieën en kennis waarmee jij elk tentamen haalt
                  </p>
                </div>
              )}
              {language == "en" && (
                <div className="flex flex-col items-center pt-8">
                  <h6 className="text-primary font-normal ">
                    Pass Any Subject With Confidence
                  </h6>
                  <p className="text-center">
                    Learn the strategies and knowledge you need to excel in
                    every exam
                  </p>
                </div>
              )}
            </div>
          </div>
          <div className="max-w-[40rem] w-full h-full flex justify-center items-center mx-5 mt-[4rem] lg:mt-5">
            <div className="min-h-[30rem] w-full max-w-[25rem] flex flex-col">
              <div className="flex flex-1 relative items-end">
                <Image
                  src={slagen}
                  width="0"
                  height="0"
                  sizes="100vw"
                  className="h-full w-auto"
                  alt="studying person"
                  loading="lazy"
                />
              </div>
              {language == "nl" && (
                <div className="flex flex-col items-center pt-8">
                  <h6 className="text-primary font-normal ">
                    Excellente docenten
                  </h6>
                  <p className="text-center text-black">
                    Onze docenten worden gemiddel geëvalueerd met een 8,9.
                  </p>
                </div>
              )}
              {language == "en" && (
                <div className="flex flex-col items-center pt-8">
                  <h6 className="text-primary font-normal ">
                    Excellent Teachers
                  </h6>
                  <p className="text-center">
                    Our excellent teachers get evaluated with an 8.9 on average
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>
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
