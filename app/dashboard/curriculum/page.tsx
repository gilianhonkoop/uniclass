import EditEntry from "@/components/modals/EditEntry";
import DeleteEntry from "@/components/modals/DeleteEntry";
import AddEntry from "@/components/modals/AddEntry";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

async function getUniversiteiten() {
  "use server";

  const supabase = createClient();
  const { data, error } = await supabase
    .from("universiteiten")
    .select()
    .order("id", { ascending: true });

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
    .order("id", { ascending: true });

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
    .order("id", { ascending: true });

  if (data == null) {
    return [];
  }

  return data;
}

export default async function Curriculum({
  searchParams,
}: {
  searchParams: { uni: number; studie: number };
}) {
  const universiteiten: any[] = await getUniversiteiten();
  var studies: any[] | null = null;
  var vakken: any[] | null = null;

  if (searchParams.uni) {
    studies = await getStudies(searchParams.uni);
  }

  if (searchParams.studie) {
    vakken = await getVakken(searchParams.studie);
  }

  return (
    <div className="flex flex-row px-6 py-5 gap-6 h-fit">
      <div className="flex flex-1 flex-col">
        <p className="text-center text-xl mb-5 w-full">Universiteiten:</p>
        {universiteiten.map((uni, index) => {
          return (
            <form
              key={index}
              action={async () => {
                "use server";
                return redirect("/dashboard/curriculum?uni=" + uni.id);
              }}
            >
              <button
                key={index}
                className="flex f&studie=2lex-row flex hover:border rounded p-1 w-full"
              >
                <div className="mr-auto">{uni.naam}</div>
                <EditEntry
                  database="universiteiten"
                  naam={uni.naam}
                  id={uni.id}
                  header="universiteit"
                />
                <DeleteEntry database="universiteiten" id={uni.id} />
              </button>
            </form>
          );
        })}
        <AddEntry
          database="universiteiten"
          text={"universiteit"}
          uni_id={0}
          studie_id={0}
        />
      </div>
      <div className="flex flex-1 flex-col">
        <p className="text-center text-xl mb-5 w-full">Studies:</p>
        {studies &&
          studies.length > 0 &&
          studies!.map((studie, index) => {
            return (
              <form
                key={index}
                action={async () => {
                  "use server";
                  return redirect(
                    "/dashboard/curriculum?uni=" +
                      searchParams.uni +
                      "&studie=" +
                      studie.id,
                  );
                }}
              >
                <button
                  key={index}
                  className="flex flex-row flex hover:border rounded p-1 w-full"
                >
                  <div className="mr-auto">{studie.naam}</div>
                  <EditEntry
                    database="studies"
                    naam={studie.naam}
                    id={studie.id}
                    header="studie"
                  />
                  <DeleteEntry database="studies" id={studie.id} />
                </button>
              </form>
            );
          })}
        {studies && studies.length == 0 && (
          <p className="text-center w-full">Er zijn momenteel geen studies</p>
        )}
        <AddEntry
          database="studies"
          text={"studie"}
          uni_id={searchParams.uni}
          studie_id={0}
        />
      </div>
      <div className="flex flex-1 flex-col">
        <p className="text-center text-xl mb-5 w-full">Vakken:</p>
        {vakken &&
          vakken.length > 0 &&
          vakken!.map((vak, index) => {
            return (
              <div
                key={index}
                className="flex flex-row flex hover:border rounded p-1"
              >
                <div className="mr-auto">{vak.naam}</div>
                <EditEntry
                  database="vakken"
                  naam={vak.naam}
                  id={vak.id}
                  header="vak"
                />
                <DeleteEntry database="vakken" id={vak.id} />
              </div>
            );
          })}
        {vakken && vakken.length == 0 && (
          <p className="text-center w-full">Er zijn momenteel geen vakken</p>
        )}
        <AddEntry
          database="vakken"
          text={"vak"}
          uni_id={searchParams.uni}
          studie_id={searchParams.studie}
        />
      </div>
    </div>
  );
}
