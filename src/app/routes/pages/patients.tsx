import { useEffect, useState } from "react";
import { PatientSearchedCard } from "@/components/patient-searched-card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import PatientDetailTabs from "@/components/patient-details-tab";
import { PatientCreate } from "@/components/patient-create";

export interface PatientProps {
  id: string;
  birth_date: string;
  cep: string;
  city: string;
  complement: string;
  neighborhood: string;
  number: string;
  road: string;
  role: string;
  state: string;
  telephone: string;
  card_number: string;
  comments: string;
  cpf: string;
  full_name: string;
  rg: string;
  sex: string;
  //optional
  responsible_name: string;
  responsible_cpf: string;
  responsible_rg: string;
  birth_date_responsible: string;
  telphone_responsible: string;
  comments_responsible: string;
}

export function Patients() {
  const [patientSearchList, setPatientSearchList] = useState<PatientProps[]>(
    []
  );
  const [data, setData] = useState<PatientProps[]>([]);
  const [search, setSearch] = useState("");
  const [selectedPatient, setSelectedPatient] = useState<PatientProps | null>(null); //prettier-ignore
  const [createdPatient, setCreatedPatient] = useState(false);
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

  async function getPatients() {
    try {
      const response = await fetch("http://localhost:3333/find-all-patient");
      const data = await response.json();
      setData(data.patients);
      setPatientSearchList(data.patients);
    } catch (error) {
      console.error("Error fetching patients:", error);
      throw error;
    }
  }

  useEffect(() => {
    if (createdPatient) {
      getPatients();
      setCreatedPatient(false);
    }
  }, [createdPatient]);

  useEffect(() => {
    getPatients();
  }, []);

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
        <PatientCreate setCreatedPatient={setCreatedPatient} />
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

          {data.length > 0 ? (
            <div className="mt-4 flex flex-col gap-2">
              {data?.map((patient) => (
                <PatientSearchedCard
                  key={patient.id}
                  name={patient.full_name}
                  id={patient.id}
                  handleSelectPatient={handleSelectPatient}
                />
              ))}
            </div>
          ) : (
            <p className="text-primary mt-4">Nenhum paciente encontrado...</p>
          )}
        </>
      )}
    </div>
  );
}
