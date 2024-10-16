"use client";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import { useState, useEffect } from "react";

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

export default function UserTable({ getUsers }: { getUsers: Function }) {
  const [page, setPage] = useState(1);
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    const update = async () => {
      let new_users: any[] = await getUsers(page);
      setUsers([...users, ...new_users]);
    };
    update();
  }, [page]);
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
      <button
        className="my-5"
        onClick={() => {
          setPage(page + 1);
        }}
      >
        Load More
      </button>
    </>
  );
}
