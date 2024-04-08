"use client";

import Image from "next/image";
import { details } from "../../details";
import Link from "next/link";
import { useParams } from "next/navigation";

export function Aside() {
  const path = useParams().id;
  return (
    <aside className="w-1/5 shadow-md px-8 h-full pt-16 bg-white hidden md:flex text-primary flex-col items-center">
      <Image
        src={details.image}
        alt="logo"
        className="mt-4"
        width={150}
        height={100}
      />
      <ul className="flex flex-col gap-4 text-primary mt-8">
        <li className={!path ? "text-primary font-medium underline" : ""}>
          <Link href="/">Agenda</Link>
        </li>
        <li
          className={
            path === "pending" ? "text-primary font-medium underline" : ""
          }
        >
          <Link href="/pending">Inteligência</Link>
        </li>
        <li
          className={
            path === "patients" ? "text-primary font-medium underline" : ""
          }
        >
          <Link href="/patients">Pacientes</Link>
        </li>
        <li
          className={
            path === "professionals" ? "text-primary font-medium underline" : ""
          }
        >
          <Link href="/professionals">Profissionais</Link>
        </li>
        <li
          className={
            path === "availability" ? "text-primary font-medium underline" : ""
          }
        >
          <Link href="/availability">Disponibilidade</Link>
        </li>
        <li
          className={
            path === "procedures" ? "text-primary font-medium underline" : ""
          }
        >
          <Link href="/procedures">Procedimentos</Link>
        </li>
        <li
          className={
            path === "plans" ? "text-primary font-medium underline" : ""
          }
        >
          <Link href="/plans">Planos</Link>
        </li>
      </ul>
    </aside>
  );
}
