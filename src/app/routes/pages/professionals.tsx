import { RegisteredProfessionals } from "@/components/registered-professionals";
import { DialogClose, DialogFooter, DialogHeader } from "@/components/ui/dialog";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { IoMdAdd } from "react-icons/io";


export function Professionals() {
    const [job, setJob] = useState("")

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
                <DialogContent className="max-w-[700px] flex flex-col items-center">
                    <DialogHeader>
                        <DialogTitle className="mx-auto text-primary">
                            Novo Profissional
                        </DialogTitle>
                    </DialogHeader>
                    <div className="grid grid-cols-2 gap-2">
                        <div className="flex flex-col">
                            <label htmlFor="">Nome do profissional</label>
                            <input className="w-56 h-10 rounded-full px-4 border border-primary" type="text" />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="">Cargo</label>
                            <Select onValueChange={setJob}>
                                <SelectTrigger className="w-56 h-10 rounded-full px-4 border border-primary">
                                    <SelectValue placeholder="Escolha a ocupação" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="inteligence">Secretaria</SelectItem>
                                    <SelectItem value="dentist">Dentista</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        {
                            job === "dentist" && (
                                <div className="flex flex-col">
                                    <label htmlFor="">CRO</label>
                                    <input className="w-56 h-10 rounded-full px-4 border border-primary" type="text" />
                                </div>
                            )
                        }
                        <div className="flex flex-col">
                            <label htmlFor="">E-mail</label>
                            <input className="w-56 h-10 rounded-full px-4 border border-primary" type="text" />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="">Senha</label>
                            <input className="w-56 h-10 rounded-full px-4 border border-primary" type="text" />
                        </div>
                    </div>

                    <DialogFooter>
                        <DialogClose>
                            <button className="mt-4 md:mt-10 px-14 py-2 bg-secondary border border-primary flex items-center gap-2 rounded-full  text-primary font-semibold hover:opacity-90 transition-opacity duration-300">
                                Cancelar
                            </button>
                        </DialogClose>
                        <DialogClose>
                            <button className="mt-4 md:mt-10 px-14 py-2 bg-primary flex items-center gap-2 rounded-full  text-white font-semibold hover:opacity-90 transition-opacity duration-300">
                                Cadastrar
                            </button>
                        </DialogClose>
                    </DialogFooter>
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