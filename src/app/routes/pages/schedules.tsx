import { ScheduleCard } from "@/components/schedule-card";
import { DatePickerDemo } from "@/components/ui/date-picker";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { NewSchedule } from "@/forms/new-schedule";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { ptBR } from "date-fns/locale";
import { IoMdAdd } from "react-icons/io";

interface ProfessionalProps {
  name: string;
  email: string;
  office: string;
  CRO: string;
}

export function Schedules() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [professionals, setProfessionals] = useState<ProfessionalProps[]>([]);
  const [openModal, setOpenModal] = useState(false);

  const formatDate = (date: Date) => format(date, "dd/MM/yyyy");
  const dataFormatada = format(date || new Date(), "EEEE", { locale: ptBR });
  const CapitalizedWeekDay =
    dataFormatada.charAt(0).toUpperCase() + dataFormatada.slice(1);

  async function getProfessionals() {
    try {
      const response = await fetch(
        "http://localhost:3333/find-all-professionals"
      );
      const data = await response.json();
      setProfessionals(data.professionals);
    } catch (error) {
      console.error("Error fetching professionals:", error);
    }
  }

  useEffect(() => {
    getProfessionals();
  }, []);

  return (
    <div className="mt-2 w-full px-4">
      <h2 className="text-primary font-bold text-xl">Agenda</h2>
      <div className="w-full flex items-center gap-6 mt-4">
        <DatePickerDemo setDate={setDate} date={date} />
        <h2 className="text-primary font-bold text-xl">
          {CapitalizedWeekDay}
          <span className="ml-2 font-normal">
            {formatDate(date || new Date()) === formatDate(new Date())
              ? "(hoje)"
              : ""}
          </span>
        </h2>
      </div>
      <div className="w-full flex flex-col md:flex-row items-center mt-4 justify-between">
        <div className="flex flex-col md:flex-row items-center gap-5">
          <h3 className="text-lg font-medium text-primary md:mr-4">
            Pacientes de:
          </h3>
          <Select>
            <SelectTrigger className="w-full md:w-[180px] rounded-full">
              <SelectValue placeholder="Escolha o convênio" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Particular</SelectItem>
              <SelectItem value="dark">Plano</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Select>
            <SelectTrigger className="w-full md:w-[300px] rounded-full">
              <SelectValue placeholder="Selecione o profissional" />
            </SelectTrigger>
            <SelectContent>
              {professionals.map((professional) => (
                <SelectItem key={professional.CRO} value={professional.name}>
                  {professional.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Dialog open={openModal} onOpenChange={setOpenModal}>
          <DialogTrigger className="mt-4 md:mt-0 px-4 py-2 flex items-center gap-2 bg-green-600 rounded-full text-white font-semibold">
            <IoMdAdd />
            Agendar novo
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="mx-auto text-primary">
                Novo Agendamento
              </DialogTitle>
            </DialogHeader>
            <NewSchedule setOpenModal={setOpenModal} openModal={openModal} />
          </DialogContent>
        </Dialog>
      </div>
      <div className="schedule-cards gap-2 mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
        {Array.from({ length: 20 }).map((_, index) => (
          <ScheduleCard key={index} />
        ))}
      </div>
    </div>
  );
}
