import { getTrainingen, getLessen, getLokaal } from "@/utils/functions/search";
import { formatDate, formatTime } from "@/utils/functions/format";
import Image from "next/image";
import calendar from "@/icons/calendar2.png";
import clock from "@/icons/clock.png";
import location from "@/icons/location.png";
import CreateSession from "@/lib/stripe/create_session/CreateSession";
import { redirect } from "next/navigation";

export default async function Trainings({
  vakId,
  pathName,
}: {
  vakId: string;
  pathName: string;
}) {
  var trainingen = await getTrainingen(vakId);

  if (trainingen.length == 0) {
    return (
      <div>
        <p>Er zijn momenteel geen trainingen voor dit vak.</p>
      </div>
    );
  } else {
    return trainingen.map(async (training, index) => {
      const lessen = await getLessen(training.lessen);

      return (
        <div
          key={index}
          className="roundshadowxl pl-[5px] flex flex-col text-left w-full max-w-[50rem] bg-black bg-opacity-[5%] rounded-sm"
        >
          <div className="shadowbar w-full h-full py-4">
            <div className="flex flex-row items-start mx-5">
              <h4 className="text-primary mb-2">{training.naam}</h4>
            </div>
            <div className="flex flex-row items-start mx-5 mb-10">
              <p className="whitespace-pre-wrap">{training.omschrijving}</p>
            </div>
            <div className="flex flex-row items-start justify-center sm:justify-start mx-5 mb-10">
              <div className="flex flex-row max-w-full flex-wrap justify-center sm:justify-start gap-6">
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
                        {les.begin == null ? "tbd" : formatDate(les.begin)}
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
                        {les.begin == null || les.eind == null
                          ? "tbd"
                          : formatTime(les.begin, les.eind)}
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
              <div className="flex flex-col sm:flex-row gap-1 justify-start sm:gap-5 w-full items-center">
                <h4 className="text-center text-primary mr-4%">
                  <span className="text-[18px] mr-1 opacity-60 text-black">
                    Totaal:
                  </span>
                  {"€" + training.prijs.toFixed(2)}
                </h4>

                <form
                  action={async () => {
                    "use server";
                    let currUrl = `https://www.uniclass.nl/training/${pathName}`;

                    let StripeUrl = await CreateSession(
                      training.prijs,
                      training.id,
                      training.naam,
                      currUrl,
                    );
                    redirect(StripeUrl!);
                  }}
                >
                  {training.plaatsen != training.deelnemers.length && (
                    <button
                      type="submit"
                      role="link"
                      className="hover:cursor-pointer flex justify-center items-center h-[4rem] min-w-[12rem] 
                          rounded-md shadow-sm hover:shadow-md text-white bg-primary hover:scale-[101%]"
                    >
                      <p className="text-[15px] uppercase font-bold">
                        Book training {">"}
                      </p>
                    </button>
                  )}
                  {training.plaatsen == training.deelnemers.length && (
                    <button
                      disabled
                      type="submit"
                      role="link"
                      className="hover:cursor-not-allowed flex justify-center items-center h-[4rem] min-w-[12rem] 
                          rounded-md shadow-sm text-white bg-primary"
                    >
                      <p className="text-[15px] uppercase font-bold">
                        Training is full
                      </p>
                    </button>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      );
    });
  }
}
