import { PatientProps } from "@/app/routes/pages/patients";
import { useState } from "react";
import { BudgetsRender } from "./tab-contents/patients/budgets";

const PatientDetailTabs = ({ patient }: { patient: PatientProps }) => {
  const [activeTab, setActiveTab] = useState("tab1-data");

  const TabButton = ({ tabId, label }: { tabId: string; label: string }) => (
    <button
      className={`font-bold text-primary ${activeTab === tabId ? "border-b border-primary" : ""
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
    <div className="w-full flex flex-col gap-2 mt-4">
      <h2 className="text-primary font-bold text-xl mb-6">{patient?.nome}</h2>
      <div className="flex gap-8">
        <TabButton tabId="tab1-data" label="Dados" />
        <TabButton tabId="tab2-budget" label="Orçamento" />
        <TabButton tabId="tab3-treatment" label="Tratamentos" />
      </div>
      <TabContent
        tabId="tab1-data"
        content={
          <div>
            <div>
              <PatientDataItem label="Celular" value={patient?.celular} />
              <PatientDataItem label="Identificador" value={patient?.id} />
              <PatientDataItem label="CPF" value={patient?.cpf} />
              <PatientDataItem label="RG" value={patient?.rg} />
              <PatientDataItem
                label="Idade"
                value={patient?.idade?.toString()}
              />
              <PatientDataItem label="Sexo" value={patient?.sexo === 'F' ? 'Feminino' : 'Masculino'} />
              <PatientDataItem label="Plano" value={patient?.plano} />
              <PatientDataItem
                label="Endereço"
                value={`${patient?.logradouro}, ${patient?.numero}, ${patient?.complemento || 'Sem complemento'}, ${patient?.bairro}, ${patient?.cidade}-${patient?.estado}`}
              />
            </div>
          </div>
        }
      />
      <TabContent tabId="tab2-budget" content={
        <BudgetsRender />
      } />
      <TabContent tabId="tab3-treatment" content="Tab 3 content" />
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
