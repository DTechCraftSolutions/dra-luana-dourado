import { DialogTitle } from "@radix-ui/react-dialog";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "./ui/dialog";
import { NewSchedule } from "@/forms/new-schedule";
import { useEffect, useState } from "react";

interface PendingCardProps {
  procedureId: string;
  pacientId: string;
}

export function PendingCard({ procedureId, pacientId }: PendingCardProps) {
  const [dataProcedure, setDataProcedure] = useState<any>([]);
  const [dataPacient, setDataPacient] = useState<any>([]);

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

  useEffect(() => {
    getPatient();
    getProcedure();
  }, []);

  return (
    <div className="w-full  bg-rose-100 rounded-lg shadow-md p-4 flex justify-between items-center">
      <div>
        <p className="text-primary font-medium">{dataPacient.full_name}</p>
        <p className="text-primary">{dataProcedure.name}</p>
      </div>
      <Dialog>
        <DialogTrigger className="bg-white rounded-full px-4 py-1 text-cancel font-medium hover:opacity-80 hover:duration-500 hover:ease-in-out">
          Agendar
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-bold text-primary mx-auto">
              Agendamento
            </DialogTitle>
          </DialogHeader>
          <NewSchedule />
        </DialogContent>
      </Dialog>
    </div>
  );
}
