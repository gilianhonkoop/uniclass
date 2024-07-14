import { getTrainingen, getLessen, getLokaal } from "@/utils/functions/search";
import { formatDate, formatTime } from "@/utils/functions/format";
import Image from "next/image";
import calendar from "@/icons/calendar2.png";
import clock from "@/icons/clock.png";
import location from "@/icons/location.png";

export default async function Trainings({ vakId }: { vakId: string }) {
  var trainingen = await getTrainingen(vakId);

  if (trainingen.length == 0) {
    return <p>Er zijn momenteel geen trainingen voor dit vak.</p>;
  } else {
    return trainingen.map(async (training, index) => {
      const lessen = await getLessen(training.lessen);

      return (
        <div key={index} className="flex flex-col text-left max-w-[50rem]">
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
            <div className="flex flex-col sm:flex-row gap-1 justify-start sm:gap-5 w-full items-center">
              <h4 className="text-center text-primary mr-4%">
                <span className="text-[18px] mr-1 opacity-60 text-black">
                  Totaal:
                </span>
                {"€" + training.prijs.toFixed(2)}
              </h4>

              <form>
                <button
                  className="hover:cursor-pointer flex justify-center items-center h-[4rem] min-w-[12rem] 
                          rounded-md shadow-sm hover:shadow-md text-white bg-primary hover:scale-[101%]"
                >
                  <p className="text-[15px] uppercase font-bold">
                    Bestel training {">"}
                  </p>
                </button>
              </form>
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
      );
    });
  }
}
