"use client";

export default function Page({ text }: { text: string }) {
  return (
    <form
      action={() => {
        const section = document.querySelector("#search");
        section!.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }}
      className="mt-[4rem] flex justify-center md:justify-start"
    >
      <button className="rounded-sm bg-primary-orange text-white w-[14rem] h-[60px]">
        {text}
      </button>
    </form>
  );
}
