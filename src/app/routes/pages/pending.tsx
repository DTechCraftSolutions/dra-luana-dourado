import { PendingCard } from "@/components/pending-card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function Pending() {
    return (
        <div className="px-4 mt-2 w-full">
            <h2 className="text-primary font-bold text-xl">Pendentes de agendamento</h2>
            <div className="flex items-center gap-5 mt-4">
                <h3 className="text-primary">
                    Pacientes de:
                </h3>
                <Select>
                    <SelectTrigger className="w-full md:w-[180px] rounded-full">
                        <SelectValue placeholder="Escolha o convênio" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="light">Plano</SelectItem>
                        <SelectItem value="dark">Particular</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="schedule-cards gap-2 mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
                {Array.from({ length: 20 }).map((_, index) => (
                    <PendingCard key={index} />
                ))}
            </div>
        </div>
    );
}