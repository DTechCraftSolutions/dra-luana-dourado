import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

export function MoreInfoSchedule() {
    const [newStatus, setNewStatus] = useState("");
    return (
        <div className="w-full h-full flex flex-col items-center pt-5 text-primary">
            <ul>
                <li className="flex items-center gap-2">
                    <span>
                        Paciente:
                    </span>
                    <p>Deyvid</p>
                </li>
                <li className="flex items-center gap-2">
                    <span>
                        Procedimento:
                    </span>
                    <p>Manutenção</p>
                </li>
                <li className="flex items-center gap-2">
                    <span>
                        Tempo estimado:
                    </span>
                    <p>15 min</p>
                </li>
                <li className="flex items-center gap-2">
                    <span>
                        Data escolhida:
                    </span>
                    <p>25/01/2024</p>
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
                {
                    newStatus !== "" ? (
                        <button className="w-56 hover:opacity-80  hover:duration-500 hover:ease-out h-10 bg-primary rounded-full text-white">
                            Confirmar alteração
                        </button>
                    ) 
                    :
                    null
                }
            </div>
        </div>
    )
}