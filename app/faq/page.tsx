import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/Footer";
import { cookies } from "next/headers";
import Link from "next/link";

export default function Page() {
  var language = "nl";

  async function setLanguage(language: string) {
    "use server";

    cookies().set("language", language);
  }

  return (
    <div className="bg-white min-h-[screen]">
      <Navbar setLanguage={setLanguage} />
      <section className="px-[2rem] md:px-[5rem] xl:px-[15rem] w-full mt-[6rem] sm:mt-[0rem] flex items-center justify-center">
        <div className="py-8 px-4 mx-auto max-w-screen sm:py-16 xl:px-6">
          <h2 className="mb-8 text-4xl tracking-tight font-normal text-gray-900">
            Frequently asked questions
          </h2>
          <div className="grid pt-8 text-left border-t border-gray-200 md:gap-16 md:grid-cols-2 hover:cursor-default">
            <div>
              <div className="mb-10">
                <h3 className="flex items-center mb-4 text-xl font-medium text-gray-900">
                  <svg
                    className="flex-shrink-0 mr-2 w-5 h-5 text-gray-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  What subjects are covered in your training courses?
                </h3>
                <p className="text-gray-500">
                  We offer courses tailored to different universities and fields
                  of study. To find out which courses are available, please
                  visit our website{" "}
                  <Link className="text-primary-600" href={"/"}>
                    www.uniclass.nl
                  </Link>
                  . If you're interested in a course that's not listed, feel
                  free to reach out to us, and we'll explore options to assist
                  you.
                </p>
              </div>
              <div className="mb-10">
                <h3 className="flex items-center mb-4 text-xl font-medium text-gray-900">
                  <svg
                    className="flex-shrink-0 mr-2 w-5 h-5 text-gray-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  What does the content of a training course entail?
                </h3>
                <p className="text-gray-500">
                  Our training courses are designed for your teacher to delve
                  into the core concepts of your subject. You'll also practise
                  the material with exam-style questions. Ample opportunities
                  will be provided for you to seek clarifications and ask
                  questions.
                </p>
              </div>
              <div className="mb-10">
                <h3 className="flex items-center mb-4 text-xl font-medium text-gray-900">
                  <svg
                    className="flex-shrink-0 mr-2 w-5 h-5 text-gray-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  How much time is allocated for each lesson?
                </h3>
                <p className="text-gray-500">
                  Typically, each lesson spans approximately four hours. For
                  precise session durations, refer to the course page on our
                  website.
                </p>
              </div>
              <div className="mb-10">
                <h3 className="flex items-center mb-4 text-xl font-medium text-gray-900">
                  <svg
                    className="flex-shrink-0 mr-2 w-5 h-5 text-gray-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  Will you offer courses for exam retakes?
                </h3>
                <p className="text-gray-500">
                  Certainly, we will publish information about courses available
                  for retakes before the relevant exam retake period begins.
                </p>
              </div>
            </div>
            <div>
              <div className="mb-10">
                <h3 className="flex items-center mb-4 text-xl font-medium text-gray-900">
                  <svg
                    className="flex-shrink-0 mr-2 w-5 h-5 text-gray-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  Is it possible to enrol in an ongoing course?
                </h3>
                <p className="text-gray-500">
                  Yes, if you're interested in joining a course that's already
                  in progress, please send an email to{" "}
                  <span className="text-primary-600 hover:underline hover:cursor-text">
                    {" "}
                    info@uniclass.nl{" "}
                  </span>
                  to inquire about available slots. Regardless of when you join
                  the course, the full fee will apply.
                </p>
              </div>
              <div className="mb-10">
                <h3 className="flex items-center mb-4 text-xl font-medium text-gray-900">
                  <svg
                    className="flex-shrink-0 mr-2 w-5 h-5 text-gray-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  Can I receive one-on-one tutoring?
                </h3>
                <p className="text-gray-500">
                  Feel free to contact us via email, and we can check the
                  availability of individual tutoring sessions with the teacher.
                </p>
                <p className="text-gray-500">
                  You can use this version for any purposes, because it is
                  open-source under the MIT license.
                </p>
              </div>
              <div className="mb-10">
                <h3 className="flex items-center mb-4 text-xl font-medium text-gray-900">
                  <svg
                    className="flex-shrink-0 mr-2 w-5 h-5 text-gray-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  Where should I address my complaints?
                </h3>
                <p className="text-gray-500">
                  To lodge a complaint, please send an email to{" "}
                  <span className="text-primary-600 hover:underline hover:cursor-text">
                    {" "}
                    info@uniclass.nl{" "}
                  </span>
                  . We are committed to addressing your concerns in a timely
                  manner.
                </p>
              </div>
            </div>
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
