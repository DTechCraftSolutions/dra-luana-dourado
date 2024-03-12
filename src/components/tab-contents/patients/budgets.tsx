import { Dialog, DialogHeader, DialogContent, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useEffect, useState } from "react"
import { FaEdit } from "react-icons/fa"
import { FaCheck } from "react-icons/fa6"
import { IoAdd, IoClose, IoTrash } from "react-icons/io5"
import { toast } from "sonner"


export function BudgetsRender() {
    const [selectedIdTreatment, setSelectedIdTreatment] = useState<string>("1");
    const [addedTreatments, setAddedTreatments] = useState<any[]>([]);
    const [open, setOpen] = useState(false);
    const [editing, setEditing] = useState(false);
    const [totalValue, setTotalValue] = useState(0);
    const [selectedDiscountMethod, setSelectedDiscountMethod] = useState("1");
    const [discountValue, setDiscountValue] = useState(0);
    const addTreatmentToList = (treatmentId: string) => {
        const treatment = treatments.find((treatment) => treatment.id === treatmentId);
        if (treatment) {
            const treatmentAlreadyAdded = addedTreatments.find((addedTreatment) => addedTreatment.id === treatment.id);
            if (treatmentAlreadyAdded) {
                toast.error("Tratamento ja adicionado");
                return;
            }
            setTotalValue(totalValue + treatment.value);
            setAddedTreatments([...addedTreatments, treatment]);
        }
        setSelectedIdTreatment("1");
    }
    const handleDiscountChange = () => {
        if(selectedDiscountMethod === "1"){
            setTotalValue(totalValue - discountValue);
        }
        if(selectedDiscountMethod === "2"){
            setTotalValue(totalValue - totalValue * (discountValue / 100));
        }
    }

    const removeTreatmentFromList = (treatmentId: string) => {
        setAddedTreatments(addedTreatments.filter((treatment) => treatment.id !== treatmentId));
    }
    const treatments = [
        {
            id: "1",
            name: "Tratamento 1",
            description: "Tratamento 1",
            value: 100

        },
        {
            id: "2",
            name: "Tratamento 2",
            description: "Tratamento 2",
            value: 200
        },
        {
            id: "3",
            name: "Tratamento 3",
            description: "Tratamento 3",
            value: 300
        }
    ]
    return (
        <div>
            <div className="flex justify-end mb-2">
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger className="bg-green-600 px-10 py-2 rounded-full text-white font-semibold hover:opacity-80 hover:duration-1000 hover:ease-out">
                        Adicionar
                    </DialogTrigger>
                    <DialogContent className="max-w-[700px] h-4/5">
                        <DialogHeader>
                            <DialogTitle className="mx-auto text-primary">
                                Adicionar orcamento
                            </DialogTitle>
                        </DialogHeader>
                        <div className="flex items-center justify-between w-full">
                            <div>
                                <label htmlFor="">Tratamento</label>
                                <Select value={selectedIdTreatment} onValueChange={setSelectedIdTreatment}>
                                    <SelectTrigger className="w-[400px] rounded-full border-zinc-300 focus:border-1  focus:shadow-none border outline-none focus:duration-500 focus:border-primary h-10">
                                        <SelectValue placeholder="Selecione..." />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="1">Tratamento 1</SelectItem>
                                        <SelectItem value="2">Tratamento 2</SelectItem>
                                        <SelectItem value="3">Tratamento 3</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <button onClick={
                                () => addTreatmentToList(selectedIdTreatment)
                            } className="bg-primary mt-5 px-5 flex items-center text-white rounded-full py-2 justify-center gap-2 hover:opacity-80 hover:duration-1000 hover:ease-out">
                                <IoAdd />
                                Adicionar
                            </button>
                        </div>
                        <div className="w-full h-40 overflow-y-scroll">
                            {addedTreatments.length ? addedTreatments.map((treatment) => (
                                <div className="w-full bg-white shadow border-b-4 flex items-center justify-between p-2 border-primary  mb-2">
                                    <div>
                                        <p className="text-primary font-bold">{treatment.name}</p>
                                        <p className="text-primary">R${treatment.value}</p>
                                    </div>
                                    <IoTrash onClick={() => removeTreatmentFromList(treatment.id)} className="text-zinc-400 cursor-pointer text-2xl hover:bg-red-500 p-1 rounded hover:text-white hover:duration-500" />
                                </div>
                            )) : (
                                <div className="w-full h-28 mb-4 rounded-lg">
                                    <p className="text-primary font-bold">Nenhum tratamento adicionado</p>
                                </div>

                            )}
                        </div>
                        <div className="flex items-center justify-between gap-2">
                            <div className="flex flex-col">
                                <label htmlFor="">Desconto</label>
                                <input value={discountValue} onChange={(e) => setDiscountValue(Number(e.target.value))} type="number" className="w-[150px] px-3 rounded-full border-zinc-300 focus:border-1  focus:shadow-none border outline-none focus:duration-500 focus:border-primary h-10" />
                            </div>
                            <RadioGroup value={selectedDiscountMethod} onValueChange={setSelectedDiscountMethod}  className="flex mt-4 mr-10 items-center gap-6">
                                <div className="flex items-center gap-2">
                                    <p className="text-primary">
                                        R$
                                    </p>
                                    <RadioGroupItem value="1" />
                                </div>
                                <div className="flex items-center gap-2">
                                    <p className="text-primary">
                                        %
                                    </p>
                                    <RadioGroupItem value="2" />
                                </div>
                            </RadioGroup>
                            <div className="mt-4 text-primary">
                                <p>
                                    <span>Total: </span>
                                    R$ {totalValue}
                                </p>
                            </div>
                        </div>
                        <div className="flex w-full justify-center items-center gap-4">
                            <DialogClose className="bg-zinc-300 px-10 py-2 rounded-full text-primary font-semibold hover:opacity-80 hover:duration-1000 hover:ease-out">
                                Cancelar
                            </DialogClose>
                            <button onClick={() => setOpen(false)} className="bg-primary px-10 py-2 rounded-full text-white font-semibold hover:opacity-80 hover:duration-1000 hover:ease-out">
                                Adicionar
                            </button>
                        </div>
                    </DialogContent>

                </Dialog>

            </div>
            <Table>
                <TableCaption>Lista de orçamentos feitos para este paciente.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Data</TableHead>
                        <TableHead>Descrição</TableHead>
                        <TableHead>Valor</TableHead>
                        <TableHead className="text-right">Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        editing ? (
                            <TableRow>
                                <TableCell className="">15/02/2024</TableCell>
                                <TableCell>Tratamento clínico</TableCell>
                                <TableCell>$250.00</TableCell>
                                <TableCell className="text-right ">Em aberto</TableCell>
                                <TableCell className="flex justify-end">
                                    <div className="w-full flex items-center justify-end gap-4">
                                        <button className="bg-zinc-300 px-5 flex items-center  text-primary rounded-full py-2 jsutify-center gap-2 hover:opacity-80 hover:duration-1000 hover:ease-out">
                                            <IoClose />
                                        </button>
                                        <button className="bg-primary px-5 flex items-center  text-white rounded-full py-2 jsutify-center gap-2 hover:opacity-80 hover:duration-1000 hover:ease-out">
                                            <FaCheck />
                                        </button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        )
                            :
                            (
                                <TableRow>
                                    <TableCell className="">15/02/2024</TableCell>
                                    <TableCell>Tratamento clínico</TableCell>
                                    <TableCell>$250.00</TableCell>
                                    <TableCell className="text-right ">Em aberto</TableCell>
                                    <TableCell className="flex justify-end">
                                        <button onClick={() => setEditing(true)} className="bg-primary px-5 flex items-center  text-white rounded-full py-1 jsutify-center gap-2 hover:opacity-80 hover:duration-1000 hover:ease-out">
                                            <FaEdit />
                                            Editar
                                        </button>
                                    </TableCell>
                                </TableRow>
                            )
                    }
                </TableBody>
            </Table >
        </div >
    )
}