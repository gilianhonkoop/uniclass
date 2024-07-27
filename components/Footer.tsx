import Link from "next/link";

export default function Page({ language }: { language: any }) {
  return (
    <footer className="w-full p-8 flex flex-col items-center justify-center text-center bg-primary-orange gap-[3vh]">
      <p className="text-[16px] text-white hover:cursor-default">
        Copyright © UniClass 2024
      </p>
    </footer>
  );
}
