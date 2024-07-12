"use client";

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
    key: "email",
    label: "EMAIL",
  },
  {
    key: "telefoon",
    label: "PHONE",
  },
  {
    key: "trainings",
    label: "TRAININGS",
  },
];

export default function UserTable({ users }: { users: any[] }) {
  return (
    <>
      {users && (
        <Table isStriped aria-label="Alle trainingen">
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn key={column.key}>{column.label}</TableColumn>
            )}
          </TableHeader>
          <TableBody items={users}>
            {(user) => (
              <TableRow key={user.key}>
                <TableCell>{user.id}</TableCell>
                <TableCell className="min-w-fit">
                  {`${user.voornaam} ${user.achternaam}`}
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.telefoon}</TableCell>
                <TableCell>
                  <div>
                    {user.trainingen.map((training_id: any) => {
                      return `${training_id}, `;
                    })}
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      )}
    </>
  );
}
