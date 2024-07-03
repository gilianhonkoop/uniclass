import Navbar from "@/components/navigation/Navbar";
import Link from "next/link";
import Footer from "@/components/Footer";
import { cookies } from "next/headers";

export default function Page() {
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
    <div className="w-full bg-white">
      <Navbar setLanguage={setLanguage} />
      <section className="px-[2rem] md:px-[5rem] lg:px-[15rem] w-full h-[85vh] sm:h-[75vh] flex items-start justify-start items-start bg-white">
        <div className="py-8 px-4 max-w-screen sm:py-16 lg:px-6 w-screen">
          <h2 className="mb-8 text-4xl tracking-tight font-normal text-gray-900">
            Contact
          </h2>
          <div className="grid pt-8 text-left border-t border-gray-200 md:gap-16 md:grid-cols-2">
            {language == "nl" && (
              <div>
                <p className="text-gray-500 mb-5">
                  Als je nog vragen hebt, kijk eerst bij onze{" "}
                  {
                    <Link className="text-primary" href="/faq">
                      Frequently Asked Questions
                    </Link>
                  }
                </p>
                <p className="text-gray-500 mb-3">
                  {" "}
                  Nog vragen over? Stuur een mail naar:{" "}
                </p>
                <p className="text-black"> info@uniclass.nl</p>
              </div>
            )}
            {language == "en" && (
              <div>
                <p className="text-gray-500 mb-5">
                  If you have any questions, make sure to check out the{" "}
                  {
                    <Link className="text-primary" href="/faq">
                      Frequently Asked Questions
                    </Link>
                  }
                </p>
                <p className="text-gray-500 mb-3">
                  {" "}
                  Still have a question left? Feel free to reach out to us at:{" "}
                </p>
                <p className="text-black"> info@unicass.nl</p>
              </div>
            )}
          </div>
        </div>
      </section>
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
