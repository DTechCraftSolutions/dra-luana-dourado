import { EvolutionComponent } from "@/components/evolution";
import Odontograma from "@/components/odontogram";
import { Button } from "@/components/ui/button";
import { DatePickerDemo } from "@/components/ui/date-picker";
import { DialogFooter, DialogHeader } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "../../ui/dialog";
import { useState } from "react";
import { IoAdd, IoClose, IoPrint } from "react-icons/io5";

export function Treatments() {
    const [newTreatment, setNewTreatment] = useState(false);
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="col-span-2">
                <h2 className="text-primary font-medium">
                    Adicionar tratamento
                </h2>
                {!newTreatment ? (
                    <button onClick={() => setNewTreatment(true)} className="bg-primary mt-5 px-5 flex items-center text-white rounded-full py-2 justify-center gap-2 hover:opacity-80 hover:duration-1000 hover:ease-out">
                        <IoAdd />
                        Adicionar novo tratamento
                    </button>
                ) : (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-2 pt-5">
                            <div>
                                <label className="text-primary" htmlFor="">
                                    Plano
                                </label>
                                <Select>
                                    <SelectTrigger className="w-full bg-primary rounded-full text-white">
                                        <SelectValue placeholder="Selecione..." />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="1">Plano Amil</SelectItem>
                                        <SelectItem value="2">Plano Unimed</SelectItem>
                                        <SelectItem value="3">Plano Bradesco</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <label className="text-primary" htmlFor="">
                                    Tratamento
                                </label>
                                <input type="text" className="w-full border px-2 border-primary h-10 rounded-full bg-transparent focus:outline-primary" />
                            </div>
                            <div>
                                <label className="text-primary" htmlFor="">
                                    Valor R$
                                </label>
                                <input type="text" className="w-full border px-2 border-primary h-10 rounded-full bg-transparent focus:outline-primary" />
                            </div>
                        </div>
                        <div className="my-4">
                            <Odontograma />
                        </div>
                        <div className="flex justify-between">
                            <Button className="bg-zinc-300 hover:opacity-90 hover:bg-zinc-300 hover:duration-500 hover:ease-in-out text-primary mt-4 rounded-full">
                                <IoClose className="text-2xl" />
                                Cancelar
                            </Button>
                            <Button className="bg-green-600 hover:opacity-90 hover:bg-green-600 hover:duration-500 hover:ease-in-out text-white mt-4 rounded-full">
                                <IoAdd className="text-2xl" />
                                Adicionar
                            </Button>
                        </div>
                    </>
                )}
            </div>
            <div className="h-72 col-span-4  md:col-span-1 pl-10">
                <h2 className="text-primary font-medium">
                    Evoluções
                </h2>
                <div className="flex flex-col items-end w-full">
                    <div className="w-full max-h-40 overflow-y-scroll">
                        {Array.from({ length: 5 }).map((_, index) => (
                            <EvolutionComponent key={index} date="15/02/2024" treatment="Tratamento" description="Tratamento realizado" />
                        ))}

                    </div>
                    <Dialog>
                        <DialogTrigger >
                            <Button className="bg-primary hover:opacity-90 hover:bg-primary hover:duration-500 hover:ease-in-out text-white mt-4 rounded-full">
                                <IoAdd />
                                Adicionar
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle className="mx-auto text-primary">
                                    Nova Evolução
                                </DialogTitle>
                            </DialogHeader>
                            <DialogDescription>
                                <div className="flex flex-col">
                                    <label htmlFor="">Data</label>
                                    <DatePickerDemo date={new Date()} setDate={() => { }} />
                                </div>
                                <div>
                                    <label htmlFor="">Tratamento</label>
                                    <Select>
                                        <SelectTrigger className="w-full bg-primary rounded-full text-white">
                                            <SelectValue placeholder="Selecione..." />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="1">Tratamento 1</SelectItem>
                                            <SelectItem value="2">Tratamento 2</SelectItem>
                                            <SelectItem value="3">Tratamento 3</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div>
                                    <label htmlFor="">Descricão</label>
                                    <textarea className="w-full border px-2 border-primary h-24 rounded-lg bg-transparent focus:outline-primary"></textarea>
                                </div>
                            </DialogDescription>
                            <DialogFooter className="flex justify-center w-full items-center">
                                <div className="flex gap-2 items-center mx-auto">
                                    <Button className="bg-zinc-300 hover:bg-zinc-300 hover:opacity-90 rounded-full hover:duration-500 hover:ease-in-out text-primary">
                                        <IoClose />
                                        Cancelar
                                    </Button>
                                    <Button className="bg-primary hover:opacity-90 rounded-full hover:duration-500 hover:ease-in-out text-white">
                                        <IoAdd />
                                        Adicionar
                                    </Button>
                                </div>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
            <div className="col-span-3 h-[50vh]">
                <h2 className="text-primary font-medium">
                    Tratamentos
                </h2>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Data</TableHead>
                            <TableHead>Tratamento</TableHead>
                            <TableHead>Valor</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell>15/02/2024</TableCell>
                            <TableCell>Tratamento</TableCell>
                            <TableCell>$250.00</TableCell>
                            <TableCell>
                                <Select onOpenChange={() => { }} defaultValue="1">
                                    <SelectTrigger className="w-full bg-primary rounded-full text-white">
                                        <SelectValue placeholder="Selecione..." />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="1">Em aberto</SelectItem>
                                        <SelectItem value="2">Concluído</SelectItem>
                                    </SelectContent>
                                </Select>
                            </TableCell>
                            <TableCell>
                                <Button className="bg-primary hover:opacity-90 hover:bg-primary hover:duration-500 hover:ease-in-out text-white gap-2 rounded-full">
                                    Imprimir
                                    <IoPrint />
                                </Button>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
