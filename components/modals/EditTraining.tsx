"use client";

import pen from "@/icons/pen.png";
import Image from "next/image";
import { createClient } from "@/utils/supabase/client";
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

export default function EditTraining({ training }: { training: any }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const editEntry = async (formData: FormData) => {
    const naam = formData.get("naam") as string;
    const omschrijving = formData.get("omschrijving") as string;
    const prijs = formData.get("prijs") as string;
    const plaatsen = formData.get("plaatsen") as string;
    const docent = formData.get("docent") as string;
    const taal = formData.get("taal") as string;
    const status = formData.get("status") as string;
    let rank = formData.get("rank") as number | null;
    if (rank == null) {
      rank = -1;
    }

    const supabase = createClient();
    const { error } = await supabase
      .from("trainingen")
      .update({
        naam: naam,
        omschrijving: omschrijving,
        prijs: prijs,
        plaatsen: plaatsen,
        docent: docent,
        taal: taal,
        status: status,
        rank: rank,
      })
      .eq("id", training.id);
    //TODO manuall add uni study course individually
    return;
  };

  return (
    <>
      <Image
        src={pen}
        className="hover:cursor-pointer h-[24px] w-auto mr-2"
        alt="edit"
        width={20}
        height={20}
        onClick={onOpen}
      />
      <Modal
        size="2xl"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        scrollBehavior="outside"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 items-center">
                Wijzigen
              </ModalHeader>
              <form>
                <ModalBody className="flex flex-col gap-0 ">
                  <p>titel</p>
                  <input
                    name="naam"
                    className="p-2 border-2 rounded-md border-grey-600"
                    defaultValue={training.naam}
                    type="text"
                    autoComplete="off"
                    required
                  ></input>
                  <p className="mt-2">omschrijving</p>
                  <textarea
                    name="omschrijving"
                    className="p-2 border-2 rounded-md border-grey-600 max-h-fit h-[15rem]"
                    defaultValue={training.omschrijving}
                    autoComplete="off"
                    required
                  ></textarea>
                  <p className="mt-2">prijs</p>
                  <input
                    name="prijs"
                    id="prijs"
                    className="p-2 border-2 rounded-md border-grey-600"
                    defaultValue={training.prijs.toFixed(2)}
                    type="text"
                    autoComplete="off"
                    required
                  ></input>
                  <p className="mt-2">plaatsen</p>
                  <input
                    name="plaatsen"
                    className="p-2 border-2 rounded-md border-grey-600"
                    defaultValue={training.plaatsen}
                    type="number"
                    autoComplete="off"
                    required
                  ></input>
                  <p className="mt-2">docent</p>
                  <input
                    name="docent"
                    className="p-2 border-2 rounded-md border-grey-600"
                    defaultValue={training.docent}
                    type="text"
                    autoComplete="off"
                    required
                  ></input>
                  <p className="mt-2">rank</p>
                  <input
                    name="rank"
                    className="p-2 border-2 rounded-md border-grey-600"
                    defaultValue={training.rank}
                    type="text"
                    autoComplete="off"
                    required
                  ></input>
                  <p className="mt-2">taal</p>
                  <select
                    name="taal"
                    className="p-2 border-2 rounded-md border-grey-600 bg-white w-full"
                    autoComplete="off"
                    defaultValue={training.taal}
                  >
                    {talen.map((taal, index) => {
                      return (
                        <option value={taal} key={index}>
                          {taal}
                        </option>
                      );
                    })}
                  </select>
                  <p className="mt-2">status</p>
                  <select
                    name="status"
                    className="p-2 border-2 rounded-md border-grey-600 bg-white w-full"
                    autoComplete="off"
                    defaultValue={training.status}
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
                    formAction={async (event) => {
                      onClose();
                      await editEntry(event);
                      window.location.reload();
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
