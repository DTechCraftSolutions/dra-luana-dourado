import { DatePickerDemo } from "@/components/ui/date-picker";
import { Dialog } from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React, { useEffect } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { PatientProps } from "@/app/routes/pages/patients";
import Autosuggest from "react-autosuggest";

interface ProfessionalProps {
  name: string;
  email: string;
  office: string;
  CRO: string;
}
export function NewSchedule() {
  const [steps, setSteps] = React.useState(0);
  const [date, setDate] = React.useState<Date>();
  const [pacient, setPacient] = React.useState("");
  const [professional, setProfessional] = React.useState("");
  const [procedure, setProcedure] = React.useState("");
  const [time, setTime] = React.useState("");
  const [suggestions, setSuggestions] = React.useState<PatientProps[]>([]);

  const [dataPatients, setDataPatients] = React.useState<PatientProps[]>([]);
  const [dataProfessionals, setDataProfessionals] = React.useState<
    ProfessionalProps[]
  >([]);

  function disableButtonNext() {
    if (!date && steps === 0) {
      return true;
    }
    if (steps === 1) {
      if (!pacient || !professional || !procedure) {
        return true;
      }
    }
    if (steps === 2) {
      if (!time) {
        return true;
      }
    }
    return false;
  }
  function nextStep() {
    setSteps(steps + 1);
    if (steps === 2) {
      DialogPrimitive.Close;
      return;
    }
  }
  function prevStep() {
    setSteps(steps - 1);
  }

  async function getPatients() {
    try {
      const response = await fetch("http://localhost:3333/find-all-patient");
      const data = await response.json();
      setDataPatients(data.patients);
    } catch (error) {
      console.error("Error fetching patients:", error);
      throw error;
    }
  }

  async function getProfessionals() {
    try {
      const response = await fetch(
        "http://localhost:3333/find-all-professionals"
      );
      const data = await response.json();
      setDataProfessionals(data.professionals);
    } catch (error) {
      console.error("Error fetching professionals:", error);
    }
  }

  const onInputChange = (
    event: React.FormEvent,
    { newValue }: Autosuggest.ChangeEvent
  ) => {
    setPacient(newValue);
  };
  const onSuggestionSelected = (
    event: React.FormEvent,
    { suggestion }: Autosuggest.SuggestionSelectedEventData<PatientProps>
  ) => {
    setPacient(suggestion.full_name);
  };
  const getSuggestions = (value: string) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
    return inputLength === 0
      ? []
      : dataPatients.filter((patient) =>
          patient.full_name.toLowerCase().includes(inputValue.toLowerCase())
        );
  };

  useEffect(() => {
    getPatients();
    getProfessionals();
  }, []);

  return (
    <div className="w-full flex flex-col items-center">
      {steps === 0 && (
        <div>
          <h2 className="mb-2">Selecione uma data para continuar</h2>
          <DatePickerDemo date={date} setDate={setDate} />
        </div>
      )}
      {steps === 1 && (
        <div>
          <h2 className="font-medium">Preencha os dados abaixo:</h2>
          <label htmlFor="">Paciente</label>
          <Autosuggest
            suggestions={suggestions}
            onSuggestionsFetchRequested={({ value }) =>
              setSuggestions(getSuggestions(value))
            }
            onSuggestionsClearRequested={() => setSuggestions([])}
            getSuggestionValue={(suggestion) => suggestion.full_name}
            renderSuggestion={(suggestion) => (
              <div>
                <div className="bg-white p-2 cursor-pointer hover:text-white hover:bg-primary hover:opacity-60 hover:duration-500 shadow-md">
                  {suggestion.full_name}
                </div>
              </div>
            )}
            inputProps={{
              className:
                "w-full h-10 px-4  rounded-full border-[1px] focus:outline-none focus:duration-500 focus:border-primary",
              placeholder: "Digite o nome do paciente",
              value: pacient,
              onChange: onInputChange,
            }}
            onSuggestionSelected={onSuggestionSelected}
          />
          <div className="flex items-center gap-2">
            <div>
              <label htmlFor="">Profissional</label>
              <Select onValueChange={setProfessional}>
                <SelectTrigger className="w-full md:w-[180px] bg-primary rounded-full text-white">
                  <SelectValue placeholder="Escolha" />
                </SelectTrigger>
                <SelectContent>
                  {dataProfessionals.map((professional) => (
                    <SelectItem
                      key={professional.CRO}
                      value={professional.name}
                    >
                      {professional.name}
                    </SelectItem>
                  ))}
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
      )}
      {steps === 2 && (
        <div>
          <h2 className="font-medium">Selecione um horário:</h2>
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
      )}
      <div className="flex justify-center items-center">
        {steps !== 0 && (
          <button
            onClick={prevStep}
            className="px-4 py-1 bg-secondary text-primary  font-medium shadow-md rounded-full mt-8"
          >
            Voltar
          </button>
        )}
        <button
          onClick={nextStep}
          disabled={disableButtonNext()}
          className="px-4 py-1 mx-auto  text-white bg-primary font-medium shadow-md rounded-full mt-8"
        >
          {steps === 2 ? "Agendar" : "Proximo"}
        </button>
      </div>
    </div>
  );
}
