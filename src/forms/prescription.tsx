import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { IoAdd, IoArrowBack } from "react-icons/io5";

export function Prescription({ setDocSelected }: any) {
    const [newPrescription, setNewPrescription] = useState(false);
    const [measureInForm, setMeasureInForm] = useState<string>("Caixa(s)");
    return (
        <div className="">
            <div className="flex gap-2 items-center">
                <IoArrowBack onClick={() => setDocSelected(null)} className="text-primary text-2xl p-1 hover:bg-primary hover:rounded-full cursor-pointer hover:duration-500 hover:ease-in-out hover:transform hover:opacity-30 hover:text-white" />
                <h1 className="text-primary font-medium text-lg">Receitas</h1>
            </div>
            {
                !newPrescription && <div >
                    <button onClick={() => setNewPrescription(true)} className="bg-primary mt-5 px-5 flex items-center text-white rounded-full py-2 justify-center gap-2 hover:opacity-80 hover:duration-1000 hover:ease-out">
                        <IoAdd />
                        Gerar nova
                    </button>
                </div>
            }
            {
                newPrescription && (
                    <div className="w-4/5 mt-5 gap-20 flex">
                        <form action="">
                            <div className="">
                                <label htmlFor="" className="text-primary">
                                    Nome do medicamento
                                </label>
                                <input type="text" placeholder="Medicamento" className="w-full h-10 px-4 rounded-full border-[1px] focus:outline-none focus:duration-500 focus:border-primary" />
                            </div>
                            <div className="flex items-center gap-5">
                                <div className="flex flex-col">
                                    <label htmlFor="" className="text-primary">
                                        Quantidade
                                    </label>
                                    <input type="text" placeholder="Qtd" className="w-24 h-10 px-4 rounded-full border-[1px] focus:outline-none focus:duration-500 focus:border-primary" />
                                </div>
                                <div>
                                    <label className="text-primary" htmlFor="">
                                        Medida
                                    </label>
                                    <Select defaultValue="Caixa(s)" onValueChange={setMeasureInForm}>
                                        <SelectTrigger className="w-40 bg-primary rounded-full text-white" value={measureInForm}>
                                            <SelectValue placeholder="Medida" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Caixa(s)">
                                                Caixa(s)
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            <div>
                                <label htmlFor="">Posologia</label> 
                                <textarea placeholder="Adicione..." className="w-full h-32 px-3 rounded-lg border-[1px] focus:outline-none focus:duration-500 focus:border-primary" />
                            </div>
                            <button type="button" className="bg-primary mt-5 px-5 flex items-center text-white rounded-full py-2 justify-center gap-2 hover:opacity-80 hover:duration-1000 hover:ease-out">
                                <IoAdd />
                                Adicionar
                            </button>
                        </form>
                        <div className="w-3/5 h-[90vh] bg-white shadow-md rounded-lg mb-10">
                            Receita
                        </div>
                    </div>
                )
            }
        </div>
    )
} 