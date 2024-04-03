import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { format } from "date-fns";
import { toast } from "sonner";

interface MoreInfoScheduleProps {
  id: string;
  status: string;
  name: string;
  procedure: string;
  time: string;
  date: string;
}
export function MoreInfoSchedule({
  status,
  id,
  name,
  procedure,
  time,
  date,
}: MoreInfoScheduleProps) {
  const [newStatus, setNewStatus] = useState("");
  const formatDate = (date: Date) => format(date, "dd/MM/yyyy");

  async function handleComfirm() {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/update-schedule`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
          status: newStatus,
        }),
      });
      toast.success("Agendamento atualizado com sucesso");
    } catch (error) {
      console.error(error);
      toast.error("Erro ao atualizar o agendamento");
    } finally {
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    }
  }

  return (
    <div className="w-full h-full flex flex-col  items-center pt-5 text-primary">
      <ul className="w-full flex flex-col gap-3 items-center">
        <li className="flex items-center gap-2">
          <span>Paciente:</span>
          <p>{name}</p>
        </li>
        <li className="flex items-center gap-2">
          <span>Procedimento:</span>
          <p>{procedure}</p>
        </li>
        <li className="flex items-center gap-2">
          <span>Tempo estimado:</span>
          <p>{time} minutos</p>
        </li>
        <li className="flex items-center gap-2">
          <span>Data escolhida:</span>
          <p>{formatDate(new Date(date))}</p>
        </li>
        <li>
          <Select
            defaultValue={status}
            onValueChange={(value) => setNewStatus(value)}
          >
            <SelectTrigger className="w-full  rounded-full ">
              <SelectValue placeholder="Escolha uma opção" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="AGUARDANDO">Aguardando</SelectItem>
              <SelectItem value="EM_ATENDIMENTO">Em atendimento</SelectItem>
              <SelectItem value="FINALIZADO">Finalizado</SelectItem>
              <SelectItem value="CANCELADO">Cancelado</SelectItem>
              <SelectItem value="REAGENDADO">Reagendado</SelectItem>
              <SelectItem value="PENDENTE">Pendente</SelectItem>
            </SelectContent>
          </Select>
        </li>
      </ul>
      <div className="flex items-center gap-2 mt-5">
        {newStatus !== "" ? (
          <button
            onClick={handleComfirm}
            className="w-56 hover:opacity-80  hover:duration-500 hover:ease-out h-10 bg-primary rounded-full text-white"
          >
            Confirmar alteração
          </button>
        ) : null}
      </div>
    </div>
  );
}
