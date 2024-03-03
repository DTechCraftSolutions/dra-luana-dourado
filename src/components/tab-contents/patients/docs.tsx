import { Prescription } from "@/forms/prescription";
import { useState } from "react";
import { FaFileMedical, FaFilePrescription } from "react-icons/fa";


export function DocsComponent() {
    const [docSelected, setDocSelected] = useState<string>()
    return (
        <div>
            {
                !docSelected && (
                    <div className="flex gap-4 items-center">
                        <div onClick={() => setDocSelected("prescription")} className="w-32 h-20 bg-primary rounded-lg cursor-pointer hover:opacity-90 hover:duration-500 ease-in-out flex flex-col justify-center items-center text-white">
                            <FaFilePrescription />
                            Receitas

                        </div>
                        <div className="w-32 h-20 bg-primary rounded-lg cursor-pointer hover:opacity-90 hover:duration-500 ease-in-out  flex flex-col justify-center items-center text-white">
                            <FaFileMedical />
                            Exames
                        </div>
                    </div>
                )
            }
            {
                docSelected === "prescription" && <Prescription setDocSelected={setDocSelected} />
            }

        </div>
    )
}