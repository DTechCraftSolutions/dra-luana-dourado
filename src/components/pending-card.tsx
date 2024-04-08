import { DialogTitle } from "@radix-ui/react-dialog";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "./ui/dialog";
import { NewSchedule } from "@/forms/new-schedule";

export function PendingCard() {
  return (
    <div className="w-full h-16 bg-rose-100 rounded-lg shadow-md p-4 flex justify-between items-center">
      <div>
        <p className="text-primary font-medium">Deyvid Tavares de Moura</p>
        <p className="text-primary">Manutenção de Aparelhos</p>
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
