import Odontograma from "@/components/odontogram";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { IoAdd, IoPrint } from "react-icons/io5";

export function Treatments() {
    return (
        <div className="grid grid-cols-3">
            <div className="h-72  col-span-2">
                <h2 className="text-primary font-medium">
                    Adicionar tratamento
                </h2>
                <div className="grid grid-cols-4 gap-2 pt-5">
                    <div>
                        <label className="text-primary " htmlFor="">
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
                        <label className="text-primary " htmlFor="">
                            Tratamento
                        </label>
                        <input type="text" className="w-full border px-2 border-primary h-10 rounded-full bg-transparent focus:outline-primary" />
                    </div>
                    <div>
                        <label className="text-primary " htmlFor="">
                            Dentes/Região
                        </label>
                        <input type="text" className="w-full border px-2 border-primary h-10 rounded-full bg-transparent focus:outline-primary" />
                    </div>
                    <div>
                        <label className="text-primary " htmlFor="">
                            Valor R$
                        </label>
                        <input type="text" className="w-full border px-2 border-primary h-10 rounded-full bg-transparent focus:outline-primary" />
                    </div>
                </div>
                <div className="my-4">
                    <Odontograma />
                </div>
                <Button className="bg-green-600 hover:opacity-90 hover:bg-green-600 hover:duration-500 hover:ease-in-out text-white mt-4 rounded-full">
                    <IoAdd className="text-2xl" />
                    Adicionar
                </Button>
            </div>
            <div className=" h-72 pl-10">
                <h2 className="text-primary font-medium ">
                    Evoluções
                </h2>
                <div>

                </div>
            </div>
            <div className="col-span-3  h-[50vh]">
                <h2 className="text-primary font-medium ">
                    Tratamentos
                </h2>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>
                                Data
                            </TableHead>
                            <TableHead>
                                Tratamento
                            </TableHead>
                            <TableHead>
                                Valor
                            </TableHead>
                            <TableHead>
                                Status
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell>
                                15/02/2024
                            </TableCell>
                            <TableCell>
                                Tratamento
                            </TableCell>
                            <TableCell>
                                $250.00
                            </TableCell>
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
                                <Button className=" bg-primary hover:opacity-90 hover:bg-primary hover:duration-500 hover:ease-in-out text-white gap-2 rounded-full">
                                    Imprimir
                                    <IoPrint />
                                </Button>
                            </TableCell>
                        </TableRow>
                    </TableBody>

                </Table>
            </div>
        </div>
    )
}