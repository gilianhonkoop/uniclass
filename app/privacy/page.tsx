import Navbar from "@/components/navigation/Navbar";
import Link from "next/link";
import Footer from "@/components/Footer";
import { cookies } from "next/headers";
import dynamic from "next/dynamic";

const Waves = dynamic(() => import("@/components/waves/waves"), {
  loading: () => <></>,
});

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
    <div className="w-full bg-white flex flex-col text-black min-h-[screen]">
      <Navbar setLanguage={setLanguage} />
      <section className="mt-[6rem] sm:mt-[0rem] px-[2rem] md:px-[5rem] lg:px-[15rem] w-full h-full flex items-start justify-start items-start bg-white">
        <div className="py-8 px-4 max-w-screen sm:py-16 lg:px-6 w-screen">
          <h2 className="mb-8 text-4xl tracking-tight font-normal text-gray-900">
            Privacy statement
          </h2>
          <div className="grid pt-8 text-left border-t border-gray-200 md:gap-16">
            <div className="flex flex-col gap-5">
              <p>
                UniClass hecht groot belang aan de bescherming van
                persoonsgegevens en privacy. Deze Privacyverklaring beschrijft
                welke persoonsgegevens door UniClass worden verzameld en hoe
                deze worden verwerkt.
              </p>
              <div>
                <h5>Artikel 1 - Verzamelde Persoonsgegevens</h5>
                <p>
                  1.1. UniClass verzamelt persoonsgegevens van Klanten,
                  waaronder maar niet beperkt tot naam, contactgegevens en
                  betalingsinformatie.
                </p>
              </div>
              <div>
                <h5>Artikel 2 - Doeleinden van Verwerking</h5>
                <p>
                  2.1. UniClass verwerkt persoonsgegevens voor het uitvoeren van
                  de Overeenkomst, facturatie, klantenservice en communicatie.
                </p>
              </div>
              <div>
                <h5>Artikel 3 - Bewaartermijn</h5>
                <p>
                  3.1. Persoonsgegevens worden bewaard zolang als noodzakelijk
                  is voor de doeleinden waarvoor ze zijn verzameld, tenzij
                  wettelijke bewaartermijnen van toepassing zijn.
                </p>
              </div>
              <div>
                <h5>Artikel 4 - Delen van Persoonsgegevens</h5>
                <p>
                  4.1. UniClass deelt persoonsgegevens met derde partijen alleen
                  indien dit noodzakelijk is voor de uitvoering van de
                  Overeenkomst.
                </p>
              </div>
              <div>
                <h5>Artikel 5 - Beveiliging</h5>
                <p>
                  5.1. UniClass treft passende technische en organisatorische
                  maatregelen om persoonsgegevens te beveiligen tegen verlies,
                  ongeautoriseerde toegang, diefstal of misbruik.
                </p>
              </div>
              <div>
                <h5>Artikel 6 - Rechten van Betrokkenen</h5>
                <p>
                  6.1. Klanten hebben recht op inzage, correctie en verwijdering
                  van hun persoonsgegevens. Verzoeken hiertoe kunnen worden
                  ingediend via info@uniclass.nl.
                </p>
              </div>
              <div>
                <h5>Artikel 7 - Wijzigingen in de Privacyverklaring</h5>
                <p>
                  7.1. UniClass behoudt zich het recht voor om deze
                  Privacyverklaring te wijzigen. De meest recente versie van de
                  Privacyverklaring is te raadplegen via de website van
                  UniClass.
                </p>
              </div>
              <p>
                Deze Privacyverklaring is voor het laatst bijgewerkt op
                03-07-2024.
              </p>
            </div>
          </div>
        </div>
      </section>
      <Waves backgroundColor={"bg-white"} />
      <Footer language={language} />
    </div>
  );
}
