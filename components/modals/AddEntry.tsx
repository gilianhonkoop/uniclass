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

export default function AddEntry({
  database,
  text,
  uni_id,
  studie_id,
}: {
  database: string;
  text: string;
  uni_id: number;
  studie_id: number;
}) {
  const router = useRouter();

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const addEntry = async (formData: FormData) => {
    const nieuweEntry = formData.get("nieuweEntry") as string;

    const supabase = createClient();

    if (database == "universiteiten") {
      const { error } = await supabase
        .from(database)
        .insert({ naam: nieuweEntry });
    }

    if (database == "studies") {
      const { error } = await supabase
        .from(database)
        .insert({ naam: nieuweEntry, universiteit_id: uni_id });
    }

    if (database == "vakken") {
      const { error } = await supabase
        .from(database)
        .insert({ naam: nieuweEntry, studie_id: studie_id });
    }

    return router.refresh();
  };

  return (
    <div className="">
      <p
        onClick={onOpen}
        className="text-cgreen text-center text-md w-full mt-5 hover:cursor-pointer"
      >
        {text} toevoegen
      </p>
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
                    name="nieuweEntry"
                    className="p-2 border-2 rounded-md border-grey-600"
                    placeholder={"Nieuwe universiteit"}
                    type="text"
                    autoComplete="off"
                  ></input>
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
    </div>
  );
}
