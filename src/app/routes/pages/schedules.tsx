"use client";
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
import { da, ptBR } from "date-fns/locale";
import { IoMdAdd } from "react-icons/io";
import { getDayOfWeek } from "@/utils/day-week";
import { Toaster } from "sonner";
interface ProfessionalProps {
  id: string;
  name: string;
  email: string;
  office: string;
  CRO: string;
}

interface ScheduleProps {
  id: string;
  date: string;
  status: string;
  procedureId: string;
  professionalId: string;
  patientId: string;
  availableTimeId: string;
}

interface ProcedureProps {
  id: string;
  name: string;
  description: string;
  recurrence: string;
  price: number;
  professionalId: string;
  duration: string;
  color: string;
}

export function Schedules() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectProfessional, setSelectProfessional] = useState<string>("all");
  const [professionals, setProfessionals] = useState<ProfessionalProps[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [dayWeek, setDayWeek] = useState("");
  const [scheduleByProfessional, setScheduleByProfessional] = useState<
    ScheduleProps[]
  >([]);
  const [registeredSchedule, setRegisteredSchedule] = useState(false);
  const [searchDate, setSearchDate] = useState<any>("");
  const [searchPlan, setSearchPlan] = useState<any>("");
  const [patient, setPatient] = useState<any[]>([]);
  const [procedures, setProcedures] = useState<ProcedureProps[]>([]);
  const [selectedProcedure, setSelectedProcedure] = useState<string>("all");

  const formatDate = (date: Date) => format(date, "dd/MM/yyyy");
  const dataFormatada = format(date || new Date(), "EEEE", { locale: ptBR });
  const CapitalizedWeekDay =
    dataFormatada.charAt(0).toUpperCase() + dataFormatada.slice(1);

  let filteredSchedules = scheduleByProfessional
    ?.filter(
      (schedule) =>
        schedule?.date?.includes(searchDate) && schedule.date !== null
    )
    ?.filter(
      (schedule) =>
        selectedProcedure === "all" ||
        selectedProcedure.includes(schedule.procedureId)
    );
  async function getProfessionals() {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/find-all-professionals`
      );
      const data = await response.json();
      setProfessionals(data.professionals);
    } catch (error) {
      console.error("Error fetching professionals:", error);
    }
  }

  async function getSchedulesByProfessional() {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/find-schedule-by-professional`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ professionalId: selectProfessional }),
        }
      );
      const data = await response.json();
      setScheduleByProfessional(data.schedules);
    } catch (error) {
      console.error("Error fetching schedules:", error);
    }
  }

  async function getAllProcedures() {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/find-all-procedures`
      );
      const data = await response.json();
      setProcedures(data.procedures);
    } catch (error) {
      console.error("Error fetching procedures:", error);
    }
  }

  useEffect(() => {
    getProfessionals();
    getAllProcedures();
  }, []);

  useEffect(() => {
    if (selectProfessional || registeredSchedule) {
      getSchedulesByProfessional();
    }
  }, [selectProfessional, registeredSchedule]);

  useEffect(() => {
    if (date) {
      setSearchDate(date.toISOString());
      setSearchPlan("");
    }
  }, [date]);

  return (
    <div className="mt-2 w-full px-4">
      <Toaster position="bottom-right" richColors />
      <h2 className="text-primary font-bold text-xl">Agenda</h2>
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
      <div className="w-full flex md:items-end flex-col md:flex-row items-center mt-4 justify-between">
        <div className="">
          <h3 className=" font-medium text-primary">
            Filtrar por plano
          </h3>
          <Select
            value={searchPlan}
            onValueChange={(value) => setSearchPlan(value)}
          >
            <SelectTrigger className="w-full mt-2 md:w-[180px] rounded-full">
              <SelectValue placeholder="Escolha o convênio" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="particular">Particular</SelectItem>
              <SelectItem value="plano">Plano</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="text-primary font-medium" htmlFor="">Filtrar por procedimento:</label>
          <Select
            value={selectedProcedure}
            onValueChange={(value) => setSelectedProcedure(value)}
          >
            <SelectTrigger className="w-full mt-2 md:w-[200px] rounded-full">
              <SelectValue placeholder="Procedimento" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              {procedures.map((procedure) => (
                <SelectItem key={procedure.id} value={procedure.id}>
                  {procedure.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="text-primary font-medium" htmlFor="">Filtrar por profissional:</label>
          <Select
            onValueChange={(value) => setSelectProfessional(value)}
            defaultValue="all"
          >
            <SelectTrigger className="w-full mt-2 md:w-[200px] rounded-full">
              <SelectValue placeholder="Selecione o profissional" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              {professionals.map((professional) => (
                <SelectItem key={professional.CRO} value={professional.id}>
                  {professional.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Dialog open={openModal} onOpenChange={setOpenModal}>
          <DialogTrigger className="mt-4 md:mt-0 px-4 py-2 flex items-center gap-2 bg-green-400 hover:bg-green-600 duration-500 rounded-full text-white font-semibold">
            <IoMdAdd />
            Agendar novo
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="mx-auto text-primary">
                Novo Agendamento
              </DialogTitle>
            </DialogHeader>
            <NewSchedule
              setRegisterSchedule={setRegisteredSchedule}
              dayWeek={dayWeek}
              setOpenModal={setOpenModal}
              openModal={openModal}
            />
          </DialogContent>
        </Dialog>
      </div>
      <div className="schedule-cards gap-2 mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
        {searchPlan !== "" ? (
          patient?.filter((patient: any) => patient?.role?.includes(searchPlan))
            .length > 0 ? (
            filteredSchedules.length > 0 ? (
              filteredSchedules.map((schedule) => (
                <ScheduleCard
                  status={schedule.status}
                  id={schedule.id}
                  setPatient={setPatient}
                  key={schedule.id}
                  availableTimeId={schedule.availableTimeId}
                  pacientId={schedule.patientId}
                  date={schedule.date}
                  procedureId={schedule.procedureId}
                />
              ))
            ) : (
              <div className="text-primary text-sm">
                Nenhum agendamento disponível para a data selecionada
              </div>
            )
          ) : (
            <div className="text-primary text-sm">
              Nenhum paciente encontrado com esse convênio
            </div>
          )
        ) : selectedProcedure !== "all" && filteredSchedules.length === 0 ? (
          <div className="text-primary text-sm">
            Nenhum agendamento disponível para o procedimento selecionado
          </div>
        ) : filteredSchedules.length > 0 ? (
          filteredSchedules.map((schedule) => (
            <ScheduleCard
              status={schedule.status}
              id={schedule.id}
              setPatient={setPatient}
              key={schedule.id}
              availableTimeId={schedule.availableTimeId}
              pacientId={schedule.patientId}
              date={schedule.date}
              procedureId={schedule.procedureId}
            />
          ))
        ) : (
          <div className="text-primary text-sm">
            Nenhum agendamento disponível para a data selecionada
          </div>
        )}
      </div>
    </div>
  );
}
