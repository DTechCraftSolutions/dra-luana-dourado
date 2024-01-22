import { DatePickerDemo } from "@/components/ui/date-picker";
import { Dialog } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";



export function NewSchedule() {
    const [steps, setSteps] = React.useState(0)
    const [date, setDate] = React.useState<Date>()
    const [pacient, setPacient] = React.useState("")
    const [professional, setProfessional] = React.useState("")
    const [procedure, setProcedure] = React.useState("")
    const [time, setTime] = React.useState("")
    
    
    function disableButtonNext () {
        if (!date && steps === 0){
            return true
        }
        if ( steps === 1){
            if(!pacient || !professional || !procedure){
                return true
            }
        }
        if(steps === 2){
            if(!time){
                return true
            }
        }
        return false
    }
    function nextStep() {
        setSteps(steps + 1)
        if(steps === 2){
            DialogPrimitive.Close
            return 
        }
    }
    function prevStep() {
        setSteps(steps - 1)
    }
    return (
        <div className="w-full flex flex-col items-center">

            {
                steps === 0 && <div>
                    <h2 className="mb-2">
                        Selecione uma data para continuar
                    </h2>
                    <DatePickerDemo date={date} setDate={setDate} />
                </div>
            }
            {
                steps === 1 && <div>
                    <h2 className="font-medium">
                        Preencha os dados abaixo:
                    </h2>
                    <label htmlFor="">
                        Paciente
                    </label>
                    <input onChange={(e) => setPacient(e.target.value)} type="text" className="w-full mb-2 h-10 rounded-full border border-primary px-4 outline-none" />

                    <div className="flex items-center gap-2">
                        <div>
                            <label htmlFor="">Profissional</label>
                            <Select onValueChange={setProfessional}>
                                <SelectTrigger className="w-full md:w-[180px] bg-primary rounded-full text-white">
                                    <SelectValue placeholder="Escolha" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="light">Dra. Luana</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <label htmlFor="">Procedimento</label>
                            <Select onValueChange={setProcedure}>
                                <SelectTrigger className="w-full md:w-[180px] bg-primary rounded-full text-white">
                                    <SelectValue placeholder="Escolha" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Manutencao">Manutenção</SelectItem>
                                    <SelectItem value="restauracao">Restauração</SelectItem>
                                    <SelectItem value="clareamento">Clareamento</SelectItem>
                                    <SelectItem value="extracao">Extração</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>
            }
            {
                steps === 2 && <div>
                    <h2 className="font-medium">
                        Selecione um horário:
                    </h2>
                    <Select onValueChange={setTime}>
                        <SelectTrigger className="w-full md:w-[180px] bg-primary rounded-full text-white">
                            <SelectValue placeholder="Escolha" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="10:30">10:30</SelectItem>
                            <SelectItem value="15:30">15:30</SelectItem>
                            <SelectItem value="16:00">16:00</SelectItem>
                            <SelectItem value="17:00">17:00</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            }
            <div className="flex justify-center items-center">
                {
                    steps !== 0 && <button
                        onClick={prevStep}
                        className="px-4 py-1 bg-secondary text-primary  font-medium shadow-md rounded-full mt-8">
                        Voltar
                    </button>
                }
                <button
                    onClick={nextStep}
                    disabled={disableButtonNext()}
                    className="px-4 py-1 mx-auto  text-white bg-primary font-medium shadow-md rounded-full mt-8">
                    {steps === 2 ? "Agendar" : "Proximo"}
                </button>
            </div>
        </div>
    )
}