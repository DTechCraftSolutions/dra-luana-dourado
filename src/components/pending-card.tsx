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
    <div className="w-full h-32 bg-cancel rounded-lg shadow-md p-4 flex flex-col justify-between items-center">
      <div className="flex flex-col gap-2">
        <p className="text-white text-lg font-bold">Deyvid</p>
      </div>
      <div className="flex items-center gap-2">
        <p className="text-white text-lg ">Manutenção:</p>
        <p className="text-white text-sm">15 min</p>
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
