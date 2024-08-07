"use client";
import { useState, useEffect } from "react";
import { Checkbox } from "@nextui-org/react";

export default function ShowDeleted({
  showDeleted,
  setShowDeleted,
}: {
  showDeleted: string;
  setShowDeleted: Function;
}) {
  return (
    <>
      <Checkbox
        color="primary"
        value={"Unpublished"}
        isSelected={showDeleted == ""}
        onValueChange={() => {
          if (showDeleted == "") {
            setShowDeleted("deleted");
          } else {
            setShowDeleted("");
          }
        }}
      >
        Show Deleted
      </Checkbox>
    </>
  );
}
