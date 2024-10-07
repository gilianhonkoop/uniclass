"use client";

import { useState } from "react";
import SearchUserTable from "@/components/tables/SearchUserTable";

export default function SearchUser({ zoekUser }: { zoekUser: any }) {
  const [results, setResults] = useState<any[]>([]);

  return (
    <>
      <div className="ml-10 mt-5">
        <h4>Zoek gebruiker:</h4>
        <form className="flex flex-col gap-3 items-left mt-1">
          <select
            name="optie"
            id="optie"
            className=" w-[20rem] h-[3rem] shadow border rounded py-2 px-3 text-gray-700 leading-tight 
            focus:outline-none focus:shadow-outline"
          >
            <option value="achternaam">Achternaam</option>
            <option value="voornaam">Voornaam</option>
            <option value="email">Email</option>
            <option value="id">Id</option>
          </select>
          <input
            placeholder="Vul de zoekterm in"
            type="text"
            name="zoekterm"
            required
            autoComplete="off"
            className="w-[20rem] h-[3rem] shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight 
            focus:outline-none focus:shadow-outline"
          />
          <button
            className="w-[20rem] border rounded h-[3rem] bg-primary-dark text-white"
            formAction={async (form) => {
              const result = await zoekUser(form);
              setResults(result);
            }}
          >
            zoeken
          </button>
        </form>
      </div>
      <div className="mx-10 mt-5">
        {results.length == 0 && <>Nothing found</>}
        {results.length > 0 && <SearchUserTable users={results} />}
      </div>
    </>
  );
}
