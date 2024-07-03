"use client";

import trash from "@/icons/delete.png";
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

export default function LokaalRij({ name, id }: { name: string; id: number }) {
  const router = useRouter();

  const {
    isOpen: isOpenEditModal,
    onOpen: onOpenEditModal,
    onOpenChange: onOpenChangeEditModal,
  } = useDisclosure();

  const {
    isOpen: isOpenDeleteModal,
    onOpen: onOpenDeleteModal,
    onOpenChange: onOpenChangeDeleteModal,
  } = useDisclosure();

  const deleteLokaal = async () => {
    const supabase = createClient();
    const { error } = await supabase.from("lokalen").delete().eq("id", id);

    return router.refresh();
  };

  const wijzigLokaal = async (formData: FormData) => {
    const nieuw_lokaal = formData.get("nieuw lokaal") as string;

    const supabase = createClient();
    const { error } = await supabase
      .from("lokalen")
      .update({ naam: nieuw_lokaal })
      .eq("id", id);

    return router.refresh();
  };

  return (
    <div className="w-[40rem] flex hover:border rounded p-1">
      <div className="mr-auto">{name}</div>
      <Image
        src={pen}
        className="hover:cursor-pointer h-[24px] w-auto mr-2"
        alt="edit"
        width={20}
        height={20}
        onClick={onOpenEditModal}
      />
      <Image
        src={trash}
        className="hover:cursor-pointer h-[24px] w-auto"
        alt="delete"
        width={20}
        height={20}
        onClick={onOpenDeleteModal}
      />
      <Modal isOpen={isOpenEditModal} onOpenChange={onOpenChangeEditModal}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 items-center">
                Wijzig lokaal
              </ModalHeader>
              <form>
                <ModalBody>
                  <input
                    name="nieuw lokaal"
                    className="p-2 border-2 rounded-md border-grey-600"
                    defaultValue={name}
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
                      wijzigLokaal(event);
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
      <Modal isOpen={isOpenDeleteModal} onOpenChange={onOpenChangeDeleteModal}>
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
                  onPress={() => {
                    onClose();
                    deleteLokaal();
                  }}
                >
                  Verwijderen
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
