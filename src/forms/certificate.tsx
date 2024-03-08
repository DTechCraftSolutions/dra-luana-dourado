import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState } from "react";
import { IoArrowBack, IoPrint } from "react-icons/io5";

export default function Certificate({ setDocSelected }: any) {
    const [certificateType, setCertificateType] = useState("1");
    return (
        <div>
            <div className="flex gap-2 items-center">
                <IoArrowBack onClick={() => setDocSelected(null)} className="text-primary text-2xl p-1 hover:bg-primary hover:rounded-full cursor-pointer hover:duration-500 hover:ease-in-out hover:transform hover:opacity-30 hover:text-white" />
                <h1 className="text-primary font-medium text-lg">Atestados</h1>
            </div>
            <div className="mt-4">
                <label htmlFor="">Tipo de atestado</label>
                <RadioGroup value={certificateType} onValueChange={setCertificateType} className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <label htmlFor="">Presença</label>
                        <RadioGroupItem defaultChecked value="1" />

                    </div>
                    <div className="flex items-center gap-2">
                        <label htmlFor="">Dias</label>
                        <RadioGroupItem value="2" />
                    </div>
                </RadioGroup>
                <div className="flex mt-4 items-end gap-4">
                    <div className="flex flex-col">
                        <label htmlFor="">Data de emissão</label>
                        <input type="date" className="w-56 rounded-full focus:outline-primary focus:border-1 focus:outline-0 focus:shadow-none h-10 border px-4" />
                    </div>
                    {
                        certificateType === "2" && (
                            <input type="number" placeholder="quantidade de dias" className="w-56 focus:outline-primary focus:duration-500 focus:border-primary focus:border-1 focus:outline-0 focus:shadow-none rounded-full h-10 border px-4" />
                        )
                    }
                </div>
                <div className="mt-4">
                    <label htmlFor="">Há alguma Doença</label>
                    <input type="text" placeholder="Nome da Doença (opcional)" className="w-1/2 block focus:outline-primary focus:duration-500 focus:border-primary focus:border-1 focus:outline-0 focus:shadow-none rounded-full h-10 border px-4" />
                </div>
                <button className="bg-primary mt-5 px-5 flex items-center text-white rounded-full py-2 justify-center gap-2 hover:opacity-80 hover:duration-1000 hover:ease-out">
                    <IoPrint className="text-xl"/>
                    Imprimir
                    </button>
            </div>
        </div>
    );
}