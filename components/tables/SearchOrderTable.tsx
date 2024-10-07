"use client";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import { useEffect, useState } from "react";

const columns = [
  {
    key: "id",
    label: "ID",
  },
  {
    key: "prijs",
    label: "PRICE",
  },
  {
    key: "training_name",
    label: "TRAINING NAME",
  },
  {
    key: "training_id",
    label: "TRAINING ID",
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
    key: "order_date",
    label: "ORDER DATE",
  },
  {
    key: "status",
    label: "STATUS",
  },
  {
    key: "payment_intent",
    label: "PAYMENT INTENT",
  },
];

export default function SearchOrderTable({ orders }: { orders: any[] }) {
  return (
    <>
      {orders && (
        <Table isStriped aria-label="Alle orders">
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn key={column.key}>{column.label}</TableColumn>
            )}
          </TableHeader>
          <TableBody items={orders}>
            {(order) => (
              <TableRow key={order.key}>
                <TableCell>{order.id}</TableCell>
                <TableCell>{order.prijs.toFixed(2)}</TableCell>
                <TableCell className="w-fit">{order.training_naam}</TableCell>
                <TableCell className="w-fit">{order.training_id}</TableCell>
                <TableCell className="w-fit">
                  {`${order.voornaam} ${order.achternaam}`}
                </TableCell>
                <TableCell className="w-fit">{order.email}</TableCell>
                <TableCell>{order.telefoon}</TableCell>
                <TableCell>
                  {`${order.order_date
                    .replace("T", " ")
                    .split(" ")[0]
                    .split("-")
                    .reverse()
                    .join(
                      "-",
                    )} ${order.order_date.replace("T", " ").split(" ")[1]}`}
                </TableCell>
                <TableCell>{order.status}</TableCell>
                <TableCell>{order.payment_intent}</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      )}
    </>
  );
}
