import Link from "next/link";

export default function Page({ language }: { language: any }) {
  return (
    <footer className="w-full p-8 flex flex-col items-center justify-center text-center bg-primary-orange gap-[3vh]">
      <div className="max-w-2xl w-full h-[10rem] pt-[4rem] flex items-start justify-evenly">
        <ul className="flex flex-col max-w-[251px] w-full font-light">
          {language == "nl" && (
            <>
              <li className="mb-2 font-normal hover:cursor-default">
                <span className="border-b-2 border-primary-black">
                  Informatie
                </span>
              </li>
              <li className="hover:underline hover:cursor-pointer">
                <Link href="/privacy">Privacy beleid</Link>
              </li>
              <li className="hover:underline hover:cursor-pointer">
                <Link href="/tos">Algemene voorwaarden</Link>
              </li>
            </>
          )}
          {language == "en" && (
            <>
              <li className="mb-2 font-normal hover:cursor-default">
                <span className="border-b-2 border-primary-black">
                  Information
                </span>
              </li>
              <li className="hover:underline hover:cursor-pointer">
                <Link href="/privacy">Privacy statement</Link>
              </li>
              <li className="hover:underline hover:cursor-pointer">
                <Link href="/tos">Terms of Service</Link>
              </li>
            </>
          )}
        </ul>
        <ul className="flex flex-col max-w-[251px] w-full font-light">
          <li className="mb-2 font-normal">
            {/* <span className="border-b-2 border-primary-black">Contact</span> */}
            <Link className="border-b-2 border-primary-black" href="/contact">
              Contact
            </Link>
          </li>
          <li className="hover:underline">info@uniclass.nl</li>
        </ul>
      </div>
      <p className="text-[16px] text-white hover:cursor-default">
        Copyright © UniClass 2024
      </p>
    </footer>
  );
}
