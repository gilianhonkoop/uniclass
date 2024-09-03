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

export default function TrainingTable({
  trainingen,
  lessen,
}: {
  trainingen: any[];
  lessen: any[];
}) {
  function getBeginAndEnd(lesIds: number[]) {
    var newArray: any[] = lessen
      .filter(function (les) {
        return les.id in lesIds;
      })
      .map(function (obj) {
        return new Date(obj.begin);
      });

    if (newArray.length > 0) {
      let min = new Date(Math.min(...newArray)).toLocaleString().split(",")[0];
      let max = new Date(Math.max(...newArray)).toLocaleString().split(",")[0];

      return `begin: ${min} \n eind: ${max}`;
    } else {
      return "nog geen lessen";
    }
  }

  return (
    <>
      {trainingen && (
        <Table isHeaderSticky isStriped aria-label="Alle trainingen">
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn key={column.key}>{column.label}</TableColumn>
            )}
          </TableHeader>
          <TableBody items={trainingen}>
            {(training) => (
              <TableRow key={training.key}>
                <TableCell>{training.id}</TableCell>
                <TableCell className="max-w-[100px] min-w-[120px]">
                  {training.naam}
                </TableCell>
                <TableCell width={300}>
                  <div className="overflow-y-scroll max-h-[10rem] max-w-[500px]">
                    {training.omschrijving}
                  </div>
                </TableCell>
                <TableCell width={180}>{training.info}</TableCell>
                <TableCell>
                  {training.deelnemers.length + "/" + training.plaatsen}
                </TableCell>
                <TableCell>{training.prijs.toFixed(2)}</TableCell>
                <TableCell className="max-w-[110px] min-w-[80px]">
                  {getBeginAndEnd(training.lessen)}
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
