import { RegisteredProfessionals } from "@/components/registered-professionals";
import { DialogHeader } from "@/components/ui/dialog";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { IoMdAdd } from "react-icons/io";


export function Professionals() {
    const professionals = [
        {
            name: "Augusto",
            job: "Dentista",
        },
        {
            name: "Luana",
            job: "Dentista",
        },
        {
            name: "Deyvid",
            job: "Secretário",
        }
    ]
    return (
        <div className="w-full px-4 mt-2">
            <h2 className="text-primary font-bold text-xl">Profissionais</h2>
            <Dialog>
                <DialogTrigger className="mt-4 md:mt-10 px-14 py-2 bg-green-600 flex items-center gap-2 rounded-full  text-white font-semibold hover:opacity-90 transition-opacity duration-300">
                    <IoMdAdd />
                    Cadastrar novo
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="mx-auto text-primary">
                            Novo Profissional
                        </DialogTitle>
                    </DialogHeader>
                    <div>Eu sou um cadastro de paciente</div>
                </DialogContent>
            </Dialog>
            <h2 className="text-primary text-xl mt-4">
                Profissionais cadastrados
            </h2>
            <p className="mt-4">
                Selecione um para mais detalhes
            </p>
            <div className="flex flex-col gap-2 mt-4">
                {professionals && professionals.map((professional, index) => (
                    <RegisteredProfessionals
                        key={index}
                        name={professional.name}
                        job={professional.job}
                    />
                ))}
            </div>
        </div>
    );
}