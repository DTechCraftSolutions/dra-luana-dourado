import { IoAdd } from "react-icons/io5";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { getDayOfWeek } from "@/utils/day-week";

interface FinishedScheduleProps {
  date: string;
  procedureId: string;
  pacientId: string;
  setPatient: any;
}
export function FinishedSchedule({
  date,
  procedureId,
  pacientId,
  setPatient,
}: FinishedScheduleProps) {
  const [dataProcedure, setDataProcedure] = useState<any>([]);
  const [dataPacient, setDataPacient] = useState<any>([]);
  const formatDate = (date: Date) => format(date, "dd/MM/yyyy");

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

  async function getPatient() {
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
      setDataPacient(data.patient);
      setPatient([data.patient]);
    } catch (error) {
      throw error;
    }
  }
  useEffect(() => {
    getProcedure();
    getPatient();
  }, [procedureId, pacientId]);
  return (
    <div className="bg-green-200 text-primary font-bold w-full py-2 px-4 rounded-lg flex justify-between items-center">
      <div>
        <p className="font-normal">{dataPacient.full_name}</p>
        <p className="font-normal">{dataProcedure.name}</p>

        <p className="font-normal">{`${getDayOfWeek(date)} - ${formatDate(
          new Date(date)
        )}`}</p>
      </div>
      <Dialog>
        <DialogTrigger className="hover:opacity-80 w-8 h-8 rounded-full justify-center items-center flex bg-primary duration-500 hover:ease-in-out">
          <IoAdd className="text-white" />
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="mx-auto text-primary">
              Mais informações
            </DialogTitle>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
