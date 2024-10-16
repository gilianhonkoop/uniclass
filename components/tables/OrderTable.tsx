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

export default function OrderTable({ getOrders }: { getOrders: Function }) {
  const [page, setPage] = useState(1);
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    const update = async () => {
      let new_orders: any[] = await getOrders(page);
      setOrders([...orders, ...new_orders]);
    };
    update();
  }, [page]);

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
                  {new Date(order.order_date).toLocaleString("nl-NL", {
                    timeZone: "Europe/Amsterdam",
                  })}
                </TableCell>
                <TableCell>{order.status}</TableCell>
                <TableCell>{order.payment_intent}</TableCell>
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
