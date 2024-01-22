'use client'


import { FaCheck } from "react-icons/fa6";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { MoreInfoSchedule } from "./more-info-schedule";




export function ScheduleCard() {
    return (
        <Dialog>
            <div className="py-2 text-white gap-2 bg-primary rounded-3xl shadow-md flex flex-col  justify-center items-center">
                <p>Deyvid</p>
                <p>10:00 - 10:15</p>
                <button className="bg-white text-primary gap-2 font-medium rounded-full flex items-center justify-center px-4 ">
                    <FaCheck className="text-primary" />
                    Confirmar
                </button>
                <DialogTrigger>
                    <button className="underline text-xs">
                        mais informações
                    </button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="mx-auto text-primary">Mais informações</DialogTitle>
                        <MoreInfoSchedule />
                    </DialogHeader>
                </DialogContent>
            </div>
        </Dialog>
    )
}