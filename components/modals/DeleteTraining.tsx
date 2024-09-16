"use client";

import trash from "@/icons/delete.png";
import Image from "next/image";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";

export default function DeleteEntry({ id }: { id: number }) {
  const router = useRouter();

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const deleteEntry = async () => {
    const supabase = createClient();
    const { error } = await supabase.from("trainingen").delete().eq("id", id);

    return router.refresh();
  };

  return (
    <>
      <Image
        src={trash}
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
                Weet je het zeker
              </ModalHeader>
              <ModalFooter className="flex flex-row justify-center">
                <Button color="danger" variant="light" onPress={onClose}>
                  Sluiten
                </Button>
                <Button
                  color="primary"
                  onPress={async () => {
                    onClose();
                    await deleteEntry();
                    window.location.reload();
                  }}
                >
                  Verwijderen
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
