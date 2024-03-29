import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { format } from "date-fns";

interface MoreInfoScheduleProps {
  name: string;
  procedure: string;
  time: string;
  date: string;
}
export function MoreInfoSchedule({
  name,
  procedure,
  time,
  date,
}: MoreInfoScheduleProps) {
  const [newStatus, setNewStatus] = useState("");
  const formatDate = (date: Date) => format(date, "dd/MM/yyyy");
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
          <Select onValueChange={setNewStatus}>
            <SelectTrigger className="w-full  rounded-full ">
              <SelectValue placeholder="Escolha uma opção" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">Aguardando</SelectItem>
              <SelectItem value="2">Em atendimento</SelectItem>
              <SelectItem value="3">Finalizado</SelectItem>
              <SelectItem value="4">Cancelado</SelectItem>
              <SelectItem value="5">Reagendado</SelectItem>
              <SelectItem value="6">Pendente</SelectItem>
            </SelectContent>
          </Select>
        </li>
      </ul>
      <div className="flex items-center gap-2 mt-5">
        {newStatus !== "" ? (
          <button className="w-56 hover:opacity-80  hover:duration-500 hover:ease-out h-10 bg-primary rounded-full text-white">
            Confirmar alteração
          </button>
        ) : null}
      </div>
    </div>
  );
}
