import { createClient } from "@/utils/supabase/server";
import SearchTraining from "@/components/search/SearchTraining";
import AddTraining from "@/components/modals/AddTraining";
import TrainingTable from "@/components/tables/TrainingTable";

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

async function getStudies(id: number) {
  "use server";

  const supabase = createClient();
  const { data, error } = await supabase
    .from("studies")
    .select()
    .eq("universiteit_id", id)
    .order("id", { ascending: false });

  if (data == null) {
    return [];
  }

  return data;
}

async function getVakken(id: number) {
  "use server";

  const supabase = createClient();
  const { data, error } = await supabase
    .from("vakken")
    .select()
    .eq("studie_id", id)
    .order("id", { ascending: false });

  if (data == null) {
    return [];
  }

  return data;
}

async function getTrainingen(
  uniId: number | undefined,
  studieId: number | undefined,
  vakId: number | undefined,
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
      .order("id", { ascending: false });

    return data;
  }

  if (uniId && studieId) {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("trainingen")
      .select()
      .eq("universiteit_id", uniId)
      .eq("studie_id", studieId)
      .order("id", { ascending: false });

    return data;
  }

  if (uniId) {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("trainingen")
      .select()
      .eq("universiteit_id", uniId)
      .order("id", { ascending: false });

    return data;
  }

  return [];
}

export default async function Trainingen({
  searchParams,
}: {
  searchParams: { uniId: number; studieId: number; vakId: number };
}) {
  var universiteiten: any[] = [];
  universiteiten = await getUniversiteiten();
  let studies: any[] | null = null;
  let vakken: any[] | null = null;

  //TODO only retrieve used columns
  let trainingen: any[] | null = null;
  trainingen = await getTrainingen(
    searchParams.uniId,
    searchParams.studieId,
    searchParams.vakId,
  );

  if (trainingen == null) {
    trainingen = [];
  }

  if (searchParams.uniId) {
    studies = await getStudies(searchParams.uniId);
  }

  if (searchParams.studieId) {
    vakken = await getVakken(searchParams.studieId);
  }

  return (
    <div className="h-screen">
      <div className="h-[6rem] flex flex-row items-center gap-10 px-20">
        <SearchTraining
          universiteiten={universiteiten}
          studies={studies}
          vakken={vakken}
          uniId={searchParams.uniId}
          studieId={searchParams.studieId}
        />
        <div className="h-fit mr-10">
          <AddTraining
            uni_id={searchParams.uniId}
            studie_id={searchParams.studieId}
            vak_id={searchParams.vakId}
          />
        </div>
      </div>
      <div className="w-full h-full py-5 px-8 flex flex-col">
        <TrainingTable trainingen={trainingen} />
      </div>
    </div>
  );
}
