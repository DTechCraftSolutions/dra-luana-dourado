"use client";

import { FaCheck } from "react-icons/fa6";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { MoreInfoSchedule } from "./more-info-schedule";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { IoMdClose } from "react-icons/io";

interface ScheduleCardProps {
  id: string;
  pacientId: string;
  availableTimeId: string;
  procedureId: string;
  status: string;
  date: string;
  setPatient: any;
}

export function ScheduleCard({
  status,
  id,
  setPatient,
  pacientId,
  availableTimeId,
  date,
  procedureId,
}: ScheduleCardProps) {
  const [dataPatient, setDataPatient] = useState<any>([]);
  const [dataAvailableTime, setDataAvailableTime] = useState<any>([]);
  const [dataProcedure, setDataProcedure] = useState<any>([]);

  async function getPatients() {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/find-by-id-patient`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: pacientId }),
        }
      );

      const data = await response.json();
      setDataPatient(data.patient);
      setPatient([data.patient]);
    } catch (error) {
      console.error("Error fetching patients:", error);
      throw error;
    }
  }

  async function getAvailableTime() {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/find-by-id-available-times`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: availableTimeId }),
        }
      );

      const data = await response.json();
      setDataAvailableTime(data.availableTimes);
    } catch (error) {
      throw error;
    }
  }

  async function getProcedure() {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/find-by-id-procedure`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: procedureId }),
        }
      );
      const data = await response.json();
      setDataProcedure(data.procedure);
    } catch (error) {
      throw error;
    }
  }

  async function handleConfirm() {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/update-schedule`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
          status: "FINALIZADO",
        }),
      });
      toast.success("Agendamento finalizado com sucesso");
    } catch (error) {
      toast.error("Erro ao finalizar o agendamento");
      console.error(error);
    } finally {
      window.location.reload();
    }
  }

  function getAdjustedTime(startTime: string): string {
    const originalTime = new Date(`01/01/2024 ${startTime}`);

    originalTime.setMinutes(
      originalTime.getMinutes() + Number(dataProcedure.duration)
    );
    const adjustedTimeString = originalTime.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    });
    return adjustedTimeString;
  }

  useEffect(() => {
    getPatients();
    getAvailableTime();
    getProcedure();
  }, []);

  return (
    <Dialog>
      <div className="py-2 text-white gap-2 bg-primary rounded-3xl shadow-md flex flex-col  justify-center items-center">
        <p className="w-4/5 mx-auto text-center">{dataPatient.full_name}</p>
        <p>
          {dataAvailableTime.label} - {getAdjustedTime(dataAvailableTime.label)}
        </p>
        {
          status === "FINALIZADO" ? (
            <div className="flex items-center gap-2 mx-auto text-center">
              <FaCheck className="text-green-500" />
              Finalizado
            </div>
          )
            : status === "CANCELADO" ? (
              <div className="mx-auto flex items-center gap-2 text-center">
                <IoMdClose className="text-red-500" />
                Cancelado
              </div>
            )
              : <button
                onClick={handleConfirm}
                className="bg-white text-primary gap-2 font-medium rounded-full flex items-center justify-center px-4 "
              >
                <FaCheck className="text-primary" />
                Confirmar
              </button>
        }
        <DialogTrigger className="underline text-xs">
          Mais informações
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="mx-auto text-primary">
              Mais informações
            </DialogTitle>
            <MoreInfoSchedule
              status={status}
              id={id}
              name={dataPatient.full_name}
              date={date}
              procedure={dataProcedure.name}
              time={dataProcedure.duration}
            />
          </DialogHeader>
        </DialogContent>
      </div>
    </Dialog>
  );
}
