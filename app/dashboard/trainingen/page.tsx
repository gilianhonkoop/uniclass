import { createClient } from "@/utils/supabase/server";
import SearchTraining from "@/components/search/SearchTraining";
import AddTraining from "@/components/modals/AddTraining";
import TrainingTable from "@/components/tables/TrainingTable";
import ShowDeleted from "@/components/search/ShowDeleted";
import {
  getStudies,
  getVakken,
  getUniversiteiten,
} from "@/utils/functions/search";

async function getAllLessen() {
  const supabase = createClient();
  const { data, error } = await supabase.from("lessen").select();

  if (data == null) {
    return [];
  }

  return data;
}

async function getTrainingen(
  uniId: number | undefined,
  studieId: number | undefined,
  vakId: number | undefined,
  getDeleted: string | undefined,
) {
  "use server";

  if (uniId && studieId && vakId) {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("trainingen")
      .select()
      .eq("universiteit_id", uniId)
      .eq("studie_id", studieId)
      .eq("vak_id", vakId)
      .neq("status", getDeleted)
      .order("id", { ascending: false });

    return data;
  }

  if (uniId && studieId) {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("trainingen")
      .select()
      .eq("universiteit_id", uniId)
      .neq("status", getDeleted)
      .eq("studie_id", studieId)
      .order("id", { ascending: false });

    return data;
  }

  if (uniId) {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("trainingen")
      .select()
      .neq("status", getDeleted)
      .eq("universiteit_id", uniId)
      .order("id", { ascending: false });

    return data;
  }

  return [];
}

export default async function Trainingen({
  searchParams,
}: {
  searchParams: {
    uniId: number;
    studieId: number;
    vakId: number;
    showDeleted: string | undefined;
  };
}) {
  var universiteiten: any[] = await getUniversiteiten();
  let studies: any[] | null = null;
  let vakken: any[] | null = null;
  let showDeleted: string;
  let trainingen: any[] | null = null;
  let lessen: any[] = await getAllLessen();

  if (searchParams.showDeleted == "true") {
    showDeleted = "";
  } else {
    showDeleted = "deleted";
  }

  if (searchParams.uniId) {
    trainingen = await getTrainingen(
      searchParams.uniId,
      searchParams.studieId,
      searchParams.vakId,
      showDeleted,
    );

    if (trainingen == null) {
      trainingen = [];
    }
  } else {
    trainingen = [];
    lessen = [];
  }
  //TODO only retrieve used columns

  if (searchParams.uniId) {
    studies = await getStudies(searchParams.uniId);
  } else {
    studies = [];
  }

  if (searchParams.studieId) {
    vakken = await getVakken(searchParams.studieId);
  } else {
    vakken = [];
  }

  return (
    <div className="h-screen">
      <div className="h-[6rem] flex flex-row items-center gap-10 px-10 justify-evenly">
        <SearchTraining
          universiteiten={universiteiten}
          studies={studies}
          vakken={vakken}
          uniId={searchParams.uniId}
          studieId={searchParams.studieId}
        />
        <div className="flex my-[1rem]">
          <ShowDeleted />
        </div>
        <div className="h-fit">
          <AddTraining
            uni_id={searchParams.uniId}
            studie_id={searchParams.studieId}
            vak_id={searchParams.vakId}
          />
        </div>
      </div>

      <div className="w-full h-full py-5 px-8 flex flex-col">
        <TrainingTable trainingen={trainingen} lessen={lessen} />
      </div>
    </div>
  );
}
