interface PatientSearchedCardProps {
    name: string;
    job: string;
  }
  
  export function RegisteredProfessionals({ name, job }: PatientSearchedCardProps) {
    return (
      <div className="flex rounded-full hover:opacity-90  transition-opacity duration-300 w-full md:w-3/4 w justify-between px-6 py-2 bg-patientCard cursor-pointer gap-3">
        <span className="text-patientCardText truncate">{name}</span>
        <span className="text-patientCardText truncate">{job}</span>
      </div>
    );
  }
  