import { useState } from "react";
import { PatientSearchedCard } from "@/components/patient-searched-card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import PatientDetailTabs from "@/components/patient-details-tab";
import { PatientCreate } from "@/components/patient-create";

const patientsSearched: PatientProps[] = [
  {
    nome: "Augusto",
    id: "893ace-i9341",
    cpf: "123.456.789-00",
    rg: "1234567",
    celular: "(11) 91234-5678",
    idade: 30,
    sexo: "M",
    plano: "" /* TODO: Add the correct type for planos */,
    logradouro: "Rua A",
    bairro: "Bairro A",
    cidade: "Cidade A",
    estado: "Estado A",
    numero: "123",
    complemento: "Complemento A",
  },
  {
    nome: "Eu sou um nome grande o suficiente para quebrar o layout",
    id: "893ace-i9342e",
    cpf: "987.654.321-00",
    rg: "7654321",
    celular: "(11) 98765-4321",
    idade: 25,
    sexo: "F",
    plano: "" /* TODO: Add the correct type for planos */,
    logradouro: "Rua B",
    bairro: "Bairro B",
    cidade: "Limoeiro",
    estado: "PE",
    numero: "456",
  },
  {
    nome: "Deyvid",
    id: "893ace-i9343e",
    cpf: "123.456.789-00",
    rg: "1234567",
    celular: "(11) 91234-5678",
    idade: 30,
    sexo: "M",
    plano: "" /* TODO: Add the correct type for planos */,
    logradouro: "Rua C",
    bairro: "Bairro C",
    cidade: "Cidade C",
    estado: "Estado C",
    numero: "789",
    complemento: "Complemento C",
  }
];

export interface PatientProps {
  nome: string;
  id: string;
  cpf: string;
  rg: string;
  celular: string;
  idade: number;
  sexo: "M" | "F";
  plano: any; //TODO: type planos
  logradouro: string;
  bairro: string;
  cidade: string;
  estado: string;
  numero: string;
  complemento?: string;
}

export function Patients() {
  const [patientSearchList, setPatientSearchList] =
    useState<PatientProps[]>(patientsSearched);
  const [search, setSearch] = useState("");
  const [selectedPatient, setSelectedPatient] = useState<PatientProps | null>(null); //prettier-ignore

  //TODO: implement handleSearch function
  async function handleSearch(patientName: string) {
    //TODO: setPatientSearchList(queryResult)
  }

  async function handleSelectPatient(id: string) {
    const patient = patientSearchList.find((patient) => patient.id === id);
    if (patient) {
      setSelectedPatient(patient);
    }
  }

  return (
    <div className="px-4 mt-2 w-full">
      <h2 className="text-primary font-bold text-xl">Pacientes</h2>

      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Input
            className="w-full sm:w-[240px] rounded-full pr-12"
            placeholder="Informe o nome"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch(search)}
          />
          <Search
            className="relative right-10 cursor-pointer"
            onClick={() => handleSearch(search)}
          />
        </div>

        {/* TODO: colocar isso em um componente, não aqui */}
        <PatientCreate />
      </div>

      {selectedPatient ? (
        <div className="w-full flex flex-col gap-2 mt-5">
          <PatientDetailTabs patient={selectedPatient as PatientProps} />
        </div>
      ) : (
        <>
          <h3 className="text-primary mt-8">
            Selecione o paciente para obter detalhes:
          </h3>

          <div className="mt-4 flex flex-col gap-2">
            {patientSearchList.map((patient) => (
              <PatientSearchedCard
                key={patient.id}
                name={patient.nome}
                id={patient.id}
                handleSelectPatient={handleSelectPatient}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
