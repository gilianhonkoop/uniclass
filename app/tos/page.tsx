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
    <div className="w-full bg-white flex flex-col text-black">
      <Navbar setLanguage={setLanguage} />
      <section className="mt-[6rem] sm:mt-[0rem] px-[2rem] md:px-[5rem] lg:px-[15rem] w-full h-full flex items-start justify-start items-start bg-white">
        <div className="py-8 px-4 max-w-screen sm:py-16 lg:px-6 w-screen">
          <h2 className="mb-8 text-4xl tracking-tight font-normal text-gray-900">
            Algemene Voorwaarden UniClass
          </h2>
          <div className="grid pt-8 text-left border-t border-gray-200 md:gap-16">
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <h5>Artikel 1 - Definities</h5>
                <p>1.1. In deze Algemene Voorwaarden wordt verstaan onder:</p>
                <p>
                  UniClass: Het bijlesbedrijf UniClass, gevestigd te Haarlem,
                  ingeschreven bij de Kamer van Koophandel onder nummer 546269,
                  en haar rechtsopvolgers en/of gelieerde ondernemingen.
                </p>
                <p>
                  Klant: De natuurlijke persoon of rechtspersoon met wie
                  UniClass een overeenkomst aangaat voor het leveren van
                  tentamentrainingen en/of bijlesdiensten.
                </p>
                <p>
                  Overeenkomst: De schriftelijke of elektronische overeenkomst
                  tussen UniClass en de Klant met betrekking tot de levering van
                  tentamentrainingen en/of bijlesdiensten.
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <h5>Artikel 2 - Toepasselijkheid</h5>
                <p>
                  2.1. Deze Algemene Voorwaarden zijn van toepassing op alle
                  aanbiedingen, offertes, overeenkomsten en leveringen van
                  UniClass, tenzij schriftelijk anders overeengekomen.
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <h5>
                  Artikel 3 - Aanbod en Totstandkoming van de Overeenkomst
                </h5>
                <p>
                  3.1. Alle aanbiedingen en offertes van UniClass zijn
                  vrijblijvend, tenzij uitdrukkelijk anders vermeld.
                </p>
                <p>
                  3.2. De Overeenkomst komt tot stand op het moment dat de Klant
                  akkoord gaat met het aanbod van UniClass en eventuele vereiste
                  betalingen zijn ontvangen.
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <h5>Artikel 4 - Betaling</h5>
                <p>
                  4.1. De Klant dient de verschuldigde betalingen conform het
                  overeengekomen tarief en betalingsvoorwaarden van UniClass te
                  voldoen.
                </p>
                <p>
                  4.2. Bij niet-tijdige betaling is de Klant van rechtswege in
                  verzuim en is UniClass gerechtigd om verdere dienstverlening
                  op te schorten of de Overeenkomst te ontbinden.
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <h5>Artikel 5 - Annulering en Terugbetaling</h5>
                <p>
                  5.1. Annulering van tentamentrainingen en/of bijlesdiensten
                  dient schriftelijk te geschieden conform de door UniClass
                  gestelde voorwaarden.
                </p>
                <p>
                  5.2. Bij annulering kunnen kosten in rekening worden gebracht
                  conform de annuleringsvoorwaarden van UniClass.
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <h5>Artikel 6 - Aansprakelijkheid</h5>
                <p>
                  6.1. UniClass is niet aansprakelijk voor enige directe of
                  indirecte schade voortvloeiend uit de dienstverlening, tenzij
                  sprake is van opzet of grove nalatigheid van UniClass.
                </p>
                <p>
                  6.2. De aansprakelijkheid van UniClass is in ieder geval
                  beperkt tot het bedrag dat in het desbetreffende geval onder
                  de aansprakelijkheidsverzekering van UniClass wordt
                  uitgekeerd.
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <h5>Artikel 7 - Intellectueel Eigendom</h5>
                <p>
                  7.1. Alle rechten van intellectueel eigendom met betrekking
                  tot de door UniClass verstrekte materialen en content blijven
                  eigendom van UniClass.
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <h5>Artikel 8 - Toepasselijk recht en Geschillen</h5>
                <p>
                  8.1. Op de Overeenkomst en deze Algemene Voorwaarden is
                  Nederlands recht van toepassing.
                </p>
                <p>
                  8.2. Geschillen tussen UniClass en de Klant worden bij
                  uitsluiting voorgelegd aan de bevoegde rechter te Amsterdam.
                </p>
              </div>
              <p>
                Deze Algemene Voorwaarden is voor het laatst bijgewerkt op
                03-07-2024.
              </p>
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
