import React, { Dispatch, SetStateAction, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { number } from "zod";
import { set } from "date-fns";


export interface FaceProps {
    numero: number;
    M: string;
    V: string;
    D: string;
    O: string;
    L: string;
}
interface DenteProps {
    numero: number;
    setDetails: Dispatch<SetStateAction<FaceProps[] | undefined>>
    details: FaceProps[] | [];
}

const Dente: React.FC<DenteProps> = ({ numero, setDetails, details = [] }) => {
    const [modalAberto, setModalAberto] = useState(false);
    const [tooth, setTooth] = useState({
        M: "",
        V: "",
        D: "",
        O: "",
        L: "",
    });
    const [marcado, setMarcado] = useState(false); // Adicionando estado para marcar o dente


    const toggleModal = () => {
        setModalAberto(!modalAberto);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        details.length > 0 ? details.map((detail) => {
            if (detail.numero === numero) {
                const newTooth = { ...tooth, numero };
                const detailsWithoutDente = details.filter((detail) => detail.numero !== numero);
                setDetails([...detailsWithoutDente, newTooth]);
                return
            }
            setDetails([...details, { ...tooth, numero }]);
        }) : setDetails([{ ...tooth, numero }]);

        setMarcado(true); // Marcando o dente ao adicionar um procedimento
        toggleModal();
    };
    return (
        <div className={`inline-block ${marcado ? 'bg-primary' : ''}`}> {/* Adicionando classe condicional para marcar o dente */}
            <button
                onClick={toggleModal}
                className="h-8 w-8 bg-gray-300 border border-gray-400 rounded-full"
            >
                {numero}
            </button>
            {modalAberto && (
                <div className="fixed top-0 left-0 z-50 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50">
                    <div className="bg-white p-8 rounded shadow-md">
                        <h2 className="text-lg font-semibold mb-4">
                            Adicionar Procedimento - dente {numero}
                        </h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="">Detalhes por faces</label>
                                <div>
                                    {['M', 'D', 'O', 'V', 'L'].map((face, index) => (
                                        <div key={index} className="flex items-center mb-2">
                                            <p className="bg-primary flex justify-center items-center ml-2 w-6 h-6 rounded-full text-white">
                                                {face}
                                            </p>
                                            
                                            <Select value={tooth[face]} onValueChange={(value) => {
                                                setTooth({ ...tooth, [face]: value });
                                            }}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Selecione um procedimento" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value={`123123`}>Procedimento {index + 1}</SelectItem>
                                                    <SelectItem value={`232423`}>Procedimento {index + 2}</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="w-full flex justify-center items-center">
                                <button onClick={toggleModal} className="bg-zinc-300 hover:opacity-80 text-primary py-2 px-4 rounded-full focus:outline-none focus:shadow-outline ml-2">
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    className="bg-primary hover:opacity-80 text-white py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
                                >
                                    Adicionar
                                </button>

                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};


const Odontograma: React.FC<DenteProps> = ({ setDetails, details }) => {
    return (
        <div className="flex flex-col items-center">
            <div className="flex flex-wrap justify-center space-x-4">
                {[...Array(16)].map((_, index) => (
                    <Dente setDetails={setDetails} details={details} key={index} numero={index + 1} />
                ))}
            </div>
            <div className="flex flex-wrap justify-center space-x-4">
                {[...Array(16)].map((_, index) => (
                    <Dente setDetails={setDetails} details={details} key={index + 16} numero={32 - index} />
                ))}
            </div>
        </div>
    );
};

export default Odontograma;
