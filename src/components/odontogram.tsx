import React, { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

interface DenteProps {
    numero: number;
}

const Dente: React.FC<DenteProps> = ({ numero }) => {
    const [modalAberto, setModalAberto] = useState(false);
    const [procedimento, setProcedimento] = useState("");
    const [observacao, setObservacao] = useState("");
    const [descricao, setDescricao] = useState("");
    const [marcado, setMarcado] = useState(false); // Adicionando estado para marcar o dente
    const [faceDetails, setFaceDetails] = useState({
        m: [],
        v: [],
        d: [],
        o: [],
        l: [],

    });

    const toggleModal = () => {
        setModalAberto(!modalAberto);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Lógica para adicionar procedimento, observação e descrição
        console.log("Procedimento:", procedimento);
        console.log("Observação:", observacao);
        console.log("Descrição:", descricao);
        setProcedimento("");
        setObservacao("");
        setDescricao("");
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
                                <div >
                                    <div className="flex items-center mb-2 ">
                                        <p className="bg-primary flex justify-center items-center ml-2 w-6 h-6 rounded-full text-white">
                                            M
                                        </p>
                                        <Select>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Selecione um procedimento" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="procedimento1">Procedimento 1</SelectItem>
                                                <SelectItem value="procedimento2">Procedimento 2</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="flex items-center mb-2 ">
                                        <p className="bg-primary flex justify-center items-center ml-2 w-6 h-6 rounded-full text-white">
                                            D
                                        </p>
                                        <Select>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Selecione um procedimento" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="procedimento1">Procedimento 1</SelectItem>
                                                <SelectItem value="procedimento2">Procedimento 2</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="flex items-center mb-2 ">
                                        <p className="bg-primary flex justify-center items-center ml-2 w-6 h-6 rounded-full text-white">
                                            O
                                        </p>
                                        <Select>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Selecione um procedimento" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="procedimento1">Procedimento 1</SelectItem>
                                                <SelectItem value="procedimento2">Procedimento 2</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="flex items-center mb-2 ">
                                        <p className="bg-primary flex justify-center items-center ml-2 w-6 h-6 rounded-full text-white">
                                            V
                                        </p>
                                        <Select>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Selecione um procedimento" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="procedimento1">Procedimento 1</SelectItem>
                                                <SelectItem value="procedimento2">Procedimento 2</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="flex items-center mb-2 ">
                                        <p className="bg-primary flex justify-center items-center ml-2 w-6 h-6 rounded-full text-white">
                                            L
                                        </p>
                                        <Select>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Selecione um procedimento" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="procedimento1">Procedimento 1</SelectItem>
                                                <SelectItem value="procedimento2">Procedimento 2</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                            </div>

                            <div className="w-full flex justify-center items-center">
                                <button
                                    type="submit"
                                    className="bg-primary hover:opacity-80 text-white  py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
                                >
                                    Adicionar
                                </button>
                                <button onClick={toggleModal} className="bg-zinc-300 hover:opacity-80 text-primary py-2 px-4 rounded-full focus:outline-none focus:shadow-outline ml-2">
                                    Cancelar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

const Odontograma: React.FC = () => {
    return (
        <div className="flex flex-col items-center">
            <div className="flex justify-center space-x-4">
                {[...Array(16)].map((_, index) => (
                    <Dente key={index} numero={index + 1} />
                ))}
            </div>
            <div className="flex justify-center space-x-4">
                {[...Array(16)].map((_, index) => (
                    <Dente key={index + 16} numero={32 - index} />
                ))}
            </div>
        </div>
    );
};

export default Odontograma;
