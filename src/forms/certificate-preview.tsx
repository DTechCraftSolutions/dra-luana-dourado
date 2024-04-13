import React from "react";
import { details } from "../../details";
import { format } from "date-fns";
import Image from "next/image";

const CertificatePreview = ({ certificateType, date, disease }: any) => {
  return (
    <div id="printable-content" className="w-full h-[90vh] bg-white  flex justify-between flex-col rounded-lg p-2 px-8 mb-10">
      <div>
        <div className="flex items-center gap-4">
          <Image src={details.image} alt="logo" className="mt-4" width={150} height={100} />
          <div className="text-sm flex w-full flex-col gap-2">
            <p>Nome do dentista</p>
            <p className="flex gap-2">
              <span className="font-bold">CRO</span> 7777777777
            </p>
          </div>
        </div>
        <h2 className="text-center w-full font-medium">Atestado</h2>
        <div className="text-sm mt-5">
          <p>
            <span className="font-bold">Tipo de Atestado</span>: {certificateType === "1" ? "Presença" : "Dias"}
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
          <p>Nome do dentista CRO 777777777</p>
        </div>
        <div>{format(new Date(), "dd/MM/yyyy")}</div>
      </div>
    </div>
  );
};

export default CertificatePreview;
