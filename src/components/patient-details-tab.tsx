import { PatientProps } from "@/app/routes/pages/patients";
import { useState } from "react";
import { BudgetsRender } from "./tab-contents/patients/budgets";
import { ArrowLeft } from "lucide-react";
import { IoArrowBack } from "react-icons/io5";
import { Treatments } from "./tab-contents/patients/treatments";
import { DocsComponent } from "./tab-contents/patients/docs";

const PatientDetailTabs = ({ patient, setPatient }: { patient: PatientProps, setPatient: any }) => {
  const [activeTab, setActiveTab] = useState("tab1-data");

  const TabButton = ({ tabId, label }: { tabId: string; label: string }) => (
    <button
      className={`font-bold text-primary ${
        activeTab === tabId ? "border-b border-primary" : ""
      }`}
      onClick={() => setActiveTab(tabId)}
    >
      {label}
    </button>
  );

  const TabContent = ({
    tabId,
    content,
  }: {
    tabId: string;
    content: React.ReactNode;
  }) => (
    <div className={`mt-6 ${activeTab === tabId ? "block" : "hidden"}`}>
      {content}
    </div>
  );

  return (
    <div className="w-full flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <IoArrowBack onClick={() => setPatient(null)} className="text-primary text-2xl hover:bg-primary hover:rounded-full cursor-pointer hover:duration-500 hover:ease-in-out hover:transform hover:opacity-30 hover:text-white" />
        <h2 className="text-primary font-bold text-xl ">
          {patient?.full_name}
        </h2>
      </div>
      <div className="flex gap-8">
        <TabButton tabId="tab1-data" label="Dados" />
        <TabButton tabId="tab2-budget" label="Orçamento" />
        <TabButton tabId="tab3-treatment" label="Tratamentos" />
        <TabButton tabId="tab4-docs" label="Documentos" />
      </div>
      <TabContent
        tabId="tab1-data"
        content={
          <div>
            <div>
              <PatientDataItem label="Celular" value={patient?.telephone} />
              <PatientDataItem label="Identificador" value={patient?.id} />
              <PatientDataItem label="CPF" value={patient?.cpf} />
              <PatientDataItem label="RG" value={patient?.rg} />
              <PatientDataItem
                label="Idade"
                value={patient?.birth_date?.toString()}
              />
              <PatientDataItem
                label="Sexo"
                value={patient?.sex === "F" ? "Feminino" : "Masculino"}
              />
              <PatientDataItem label="Plano" value={patient?.role} />
              <PatientDataItem
                label="Endereço"
                value={`${patient?.road}, ${patient?.number}, ${
                  patient?.complement || "Sem complemento"
                }, ${patient?.neighborhood}, ${patient?.city}-${
                  patient?.state
                }`}
              />
            </div>
          </div>
        }
      />
      <TabContent tabId="tab2-budget" content={<BudgetsRender />} />
      <TabContent tabId="tab3-treatment" content={<Treatments />} />
      <TabContent tabId="tab4-docs" content={<DocsComponent />} />
    </div>
  );
};

function PatientDataItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex gap-4">
      <strong className="w-36">{label}</strong>
      {value}
    </div>
  );
}

export default PatientDetailTabs;
