"use client";

import { createClient } from "@/utils/supabase/client";
import { Autocomplete, AutocompleteItem, listboxItem } from "@nextui-org/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

async function getStudies(id: number) {
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

export default function SearchBox({
  language,
  inputUniversiteiten,
  inputStudies,
  inputVakken,
  currUniversiteit,
  currStudie,
  currVak,
  currUniversiteitId,
  currStudieId,
  currVakId,
}: {
  language: string;
  inputUniversiteiten: any[];
  inputStudies: any[];
  inputVakken: any[];
  currUniversiteit: string;
  currStudie: string;
  currVak: string;
  currUniversiteitId: string;
  currStudieId: string;
  currVakId: string;
}) {
  const [universiteitId, setUniversiteitId] =
    useState<string>(currUniversiteitId);
  const [studieId, setStudieId] = useState<string>(currStudieId);
  const [vakId, setVakId] = useState<string>(currVakId);
  const [universiteit, setUniversiteit] = useState<string>(currUniversiteit);
  const [studie, setStudie] = useState<string>(currStudie);
  const [vak, setVak] = useState<string>(currVak);
  const [studies, setStudies] = useState<any[]>(inputStudies);
  const [vakken, setVakken] = useState<any[]>(inputVakken);

  const router = useRouter();

  let unilabel: string, opleidinglabel: string, vaklabel: string;

  if (language == "nl") {
    unilabel = "Kies universiteit";
    opleidinglabel = "Kies opleiding";
    vaklabel = "Kies vak";
  } else {
    unilabel = "Choose university";
    opleidinglabel = "Choose study";
    vaklabel = "Choose course";
  }

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <div className="w-full flex flex-col lg:flex-row justify-center items-center gap-8 text-black">
        <Autocomplete
          className="text-white"
          defaultItems={inputUniversiteiten}
          variant="bordered"
          label={unilabel}
          classNames={{
            base: "max-w-xs",
            listboxWrapper: "",
            listbox: "",
            popoverContent: "rounded-md",
            clearButton: "group-data-[hover=true]:text-white",
            selectorButton: "text-white",
          }}
          listboxProps={{ shouldFocusWrap: true }}
          inputProps={{
            classNames: {
              input: "text-md",
              inputWrapper:
                "rounded-md border-primary-darkblue bg-primary-darkblue border-[3px] data-[hover=true]:scale-[1.01]  \
                 data-[hover=true]:border-primary-darkblue group-data-[focus=true]:border-primary-darkblue h-[4rem]",
              label:
                "text-white group-data-[filled-within=true]:text-white/70 text-md",
            },
          }}
          defaultSelectedKey={`${currUniversiteitId}`}
          onInputChange={(text) => {
            setUniversiteit(text);
            setStudie("");
            setVak("");
            setStudies([]);
            setVakken([]);
          }}
          onSelectionChange={async (key) => {
            setUniversiteitId(key as string);
            let k = key as number;
            if (key != null) {
              setStudies(await getStudies(k));
              return router.refresh();
            }
          }}
        >
          {(uni) => (
            <AutocompleteItem
              className="text-black"
              key={uni.id}
              value={uni.id}
              classNames={{ title: "text-wrap" }}
            >
              {uni.naam}
            </AutocompleteItem>
          )}
        </Autocomplete>
        <Autocomplete
          className="text-white"
          defaultItems={studies}
          variant="bordered"
          label={opleidinglabel}
          // isDisabled={universiteit == ""}
          classNames={{
            base: "max-w-xs",
            listboxWrapper: "",
            listbox: "",
            popoverContent: "rounded-md",
            clearButton: "group-data-[hover=true]:text-white",
            selectorButton: "text-white",
          }}
          inputProps={{
            classNames: {
              input: "text-md",
              inputWrapper:
                "rounded-md border-primary-darkblue bg-primary-darkblue border-[3px] data-[hover=true]:scale-[1.01]  \
                 data-[hover=true]:border-primary-darkblue group-data-[focus=true]:border-primary-darkblue h-[4rem]",
              label:
                "text-white group-data-[filled-within=true]:text-white/70 text-md",
            },
          }}
          defaultSelectedKey={`${currStudieId}`}
          onInputChange={(text) => {
            setStudie(text);
            setVak("");
            setVakken([]);
          }}
          onSelectionChange={async (key) => {
            setStudieId(key as string);
            let k = key as number;
            if (key != null) {
              currStudieId = key as string;
              setVakken(await getVakken(k));
              return router.refresh();
            }
          }}
        >
          {(studie) => (
            <AutocompleteItem
              className="text-black"
              key={studie.id}
              value={studie.id}
              classNames={{ title: "text-wrap" }}
            >
              {studie.naam}
            </AutocompleteItem>
          )}
        </Autocomplete>
        <Autocomplete
          className="text-white"
          defaultItems={vakken}
          variant="bordered"
          label={vaklabel}
          // isDisabled={studie == ""}
          classNames={{
            base: "max-w-xs",
            listboxWrapper: "",
            listbox: "",
            popoverContent: "rounded-md",
            clearButton: "group-data-[hover=true]:text-white",
            selectorButton: "text-white",
          }}
          inputProps={{
            classNames: {
              input: "text-md",
              inputWrapper:
                "rounded-md border-primary-darkblue bg-primary-darkblue border-[3px] data-[hover=true]:scale-[1.01]  \
                 data-[hover=true]:border-primary-darkblue group-data-[focus=true]:border-primary-darkblue h-[4rem]",
              label:
                "text-white group-data-[filled-within=true]:text-white/70 text-md",
            },
          }}
          defaultSelectedKey={`${currVakId}`}
          onInputChange={(value) => {
            setVak(value);
          }}
          onSelectionChange={async (key) => {
            setVakId(key as string);
            if (key != null) {
              currVakId = key as string;
            }
          }}
        >
          {(vak) => (
            <AutocompleteItem
              className="text-black"
              key={vak.id}
              value={vak.id}
              classNames={{ title: "text-wrap" }}
            >
              {vak.naam}
            </AutocompleteItem>
          )}
        </Autocomplete>
        <div
          className="h-fit"
          style={{
            cursor: vak == "" ? "not-allowed" : "pointer",
          }}
        >
          <Link
            style={{
              pointerEvents: vak == "" ? "none" : "auto",
            }}
            aria-disabled={vak == ""}
            tabIndex={vak == "" ? -1 : undefined}
            href={encodeURI(
              "/training/" + universiteitId + " " + studieId + " " + vakId,
            )}
            className="hover:cursor-pointer flex justify-center items-center h-[4rem] min-w-[16rem] lg:min-w-[15vw] 
        rounded-sm shadow-sm hover:shadow-md text-white bg-primary-dark hover:scale-[102%] text-center
        transition"
          >
            {language == "nl" && (
              <p className="text-[15px] uppercase font-bold">
                Bekijk trainingen
              </p>
            )}
            {language == "en" && (
              <p className="text-[15px] uppercase font-bold">Search training</p>
            )}
          </Link>
        </div>
      </div>
    </div>
  );
}
