import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { FaEdit } from "react-icons/fa"


export function BudgetsRender() {
    return (
        <div>
            <div className="flex justify-end mb-2">
                <button className="bg-green-600 px-10 py-2 rounded-full text-white font-semibold hover:opacity-80 hover:duration-1000 hover:ease-out">
                    Adicionar
                </button>
                
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
                    <TableRow>
                        <TableCell className="">15/02/2024</TableCell>
                        <TableCell>Tratamento clínico</TableCell>
                        <TableCell>$250.00</TableCell>
                        <TableCell className="text-right ">Em aberto</TableCell>
                        <TableCell className="flex justify-end">
                            <button className="bg-primary px-5 flex items-center  text-white rounded-full py-1 jsutify-center gap-2 hover:opacity-80 hover:duration-1000 hover:ease-out">
                                <FaEdit />
                                Editar
                            </button>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    )
}