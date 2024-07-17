"use client";
import { useState, useEffect } from "react";
import { Checkbox } from "@nextui-org/react";

export default function ShowDeleted() {
  const [domLoaded, setDomLoaded] = useState(false);

  useEffect(() => {
    setDomLoaded(true);
  }, []);

  const urlParams = new URLSearchParams(window.location.search);
  let x = urlParams.get("showDeleted");

  return (
    <>
      {domLoaded && (
        <Checkbox
          color="primary"
          value={"Unpublished"}
          isSelected={x == "true"}
          onValueChange={() => {
            if (x == null) {
              urlParams.set("showDeleted", "true");
            } else {
              urlParams.set("showDeleted", (x == "false").toString());
            }
            window.location.search = urlParams.toString();
          }}
        >
          Show Deleted
        </Checkbox>
      )}
    </>
  );
}
