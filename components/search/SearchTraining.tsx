"use client";

import { Select, SelectItem } from "@nextui-org/react";
import { useRouter } from "next/navigation";

export default function SearchTraining({
  universiteiten,
  studies,
  vakken,
  uniId,
  studieId,
  setUniId,
  setStudieId,
  setVakId,
}: {
  universiteiten: any[];
  studies: any[] | null;
  vakken: any[] | null;
  uniId: number;
  studieId: number;
  setUniId: Function;
  setStudieId: Function;
  setVakId: Function;
}) {
  const router = useRouter();

  return (
    <div className="max-w-[1000px] w-full flex flex-row items-center justify-center gap-6">
      <Select
        onChange={(e) => {
          if (e.target.value == "") {
            setUniId(-1);
          } else {
            setUniId(e.target.value);
          }
        }}
        items={universiteiten}
        label="Universiteit"
        className="max-w-xs"
      >
        {(uni) => (
          <SelectItem key={uni.id} value={uni.id}>
            {uni.naam}
          </SelectItem>
        )}
      </Select>

      {studies && (
        <Select
          onChange={(e) => {
            if (e.target.value == "") {
              setStudieId(-1);
            } else {
              setStudieId(e.target.value);
            }
          }}
          items={studies}
          label="Studie"
          className="max-w-xs"
        >
          {(studie) => (
            <SelectItem key={studie.id} value={studie.id}>
              {studie.naam}
            </SelectItem>
          )}
        </Select>
      )}

      {!studies && (
        <Select items={[]} isDisabled label="Studie" className="max-w-xs">
          <SelectItem key={2}>disabled</SelectItem>
        </Select>
      )}

      {vakken && (
        <Select
          onChange={(e) => {
            if (e.target.value == "") {
              setVakId(-1);
            } else {
              setVakId(e.target.value);
            }
          }}
          items={vakken}
          label="Vak"
          className="max-w-xs"
        >
          {(vak) => <SelectItem key={vak.id}>{vak.naam}</SelectItem>}
        </Select>
      )}

      {!vakken && (
        <Select items={[]} isDisabled label="Vak" className="max-w-xs">
          <SelectItem key={3}>disabled</SelectItem>
        </Select>
      )}
    </div>
  );
}
