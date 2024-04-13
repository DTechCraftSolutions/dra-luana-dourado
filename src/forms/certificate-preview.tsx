import React from "react";
import { details } from "../../details";
import { format } from "date-fns";
import Image from "next/image";

const CertificatePreview = ({ certificateType, date, disease, patient, dentist, daysAmount }: any) => {
  console.log(patient);
  return (
    <div id="certificate" className="w-full h-[90vh] bg-white  flex justify-between flex-col rounded-lg p-2 px-8 mb-10">
      <div>
        <div className="flex items-center gap-4">
          <Image src={details.image} alt="logo" className="mt-4" width={150} height={100} />
          <div className="text-sm flex w-full flex-col gap-2">
            <p>{dentist?.name}</p>
            <p className="flex gap-2">
              <span className="font-bold">CRO</span> {dentist?.CRO}
            </p>
          </div>
        </div>
        <h2 className="text-center w-full font-medium">Atestado</h2>
        <div className="text-sm mt-5">
          <div className="mt-10">
            <div>
              <p><span className="font-bold">Nome do paciente:</span> {patient.full_name}</p>
            </div>
          </div>
          <p>
            <span className="font-bold">Tipo de Atestado</span>: {certificateType === "1" ? "Comparecimento ao consultório odontológico" : `${daysAmount} dias`}
          </p>
          <p>
            <span className="font-bold">Data de emissão</span>: {date}
          </p>
          <p>
            <span className="font-bold">Doença</span>: {disease ? disease : "Nenhuma"}
          </p>
        </div>
      </div>
      <div className="text-sm flex flex-col items-center">
        <div className="w-3/5 mx-auto h-[0.5px] bg-zinc-700"></div>
        <div>
          <p>{dentist?.name} CRO {dentist?.CRO}</p>
        </div>
        <div>{format(new Date(), "dd/MM/yyyy")}</div>
      </div>
    </div>
  );
};

export default CertificatePreview;
