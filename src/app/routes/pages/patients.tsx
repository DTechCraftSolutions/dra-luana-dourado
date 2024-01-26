import { DialogHeader } from "@/components/ui/dialog";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { PatientSearchedCard } from "@/components/patient-searched-card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const patitentsSearched = [
  {
    name: "Augusto",
    id: "893ace-i9341",
  },
  {
    name: "Eu sou um nome grande o suficiente para quebrar o layout",
    id: "893ace-i9342e",
  },
  {
    name: "Deyvid",
    id: "893ace-i934e2",
  },
  {
    name: "Pedro",
    id: "893ace-i934e3",
  },
  {
    name: "Joaquim",
    id: "893ace-i9344e",
  },
  {
    name: "Deyvid",
    id: "893ace-i9345e",
  },
];

export function Patients() {
  const [patientSearchList, setPatientSearchList] = useState(patitentsSearched);
  const [search, setSearch] = useState("");

  //TODO: implement handleSearch function
  async function handleSearch(patientName: string) {
    //TODO: setPatientSearchList(queryResult)
  }

  return (
    <div className="px-4 mt-2 w-full">
      <h2 className="text-primary font-bold text-xl">Pacientes</h2>

      <div className="flex items-center mt-4">
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
      <div className="w-full flex mt-4 mb-4">
        <Dialog>
          <DialogTrigger className="mt-4 md:mt-0 px-14 py-2 bg-green-600 rounded-full  text-white font-semibold hover:opacity-90 transition-opacity duration-300">
            Cadastrar novo
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="mx-auto text-primary">
                Novo Paciente
              </DialogTitle>
            </DialogHeader>
            <div>Eu sou um cadastro de paciente</div>
          </DialogContent>
        </Dialog>
      </div>

      <h3 className="text-primary mt-8">
        Selecione o paciente para obter detalhes:
      </h3>

      <div className="mt-4 flex flex-col gap-2">
        {patientSearchList.map((patient) => (
          <PatientSearchedCard
            key={patient.id}
            name={patient.name}
            id={patient.id}
          />
        ))}
      </div>
    </div>
  );
}
