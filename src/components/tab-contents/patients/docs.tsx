import { Prescription } from "@/forms/prescription";
import { useState } from "react";
import { FaKitMedical, FaHouseMedical } from "react-icons/fa6";
import { FaFileMedical, FaFilePrescription } from "react-icons/fa";
import Certificate from "@/forms/certificate";


export function DocsComponent({patient}: any) {
    const [docSelected, setDocSelected] = useState<string>()
    return (
        <div>
            {
                !docSelected && (
                    <div className="flex gap-4 items-center">
                        <div onClick={() => setDocSelected("prescription")} className="w-32 h-20 bg-primary rounded-lg cursor-pointer hover:opacity-90 hover:duration-500 ease-in-out flex flex-col justify-center items-center text-white">
                            <FaKitMedical />
                            Receitas

                        </div>
                        <div className="w-32 h-20 bg-primary rounded-lg cursor-pointer hover:opacity-90 hover:duration-500 ease-in-out  flex flex-col justify-center items-center text-white">
                            <FaFileMedical />
                            Exames
                        </div>
                        <div onClick={() => setDocSelected("certificate")} className="w-32 h-20 bg-primary rounded-lg cursor-pointer hover:opacity-90 hover:duration-500 ease-in-out  flex flex-col justify-center items-center text-white">
                            <FaHouseMedical />
                            Atestados
                        </div>
                    </div>
                )
            }
            {
                docSelected === "prescription" && <Prescription selectedPatient={patient} setDocSelected={setDocSelected} />
            }
            {
                docSelected === "certificate" && <Certificate setDocSelected={setDocSelected} />
            }

        </div>
    )
}