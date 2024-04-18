import { useEffect, useState } from "react";
import { PatientSearchedCard } from "@/components/patient-searched-card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import PatientDetailTabs from "@/components/patient-details-tab";
import { PatientCreate } from "@/components/patient-create";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

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
  const router = useRouter();
  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      router.push("/login");
    }
  }, []);

  const [patientSearchList, setPatientSearchList] = useState<PatientProps[]>(
    []
  );
  const [editPayload, setEditPayload] = useState<PatientProps | null>(null);
  const [data, setData] = useState<PatientProps[]>([]);
  const [search, setSearch] = useState("");
  const [selectedPatient, setSelectedPatient] = useState<PatientProps | null>(null); //prettier-ignore
  const [createdPatient, setCreatedPatient] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  //TODO: implement handleSearch function
  async function handleSearch(patientName: string) {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/find-patient-by-name`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ full_name: patientName }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch patient data");
      }

      const data = await response.json();
      setPatientSearchList(data.patients);
    } catch (error) {
      console.error("Error handling search:", error);
    }
  }

  async function handleSelectPatient(id: string) {
    const patient = patientSearchList.find((patient) => patient.id === id);
    if (patient) {
      setSelectedPatient(patient);
    }
  }

  async function getPatients() {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/find-all-patient`
      );
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
    if (isEditing) {
      getPatients();
      setIsEditing(false);
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
          <Search className="relative right-10 cursor-pointer  w-[20px] text-zinc-400" />
        </div>

        <PatientCreate
          isEditting={setIsEditing}
          setEditPayload={setEditPayload}
          editPayload={editPayload}
          setOpenDialog={setOpenDialog}
          openDialog={openDialog}
          setCreatedPatient={setCreatedPatient}
        />
      </div>

      {selectedPatient ? (
        <div className="w-full flex flex-col gap-2 mt-5">
          <PatientDetailTabs
            openModal={setOpenDialog}
            setEditPayload={setEditPayload}
            setPatient={setSelectedPatient}
            patient={selectedPatient as PatientProps}
          />
        </div>
      ) : (
        <>
          <h3 className="text-primary mt-8">
            Selecione o paciente para obter detalhes:
          </h3>

          {data.length > 0 ? (
            <div className="w-full flex flex-col gap-2 mt-5">
              {data
                .filter((patient) =>
                  patient.full_name.toLowerCase().includes(search.toLowerCase())
                )
                .map((patient) => (
                  <PatientSearchedCard
                    telephone={patient.telephone}
                    key={patient.id}
                    name={patient.full_name}
                    id={patient.id}
                    handleSelectPatient={handleSelectPatient}
                  />
                ))}
              {data.filter((patient) =>
                patient.full_name.toLowerCase().includes(search.toLowerCase())
              ).length === 0 && (
                <p className="text-primary mt-4">
                  Nenhum paciente encontrado com o nome "{search}"
                </p>
              )}
            </div>
          ) : (
            <p className="text-primary mt-4">Nenhum paciente encontrado...</p>
          )}
        </>
      )}
    </div>
  );
}
