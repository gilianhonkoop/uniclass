import AuthButton from "../AuthButton";
import SidebarButton from "./SidebarButton";

export default function Sidebar() {
  const pages = [
    { label: "Dashboard", url: "/dashboard", type: "page" },
    { label: "Aanbod", url: "/", type: "subsection" },
    { label: "Trainingen", url: "/dashboard/trainingen", type: "page" },
    { label: "Lokalen", url: "/dashboard/lokalen", type: "page" },
    { label: "Curriculum", url: "/dashboard/curriculum", type: "page" },
    { label: "Data", url: "/", type: "subsection" },
    { label: "Gebruikers", url: "/dashboard/gebruikers", type: "page" },
    { label: "Orders", url: "/dashboard/orders", type: "page" },
    { label: "Admin", url: "/", type: "subsection" },
    { label: "Verplaats gebruikers", url: "/dashboard/move", type: "page" },
  ];

  return (
    <div className="h-screen w-full flex flex-col rounded-r-3xl bg-white overflow-hidden">
      <div className="w-full h-[6rem] shadow-md shadow-transparant flex items-center justify-center">
        <p className="text-primary-darkblue font-bold text-3xl">UniClass</p>
      </div>
      <div className="flex flex-col mb-auto">
        {pages.map((page, index) => {
          return page.type == "page" ? (
            <SidebarButton key={index} page={page} />
          ) : (
            <div
              key={index}
              className="mt-10 ml-8 mb-4 font-light text-gray-600"
            >
              {page.label}
            </div>
          );
        })}
      </div>
      <div className="text-gray-500 font-bold hover:bg-gray-50 w-full h-[5rem] pl-8 flex items-center text-md hover:cursor-pointer">
        <div className="hover:text-primary-darkblue w-full h-full transition ease-in-out hover:translate-x-2 duration-300 flex items-center">
          <AuthButton />
        </div>
      </div>
    </div>
  );
}
