import { ProcedureCard } from "@/components/procedure-card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogClose, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Brush, Search } from "lucide-react";
import { IoAdd } from "react-icons/io5";
import { SketchPicker } from 'react-color';
import { useState } from "react";
import { Toaster, toast } from "sonner";
import { Button } from "@/components/ui/button";


export function Procedures() {
    const [color, setColor] = useState('');
    const [currentProcedure, setCurrentProcedure] = useState('');
    const [timeToRegister, setTimeToRegister] = useState('');
    const [professionalToRegister, setProfessionalToRegister] = useState('');
    const [priceToRegister, setPriceToRegister] = useState(0);
    const [nameToRegister, setNameToRegister] = useState('');
    const [descriptionToRegister, setDescriptionToRegister] = useState('');
    const [openRegister, setOpenRegister] = useState(false);
    function registerProcedure() {
        if (!nameToRegister || !descriptionToRegister || !timeToRegister || !professionalToRegister || !priceToRegister || !color) {
            return;
        }
        toast.success('Procedimento registrado com sucesso!');
        setOpenRegister(false);
    }

    return (
        <div className="px-4 mt-2 w-full">
            <h2 className="text-primary font-bold text-xl">Procedimentos</h2>
            <div className="flex w-96 mt-4  justify-end items-center">
                <input
                    placeholder="Filtre por nome..."
                    className=" rounded-full h-10 w-full border px-4" />
                <Search className="relative text-zinc-400  right-8" />
            </div>
            <Dialog open={openRegister} onOpenChange={setOpenRegister}>
                <DialogTrigger className="mt-4 md:mt-5 px-14 py-2 bg-green-600 flex items-center gap-2 rounded-full  text-white font-semibold hover:opacity-90 transition-opacity duration-300">
                    <IoAdd />
                    Cadastrar novo
                </DialogTrigger>
                <DialogContent className="max-w-[700px] flex flex-col items-center">
                    <DialogHeader>
                        <DialogTitle className="mx-auto text-primary">
                            Novo procedimento
                        </DialogTitle>
                    </DialogHeader>
                    <DialogDescription className="mt-4 grid grid-cols-3 gap-4">
                        <div>
                            <label className="text-primary font-bold">Nome do procedimento</label>
                            <input
                                onChange={(e) => setNameToRegister(e.target.value)}
                                value={nameToRegister}
                                type="text"
                                placeholder="Nome do procedimento"
                                className="w-full rounded-full border border-primary bg-transparent px-4 py-2 focus:outline-none " />

                        </div>
                        <div>
                            <label className="text-primary font-bold">Valor</label>
                            <input
                                onChange={(e) => setPriceToRegister(Number(e.target.value))}
                                value={priceToRegister}
                                type="text"
                                placeholder="Valor"
                                className="w-full rounded-full border border-primary bg-transparent px-4 py-2 focus:outline-none " />
                        </div>
                        <div>
                            <label className="text-primary font-bold">Duração</label>
                            <input
                                onChange={(e) => setTimeToRegister(e.target.value)}
                                value={timeToRegister}
                                type="text"
                                placeholder="Duração em minutos"
                                className="w-full rounded-full border border-primary bg-transparent px-4 py-2 focus:outline-none " />
                        </div>
                        <div>
                            <label className="text-primary font-bold">Profissional</label>
                            <Select onValueChange={(e) => setProfessionalToRegister(e)} value={professionalToRegister}>
                                <SelectTrigger className="w-full bg-primary text-start text-white md:w-[180px] rounded-full">
                                    <SelectValue placeholder="Escolha o profissional" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="1">Dra Luana</SelectItem>
                                    <SelectItem value="2">Dr. Deyvid</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <label className="text-primary font-bold">Têm recorrência?</label>
                            <Select onValueChange={(e) => setCurrentProcedure(e)} value={currentProcedure}>
                                <SelectTrigger className="w-full bg-primary text-white md:w-[180px] rounded-full">
                                    <SelectValue placeholder="Escolha a opção" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="light">Não</SelectItem>
                                    <SelectItem value="dark">Sim</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <label className="text-primary font-bold">Cor</label>
                            <Dialog >
                                <DialogTrigger className="w-full h-10 flex justify-between items-center rounded-full border border-primary bg-transparent px-4 py-2 focus:outline-none ">
                                    {color !== '' ? <span style={{ backgroundColor: color }} className="w-6 h-6" /> : <p>
                                        Escolha uma cor</p>}
                                    <Brush className="w-6 h-6" />
                                </DialogTrigger>
                                <DialogContent className="overflow-y-scroll">
                                    <DialogHeader>
                                        <DialogTitle className="mx-auto text-primary">
                                            Selecione a cor
                                        </DialogTitle>
                                    </DialogHeader>
                                    <SketchPicker
                                        className="mx-auto"
                                        color={color}
                                        onChange={(color) => setColor(color.hex)}
                                    />
                                    <DialogClose className=" justify-center py-1 w-32 mx-auto bg-primary flex items-center gap-2 rounded-full  text-white hover:opacity-90 transition-opacity duration-300">
                                        Confirmar
                                    </DialogClose>
                                </DialogContent>

                            </Dialog>
                        </div>
                        <div className="col-span-2">
                            <label className="text-primary font-bold">Descrição</label>
                            <textarea
                                onChange={(e) => setDescriptionToRegister(e.target.value)}
                                value={descriptionToRegister}
                                placeholder="Descreva o procedimento"
                                className="w-full rounded-lg border text-black border-primary bg-transparent h-28 px-2 py-2 focus:outline-none " />

                        </div>
                    </DialogDescription>
                    <DialogFooter className="flex gap-4">
                        <DialogClose className=" justify-center py-1 w-32 mx-auto bg-zinc-300 flex items-center gap-2 rounded-full  text-primary hover:opacity-90 transition-opacity duration-300">
                            Cancelar
                        </DialogClose>
                        <Button onClick={() => registerProcedure()} className=" justify-center py-1 w-32 mx-auto bg-primary flex items-center gap-2 rounded-full  text-white hover:opacity-90 transition-opacity duration-300">
                            Confirmar
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
            <div className="grid grid-cols-3 gap-8 mt-4 w-full">
                <ProcedureCard price={40} procedure="Obturação" time="40" color="#f123f1" professional="Luana" />
            </div>
        </div>
    );
}

