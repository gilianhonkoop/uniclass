"use client";

import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";

const talen = ["nederlands", "engels"];
const statussen = ["unpublished", "active", "expired", "deleted"];

export default function AddTraining({
  uni_id,
  studie_id,
  vak_id,
}: {
  uni_id: number;
  studie_id: number;
  vak_id: number;
}) {
  const router = useRouter();

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const addEntry = async (formData: FormData) => {
    const naam = formData.get("naam") as string;
    const omschrijving = formData.get("omschrijving") as string;
    const prijs = formData.get("prijs") as string;
    const plaatsen = formData.get("plaatsen") as string;
    const docent = formData.get("docent") as string;
    const taal = formData.get("taal") as string;

    if (uni_id && studie_id && vak_id) {
      const supabase = createClient();
      const { error } = await supabase.from("trainingen").insert({
        naam: naam,
        omschrijving: omschrijving,
        prijs: prijs,
        plaatsen: plaatsen,
        docent: docent,
        taal: taal,
        universiteit_id: uni_id,
        studie_id: studie_id,
        vak_id: vak_id,
      });

      return router.refresh();
    }

    //TODO manuall add uni study course
    return;
  };

  return (
    <>
      <div
        onClick={onOpen}
        className="text-center text-cgreen text-center text-md w-full hover:cursor-pointer"
      >
        Toevoegen
      </div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 items-center">
                Toevoegen
              </ModalHeader>
              <form>
                <ModalBody>
                  <input
                    name="naam"
                    className="p-2 border-2 rounded-md border-grey-600"
                    placeholder={"Naam"}
                    type="text"
                    autoComplete="off"
                    required
                  ></input>
                  <textarea
                    name="omschrijving"
                    className="p-2 border-2 rounded-md border-grey-600 max-h-fit h-[15rem]"
                    placeholder={"Omschrijving"}
                    autoComplete="off"
                    required
                  ></textarea>
                  <input
                    name="prijs"
                    className="p-2 border-2 rounded-md border-grey-600"
                    placeholder={"Prijs (punt geen komma)"}
                    type="text"
                    autoComplete="off"
                    required
                  ></input>
                  <input
                    name="plaatsen"
                    className="p-2 border-2 rounded-md border-grey-600"
                    placeholder={"Aantal plaatsen"}
                    type="number"
                    autoComplete="off"
                    required
                  ></input>
                  <input
                    name="docent"
                    className="p-2 border-2 rounded-md border-grey-600"
                    placeholder={"docent"}
                    type="text"
                    autoComplete="off"
                    required
                  ></input>
                  <select
                    name="taal"
                    className="p-2 border-2 rounded-md border-grey-600 bg-white w-full"
                    autoComplete="off"
                    defaultValue="nederlands"
                  >
                    {talen.map((taal, index) => {
                      return (
                        <option value={taal} key={index}>
                          {taal}
                        </option>
                      );
                    })}
                  </select>
                  <select
                    name="status"
                    className="p-2 border-2 rounded-md border-grey-600 bg-white w-full"
                    autoComplete="off"
                    defaultValue="unpublished"
                  >
                    {statussen.map((status, index) => {
                      return (
                        <option value={status} key={index}>
                          {status}
                        </option>
                      );
                    })}
                  </select>
                </ModalBody>
                <ModalFooter className="flex flex-row justify-center">
                  <Button color="danger" variant="light" onPress={onClose}>
                    Sluiten
                  </Button>
                  <Button
                    type="submit"
                    color="primary"
                    formAction={(event) => {
                      addEntry(event);
                      onClose();
                    }}
                  >
                    Opslaan
                  </Button>
                </ModalFooter>
              </form>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
