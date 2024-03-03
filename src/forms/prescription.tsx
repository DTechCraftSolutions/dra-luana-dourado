import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FormEvent, useEffect, useRef, useState } from "react";
import { IoAdd, IoArrowBack, IoClose, IoPrint } from "react-icons/io5";
import { Medicines } from "@/data/medicine";
import Autosuggest from "react-autosuggest"
import Image from "next/image";
import { details } from "../../details";
import { format, set } from "date-fns";

interface Medicine {
    nome: string;
    posologia: string;
}

export function Prescription({ setDocSelected }: any) {
    const [newPrescription, setNewPrescription] = useState(false);
    const [measureInForm, setMeasureInForm] = useState<string>("Caixa(s)");
    const [inputValue, setInputValue] = useState('');
    const [suggestions, setSuggestions] = useState<Medicine[]>([]);
    const [selectedMedicine, setSelectedMedicine] = useState<Medicine | null>(null);
    const [medicineList, setMedicineList] = useState<any[]>([]);
    const [quantityToAdd, setQuantityToAdd] = useState(1);

    const inputRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        if (selectedMedicine && inputRef.current) {
            inputRef.current.value = selectedMedicine.posologia;
        }
    }, [selectedMedicine]);

    const onInputChange = (
        event: React.FormEvent,
        { newValue }: Autosuggest.ChangeEvent
    ) => {
        setInputValue(newValue);
    };

    const onSuggestionSelected = (
        event: React.FormEvent,
        { suggestion }: Autosuggest.SuggestionSelectedEventData<Medicine>
    ) => {
        setInputValue(suggestion.nome);
        setSelectedMedicine(suggestion);
    };

    const getSuggestions = (value: string): Medicine[] => {
        const inputValue = value.trim().toLowerCase();
        const inputLength = inputValue.length;
        return inputLength === 0
            ? []
            : Medicines.filter(
                (medicine) =>
                    medicine.nome.toLowerCase().slice(0, inputLength) === inputValue
            );
    };
    const handleAdd = (e: FormEvent) => {
        e.preventDefault();
        if (selectedMedicine && quantityToAdd > 0 && measureInForm) {
            setMedicineList([...medicineList, { ...selectedMedicine, quantity: quantityToAdd, measure: measureInForm }]);
            setInputValue("");
            setSelectedMedicine(null);
            setQuantityToAdd(1);
            setMeasureInForm("Caixa(s)");

        }
    }

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
                                <Autosuggest
                                    suggestions={suggestions}
                                    onSuggestionsFetchRequested={({ value }) =>
                                        setSuggestions(getSuggestions(value))
                                    }
                                    onSuggestionsClearRequested={() => setSuggestions([])}
                                    getSuggestionValue={(suggestion) => suggestion.nome}
                                    renderSuggestion={(suggestion) => <div className="bg-white p-2 cursor-pointer hover:text-white hover:bg-primary hover:opacity-60 hover:duration-500 shadow-md">{suggestion.nome}</div>}
                                    inputProps={{
                                        className: "w-full h-10 px-4 rounded-full border-[1px] focus:outline-none focus:duration-500 focus:border-primary",
                                        placeholder: "Digite o nome do medicamento",
                                        value: inputValue,
                                        onChange: onInputChange,
                                    }}
                                    onSuggestionSelected={onSuggestionSelected}
                                />
                            </div>
                            <div className="flex items-center gap-5">
                                <div className="flex flex-col">
                                    <label htmlFor="" className="text-primary">
                                        Quantidade
                                    </label>
                                    <input value={quantityToAdd} onChange={(e) => setQuantityToAdd(Number(e.target.value))} type="text" placeholder="Qtd" className="w-24 h-10 px-4 rounded-full border-[1px] focus:outline-none focus:duration-500 focus:border-primary" />
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
                                <textarea
                                    id="posologia"
                                    ref={inputRef}
                                    placeholder="Adicione..."
                                    className="w-full h-32 px-3 rounded-lg border-[1px] focus:outline-none focus:duration-500 focus:border-primary"
                                />
                            </div>
                            <button onClick={handleAdd} className="bg-primary mt-5 px-5 flex items-center text-white rounded-full py-2 justify-center gap-2 hover:opacity-80 hover:duration-1000 hover:ease-out">
                                <IoAdd />
                                Adicionar
                            </button>
                        </form>
                        <div className="w-3/5 h-[90vh] bg-white shadow-md flex justify-between flex-col rounded-lg p-2 px-8 mb-10">
                            <div>
                                <div className="flex items-center gap-4">
                                    <Image src={details.image} alt="logo" className="mt-4" width={150} height={100} />
                                    <div className="text-sm flex w-full flex-col gap-2">
                                        <p>Nome do dentista</p>
                                        <p className="flex gap-2">
                                            <span className="font-bold">
                                                CRO
                                            </span>
                                            7777777777
                                        </p>
                                    </div>
                                    <button className="bg-primary fixed-right text-white flex items-center text-sm gap-2 px-5 py-2 rounded-full hover:opacity-80 hover:duration-1000 hover:ease-out">
                                        <IoPrint />
                                        Imprimir
                                    </button>
                                </div>
                                <h2 className="text-center w-full font-medium">Receita</h2>
                                <div className="text-sm mt-5">
                                    <p>
                                        <span className="font-bold">
                                            Paciente
                                        </span>: Nome do paciente
                                    </p>
                                    <p>
                                        Rua da minha casa, juá, 16, Limoeiro - PE
                                    </p>
                                </div>
                                {
                                    medicineList.length > 0 && medicineList.map((medicine, index) => (
                                        <div className="mt-5 text-sm">
                                            <button onClick={() => {
                                                const newList = medicineList.filter((medicine) => {
                                                    return medicine.nome !== medicineList[index].nome
                                                })
                                                setMedicineList(newList)
                                            }} className="float-right rounded-full justify-center items-center ml-2 bg-red-500 text-white">
                                                <IoClose />
                                            </button>
                                            <div className="flex items-center justify-between">
                                                <p className="font-bold">
                                                    {medicine.nome}
                                                </p>
                                                <div className="flex items-center gap-2">
                                                    <p>
                                                        {medicine.quantity}
                                                    </p>
                                                    <p>
                                                        {medicine.measure}
                                                    </p>
                                                </div>
                                            </div>
                                            <div>
                                                <p>
                                                    {medicine.posologia}
                                                </p>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                            <div className="text-sm flex flex-col items-center">
                                <div className="w-3/5 mx-auto h-[0.5px] bg-zinc-700">

                                </div>
                                <div>
                                    <p>Nome do dentista CRO 777777777</p>
                                </div>
                                <div>
                                    {format(new Date(), "dd/MM/yyyy")}
                                </div>

                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    )
} 