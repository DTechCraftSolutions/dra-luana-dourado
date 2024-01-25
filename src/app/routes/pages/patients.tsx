import { DialogHeader } from "@/components/ui/dialog";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { PatientSearchedCard } from "@/components/patient-searched-card";

const patitentsSearched = [
  {
    name: "Augusto",
    id: "893ace-i934e",
  },
  {
    name: "Eu sou um nome grande o suficiente para quebrar o layout",
    id: "893ace-i934e",
  },
  {
    name: "Deyvid",
    id: "893ace-i934e",
  },
  {
    name: "Pedro",
    id: "893ace-i934e",
  },
  {
    name: "Joaquim",
    id: "893ace-i934e",
  },
  {
    name: "Deyvid",
    id: "893ace-i934e",
  },
];

export function Patients() {
  const [patientSearchList, setPatientSearchList] = useState(patitentsSearched);

  return (
    <div className="px-4 mt-2 w-full">
      <h2 className="text-primary font-bold text-xl">Pacientes</h2>

      {/* TODO: colocar isso em um componente, não aqui */}
      <div className="w-full flex mt-4 mb-4">
        <Dialog>
          <DialogTrigger className="mt-4 md:mt-0 px-14 py-1 bg-green-600 rounded-full text-white font-semibold">
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
