"use client";

import { createClient } from "@/utils/supabase/client";
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
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
          className="text-black"
          defaultItems={inputUniversiteiten}
          variant="bordered"
          label={unilabel}
          classNames={{
            base: "max-w-xs",
            listboxWrapper: "",
            listbox: "",
            popoverContent: "rounded-md",
          }}
          inputProps={{
            classNames: {
              input: "",
              inputWrapper:
                "rounded-md border-medium-400 data-[hover=true]:border-test-primary group-data-[focus=true]:border-test-primary",
              label: "",
            },
          }}
          defaultSelectedKey={`${currUniversiteitId}`}
          onInputChange={(text) => {
            setUniversiteit(text);
            setStudie("");
            setVak("");
          }}
          onSelectionChange={async (key) => {
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
            >
              {uni.naam}
            </AutocompleteItem>
          )}
        </Autocomplete>
        {universiteit != "" && (
          <Autocomplete
            className="text-black"
            defaultItems={studies}
            variant="bordered"
            label={opleidinglabel}
            classNames={{
              base: "max-w-xs",
              listboxWrapper: "",
              listbox: "",
              popoverContent: "rounded-md",
            }}
            inputProps={{
              classNames: {
                input: "",
                inputWrapper:
                  "rounded-md border-medium4-00 data-[hover=true]:border-primary group-data-[focus=true]:border-primary",
                label: "",
              },
            }}
            defaultSelectedKey={`${currStudieId}`}
            onInputChange={(text) => {
              setStudie(text);
              setVak("");
            }}
            onSelectionChange={async (key) => {
              let k = key as number;
              if (key != null) {
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
              >
                {studie.naam}
              </AutocompleteItem>
            )}
          </Autocomplete>
        )}
        {universiteit == "" && (
          <Autocomplete
            className="text-black"
            defaultItems={studies}
            isDisabled
            variant="bordered"
            label={opleidinglabel}
            classNames={{
              base: "max-w-xs",
              listboxWrapper: "",
              listbox: "",
              popoverContent: "rounded-md",
            }}
            inputProps={{
              classNames: {
                input: "",
                inputWrapper:
                  "rounded-md border-medium4-00 data-[hover=true]:border-primary group-data-[focus=true]:border-primary",
                label: "",
              },
            }}
            onInputChange={(value) => {
              setStudie(value);
            }}
          >
            <AutocompleteItem key={0} className="text-black">
              b
            </AutocompleteItem>
          </Autocomplete>
        )}
        {studie != "" && (
          <Autocomplete
            className="text-black"
            defaultItems={vakken}
            variant="bordered"
            label={vaklabel}
            classNames={{
              base: "max-w-xs",
              listboxWrapper: "",
              listbox: "",
              popoverContent: "rounded-md",
            }}
            inputProps={{
              classNames: {
                input: "",
                inputWrapper:
                  "rounded-md border-medium4-00 data-[hover=true]:border-test-primary group-data-[focus=true]:border-primary",
                label: "",
              },
            }}
            defaultSelectedKey={`${currVakId}`}
            onInputChange={(value) => {
              setVak(value);
            }}
          >
            {(vak) => (
              <AutocompleteItem
                className="text-black"
                key={vak.id}
                value={vak.id}
              >
                {vak.naam}
              </AutocompleteItem>
            )}
          </Autocomplete>
        )}
        {studie == "" && (
          <Autocomplete
            className="text-black"
            defaultItems={vakken}
            variant="bordered"
            label={vaklabel}
            classNames={{
              base: "max-w-xs",
              listboxWrapper: "",
              listbox: "",
              popoverContent: "rounded-md",
            }}
            inputProps={{
              classNames: {
                input: "",
                inputWrapper:
                  "rounded-md border-medium4-00 data-[hover=true]:border-primary group-data-[focus=true]:border-primary",
                label: "",
              },
            }}
            isDisabled
          >
            <AutocompleteItem className="text-black" key={0}>
              a
            </AutocompleteItem>
          </Autocomplete>
        )}
        <Link
          style={{
            pointerEvents: vak == "" ? "none" : "auto",
          }}
          aria-disabled={vak == ""}
          tabIndex={vak == "" ? -1 : undefined}
          href={
            "/" +
            universiteit.replace(/\s+/g, "-") +
            "/" +
            studie.replace(/\s+/g, "-") +
            "/" +
            vak.replace(/\s+/g, "-")
          }
          className="hover:cursor-pointer flex justify-center items-center h-[4rem] min-w-[16rem] lg:min-w-[15vw] 
        rounded-sm shadow-sm hover:shadow-md text-white bg-test2-orange hover:scale-[102%] text-center md:mt-0 mt-[1.5rem]
        transition"
        >
          {language == "nl" && (
            <p className="text-[15px] uppercase font-bold">Bekijk trainingen</p>
          )}
          {language == "en" && (
            <p className="text-[15px] uppercase font-bold">Search training</p>
          )}
        </Link>
      </div>
    </div>
  );
}
