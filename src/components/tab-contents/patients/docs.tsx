import { FaFileMedical, FaFilePrescription } from "react-icons/fa";


export function DocsComponent() {
    return (
        <div className="flex gap-4 items-center">
            <div className="w-32 h-20 bg-primary rounded-lg cursor-pointer hover:opacity-90 hover:duration-500 ease-in-out flex flex-col justify-center items-center text-white">
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