"use client";

import user from "@/icons/user.png";
import Image from "next/image";
import { createClient } from "@/utils/supabase/client";
import { useState } from "react";
import trash from "@/icons/delete.png";
import { useRouter } from "next/navigation";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
  ModalFooter,
  Button,
  Checkbox,
} from "@nextui-org/react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";

const columns = [
  {
    key: "voornaam",
    label: "VOORNAAM",
  },
  {
    key: "achternaam",
    label: "ACHTERNAAM",
  },
  {
    key: "email",
    label: "EMAIL",
  },
  {
    key: "telefoonnummer",
    label: "TELEFOON NUMMER",
  },
  {
    key: "aanmelding",
    label: "AANMELDING",
  },
  {
    key: "prijs",
    label: "PRIJS",
  },
  {
    key: "betaalmethode",
    label: "BETAALMETHODE",
  },
  {
    key: "stripe",
    label: "STRIPE",
  },

  {
    key: "delete",
    label: "DELETE",
  },
];

async function deleteGebruiker(id: number, training: any, selected: boolean) {
  if (!selected) {
    return false;
  }

  training.deelnemers.splice(training.deelnemers.indexOf(id), 1);

  const supabase = createClient();
  const { data, error } = await supabase
    .from("trainingen")
    .update({ deelnemers: training.deelnemers })
    .eq("id", training.id);

  return true;
}

// async function getGebruikers(deelnemers: number[]) {
async function getGebruikers(deelnemers: number[], training_id: number) {
  const supabase = createClient();
  // const { data, error } = await supabase
  //   .from("gebruikers")
  //   .select()
  //   .in("id", deelnemers)
  //   .order("id", { ascending: true });

  // if (error) {
  //   return [];
  // }

  const { data, error } = await supabase
    .from("orders")
    .select()
    .eq("training_id", training_id)
    .in("gebruiker_id", deelnemers)
    .order("id", { ascending: true });

  if (error) {
    return [];
  }

  return data;
}

export default function ShowUsers({ training }: { training: any }) {
  const router = useRouter();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [selected, setSelected] = useState<any[]>([]);
  const [deelnemers, setDeelnemers] = useState<any[]>([]);

  return (
    <>
      <Image
        src={user}
        className="hover:cursor-pointer h-[24px] w-auto mr-2"
        alt="edit"
        width={20}
        height={20}
        onClick={async () => {
          // setDeelnemers(await getGebruikers(training.deelnemers));
          setDeelnemers(await getGebruikers(training.deelnemers, training.id));
          setSelected(
            Array.from(
              { length: training.deelnemers.length },
              (i, index) => (i = false),
            ),
          );
          onOpen();
        }}
      />
      <Modal
        scrollBehavior="inside"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        className="max-w-[85%]"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 items-center">
                Deelnemers
              </ModalHeader>
              <ModalBody className="flex flex-row mb-5">
                {deelnemers.length > 0 && (
                  // TODO: fix weird bug where adding isStriped to table removes an date entry
                  <Table aria-label="Alle gebruikers">
                    <TableHeader columns={columns}>
                      {(column) => (
                        <TableColumn key={column.key}>
                          {column.label}
                        </TableColumn>
                      )}
                    </TableHeader>
                    <TableBody items={deelnemers}>
                      {deelnemers.map((user, index) => (
                        <TableRow key={index}>
                          <TableCell>{user.voornaam}</TableCell>
                          <TableCell>{user.achternaam}</TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>{user.telefoon}</TableCell>
                          <TableCell>
                            {/* {user.created_at.slice(0, 10)}{" "}
                            {user.created_at.slice(12, 19)} */}
                            {user.order_date.slice(0, 10)}{" "}
                            {user.order_date.slice(11, 19)}
                          </TableCell>
                          <TableCell>{user.prijs}</TableCell>
                          <TableCell>{user.betaalmethode}</TableCell>
                          <TableCell>
                            {user.payment_intent && (
                              <a
                                className="underline text-sky-600"
                                target="_blank"
                                href={`https://dashboard.stripe.com/payments/${user.payment_intent}`}
                                rel="noopener noreferrer"
                              >
                                stripe link
                              </a>
                            )}
                          </TableCell>
                          <TableCell className="min-w-[50px]">
                            <div className="flex flex-row gap-3">
                              <Checkbox
                                color="danger"
                                value={user.id}
                                onValueChange={() => {
                                  let copy = selected;
                                  selected[index] = !selected[index];
                                  setSelected(copy);
                                }}
                              ></Checkbox>
                              <Image
                                src={trash}
                                className="hover:cursor-pointer h-[24px] w-auto mr-2"
                                alt="edit"
                                width={20}
                                height={20}
                                onClick={async () => {
                                  const ret: boolean = await deleteGebruiker(
                                    user.id,
                                    training,
                                    selected[index],
                                  );
                                  if (ret) {
                                    onClose();
                                    router.refresh();
                                  } else {
                                  }
                                }}
                              />
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
                {deelnemers.length == 0 && (
                  <div className="flex flex-row text-center ">
                    <p>Er zijn momenteel geen deelnemers</p>
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
