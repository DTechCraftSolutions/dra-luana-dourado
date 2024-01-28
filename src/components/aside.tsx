import Image from "next/image";
import { details } from "../../details";
import Link from "next/link";

export function Aside() {
    return (
        <aside className="w-1/5 shadow-md px-8 h-full pt-16 bg-white hidden md:flex text-primary flex-col items-center">
            <Image src={details.image} alt="logo" className="mt-4" width={150} height={100} />
            <ul className="flex flex-col gap-4 text-primary mt-8">
                <li className="">
                    <Link href="/dashboard/schedules">Agenda</Link>
                </li>
                <li>
                    <Link href="/dashboard/pending">Pendentes</Link>
                </li>
                <li>
                    <Link href="/dashboard/patients">Pacientes</Link>
                </li>
                <li>
                    <Link href="/dashboard/professionals">Profissionais</Link>
                </li>
                <li>
                    <Link href="/dashboard/availability">Disponibilidade</Link>
                </li>
            </ul>
        </aside>
    )
}