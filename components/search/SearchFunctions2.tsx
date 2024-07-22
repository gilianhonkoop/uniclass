import SearchBox2 from "./SearchBox2";
import { getUniversiteiten } from "@/utils/functions/search";
import { getStudies } from "@/utils/functions/search";
import { getVakken } from "@/utils/functions/search";

export default async function SearchFunctions({
  language,
  uniId,
  studieId,
  vakId,
  empty,
}: {
  language: string;
  uniId: string;
  studieId: string;
  vakId: string;
  empty: boolean;
}) {
  var universiteiten = await getUniversiteiten();

  if (uniId != "-1") {
    var studies = await getStudies(uniId);
    var vakken = await getVakken(studieId!);
  }

  if (!empty) {
    return (
      <SearchBox2
        language={language}
        inputUniversiteiten={universiteiten}
        inputStudies={studies!}
        inputVakken={vakken!}
        currUniversiteit={uniId}
        currStudie={studieId}
        currVak={vakId}
        currUniversiteitId={uniId}
        currStudieId={studieId}
        currVakId={vakId}
      />
    );
  } else {
    return (
      <SearchBox2
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
    );
  }
}
