"use client";

import pen from "@/icons/pen.png";
import Image from "next/image";
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

export default function DditEntry({
  database,
  naam,
  id,
  header,
}: {
  database: string;
  naam: string;
  id: number;
  header: string;
}) {
  const router = useRouter();

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const wijzigEntry = async (formData: FormData) => {
    const nieuweEntry = formData.get("nieuweEntry") as string;

    const supabase = createClient();
    const { error } = await supabase
      .from(database)
      .update({ naam: nieuweEntry })
      .eq("id", id);

    return router.refresh();
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
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 items-center">
                Wijzig {header}
              </ModalHeader>
              <form>
                <ModalBody>
                  <input
                    name="nieuweEntry"
                    className="p-2 border-2 rounded-md border-grey-600"
                    defaultValue={naam}
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
                      wijzigEntry(event);
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
