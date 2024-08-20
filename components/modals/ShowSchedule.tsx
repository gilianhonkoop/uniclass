"use client";

import Image from "next/image";
import { createClient } from "@/utils/supabase/client";
import { useState } from "react";
import schedule from "@/icons/schedule.svg";
import { useRouter } from "next/navigation";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
  ModalFooter,
  Button,
} from "@nextui-org/react";

async function getLessen(lessen: number[]) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("lessen")
    .select()
    .in("id", lessen)
    .order("id", { ascending: true });

  if (error) {
    return [];
  }

  return data;
}

async function getLokalen() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("lokalen")
    .select()
    .order("id", { ascending: true });

  if (error) {
    return [];
  }

  return data;
}

export default function ShowUsers({ training }: { training: any }) {
  const router = useRouter();

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [lessen, setLessen] = useState<any[]>([]);
  const [lokalen, setLokalen] = useState<any[]>([]);

  const verwijderLes = async (les_id: number) => {
    training.lessen.splice(training.lessen.indexOf(les_id), 1);

    const supabase = createClient();
    await supabase.from("lessen").delete().eq("id", les_id);

    const { error } = await supabase
      .from("trainingen")
      .update({ lessen: training.lessen })
      .eq("id", training.id);

    return router.refresh();
  };

  const editLes = async (formData: FormData, les_id: number) => {
    const naam = formData.get("naam") as string;
    const lokaal_id = formData.get("lokaal") as string;
    let begin = formData.get("begin") as string | null;
    let eind = formData.get("eind") as string | null;

    if (!begin) {
      begin = null;
    }
    if (!eind) {
      eind = null;
    }

    const supabase = createClient();

    if (les_id == -1) {
      var { error } = await supabase.from("lessen").insert({
        naam: naam,
        lokaal_id: lokaal_id,
        begin: begin,
        eind: eind,
      });

      var { data, error } = await supabase
        .from("lessen")
        .select("id")
        .order("id", { ascending: false })
        .limit(1);

      training.lessen.push(data![0].id);

      var { error } = await supabase
        .from("trainingen")
        .update({
          lessen: training.lessen,
        })
        .eq("id", training.id);
    } else {
      const { error } = await supabase
        .from("lessen")
        .update({
          naam: naam,
          lokaal_id: lokaal_id,
          begin: begin,
          eind: eind,
        })
        .eq("id", les_id);
    }

    return router.refresh();
  };

  return (
    <>
      <Image
        src={schedule}
        className="hover:cursor-pointer h-[24px] w-auto mr-2"
        alt="edit"
        width={20}
        height={20}
        onClick={async () => {
          setLessen(await getLessen(training.lessen));
          setLokalen(await getLokalen());
          onOpen();
        }}
      />
      <Modal
        scrollBehavior="inside"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="xl"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 items-center">
                Lessen
              </ModalHeader>
              <ModalBody className="flex flex-col ">
                <div
                  onClick={() => {
                    const les = {
                      id: -1,
                      naam: null,
                      lokaal_id: null,
                      begin: null,
                      eind: null,
                    };
                    let newlessen = lessen.concat();
                    newlessen.push(les);
                    setLessen(newlessen);
                    // router.refresh();
                  }}
                  className="my-5 text-center text-cgreen text-center text-md w-full hover:cursor-pointer"
                >
                  Les toevoegen
                </div>
                {lessen.length > 0 &&
                  lessen.map((les, index) => {
                    return (
                      <form key={index} className="w-full h-fit mb-5">
                        <p className="font-bold ">Training {index + 1}:</p>
                        <input
                          name="naam"
                          className="p-2 border-2 rounded-md border-grey-600 w-full"
                          defaultValue={les.naam}
                          type="text"
                          autoComplete="off"
                          required
                        ></input>
                        <select
                          name="lokaal"
                          className="p-2 border-2 rounded-md border-grey-600 w-full bg-white"
                          autoComplete="off"
                          defaultValue={les.lokaal_id}
                        >
                          {lokalen.map((lokaal, index) => {
                            return (
                              <option value={lokaal.id} key={index}>
                                {lokaal.naam}
                              </option>
                            );
                          })}
                        </select>
                        <input
                          name="begin"
                          className="p-2 border-2 rounded-md border-grey-600 w-full"
                          type="datetime-local"
                          defaultValue={les.begin?.slice(0, -6)}
                        ></input>
                        <input
                          name="eind"
                          className="p-2 border-2 rounded-md border-grey-600 w-full"
                          type="datetime-local"
                          defaultValue={les.eind?.slice(0, -6)}
                        ></input>
                        <div className="w-full flex justify-evenly">
                          <Button
                            type="submit"
                            color="primary"
                            className="mt-4"
                            formAction={(event) => {
                              editLes(event, les.id);
                              if (les.id == -1) {
                                les.id = -2;
                              }
                              onClose();
                            }}
                          >
                            Opslaan
                          </Button>
                          <Button
                            type="submit"
                            color="danger"
                            variant="solid"
                            className="mt-4"
                            formAction={(event) => {
                              if (les.id >= 0) {
                                verwijderLes(les.id);
                              }
                              onClose();
                            }}
                          >
                            Verwijderen
                          </Button>
                        </div>
                      </form>
                    );
                  })}
                {!lessen && (
                  <div className="flex flex-row text-center h-[3rem]">
                    <p>Network Error</p>
                  </div>
                )}
              </ModalBody>
              <ModalFooter className="flex flex-row justify-center">
                <Button color="danger" variant="light" onPress={onClose}>
                  Sluiten
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
