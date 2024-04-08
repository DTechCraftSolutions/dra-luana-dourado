"use client";
import { FinishedSchedule } from "@/components/finished-schedule";
import { PendingCard } from "@/components/pending-card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { DatePickerDemo } from "@/components/ui/date-picker";
import { ptBR } from "date-fns/locale";
import { format } from "date-fns";
export function Pending() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [dayWeek, setDayWeek] = useState("");
  const router = useRouter();
  const formatDate = (date: Date) => format(date, "dd/MM/yyyy");
  const dataFormatada = format(date || new Date(), "EEEE", { locale: ptBR });
  const CapitalizedWeekDay =
    dataFormatada.charAt(0).toUpperCase() + dataFormatada.slice(1);
  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      router.push("/login");
    }
  }, []);
  return (
    <div className="px-4 mt-2 w-full">
      <h2 className="text-primary font-bold text-xl">Área de inteligência</h2>
      <div className="w-full flex items-center gap-6 mt-4">
        <DatePickerDemo setDate={setDate} date={date} setDayWeek={setDayWeek} />
        <h2 className="text-primary font-bold text-xl">
          {CapitalizedWeekDay}
          <span className="ml-2 font-normal">
            {formatDate(date || new Date()) === formatDate(new Date())
              ? "(hoje)"
              : ""}
          </span>
        </h2>
      </div>
      <div className="flex w-full justify-between mt-4 items-center">
        <div className="flex items-center gap-5">
          <h3 className="text-primary">Pacientes de:</h3>
          <Select>
            <SelectTrigger className="w-full md:w-[180px] rounded-full">
              <SelectValue placeholder="Escolha o convênio" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Plano</SelectItem>
              <SelectItem value="dark">Particular</SelectItem>
              <SelectItem value="system">Plano field</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Select>
          <SelectTrigger className="w-full md:w-[300px] rounded-full">
            <SelectValue placeholder="Escolha o Profissional" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">Dra Luana</SelectItem>
            <SelectItem value="dark">Deyvid</SelectItem>
            <SelectItem value="system">Neto Minhoca</SelectItem>
          </SelectContent>
        </Select>
        
        <Select>
          <SelectTrigger className="w-full md:w-[300px] rounded-full">
            <SelectValue placeholder="Escolha o Procedimento" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">Dra Luana</SelectItem>
            <SelectItem value="dark">Deyvid</SelectItem>
            <SelectItem value="system">Neto Minhoca</SelectItem>
          </SelectContent>
        </Select> 
      </div>
      <div className="flex w-96 mt-4  justify-end items-center">
        <input
          placeholder="Filtre por nome..."
          className=" rounded-full h-10 w-full border text-sm px-4"
        />
        <Search className="relative text-zinc-400  w-[20px]  right-8" />
      </div>
      <div className="grid grid-cols-3 gap-8 mt-4 w-full">
        <p className="px-4 py-2 text-primary text-center font-bold bg-zinc-300 rounded-full">
          Procedimentos recorrentes
        </p>
        <p className="px-4 py-2 text-primary text-center font-bold bg-zinc-300 rounded-full">
          Faltosos/cancelados
        </p>
        <p className="px-4 py-2 text-primary text-center font-bold bg-zinc-300 rounded-full">
          Finalizados
        </p>
      </div>
      <div className="schedule-cards lg:grid-cols-3 pt-2 grid">
        <div className="h-[54vh] flex flex-col gap-2 overflow-y-scroll">
          {Array.from({ length: 10 }).map((_, index) => (
            <PendingCard key={index} />
          ))}
        </div>
        <div className="h-[54vh] flex flex-col gap-2 overflow-y-scroll">
          {Array.from({ length: 10 }).map((_, index) => (
            <PendingCard key={index} />
          ))}
        </div>
        <div className="h-[54vh] flex flex-col gap-2 overflow-y-scroll">
          {Array.from({ length: 10 }).map((_, index) => (
            <FinishedSchedule />
          ))}
        </div>
      </div>
    </div>
  );
}
