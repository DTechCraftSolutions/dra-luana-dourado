import { ScheduleCard } from "@/components/schedule-card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { NewSchedule } from "@/forms/new-schedule";

import { IoMdAdd } from "react-icons/io";

export function Schedules() {
    return (
        <div className="mt-2 w-full px-4">
            <h2 className="text-primary font-bold text-xl">Agenda</h2>
            <div className="w-full flex mt-4">
                <Select>
                    <SelectTrigger className="w-full md:w-[180px] bg-primary rounded-full text-white">
                        <SelectValue placeholder="Data" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="light">21/01/2024</SelectItem>
                        <SelectItem value="dark">22/01/2024</SelectItem>
                        <SelectItem value="system">23/01/2024</SelectItem>
                    </SelectContent>
                </Select>
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
                <Dialog>
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
                        <NewSchedule />
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
