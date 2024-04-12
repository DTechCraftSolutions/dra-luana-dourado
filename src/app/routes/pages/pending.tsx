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

interface ScheduleProps {
  id: string;
  date: string;
  status: string;
  procedureId: string;
  professionalId: string;
  patientId: string;
  availableTimeId: string;
}

interface ProfessionalProps {
  id: string;
  name: string;
  email: string;
  office: string;
  CRO: string;
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

import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { DatePickerDemo } from "@/components/ui/date-picker";
import { ptBR } from "date-fns/locale";
import { format } from "date-fns";
export function Pending() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [searchDate, setSearchDate] = useState<string>("");
  const [schedulesByProfessional, setScheduleByProfessional] = useState<
    ScheduleProps[]
  >([]);
  const [professionals, setProfessionals] = useState<ProfessionalProps[]>([]);
  const [selectProfessional, setSelectProfessional] = useState<string>("all");
  const [procedures, setProcedures] = useState<ProcedureProps[]>([]);
  const [selectedProcedure, setSelectedProcedure] = useState<string>("all");
  const [searchName, setSearchName] = useState<string>("");
  const [searchPlan, setSearchPlan] = useState<string>("");
  const [patient, setPatient] = useState<any>([]);
  const [dayWeek, setDayWeek] = useState("");
  const [scheduleType, setScheduleType] = useState({
    pending: [] as ScheduleProps[],
    cancelled: [] as ScheduleProps[],
    finished: [] as ScheduleProps[],
  });
  const formatDate = (date: Date) => format(date, "dd/MM/yyyy");
  const dataFormatada = format(date || new Date(), "EEEE", { locale: ptBR });
  const CapitalizedWeekDay =
    dataFormatada.charAt(0).toUpperCase() + dataFormatada.slice(1);

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
    if (selectProfessional) {
      getSchedulesByProfessional();
    }
  }, []);

  useEffect(() => {
    schedulesByProfessional?.map((schedule) => {
      if (schedule.status === "PENDENTE") {
        setScheduleType((prev: any) => ({
          ...prev,
          pending: [...prev.pending, schedule],
        }));
      }
      if (schedule.status === "CANCELADO") {
        setScheduleType((prev: any) => ({
          ...prev,
          cancelled: [...prev.cancelled, schedule],
        }));
      }
      if (schedule.status === "FINALIZADO") {
        setScheduleType((prev: any) => ({
          ...prev,
          finished: [...prev.finished, schedule],
        }));
      }
    });
    console.log(date?.toString());
  }, [schedulesByProfessional]);

  useEffect(() => {
    if (date) {
      setSearchDate(date.toISOString());
      setSearchPlan("");
    }
    console.log(patient);
  }, [date]);

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
        <div className="">
          <h3 className="text-primary font-medium mb-2">Pacientes de:</h3>
          <Select value={searchPlan} onValueChange={setSearchPlan}>
            <SelectTrigger className="w-full md:w-[180px] rounded-full">
              <SelectValue placeholder="Escolha o convênio" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="plano">Plano</SelectItem>
              <SelectItem value="particular">Particular</SelectItem>
              <SelectItem value="plano_field">Plano field</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <h3 className="text-primary font-medium mb-2">
            Filtrar por profissional
          </h3>
          <Select
            value={selectProfessional}
            onValueChange={setSelectProfessional}
          >
            <SelectTrigger className="w-full md:w-[300px] rounded-full">
              <SelectValue placeholder="Escolha o Profissional" />
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
        <div>
          <h3 className="text-primary font-medium mb-2">
            Filtrar por procedimento
          </h3>
          <Select
            value={selectedProcedure}
            onValueChange={(value) => setSelectedProcedure(value)}
          >
            <SelectTrigger className="w-full md:w-[200px] rounded-full">
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
      </div>
      <div className="flex w-96 mt-4  justify-end items-center">
        <input
          placeholder="Filtre por nome..."
          className=" rounded-full h-10 w-full border text-sm px-4"
          onChange={(e) => setSearchName(e.target.value)}
        />
        <Search className="relative text-zinc-400  w-[20px]  right-8" />
      </div>
      <div className="grid grid-cols-3 gap-8 mt-4 w-full">
        <p className="px-4 py-2 text-primary text-center font-bold bg-zinc-300 rounded-full">
          Procedimentos pendentes
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
          {scheduleType.pending
            .filter((schedule) => {
              const professionalMatch =
                selectProfessional === "all" ||
                schedule.professionalId === selectProfessional;
              const procedureMatch =
                selectedProcedure === "all" ||
                schedule.procedureId === selectedProcedure;
              const nameMatch =
                searchName === "" ||
                patient?.some((patient: any) =>
                  patient.full_name
                    ?.toLowerCase()
                    .includes(searchName.toLowerCase())
                );
              const planMatch =
                searchPlan === "" ||
                patient?.some((patient: any) => patient.role === searchPlan);
              const dateMatch =
                searchDate === "" || schedule.date.includes(searchDate);

              return (
                professionalMatch &&
                procedureMatch &&
                nameMatch &&
                planMatch &&
                dateMatch
              );
            })
            .map((schedule: ScheduleProps) => (
              <PendingCard
                key={schedule.id}
                setPatient={setPatient}
                pacientId={schedule.patientId}
                procedureId={schedule.procedureId}
              />
            ))}
          {scheduleType.pending.filter((schedule) => {
            const professionalMatch =
              selectProfessional === "all" ||
              schedule.professionalId === selectProfessional;
            const procedureMatch =
              selectedProcedure === "all" ||
              schedule.procedureId === selectedProcedure;
            const nameMatch =
              searchName === "" ||
              patient?.some((patient: any) =>
                patient.full_name
                  ?.toLowerCase()
                  .includes(searchName.toLowerCase())
              );
            const planMatch =
              searchPlan === "" ||
              patient?.some((patient: any) => patient.role === searchPlan);
            const dateMatch =
              searchDate === "" || schedule.date.includes(searchDate);

            return (
              professionalMatch &&
              procedureMatch &&
              nameMatch &&
              planMatch &&
              dateMatch
            );
          }).length === 0 && (
            <p className="text-center text-primary">
              {selectProfessional !== "all" &&
                scheduleType.cancelled.some(
                  (schedule) => schedule.professionalId === selectProfessional
                ) === false &&
                `Nenhum agendamento pendente encontrado para este profissional.`}
              {selectedProcedure !== "all" &&
                scheduleType.cancelled.some(
                  (schedule) => schedule.procedureId === selectedProcedure
                ) === false &&
                `Nenhum agendamento pendente encontrado para este procedimento.`}
              {searchName !== "" &&
                patient?.some((patient: any) =>
                  patient.full_name
                    ?.toLowerCase()
                    .includes(searchName.toLowerCase())
                ) === false &&
                `Nenhum paciente encontrado com o nome ${searchName} em agendamentos pendentes.`}
              {searchPlan !== "" &&
                patient?.some((patient: any) => patient.role === searchPlan) ===
                  false &&
                `Nenhum paciente encontrado com ete plano em agendamentos pendentes.`}
              {searchDate !== "" &&
                scheduleType.cancelled.some((schedule) =>
                  schedule.date.includes(searchDate)
                ) === false &&
                `Nenhum agendamento pendente encontrado para esta data.`}
            </p>
          )}
        </div>

        <div className="h-[54vh] flex flex-col gap-2 overflow-y-scroll">
          {scheduleType.cancelled
            .filter((schedule) => {
              const professionalMatch =
                selectProfessional === "all" ||
                schedule.professionalId === selectProfessional;
              const procedureMatch =
                selectedProcedure === "all" ||
                schedule.procedureId === selectedProcedure;
              const nameMatch =
                searchName === "" ||
                patient?.some((patient: any) =>
                  patient.full_name
                    ?.toLowerCase()
                    .includes(searchName.toLowerCase())
                );
              const planMatch =
                searchPlan === "" ||
                patient?.some((patient: any) => patient.role === searchPlan);
              const dateMatch =
                searchDate === "" || schedule.date.includes(searchDate);

              return (
                professionalMatch &&
                procedureMatch &&
                nameMatch &&
                planMatch &&
                dateMatch
              );
            })
            .map((schedule: ScheduleProps) => (
              <PendingCard
                key={schedule.id}
                setPatient={setPatient}
                pacientId={schedule.patientId}
                procedureId={schedule.procedureId}
              />
            ))}
          {scheduleType.cancelled.filter((schedule) => {
            const professionalMatch =
              selectProfessional === "all" ||
              schedule.professionalId === selectProfessional;
            const procedureMatch =
              selectedProcedure === "all" ||
              schedule.procedureId === selectedProcedure;
            const nameMatch =
              searchName === "" ||
              patient?.some((patient: any) =>
                patient.full_name
                  ?.toLowerCase()
                  .includes(searchName.toLowerCase())
              );
            const planMatch =
              searchPlan === "" ||
              patient?.some((patient: any) => patient.role === searchPlan);
            const dateMatch =
              searchDate === "" || schedule.date.includes(searchDate);

            return (
              professionalMatch &&
              procedureMatch &&
              nameMatch &&
              planMatch &&
              dateMatch
            );
          }).length === 0 && (
            <p className="text-center text-primary">
              {selectProfessional !== "all" &&
                scheduleType.cancelled.some(
                  (schedule) => schedule.professionalId === selectProfessional
                ) === false &&
                `Nenhum agendamento cancelado encontrado para este profissional.`}
              {selectedProcedure !== "all" &&
                scheduleType.cancelled.some(
                  (schedule) => schedule.procedureId === selectedProcedure
                ) === false &&
                `Nenhum agendamento cancelado encontrado para este procedimento.`}
              {searchName !== "" &&
                patient?.some((patient: any) =>
                  patient.full_name
                    ?.toLowerCase()
                    .includes(searchName.toLowerCase())
                ) === false &&
                `Nenhum paciente encontrado com o nome ${searchName} em agendamentos cancelados.`}
              {searchPlan !== "" &&
                patient?.some((patient: any) => patient.role === searchPlan) ===
                  false &&
                `Nenhum paciente encontrado com este plano em agendamentos cancelados.`}
              {searchDate !== "" &&
                scheduleType.cancelled.some((schedule) =>
                  schedule.date.includes(searchDate)
                ) === false &&
                `Nenhum agendamento cancelado encontrado para esta data.`}
            </p>
          )}
        </div>

        <div className="h-[54vh] flex flex-col gap-2 overflow-y-scroll">
          {scheduleType.finished
            .filter((schedule) => {
              const professionalMatch =
                selectProfessional === "all" ||
                schedule.professionalId === selectProfessional;
              const procedureMatch =
                selectedProcedure === "all" ||
                schedule.procedureId === selectedProcedure;
              const nameMatch =
                searchName === "" ||
                patient?.some((patient: any) =>
                  patient.full_name
                    ?.toLowerCase()
                    .includes(searchName.toLowerCase())
                );
              const planMatch =
                searchPlan === "" ||
                patient?.some((patient: any) => patient.role === searchPlan);
              const dateMatch =
                searchDate === "" || schedule.date.includes(searchDate);

              return (
                professionalMatch &&
                procedureMatch &&
                nameMatch &&
                planMatch &&
                dateMatch
              );
            })
            .map((schedule: ScheduleProps) => (
              <FinishedSchedule
                key={schedule.id}
                setPatient={setPatient}
                date={schedule.date}
                pacientId={schedule.patientId}
                procedureId={schedule.procedureId}
              />
            ))}
          {scheduleType.finished.filter((schedule) => {
            const professionalMatch =
              selectProfessional === "all" ||
              schedule.professionalId === selectProfessional;
            const procedureMatch =
              selectedProcedure === "all" ||
              schedule.procedureId === selectedProcedure;
            const nameMatch =
              searchName === "" ||
              patient?.some((patient: any) =>
                patient.full_name
                  ?.toLowerCase()
                  .includes(searchName.toLowerCase())
              );
            const planMatch =
              searchPlan === "" ||
              patient?.some((patient: any) => patient.role === searchPlan);
            const dateMatch =
              searchDate === "" || schedule.date.includes(searchDate);

            return (
              professionalMatch &&
              procedureMatch &&
              nameMatch &&
              planMatch &&
              dateMatch
            );
          }).length === 0 && (
            <p className="text-center text-primary">
              {selectProfessional !== "all" &&
                scheduleType.finished.some(
                  (schedule) => schedule.professionalId === selectProfessional
                ) === false &&
                `Nenhum agendamento encontrado para este profissional.`}
              {selectedProcedure !== "all" &&
                scheduleType.finished.some(
                  (schedule) => schedule.procedureId === selectedProcedure
                ) === false &&
                `Nenhum agendamento encontrado para este procedimento.`}
              {searchName !== "" &&
                patient?.some((patient: any) =>
                  patient.full_name
                    ?.toLowerCase()
                    .includes(searchName.toLowerCase())
                ) === false &&
                `Nenhum paciente encontrado com o nome ${searchName}.`}
              {searchPlan !== "" &&
                patient?.some((patient: any) => patient.role === searchPlan) ===
                  false &&
                `Nenhum paciente encontrado com este plano.`}
              {searchDate !== "" &&
                scheduleType.finished.some((schedule) =>
                  schedule.date.includes(searchDate)
                ) === false &&
                `Nenhum agendamento encontrado para esta data.`}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
