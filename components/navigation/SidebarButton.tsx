import Link from "next/link";

export default function SidebarButton({ page }: { page: any }) {
  return (
    <Link
      href={page.url}
      className="w-full text-gray-500 font-bold hover:bg-gray-50 hover:cursor-pointer"
    >
      <p className="hover:text-primary-darkblue pl-8 py-3 w-full transition ease-in-out hover:translate-x-2 duration-300 text-md">
        {page.label}
      </p>
    </Link>
  );
}
