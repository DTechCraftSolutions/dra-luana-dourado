interface PatientSearchedCardProps {
  name: string;
  id: string;
  handleSelectPatient: (id: string) => void;
}

export function PatientSearchedCard({
  name,
  id,
  handleSelectPatient,
}: PatientSearchedCardProps) {
  return (
    <div
      onClick={() => {
        handleSelectPatient(id);
      }}
      key={id}
      className="flex rounded-full hover:opacity-90  transition-opacity duration-300 w-full md:w-3/4 w justify-between px-6 py-2 bg-patientCard cursor-pointer gap-3"
    >
      <span className="text-patientCardText truncate">{name}</span>
      <span className="text-patientCardText truncate">Identificador: {id}</span>
    </div>
  );
}
