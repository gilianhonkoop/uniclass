"use client";
import { useState, useEffect } from "react";
import { Checkbox } from "@nextui-org/react";

export default function ShowDeleted({
  showExpired,
  setShowExpired,
}: {
  showExpired: string;
  setShowExpired: Function;
}) {
  return (
    <>
      <Checkbox
        color="primary"
        value={"Unpublished"}
        isSelected={showExpired == ""}
        onValueChange={() => {
          if (showExpired == "") {
            setShowExpired("expired");
          } else {
            setShowExpired("");
          }
        }}
      >
        Show Expired
      </Checkbox>
    </>
  );
}
