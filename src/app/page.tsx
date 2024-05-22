import Link from "next/link";

export default function Home() {
  return (
    <main className="bg-black min-h-screen flex flex-col justify-center items-center gap-5">
      {/* TODO: create a home page */}
      <h1 className="text-5xl uppercase font-semibold truncate text-white">
        Tracker & Manage
      </h1>
      <Link
        href={"/computer-management/dashboard"}
        className="rounded-full bg-gradient-to-b from-black to-zinc-900 w-28 h-10 hover:opacity-80 duration-300"
      >
        <span className="flex justify-center items-center gap-1 rounded-full w-full h-full font-normal text-zinc-100">
          Get Started
        </span>
      </Link>
    </main>
  );
}
("");
