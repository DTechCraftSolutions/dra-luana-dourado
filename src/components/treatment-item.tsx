import { Switch } from "@/components/ui/switch";
import { useEffect, useState } from "react";

interface UpdateProcedureProps {
  active: string;
  name: string;
  price: number;
}

interface TreatmentItemProps {
  name: string;
  price: number;
  setPrice: any;
  isActive: string;
  setActive: any;
  setProcedureUpdate: UpdateProcedureProps | any;
  updateProcedure: any;
  priceProcedure: number;
  procedureByPlan: any[];
  setProcedureByPlan: any;
}

export const TreatmentItem: React.FC<TreatmentItemProps> = ({
  name,
  price,
  isActive,
  setProcedureUpdate,
  updateProcedure,
  setPrice,
  setActive,
  priceProcedure,
  procedureByPlan,
  setProcedureByPlan,
}) => {
  function onChangePrice(e: any) {
    setPrice(parseInt(e.target.value));
    setProcedureUpdate({
      name: name,
      price: price,
      active: isActive,
    });
  }

  function onChangeActive(e: any) {
    if (e === true) {
      setActive("S");
    }
    if (e === false) {
      setActive("N");
    }

    setProcedureUpdate({
      name: name,
      price: price,
      active: isActive,
    });
  }

  useEffect(() => {
    setPrice(priceProcedure);
  }, []);

  useEffect(() => {
    if (updateProcedure && procedureByPlan.length > 0) {
      const updatedProcedures = procedureByPlan.map((procedure) => {
        if (updateProcedure.name === procedure.name) {
          return { ...procedure, price: price, active: isActive };
        } else {
          return procedure;
        }
      });
      setProcedureByPlan(updatedProcedures);
    }
  }, [updateProcedure, price, isActive]);

  return (
    <div className="flex items-center justify-between mt-2">
      <div>{name}</div>
      <div className="flex items-center gap-4">
        <p>Ativo</p>
        <Switch
          defaultValue={isActive}
          onCheckedChange={(e) => onChangeActive(e)}
        />
        <div>
          <label htmlFor="">R$</label>
          <input
            type="number"
            defaultValue={priceProcedure}
            onChange={(e) => onChangePrice(e)}
            className="w-24 rounded-full focus:outline-primary focus:duration-500 focus:border-primary focus:border-1 focus:outline-0 focus:shadow-none h-10 border px-4"
            placeholder="Valor"
          />
        </div>
      </div>
    </div>
  );
};
