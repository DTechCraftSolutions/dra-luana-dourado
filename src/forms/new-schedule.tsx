import { DatePickerDemo } from "@/components/ui/date-picker";
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
import { isBefore } from "date-fns";
import { toast, Toaster } from "sonner";

interface ProfessionalProps {
  id: string;
  name: string;
  email: string;
  office: string;
  CRO: string;
}
interface ProcedureProps {
  id: string;
  name: string;
  description: string;
  recurrence: string;
  price: number;
  professionalId: string;
  duration: string;
  color: string;
}

interface AvailableProps {
  id: string;
  day_of_week: string;
  label: string;
  professionalId: string;
  initial_time: string;
  end_time: string;
}
export function NewSchedule({
  openModal,
  setOpenModal,
  setRegisterSchedule,
}: {
  openModal?: boolean;
  setOpenModal?: React.Dispatch<React.SetStateAction<boolean>>;
  dayWeek?: string;
  setRegisterSchedule?: any;
}) {
  const [availableTimeUsed, setAvailableTimeUsed] = React.useState<any>([]);
  const [allSchedules, setAllSchedules] = React.useState<any>([]);
  const [dayWeek, setDayWeek] = React.useState("");
  const [steps, setSteps] = React.useState(0);
  const [date, setDate] = React.useState<Date>();
  const [alreadyPatientCreated, setAlreadyPatientCreated] =
    React.useState(false);
  const [pacient, setPacient] = React.useState({
    name: "",
    id: "",
  });
  const [professional, setProfessional] = React.useState("");
  const [procedure, setProcedure] = React.useState("");
  const [time, setTime] = React.useState("");
  const [suggestions, setSuggestions] = React.useState<PatientProps[]>([]);

  const [dataPatients, setDataPatients] = React.useState<PatientProps[]>([]);
  const [dataProfessionals, setDataProfessionals] = React.useState<
    ProfessionalProps[]
  >([]);
  const [dataProcedures, setDataProcedures] = React.useState<ProcedureProps[]>(
    []
  );
  const [dataAvailables, setDataAvailables] = React.useState<AvailableProps[]>(
    []
  );

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
    setPacient({ name: "", id: "" });
    setAlreadyPatientCreated(false);
    setProfessional("");
    setProcedure("");
  }

  async function getPatients() {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/find-all-patient`
      );
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
        `${process.env.NEXT_PUBLIC_API_URL}/find-all-professionals`
      );
      const data = await response.json();
      setDataProfessionals(data.professionals);
    } catch (error) {
      console.error("Error fetching professionals:", error);
    }
  }

  async function getProcedures() {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/find-all-procedures`
      );
      const data = await response.json();
      setDataProcedures(data.procedures);
    } catch (error) {
      console.error(error);
    }
  }

  async function findByDayWeekAvailability() {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/find-by-day-week`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            day_of_week: dayWeek,
          }),
        }
      );
      const data = await response.json();
      setDataAvailables(data.availableTimes);
    } catch (error) {
      console.error(error);
    }
  }

  async function registerSchedule() {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/register-schedule`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          date,
          patientId: pacient.id,
          professionalId: professional,
          procedureId: procedure,
          availableTimeId: time,
          status: "PENDENTE",
        }),
      });
      toast.success("Agendamento realizado com sucesso");
    } catch (error) {
      console.error(error);
      toast.error("Erro ao realizar o agendamento");
    } finally {
      setRegisterSchedule(true);
      if (!setOpenModal) return;
      setOpenModal(false);
    }
  }

  async function getAllSchedules() {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/find-schedule`
      );
      const data = await response.json();
      setAllSchedules(data);
    } catch (error) {
      console.error(error);
    }
  }

  const onInputChange = (
    event: React.FormEvent,
    { newValue }: Autosuggest.ChangeEvent
  ) => {
    setPacient({
      name: newValue,
      id: "",
    });
  };
  const onSuggestionSelected = (
    event: React.FormEvent,
    { suggestion }: Autosuggest.SuggestionSelectedEventData<PatientProps>
  ) => {
    setPacient({
      name: suggestion.full_name,
      id: suggestion.id,
    });
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
    getProcedures();
  }, []);

  useEffect(() => {
    findByDayWeekAvailability();
    getAllSchedules();

    const availableTimeUsedInDateSchedule = allSchedules
      .filter((item: any) => item.date === date?.toISOString())
      .map((item: any) => item.availableTimeId);

    setAvailableTimeUsed(availableTimeUsedInDateSchedule);

    const pacientAgendedInDateSchedule = allSchedules
      .filter((item: any) => item.date === date?.toISOString())
      .map((item: any) => item.patientId);

    if (
      pacientAgendedInDateSchedule.some((item: any) => item === pacient.id) ===
      true
    ) {
      toast.error("Paciente ja agendado para essa data");
      setAlreadyPatientCreated(true);
      setPacient({
        name: "",
        id: "",
      });
    }
  }, [dayWeek, date, procedure, pacient, professional]);

  return (
    <div className="w-full flex flex-col items-center">
      {steps === 0 && (
        <div>
          <h2 className="mb-2">Selecione uma data para continuar</h2>
          <DatePickerDemo
            fromDate={new Date()}
            date={date}
            setDate={setDate}
            setDayWeek={setDayWeek}
          />
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
              value: pacient.name,
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
                    <SelectItem key={professional.CRO} value={professional.id}>
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
                  {dataProcedures.map((procedure) => (
                    <SelectItem key={procedure.id} value={procedure.id}>
                      {procedure.name}
                    </SelectItem>
                  ))}
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
            <SelectTrigger className=" w-full md:w-[180px] bg-primary rounded-full text-white">
              <SelectValue placeholder="Escolha" />
            </SelectTrigger>
            <SelectContent className="overflow-y-scroll h-56">
              {dataAvailables
                ?.filter((item) => !availableTimeUsed.includes(item.id))
                ?.map((available) => (
                  <SelectItem key={available.id} value={available.id}>
                    {available.label} - {available.day_of_week}
                  </SelectItem>
                ))}
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
          onClick={() => {
            if (steps === 2) {
              registerSchedule();
            }
            nextStep();
          }}
          disabled={disableButtonNext() || alreadyPatientCreated}
          className="px-4 py-1 mx-auto  text-white bg-primary font-medium shadow-md rounded-full mt-8"
        >
          {steps === 2 ? "Agendar" : "Proximo"}
        </button>
      </div>
    </div>
  );
}
