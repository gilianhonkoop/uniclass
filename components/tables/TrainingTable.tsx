"use client";

import EditTraining from "@/components/modals/EditTraining";
import DeleteTraining from "@/components/modals/DeleteTraining";
import ShowUsers from "@/components/modals/ShowUsers";
import ShowSchedule from "@/components/modals/ShowSchedule";
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
    key: "id",
    label: "ID",
  },
  {
    key: "naam",
    label: "NAME",
  },
  {
    key: "omschrijving",
    label: "OMSCHRIJVING",
  },
  {
    key: "info",
    label: "INFO",
  },
  {
    key: "plaatsen",
    label: "PLAATSEN",
  },
  {
    key: "prijs",
    label: "PRIJS",
  },
  {
    key: "schedule",
    label: "SCHEDULE",
  },
  {
    key: "status",
    label: "STATUS",
  },
  {
    key: "edit",
    label: "WIJZIGINGEN",
  },
];

export default function TrainingTable({ trainingen }: { trainingen: any[] }) {
  // let dates = Array();
  // trainingen.map(async (i, training: any) => {
  //   let lessen = await getLessen(training.lessen);
  //   let be = Array(2);
  //   be[0] = formatDate(lessen[0].begin);
  //   be[1] = formatDate(lessen[-1].begin);
  //   dates.push(be);
  // });

  return (
    <>
      {trainingen && (
        <Table isStriped aria-label="Alle trainingen">
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn key={column.key}>{column.label}</TableColumn>
            )}
          </TableHeader>
          <TableBody items={trainingen}>
            {(training) => (
              <TableRow key={training.key}>
                <TableCell>{training.id}</TableCell>
                <TableCell width={150}>{training.naam}</TableCell>
                <TableCell width={300}>
                  <div className="overflow-y-scroll max-h-[10rem] max-w-[500px]">
                    {training.omschrijving}
                  </div>
                </TableCell>
                <TableCell width={180}>uni, studie en vak info+link</TableCell>
                <TableCell>
                  {training.deelnemers.length + "/" + training.plaatsen}
                </TableCell>
                <TableCell>{training.prijs.toFixed(2)}</TableCell>
                <TableCell className="max-w-[130px] min-w-[100px]">
                  tbc
                </TableCell>
                <TableCell className="max-w-[100px]">
                  {training.status}
                </TableCell>
                <TableCell className="min-w-[140px] max-w-[300px] h-[176px] flex flex-row items-center">
                  <ShowSchedule training={training} />
                  <ShowUsers training={training} />
                  <EditTraining training={training} />
                  <DeleteTraining id={training.id} />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      )}
    </>
  );
}
