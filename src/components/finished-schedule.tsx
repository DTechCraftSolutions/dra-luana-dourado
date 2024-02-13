import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";

export function FinishedSchedule() {
    return (
        <div className="bg-green-500 text-white font-bold w-full py-2 rounded-lg flex flex-col justify-center items-center">
            <p className="">
                Deyvid
            </p>
            <p className="font-normal">
                manutenção
            </p>

            <p className="font-normal">
                segunda-feira, 29/01/2024
            </p>
            <Dialog>
                <DialogTrigger className="underline hover:opacity-80 hover:duration-500 hover:ease-in-out">
                    Mais informações
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