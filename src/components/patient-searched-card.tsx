interface PatientSearchedCardProps {
  name: string;
  id: string;
}

export function PatientSearchedCard({ name, id }: PatientSearchedCardProps) {
  return (
    <div className="flex rounded-full w-full md:w-3/4 w justify-between px-6 py-2 bg-clientCard cursor-pointer gap-3">
      <span className="text-clientTextColor truncate">{name}</span>
      <span className="text-clientTextColor truncate">Identificador: {id}</span>
    </div>
  );
}
