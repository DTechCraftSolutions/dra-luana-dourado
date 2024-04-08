import { IoAdd } from "react-icons/io5";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";

export function FinishedSchedule() {
    return (
        <div className="bg-green-200 text-primary font-bold w-full py-2 px-4 rounded-lg flex justify-between items-center">
            <div>
                <p className="">
                    Deyvid
                </p>
                <p className="font-normal">
                    manutenção
                </p>

                <p className="font-normal">
                    segunda-feira, 29/01/2024
                </p>
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
    )
}