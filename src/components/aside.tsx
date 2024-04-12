"use client";

import Image from "next/image";
import { details } from "../../details";
import Link from "next/link";
import { useParams } from "next/navigation";
import { FaBookMedical, FaClock, FaSyringe, FaUserDoctor } from "react-icons/fa6";
import { IoEye, IoPerson } from "react-icons/io5";
import {RiHealthBookFill} from "react-icons/ri"
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
        <li className={!path ? "text-primary font-medium bg-blue-100 items-center rounded-lg duration-500 p-2 flex gap-2" : "p-2 rounded-lg flex hover:bg-blue-100 duration-500 items-center gap-2"}>
          <FaBookMedical />
          <Link className="w-full h-full" href="/">Agenda</Link>
        </li>
        <li
          className={
            path === "pending" ? "text-primary font-medium bg-blue-100 items-center rounded-lg duration-500 p-2 flex gap-2" : "p-2 rounded-lg flex hover:bg-blue-100 duration-500 items-center gap-2"          }
        >
          <IoEye className="text-xl" />
          <Link className="w-full h-full" href="/pending">Inteligência</Link>
        </li>
        <li
          className={
            path === "patients" ? "text-primary font-medium bg-blue-100 items-center rounded-lg duration-500 p-2 flex gap-2" : "p-2 rounded-lg flex hover:bg-blue-100 duration-500 items-center gap-2"
          }
        >
          <IoPerson className="text-xl" />
          <Link className="w-full h-full" href="/patients">Pacientes</Link>
        </li>
        <li
          className={
            path === "professionals" ? "text-primary font-medium bg-blue-100 items-center rounded-lg duration-500 p-2 flex gap-2" : "p-2 rounded-lg flex hover:bg-blue-100 duration-500 items-center gap-2"
          }
        >
          <FaUserDoctor />
          <Link className="w-full h-full" href="/professionals">Profissionais</Link>
        </li>
        <li
          className={
            path === "availability" ? "text-primary font-medium bg-blue-100 items-center rounded-lg duration-500 p-2 flex gap-2" : "p-2 rounded-lg flex hover:bg-blue-100 duration-500 items-center gap-2"
          }
        >
          <FaClock />
          <Link className="w-full h-full" href="/availability">Disponibilidade</Link>
        </li>
        <li
          className={
            path === "procedures" ? "text-primary font-medium bg-blue-100 items-center rounded-lg duration-500 p-2 flex gap-2" : "p-2 rounded-lg flex hover:bg-blue-100 duration-500 items-center gap-2"
          }
        >
          <FaSyringe />

          <Link className="w-full h-full" href="/procedures">Procedimentos</Link>
        </li>
        <li
          className={
            path === "plans" ? "text-primary font-medium bg-blue-100 items-center rounded-lg duration-500 p-2 flex gap-2" : "p-2 rounded-lg flex hover:bg-blue-100 duration-500 items-center gap-2"
          }
        >
          <RiHealthBookFill />

          <Link className="w-full h-full" href="/plans">Planos</Link>
        </li>
      </ul>
    </aside>
  );
}
